import { href } from "../lib/route.js";
import { highlight } from "../lib/data.js";

const TYPE_ICON = { "desk-card": "▤", slideshow: "▶", article: "¶", reference: "§" };

export function TypeBadge({ kb, type }) {
  return (
    <span className={`badge t-${type}`}>
      <span aria-hidden="true">{TYPE_ICON[type]}</span> {kb.taxonomy.types[type]?.label ?? type}
    </span>
  );
}

export function StatusBadge({ status }) {
  return status === "draft" ? <span className="badge draft" title="Drafted by Claude; not yet reviewed">Draft</span> : null;
}

// For decks, jump straight to the first slide that mentions a matched term.
function firstSlide(entry, q) {
  const words = (q ?? "").toLowerCase().split(/\s+/).filter((w) => w.length > 1);
  if (!entry.slides || !words.length) return null;
  const res = words.map((t) => new RegExp(`\\b${t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`, "i"));
  const strip = (h) => h.replace(/<[^>]+>/g, " ");
  const all = (text) => res.every((r) => r.test(text));
  // Prefer a slide whose own content matches; then notes. Skip the cover,
  // whose notes summarize the whole deck.
  let i = entry.slides.findIndex((s, k) => k > 0 && all(strip(s.html)));
  if (i < 0) i = entry.slides.findIndex((s, k) => k > 0 && all(strip(s.html + " " + s.notes)));
  return i > 0 ? i + 1 : null;
}

export function EntryRow({ kb, entry, terms, q }) {
  const s = firstSlide(entry, q);
  return (
    <li className="row">
      <a href={href(`e/${entry.id}`, s ? { s: String(s) } : undefined)} className="row-link">
        <div className="row-meta">
          <TypeBadge kb={kb} type={entry.type} />
          <span className="muted">{kb.taxonomy.domains[entry.domain]?.label}</span>
          <StatusBadge status={entry.status} />
        </div>
        <h3 dangerouslySetInnerHTML={{ __html: highlight(entry.title, terms) }} />
        <p className="row-sum" dangerouslySetInnerHTML={{ __html: highlight(entry.summary, terms) }} />
        {s && <p className="small muted">First match on slide {s} of {entry.slides.length}</p>}
      </a>
      {entry.tags.length > 0 && (
        <div className="tags">
          {entry.tags.slice(0, 6).map((t) => (
            <a key={t} className="tag" href={href("search", { tag: t })}>
              {t}
            </a>
          ))}
        </div>
      )}
    </li>
  );
}

export function EntryTile({ kb, entry }) {
  return (
    <a className="tile" href={href(`e/${entry.id}`)}>
      <div className="row-meta">
        <TypeBadge kb={kb} type={entry.type} />
        <StatusBadge status={entry.status} />
      </div>
      <b>{entry.title}</b>
      <span className="muted small clamp">{entry.summary}</span>
    </a>
  );
}
