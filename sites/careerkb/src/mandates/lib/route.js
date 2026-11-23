// The Mandates section lives under #/mandates/… inside Career KB. Pages in
// this folder address each other with section-relative paths ("orders",
// "item/eo-14306"); these helpers add the prefix. kbHref() leaves the section.

import * as root from "../../lib/route.js";

const PREFIX = "mandates";

export function href(path = "", query) {
  return root.href(path ? `${PREFIX}/${path}` : PREFIX, query);
}

export function navigate(path = "", query) {
  root.navigate(path ? `${PREFIX}/${path}` : PREFIX, query);
}

/** A Career KB route outside the section, e.g. kbHref("search", { tag: "logging" }). */
export const kbHref = root.href;

/** Full-hash parse; `path` is section-relative (the "mandates" segment removed). */
export function parseHash(hash) {
  const r = root.parseHash(hash);
  return { path: r.path[0] === PREFIX ? r.path.slice(1) : r.path, query: r.query };
}

export const setQuery = root.setQuery;
