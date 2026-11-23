import { useEffect, useState } from "react";
import MiniSearch from "minisearch";

// One JSON file (public/data/kb.json, built by scripts/build-content.mjs)
// holds every entry. The search index is built in the browser on load; at a
// few thousand entries this still takes well under 100 ms.

let cache = null;

function load() {
  if (!cache) {
    cache = fetch("/data/kb.json", { credentials: "same-origin" })
      .then((r) => {
        if (r.status === 401 || r.redirected) {
          window.location.href = "/login";
          throw new Error("signed out");
        }
        if (!r.ok) throw new Error(`kb.json: HTTP ${r.status}`);
        return r.json();
      })
      .then(prepare);
  }
  return cache;
}

function prepare(kb) {
  const byId = new Map(kb.entries.map((e) => [e.id, e]));
  const index = new MiniSearch({
    idField: "id",
    fields: ["title", "tags", "summary", "text", "domainLabel"],
    storeFields: ["id"],
    extractField: (doc, f) => (f === "tags" ? doc.tags.join(" ") : f === "domainLabel" ? kb.taxonomy.domains[doc.domain]?.label : doc[f]),
    searchOptions: {
      boost: { title: 4, tags: 3, summary: 2, domainLabel: 1.5 },
      prefix: true,
      fuzzy: (term) => (term.length > 3 ? 0.2 : false),
      combineWith: "AND",
    },
  });
  index.addAll(kb.entries);

  const tagCounts = {};
  for (const e of kb.entries) for (const t of e.tags) tagCounts[t] = (tagCounts[t] ?? 0) + 1;

  return { ...kb, byId, index, tagCounts };
}

export function useKb() {
  const [state, setState] = useState({ kb: null, error: null });
  useEffect(() => {
    let live = true;
    load().then(
      (kb) => live && setState({ kb, error: null }),
      (error) => live && setState({ kb: null, error }),
    );
    return () => {
      live = false;
    };
  }, []);
  return state;
}

/**
 * Query + facet filters → ranked results and facet counts.
 * Facet counts reflect the query and every *other* active filter, so you can
 * always see what a click would give you.
 */
export function search(kb, { q = "", type = "", domain = "", tag = "", origin = "" }) {
  const query = q.trim();
  let hits;
  if (query) {
    let res = kb.index.search(query);
    // AND across terms can be too strict for long phrases; fall back to OR.
    if (!res.length) res = kb.index.search(query, { combineWith: "OR" });
    hits = res.map((r) => ({ entry: kb.byId.get(r.id), score: r.score, terms: r.terms }));
  } else {
    hits = kb.entries
      .map((entry) => ({ entry, score: 0, terms: [] }))
      .sort((a, b) => originRank(a.entry) - originRank(b.entry) || String(b.entry.updated ?? "").localeCompare(String(a.entry.updated ?? "")));
  }

  const filters = { type, domain, tag, origin };
  const pass = (e, skip) =>
    (skip === "type" || !type || e.type === type) &&
    (skip === "domain" || !domain || e.domain === domain) &&
    (skip === "tag" || !tag || e.tags.includes(tag)) &&
    (skip === "origin" || !origin || e.origin === origin);

  const facets = { type: {}, domain: {}, tag: {}, origin: {} };
  for (const { entry: e } of hits) {
    if (pass(e, "type")) facets.type[e.type] = (facets.type[e.type] ?? 0) + 1;
    if (pass(e, "domain")) facets.domain[e.domain] = (facets.domain[e.domain] ?? 0) + 1;
    if (pass(e, "origin")) facets.origin[e.origin] = (facets.origin[e.origin] ?? 0) + 1;
    if (pass(e, "tag")) for (const t of e.tags) facets.tag[t] = (facets.tag[t] ?? 0) + 1;
  }
  return { results: hits.filter((h) => pass(h.entry)), facets, filters };
}

// Authored KB content first, imported references after.
const originRank = (e) => (e.origin === "kb" ? 0 : 1);

/** Wrap matched terms in <mark>. Input is plain text; output is escaped HTML. */
export function highlight(text, terms) {
  const esc = String(text ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
  if (!terms?.length) return esc;
  const re = new RegExp(`\\b(${terms.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "gi");
  return esc.replace(re, "<mark>$1</mark>");
}
