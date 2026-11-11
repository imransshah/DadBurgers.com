import { useState } from "react";
import { useData } from "../App.jsx";
import { formatDate } from "../lib/dates.js";
import { useAppState } from "../lib/state.js";
import { PageHeader, Section, Seg, LENSES, TIERS } from "../components/ui.jsx";

function readTheme() {
  try {
    return localStorage.getItem("oo-theme") || "system";
  } catch {
    return "system";
  }
}

export default function About() {
  const data = useData();
  const { mode } = useAppState();
  const [theme, setTheme] = useState(readTheme);
  const p = data.profile;

  const applyTheme = (t) => {
    setTheme(t);
    try {
      if (t === "system") localStorage.removeItem("oo-theme");
      else localStorage.setItem("oo-theme", t);
    } catch {
      /* fine */
    }
    if (t === "system") delete document.documentElement.dataset.theme;
    else document.documentElement.dataset.theme = t;
  };

  return (
    <>
      <PageHeader eyebrow="About" title="How this works.">
        A private tracker that reads presidential documents and their implementing guidance from one chair: {p.role}, {p.component},{" "}
        {p.agency}.
      </PageHeader>

      <Section title="Appearance & session">
        <div className="flex flex-wrap items-center gap-3">
          <Seg
            label="Theme"
            value={theme}
            onChange={applyTheme}
            options={[
              { value: "system", label: "System" },
              { value: "light", label: "Light" },
              { value: "dark", label: "Dark" },
            ]}
          />
          {mode === "server" && (
            <form method="post" action="/logout">
              <button className="btn btn-sm">Sign out</button>
            </form>
          )}
          <span className="text-[13px] text-muted">State storage: {mode === "server" ? "Cloudflare KV (private)" : "this browser (local mode)"}</span>
        </div>
      </Section>

      <Section title="Your profile (drives every 'For DFC OIT' note)">
        <dl className="card grid gap-x-6 gap-y-2 px-4 py-3 text-[14px] sm:grid-cols-2">
          <KV k="Agency" v={`${p.agency} — civilian, FCEB, ${p.cfoActAgency ? "CFO Act" : "not a CFO Act agency"}`} />
          <KV k="Component / role" v={`${p.component} · ${p.role}`} />
          <KV k="Owns" v={p.owns.join(", ")} />
          <KV
            k="Supervises"
            v={`${p.supervises.directFeds} direct feds, ${p.supervises.secondLineFeds} second-line, ${p.supervises.contractorStaff} contractor staff (${p.supervises.contracts} contracts)`}
          />
          <KV k="Bargaining unit staff" v={p.bargainingUnit ? "Yes" : "No"} />
        </dl>
        <p className="mt-2 text-[12px] text-muted">
          Edit <span className="font-mono">public/data/profile.json</span> to change it. The nightly AI triage reads it too.
        </p>
      </Section>

      <Section title="Tiers and lenses">
        <div className="grid gap-4 sm:grid-cols-2">
          <ul className="flex flex-col gap-2 text-[14px]">
            {Object.entries(TIERS).map(([k, t]) => (
              <li key={k}>
                <span className="font-semibold">{t.label}</span> — {t.hint}
              </li>
            ))}
          </ul>
          <ul className="flex flex-col gap-2 text-[14px]">
            {Object.entries(LENSES).map(([k, l]) => (
              <li key={k}>
                <span className="font-semibold">{l.label}</span> — {l.hint}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section title="Where the data comes from">
        <ol className="flex max-w-3xl list-decimal flex-col gap-2 pl-5 text-[14px] text-pretty">
          <li>
            <strong>Nightly</strong>, a GitHub Action pulls every executive order and presidential memorandum signed since January 20,
            2025 from the Federal Register API and merges them into the catalog. Nothing already there gets deleted.
          </li>
          <li>
            Watchers check the OMB memoranda page, OPM's CHCO memos and CISA's directives page for new items and put them in the{" "}
            <a className="link" href="#/review">Review</a> inbox.
          </li>
          <li>
            New documents get drafted analysis: rules first (tariffs and trade auto-marked "none"), then Claude for the rest if an
            Anthropic API key is set as a repository secret. Every draft stays <em>unreviewed</em> until you mark it.
          </li>
          <li>
            Your statuses, notes, review marks and internal guidance live in Cloudflare KV behind the password, not in the
            repository.
          </li>
          <li>Monday mornings, a digest email lists overdue items, the next 30 days, and anything new.</li>
        </ol>
        <p className="mt-3 text-[13px] text-muted">
          Last sync: {data.meta.lastSync ? formatDate(data.meta.lastSync.slice(0, 10)) : "not yet"} · Seeded{" "}
          {formatDate(data.meta.seededAt)} · {data.items.size} documents and guidance items.
        </p>
      </Section>

      <Section title="Ground rules">
        <ul className="flex max-w-3xl list-disc flex-col gap-1.5 pl-5 text-[14px] text-pretty">
          <li>A summary isn't the law. Every action links to its source. Act on the source.</li>
          <li>"Verify" means the fact came from secondary reporting or couldn't be checked against the primary text.</li>
          <li>Neutral voice. This is a runbook, not an op-ed.</li>
          <li>No CUI, PII or non-public agency text, anywhere on this site.</li>
        </ul>
      </Section>

      <p className="text-[12px] text-muted">Keyboard: “/” focuses search.</p>
    </>
  );
}

function KV({ k, v }) {
  return (
    <div>
      <dt className="text-[12px] text-muted">{k}</dt>
      <dd className="text-pretty">{v}</dd>
    </div>
  );
}
