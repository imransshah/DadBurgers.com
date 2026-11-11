/**
 * ORDER OF OPERATIONS — edge worker
 *
 * Every request passes through here before any static asset is served
 * (assets.run_worker_first = true in wrangler.json), so nothing on the site,
 * the data JSON included, is reachable without the password.
 *
 *   /login, /logout        password gate (worker/auth.js)
 *   /api/*                 personal state in Workers KV
 *   everything else        static build (dist/) via the ASSETS binding
 *   scheduled()            Monday digest email (worker/digest.js)
 *
 * Secrets (set by the deploy workflow from GitHub secrets, or by hand with
 * `npx wrangler secret put NAME`):
 *   SITE_PASSWORD   required — the site is locked without it
 *   DIGEST_TO       optional — your verified Email Routing destination address
 */

import { checkPassword, clearCookie, hasSession, issueCookie, loginPage } from "./auth.js";
import { buildDigest, sendDigest } from "./digest.js";

const PUBLIC_PATHS = new Set(["/favicon.svg", "/robots.txt"]);
const MAX_BODY = 64 * 1024;
const ID_RE = /^[A-Za-z0-9:._-]{1,200}$/;
const ACTION_STATUSES = new Set(["open", "in-progress", "done", "na"]);
const EMPTY_STATE = { actions: {}, reviews: {}, notes: {}, visits: { last: null, prev: null } };

const APP_CSP = [
  "default-src 'self'",
  "script-src 'self'",
  "style-src 'self' 'unsafe-inline'",
  "font-src 'self'",
  "img-src 'self' data:",
  "connect-src 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "base-uri 'none'",
  "object-src 'none'",
].join("; ");
const LOGIN_CSP = "default-src 'none'; style-src 'unsafe-inline'; img-src 'self'; form-action 'self'; frame-ancestors 'none'; base-uri 'none'";

function secure(res, { csp = APP_CSP, cache } = {}) {
  const h = new Headers(res.headers);
  h.set("Content-Security-Policy", csp);
  h.set("X-Content-Type-Options", "nosniff");
  h.set("X-Frame-Options", "DENY");
  h.set("Referrer-Policy", "same-origin"); // no-referrer would make browsers send Origin: null on our own form posts
  h.set("X-Robots-Tag", "noindex, nofollow");
  h.set("Permissions-Policy", "camera=(), microphone=(), geolocation=(), interest-cohort=()");
  h.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
  if (cache) h.set("Cache-Control", cache);
  return new Response(res.body, { status: res.status, statusText: res.statusText, headers: h });
}

const json = (data, status = 200) =>
  secure(new Response(JSON.stringify(data), { status, headers: { "Content-Type": "application/json" } }), { cache: "no-store" });

const html = (body, status = 200, extra = {}) =>
  secure(new Response(body, { status, headers: { "Content-Type": "text/html; charset=utf-8", ...extra } }), {
    csp: LOGIN_CSP,
    cache: "no-store",
  });

function safeNext(next) {
  return typeof next === "string" && next.startsWith("/") && !next.startsWith("//") ? next : "/";
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;

    if (!env.SITE_PASSWORD) {
      return html(
        "<!doctype html><title>Locked</title><p style='font:15px system-ui;padding:40px'>This site is locked: the SITE_PASSWORD secret isn't set on the worker.</p>",
        503,
      );
    }

    if (PUBLIC_PATHS.has(path)) return secure(await env.ASSETS.fetch(request));

    if (path === "/login") {
      if (request.method === "POST") return login(request, env, url);
      if (await hasSession(request, env)) return Response.redirect(`${url.origin}/`, 303);
      return html(loginPage({ next: safeNext(url.searchParams.get("next")) }));
    }

    if (path === "/logout" && request.method === "POST") {
      if (!sameOrigin(request, url)) return json({ error: "bad origin" }, 403);
      return new Response(null, { status: 303, headers: { Location: "/login", "Set-Cookie": clearCookie() } });
    }

    if (!(await hasSession(request, env))) {
      if (path.startsWith("/api/")) return json({ error: "unauthorized" }, 401);
      const next = path === "/" ? "/" : path;
      return new Response(null, { status: 302, headers: { Location: `/login?next=${encodeURIComponent(next)}`, "Cache-Control": "no-store" } });
    }

    if (path.startsWith("/api/")) {
      try {
        return await api(request, env, url, ctx);
      } catch (e) {
        if (e instanceof HttpError) return json({ error: e.message }, e.status);
        console.error(e);
        return json({ error: "internal error" }, 500);
      }
    }

    const res = await env.ASSETS.fetch(request);
    const immutable = path.startsWith("/assets/");
    return secure(res, { cache: immutable ? "private, max-age=31536000, immutable" : "private, no-cache" });
  },

  async scheduled(event, env, ctx) {
    ctx.waitUntil(
      sendDigest(env).then(
        (r) => console.log("digest", JSON.stringify(r)),
        (e) => console.error("digest failed", e),
      ),
    );
  },
};

