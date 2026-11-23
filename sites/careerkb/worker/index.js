/**
 * CAREER KB — edge worker
 *
 * Every request passes through here before any static asset is served
 * (assets.run_worker_first = true in wrangler.json), so nothing on the site,
 * the content JSON included, is reachable without the password.
 *
 *   /login, /logout   password gate (worker/auth.js, shared design with sites/eo)
 *   everything else   static build (dist/) via the ASSETS binding
 *
 * Secret: SITE_PASSWORD (set by the deploy workflow from the GitHub secret
 * CAREERKB_SITE_PASSWORD, or by hand: `npx wrangler secret put SITE_PASSWORD`).
 * Without it the worker answers 503: it fails closed, never open.
 */

import { checkPassword, clearCookie, hasSession, issueCookie, loginPage } from "./auth.js";

const PUBLIC_PATHS = new Set(["/favicon.svg", "/robots.txt"]);

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
  h.set("Referrer-Policy", "same-origin");
  h.set("X-Robots-Tag", "noindex, nofollow");
  h.set("Permissions-Policy", "camera=(), microphone=(), geolocation=(), interest-cohort=()");
  h.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
  if (cache) h.set("Cache-Control", cache);
  return new Response(res.body, { status: res.status, statusText: res.statusText, headers: h });
}

const html = (body, status = 200) =>
  secure(new Response(body, { status, headers: { "Content-Type": "text/html; charset=utf-8" } }), { csp: LOGIN_CSP, cache: "no-store" });

const safeNext = (next) => (typeof next === "string" && next.startsWith("/") && !next.startsWith("//") ? next : "/");

function sameOrigin(request, url) {
  const origin = request.headers.get("Origin");
  if (origin) return origin === url.origin;
  const ref = request.headers.get("Referer");
  return !ref || ref.startsWith(`${url.origin}/`);
}

export default {
  async fetch(request, env) {
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
      if (!sameOrigin(request, url)) return html("Bad origin", 403);
      return new Response(null, { status: 303, headers: { Location: "/login", "Set-Cookie": clearCookie() } });
    }

    if (!(await hasSession(request, env))) {
      if (path.startsWith("/data/")) return secure(new Response('{"error":"unauthorized"}', { status: 401, headers: { "Content-Type": "application/json" } }), { cache: "no-store" });
      return new Response(null, { status: 302, headers: { Location: `/login?next=${encodeURIComponent(path)}`, "Cache-Control": "no-store" } });
    }

    const res = await env.ASSETS.fetch(request);
    const immutable = path.startsWith("/assets/");
    return secure(res, { cache: immutable ? "private, max-age=31536000, immutable" : "private, no-cache" });
  },
};

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
