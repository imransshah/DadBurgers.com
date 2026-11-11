import { formatDate, relative, daysUntil } from "../lib/dates.js";
import { href } from "../lib/route.js";

export const TIERS = {
  must: { label: "Must do", short: "Must", cls: "bg-must-soft text-must border-must/30", hint: "You own the deliverable." },
  feed: { label: "Feed", short: "Feed", cls: "bg-feed-soft text-feed border-feed/30", hint: "Someone else owns it; they'll need your input." },
  know: { label: "Know", short: "Know", cls: "bg-know-soft text-know border-know/30", hint: "Awareness. Nothing owed." },
};

export const LENSES = {
  ops: { label: "IT Ops", hint: "You as owner of systems, network, cloud, security ops and contracts" },
  manager: { label: "Manager", hint: "You as supervisor of feds and COR over contractor staff" },
  employee: { label: "Employee", hint: "You personally, as a federal employee" },
};

export const RELEVANCE = {
  high: { label: "High", cls: "bg-accent text-accent-ink" },
  medium: { label: "Medium", cls: "bg-accent-soft text-accent border-accent/30" },
  low: { label: "Low", cls: "bg-surface-2 text-muted border-line" },
  none: { label: "None", cls: "text-faint border-line border-dashed" },
  untriaged: { label: "Untriaged", cls: "bg-gold-soft text-gold border-gold/40" },
};

export const STATUS = {
  "in-effect": { label: "In effect", cls: "text-ok" },
  amended: { label: "Amended", cls: "text-feed" },
  revoked: { label: "Revoked", cls: "text-must" },
  rescinded: { label: "Rescinded", cls: "text-must" },
  superseded: { label: "Superseded", cls: "text-must" },
  enjoined: { label: "Enjoined", cls: "text-must" },
  "partially-enjoined": { label: "Partly enjoined", cls: "text-feed" },
  expired: { label: "Expired", cls: "text-faint" },
  unknown: { label: "Status unknown", cls: "text-faint" },
};

export function TierChip({ tier, compact }) {
  const t = TIERS[tier] ?? TIERS.know;
  return (
    <span className={`chip ${t.cls}`} title={t.hint}>
      {compact ? t.short : t.label}
    </span>
  );
}

export function LensChip({ lens }) {
  const l = LENSES[lens];
  if (!l) return null;
  return (
    <span className="chip border-line text-muted" title={l.hint}>
      {l.label}
    </span>
  );
}

export function RelevanceChip({ relevance }) {
  const r = RELEVANCE[relevance] ?? RELEVANCE.untriaged;
  return <span className={`chip ${r.cls}`}>{r.label}</span>;
}

export function StatusText({ status }) {
  const s = STATUS[status] ?? STATUS.unknown;
  return (
    <span className={`inline-flex items-center gap-1.5 text-[13px] font-medium ${s.cls}`}>
      <span className="inline-block h-1.5 w-1.5 rounded-full bg-current" aria-hidden />
      {s.label}
    </span>
  );
}

export function VerifyFlag({ title = "Not yet checked against the primary source. Verify before relying on it." }) {
  return (
    <span className="chip bg-gold-soft text-gold border-gold/40" title={title}>
      <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden>
        <path d="M2 1v8M2 1.5h5.5L6.3 3.5l1.2 2H2" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
      </svg>
      Verify
    </span>
  );
}

export function DraftBadge({ item, reviewed }) {
  if (reviewed) return <span className="chip bg-ok-soft text-ok border-ok/30">Reviewed</span>;
  const label = item.author === "ai-triage" ? "AI draft" : item.author === "rule" ? "Auto-triaged" : "Draft";
  return (
    <span className="chip bg-surface-2 text-muted border-line" title="Analysis written by Claude; not yet reviewed by you.">
      {label} · unreviewed
    </span>
  );
}

export function DueText({ due, done }) {
  if (!due) return null;
  const n = daysUntil(due);
  const cls = done ? "text-faint" : n < 0 ? "text-must font-semibold" : n <= 30 ? "text-feed font-semibold" : "text-muted";
  return (
    <span className={`font-mono text-[12px] ${cls}`} title={formatDate(due)}>
      {formatDate(due)} · {relative(due)}
    </span>
  );
}

export function ItemLink({ item, id, className = "" }) {
  if (!item) return <span className={`font-mono text-[12px] text-faint ${className}`}>{id}</span>;
  return (
    <a href={href(`item/${encodeURIComponent(item.id)}`)} className={`link ${className}`}>
      {item.label}
    </a>
  );
}

export function PageHeader({ eyebrow, title, children, actions }) {
  return (
    <header className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div className="min-w-0">
        {eyebrow && <div className="label mb-1">{eyebrow}</div>}
        <h1 className="text-[26px] font-semibold leading-tight tracking-tight text-balance">{title}</h1>
        {children && <div className="mt-1.5 max-w-3xl text-muted text-pretty">{children}</div>}
      </div>
      {actions && <div className="flex shrink-0 flex-wrap gap-2">{actions}</div>}
    </header>
  );
}

export function Section({ title, children, right, id }) {
  return (
    <section className="mb-8" id={id}>
      <div className="mb-3 flex items-baseline justify-between gap-3 border-b border-line pb-2">
        <h2 className="text-[15px] font-semibold">{title}</h2>
        {right}
      </div>
      {children}
    </section>
  );
}

export function Empty({ children }) {
  return <div className="rounded-lg border border-dashed border-line px-4 py-6 text-center text-muted">{children}</div>;
}

export function Seg({ value, onChange, options, label }) {
  return (
    <div className="seg" role="group" aria-label={label}>
      {options.map((o) => (
        <button key={o.value} type="button" aria-pressed={value === o.value} onClick={() => onChange(o.value)} title={o.hint}>
          {o.label}
          {o.count != null && <span className="ml-1 font-mono text-[11px] text-faint">{o.count}</span>}
        </button>
      ))}
    </div>
  );
}

export function Stat({ label, value, tone, onClick, hint }) {
  const tones = {
    must: "text-must",
    feed: "text-feed",
    gold: "text-gold",
    ink: "text-ink",
  };
  const Tag = onClick ? "button" : "div";
  return (
    <Tag
      onClick={onClick}
      title={hint}
      className={`card flex flex-col items-start gap-0.5 px-4 py-3 text-left ${onClick ? "cursor-pointer hover:border-accent/50" : ""}`}
    >
      <span className="label">{label}</span>
      <span className={`font-mono text-[28px] font-medium leading-none tabular-nums ${tones[tone] ?? "text-ink"}`}>{value}</span>
    </Tag>
  );
}
