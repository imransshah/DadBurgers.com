import { useEffect, useState } from "react";

// Hash routing: #/orders/eo-14306?q=tls. No server routes to configure, and
// it survives the password redirect untouched.

export function parseHash(hash = window.location.hash) {
  const raw = hash.replace(/^#\/?/, "");
  const [pathPart, queryPart = ""] = raw.split("?");
  const path = pathPart.split("/").filter(Boolean).map(decodeURIComponent);
  const query = Object.fromEntries(new URLSearchParams(queryPart));
  return { path, query };
}

export function useRoute() {
  const [route, setRoute] = useState(() => parseHash());
  useEffect(() => {
    let last = parseHash().path.join("/");
    const on = () => {
      const next = parseHash();
      setRoute(next);
      const p = next.path.join("/");
      if (p !== last) window.scrollTo({ top: 0 });
      last = p;
    };
    window.addEventListener("hashchange", on);
    return () => window.removeEventListener("hashchange", on);
  }, []);
  return route;
}

export function href(path, query) {
  const q = query && Object.keys(query).length ? `?${new URLSearchParams(query)}` : "";
  return `#/${path}${q}`;
}

export function navigate(path, query) {
  window.location.hash = href(path, query).slice(1);
}

/** Update query params on the current route without adding history noise. */
export function setQuery(patch) {
  const { path, query } = parseHash();
  const next = { ...query, ...patch };
  for (const k of Object.keys(next)) if (next[k] === "" || next[k] == null) delete next[k];
  const url = `#/${path.map(encodeURIComponent).join("/")}${Object.keys(next).length ? `?${new URLSearchParams(next)}` : ""}`;
  history.replaceState(null, "", url);
  window.dispatchEvent(new HashChangeEvent("hashchange"));
}
