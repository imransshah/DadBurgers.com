import { useMemo, useRef, useState } from "react";
import { entryHref, related } from "../lib/data.js";
import { actionStatus, useAppState } from "../mandates/lib/state.js";
import { daysUntil, formatDate, relative } from "../mandates/lib/dates.js";
import { askKb, renderAnswer } from "../lib/ask.js";

// The federal layer over Career KB. Every mandate in the index carries `fed`
// (built by scripts/build-content.mjs): its label, relevance to you, "for you"
// note and actions with deadlines. These panels put that next to whatever
// conceptual content you're reading, with your live action statuses.

const TIER = { must: "Must do", feed: "Feed", know: "Know" };
const LIVE = (s) => s !== "done" && s !== "na";

/** The most pressing open action on a mandate: dated soonest first, then must > feed > know. */
function nextAction(fed, state) {
  const open = (fed?.actions ?? []).filter((a) => LIVE(actionStatus(state, a.id)));
  const rank = { must: 0, feed: 1, know: 2 };
  return open.sort((a, b) => {
    if (a.due && b.due) return a.due.localeCompare(b.due);
    if (a.due !== b.due) return a.due ? -1 : 1;
    return rank[a.tier] - rank[b.tier];
  })[0];
}

function Due({ due }) {
  if (!due) return null;
  const n = daysUntil(due);
  const cls = n < 0 ? "fed-due over" : n <= 30 ? "fed-due soon" : "fed-due";
  return (
    <span className={cls} title={formatDate(due)}>
      {formatDate(due)} · {relative(due)}
    </span>
  );
}

function MandateLine({ entry, state, terms }) {
  const fed = entry.fed;
  const next = nextAction(fed, state);
  return (
    <li className="fed-item">
      <a className="fed-title" href={entryHref(entry)}>
        <span className="fed-label">{fed.label}</span>
        <span>{entry.title.replace(/^[^:]+:\s*/, "")}</span>
      </a>
      <div className="fed-meta">
        <span className={`fed-rel r-${fed.relevance}`}>{fed.relevance}</span>
        {fed.status && fed.status !== "in-effect" && <span className="fed-status">{fed.status}</span>}
        {entry.status === "draft" && <span className="badge draft">Draft</span>}
      </div>
      {fed.forYou && <p className="fed-foryou clamp">{fed.forYou}</p>}
      {next && (
        <p className="fed-next">
          <span className={`fed-tier t-${next.tier}`}>{TIER[next.tier]}</span> {next.text} <Due due={next.due} />
          {next.verify && <span className="badge verify" title="From secondary sources; check the primary text">⚑ Verify</span>}
        </p>
      )}
    </li>
  );
}

/** Search results: what federal requirements match this query, with your next actions. */
export function FederalContext({ results, q }) {
  const { state } = useAppState();
  const hits = results
    .filter((r) => r.entry.origin === "eo" && !["none", "untriaged"].includes(r.entry.fed?.relevance))
    .slice(0, 3);
  if (!q || !hits.length) return null;
  return (
    <section className="fed-panel" aria-label="Federal context">
      <div className="fed-head">
        <h2>Federal context</h2>
        <a className="small" href={`#/search?${new URLSearchParams({ q, type: "reference" })}`}>
          All matching mandates →
        </a>
      </div>
      <ul className="fed-list">
        {hits.map((h) => (
          <MandateLine key={h.entry.id} entry={h.entry} state={state} terms={h.terms} />
        ))}
      </ul>
    </section>
  );
}

/** Desk cards, slides and articles: the mandates that touch this topic. */
export function RequirementsPanel({ kb, entry }) {
  const { state } = useAppState();
  const hits = useMemo(
    () => related(kb, `${entry.title} ${entry.tags.join(" ")}`, { origin: "eo", limit: 5, exclude: [entry.id] }),
    [kb, entry],
  );
  if (!hits.length) return null;
  return (
    <section className="fed-panel no-print" aria-label="Federal requirements">
      <div className="fed-head">
        <h2>Federal requirements that touch this</h2>
        <a className="small" href="#/mandates">Mandates →</a>
      </div>
      <ul className="fed-list">
        {hits.map((h) => (
          <MandateLine key={h.entry.id} entry={h.entry} state={state} />
        ))}
      </ul>
    </section>
  );
}

