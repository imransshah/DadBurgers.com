import { useMemo } from "react";
import { useData } from "../App.jsx";
import { ISSUER_GROUPS, issuerGroup, RELEVANCE_ORDER } from "../lib/data.js";
import { setQuery } from "../lib/route.js";
import ItemList from "../components/ItemList.jsx";
import { Empty, PageHeader, Section, Seg } from "../components/ui.jsx";

const LIVE = new Set(["in-effect", "amended", "partially-enjoined"]);

export default function Guidance({ query }) {
  const data = useData();
  const issuer = query.issuer ?? "all";
  const status = query.status ?? "live";
  const q = (query.q ?? "").toLowerCase();

  const all = useMemo(() => [...data.items.values()].filter((i) => i.group === "guidance"), [data]);
  const counts = useMemo(() => {
    const c = {};
    for (const i of all) c[issuerGroup(i.issuer)] = (c[issuerGroup(i.issuer)] ?? 0) + 1;
    return c;
  }, [all]);

  const list = all
    .filter((i) => {
      if (issuer !== "all" && issuerGroup(i.issuer) !== issuer) return false;
      if (status === "live" && !LIVE.has(i.status)) return false;
      if (status === "dead" && LIVE.has(i.status)) return false;
      if (q && !`${i.label} ${i.title} ${i.summary ?? ""}`.toLowerCase().includes(q)) return false;
      return true;
    })
    .sort(
      (a, b) =>
        RELEVANCE_ORDER[a.relevance] - RELEVANCE_ORDER[b.relevance] ||
        (b.date ?? b.dateApprox ?? "").localeCompare(a.date ?? a.dateApprox ?? ""),
    );

  const byGroup = ISSUER_GROUPS.map((g) => ({ key: g.key, items: list.filter((i) => issuerGroup(i.issuer) === g.key) })).filter(
    (g) => g.items.length,
  );

  return (
    <>
      <PageHeader eyebrow="Implementing guidance" title="Memos, directives & standards">
        What actually turns an order into work: OMB memos and circulars, OPM/CHCO guidance, CISA directives, FedRAMP notices and
        NIST standards. Each one links back to the orders it implements.
      </PageHeader>

      <div className="mb-5 flex flex-col gap-2">
        <div className="scroll-x">
          <Seg
            label="Issuer"
            value={issuer}
            onChange={(v) => setQuery({ issuer: v === "all" ? "" : v })}
            options={[
              { value: "all", label: "All", count: all.length },
              ...ISSUER_GROUPS.filter((g) => counts[g.key]).map((g) => ({ value: g.key, label: g.key, count: counts[g.key] })),
            ]}
          />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Seg
            label="Status"
            value={status}
            onChange={(v) => setQuery({ status: v === "live" ? "" : v })}
            options={[
              { value: "live", label: "In effect" },
              { value: "dead", label: "Rescinded / superseded" },
              { value: "all", label: "All" },
            ]}
          />
          <input
            className="input h-[32px] w-full sm:ml-auto sm:w-56"
            type="search"
            placeholder="Filter this list"
            defaultValue={query.q ?? ""}
            onChange={(e) => setQuery({ q: e.target.value })}
            aria-label="Filter guidance"
          />
        </div>
      </div>

      {byGroup.length === 0 && <Empty>No guidance matches.</Empty>}
      {byGroup.map((g) => (
        <Section key={g.key} title={`${g.key} · ${g.items.length}`}>
          <ItemList items={g.items} />
        </Section>
      ))}

      {data.inbox.length > 0 && (
        <p className="text-[13px] text-muted">
          {data.inbox.length} newly published memo{data.inbox.length === 1 ? "" : "s"} found by the nightly watcher{" "}
          {data.inbox.length === 1 ? "is" : "are"} waiting in <a className="link" href="#/review">Review</a>.
        </p>
      )}
    </>
  );
}
