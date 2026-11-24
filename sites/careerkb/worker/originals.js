/**
 * /originals — unredacted PDFs, for the site owner only.
 *
 * Two locks, both required:
 *   1. the site passcode session (checked in index.js before we get here), and
 *   2. a valid Cloudflare Access token for the /originals path. Access sits in
 *      front of the worker and sends a one-time email code; only the allowed
 *      address (configured in the Zero Trust dashboard, never in this repo)
 *      gets a token. We verify the token's signature, audience, issuer and
 *      expiry here too, so a misconfigured or removed Access app can't open it.
 *
 * Files live in a private R2 bucket (binding ORIGINALS), keyed <entry-id>.pdf.
 * Nothing about them is in the public repo or the static build.
 *
 * Config (wrangler secrets or vars). Missing any of them → 503, locked:
 *   ACCESS_TEAM_DOMAIN  e.g. yourteam.cloudflareaccess.com
 *   ACCESS_AUD          the Access application's AUD tag
 */

// Display names. Keys match the redacted entry ids on the main site.
const TITLES = {
  "ai-quick-reference.pdf": "AI Quick Reference Desk Card",
  "cybersecurity-quick-reference.pdf": "Cybersecurity Quick Reference Desk Card",
  "data-quick-reference.pdf": "Data Quick Reference Desk Card",
  "itil-quick-reference.pdf": "ITIL Quick Reference Desk Card",
  "ai-things-you-need-to-know.pdf": "AI: The Things You Need to Know",
  "cybersecurity-things-you-need-to-know.pdf": "Cybersecurity: The Things You Need to Know",
  "data-things-you-need-to-know.pdf": "Data: The Things You Need to Know",
  "itil-things-you-need-to-know.pdf": "ITIL: The Things You Need to Know",
};
const titleOf = (key) => TITLES[key] ?? key.replace(/\.pdf$/, "");
const isDeck = (key) => key.includes("things-you-need-to-know");

const KEY_RE = /^[a-z0-9-]{1,120}\.pdf$/;
const CERT_TTL_MS = 60 * 60 * 1000;
let certCache = { domain: null, at: 0, keys: new Map() };

const b64url = (s) => {
  const b = atob(s.replace(/-/g, "+").replace(/_/g, "/") + "===".slice((s.length + 3) % 4));
  return Uint8Array.from(b, (c) => c.charCodeAt(0));
};
const decodeJson = (s) => JSON.parse(new TextDecoder().decode(b64url(s)));

function cookie(request, name) {
  const raw = request.headers.get("Cookie") ?? "";
  for (const part of raw.split(";")) {
    const [k, ...v] = part.trim().split("=");
    if (k === name) return v.join("=");
  }
  return null;
}

