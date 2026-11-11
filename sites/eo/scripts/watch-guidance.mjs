// Checks the OMB memoranda page, OPM's CHCO memos, CISA's directives and
// FedRAMP's notices for anything not already in guidance.json, and adds it to
// inbox.json for review. Each source fails on its own without stopping the
// others; per-source health is written to meta.json.
//
// First run for a source records a baseline instead of flooding the inbox:
// only items whose number marks them as 2026 or later get through.
//
//   node scripts/watch-guidance.mjs

import { anchors, fetchRetry, readData, slug, writeData } from "./lib.mjs";

const SOURCES = [
  {
    name: "OMB memoranda",
    issuer: "OMB",
    url: "https://www.whitehouse.gov/omb/information-resources/guidance/memoranda/",
    pick(a) {
      const m = (a.href + " " + a.text).match(/\bM-(\d{2})-(\d{2})\b/i);
      if (!m) return null;
      return { id: `omb-m-${m[1]}-${m[2]}`, number: `M-${m[1]}-${m[2]}`, year: 2000 + Number(m[1]) };
    },
  },
  {
    name: "OPM CHCO memos",
    issuer: "OPM/CHCO",
    url: "https://www.opm.gov/chcoc/latest-memos/",
    pick(a) {
      if (!/\/chcoc\/latest-memos\/.+/i.test(a.href) || a.text.length < 12) return null;
      return { id: `opm-${slug(a.text, 70)}`, number: null, year: null };
    },
  },
  {
    name: "CISA directives",
    issuer: "CISA",
    url: "https://www.cisa.gov/news-events/directives",
    pick(a) {
      const m = a.href.match(/\/directives\/(bod|ed)-(\d{2})-(\d{2})/i);
      if (!m) return null;
      const kind = m[1].toLowerCase();
      return { id: `cisa-${kind}-${m[2]}-${m[3]}`, number: `${kind.toUpperCase()} ${m[2]}-${m[3]}`, year: 2000 + Number(m[2]) };
    },
  },
  {
    name: "FedRAMP notices",
    issuer: "FedRAMP",
    url: "https://www.fedramp.gov/notices/",
    pick(a) {
      const m = a.href.match(/\/notices\/(\d{4})\/?$/);
      if (!m) return null;
      return { id: `fedramp-ntc-${m[1]}`, number: `NTC-${m[1]}`, year: null };
    },
  },
];

async function main() {
  const guidance = readData("guidance");
  const inbox = readData("inbox");
  const meta = readData("meta");
  meta.sources ??= {};
  meta.watchSeen ??= {};

  const known = new Set(guidance.items.map((g) => g.id));
  const knownUrls = new Set(guidance.items.map((g) => g.url).filter(Boolean));
  for (const x of inbox.items) known.add(x.id);
  let added = 0;

  for (const src of SOURCES) {
    const at = new Date().toISOString();
    try {
      const html = await (await fetchRetry(src.url, { accept: "text/html" })).text();
      const found = new Map();
      for (const a of anchors(html, src.url)) {
        const p = src.pick(a);
        if (p && !found.has(p.id)) found.set(p.id, { ...p, url: a.href, title: a.text || p.number });
      }
      if (found.size === 0) throw new Error("page parsed but no items matched; the layout may have changed");

      const firstRun = !meta.watchSeen[src.name];
      const seen = new Set(meta.watchSeen[src.name] ?? []);
      for (const [id, f] of found) {
        if (seen.has(id)) continue;
        seen.add(id);
        if (known.has(id) || knownUrls.has(f.url)) continue;
        if (firstRun && !(f.year && f.year >= 2026)) continue;
        inbox.items.unshift({ id, source: src.issuer, number: f.number, title: f.title, url: f.url, foundAt: at });
        known.add(id);
        added++;
      }
      meta.watchSeen[src.name] = [...seen].slice(-2000);
      meta.sources[src.name] = { ok: true, at, found: found.size };
      console.log(`${src.name}: ${found.size} listed`);
    } catch (e) {
      meta.sources[src.name] = { ok: false, at, error: e.message.slice(0, 300) };
      console.error(`${src.name}: ${e.message}`);
    }
  }

  writeData("inbox", inbox);
  writeData("meta", meta);
  console.log(`inbox +${added} (total ${inbox.items.length})`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
