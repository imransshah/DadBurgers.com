// Drafts analysis for catalog documents that don't have any yet.
//
//   1. Rules: plainly irrelevant titles (tariffs, trade, sanctions) get
//      relevance "none" without spending an API call.
//   2. Claude: everything else, if ANTHROPIC_API_KEY is set. The model reads
//      the Federal Register full text and the reader's profile and returns
//      structured JSON. Up to TRIAGE_LIMIT documents per run (default 40).
//
// Everything written here is author "rule" or "ai-triage", reviewed: false.
// Nothing curated by hand is ever overwritten.
//
//   ANTHROPIC_API_KEY=... TRIAGE_LIMIT=40 node scripts/triage.mjs

import Anthropic from "@anthropic-ai/sdk";
import { fetchRetry, readData, todayUTC, writeData } from "./lib.mjs";

const MODEL = process.env.TRIAGE_MODEL || "claude-opus-5-5";
const LIMIT = Number(process.env.TRIAGE_LIMIT || 40);
const MAX_TEXT = 400_000; // characters; EOs are far shorter. Longer text is noted, not silently cut.

const NONE_RULES = [
  /\btariff/i,
  /\bduties\b/i,
  /\breciprocal\b/i,
  /\badjusting imports\b/i,
  /\bimports? of\b/i,
  /\btrade (agreement|deal|framework)\b/i,
  /\bblocking property\b/i,
  /\bsanctions?\b/i,
  /\bde minimis\b/i,
  /\bcontinuation of the national emergency\b/i,
];

const SCHEMA = {
  type: "object",
  additionalProperties: false,
  required: ["relevance", "topics", "summary", "forYou", "status", "statusNote", "amends", "revokes", "actions"],
  properties: {
    relevance: { type: "string", enum: ["high", "medium", "low", "none"] },
    topics: { type: "array", items: { type: "string" } },
    summary: { type: "string" },
    forYou: { type: "string" },
    status: { type: "string", enum: ["in-effect", "amended", "revoked", "superseded", "expired", "unknown"] },
    statusNote: { type: "string" },
    amends: { type: "array", items: { type: "integer" } },
    revokes: { type: "array", items: { type: "integer" } },
    actions: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["tier", "lens", "text", "cite", "due", "dueNote", "recurring", "confident"],
        properties: {
          tier: { type: "string", enum: ["must", "feed", "know"] },
          lens: { type: "string", enum: ["ops", "manager", "employee"] },
          text: { type: "string" },
          cite: { type: "string" },
          due: { type: "string" },
          dueNote: { type: "string" },
          recurring: { type: "string" },
          confident: { type: "boolean" },
        },
      },
    },
  },
};

function systemPrompt(profile) {
  return `You triage U.S. presidential documents for one reader and draft a short analysis of what each one asks of them.

The reader:
- ${profile.role}, ${profile.component}, ${profile.agency}. Civilian, Federal Civilian Executive Branch, ${profile.cfoActAgency ? "a CFO Act agency" : "not a CFO Act agency"}.
- Owns: ${profile.owns.join(", ")}.
- Supervises ${profile.supervises.directFeds} federal employees directly and ${profile.supervises.secondLineFeds} at second line, and is the COR over ${profile.supervises.contractorStaff} contractor staff across ${profile.supervises.contracts} contracts. ${profile.bargainingUnit ? "Some staff are in a bargaining unit." : ""}

Relevance means relevance to this reader, not importance in general:
- high: creates or changes work this reader owns or will be asked for soon.
- medium: changes how they buy, staff, report or comply, but someone else leads.
- low: awareness only, with a plausible but indirect connection.
- none: no realistic connection to federal IT operations, federal workforce management, or this reader as a federal employee.

Actions. List only what the document (or guidance it explicitly orders) asks of agencies, managers or employees in this reader's position. Each action has:
- tier: "must" if this reader would own the deliverable; "feed" if someone else at the agency owns it and will need input from IT Ops; "know" for awareness.
- lens: "ops" (systems, network, cloud, security operations, IT contracts), "manager" (supervising federal staff, COR duties), or "employee" (the reader personally).
- cite: the section of the document, e.g. "Sec. 3(b)". Empty string if you can't point to one.
- due: an absolute date YYYY-MM-DD only when the text sets one or sets a period from the signing date you were given (compute it). Otherwise "".
- dueNote: how the date was derived, e.g. "60 days after signing", or "".
- recurring: e.g. "annually", "per contract action", or "".
- confident: false if the action depends on how the agency implements the order, or on anything not stated in the text.
Most documents produce zero to three actions. Never invent obligations to fill the list.

Writing:
- summary: two to four plain sentences on what the document does. Concrete nouns. No adjectives about the policy.
- forYou: one to three sentences on what it means for this reader specifically. Second person.
- Neutral and factual. This is a working tool, not commentary. No praise, criticism, or speculation about motives.
- If the text is ambiguous about something that matters, say so in forYou rather than guessing.
- topics: two to five short lowercase tags (e.g. "cyber", "procurement", "hiring", "ai", "trade").
- status: "in-effect" unless the text you were given shows otherwise. statusNote: "" unless there is something to say.
- amends/revokes: executive order numbers this document amends or revokes, as integers.`;
}

