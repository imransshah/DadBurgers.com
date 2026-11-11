// Loads the static JSON (served behind the password) and builds one index of
// "items" — presidential documents and guidance share a shape so every page,
// the map and the queue can treat them alike.

const FILES = ["catalog", "analysis", "guidance", "inbox", "meta", "profile"];

export async function loadData() {
  const entries = await Promise.all(
    FILES.map(async (name) => {
      const res = await fetch(`/data/${name}.json`, { cache: "no-cache" });
      if (!res.ok) throw new Error(`Could not load ${name}.json (${res.status})`);
      return [name, await res.json()];
    }),
  );
  return buildIndex(Object.fromEntries(entries));
}

export const ISSUER_GROUPS = [
  { key: "OMB", match: (i) => /^OMB/.test(i) },
  { key: "OPM/CHCO", match: (i) => /^OPM|CHCO/.test(i) },
  { key: "CISA", match: (i) => i === "CISA" },
  { key: "FedRAMP", match: (i) => i === "FedRAMP" },
  { key: "NIST", match: (i) => i === "NIST" },
  { key: "Other", match: () => true },
];

export function issuerGroup(issuer) {
  return ISSUER_GROUPS.find((g) => g.match(issuer ?? "")).key;
}

export const RELEVANCE_ORDER = { high: 0, medium: 1, low: 2, none: 3, untriaged: 4 };

export function labelFor(item) {
  if (item.group === "presidential") {
    if (item.kind === "eo") return `EO ${item.number}`;
    return "Pres. Memo";
  }
  return item.number || item.issuer;
}

export function buildIndex(raw) {
  const items = new Map();
  const analysis = raw.analysis.items ?? {};

  for (const d of raw.catalog.documents ?? []) {
    const a = analysis[d.id];
    items.set(d.id, {
      id: d.id,
      group: "presidential",
      kind: d.kind,
      number: d.number,
      issuer: "President",
      title: d.title,
      date: d.signed,
      dateApprox: null,
      published: d.published,
      citation: d.citation,
      frDoc: d.frDoc,
      url: d.htmlUrl,
      pdfUrl: d.pdfUrl,
      abstract: d.abstract,
      frNotes: d.notes,
      legacy: !!d.legacy,
      president: d.president,
      firstSeen: d.firstSeen,
      source: d.source,
      triaged: !!a,
      relevance: a?.relevance ?? "untriaged",
      topics: a?.topics ?? [],
      summary: a?.summary ?? d.abstract ?? null,
      forYou: a?.forYou ?? null,
      status: a?.status ?? "in-effect",
      statusNote: a?.statusNote ?? null,
      lineage: a?.lineage ?? {},
      litigation: a?.litigation ?? [],
      actions: a?.actions ?? [],
      related: a?.related ?? [],
      implements: [],
      sources: a?.sources ?? [],
      author: a?.author ?? null,
      reviewed: !!a?.reviewed,
      updated: a?.updated ?? null,
    });
  }

  for (const g of raw.guidance.items ?? []) {
    items.set(g.id, {
      ...g,
      group: "guidance",
      kind: g.type,
      title: g.title,
      date: g.date,
      dateApprox: g.dateApprox,
      firstSeen: g.firstSeen ?? null,
      triaged: true,
      lineage: { supersedes: g.supersedes ?? [], supersededBy: g.supersededBy ?? [] },
      litigation: [],
      legacy: false,
    });
  }

  for (const item of items.values()) item.label = labelFor(item);

  // Undirected link graph with a type on each edge, for the map and the
  // "connected" panels. Dangling ids (not in the catalog yet) are kept so the
  // UI can show them as plain text and the review page can flag them.
  const links = new Map();
  const add = (a, b, type) => {
    if (!a || !b || a === b) return;
    if (!links.has(a)) links.set(a, []);
    if (!links.has(b)) links.set(b, []);
    if (!links.get(a).some((l) => l.id === b && l.type === type)) links.get(a).push({ id: b, type, dir: "out" });
    if (!links.get(b).some((l) => l.id === a && l.type === type)) links.get(b).push({ id: a, type, dir: "in" });
  };
  for (const item of items.values()) {
    for (const t of item.implements ?? []) add(item.id, t, "implements");
    for (const t of item.related ?? []) add(item.id, t, "related");
    const L = item.lineage ?? {};
    for (const t of L.amends ?? []) add(item.id, t, "amends");
    for (const t of L.revokes ?? []) add(item.id, t, "revokes");
    for (const t of L.supersedes ?? []) add(item.id, t, "supersedes");
    for (const t of L.amendedBy ?? []) add(t, item.id, "amends");
    for (const t of L.revokedBy ?? []) add(t, item.id, "revokes");
    for (const t of L.supersededBy ?? []) add(t, item.id, "supersedes");
  }

  const dangling = [];
  for (const [id, ls] of links) {
    if (!items.has(id)) dangling.push({ id, from: ls.map((l) => l.id) });
  }

  return {
    items,
    links,
    dangling,
    inbox: raw.inbox.items ?? [],
    meta: raw.meta,
    profile: raw.profile,
  };
}

/** Every action on the site, joined to its source item. */
export function allActions(data, internal = []) {
  const out = [];
  for (const item of data.items.values()) {
    for (const a of item.actions ?? []) out.push({ ...a, source: item });
  }
  for (const entry of internal) {
    const source = {
      id: `internal:${entry.id}`,
      group: "internal",
      label: entry.reference || "Internal",
      title: entry.title,
      issuer: entry.issuer || "Internal",
    };
    (entry.actions ?? []).forEach((a, i) =>
      out.push({
        id: `internal:${entry.id}:${a.key ?? i}`,
        tier: a.tier ?? "must",
        lens: a.lens ?? "ops",
        text: a.text,
        cite: null,
        due: a.due || null,
        dueNote: null,
        recurring: null,
        verify: false,
        source,
      }),
    );
  }
  return out;
}

export function searchItems(data, q) {
  const needle = q.trim().toLowerCase();
  if (!needle) return [];
  const terms = needle.split(/\s+/);
  const scored = [];
  for (const item of data.items.values()) {
    const hay = [item.label, item.title, item.summary, item.forYou, item.issuer, (item.topics ?? []).join(" "), item.number]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    if (!terms.every((t) => hay.includes(t))) continue;
    let score = 0;
    if (item.label?.toLowerCase().includes(needle)) score += 10;
    if (item.title.toLowerCase().includes(needle)) score += 5;
    score -= RELEVANCE_ORDER[item.relevance] ?? 5;
    scored.push({ item, score });
  }
  return scored.sort((a, b) => b.score - a.score).map((s) => s.item);
}
