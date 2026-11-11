import { useMemo } from "react";
import { useData } from "../App.jsx";
import { RELEVANCE_ORDER } from "../lib/data.js";
import { setQuery } from "../lib/route.js";
import ItemList from "../components/ItemList.jsx";
import { Empty, PageHeader, Seg } from "../components/ui.jsx";

export default function Orders({ query }) {
  const data = useData();
  const rel = query.rel ?? "relevant";
  const kind = query.kind ?? "all";
  const sort = query.sort ?? "date";
  const q = (query.q ?? "").toLowerCase();

  const all = useMemo(() => [...data.items.values()].filter((i) => i.group === "presidential"), [data]);

  const counts = useMemo(() => {
    const c = { high: 0, medium: 0, low: 0, none: 0, untriaged: 0 };
    for (const i of all) c[i.relevance] = (c[i.relevance] ?? 0) + 1;
    return c;
  }, [all]);

  const list = all
    .filter((i) => {
      if (rel === "relevant" && !(i.relevance === "high" || i.relevance === "medium")) return false;
      if (rel !== "relevant" && rel !== "all" && i.relevance !== rel) return false;
      if (kind === "eo" && (i.kind !== "eo" || i.legacy)) return false;
      if (kind === "memo" && i.kind !== "memo") return false;
      if (kind === "legacy" && !i.legacy) return false;
      if (q && !`${i.label} ${i.title} ${i.summary ?? ""}`.toLowerCase().includes(q)) return false;
      return true;
    })
    .sort((a, b) =>
      sort === "relevance"
        ? RELEVANCE_ORDER[a.relevance] - RELEVANCE_ORDER[b.relevance] || (b.date ?? "").localeCompare(a.date ?? "")
        : sort === "number"
          ? (b.number ?? 0) - (a.number ?? 0)
          : (b.date ?? "").localeCompare(a.date ?? ""),
    );

  return (
    <>
      <PageHeader eyebrow="Presidential documents" title="Executive orders & memoranda">
        {all.length} documents: every executive order and presidential memorandum since January 20, 2025 (once synced), plus older
        orders IT still runs on. Relevance is judged for DFC OIT, not in general.
      </PageHeader>

      <div className="mb-4 flex flex-col gap-2">
        <div className="scroll-x">
          <Seg
            label="Relevance"
            value={rel}
            onChange={(v) => setQuery({ rel: v === "relevant" ? "" : v })}
            options={[
              { value: "relevant", label: "High + Medium", count: counts.high + counts.medium },
              { value: "high", label: "High", count: counts.high },
              { value: "medium", label: "Medium", count: counts.medium },
              { value: "low", label: "Low", count: counts.low },
              { value: "none", label: "None", count: counts.none },
              { value: "untriaged", label: "Untriaged", count: counts.untriaged },
              { value: "all", label: "All", count: all.length },
            ]}
          />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Seg
            label="Type"
            value={kind}
            onChange={(v) => setQuery({ kind: v === "all" ? "" : v })}
            options={[
              { value: "all", label: "All types" },
              { value: "eo", label: "EOs (2025–)" },
              { value: "memo", label: "Memoranda" },
              { value: "legacy", label: "Legacy" },
            ]}
          />
          <Seg
            label="Sort"
            value={sort}
            onChange={(v) => setQuery({ sort: v === "date" ? "" : v })}
            options={[
              { value: "date", label: "Newest" },
              { value: "relevance", label: "Relevance" },
              { value: "number", label: "EO number" },
            ]}
          />
          <input
            className="input h-[32px] w-full sm:ml-auto sm:w-56"
            type="search"
            placeholder="Filter this list"
            defaultValue={query.q ?? ""}
            onChange={(e) => setQuery({ q: e.target.value })}
            aria-label="Filter orders"
          />
        </div>
      </div>

      {list.length ? <ItemList items={list} /> : <Empty>No documents match.</Empty>}
    </>
  );
}
