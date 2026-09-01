import { useState, useEffect, useRef } from "react";
import { C, display, body } from "./lib/tokens.js";
import { PLACES, CONNECTIONS } from "./lib/content.js";
import ChatPanel from "./components/ChatPanel.jsx";

/**
 * DECOLONIZED — decolonized.therealdadburgers.com
 *
 * A world-history explorer for kids roughly ages 5–10.
 *
 * DESIGN NOTES FOR WHOEVER EXTENDS THIS (incl. Claude Code):
 *
 * Palette and type live in src/lib/tokens.js.
 * The places and the "things you used today" list live in src/lib/content.js,
 * along with the editorial rules. Read those rules before adding a card.
 *
 * Tailwind: uses core utilities only. Custom colors are inline styles
 * so this drops in without a tailwind.config change.
 */

// ---------------------------------------------------------------------------
// COMPONENTS
// ---------------------------------------------------------------------------

function Pin({ place, active, onSelect }) {
  return (
    <button
      onClick={() => onSelect(place.id)}
      aria-label={`${place.name}, ${place.where}`}
      aria-pressed={active}
      className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full focus:outline-none focus-visible:ring-4"
      style={{
        left: `${place.x}%`,
        top: `${place.y}%`,
        width: active ? 34 : 24,
        height: active ? 34 : 24,
        background: place.color,
        border: `3px solid ${C.ivory}`,
        boxShadow: active
          ? `0 0 0 8px ${place.color}33`
          : `0 2px 0 ${C.indigoDeep}`,
        transition: "width .18s, height .18s, box-shadow .18s",
      }}
    />
  );
}

function PlaceCard({ place }) {
  return (
    <article
      style={{ background: C.ivory, color: C.ink }}
      className="rounded-3xl p-6 sm:p-8"
    >
      <p style={{ ...body, color: place.color }} className="text-sm font-extrabold">
        {place.where} &nbsp;·&nbsp; {place.when}
      </p>
      <h2 style={{ ...display, fontWeight: 900 }} className="mt-1 text-3xl sm:text-4xl leading-tight">
        {place.name}
      </h2>
      <p style={body} className="mt-2 text-lg">
        {place.hook}
      </p>

      <h3 style={{ ...display, fontWeight: 600 }} className="mt-7 text-xl">
        What they figured out
      </h3>
      <ul className="mt-3 space-y-4">
        {place.built.map((b) => (
          <li
            key={b.thing}
            className="pl-4"
            style={{ borderLeft: `4px solid ${place.color}` }}
          >
            <p style={{ ...body, fontWeight: 800 }} className="text-lg leading-snug">
              {b.thing}
            </p>
            <p style={body} className="mt-1 text-base leading-relaxed opacity-85 max-w-prose">
              {b.why}
            </p>
          </li>
        ))}
      </ul>

      <div
        className="mt-7 rounded-2xl p-4"
        style={{ background: `${place.color}1A` }}
      >
        <p style={{ ...body, fontWeight: 800 }} className="text-sm">
          Something we still do not know
        </p>
        <p style={body} className="mt-1 text-base leading-relaxed max-w-prose">
          {place.stillUnknown}
        </p>
      </div>
    </article>
  );
}

function Connections() {
  const [open, setOpen] = useState(null);
  return (
    <section className="mt-20">
      <h2
        style={{ ...display, fontWeight: 900, color: C.ivory }}
        className="text-3xl sm:text-4xl"
      >
        Things you used today
      </h2>
      <p style={{ ...body, color: C.ivory }} className="mt-2 text-lg opacity-80 max-w-prose">
        Tap one to find out where it came from.
      </p>
      <div className="mt-6 space-y-3">
        {CONNECTIONS.map((c, i) => {
          const isOpen = open === i;
          return (
            <div key={c.q} className="rounded-2xl overflow-hidden" style={{ background: C.ivory }}>
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="w-full text-left p-5 focus:outline-none focus-visible:ring-4"
                style={{ ...body, color: C.ink, fontWeight: 700, fontSize: "1.05rem" }}
              >
                {c.q}
              </button>
              {isOpen && (
                <div className="px-5 pb-5" style={{ color: C.ink }}>
                  <p style={{ ...display, fontWeight: 900, color: C.rose }} className="text-2xl">
                    {c.a}
                  </p>
                  <p style={body} className="mt-1 text-base leading-relaxed max-w-prose">
                    {c.detail}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default function Decolonized() {
  const [selected, setSelected] = useState("indus");
  const place = PLACES.find((p) => p.id === selected);
  const cardRef = useRef(null);
  const firstLoad = useRef(true);

  useEffect(() => {
    if (firstLoad.current) {
      firstLoad.current = false;
      return;
    }
    cardRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [selected]);

  return (
    <div style={{ background: C.indigo, minHeight: "100vh" }}>
      {/* Bottom padding clears the fixed "Ask a question" button. */}
      <div className="mx-auto max-w-4xl px-5 py-12 sm:py-16 pb-28">
        <header>
          <h1
            style={{ ...display, fontWeight: 900, color: C.ivory, letterSpacing: "-.02em" }}
            className="text-5xl sm:text-7xl leading-[0.95]"
          >
            Everybody
            <br />
            built this
          </h1>
          <p
            style={{ ...body, color: C.marigold }}
            className="mt-5 text-lg sm:text-xl font-semibold max-w-prose"
          >
            Nobody invented the world by themselves. Pick a place and see what
            the people there worked out.
          </p>
        </header>

        {/* Map band */}
        <div
          className="relative mt-10 rounded-3xl overflow-hidden"
          style={{
            background: C.indigoDeep,
            aspectRatio: "16 / 9",
            border: `2px solid ${C.marigold}55`,
          }}
        >
          {/* Replace this block with a real SVG world map when you have one.
              Pin x/y are percentages, so they will still line up. */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(${C.ivory}18 1px, transparent 1px)`,
              backgroundSize: "22px 22px",
            }}
          />
          {PLACES.map((p) => (
            <Pin key={p.id} place={p} active={p.id === selected} onSelect={setSelected} />
          ))}
        </div>

        {/* Name buttons — the map alone is too fiddly for small fingers */}
        <div className="mt-5 flex flex-wrap gap-2">
          {PLACES.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelected(p.id)}
              aria-pressed={p.id === selected}
              style={{
                ...body,
                fontWeight: 800,
                background: p.id === selected ? p.color : "transparent",
                color: p.id === selected ? C.indigoDeep : C.ivory,
                border: `2px solid ${p.id === selected ? p.color : `${C.ivory}44`}`,
              }}
              className="rounded-full px-4 py-2 text-sm focus:outline-none focus-visible:ring-4"
            >
              {p.name}
            </button>
          ))}
        </div>

        <div ref={cardRef} className="mt-8">
          <PlaceCard place={place} />
        </div>

        <Connections />

        <footer className="mt-20 pb-4">
          <p style={{ ...body, color: C.ivory }} className="text-sm opacity-60 max-w-prose">
            Built for Amma and Abba's kids. Every fact here can be looked up —
            go check us.
          </p>
        </footer>
      </div>

      <ChatPanel />
    </div>
  );
}
