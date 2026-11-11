// Builds an RFC 5545 calendar of dated actions for Outlook. All-day events on
// the due date with a reminder a week before. UIDs are stable per action, so
// re-importing updates events instead of duplicating them.

const TIER = { must: "MUST", feed: "FEED", know: "KNOW" };

function esc(s = "") {
  return String(s).replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\r?\n/g, "\\n");
}

// Lines over 75 octets must be folded (RFC 5545 §3.1).
function fold(line) {
  const out = [];
  let rest = line;
  while (new TextEncoder().encode(rest).length > 74) {
    let cut = 74;
    while (new TextEncoder().encode(rest.slice(0, cut)).length > 74) cut--;
    out.push(rest.slice(0, cut));
    rest = " " + rest.slice(cut);
  }
  out.push(rest);
  return out.join("\r\n");
}

const ymd = (iso) => iso.replaceAll("-", "");
function nextDay(iso) {
  const d = new Date(`${iso}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + 1);
  return d.toISOString().slice(0, 10);
}

export function buildICS(actions, siteUrl = window.location.origin) {
  const stamp = new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d+Z$/, "Z");
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//therealdadburgers//Order of Operations//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "X-WR-CALNAME:Order of Operations — deadlines",
  ];
  for (const a of actions) {
    if (!a.due) continue;
    const link = a.source.group === "internal" ? `${siteUrl}/#/internal` : `${siteUrl}/#/item/${encodeURIComponent(a.source.id)}`;
    const desc = [
      a.text,
      "",
      `Source: ${a.source.label} — ${a.source.title}`,
      a.cite ? `Cite: ${a.cite}` : null,
      a.dueNote ? `Note: ${a.dueNote}` : null,
      a.verify ? "Flagged: verify against the primary source." : null,
      "",
      link,
    ]
      .filter((x) => x !== null)
      .join("\n");
    lines.push(
      "BEGIN:VEVENT",
      `UID:${esc(a.id)}@eo.therealdadburgers.com`,
      `DTSTAMP:${stamp}`,
      `DTSTART;VALUE=DATE:${ymd(a.due)}`,
      `DTEND;VALUE=DATE:${ymd(nextDay(a.due))}`,
      `SUMMARY:${esc(`[${TIER[a.tier] ?? a.tier}] ${a.source.label}: ${a.text}`.slice(0, 180))}`,
      `DESCRIPTION:${esc(desc)}`,
      `URL:${link}`,
      "TRANSP:TRANSPARENT",
      "BEGIN:VALARM",
      "ACTION:DISPLAY",
      `DESCRIPTION:${esc(`${a.source.label} due in 7 days`)}`,
      "TRIGGER:-P7D",
      "END:VALARM",
      "END:VEVENT",
    );
  }
  lines.push("END:VCALENDAR");
  return lines.map(fold).join("\r\n") + "\r\n";
}

export function downloadICS(actions, filename = "order-of-operations-deadlines.ics") {
  const blob = new Blob([buildICS(actions)], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
