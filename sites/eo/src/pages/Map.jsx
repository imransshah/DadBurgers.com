import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { useData } from "../App.jsx";
import { issuerGroup, RELEVANCE_ORDER } from "../lib/data.js";
import { href, setQuery } from "../lib/route.js";
import { PageHeader, RelevanceChip, Seg, StatusText } from "../components/ui.jsx";

// Three lanes, left to right: who ordered it → who wrote the rules → who
// enforces it technically. Lines are drawn only between lanes; within-lane
// links show up in the chain panel instead.
const LANES = [
  { key: "presidential", title: "Presidential", sub: "EOs & memoranda" },
  { key: "policy", title: "Policy", sub: "OMB · OPM/CHCO" },
  { key: "technical", title: "Technical", sub: "CISA · FedRAMP · NIST" },
];

function laneOf(item) {
  if (item.group === "presidential") return "presidential";
  const g = issuerGroup(item.issuer);
  return g === "OMB" || g === "OPM/CHCO" ? "policy" : "technical";
}

const EDGE_STYLE = {
  implements: { dash: "", w: 1.6 },
  supersedes: { dash: "5 4", w: 1.4 },
  amends: { dash: "2 3", w: 1.4 },
  revokes: { dash: "5 4", w: 1.4 },
  related: { dash: "", w: 1 },
};

