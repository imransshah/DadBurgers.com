import { useMemo, useState } from "react";
import { useData, useLens, MobileLens } from "../App.jsx";
import { allActions } from "../lib/data.js";
import { actionStatus, useAppState } from "../lib/state.js";
import { daysUntil, formatDate } from "../lib/dates.js";
import { href, setQuery } from "../lib/route.js";
import ActionRow from "../components/ActionRow.jsx";
import { Empty, PageHeader, Section, Seg, Stat, ItemLink, RelevanceChip } from "../components/ui.jsx";

const GROUPS = [
  { key: "overdue", title: "Overdue" },
  { key: "soon", title: "Due in the next 30 days" },
  { key: "year", title: "Due in the next 12 months" },
  { key: "later", title: "Later" },
  { key: "undated", title: "Recurring and undated" },
];

function bucket(a) {
  if (!a.due) return "undated";
  const n = daysUntil(a.due);
  if (n < 0) return "overdue";
  if (n <= 30) return "soon";
  if (n <= 365) return "year";
  return "later";
}

export default function Queue({ query }) {
  const data = useData();
  const { state, internal } = useAppState();
  const [lens] = useLens();
  const tier = query.tier ?? "must+feed";
  const show = query.show ?? "open";

  const actions = useMemo(() => allActions(data, internal), [data, internal]);
  const [showUndated, setShowUndated] = useState(false);

  const filtered = actions.filter((a) => {
    if (lens !== "all" && a.lens !== lens) return false;
    if (tier === "must+feed" && a.tier === "know") return false;
    if (tier !== "all" && tier !== "must+feed" && a.tier !== tier) return false;
    const st = actionStatus(state, a.id);
    if (show === "open" && (st === "done" || st === "na")) return false;
    if (show === "done" && !(st === "done" || st === "na")) return false;
    return true;
  });

  const grouped = Object.fromEntries(GROUPS.map((g) => [g.key, []]));
  for (const a of filtered) grouped[bucket(a)].push(a);
  for (const k of Object.keys(grouped)) {
    grouped[k].sort((x, y) => {
      if (x.due && y.due) return x.due.localeCompare(y.due);
      const t = { must: 0, feed: 1, know: 2 };
      return t[x.tier] - t[y.tier] || (x.source.label ?? "").localeCompare(y.source.label ?? "");
    });
  }

  // Stats count what's owed (Must + Feed), matching the default list below.
  const openAll = actions.filter((a) => a.tier !== "know" && !["done", "na"].includes(actionStatus(state, a.id)));
  const lensOpen = lens === "all" ? openAll : openAll.filter((a) => a.lens === lens);
  const overdue = lensOpen.filter((a) => a.due && daysUntil(a.due) < 0).length;
  const soon = lensOpen.filter((a) => a.due && daysUntil(a.due) >= 0 && daysUntil(a.due) <= 30).length;
  const mustOpen = lensOpen.filter((a) => a.tier === "must").length;
  const verify = lensOpen.filter((a) => a.verify).length;

  // New since last visit
  const prev = state.visits?.prev;
  const fresh = prev
    ? [...data.items.values()].filter((i) => i.firstSeen && i.firstSeen > prev.slice(0, 10)).slice(0, 12)
    : [];

  const nextUp = lensOpen
    .filter((a) => a.due && daysUntil(a.due) >= 0 && a.tier === "must")
    .sort((a, b) => a.due.localeCompare(b.due))[0];

  return (
    <>
      <PageHeader eyebrow="Your queue" title="What's owed, and when.">
        Every action this site has pulled out of executive orders, memos and directives, sorted by deadline.{" "}
        {nextUp && (
          <>
            Next must-do: <ItemLink item={nextUp.source} /> on{" "}
            <span className="font-medium text-ink">{formatDate(nextUp.due)}</span>.
          </>
        )}
      </PageHeader>

      <MobileLens />

      {!data.meta.lastSync && (
        <div className="card mb-6 border-gold/40 bg-gold-soft px-4 py-3 text-[14px] text-pretty">
          <strong className="font-semibold">Seeded, not synced yet.</strong> The catalog holds{" "}
          {[...data.items.values()].filter((i) => i.group === "presidential").length} hand-curated presidential documents. The
          full Federal Register list (every EO and memorandum since Jan 20, 2025) arrives on the first run of the nightly sync.
          Everything written here is a draft for you to review. Items marked <em>Verify</em> came from secondary sources.
        </div>
      )}

      <div className="mb-8 grid grid-cols-2 gap-3 md:grid-cols-4">
        <Stat label="Overdue" value={overdue} tone={overdue ? "must" : "ink"} onClick={() => setQuery({ tier: "all", show: "open" })} />
        <Stat label="Due ≤ 30 days" value={soon} tone={soon ? "feed" : "ink"} />
        <Stat label="Open must-dos" value={mustOpen} onClick={() => setQuery({ tier: "must", show: "open" })} />
        <Stat
          label="Flagged verify"
          value={verify}
          tone={verify ? "gold" : "ink"}
          hint="Open actions whose facts came from secondary sources"
        />
      </div>

      {fresh.length > 0 && (
        <Section title={`New since your last visit (${formatDate(prev.slice(0, 10))})`}>
          <ul className="grid gap-2 sm:grid-cols-2">
            {fresh.map((i) => (
              <li key={i.id} className="card flex items-start gap-3 px-3 py-2.5">
                <RelevanceChip relevance={i.relevance} />
                <div className="min-w-0">
                  <a className="link font-medium" href={href(`item/${encodeURIComponent(i.id)}`)}>
                    {i.label}
                  </a>
                  <p className="truncate text-[13px] text-muted">{i.title}</p>
                </div>
              </li>
            ))}
          </ul>
        </Section>
      )}

      <div className="mb-5 flex flex-wrap items-center gap-2">
        <Seg
          label="Tier"
          value={tier}
          onChange={(v) => setQuery({ tier: v === "must+feed" ? "" : v })}
          options={[
            { value: "must+feed", label: "Must + Feed" },
            { value: "must", label: "Must" },
            { value: "feed", label: "Feed" },
            { value: "know", label: "Know" },
            { value: "all", label: "All" },
          ]}
        />
        <Seg
          label="Status"
          value={show}
          onChange={(v) => setQuery({ show: v === "open" ? "" : v })}
          options={[
            { value: "open", label: "Open" },
            { value: "done", label: "Closed" },
            { value: "all", label: "All" },
          ]}
        />
        <span className="ml-auto font-mono text-[12px] text-muted">{filtered.length} actions</span>
      </div>

      {filtered.length === 0 && <Empty>Nothing matches these filters. Enjoy it while it lasts.</Empty>}

      {GROUPS.map((g) => {
        const list = grouped[g.key];
        if (!list.length) return null;
        const collapsible = g.key === "undated";
        const open = !collapsible || showUndated;
        return (
          <Section
            key={g.key}
            title={`${g.title} · ${list.length}`}
            right={
              collapsible ? (
                <button className="btn btn-sm" onClick={() => setShowUndated((v) => !v)} aria-expanded={open}>
                  {open ? "Hide" : "Show"}
                </button>
              ) : null
            }
          >
            {open ? (
              <ul className="flex flex-col gap-2">
                {list.map((a) => (
                  <ActionRow key={a.id} action={a} />
                ))}
              </ul>
            ) : (
              <p className="text-[13px] text-muted">
                Standing obligations with no single deadline: continuous scanning cadences, per-contract checks, per-vacancy steps.
                {" "}{list.filter((a) => a.tier === "must").length} are must-dos.
              </p>
            )}
          </Section>
        );
      })}
    </>
  );
}
