import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { loadData } from "./lib/data.js";
import { href, navigate, useRoute } from "./lib/route.js";
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
import Search from "./pages/Search.jsx";
import About from "./pages/About.jsx";

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
];

function readLens() {
  try {
    return localStorage.getItem("oo-lens") || "all";
  } catch {
    return "all";
  }
}

export default function App() {
  const route = useRoute();
  const [data, setData] = useState(null);
  const [loadError, setLoadError] = useState(null);
  const [lens, setLensState] = useState(readLens);
  const setLens = (v) => {
    setLensState(v);
    try {
      localStorage.setItem("oo-lens", v);
    } catch {
      /* fine */
    }
  };

  useEffect(() => {
    loadData().then(setData, (e) => setLoadError(e.message));
  }, []);

  if (loadError)
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <h1 className="mb-2 text-xl font-semibold">The data didn't load.</h1>
        <p className="text-muted">{loadError}</p>
      </div>
    );
  if (!data)
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center text-muted" aria-busy="true">
        Loading…
      </div>
    );

  const isBrief = route.path[0] === "brief";

  return (
    <DataCtx.Provider value={data}>
      <LensCtx.Provider value={[lens, setLens]}>
        {!isBrief && <TopBar route={route} />}
        <main className={isBrief ? "" : "mx-auto max-w-6xl px-4 pb-24 pt-6 sm:px-6"}>
          <Page route={route} />
        </main>
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
    case "search":
      return <Search query={route.query} />;
    case "about":
      return <About />;
    default:
      return (
        <div className="py-20 text-center text-muted">
          Nothing at this address. <a className="link" href="#/">Back to your queue</a>.
        </div>
      );
  }
}

function TopBar({ route }) {
  const data = useData();
  const { state, mode, error } = useAppState();
  const [lens, setLens] = useLens();
  const [q, setQ] = useState(route.query.q ?? "");
  const searchRef = useRef(null);

  const unreviewed = useMemo(() => {
    let n = 0;
    for (const item of data.items.values()) {
      if ((item.relevance === "high" || item.relevance === "medium") && !isReviewed(state, item)) n++;
    }
    return n + data.inbox.length;
  }, [data, state]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "/" && !/input|textarea|select/i.test(document.activeElement?.tagName)) {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const active = route.path[0] ?? "";
  const activeNav = active === "item" ? null : active;

  return (
    <header className="no-print sticky top-0 z-20 border-b border-line bg-surface/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 pt-3 sm:px-6">
        <a href="#/" className="flex shrink-0 items-center gap-2.5" aria-label="Order of Operations — home">
          <svg width="26" height="26" viewBox="0 0 32 32" aria-hidden>
            <rect width="32" height="32" rx="7" fill="var(--c-accent)" />
            <path d="M9 10h14M9 16h10M9 22h6" stroke="var(--c-accent-ink)" strokeWidth="2.6" strokeLinecap="round" />
            <circle cx="23" cy="22" r="3" fill="var(--c-gold)" />
          </svg>
          <span className="hidden leading-tight sm:block">
            <span className="block text-[15px] font-semibold tracking-tight">Order of Operations</span>
            <span className="block font-mono text-[10.5px] uppercase tracking-wider text-muted">
              {data.profile.component.replace(/ \(.*\)/, "")} · {data.profile.agency.match(/\((.*)\)/)?.[1] ?? ""}
            </span>
          </span>
        </a>
        <form
          className="ml-auto flex min-w-0 flex-1 justify-end sm:max-w-xs"
          onSubmit={(e) => {
            e.preventDefault();
            if (q.trim()) navigate("search", { q: q.trim() });
          }}
        >
          <input
            ref={searchRef}
            className="input h-[32px]"
            type="search"
            placeholder="Search  ( / )"
            aria-label="Search orders and guidance"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </form>
        <a href="#/about" className="btn btn-sm shrink-0" title="Settings and data health">
          <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="8" cy="8" r="2.2" />
            <path d="M8 1.5v2M8 12.5v2M1.5 8h2M12.5 8h2M3.4 3.4l1.4 1.4M11.2 11.2l1.4 1.4M3.4 12.6l1.4-1.4M11.2 4.8l1.4-1.4" />
          </svg>
          <span className="sr-only">Settings</span>
        </a>
      </div>
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 sm:px-6">
        <nav className="scroll-x -mb-px flex min-w-0 flex-1 gap-1" aria-label="Sections">
          {NAV.map((n) => {
            const isActive = activeNav === n.path;
            return (
              <a
                key={n.path}
                href={href(n.path)}
                aria-current={isActive ? "page" : undefined}
                className={`relative whitespace-nowrap px-2.5 py-2.5 text-[14px] ${
                  isActive ? "font-semibold text-ink" : "text-muted hover:text-ink"
                }`}
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
        <div className="hidden shrink-0 md:block">
          <Seg
            label="Lens"
            value={lens}
            onChange={setLens}
            options={[
              { value: "all", label: "All lenses" },
              { value: "ops", label: "IT Ops", hint: "Systems, network, cloud, security ops, contracts" },
              { value: "manager", label: "Manager", hint: "Supervising feds; COR over contractors" },
              { value: "employee", label: "Employee", hint: "You personally" },
            ]}
          />
        </div>
      </div>
      {(mode === "local" || error) && (
        <div className="border-t border-line bg-gold-soft px-4 py-1.5 text-center text-[12.5px] text-gold">
          {error ??
            "Local mode: your statuses and notes are saved in this browser only (the /api worker isn't running)."}
        </div>
      )}
    </header>
  );
}

/** Lens selector for small screens, shown at the top of pages that use it. */
export function MobileLens() {
  const [lens, setLens] = useLens();
  return (
    <div className="mb-4 md:hidden">
      <div className="scroll-x">
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
