// POST /api/ask — a written answer grounded in the entries the client's search
// already found, framed for a federal IT leader. The client sends the question
// and up to ten numbered sources (src/lib/ask.js); this streams Claude's
// answer back as Server-Sent Events. The API key never leaves the worker.

import Anthropic from "@anthropic-ai/sdk";
import profile from "../mandates/data/profile.json";

const MODEL = "claude-opus-5-5";
const MAX_QUESTION = 500;
const MAX_SOURCES = 10;
const MAX_OUTPUT_TOKENS = 16000;

const p = profile;
const SYSTEM = `You answer questions for one reader, using numbered sources from their personal knowledge base: desk cards, slide decks and articles on federal IT leadership, plus "mandates" (executive orders, OMB/OPM memos, CISA directives, NIST and FedRAMP items) with actions and deadlines analysed for this reader.

The reader: ${p.role}, ${p.component}, ${p.agency}. A civilian, Federal Civilian Executive Branch agency, ${p.cfoActAgency ? "a CFO Act agency" : "not a CFO Act agency"}. Owns ${p.owns.join(", ")}. Supervises ${p.supervises.directFeds} federal employees directly and ${p.supervises.secondLineFeds} at second line, and is COR over ${p.supervises.contractorStaff} contractor staff.${p.bargainingUnit ? " Some staff are in a bargaining unit." : ""}

How to answer:
- Ground factual statements in the sources and cite them inline as [n]. If the sources don't cover part of the question, say so plainly. You may add general knowledge only when you label it, e.g. "Outside these sources: …".
- Frame it for a federal IT leader in this agency. Name the authority behind any requirement (statute, executive order, OMB memo or circular, CISA directive, NIST publication). Separate what is required from what is good practice. Say who owns what: this reader, the CIO or CISO, the contracting officer, HR/CHCO, Labor Relations.
- When a mandate source lists actions, say which apply to the reader, with due dates and the reader's current status. Lead with anything overdue or due within 30 days.
- Bring in federal-environment constraints when they change the answer: acquisition rules and CIO approval of IT spending, hiring and workforce rules, bargaining obligations, ATO/FedRAMP, records and CUI handling.
- Say when a fact is flagged "verify" (secondary sources) or an analysis is still a draft.
- Neutral and factual: this is a working tool, not commentary. Plain words, short paragraphs or bullets, no preamble. Usually 150–350 words; longer only if the question needs it.
- Never ask for, infer or repeat CUI, PII or non-public agency information.`;

const str = (v, max) => (typeof v === "string" ? v.slice(0, max) : "");

function sourceBlock(s, i) {
  const lines = [`[${i + 1}] (${str(s.kind, 20) || "entry"}) ${str(s.title, 300)}`];
  if (s.kind === "mandate") {
    lines.push(`Relevance to the reader: ${str(s.relevance, 20) || "unknown"} · Status: ${str(s.status, 30) || "in-effect"}`);
  }
  if (s.summary) lines.push(`Summary: ${str(s.summary, 1500)}`);
  if (s.forYou) lines.push(`For the reader: ${str(s.forYou, 1200)}`);
  const actions = Array.isArray(s.actions) ? s.actions.slice(0, 8) : [];
  if (actions.length) {
    lines.push("Actions:");
    for (const a of actions) {
      const due = /^\d{4}-\d{2}-\d{2}$/.test(a?.due ?? "") ? ` — due ${a.due}` : "";
      lines.push(
        `- [${str(a?.tier, 10)} · ${str(a?.lens, 12)}] ${str(a?.text, 400)}${due} — reader's status: ${str(a?.yourStatus, 15) || "open"}${a?.verify ? " (verify)" : ""}`,
      );
    }
  }
  if (s.text) lines.push(`Text: ${str(s.text, 3500)}`);
  return lines.join("\n");
}

const sse = (obj) => new TextEncoder().encode(`data: ${JSON.stringify(obj)}\n\n`);

export async function handleAsk(request, env, ctx, { json }) {
  if (!env.ANTHROPIC_API_KEY) {
    return json({ error: "Ask isn't switched on yet: add the ANTHROPIC_API_KEY repository secret and redeploy." }, 503);
  }
  if (env.ASK_LIMITER) {
    const { success } = await env.ASK_LIMITER.limit({ key: "ask" });
    if (!success) return json({ error: "That's a lot of questions in a minute. Try again shortly." }, 429);
  }

  let body;
  try {
    const raw = await request.text();
    if (raw.length > 128 * 1024) return json({ error: "Too much context sent." }, 413);
    body = JSON.parse(raw);
  } catch {
    return json({ error: "Couldn't read the request." }, 400);
  }
  const question = str(body?.question, MAX_QUESTION).trim();
  if (!question) return json({ error: "Ask a question first." }, 400);
  const sources = (Array.isArray(body?.sources) ? body.sources : []).slice(0, MAX_SOURCES);
  if (!sources.length) return json({ error: "Nothing in the knowledge base matched, so there's nothing to answer from." }, 400);

  const user = `Question: ${question}\n\nSources:\n\n${sources.map(sourceBlock).join("\n\n")}`;
  // ANTHROPIC_BASE_URL is only for local testing against a mock; unset in production.
  const client = new Anthropic({ apiKey: env.ANTHROPIC_API_KEY, ...(env.ANTHROPIC_BASE_URL ? { baseURL: env.ANTHROPIC_BASE_URL } : {}) });
  const { readable, writable } = new TransformStream();
  const writer = writable.getWriter();

  const pump = async () => {
    try {
      const stream = client.beta.messages.stream({
        model: MODEL,
        max_tokens: MAX_OUTPUT_TOKENS,
        system: SYSTEM,
        messages: [{ role: "user", content: user }],
        output_config: { effort: "medium" },
        betas: ["server-side-fallback-2026-07-01"],
        fallbacks: "default",
      });
      for await (const event of stream) {
        if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
          await writer.write(sse({ type: "text", text: event.delta.text }));
        }
      }
      const final = await stream.finalMessage();
      if (final.stop_reason === "refusal") {
        await writer.write(sse({ type: "error", message: "The model declined to answer this one. Try rephrasing." }));
      } else if (final.stop_reason === "max_tokens") {
        await writer.write(sse({ type: "text", text: "\n\n*(Answer cut off at the length limit.)*" }));
      }
      await writer.write(sse({ type: "done" }));
    } catch (e) {
      console.error("ask failed", e);
      let message = "Something went wrong writing the answer. Try again.";
      if (e instanceof Anthropic.RateLimitError) message = "The model is busy right now. Try again in a minute.";
      else if (e instanceof Anthropic.AuthenticationError) message = "The Anthropic API key on the worker was rejected.";
      else if (e instanceof Anthropic.APIConnectionError) message = "Couldn't reach the model. Try again.";
      await writer.write(sse({ type: "error", message }));
    } finally {
      await writer.close();
    }
  };
  ctx.waitUntil(pump());

  return new Response(readable, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
