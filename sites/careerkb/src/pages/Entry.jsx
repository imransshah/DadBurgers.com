import { useEffect } from "react";
import { href } from "../lib/route.js";
import { recordVisit, usePins } from "../lib/prefs.js";
import { EntryTile, StatusBadge, TypeBadge } from "../components/ui.jsx";
import Slideshow from "../components/Slideshow.jsx";

export default function Entry({ kb, id, query }) {
  const entry = kb.byId.get(id);
  const [pins, togglePin] = usePins();

  useEffect(() => {
    if (entry) {
      recordVisit(entry.id);
      document.title = `${entry.title} · Career KB`;
    }
    return () => {
      document.title = "Career KB";
    };
  }, [entry]);

  if (!entry)
    return (
      <div className="empty">
        No entry called <code>{id}</code>. <a href="#/">Back home</a>
      </div>
    );

  const domain = kb.taxonomy.domains[entry.domain];
  const related = entry.related.map((r) => kb.byId.get(r)).filter(Boolean);
  const pinned = pins.includes(entry.id);

  return (
    <article className={`entry e-${entry.type}`}>
      <nav className="crumbs no-print">
        <a href="#/">Home</a> / <a href={href("search", { domain: entry.domain })}>{domain?.label}</a> /{" "}
        <a href={href("search", { type: entry.type })}>{kb.taxonomy.types[entry.type]?.plural}</a>
      </nav>

      <header className="entry-head">
        <div className="row-meta">
          <TypeBadge kb={kb} type={entry.type} />
          <StatusBadge status={entry.status} />
          {entry.updated && <span className="muted small">Updated {entry.updated}</span>}
        </div>
        <h1>{entry.title}</h1>
        <p className="lede">{entry.summary}</p>
        {entry.redacted && (
          <p className="redacted small">
            <b>Redacted edition.</b> {entry.redacted}
          </p>
        )}
        <div className="actions no-print">
          <button className={`btn ${pinned ? "on" : ""}`} onClick={() => togglePin(entry.id)} aria-pressed={pinned}>
            {pinned ? "★ Pinned" : "☆ Pin"}
          </button>
          {entry.type !== "slideshow" && (
            <button className="btn" onClick={() => window.print()}>
              Print
            </button>
          )}
          {entry.link && (
            <a className="btn" href={entry.link} target="_blank" rel="noopener noreferrer">
              Order of Operations ↗
            </a>
          )}
        </div>
      </header>

      {entry.type === "slideshow" ? (
        <Slideshow entry={entry} query={query} />
      ) : (
        <div className={`prose ${entry.type === "desk-card" ? "card" : ""}`} dangerouslySetInnerHTML={{ __html: entry.html }} />
      )}

      <footer className="entry-foot">
        {entry.sources.length > 0 && (
          <section>
            <h2>Sources</h2>
            <ol className="sources">
              {entry.sources.map((s, i) => (
                <li key={i}>
                  {s.url ? (
                    <a href={s.url} target="_blank" rel="noopener noreferrer">
                      {s.title} ↗
                    </a>
                  ) : (
                    <>
                      {s.title} <span className="badge verify" title="No link recorded yet: find the primary source before relying on this">⚑ Verify</span>
                    </>
                  )}
                </li>
              ))}
            </ol>
          </section>
        )}
        {entry.tags.length > 0 && (
          <section className="no-print">
            <h2>Tags</h2>
            <div className="tags">
              {entry.tags.map((t) => (
                <a key={t} className="tag" href={href("search", { tag: t })}>
                  {t}
                </a>
              ))}
            </div>
          </section>
        )}
        {related.length > 0 && (
          <section className="no-print">
            <h2>Related</h2>
            <div className="tiles">{related.map((e) => <EntryTile key={e.id} kb={kb} entry={e} />)}</div>
          </section>
        )}
        {entry.file && <p className="faint small no-print">Source file: {entry.file}</p>}
      </footer>
    </article>
  );
}
