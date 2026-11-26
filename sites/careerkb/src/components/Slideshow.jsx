import { useCallback, useEffect, useRef, useState } from "react";
import { setQuery } from "../lib/route.js";

// ←/→ (or PageUp/PageDown, space) to move, Home/End to jump,
// F for full screen, N to toggle speaker notes. Slide number lives in the URL
// (?s=3) so a link can open a deck at a given slide.
export default function Slideshow({ entry, query }) {
  const slides = entry.slides;
  const n = slides.length;
  const idx = Math.min(Math.max((parseInt(query.s, 10) || 1) - 1, 0), n - 1);
  const hasNotes = slides.some((s) => s.notes);
  const [notes, setNotes] = useState(hasNotes);
  const [full, setFull] = useState(false);
  const stage = useRef(null);

  const go = useCallback((i) => setQuery({ s: String(Math.min(Math.max(i, 0), n - 1) + 1) }), [n]);

  const toggleFull = useCallback(() => {
    if (document.fullscreenElement) document.exitFullscreen();
    else stage.current?.requestFullscreen?.();
  }, []);

  useEffect(() => {
    const onFs = () => setFull(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onFs);
    return () => document.removeEventListener("fullscreenchange", onFs);
  }, []);

  useEffect(() => {
    const on = (e) => {
      if (/^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement?.tagName) || e.metaKey || e.ctrlKey || e.altKey) return;
      const k = e.key;
      if (k === "ArrowRight" || k === "PageDown" || k === " ") go(idx + 1);
      else if (k === "ArrowLeft" || k === "PageUp") go(idx - 1);
      else if (k === "Home") go(0);
      else if (k === "End") go(n - 1);
      else if (k === "f" || k === "F") toggleFull();
      else if (k === "n" || k === "N") setNotes((v) => !v);
      else return;
      e.preventDefault();
    };
    window.addEventListener("keydown", on);
    return () => window.removeEventListener("keydown", on);
  }, [idx, n, go, toggleFull]);

  const slide = slides[idx];

  return (
    <div className="deck">
      <div className={`stage ${full ? "full" : ""}`} ref={stage} onClick={(e) => full && e.target === e.currentTarget && go(idx + 1)}>
        <div className={`slide ${slide.html.length > 900 ? "dense" : ""}`} key={idx} dangerouslySetInnerHTML={{ __html: slide.html }} />
        <div className="deck-progress" aria-hidden="true">
          <span style={{ width: `${((idx + 1) / n) * 100}%` }} />
        </div>
        {full && (
          <div className="deck-count">
            {idx + 1} / {n}
          </div>
        )}
      </div>

      <div className="deck-bar">
        <button className="btn" onClick={() => go(idx - 1)} disabled={idx === 0} aria-label="Previous slide">
          ←
        </button>
        <span className="deck-count-inline">
          Slide {idx + 1} of {n}
        </span>
        <button className="btn" onClick={() => go(idx + 1)} disabled={idx === n - 1} aria-label="Next slide">
          →
        </button>
        <span className="spacer" />
        <button className={`btn ${notes ? "on" : ""}`} onClick={() => setNotes((v) => !v)} aria-pressed={notes}>
          Notes <kbd>N</kbd>
        </button>
        <button className="btn" onClick={toggleFull}>
          Present <kbd>F</kbd>
        </button>
      </div>

      {notes && (
        <div className="notes">
          <h4>Speaker notes</h4>
          {slide.notes ? <div className="prose" dangerouslySetInnerHTML={{ __html: slide.notes }} /> : <p className="muted">No notes for this slide.</p>}
        </div>
      )}

      <ol className="thumbs" aria-label="Slides">
        {slides.map((s, i) => (
          <li key={i}>
            <button className={i === idx ? "on" : ""} onClick={() => go(i)} aria-current={i === idx ? "true" : undefined}>
              <span className="num">{i + 1}</span>
              <span className="ttl">{s.title || "Untitled"}</span>
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}
