// Pulls every executive order and presidential memorandum signed since
// Jan 20, 2025 from the Federal Register API and merges them into
// public/data/catalog.json. Never deletes. Never touches analysis.
//
// Also checks curated (seeded) entries against the official record and
// writes any title mismatches to meta.json, which is how a wrong EO number in
// the hand-written seed gets caught.
//
//   node scripts/sync-federal-register.mjs

import { fetchRetry, readData, slug, todayUTC, writeData } from "./lib.mjs";

const API = "https://www.federalregister.gov/api/v1/documents.json";
const SINCE = "2025-01-20";
const FIELDS = [
  "document_number",
  "executive_order_number",
  "title",
  "signing_date",
  "publication_date",
  "citation",
  "html_url",
  "pdf_url",
  "abstract",
  "executive_order_notes",
  "subtype",
  "president",
  "raw_text_url",
];

async function pull(type) {
  const params = new URLSearchParams();
  params.append("conditions[type][]", "PRESDOCU");
  params.append("conditions[presidential_document_type][]", type);
  params.append("conditions[signing_date][gte]", SINCE);
  params.append("per_page", "1000");
  params.append("order", "oldest");
  for (const f of FIELDS) params.append("fields[]", f);
  let url = `${API}?${params}`;
  const docs = [];
  while (url) {
    const res = await fetchRetry(url);
    const page = await res.json();
    docs.push(...(page.results ?? []));
    url = page.next_page_url ?? null;
  }
  return docs;
}

const norm = (s) => slug(s ?? "", 400).replace(/-/g, " ");

function similar(a, b) {
  const A = new Set(norm(a).split(" ").filter((w) => w.length > 3));
  const B = new Set(norm(b).split(" ").filter((w) => w.length > 3));
  if (!A.size || !B.size) return false;
  let hit = 0;
  for (const w of A) if (B.has(w)) hit++;
  return hit / Math.min(A.size, B.size) >= 0.6;
}

async function main() {
  const catalog = readData("catalog");
  const meta = readData("meta");
  const today = todayUTC();
  const byId = new Map(catalog.documents.map((d) => [d.id, d]));
  const errors = [];
  const mismatches = [];
  let added = 0;
  let updated = 0;

  for (const type of ["executive_order", "memorandum"]) {
    let docs;
    try {
      docs = await pull(type);
      console.log(`${type}: ${docs.length} from the Federal Register`);
    } catch (e) {
      errors.push(`${type}: ${e.message}`);
      console.error(`${type}: ${e.message}`);
      continue;
    }

    for (const r of docs) {
      const isEO = type === "executive_order" && r.executive_order_number;
      let id = isEO ? `eo-${r.executive_order_number}` : `pm-${r.signing_date}-${slug(r.title)}`;

      // A seeded memo may carry a shorter slug than the FR title gives. Reuse
      // it when the date matches and the titles clearly describe the same thing.
      if (!isEO && !byId.has(id)) {
        const twin = catalog.documents.find(
          (d) => d.kind === "memo" && d.signed === r.signing_date && similar(d.title, r.title),
        );
        if (twin) id = twin.id;
      }

      const existing = byId.get(id);
      const fields = {
        title: r.title,
        signed: r.signing_date,
        published: r.publication_date,
        citation: r.citation ?? null,
        frDoc: r.document_number,
        htmlUrl: r.html_url,
        pdfUrl: r.pdf_url ?? null,
        abstract: r.abstract ?? null,
        notes: r.executive_order_notes ?? null,
        textUrl: r.raw_text_url ?? null,
        president: r.president?.identifier ?? "donald-trump",
      };

      if (!existing) {
        const doc = { id, kind: isEO ? "eo" : "memo", number: isEO ? r.executive_order_number : null, ...fields, legacy: false, source: "federal-register", firstSeen: today };
        catalog.documents.push(doc);
        byId.set(id, doc);
        added++;
        continue;
      }

      // Keep the hand-written title so a mismatch stays flagged on every run
      // until someone fixes the curated entry (and deletes seedTitle).
      if (existing.source === "seed") existing.seedTitle = existing.title;
      if (existing.seedTitle && !similar(existing.seedTitle, r.title)) {
        mismatches.push({ id, seedTitle: existing.seedTitle, officialTitle: r.title, signed: r.signing_date });
      } else if (existing.seedTitle) {
        delete existing.seedTitle;
      }
      const before = JSON.stringify(existing);
      Object.assign(existing, fields, { source: existing.source === "seed" ? "seed+federal-register" : existing.source });
      if (JSON.stringify(existing) !== before) updated++;
    }
  }

  catalog.documents.sort((a, b) => (b.signed ?? "").localeCompare(a.signed ?? "") || (b.number ?? 0) - (a.number ?? 0));
  writeData("catalog", catalog);

  const ok = errors.length === 0;
  meta.lastSync = new Date().toISOString();
  meta.lastSyncOk = ok;
  meta.lastError = ok ? null : errors.join("; ");
  meta.titleMismatches = mismatches;
  meta.counts = { ...(meta.counts ?? {}), documents: catalog.documents.length };
  writeData("meta", meta);

  console.log(`added ${added}, updated ${updated}, mismatches ${mismatches.length}, errors ${errors.length}`);
  for (const m of mismatches) console.log(`  MISMATCH ${m.id}: seed "${m.seedTitle}" vs official "${m.officialTitle}"`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
