import { useEffect, useState } from "react";

// Loads the Mandates JSON (copied into public/data/mandates/ at build time,
// served behind the password) once per page load and indexes it.

import { buildIndex } from "./data.js";

const FILES = ["catalog", "analysis", "guidance", "inbox", "meta", "profile"];
let cache = null;

export function loadData() {
  cache ??= Promise.all(
    FILES.map(async (name) => {
      const res = await fetch(`/data/mandates/${name}.json`, { cache: "no-cache", credentials: "same-origin" });
      if (res.status === 401 || res.redirected) {
        window.location.href = "/login";
        throw new Error("signed out");
      }
      if (!res.ok) throw new Error(`Could not load ${name}.json (${res.status})`);
      return [name, await res.json()];
    }),
  ).then((entries) => buildIndex(Object.fromEntries(entries)));
  cache.catch(() => {
    cache = null;
  });
  return cache;
}

export function useMandatesData() {
  const [state, setState] = useState({ data: null, error: null });
  useEffect(() => {
    let live = true;
    loadData().then(
      (data) => live && setState({ data, error: null }),
      (error) => live && setState({ data: null, error }),
    );
    return () => {
      live = false;
    };
  }, []);
  return state;
}