/** Home page: open, dated mandate actions due in the next 30 days (or overdue). */
export function DueSoon({ kb }) {
  const { state } = useAppState();
  const rows = useMemo(() => {
    const out = [];
    for (const e of kb.entries) {
      if (e.origin !== "eo") continue;
      for (const a of e.fed?.actions ?? []) {
        if (!a.due || a.tier === "know" || !LIVE(actionStatus(state, a.id))) continue;
        if (daysUntil(a.due) <= 30) out.push({ a, e });
      }
    }
    return out.sort((x, y) => x.a.due.localeCompare(y.a.due)).slice(0, 6);
  }, [kb, state]);
  if (!rows.length) return null;
  return (
    <section className="fed-panel">
      <div className="fed-head">
        <h2>Due in the next 30 days</h2>
        <a className="small" href="#/mandates">Your queue →</a>
      </div>
      <ul className="fed-list">
        {rows.map(({ a, e }) => (
          <li key={a.id} className="fed-item">
            <p className="fed-next">
              <span className={`fed-tier t-${a.tier}`}>{TIER[a.tier]}</span>{" "}
              <a href={entryHref(e)}>
                <b>{e.fed.label}</b>
              </a>{" "}
              {a.text} <Due due={a.due} />
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}

/**
 * "Ask": a written answer, grounded in the top search results and framed for
 * a federal IT leader (authorities, compliance, acquisition and workforce
 * rules, your deadlines). Runs only when you click; the worker holds the key.
 */
export function AskPanel({ results, q }) {
  const [state, setState] = useState({ phase: "idle", text: "", error: null, sources: [] });
  const abortRef = useRef(null);
  const app = useAppState();
  if (!q) return null;

  const run = async () => {
    abortRef.current?.abort();
    const ctrl = new AbortController();
    abortRef.current = ctrl;
    const sources = results.slice(0, 8).map((r) => r.entry);
    setState({ phase: "loading", text: "", error: null, sources });
    try {
      await askKb({
        question: q,
        sources,
        statuses: app.state.actions,
        signal: ctrl.signal,
        onText: (t) => setState((s) => ({ ...s, phase: "streaming", text: s.text + t })),
      });
      setState((s) => ({ ...s, phase: "done" }));
    } catch (e) {
      if (e.name === "AbortError") return;
      setState((s) => ({ ...s, phase: "error", error: e.message }));
    }
  };

  return (
    <section className="ask-panel" aria-label="Ask">
      {state.phase === "idle" ? (
        <div className="ask-idle">
          <div>
            <h2>Want this answered, not just listed?</h2>
            <p className="muted small">
              Writes an answer from the top {Math.min(8, results.length)} results, framed for a federal IT leader: authorities,
              compliance, acquisition and workforce rules, your deadlines. Cites what it used.
            </p>
          </div>
          <button className="btn" onClick={run} disabled={!results.length}>
            Ask
          </button>
        </div>
      ) : (
        <>
          <div className="fed-head">
            <h2>Answer</h2>
            <span className="small muted">
              {state.phase === "loading" ? "Reading the sources…" : state.phase === "streaming" ? "Writing…" : "Draft. Check the cited sources."}
            </span>
          </div>
          {state.error ? (
            <p className="notice bad">{state.error}</p>
          ) : (
            <div className="prose ask-answer" dangerouslySetInnerHTML={{ __html: renderAnswer(state.text, state.sources) }} />
          )}
          {(state.phase === "done" || state.phase === "error") && (
            <div className="ask-foot">
              <ol className="sources small">
                {state.sources.map((e, i) => (
                  <li key={e.id} value={i + 1}>
                    <a href={entryHref(e)}>{e.title}</a>
                  </li>
                ))}
              </ol>
              <button className="linkish small" onClick={run}>
                Ask again
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}
