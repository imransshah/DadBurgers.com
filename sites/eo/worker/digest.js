// Monday digest: overdue, next 30 days, new this week, drafts waiting.
// Sent through Cloudflare Email Routing's send_email binding, which can only
// deliver to addresses you've verified as destinations. That's fine for a
// one-reader site, and it means the worker can't be turned into a spam relay.

import { EmailMessage } from "cloudflare:email";
import { allActions, buildIndex } from "../src/lib/data.js";
import { addDays, daysUntil, formatDate, todayISO } from "../src/lib/dates.js";

const FILES = ["catalog", "analysis", "guidance", "inbox", "meta", "profile"];

async function loadIndex(env) {
  const entries = await Promise.all(
    FILES.map(async (name) => {
      const res = await env.ASSETS.fetch(new Request(`https://assets.internal/data/${name}.json`));
      return [name, await res.json()];
    }),
  );
  return buildIndex(Object.fromEntries(entries));
}

const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);

export async function buildDigest(env, origin = env.SITE_URL ?? "") {
  const data = await loadIndex(env);
  const state = (await env.STATE.get("state", "json")) ?? { actions: {}, reviews: {} };
  const internal = ((await env.STATE.get("internal", "json")) ?? { items: [] }).items;
  const today = todayISO();
  const weekAgo = addDays(today, -7);

  const open = allActions(data, internal).filter(
    (a) => a.tier !== "know" && !["done", "na"].includes(state.actions?.[a.id]?.status),
  );
  const overdue = open.filter((a) => a.due && daysUntil(a.due) < 0).sort((a, b) => a.due.localeCompare(b.due));
  const soon = open
    .filter((a) => a.due && daysUntil(a.due) >= 0 && daysUntil(a.due) <= 30)
    .sort((a, b) => a.due.localeCompare(b.due));
  const fresh = [...data.items.values()].filter((i) => i.firstSeen && i.firstSeen >= weekAgo);
  const inbox = data.inbox.filter((x) => (x.foundAt ?? "") >= weekAgo);
  const drafts = [...data.items.values()].filter(
    (i) => (i.relevance === "high" || i.relevance === "medium") && !i.reviewed && !state.reviews?.[i.id],
  ).length;

  const link = (a) =>
    a.source.group === "internal" ? `${origin}/#/internal` : `${origin}/#/item/${encodeURIComponent(a.source.id)}`;
  const tier = (t) => (t === "must" ? "MUST" : "FEED");

  const subject = `Order of Operations — ${overdue.length} overdue, ${soon.length} due in 30 days (week of ${formatDate(today)})`;

  const textLines = [
    subject,
    "",
    `OVERDUE (${overdue.length})`,
    ...overdue.map((a) => `  [${tier(a.tier)}] ${formatDate(a.due)} · ${a.source.label}: ${a.text}`),
    "",
    `DUE IN THE NEXT 30 DAYS (${soon.length})`,
    ...soon.map((a) => `  [${tier(a.tier)}] ${formatDate(a.due)} · ${a.source.label}: ${a.text}`),
    "",
    `NEW THIS WEEK (${fresh.length + inbox.length})`,
    ...fresh.map((i) => `  ${i.label}: ${i.title} (${i.relevance})`),
    ...inbox.map((x) => `  ${x.source}: ${x.title}`),
    "",
    `Drafts awaiting your review: ${drafts}`,
    "",
    `${origin}/`,
  ];

  const row = (a) => `
    <tr>
      <td style="padding:6px 8px 6px 0;white-space:nowrap;vertical-align:top;font:12px Menlo,monospace;color:${a.tier === "must" ? "#b42318" : "#a8530a"}">${tier(a.tier)}</td>
      <td style="padding:6px 8px 6px 0;white-space:nowrap;vertical-align:top;font:12px Menlo,monospace">${esc(formatDate(a.due))}</td>
      <td style="padding:6px 0;vertical-align:top"><a href="${esc(link(a))}" style="color:#1f3a68;font-weight:600">${esc(a.source.label)}</a> ${esc(a.text)}</td>
    </tr>`;
  const section = (title, body) =>
    `<h2 style="font:600 14px system-ui,sans-serif;margin:22px 0 6px;border-bottom:1px solid #dfe3ea;padding-bottom:4px">${esc(title)}</h2>${body}`;
  const table = (list) =>
    list.length
      ? `<table style="border-collapse:collapse;width:100%;font:14px/1.45 system-ui,sans-serif">${list.map(row).join("")}</table>`
      : `<p style="color:#5a6475;font:14px system-ui,sans-serif;margin:4px 0">Nothing.</p>`;

  const html = `<!doctype html><html><body style="margin:0;background:#f5f6f8;padding:24px">
  <div style="max-width:640px;margin:0 auto;background:#fff;border:1px solid #dfe3ea;border-radius:10px;padding:24px;color:#141922">
    <div style="font:11px Menlo,monospace;letter-spacing:.06em;text-transform:uppercase;color:#5a6475">Order of Operations · weekly</div>
    <h1 style="font:600 20px system-ui,sans-serif;margin:6px 0 0">${overdue.length} overdue · ${soon.length} due in 30 days</h1>
    ${section(`Overdue (${overdue.length})`, table(overdue))}
    ${section(`Due in the next 30 days (${soon.length})`, table(soon))}
    ${section(
      `New this week (${fresh.length + inbox.length})`,
      fresh.length + inbox.length
        ? `<ul style="font:14px/1.5 system-ui,sans-serif;padding-left:18px;margin:4px 0">${fresh
            .map((i) => `<li><a href="${esc(`${origin}/#/item/${encodeURIComponent(i.id)}`)}" style="color:#1f3a68;font-weight:600">${esc(i.label)}</a> ${esc(i.title)} <span style="color:#5a6475">(${esc(i.relevance)})</span></li>`)
            .join("")}${inbox.map((x) => `<li>${esc(x.source)}: <a href="${esc(x.url)}" style="color:#1f3a68">${esc(x.title)}</a></li>`).join("")}</ul>`
        : `<p style="color:#5a6475;font:14px system-ui,sans-serif;margin:4px 0">Nothing new.</p>`,
    )}
    <p style="font:14px system-ui,sans-serif;margin:22px 0 0">${drafts} draft${drafts === 1 ? "" : "s"} awaiting your review. <a href="${esc(origin)}/" style="color:#1f3a68">Open the site →</a></p>
  </div></body></html>`;

  return { subject, text: textLines.join("\n"), html, counts: { overdue: overdue.length, soon: soon.length, fresh: fresh.length + inbox.length, drafts } };
}

function b64(str) {
  const bytes = new TextEncoder().encode(str);
  let bin = "";
  for (let i = 0; i < bytes.length; i += 0x8000) bin += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  return btoa(bin).replace(/.{1,76}/g, "$&\r\n");
}

function mime({ from, to, subject, text, html }) {
  const boundary = `oo-${crypto.randomUUID()}`;
  const domain = from.split("@")[1];
  return [
    `From: Order of Operations <${from}>`,
    `To: <${to}>`,
    `Subject: =?UTF-8?B?${btoa(String.fromCharCode(...new TextEncoder().encode(subject)))}?=`,
    `Date: ${new Date().toUTCString().replace("GMT", "+0000")}`,
    `Message-ID: <${crypto.randomUUID()}@${domain}>`,
    "MIME-Version: 1.0",
    `Content-Type: multipart/alternative; boundary="${boundary}"`,
    "",
    `--${boundary}`,
    "Content-Type: text/plain; charset=UTF-8",
    "Content-Transfer-Encoding: base64",
    "",
    b64(text),
    `--${boundary}`,
    "Content-Type: text/html; charset=UTF-8",
    "Content-Transfer-Encoding: base64",
    "",
    b64(html),
    `--${boundary}--`,
    "",
  ].join("\r\n");
}

export async function sendDigest(env, origin) {
  if (!env.DIGEST_EMAIL) return { sent: false, reason: "send_email binding not configured (set EO_DIGEST_ENABLED)" };
  if (!env.DIGEST_TO) return { sent: false, reason: "DIGEST_TO secret not set" };
  const from = env.DIGEST_FROM ?? "digest@therealdadburgers.com";
  const d = await buildDigest(env, origin ?? env.SITE_URL);
  await env.DIGEST_EMAIL.send(new EmailMessage(from, env.DIGEST_TO, mime({ from, to: env.DIGEST_TO, ...d })));
  const result = { sent: true, at: new Date().toISOString(), counts: d.counts };
  await env.STATE.put("digest:last", JSON.stringify(result));
  return result;
}