async function signingKey(domain, kid) {
  const fresh = certCache.domain === domain && Date.now() - certCache.at < CERT_TTL_MS;
  if (!fresh || !certCache.keys.has(kid)) {
    const res = await fetch(`https://${domain}/cdn-cgi/access/certs`);
    if (!res.ok) throw new Error(`certs ${res.status}`);
    const { keys = [] } = await res.json();
    const map = new Map();
    for (const jwk of keys) {
      if (jwk.kty !== "RSA" || !jwk.kid) continue;
      map.set(jwk.kid, await crypto.subtle.importKey("jwk", jwk, { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" }, false, ["verify"]));
    }
    certCache = { domain, at: Date.now(), keys: map };
  }
  return certCache.keys.get(kid) ?? null;
}

/** Returns the verified Access claims, or null. Never throws. */
export async function verifyAccess(request, env) {
  try {
    const domain = env.ACCESS_TEAM_DOMAIN?.replace(/^https?:\/\//, "").replace(/\/+$/, "");
    const aud = env.ACCESS_AUD;
    if (!domain || !aud) return null;
    const token = request.headers.get("Cf-Access-Jwt-Assertion") || cookie(request, "CF_Authorization");
    if (!token) return null;
    const [h, p, s] = token.split(".");
    if (!h || !p || !s) return null;
    const header = decodeJson(h);
    if (header.alg !== "RS256") return null;
    const key = await signingKey(domain, header.kid);
    if (!key) return null;
    const ok = await crypto.subtle.verify("RSASSA-PKCS1-v1_5", key, b64url(s), new TextEncoder().encode(`${h}.${p}`));
    if (!ok) return null;
    const claims = decodeJson(p);
    const now = Math.floor(Date.now() / 1000);
    const auds = Array.isArray(claims.aud) ? claims.aud : [claims.aud];
    if (!auds.includes(aud)) return null;
    if (claims.iss !== `https://${domain}`) return null;
    if (typeof claims.exp !== "number" || claims.exp < now) return null;
    if (typeof claims.nbf === "number" && claims.nbf > now + 60) return null;
    if (!claims.email) return null;
    return claims;
  } catch (e) {
    console.error("access verify failed", e?.message);
    return null;
  }
}

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
const fmtSize = (n) => (n > 1e6 ? `${(n / 1e6).toFixed(1)} MB` : `${Math.max(1, Math.round(n / 1e3))} KB`);

function page(title, body) {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)}</title><style>
:root{color-scheme:light dark;--fg:#1d1d1f;--mut:#6b6b70;--bg:#fafaf8;--card:#fff;--line:#e3e3e0;--acc:#7a4b12}
@media (prefers-color-scheme:dark){:root{--fg:#ececec;--mut:#a0a0a6;--bg:#141416;--card:#1c1c1f;--line:#2c2c30;--acc:#e0a35a}}
body{margin:0;background:var(--bg);color:var(--fg);font:15px/1.5 system-ui,-apple-system,sans-serif}
main{max-width:760px;margin:0 auto;padding:32px 16px}a{color:var(--acc)}
h1{font-size:22px;margin:0 0 4px}h2{font-size:13px;text-transform:uppercase;letter-spacing:.06em;color:var(--mut);margin:28px 0 8px}
.note{color:var(--mut);font-size:13px;margin:0 0 8px}ul{list-style:none;padding:0;margin:0}
li{background:var(--card);border:1px solid var(--line);border-radius:10px;padding:12px 14px;margin:0 0 8px;display:flex;gap:12px;align-items:baseline;flex-wrap:wrap}
li b{flex:1 1 260px;font-weight:600}li span{color:var(--mut);font-size:13px}
</style></head><body><main>${body}</main></body></html>`;
}

function htmlRes(body, status = 200) {
  return new Response(body, {
    status,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Content-Security-Policy": "default-src 'none'; style-src 'unsafe-inline'; frame-ancestors 'none'; base-uri 'none'",
      "Cache-Control": "no-store",
    },
  });
}

async function index(env, who) {
  const groups = { "Desk cards": [], Slideshows: [] };
  let cursor;
  do {
    const r = await env.ORIGINALS.list({ cursor });
    for (const o of r.objects) {
      if (!KEY_RE.test(o.key)) continue;
      const kind = isDeck(o.key) ? "Slideshows" : "Desk cards";
      groups[kind].push(o);
    }
    cursor = r.truncated ? r.cursor : undefined;
  } while (cursor);

  const list = (items) =>
    items.length
      ? `<ul>${items
          .sort((a, b) => titleOf(a.key).localeCompare(titleOf(b.key)))
          .map((o) => {
            const name = esc(titleOf(o.key));
            const href = `/originals/${encodeURIComponent(o.key)}`;
            return `<li><b>${name}</b><span>${fmtSize(o.size)}</span><a href="${href}" target="_blank" rel="noopener">Open</a><a href="${href}?download=1">Download</a></li>`;
          })
          .join("")}</ul>`
      : `<p class="note">Nothing uploaded yet.</p>`;

  return htmlRes(
    page(
      "Originals",
      `<p class="note"><a href="/">← Career KB</a></p><h1>Originals</h1>
<p class="note">Unredacted editions. Visible only to ${esc(who)}. Don't share links; they won't open for anyone else.</p>
${Object.entries(groups).map(([k, v]) => `<h2>${k}</h2>${list(v)}`).join("")}`,
    ),
  );
}

function parseRange(header, size) {
  const m = /^bytes=(\d*)-(\d*)$/.exec(header ?? "");
  if (!m || (m[1] === "" && m[2] === "")) return null;
  if (m[1] === "") {
    const n = Math.min(Number(m[2]), size);
    return { offset: size - n, length: n };
  }
  const start = Number(m[1]);
  const end = m[2] === "" ? size - 1 : Math.min(Number(m[2]), size - 1);
  if (start >= size || end < start) return "invalid";
  return { offset: start, length: end - start + 1 };
}

async function file(request, env, key, url) {
  const head = await env.ORIGINALS.head(key);
  if (!head) return htmlRes(page("Not found", "<h1>Not found</h1><p><a href='/originals/'>Back to originals</a></p>"), 404);
  const size = head.size;
  const range = parseRange(request.headers.get("Range"), size);
  if (range === "invalid") return new Response(null, { status: 416, headers: { "Content-Range": `bytes */${size}` } });

  const obj = await env.ORIGINALS.get(key, range ? { range } : undefined);
  if (!obj) return new Response("Not found", { status: 404 });

  const name = titleOf(key).replace(/[^\w .()-]/g, "") + ".pdf";
  const h = new Headers({
    "Content-Type": "application/pdf",
    "Accept-Ranges": "bytes",
    "Cache-Control": "private, no-store",
    "Content-Disposition": `${url.searchParams.has("download") ? "attachment" : "inline"}; filename="${name}"`,
    ETag: head.httpEtag,
  });
  if (range) {
    h.set("Content-Range", `bytes ${range.offset}-${range.offset + range.length - 1}/${size}`);
    h.set("Content-Length", String(range.length));
  } else {
    h.set("Content-Length", String(size));
  }
  if (request.method === "HEAD") return new Response(null, { status: range ? 206 : 200, headers: h });
  return new Response(obj.body, { status: range ? 206 : 200, headers: h });
}

/** Called only after the site session check has passed. */
export async function handleOriginals(request, env, url) {
  if (request.method !== "GET" && request.method !== "HEAD") return new Response("Method not allowed", { status: 405 });
  if (!env.ORIGINALS || !env.ACCESS_TEAM_DOMAIN || !env.ACCESS_AUD) {
    return htmlRes(page("Locked", "<h1>Originals are locked</h1><p class='note'>The private storage or the email check isn't configured yet.</p>"), 503);
  }
  const claims = await verifyAccess(request, env);
  if (!claims) {
    return htmlRes(page("Locked", "<h1>Originals are locked</h1><p class='note'>This section needs the email code check. Reload to get a code.</p>"), 403);
  }

  const rest = url.pathname.slice("/originals".length).replace(/^\/+/, "");
  if (rest === "") return index(env, claims.email);
  let key;
  try {
    key = decodeURIComponent(rest);
  } catch {
    key = "";
  }
  if (!KEY_RE.test(key)) return htmlRes(page("Not found", "<h1>Not found</h1>"), 404);
  return file(request, env, key, url);
}
