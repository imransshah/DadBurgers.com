import { formatDate } from "../lib/dates.js";
import { href } from "../lib/route.js";
import { useAppState, isReviewed } from "../lib/state.js";
import { RelevanceChip, StatusText } from "./ui.jsx";

/** Dense list of orders or guidance. Each row links to the detail page. */
export default function ItemList({ items }) {
  const { state } = useAppState();
  return (
    <ul className="card divide-y divide-line overflow-hidden">
      {items.map((i) => {
        const open = (i.actions ?? []).filter((a) => a.tier !== "know").length;
        const reviewed = isReviewed(state, i);
        return (
          <li key={i.id}>
            <a
              href={href(`item/${encodeURIComponent(i.id)}`)}
              className="grid grid-cols-[1fr_auto] items-start gap-x-4 gap-y-1 px-4 py-3 hover:bg-surface-2 sm:grid-cols-[110px_1fr_auto]"
            >
              <div className="font-mono text-[13px] font-medium text-accent sm:pt-0.5">
                {i.label}
                {i.legacy && <span className="ml-1.5 text-[10.5px] font-normal uppercase text-faint">legacy</span>}
              </div>
              <div className="col-span-2 row-start-2 min-w-0 sm:col-span-1 sm:row-start-1">
                <div className="font-medium text-pretty">{i.title}</div>
                <div className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-[13px] text-muted">
                  <span>{formatDate(i.date ?? i.dateApprox)}</span>
                  <StatusText status={i.status} />
                  {open > 0 && <span>{open} action{open === 1 ? "" : "s"}</span>}
                  {i.triaged && !reviewed && i.relevance !== "none" && <span className="text-faint">draft</span>}
                  {reviewed && <span className="text-ok">reviewed</span>}
                </div>
              </div>
              <div className="col-start-2 row-start-1 justify-self-end sm:col-start-3">
                <RelevanceChip relevance={i.relevance} />
              </div>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
