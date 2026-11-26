import { useEffect, useRef } from "react";
import { useKb } from "./lib/data.js";
import { href, navigate, useRoute } from "./lib/route.js";
import { toggleTheme } from "./lib/prefs.js";
import Home from "./pages/Home.jsx";
import Search from "./pages/Search.jsx";
import Entry from "./pages/Entry.jsx";
import Mandates from "./mandates/Mandates.jsx";

const NAV = [
  { label: "Desk cards", q: { type: "desk-card" } },
  { label: "Slideshows", q: { type: "slideshow" } },
  { label: "Mandates", path: "mandates" },
  { label: "Make Your Bed", path: "e/make-your-bed" },
  { label: "Browse all", q: {} },
];

export default function App() {
  const route = useRoute();
  const { kb, error } = useKb();
  const searchRef = useRef(null);
  const page = route.path[0] ?? "";

  // "/" or Ctrl/Cmd-K focuses search from anywhere (except while typing).
  useEffect(() => {
    const on = (e) => {
      const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement?.tagName);
      if ((e.key === "/" && !typing) || (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey))) {
        e.preventDefault();
        searchRef.current?.focus();
        searchRef.current?.select();
      }
    };
    window.addEventListener("keydown", on);
    return () => window.removeEventListener("keydown", on);
  }, []);

  const submit = (e) => {
    e.preventDefault();
    const q = searchRef.current.value.trim();
    const keep = page === "search" ? route.query : {};
    navigate("search", { ...keep, q });
  };

  return (
    <div className="shell">
      <header className="top no-print">
        <a className="brand" href="#/">
          <img src="/favicon.svg" alt="" width="26" height="26" />
          <span>
            <b>Career KB</b>
            <small>Federal IT leadership</small>
          </span>
        </a>
        <form className="topsearch" role="search" onSubmit={submit}>
          <input
            ref={searchRef}
            key={page === "search" ? route.query.q ?? "" : "x"}
            defaultValue={page === "search" ? route.query.q ?? "" : ""}
            type="search"
            placeholder="Search desk cards, slides, mandates…"
            aria-label="Search"
          />
          <kbd aria-hidden="true">/</kbd>
        </form>
        <nav className="topnav">
          {NAV.map((n) => {
            const active = n.path
              ? route.path.join("/") === n.path || page === n.path
              : page === "search" && (route.query.type ?? "") === (n.q.type ?? "") && !route.query.q;
            return (
              <a key={n.label} href={n.path ? href(n.path) : href("search", n.q)} aria-current={active ? "page" : undefined}>
                {n.label}
              </a>
            );
          })}
        </nav>
        <div className="topactions">
          <button className="ghost icon" onClick={toggleTheme} title="Toggle light/dark" aria-label="Toggle light or dark theme">
            <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
              <circle cx="8" cy="8" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <path d="M8 1.5a6.5 6.5 0 0 1 0 13z" fill="currentColor" />
            </svg>
          </button>
          <form method="post" action="/logout">
            <button className="ghost" type="submit">
              Sign out
            </button>
          </form>
        </div>
      </header>

      <main className="main">
        {error ? (
          <div className="notice bad">Couldn't load the knowledge base: {String(error.message ?? error)}</div>
        ) : !kb ? (
          <div className="loading">Loading…</div>
        ) : page === "mandates" ? (
          <Mandates route={{ path: route.path.slice(1), query: route.query }} />
        ) : page === "search" ? (
          <Search kb={kb} query={route.query} />
        ) : page === "e" && route.path[1] ? (
          <Entry kb={kb} id={route.path[1]} query={route.query} />
        ) : (
          <Home kb={kb} />
        )}
      </main>

      <footer className="foot no-print">
        Personal reference, not an official agency system. No CUI, PII or non-public agency text.
        {kb && <span> · Built {new Date(kb.built).toLocaleDateString()}</span>}
      </footer>
    </div>
  );
}
