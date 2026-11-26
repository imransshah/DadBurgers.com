import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useMandatesData } from "./lib/load.js";
import { href } from "./lib/route.js";
import { useAppState, isReviewed } from "./lib/state.js";
import { Seg } from "./components/ui.jsx";
import Queue from "./pages/Queue.jsx";
import Orders from "./pages/Orders.jsx";
import Guidance from "./pages/Guidance.jsx";
import Item from "./pages/Item.jsx";
import Brief from "./pages/Brief.jsx";
import MapPage from "./pages/Map.jsx";
import Calendar from "./pages/Calendar.jsx";
import Internal from "./pages/Internal.jsx";
import Review from "./pages/Review.jsx";
import About from "./pages/About.jsx";

// The Mandates section of Career KB: executive orders, presidential memoranda
// and the OMB / OPM / CISA / FedRAMP / NIST guidance that implements them,
// with your actions, deadlines and review state. Everything here is also in
// the Career KB search index (scripts/build-content.mjs).

const DataCtx = createContext(null);
export const useData = () => useContext(DataCtx);

const LensCtx = createContext(["all", () => {}]);
export const useLens = () => useContext(LensCtx);

const NAV = [
  { path: "", label: "Queue" },
  { path: "orders", label: "Orders" },
  { path: "guidance", label: "Guidance" },
  { path: "map", label: "Map" },
  { path: "calendar", label: "Calendar" },
  { path: "internal", label: "Internal" },
  { path: "review", label: "Review" },
  { path: "about", label: "About" },
];

const LENS_OPTIONS = [
  { value: "all", label: "All lenses" },
  { value: "ops", label: "IT Ops", hint: "Systems, network, cloud, security ops, contracts" },
  { value: "manager", label: "Manager", hint: "Supervising feds; COR over contractors" },
  { value: "employee", label: "Employee", hint: "You personally" },
];

function readLens() {
  try {
    return localStorage.getItem("oo-lens") || "all";
  } catch {
    return "all";
  }
}

/** `route.path` is section-relative: [] is the queue, ["item", id] a document. */
export default function Mandates({ route }) {
  const { data, error } = useMandatesData();
  const [lens, setLensState] = useState(readLens);
  const setLens = (v) => {
    setLensState(v);
    try {
      localStorage.setItem("oo-lens", v);
    } catch {
      /* per-browser convenience only */
    }
  };

  useEffect(() => {
    document.title = "Mandates · Career KB";
    return () => {
      document.title = "Career KB";
    };
  }, []);

  if (error) return <div className="notice bad">Couldn't load the Mandates data: {String(error.message ?? error)}</div>;
  if (!data) return <div className="loading">Loading…</div>;

  const [head] = route.path;
  return (
    <DataCtx.Provider value={data}>
      <LensCtx.Provider value={[lens, setLens]}>
        <div className="oo">
          {head !== "brief" && <SectionBar active={head ?? ""} />}
          <Page route={route} />
        </div>
      </LensCtx.Provider>
    </DataCtx.Provider>
  );
}

function Page({ route }) {
  const [head, arg] = route.path;
  switch (head) {
    case undefined:
      return <Queue query={route.query} />;
    case "orders":
      return <Orders query={route.query} />;
    case "guidance":
      return <Guidance query={route.query} />;
    case "item":
      return <Item id={arg} />;
    case "brief":
      return <Brief id={arg} />;
    case "map":
      return <MapPage query={route.query} />;
    case "calendar":
      return <Calendar />;
    case "internal":
      return <Internal />;
    case "review":
      return <Review />;
    case "about":
      return <About />;
    default:
      return (
        <div className="py-20 text-center text-muted">
          Nothing at this address. <a className="oo-link" href={href()}>Back to the queue</a>.
        </div>
      );
  }
}

function SectionBar({ active }) {
  const data = useData();
  const { state, mode, error } = useAppState();
  const [lens, setLens] = useLens();
  const activeNav = active === "item" ? null : active;

  const unreviewed = useMemo(() => {
    let n = 0;
    for (const item of data.items.values())
      if ((item.relevance === "high" || item.relevance === "medium") && !isReviewed(state, item)) n++;
    return n + data.inbox.length;
  }, [data, state]);

  return (
    <div className="no-print mb-6 border-b border-line">
      <div className="mb-1 flex flex-wrap items-end justify-between gap-x-4 gap-y-2">
        <div>
          <div className="oo-label">Mandates</div>
          <div className="text-[13px] text-muted">
            Executive orders, presidential memoranda and the guidance that implements them, read for{" "}
            {data.profile.role} · {data.profile.agency.match(/\((.*)\)/)?.[1] ?? data.profile.agency}{" "}
            {data.profile.component.match(/\((.*)\)/)?.[1] ?? ""}
          </div>
        </div>
        <div className="hidden md:block">
          <Seg label="Lens" value={lens} onChange={setLens} options={LENS_OPTIONS} />
        </div>
      </div>
      <nav className="oo-scroll-x -mb-px flex gap-1" aria-label="Mandates sections">
        {NAV.map((n) => {
          const isActive = activeNav === n.path;
          return (
            <a
              key={n.path}
              href={href(n.path)}
              aria-current={isActive ? "page" : undefined}
              className={`relative whitespace-nowrap px-2.5 py-2.5 text-[14px] ${isActive ? "font-semibold text-ink" : "text-muted hover:text-ink"}`}
            >
              {n.label}
              {n.path === "review" && unreviewed > 0 && (
                <span className="ml-1.5 rounded-full bg-gold-soft px-1.5 font-mono text-[11px] text-gold">{unreviewed}</span>
              )}
              {isActive && <span className="absolute inset-x-2 bottom-0 h-[2px] rounded bg-accent" />}
            </a>
          );
        })}
      </nav>
      {(mode === "local" || error) && (
        <div className="mb-2 mt-1 rounded-md bg-gold-soft px-3 py-1.5 text-[12.5px] text-gold">
          {error ?? "Local mode: your statuses and notes are saved in this browser only (the /api worker isn't running)."}
        </div>
      )}
    </div>
  );
}

/** Lens selector for small screens, shown at the top of pages that use it. */
export function MobileLens() {
  const [lens, setLens] = useLens();
  return (
    <div className="mb-4 md:hidden">
      <div className="oo-scroll-x">
        <Seg
          label="Lens"
          value={lens}
          onChange={setLens}
          options={[
            { value: "all", label: "All" },
            { value: "ops", label: "IT Ops" },
            { value: "manager", label: "Manager" },
            { value: "employee", label: "Employee" },
          ]}
        />
      </div>
    </div>
  );
}
