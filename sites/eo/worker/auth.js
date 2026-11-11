// Password gate. One shared secret (SITE_PASSWORD) and a signed session
// cookie. The signing key is derived from the password, so changing the
// password signs everyone out.

const COOKIE = "oo_session";
const SESSION_DAYS = 30;
const enc = new TextEncoder();

function b64url(bytes) {
  let s = "";
  for (const b of new Uint8Array(bytes)) s += String.fromCharCode(b);
  return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function sha256(text) {
  return new Uint8Array(await crypto.subtle.digest("SHA-256", enc.encode(text)));
}

function equalBytes(a, b) {
  if (crypto.subtle.timingSafeEqual) return a.length === b.length && crypto.subtle.timingSafeEqual(a, b);
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i];
  return diff === 0;
}

async function hmacKey(env) {
  const raw = await sha256(`oo-session-v1:${env.SITE_PASSWORD}:${env.SESSION_PEPPER ?? ""}`);
  return crypto.subtle.importKey("raw", raw, { name: "HMAC", hash: "SHA-256" }, false, ["sign", "verify"]);
}

export async function checkPassword(env, attempt) {
  if (typeof attempt !== "string" || !attempt) return false;
  const [a, b] = await Promise.all([sha256(attempt), sha256(env.SITE_PASSWORD)]);
  return equalBytes(a, b);
}

export async function issueCookie(env) {
  const exp = Math.floor(Date.now() / 1000) + SESSION_DAYS * 86400;
  const body = `v1.${exp}`;
  const sig = await crypto.subtle.sign("HMAC", await hmacKey(env), enc.encode(body));
  const token = `${body}.${b64url(sig)}`;
  return `${COOKIE}=${token}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${SESSION_DAYS * 86400}`;
}

export function clearCookie() {
  return `${COOKIE}=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0`;
}

export async function hasSession(request, env) {
  const cookie = request.headers.get("Cookie") ?? "";
  const m = cookie.match(new RegExp(`(?:^|;\\s*)${COOKIE}=([^;]+)`));
  if (!m) return false;
  const parts = m[1].split(".");
  if (parts.length !== 3 || parts[0] !== "v1") return false;
  const exp = Number(parts[1]);
  if (!Number.isFinite(exp) || exp < Date.now() / 1000) return false;
  const expected = b64url(await crypto.subtle.sign("HMAC", await hmacKey(env), enc.encode(`v1.${parts[1]}`)));
  return equalBytes(enc.encode(expected), enc.encode(parts[2]));
}

export function loginPage({ error = "", next = "/" } = {}) {
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>Order of Operations — sign in</title>
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<style>
  :root { --bg:#f5f6f8; --surface:#fff; --ink:#141922; --muted:#5a6475; --line:#dfe3ea; --accent:#1f3a68; --accent-ink:#fff; --bad:#b42318; color-scheme: light; }
  @media (prefers-color-scheme: dark) { :root { --bg:#0d1117; --surface:#151b23; --ink:#e6e9ef; --muted:#9aa4b5; --line:#29313d; --accent:#93b4ec; --accent-ink:#0d1117; --bad:#f7837a; color-scheme: dark; } }
  * { box-sizing: border-box; }
  body { margin:0; min-height:100vh; display:grid; place-items:center; background:var(--bg); color:var(--ink);
         font: 15px/1.5 ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif; padding:16px; }
  main { width:100%; max-width:360px; background:var(--surface); border:1px solid var(--line); border-radius:12px; padding:28px 24px; }
  .brand { display:flex; align-items:center; gap:10px; margin-bottom:20px; }
  .brand b { display:block; font-size:16px; letter-spacing:-0.01em; }
  .brand span { display:block; font: 11px ui-monospace, Menlo, monospace; letter-spacing:.06em; text-transform:uppercase; color:var(--muted); }
  label { display:block; font-size:13px; color:var(--muted); margin-bottom:6px; }
  input { width:100%; height:40px; padding:0 12px; border-radius:8px; border:1px solid var(--line); background:var(--bg); color:var(--ink); font-size:15px; }
  input:focus { outline:2px solid var(--accent); outline-offset:1px; }
  button { margin-top:14px; width:100%; height:40px; border:0; border-radius:8px; background:var(--accent); color:var(--accent-ink); font-weight:600; font-size:15px; cursor:pointer; }
  .err { color:var(--bad); font-size:13px; margin:10px 0 0; }
  .fine { color:var(--muted); font-size:12px; margin:16px 0 0; }
</style>
</head>
<body>
<main>
  <div class="brand">
    <svg width="30" height="30" viewBox="0 0 32 32" aria-hidden="true"><rect width="32" height="32" rx="7" fill="#1F3A68"/><path d="M9 10h14M9 16h10M9 22h6" stroke="#fff" stroke-width="2.6" stroke-linecap="round"/><circle cx="23" cy="22" r="3" fill="#F5B841"/></svg>
    <div><b>Order of Operations</b><span>Private · sign in</span></div>
  </div>
  <form method="post" action="/login">
    <input type="hidden" name="next" value="${esc(next)}">
    <label for="pw">Password</label>
    <input id="pw" name="password" type="password" autocomplete="current-password" autofocus required>
    ${error ? `<p class="err" role="alert">${esc(error)}</p>` : ""}
    <button type="submit">Sign in</button>
  </form>
  <p class="fine">Personal working notes. Not an official agency system.</p>
</main>
</body>
</html>`;
}
