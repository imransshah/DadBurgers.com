// Dates are ISO yyyy-mm-dd strings in the data. All comparisons are done on
// local calendar days so "due today" means today where the reader is.

const MS_DAY = 86_400_000;

export function todayISO() {
  const d = new Date();
  return toISO(d);
}

export function toISO(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function parseISO(s) {
  if (!s) return null;
  const [y, m, d] = s.split("-").map(Number);
  return new Date(y, (m || 1) - 1, d || 1);
}

export function daysUntil(iso, from = todayISO()) {
  if (!iso) return null;
  return Math.round((parseISO(iso) - parseISO(from)) / MS_DAY);
}

const fmt = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" });
const fmtMonth = new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" });

export function formatDate(iso) {
  if (!iso) return "";
  if (/^\d{4}-\d{2}$/.test(iso)) return fmtMonth.format(parseISO(`${iso}-01`));
  return fmt.format(parseISO(iso));
}

export function formatMonth(iso) {
  return fmtMonth.format(parseISO(iso));
}

export function relative(iso) {
  const n = daysUntil(iso);
  if (n === null) return "";
  if (n === 0) return "today";
  if (n === 1) return "tomorrow";
  if (n === -1) return "yesterday";
  if (n < 0) return `${-n} days ago`;
  if (n < 60) return `in ${n} days`;
  const months = Math.round(n / 30.4);
  if (months < 24) return `in ${months} months`;
  return `in ${Math.round(n / 365)} years`;
}

export function addDays(iso, n) {
  const d = parseISO(iso);
  d.setDate(d.getDate() + n);
  return toISO(d);
}
