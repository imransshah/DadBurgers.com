import { useEffect } from "react";
import { useData } from "../App.jsx";
import { formatDate, todayISO } from "../lib/dates.js";
import { href } from "../lib/route.js";
import { actionStatus, useAppState, isReviewed } from "../lib/state.js";
import { TIERS, LENSES, STATUS } from "../components/ui.jsx";

const STATUS_LABEL = { open: "Open", "in-progress": "In progress", done: "Done", na: "N/A" };

export default function Brief({ id }) {
  const data = useData();
  const { state } = useAppState();
  const item = data.items.get(id);

  useEffect(() => {
    if (item) document.title = `${item.label} — brief`;
    return () => {
      document.title = "Order of Operations";
    };
  }, [item]);

  if (!item) return <p className="p-8">Not found.</p>;

  const links = (data.links.get(item.id) ?? []).filter((l) => l.type !== "related" || data.items.get(l.id)?.group !== item.group);
  const linked = [...new Set(links.map((l) => l.id))].map((lid) => data.items.get(lid)).filter(Boolean);
  const reviewed = isReviewed(state, item);

  return (
    <div className="mx-auto max-w-[7.5in] bg-surface px-6 py-8 print:p-0">
      <div className="no-print mb-6 flex flex-wrap items-center gap-2">
        <a className="btn btn-sm" href={href(`item/${encodeURIComponent(item.id)}`)}>
          ← Back
        </a>
        <button className="btn btn-sm btn-primary" onClick={() => window.print()}>
          Print / Save as PDF
        </button>
        <span className="text-[12px] text-muted">Letter size, fits one page for most items.</span>
      </div>

      <header className="mb-4 border-b-2 border-ink pb-3">
        <div className="flex items-baseline justify-between gap-4 font-mono text-[11px] uppercase tracking-wider text-muted">
          <span>
            {data.profile.component} · {data.profile.agency.match(/\((.*)\)/)?.[1]}
          </span>
          <span>Prepared {formatDate(todayISO())}</span>
        </div>
        <h1 className="mt-2 text-[20px] font-semibold leading-snug">
          <span className="font-mono">{item.label}</span> — {item.title}
        </h1>
        <p className="mt-1 text-[12.5px] text-muted">
          {item.issuer} · {formatDate(item.date ?? item.dateApprox)} · {STATUS[item.status]?.label ?? item.status}
          {item.statusNote ? ` — ${item.statusNote}` : ""}
        </p>
      </header>

      {item.summary && (
        <section className="mb-3">
          <h2 className="label mb-1">Summary</h2>
          <p className="text-[13px] leading-relaxed text-pretty">{item.summary}</p>
        </section>
      )}
      {item.forYou && (
        <section className="mb-3">
          <h2 className="label mb-1">What it means for OIT</h2>
          <p className="text-[13px] leading-relaxed text-pretty">{item.forYou}</p>
        </section>
      )}

      {item.actions?.length > 0 && (
        <section className="mb-3">
          <h2 className="label mb-1">Actions</h2>
          <table className="w-full border-collapse text-[12px]">
            <thead>
              <tr className="border-b border-line text-left text-muted">
                <th className="py-1 pr-2 font-medium">Tier</th>
                <th className="py-1 pr-2 font-medium">Action</th>
                <th className="py-1 pr-2 font-medium">Due</th>
                <th className="py-1 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {item.actions.map((a) => (
                <tr key={a.id} className="border-b border-line align-top">
                  <td className="py-1.5 pr-2 whitespace-nowrap">
                    {TIERS[a.tier]?.short}
                    <div className="text-[10.5px] text-muted">{LENSES[a.lens]?.label}</div>
                  </td>
                  <td className="py-1.5 pr-2 text-pretty">
                    {a.text}
                    {(a.cite || a.verify) && (
                      <div className="text-[10.5px] text-muted">
                        {a.cite}
                        {a.verify ? `${a.cite ? " · " : ""}verify against primary source` : ""}
                      </div>
                    )}
                  </td>
                  <td className="py-1.5 pr-2 whitespace-nowrap">
                    {a.due ? formatDate(a.due) : a.recurring ? `↻ ${a.recurring}` : "—"}
                  </td>
                  <td className="py-1.5 whitespace-nowrap">{STATUS_LABEL[actionStatus(state, a.id)]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      {linked.length > 0 && (
        <section className="mb-3">
          <h2 className="label mb-1">Connected orders & guidance</h2>
          <ul className="columns-2 gap-6 text-[12px]">
            {linked.map((l) => (
              <li key={l.id} className="mb-0.5 break-inside-avoid">
                <span className="font-mono font-medium">{l.label}</span> {l.title}
              </li>
            ))}
          </ul>
        </section>
      )}

      {state.notes[item.id]?.text && (
        <section className="mb-3">
          <h2 className="label mb-1">Notes</h2>
          <p className="whitespace-pre-line text-[12.5px]">{state.notes[item.id].text}</p>
        </section>
      )}

      <footer className="mt-4 border-t border-line pt-2 text-[10.5px] text-muted">
        {reviewed ? "Analysis reviewed." : "Draft analysis, not yet reviewed."} Personal working notes, not an official DFC
        position. Primary source: {item.url ?? "Federal Register"}
      </footer>
    </div>
  );
}
