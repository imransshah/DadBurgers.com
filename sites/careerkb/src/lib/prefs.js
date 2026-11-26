import { useCallback, useState } from "react";

// Per-browser conveniences only: pins and recently viewed. Nothing here is
// needed for the site to work, and it never leaves the browser.

const read = (k, d) => {
  try {
    return JSON.parse(localStorage.getItem(k)) ?? d;
  } catch {
    return d;
  }
};
const write = (k, v) => {
  try {
    localStorage.setItem(k, JSON.stringify(v));
  } catch {}
};

export function usePins() {
  const [pins, setPins] = useState(() => read("ckb-pins", []));
  const toggle = useCallback((id) => {
    setPins((p) => {
      const next = p.includes(id) ? p.filter((x) => x !== id) : [id, ...p];
      write("ckb-pins", next);
      return next;
    });
  }, []);
  return [pins, toggle];
}

export function recordVisit(id) {
  const r = read("ckb-recent", []).filter((x) => x !== id);
  write("ckb-recent", [id, ...r].slice(0, 12));
}

export const recent = () => read("ckb-recent", []);

export function toggleTheme() {
  const root = document.documentElement;
  const dark = root.dataset.theme ? root.dataset.theme === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
  const next = dark ? "light" : "dark";
  root.dataset.theme = next;
  try {
    localStorage.setItem("ckb-theme", next);
  } catch {}
}