/* ── Login ─────────────────────────────────────────────────────────────── */

async function login(request, env, url) {
  if (!sameOrigin(request, url)) return html(loginPage({ error: "Sign-in must come from this site." }), 403);
  const ip = request.headers.get("CF-Connecting-IP") ?? "local";
  if (env.LOGIN_LIMITER) {
    const { success } = await env.LOGIN_LIMITER.limit({ key: `login:${ip}` });
    if (!success) return html(loginPage({ error: "Too many attempts. Wait a minute and try again." }), 429);
  }
  const form = await request.formData();
  const next = safeNext(form.get("next"));
  if (!(await checkPassword(env, form.get("password")))) {
    await new Promise((r) => setTimeout(r, 400));
    return html(loginPage({ error: "That's not it.", next }), 401);
  }
  return new Response(null, { status: 303, headers: { Location: next, "Set-Cookie": await issueCookie(env), "Cache-Control": "no-store" } });
}

function sameOrigin(request, url) {
  const origin = request.headers.get("Origin");
  if (origin) return origin === url.origin;
  const ref = request.headers.get("Referer");
  return !ref || ref.startsWith(`${url.origin}/`);
}

/* ── API ───────────────────────────────────────────────────────────────── */

class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

async function readBody(request) {
  const len = Number(request.headers.get("Content-Length") ?? 0);
  if (len > MAX_BODY) throw new HttpError(413, "too large");
  const text = await request.text();
  if (text.length > MAX_BODY) throw new HttpError(413, "too large");
  try {
    return text ? JSON.parse(text) : {};
  } catch {
    throw new HttpError(400, "invalid json");
  }
}

async function getState(env) {
  return { ...EMPTY_STATE, ...((await env.STATE.get("state", "json")) ?? {}) };
}

async function getInternal(env) {
  return (await env.STATE.get("internal", "json")) ?? { items: [] };
}

const str = (v, max) => (typeof v === "string" ? v.slice(0, max) : "");

