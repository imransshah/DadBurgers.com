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

export function EntryRow({ kb, entry, terms }) {
  return (
    <li className="row">
      <a href={href(`e/${entry.id}`)} className="row-link">
        <div className="row-meta">
          <TypeBadge kb={kb} type={entry.type} />
          <span className="muted">{kb.taxonomy.domains[entry.domain]?.label}</span>
          <StatusBadge status={entry.status} />
        </div>
        <h3 dangerouslySetInnerHTML={{ __html: highlight(entry.title, terms) }} />
        <p className="row-sum" dangerouslySetInnerHTML={{ __html: highlight(entry.summary, terms) }} />
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
