// Shared helpers for the nightly data scripts. Node 22, no dependencies.
import { readFileSync, writeFileSync } from "node:fs";

export const DATA = new URL("../public/data/", import.meta.url);
export const UA = "OrderOfOperations-sync/1.0 (+https://github.com/imransshah/DadBurgers.com)";

export function readData(name) {
  return JSON.parse(readFileSync(new URL(`${name}.json`, DATA), "utf8"));
}

export function writeData(name, obj) {
  writeFileSync(new URL(`${name}.json`, DATA), JSON.stringify(obj, null, 2) + "\n");
}

export const todayUTC = () => new Date().toISOString().slice(0, 10);

export function slug(s, max = 60) {
  return String(s)
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, max)
    .replace(/-+$/g, "");
}

export async function fetchRetry(url, { tries = 4, accept = "application/json", ...init } = {}) {
  let last;
  for (let i = 0; i < tries; i++) {
    try {
      const res = await fetch(url, { ...init, headers: { "User-Agent": UA, Accept: accept, ...(init.headers ?? {}) } });
      if (res.ok) return res;
      last = new Error(`${res.status} ${res.statusText} for ${url}`);
      if (res.status >= 400 && res.status < 500 && res.status !== 429) throw last;
    } catch (e) {
      last = e;
      if (/^4\d\d /.test(e.message) && !e.message.startsWith("429")) throw e;
    }
    await new Promise((r) => setTimeout(r, 2000 * 2 ** i));
  }
  throw last;
}

/** Minimal anchor extraction — good enough for listing pages, no DOM needed. */
export function anchors(html, base) {
  const out = [];
  const re = /<a\b[^>]*?href\s*=\s*["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
  let m;
  while ((m = re.exec(html))) {
    const text = m[2]
      .replace(/<[^>]+>/g, " ")
      .replace(/&nbsp;/g, " ")
      .replace(/&amp;/g, "&")
      .replace(/&#8217;|&rsquo;/g, "’")
      .replace(/&#8220;|&#8221;|&ldquo;|&rdquo;/g, '"')
      .replace(/&#8211;|&ndash;/g, "–")
      .replace(/&#\d+;/g, "")
      .replace(/\s+/g, " ")
      .trim();
    try {
      out.push({ href: new URL(m[1], base).href, text });
    } catch {
      /* skip malformed */
    }
  }
  return out;
}
