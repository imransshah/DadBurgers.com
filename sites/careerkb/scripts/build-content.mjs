#!/usr/bin/env node
/**
 * Compiles content/**.md (+ the Mandates data in mandates/data/) into
 * public/data/kb.json, and copies the Mandates JSON to public/data/mandates/
 * for the Mandates section of the app.
 *
 *   node scripts/build-content.mjs           build
 *   node scripts/build-content.mjs --check   validate only (CI), no write
 *
 * Each content file is Markdown with YAML front matter. See content/README.md.
 * Fails the build on schema errors or on anything that looks like CUI/PII.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import * as yaml from "js-yaml";
import { marked } from "marked";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const CONTENT = path.join(ROOT, "content");
const OUT = path.join(ROOT, "public", "data", "kb.json");
const EO_DATA = path.join(ROOT, "mandates", "data");
const EO_OUT = path.join(ROOT, "public", "data", "mandates");
const EO_FILES = ["catalog", "analysis", "guidance", "inbox", "meta", "profile"];
const CHECK = process.argv.includes("--check");

const taxonomy = JSON.parse(fs.readFileSync(path.join(CONTENT, "taxonomy.json"), "utf8"));
const FOLDER_TYPE = { "desk-cards": "desk-card", slideshows: "slideshow", articles: "article" };
const STATUSES = new Set(["draft", "reviewed"]);
const ID_RE = /^[a-z0-9][a-z0-9-]{1,80}$/;

// Hard stop on markings and patterns that must never land on a personal
// Cloudflare account. Talking *about* CUI is fine; banner markings are not.
const FORBIDDEN = [
  [/\bCUI\s*\/\//, "CUI banner marking"],
  [/\(CUI\)/, "CUI portion marking"],
  [/\bFOUO\b|for official use only/i, "FOUO marking"],
  [/\/\/\s*(NOFORN|REL TO|ORCON)\b/, "dissemination control"],
  [/\b(TOP SECRET|SECRET|CONFIDENTIAL)\s*\/\//, "classification banner"],
  [/\b\d{3}-\d{2}-\d{4}\b/, "SSN-shaped number"],
  [/\bpre-?decisional\b/i, "pre-decisional marking"],
];

const errors = [];
const err = (file, msg) => errors.push(`${file}: ${msg}`);
const warn = (file, msg) => console.warn(`! ${file}: ${msg}`);

marked.setOptions({ gfm: true });
// External links open in a new tab; nothing else is rewritten.
marked.use({
  renderer: {
    link({ href, title, tokens }) {
      const text = this.parser.parseInline(tokens);
      const ext = /^https?:\/\//.test(href);
      const t = title ? ` title="${title}"` : "";
      return `<a href="${href}"${t}${ext ? ' target="_blank" rel="noopener noreferrer"' : ""}>${text}</a>`;
    },
  },
});

const plain = (md) =>
  md
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[#>*_`|~-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

function parseFile(file) {
  const raw = fs.readFileSync(file, "utf8").replace(/\r\n/g, "\n");
  const m = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) throw new Error("missing YAML front matter");
  return { meta: yaml.load(m[1]) ?? {}, body: m[2], raw };
}

// Slides are separated by a line containing only "---". Speaker notes follow
// a line containing only "???" inside a slide.
function splitSlides(body) {
  return body
    .split(/\n-{3,}\s*\n/)
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s) => {
      const [content, notes = ""] = s.split(/\n\?\?\?\s*\n/);
      const heading = content.match(/^#{1,2}\s+(.+)$/m)?.[1]?.trim() ?? "";
      return { title: heading, html: marked.parse(content), notes: notes.trim() ? marked.parse(notes.trim()) : "" };
    });
}

function headings(body) {
  return [...body.matchAll(/^##\s+(.+)$/gm)].map((h) => h[1].trim());
}

function loadAuthored() {
  const out = [];
  for (const [folder, type] of Object.entries(FOLDER_TYPE)) {
    const dir = path.join(CONTENT, folder);
    if (!fs.existsSync(dir)) continue;
    for (const name of fs.readdirSync(dir).filter((f) => f.endsWith(".md")).sort()) {
      const rel = `content/${folder}/${name}`;
      let parsed;
      try {
        parsed = parseFile(path.join(dir, name));
      } catch (e) {
        err(rel, e.message);
        continue;
      }
      const { meta, body, raw } = parsed;
      const id = meta.id ?? name.replace(/\.md$/, "");
      const t = meta.type ?? type;

      // `markings: teaching-examples` is for reference material that explains
      // marking formats (e.g. what a banner looks like). Marking hits become
      // warnings for those files; SSN-shaped numbers stay a hard stop.
      const teaching = meta.markings === "teaching-examples";
      for (const [re, label] of FORBIDDEN) {
        if (!re.test(raw)) continue;
        if (teaching && label !== "SSN-shaped number") warn(rel, `contains ${label} text (allowed: markings: teaching-examples)`);
        else err(rel, `blocked: looks like a ${label}. Remove it; this site is not an agency system.`);
      }
      if (meta.markings && !teaching) err(rel, 'markings must be "teaching-examples" if set');
      if (meta.handling !== "public") err(rel, 'handling must be "public" (attests: no CUI, PII or non-public agency text)');
      if (!ID_RE.test(id)) err(rel, `bad id "${id}"`);
      if (!taxonomy.types[t]) err(rel, `unknown type "${t}"`);
      if (!meta.title) err(rel, "title is required");
      if (!taxonomy.domains[meta.domain]) err(rel, `unknown domain "${meta.domain}" (see content/taxonomy.json)`);
      if (!meta.summary) err(rel, "summary is required");
      if (meta.status && !STATUSES.has(meta.status)) err(rel, `status must be draft or reviewed`);
      if (meta.updated && !/^\d{4}-\d{2}-\d{2}$/.test(String(meta.updated instanceof Date ? meta.updated.toISOString().slice(0, 10) : meta.updated)))
        err(rel, "updated must be YYYY-MM-DD");
      const sources = (meta.sources ?? []).map((s) => (typeof s === "string" ? { title: s } : s));
      for (const s of sources) if (!s.title) err(rel, "every source needs a title");

      const entry = {
        id,
        type: t,
        origin: "kb",
        title: meta.title,
        domain: meta.domain,
        tags: (meta.tags ?? []).map(String),
        summary: meta.summary,
        status: meta.status ?? "draft",
        updated: meta.updated instanceof Date ? meta.updated.toISOString().slice(0, 10) : (meta.updated ?? null),
        sources,
        related: meta.related ?? [],
        redacted: meta.redacted ?? null,
        file: rel,
      };
      if (t === "slideshow") {
        entry.slides = splitSlides(body);
        if (!entry.slides.length) err(rel, "slideshow has no slides");
        entry.text = plain(body.replace(/\n\?\?\?\s*\n/g, "\n"));
      } else {
        entry.html = marked.parse(body);
        entry.sections = headings(body);
        entry.text = plain(body);
      }
      out.push(entry);
    }
  }
  return out;
}

// Mandates: every presidential document and guidance item becomes a searchable
// entry that opens in the Mandates section (#/mandates/item/<id>). Nothing is
// dropped: documents judged irrelevant (or not yet analysed) stay findable but
// rank lower via `boost`. `fed` carries what the federal-context panels show.
const RELEVANCE_BOOST = { high: 1.35, medium: 1.15, low: 0.8, none: 0.35, untriaged: 0.55 };

function loadEo() {
  const read = (f) => {
    try {
      return JSON.parse(fs.readFileSync(path.join(EO_DATA, `${f}.json`), "utf8"));
    } catch {
      return null;
    }
  };
  const catalog = read("catalog");
  const analysis = read("analysis");
  const guidance = read("guidance");
  if (!catalog || !analysis || !guidance) {
    err("mandates/data", "Mandates data not found or unreadable");
    return [];
  }
  const text = (a) => [a.summary, a.forYou, ...(a.actions ?? []).map((x) => x.text), a.statusNote].filter(Boolean).join(" ");
  const fed = (label, a) => ({
    label,
    relevance: a?.relevance ?? "untriaged",
    status: a?.status ?? "in-effect",
    forYou: a?.forYou ?? null,
    actions: (a?.actions ?? []).map(({ id, tier, lens, text, due, dueNote, recurring, verify }) => ({ id, tier, lens, text, due, dueNote, recurring, verify })),
  });
  const out = [];

  for (const d of catalog.documents) {
    const a = analysis.items[d.id];
    const rel = a?.relevance ?? "untriaged";
    const label = d.kind === "eo" && d.number ? `EO ${d.number}` : "Presidential memorandum";
    out.push({
      id: `eo-${d.id}`.replace(/^eo-eo-/, "eo-"),
      eoId: d.id,
      type: "reference",
      origin: "eo",
      title: d.kind === "eo" && d.number ? `EO ${d.number}: ${d.title}` : d.title,
      domain: "mandates",
      tags: [...(a?.topics ?? []), d.kind === "eo" ? "executive-order" : "memorandum", `relevance-${rel}`],
      summary: a?.summary ?? d.abstract ?? "Not analysed yet.",
      status: a?.reviewed ? "reviewed" : "draft",
      updated: a?.updated ?? d.signed ?? null,
      sources: [{ title: d.citation ?? "Federal Register", url: d.htmlUrl ?? null }],
      related: [],
      link: `#/mandates/item/${encodeURIComponent(d.id)}`,
      boost: RELEVANCE_BOOST[rel] ?? 1,
      fed: fed(label, a),
      text: a ? text(a) : (d.abstract ?? ""),
    });
  }
  for (const g of guidance.items) {
    const label = g.number ?? g.issuer;
    out.push({
      id: `eo-${g.id}`,
      eoId: g.id,
      type: "reference",
      origin: "eo",
      title: g.number ? `${g.issuer} ${g.number}: ${g.title}` : `${g.issuer}: ${g.title}`,
      domain: "mandates",
      tags: [...(g.topics ?? []), (g.issuer ?? "").toLowerCase(), g.relevance ? `relevance-${g.relevance}` : null].filter(Boolean),
      summary: g.summary,
      status: g.reviewed ? "reviewed" : "draft",
      updated: g.updated ?? g.date ?? null,
      sources: [{ title: g.number ? `${g.issuer} ${g.number}` : g.issuer, url: g.url ?? null }],
      related: [],
      link: `#/mandates/item/${encodeURIComponent(g.id)}`,
      boost: (RELEVANCE_BOOST[g.relevance] ?? 1) * (["rescinded", "superseded", "revoked"].includes(g.status) ? 0.6 : 1),
      fed: fed(label, g),
      text: text(g),
    });
  }

  if (!CHECK) {
    fs.mkdirSync(EO_OUT, { recursive: true });
    for (const f of EO_FILES) fs.copyFileSync(path.join(EO_DATA, `${f}.json`), path.join(EO_OUT, `${f}.json`));
  }
  return out;
}

const authored = loadAuthored();
const eo = loadEo();
const entries = [...authored, ...eo];

const seen = new Set();
for (const e of entries) {
  if (seen.has(e.id)) err(e.file ?? e.id, `duplicate id "${e.id}"`);
  seen.add(e.id);
}
for (const e of authored) for (const r of e.related) if (!seen.has(r)) err(e.file, `related id "${r}" not found`);

if (errors.length) {
  console.error(`✗ ${errors.length} content error(s):\n  ` + errors.join("\n  "));
  process.exit(1);
}

const payload = { schema: 1, built: new Date().toISOString(), taxonomy, entries };
if (!CHECK) {
  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, JSON.stringify(payload));
}
const by = entries.reduce((m, e) => ((m[e.type] = (m[e.type] ?? 0) + 1), m), {});
console.log(`✓ ${entries.length} entries (${Object.entries(by).map(([k, v]) => `${v} ${k}`).join(", ")})${CHECK ? " — check only" : ` → ${path.relative(ROOT, OUT)}`}`);
