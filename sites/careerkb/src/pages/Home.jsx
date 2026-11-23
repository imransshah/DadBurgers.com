import { useMemo } from "react";
import { href } from "../lib/route.js";
import { recent, usePins } from "../lib/prefs.js";
import { EntryTile } from "../components/ui.jsx";

export default function Home({ kb }) {
  const [pins] = usePins();
  const recentIds = useMemo(() => recent(), []);
  const pick = (ids) => ids.map((id) => kb.byId.get(id)).filter(Boolean);

  const counts = useMemo(() => {
    const t = {}, d = {};
    for (const e of kb.entries) {
      t[e.type] = (t[e.type] ?? 0) + 1;
      d[e.domain] = (d[e.domain] ?? 0) + 1;
    }
    return { t, d };
  }, [kb]);

  const latest = useMemo(
    () =>
      kb.entries
        .filter((e) => e.origin === "kb")
        .sort((a, b) => String(b.updated ?? "").localeCompare(String(a.updated ?? "")))
        .slice(0, 6),
    [kb],
  );

  const pinned = pick(pins);
  const viewed = pick(recentIds).slice(0, 6);
  const topTags = Object.entries(kb.tagCounts)
    .filter(([t]) => !t.startsWith("relevance-"))
    .sort((a, b) => b[1] - a[1])
    .slice(0, 18);

  return (
    <div className="home">
      <section className="hero">
        <h1>What do you need to know?</h1>
        <p className="muted">
          {kb.entries.length} entries. Press <kbd>/</kbd> to search, or start from a type or domain.
        </p>
        <div className="typegrid">
          {Object.entries(kb.taxonomy.types).map(([k, v]) => (
            <a key={k} className={`typecard t-${k}`} href={href("search", { type: k })}>
              <b>{counts.t[k] ?? 0}</b>
              <span>{v.plural}</span>
            </a>
          ))}
        </div>
      </section>

      {pinned.length > 0 && (
        <Section title="Pinned">
          <div className="tiles">{pinned.map((e) => <EntryTile key={e.id} kb={kb} entry={e} />)}</div>
        </Section>
      )}

      {viewed.length > 0 && (
        <Section title="Recently viewed">
          <div className="tiles">{viewed.map((e) => <EntryTile key={e.id} kb={kb} entry={e} />)}</div>
        </Section>
      )}

      <Section title="Latest from Claude" more={href("search", { origin: "kb" })}>
        <div className="tiles">{latest.map((e) => <EntryTile key={e.id} kb={kb} entry={e} />)}</div>
      </Section>

      <Section title="Domains">
        <div className="domains">
          {Object.entries(kb.taxonomy.domains).map(([k, v]) => (
            <a key={k} className="domain" href={href("search", { domain: k })}>
              <span className="domain-head">
                <b>{v.label}</b>
                <span className="count">{counts.d[k] ?? 0}</span>
              </span>
              <span className="muted small">{v.blurb}</span>
            </a>
          ))}
        </div>
      </Section>

      <Section title="Tags">
        <div className="tags">
          {topTags.map(([t, n]) => (
            <a key={t} className="tag" href={href("search", { tag: t })}>
              {t} <span className="faint">{n}</span>
            </a>
          ))}
        </div>
      </Section>
    </div>
  );
}

function Section({ title, more, children }) {
  return (
    <section className="section">
      <div className="section-head">
        <h2>{title}</h2>
        {more && <a href={more}>See all →</a>}
      </div>
      {children}
    </section>
  );
}