function ruleTriage(doc) {
  if (!NONE_RULES.some((r) => r.test(doc.title))) return null;
  return {
    relevance: "none",
    topics: ["trade"],
    summary: doc.abstract || "A trade, tariff or sanctions action.",
    forYou: "Not an IT Operations, workforce or employee item. Auto-triaged by title.",
    status: "in-effect",
    statusNote: null,
    lineage: { amends: [], amendedBy: [], revokes: [], revokedBy: [], supersedes: [], supersededBy: [] },
    litigation: [],
    actions: [],
    related: [],
    sources: [],
    author: "rule",
    reviewed: false,
    updated: todayUTC(),
  };
}

async function fullText(doc) {
  if (!doc.textUrl) return null;
  const res = await fetchRetry(doc.textUrl, { accept: "text/plain, text/html" });
  const raw = await res.text();
  return raw.replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").trim();
}

async function claudeTriage(client, profile, doc) {
  const text = await fullText(doc);
  const truncated = text && text.length > MAX_TEXT;
  const body = text ? text.slice(0, MAX_TEXT) : null;

  const user = [
    `Document: ${doc.kind === "eo" ? `Executive Order ${doc.number}` : "Presidential memorandum"} — ${doc.title}`,
    `Signed: ${doc.signed}. Published in the Federal Register: ${doc.published ?? "unknown"}. Citation: ${doc.citation ?? "n/a"}.`,
    doc.notes ? `Federal Register notes: ${doc.notes}` : null,
    doc.abstract ? `Abstract: ${doc.abstract}` : null,
    "",
    body
      ? `Full text${truncated ? ` (first ${MAX_TEXT} characters of ${text.length}; the rest was not provided — say so if it matters)` : ""}:\n\n${body}`
      : "Full text was not available. Work from the title and abstract only, keep relevance conservative, and mark every action confident: false.",
  ]
    .filter((x) => x !== null)
    .join("\n");

  const response = await client.beta.messages.create({
    model: MODEL,
    max_tokens: 16000,
    betas: ["server-side-fallback-2026-07-01"],
    fallbacks: "default",
    output_config: { effort: "high", format: { type: "json_schema", schema: SCHEMA } },
    system: systemPrompt(profile),
    messages: [{ role: "user", content: user }],
  });

  if (response.stop_reason === "refusal") throw new Error(`refused (${response.stop_details?.category ?? "no category"})`);
  if (response.stop_reason === "max_tokens") throw new Error("hit max_tokens");
  const textBlock = response.content.find((b) => b.type === "text");
  if (!textBlock) throw new Error("no text block in response");
  const out = JSON.parse(textBlock.text);

  return {
    relevance: out.relevance,
    topics: out.topics.slice(0, 6),
    summary: out.summary,
    forYou: out.forYou,
    status: out.status,
    statusNote: out.statusNote || null,
    lineage: {
      amends: out.amends.map((n) => `eo-${n}`),
      amendedBy: [],
      revokes: out.revokes.map((n) => `eo-${n}`),
      revokedBy: [],
      supersedes: [],
      supersededBy: [],
    },
    litigation: [],
    actions: out.actions.map((a, i) => ({
      id: `${doc.id}:ai-${i + 1}`,
      tier: a.tier,
      lens: a.lens,
      text: a.text,
      cite: a.cite || null,
      due: /^\d{4}-\d{2}-\d{2}$/.test(a.due) ? a.due : null,
      dueNote: a.dueNote || null,
      recurring: a.recurring || null,
      verify: !a.confident,
    })),
    related: [],
    sources: doc.htmlUrl ? [{ label: "Federal Register", url: doc.htmlUrl }] : [],
    author: "ai-triage",
    model: response.model,
    reviewed: false,
    updated: todayUTC(),
  };
}

async function main() {
  const catalog = readData("catalog");
  const analysis = readData("analysis");
  const profile = readData("profile");
  const meta = readData("meta");

  const pending = catalog.documents
    .filter((d) => !analysis.items[d.id])
    .sort((a, b) => (b.signed ?? "").localeCompare(a.signed ?? ""));

  let rules = 0;
  const queue = [];
  for (const d of pending) {
    const r = ruleTriage(d);
    if (r) {
      analysis.items[d.id] = r;
      rules++;
    } else queue.push(d);
  }
  console.log(`untriaged: ${pending.length}; rule-triaged: ${rules}; left for Claude: ${queue.length}`);

  const failures = [];
  let drafted = 0;
  if (!process.env.ANTHROPIC_API_KEY) {
    console.log("ANTHROPIC_API_KEY not set — skipping AI triage.");
  } else {
    const client = new Anthropic();
    for (const d of queue.slice(0, LIMIT)) {
      try {
        analysis.items[d.id] = await claudeTriage(client, profile, d);
        drafted++;
        console.log(`  ✓ ${d.id} → ${analysis.items[d.id].relevance}`);
        writeData("analysis", analysis); // save as we go; a later failure keeps earlier work
      } catch (e) {
        if (e instanceof Anthropic.AuthenticationError) {
          failures.push(`auth: ${e.message}`);
          console.error("Anthropic authentication failed — stopping.");
          break;
        }
        if (e instanceof Anthropic.RateLimitError) {
          failures.push(`rate limited at ${d.id}`);
          console.error("Rate limited — stopping for tonight.");
          break;
        }
        failures.push(`${d.id}: ${e.message}`);
        console.error(`  ✗ ${d.id}: ${e.message}`);
      }
    }
  }

  writeData("analysis", analysis);
  meta.lastTriage = { at: new Date().toISOString(), rules, drafted, remaining: queue.length - drafted, failures: failures.slice(0, 20) };
  writeData("meta", meta);
  console.log(`drafted ${drafted}; failures ${failures.length}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
