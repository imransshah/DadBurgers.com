import { useMemo, useState } from "react";
import { search } from "../lib/data.js";
import { setQuery } from "../lib/route.js";
import { EntryRow } from "../components/ui.jsx";
import { AskPanel, FederalContext } from "../components/Federal.jsx";

const PAGE = 40;
const ORIGIN_LABEL = { kb: "Written for you", eo: "Mandates" };

export default function Search({ kb, query }) {
  const { q = "", type = "", domain = "", tag = "", origin = "" } = query;
  const { results, facets } = useMemo(() => search(kb, { q, type, domain, tag, origin }), [kb, q, type, domain, tag, origin]);
  const [shown, setShown] = useState(PAGE);
  const [tagsOpen, setTagsOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const active = [
    type && { k: "type", label: kb.taxonomy.types[type]?.label ?? type },
    domain && { k: "domain", label: kb.taxonomy.domains[domain]?.label ?? domain },
    tag && { k: "tag", label: `#${tag}` },
    origin && { k: "origin", label: ORIGIN_LABEL[origin] ?? origin },
  ].filter(Boolean);

  const tagList = Object.entries(facets.tag)
    .filter(([t]) => !t.startsWith("relevance-"))
    .sort((a, b) => b[1] - a[1]);

  return (
    <div className="search">
      <button className="btn filters-toggle" onClick={() => setFiltersOpen((o) => !o)} aria-expanded={filtersOpen}>
        {filtersOpen ? "Hide filters" : `Filters${active.length ? ` (${active.length})` : ""}`}
      </button>
      <aside className={`facets ${filtersOpen ? "open" : ""}`}>
        <Facet title="Type" value={type} counts={facets.type} label={(k) => kb.taxonomy.types[k]?.plural ?? k} onPick={(v) => setQuery({ type: v })} />
        <Facet title="Domain" value={domain} counts={facets.domain} label={(k) => kb.taxonomy.domains[k]?.label ?? k} onPick={(v) => setQuery({ domain: v })} />
        <Facet title="Source" value={origin} counts={facets.origin} label={(k) => ORIGIN_LABEL[k] ?? k} onPick={(v) => setQuery({ origin: v })} />
        <div className="facet">
          <h4>Tags</h4>
          <div className="tags">
            {(tagsOpen ? tagList : tagList.slice(0, 14)).map(([t, n]) => (
              <button key={t} className={`tag ${t === tag ? "on" : ""}`} onClick={() => setQuery({ tag: t === tag ? "" : t })}>
                {t} <span className="faint">{n}</span>
              </button>
            ))}
          </div>
          {tagList.length > 14 && (
            <button className="linkish small" onClick={() => setTagsOpen((o) => !o)}>
              {tagsOpen ? "Fewer" : `All ${tagList.length} tags`}
            </button>
          )}
        </div>
      </aside>

      <section className="results">
        <div className="results-head">
          <h1>
            {results.length} {results.length === 1 ? "result" : "results"}
            {q && (
              <>
                {" "}
                for <q>{q}</q>
              </>
            )}
          </h1>
          {active.length > 0 && (
            <div className="chips">
              {active.map((a) => (
                <button key={a.k} className="chip" onClick={() => setQuery({ [a.k]: "" })} aria-label={`Remove filter ${a.label}`}>
                  {a.label} ×
                </button>
              ))}
              <button className="linkish small" onClick={() => setQuery({ type: "", domain: "", tag: "", origin: "" })}>
                Clear filters
              </button>
            </div>
          )}
        </div>
        {q && !type && !origin && <FederalContext results={results} q={q} />}
        {q && <AskPanel key={q} results={results} q={q} />}
        {results.length === 0 ? (
          <div className="empty">
            Nothing matches. Try fewer words{active.length ? " or clear a filter" : ""}.
          </div>
        ) : (
          <ul className="rows">
            {results.slice(0, shown).map((r) => (
              <EntryRow key={r.entry.id} kb={kb} entry={r.entry} terms={r.terms} q={q} />
            ))}
          </ul>
        )}
        {results.length > shown && (
          <button className="more" onClick={() => setShown((s) => s + PAGE)}>
            Show more ({results.length - shown} left)
          </button>
        )}
      </section>
    </div>
  );
}

function Facet({ title, value, counts, label, onPick }) {
  const items = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  if (!items.length && !value) return null;
  return (
    <div className="facet">
      <h4>{title}</h4>
      <ul>
        {items.map(([k, n]) => (
          <li key={k}>
            <button className={k === value ? "on" : ""} onClick={() => onPick(k === value ? "" : k)} aria-pressed={k === value}>
              <span>{label(k)}</span>
              <span className="count">{n}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