export default function MapPage({ query }) {
  const data = useData();
  const focus = query.focus ?? null;
  const scope = query.scope ?? "relevant";
  const topic = query.topic ?? "";
  const wrapRef = useRef(null);
  const nodeRefs = useRef(new Map());
  const [geom, setGeom] = useState({ w: 0, h: 0, pos: new Map() });

  const nodes = useMemo(() => {
    const list = [...data.items.values()].filter((i) => {
      if (scope === "relevant" && !(i.relevance === "high" || i.relevance === "medium")) return false;
      if (scope === "live" && ["revoked", "rescinded", "superseded"].includes(i.status)) return false;
      if (topic && !(i.topics ?? []).includes(topic)) return false;
      return (data.links.get(i.id) ?? []).length > 0;
    });
    return list.sort(
      (a, b) => RELEVANCE_ORDER[a.relevance] - RELEVANCE_ORDER[b.relevance] || (b.date ?? "").localeCompare(a.date ?? ""),
    );
  }, [data, scope, topic]);

  const visible = useMemo(() => new Set(nodes.map((n) => n.id)), [nodes]);

  const edges = useMemo(() => {
    const out = [];
    const seen = new Set();
    for (const n of nodes) {
      for (const l of data.links.get(n.id) ?? []) {
        if (!visible.has(l.id)) continue;
        const other = data.items.get(l.id);
        if (laneOf(n) === laneOf(other)) continue;
        const key = [n.id, l.id].sort().join("|") + l.type;
        if (seen.has(key)) continue;
        seen.add(key);
        out.push({ a: n.id, b: l.id, type: l.type });
      }
    }
    return out;
  }, [nodes, data, visible]);

  // Focus set: the node, its neighbors, and neighbors-of-neighbors along
  // implements/supersedes chains (EO → OMB memo → CISA directive).
  const lit = useMemo(() => {
    if (!focus) return null;
    const set = new Set([focus]);
    const first = (data.links.get(focus) ?? []).map((l) => l.id);
    first.forEach((id) => set.add(id));
    for (const id of first)
      for (const l of data.links.get(id) ?? [])
        if (l.type === "implements" || l.type === "supersedes") set.add(l.id);
    return set;
  }, [focus, data]);

  const topics = useMemo(() => {
    const c = new Map();
    for (const i of data.items.values())
      if (i.relevance === "high" || i.relevance === "medium") for (const t of i.topics ?? []) c.set(t, (c.get(t) ?? 0) + 1);
    return [...c.entries()].sort((a, b) => b[1] - a[1]).slice(0, 14);
  }, [data]);

  useLayoutEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const measure = () => {
      const box = wrap.getBoundingClientRect();
      const pos = new Map();
      for (const [id, el] of nodeRefs.current) {
        if (!el || !visible.has(id)) continue;
        const r = el.getBoundingClientRect();
        pos.set(id, { l: r.left - box.left, r: r.right - box.left, y: r.top - box.top + r.height / 2 });
      }
      setGeom({ w: box.width, h: box.height, pos });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(wrap);
    return () => ro.disconnect();
  }, [nodes, visible]);

  const byLane = LANES.map((lane) => ({ ...lane, items: nodes.filter((n) => laneOf(n) === lane.key) }));
  const focusItem = focus ? data.items.get(focus) : null;
  const laneIndex = Object.fromEntries(LANES.map((l, i) => [l.key, i]));

  return (
    <>
      <PageHeader eyebrow="Map" title="Who ordered it, who wrote the rules, who checks.">
        Each line connects an order to the guidance that implements, amends or replaces it. Click anything to light up its chain.
        Think of it as liner notes: the EO is the lyric sheet, OMB the arrangement, CISA the click track.
      </PageHeader>

      <div className="mb-4 flex flex-wrap items-center gap-2">
        <Seg
          label="Scope"
          value={scope}
          onChange={(v) => setQuery({ scope: v === "relevant" ? "" : v })}
          options={[
            { value: "relevant", label: "High + Medium" },
            { value: "live", label: "Everything in effect" },
            { value: "all", label: "Everything" },
          ]}
        />
        <select
          className="input h-[32px] w-auto"
          value={topic}
          onChange={(e) => setQuery({ topic: e.target.value })}
          aria-label="Topic"
        >
          <option value="">All topics</option>
          {topics.map(([t, n]) => (
            <option key={t} value={t}>
              {t} ({n})
            </option>
          ))}
        </select>
        {focus && (
          <button className="btn btn-sm" onClick={() => setQuery({ focus: "" })}>
            Clear selection
          </button>
        )}
        <span className="ml-auto font-mono text-[12px] text-muted">
          {nodes.length} nodes · {edges.length} links
        </span>
      </div>

      <div ref={wrapRef} className="relative">
        <svg
          className="pointer-events-none absolute inset-0 hidden md:block"
          width={geom.w}
          height={geom.h}
          aria-hidden
        >
          {edges.map((e) => {
            const A = data.items.get(e.a);
            const B = data.items.get(e.b);
            const [left, right] = laneIndex[laneOf(A)] < laneIndex[laneOf(B)] ? [e.a, e.b] : [e.b, e.a];
            const p = geom.pos.get(left);
            const q = geom.pos.get(right);
            if (!p || !q) return null;
            const x1 = p.r;
            const x2 = q.l;
            const mx = (x1 + x2) / 2;
            const on = lit ? lit.has(e.a) && lit.has(e.b) : false;
            const st = EDGE_STYLE[e.type] ?? EDGE_STYLE.related;
            return (
              <path
                key={`${e.a}-${e.b}-${e.type}`}
                d={`M${x1},${p.y} C${mx},${p.y} ${mx},${q.y} ${x2},${q.y}`}
                fill="none"
                stroke={on ? "var(--c-accent)" : "var(--c-line)"}
                strokeOpacity={lit && !on ? 0.35 : 1}
                strokeWidth={on ? st.w + 0.8 : st.w}
                strokeDasharray={st.dash}
              />
            );
          })}
        </svg>

        <div className="relative grid gap-6 md:grid-cols-3 md:gap-16">
          {byLane.map((lane) => (
            <div key={lane.key} className="min-w-0">
              <div className="mb-2 flex items-baseline gap-2">
                <h2 className="text-[14px] font-semibold">{lane.title}</h2>
                <span className="text-[12px] text-muted">{lane.sub}</span>
              </div>
              <ul className="flex flex-col gap-1.5">
                {lane.items.map((n) => {
                  const dim = lit && !lit.has(n.id);
                  const sel = focus === n.id;
                  return (
                    <li key={n.id} ref={(el) => nodeRefs.current.set(n.id, el)}>
                      <button
                        type="button"
                        onClick={() => setQuery({ focus: sel ? "" : n.id })}
                        className={`card block w-full px-3 py-2 text-left ${
                          sel ? "border-accent ring-2 ring-accent/30" : "hover:border-accent/50"
                        }`}
                        title={n.title}
                      >
                        <div className={`transition-opacity ${dim ? "opacity-35" : ""}`}>
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-mono text-[12.5px] font-medium text-accent">{n.label}</span>
                          <span
                            className={`h-2 w-2 shrink-0 rounded-full ${
                              n.relevance === "high" ? "bg-accent" : n.relevance === "medium" ? "bg-accent/40" : "bg-line"
                            }`}
                            aria-label={`${n.relevance} relevance`}
                          />
                        </div>
                        <div className="truncate text-[12.5px] text-muted">{n.title}</div>
                        </div>
                      </button>
                    </li>
                  );
                })}
                {lane.items.length === 0 && <li className="text-[13px] text-muted">Nothing in this lane for these filters.</li>}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {focusItem && (
        <section className="card mt-8 px-4 py-4">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className="font-mono text-[13px] font-medium text-accent">{focusItem.label}</span>
            <RelevanceChip relevance={focusItem.relevance} />
            <StatusText status={focusItem.status} />
            <a className="link ml-auto text-[13px]" href={href(`item/${encodeURIComponent(focusItem.id)}`)}>
              Open →
            </a>
          </div>
          <h3 className="mb-3 font-semibold text-pretty">{focusItem.title}</h3>
          <div className="grid gap-4 sm:grid-cols-3">
            {LANES.map((lane) => {
              const chain = [...(lit ?? [])]
                .map((id) => data.items.get(id))
                .filter((i) => i && i.id !== focusItem.id && laneOf(i) === lane.key);
              return (
                <div key={lane.key}>
                  <div className="label mb-1.5">{lane.title}</div>
                  {chain.length === 0 ? (
                    <p className="text-[13px] text-faint">—</p>
                  ) : (
                    <ul className="flex flex-col gap-1">
                      {chain.map((i) => (
                        <li key={i.id} className="text-[13.5px] leading-snug">
                          <a className="link font-medium" href={href(`item/${encodeURIComponent(i.id)}`)}>
                            {i.label}
                          </a>{" "}
                          <span className="text-muted">{i.title}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      <p className="mt-6 text-[12px] text-muted">
        Solid lines: implements or related. Dashed: supersedes, revokes. Dotted: amends. Links inside a lane (e.g. EO amending EO)
        appear in each document's Connected panel.
      </p>
    </>
  );
}
