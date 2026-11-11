import { useMemo } from "react";
import { useData } from "../App.jsx";
import { RELEVANCE_ORDER } from "../lib/data.js";
import { formatDate } from "../lib/dates.js";
import { href } from "../lib/route.js";
import { useAppState, isReviewed } from "../lib/state.js";
import { DraftBadge, Empty, PageHeader, RelevanceChip, Section } from "../components/ui.jsx";

export default function Review() {
  const data = useData();
  const { state, setReview } = useAppState();

  const drafts = useMemo(
    () =>
      [...data.items.values()]
        .filter((i) => i.triaged && i.relevance !== "none" && !isReviewed(state, i))
        .sort(
          (a, b) =>
            RELEVANCE_ORDER[a.relevance] - RELEVANCE_ORDER[b.relevance] ||
            (b.actions?.length ?? 0) - (a.actions?.length ?? 0),
        ),
    [data, state],
  );
  const untriaged = useMemo(
    () => [...data.items.values()].filter((i) => !i.triaged).sort((a, b) => (b.date ?? "").localeCompare(a.date ?? "")),
    [data],
  );
  const noneUnreviewed = [...data.items.values()].filter((i) => i.relevance === "none" && !isReviewed(state, i));
  const verifyCount = [...data.items.values()].reduce((n, i) => n + (i.actions ?? []).filter((a) => a.verify).length, 0);
  const meta = data.meta;

  return (
    <>
      <PageHeader eyebrow="Review" title="Nothing here is final until you say so.">
        Claude drafted every analysis on this site. Read each one, check the flagged facts against the primary source, then
        mark it reviewed. Your review marks are stored with your state, so the nightly sync never overwrites them.
      </PageHeader>

      <div className="mb-8 grid grid-cols-2 gap-3 md:grid-cols-4">
        <Counter label="Drafts to review" value={drafts.length} />
        <Counter label="Untriaged" value={untriaged.length} />
        <Counter label="New guidance found" value={data.inbox.length} />
        <Counter label="Actions flagged verify" value={verifyCount} />
      </div>

      <Section title="Data health">
        <dl className="card grid gap-x-6 gap-y-2 px-4 py-3 text-[13.5px] sm:grid-cols-2">
          <Row k="Last Federal Register sync" v={meta.lastSync ? formatDate(meta.lastSync.slice(0, 10)) : "Never. Seeded data only."} />
          <Row k="Last sync result" v={meta.lastSyncOk === false ? `Failed: ${meta.lastError}` : meta.lastSyncOk ? "OK" : "—"} bad={meta.lastSyncOk === false} />
          {Object.entries(meta.sources ?? {}).map(([k, s]) => (
            <Row key={k} k={`Watcher: ${k}`} v={s.ok ? `OK, ${formatDate(s.at?.slice(0, 10))}` : `Failed: ${s.error ?? "unknown"}`} bad={!s.ok} />
          ))}
          {meta.lastTriage && (
            <Row
              k="Last triage"
              v={`${formatDate(meta.lastTriage.at.slice(0, 10))}: ${meta.lastTriage.drafted} AI drafts, ${meta.lastTriage.rules} by rule, ${meta.lastTriage.remaining} left${meta.lastTriage.failures?.length ? `, ${meta.lastTriage.failures.length} failed` : ""}`}
              bad={meta.lastTriage.failures?.length > 0}
            />
          )}
          <Row
            k="Dangling references"
            v={data.dangling.length ? data.dangling.map((d) => d.id).join(", ") : "None"}
            bad={data.dangling.length > 0}
          />
        </dl>
      </Section>

      {meta.titleMismatches?.length > 0 && (
        <Section title={`Seed doesn't match the Federal Register · ${meta.titleMismatches.length}`}>
          <p className="mb-2 text-[13px] text-muted">
            A hand-curated entry carries a different title than the official record for the same number, so the curated analysis
            may be attached to the wrong document. Fix the id in <span className="font-mono">analysis.json</span>, or ask Claude to.
          </p>
          <ul className="card divide-y divide-line">
            {meta.titleMismatches.map((m) => (
              <li key={m.id} className="px-4 py-3 text-[14px]">
                <a className="link font-mono text-[13px] font-medium" href={href(`item/${encodeURIComponent(m.id)}`)}>
                  {m.id}
                </a>
                <div className="mt-1 grid gap-1 sm:grid-cols-2">
                  <div>
                    <span className="label mr-2">Seed</span>
                    {m.seedTitle}
                  </div>
                  <div>
                    <span className="label mr-2">Official</span>
                    {m.officialTitle}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {data.inbox.length > 0 && (
        <Section title={`New guidance found by the watchers · ${data.inbox.length}`}>
          <ul className="card divide-y divide-line">
            {data.inbox.map((x) => (
              <li key={x.id} className="flex flex-col gap-1 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <div className="font-medium text-pretty">{x.title}</div>
                  <div className="text-[13px] text-muted">
                    {x.source} · found {formatDate(x.foundAt?.slice(0, 10))}
                  </div>
                </div>
                <a className="btn btn-sm shrink-0" href={x.url} target="_blank" rel="noreferrer">
                  Read ↗
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-2 text-[12px] text-muted">
            To promote one into the map, add it to <span className="font-mono">public/data/guidance.json</span>, or ask Claude to
            do it.
          </p>
        </Section>
      )}

      <Section title={`Drafts awaiting your review · ${drafts.length}`}>
        {drafts.length === 0 ? (
          <Empty>All caught up.</Empty>
        ) : (
          <ul className="card divide-y divide-line">
            {drafts.map((i) => (
              <li key={i.id} className="flex flex-col gap-2 px-4 py-3 sm:flex-row sm:items-center">
                <div className="flex shrink-0 items-center gap-2 sm:w-36">
                  <RelevanceChip relevance={i.relevance} />
                </div>
                <div className="min-w-0 flex-1">
                  <a className="link font-mono text-[13px] font-medium" href={href(`item/${encodeURIComponent(i.id)}`)}>
                    {i.label}
                  </a>{" "}
                  <span className="text-pretty">{i.title}</span>
                  <div className="mt-0.5 flex flex-wrap items-center gap-2 text-[12.5px] text-muted">
                    <DraftBadge item={i} reviewed={false} />
                    {(i.actions ?? []).some((a) => a.verify) && (
                      <span className="text-gold">{i.actions.filter((a) => a.verify).length} to verify</span>
                    )}
                  </div>
                </div>
                <button className="btn btn-sm shrink-0" onClick={() => setReview(i.id, true)}>
                  Mark reviewed
                </button>
              </li>
            ))}
          </ul>
        )}
      </Section>

      <Section title={`Untriaged documents · ${untriaged.length}`}>
        {untriaged.length === 0 ? (
          <Empty>Every document in the catalog has an analysis.</Empty>
        ) : (
          <>
            <p className="mb-2 text-[13px] text-muted">
              Synced from the Federal Register but not analyzed yet. The nightly job drafts these when an Anthropic API key is set
              (see About).
            </p>
            <ul className="card divide-y divide-line">
              {untriaged.slice(0, 60).map((i) => (
                <li key={i.id} className="px-4 py-2.5 text-[14px]">
                  <a className="link font-mono text-[13px] font-medium" href={href(`item/${encodeURIComponent(i.id)}`)}>
                    {i.label}
                  </a>{" "}
                  {i.title} <span className="text-[12px] text-muted">· {formatDate(i.date)}</span>
                </li>
              ))}
            </ul>
            {untriaged.length > 60 && <p className="mt-2 text-[12px] text-muted">…and {untriaged.length - 60} more.</p>}
          </>
        )}
      </Section>

      {noneUnreviewed.length > 0 && (
        <Section title={`Marked "no relevance" · ${noneUnreviewed.length}`}>
          <p className="text-[13px] text-muted">
            Auto-triaged as not touching IT Ops (tariffs, trade, proclamations-in-EO-clothing). Skim the{" "}
            <a className="link" href={href("orders", { rel: "none" })}>
              list
            </a>{" "}
            if you want to double-check.
          </p>
        </Section>
      )}
    </>
  );
}

function Counter({ label, value }) {
  return (
    <div className="card px-4 py-3">
      <div className="label">{label}</div>
      <div className="font-mono text-[26px] font-medium tabular-nums">{value}</div>
    </div>
  );
}

function Row({ k, v, bad }) {
  return (
    <div className="flex flex-col">
      <dt className="text-[12px] text-muted">{k}</dt>
      <dd className={bad ? "text-must" : ""}>{v}</dd>
    </div>
  );
}
