import { useMemo, useState } from "react";
import { useData, useLens, MobileLens } from "../App.jsx";
import { allActions } from "../lib/data.js";
import { actionStatus, useAppState } from "../lib/state.js";
import { daysUntil, formatDate, formatMonth, relative, todayISO } from "../lib/dates.js";
import { downloadICS } from "../lib/ics.js";
import { href } from "../lib/route.js";
import { Empty, PageHeader, Seg, TierChip, VerifyFlag } from "../components/ui.jsx";

export default function Calendar() {
  const data = useData();
  const { state, internal } = useAppState();
  const [lens] = useLens();
  const [range, setRange] = useState("upcoming");
  const [includeKnow, setIncludeKnow] = useState(false);

  const dated = useMemo(
    () =>
      allActions(data, internal)
        .filter((a) => a.due)
        .filter((a) => lens === "all" || a.lens === lens)
        .filter((a) => includeKnow || a.tier !== "know")
        .sort((a, b) => a.due.localeCompare(b.due)),
    [data, internal, lens, includeKnow],
  );

  const isClosed = (a) => ["done", "na"].includes(actionStatus(state, a.id));
  const shown = dated.filter((a) => {
    if (range === "upcoming") return !isClosed(a) && daysUntil(a.due) >= -45;
    if (range === "open") return !isClosed(a);
    return true;
  });

  const months = new Map();
  for (const a of shown) {
    const k = a.due.slice(0, 7);
    if (!months.has(k)) months.set(k, []);
    months.get(k).push(a);
  }

  const openDated = dated.filter((a) => !isClosed(a));
  const thisMonth = todayISO().slice(0, 7);

  return (
    <>
      <PageHeader
        eyebrow="Calendar"
        title="Deadlines, by month."
        actions={
          <button className="btn btn-primary" onClick={() => downloadICS(openDated)} disabled={!openDated.length}>
            Download .ics for Outlook ({openDated.length})
          </button>
        }
      >
        The .ics holds every open, dated action in the current lens, each with a reminder a week out. Re-importing updates
        events instead of duplicating them, because each event ID is tied to its action.
      </PageHeader>

      <MobileLens />

      <div className="mb-5 flex flex-wrap items-center gap-2">
        <Seg
          label="Range"
          value={range}
          onChange={setRange}
          options={[
            { value: "upcoming", label: "Upcoming + recent overdue" },
            { value: "open", label: "All open" },
            { value: "all", label: "Everything" },
          ]}
        />
        <label className="flex items-center gap-2 text-[13px] text-muted">
          <input type="checkbox" checked={includeKnow} onChange={(e) => setIncludeKnow(e.target.checked)} />
          Include "Know" items
        </label>
      </div>

      {shown.length === 0 && <Empty>No dated actions in this view.</Empty>}

      <ol className="relative flex flex-col gap-8 border-l border-line pl-5">
        {[...months.entries()].map(([month, list]) => (
          <li key={month} className="relative">
            <span
              className={`absolute -left-[26px] top-1.5 h-2.5 w-2.5 rounded-full border-2 ${
                month === thisMonth ? "border-accent bg-accent" : month < thisMonth ? "border-must bg-surface" : "border-line bg-surface"
              }`}
              aria-hidden
            />
            <h2 className="mb-2 text-[15px] font-semibold">
              {formatMonth(`${month}-01`)}
              {month === thisMonth && <span className="ml-2 chip bg-accent-soft text-accent">this month</span>}
            </h2>
            <ul className="flex flex-col gap-2">
              {list.map((a) => {
                const n = daysUntil(a.due);
                const closed = isClosed(a);
                return (
                  <li key={a.id} className={`card flex flex-col gap-1 px-4 py-2.5 sm:flex-row sm:items-start sm:gap-4 ${closed ? "opacity-55" : ""}`}>
                    <div className="w-[120px] shrink-0">
                      <div className={`font-mono text-[13px] font-medium ${!closed && n < 0 ? "text-must" : !closed && n <= 30 ? "text-feed" : ""}`}>
                        {formatDate(a.due)}
                      </div>
                      <div className="text-[12px] text-muted">{closed ? actionStatus(state, a.id) : relative(a.due)}</div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="mb-1 flex flex-wrap items-center gap-1.5">
                        <TierChip tier={a.tier} compact />
                        <a
                          className="link text-[13px] font-medium"
                          href={a.source.group === "internal" ? href("internal") : href(`item/${encodeURIComponent(a.source.id)}`)}
                        >
                          {a.source.label}
                        </a>
                        {a.verify && <VerifyFlag />}
                      </div>
                      <p className="text-[14px] text-pretty">{a.text}</p>
                      {a.dueNote && <p className="text-[12px] italic text-muted">{a.dueNote}</p>}
                    </div>
                  </li>
                );
              })}
            </ul>
          </li>
        ))}
      </ol>
    </>
  );
}