function cleanInternal(e) {
  if (!e || typeof e !== "object") throw new HttpError(400, "bad entry");
  const id = str(e.id, 100);
  if (!ID_RE.test(id)) throw new HttpError(400, "bad id");
  const title = str(e.title, 300).trim();
  if (!title) throw new HttpError(400, "title required");
  const url = str(e.url, 1000);
  if (url && !/^https?:\/\//i.test(url)) throw new HttpError(400, "link must be http(s)");
  const date = /^\d{4}-\d{2}-\d{2}$/.test(e.date ?? "") ? e.date : "";
  return {
    id,
    title,
    issuer: str(e.issuer, 200),
    reference: str(e.reference, 100),
    date,
    url,
    summary: str(e.summary, 2000),
    links: (Array.isArray(e.links) ? e.links : []).filter((x) => typeof x === "string" && ID_RE.test(x)).slice(0, 50),
    actions: (Array.isArray(e.actions) ? e.actions : []).slice(0, 30).map((a, i) => ({
      key: ID_RE.test(a?.key ?? "") ? a.key : String(i),
      tier: ["must", "feed", "know"].includes(a?.tier) ? a.tier : "must",
      lens: ["ops", "manager", "employee"].includes(a?.lens) ? a.lens : "ops",
      text: str(a?.text, 600).trim(),
      due: /^\d{4}-\d{2}-\d{2}$/.test(a?.due ?? "") ? a.due : "",
    })).filter((a) => a.text),
    updated: new Date().toISOString(),
  };
}

async function api(request, env, url, ctx) {
  const parts = url.pathname.replace(/^\/api\//, "").split("/").map(decodeURIComponent);
  const m = request.method;
  if (m !== "GET" && !sameOrigin(request, url)) throw new HttpError(403, "bad origin");

  // GET /api/state
  if (parts[0] === "state" && parts.length === 1 && m === "GET") return json(await getState(env));

  // PUT /api/state/{actions|reviews|notes}/:id
  if (parts[0] === "state" && parts.length === 3 && m === "PUT") {
    const [, kind, id] = parts;
    if (!ID_RE.test(id)) throw new HttpError(400, "bad id");
    const body = await readBody(request);
    const state = await getState(env);
    const now = new Date().toISOString();
    if (kind === "actions") {
      const cur = state.actions[id] ?? {};
      if (body.status !== undefined) {
        if (!ACTION_STATUSES.has(body.status)) throw new HttpError(400, "bad status");
        cur.status = body.status;
      }
      if (body.note !== undefined) cur.note = str(body.note, 4000);
      state.actions[id] = { ...cur, updated: now };
    } else if (kind === "reviews") {
      if (body.reviewed) state.reviews[id] = { at: now };
      else delete state.reviews[id];
    } else if (kind === "notes") {
      const text = str(body.text, 20000);
      if (text) state.notes[id] = { text, updated: now };
      else delete state.notes[id];
    } else {
      throw new HttpError(404, "not found");
    }
    await env.STATE.put("state", JSON.stringify(state));
    return new Response(null, { status: 204 });
  }

  // POST /api/visit — "since your last visit" baseline. A visit within 30
  // minutes of the previous one counts as the same visit.
  if (parts[0] === "visit" && m === "POST") {
    const state = await getState(env);
    const now = new Date();
    const last = state.visits?.last ? new Date(state.visits.last) : null;
    if (!last || now - last > 30 * 60 * 1000) state.visits = { prev: state.visits?.last ?? null, last: now.toISOString() };
    else state.visits = { ...state.visits, last: now.toISOString() };
    await env.STATE.put("state", JSON.stringify(state));
    return json(state.visits);
  }

  // /api/internal
  if (parts[0] === "internal") {
    if (parts.length === 1 && m === "GET") return json(await getInternal(env));
    if (parts.length === 1 && m === "POST") {
      const entry = cleanInternal(await readBody(request));
      const store = await getInternal(env);
      store.items = [entry, ...store.items.filter((x) => x.id !== entry.id)].slice(0, 500);
      await env.STATE.put("internal", JSON.stringify(store));
      return json(entry);
    }
    if (parts.length === 2 && m === "DELETE") {
      const store = await getInternal(env);
      store.items = store.items.filter((x) => x.id !== parts[1]);
      await env.STATE.put("internal", JSON.stringify(store));
      return new Response(null, { status: 204 });
    }
  }

  // GET /api/digest/preview  ·  POST /api/digest/send
  if (parts[0] === "digest") {
    if (parts[1] === "preview" && m === "GET") {
      const d = await buildDigest(env, url.origin);
      return secure(new Response(d.html, { headers: { "Content-Type": "text/html; charset=utf-8" } }), {
        csp: "default-src 'none'; style-src 'unsafe-inline'; frame-ancestors 'none'",
        cache: "no-store",
      });
    }
    if (parts[1] === "send" && m === "POST") return json(await sendDigest(env, url.origin));
  }

  throw new HttpError(404, "not found");
}
