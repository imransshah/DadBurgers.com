import { useData } from "../Mandates.jsx";
import { formatDate } from "../lib/dates.js";
import { useAppState } from "../lib/state.js";
import { kbHref } from "../lib/route.js";
import { PageHeader, Section, LENSES, TIERS } from "../components/ui.jsx";

export default function About() {
  const data = useData();
  const { mode } = useAppState();
  const p = data.profile;

  return (
    <>
      <PageHeader eyebrow="About" title="How the Mandates section works.">
        Presidential documents and their implementing guidance, read from one chair: {p.role}, {p.component}, {p.agency}.
        Everything here is also in the Career KB <a className="oo-link" href={kbHref("search", { type: "reference" })}>search index</a>,
        so a search for a concept surfaces the federal requirements that touch it.
      </PageHeader>

      <Section title="Your profile (drives every 'For your IT office' note and every federal-framed answer)">
        <dl className="oo-card grid gap-x-6 gap-y-2 px-4 py-3 text-[14px] sm:grid-cols-2">
          <KV k="Agency" v={`${p.agency} — civilian, FCEB, ${p.cfoActAgency ? "CFO Act" : "not a CFO Act agency"}`} />
          <KV k="Component / role" v={`${p.component} · ${p.role}`} />
          <KV k="Owns" v={p.owns.join(", ")} />
          <KV
            k="Supervises"
            v={`${p.supervises.directFeds} direct feds, ${p.supervises.secondLineFeds} second-line, ${p.supervises.contractorStaff} contractor staff (${p.supervises.contracts} contracts)`}
          />
          <KV k="Bargaining unit staff" v={p.bargainingUnit ? "Yes" : "No"} />
          <KV k="Your statuses and notes" v={mode === "server" ? "Cloudflare KV (private, behind the password)" : "This browser only (local mode)"} />
        </dl>
        <p className="mt-2 text-[12px] text-muted">
          Edit <span className="font-mono">sites/careerkb/mandates/data/profile.json</span> to change it. The nightly AI triage and
          the Ask feature both read it.
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
            2025 from the Federal Register API and merges them into the catalog. Nothing already there is deleted.
          </li>
          <li>
            Watchers check the OMB memoranda page, OPM's CHCO memos, CISA's directives and FedRAMP's notices for new items and put
            them in the <a className="oo-link" href="#/mandates/review">Review</a> inbox.
          </li>
          <li>
            New documents get draft analysis: title rules first (tariffs and trade auto-marked "none"), then Claude for the rest when
            an Anthropic API key is set. Every draft stays <em>unreviewed</em> until you mark it.
          </li>
          <li>The same run rebuilds the Career KB search index, so new mandates are searchable the next morning.</li>
          <li>Your statuses, notes, review marks and internal guidance live in Cloudflare KV, not in the repository.</li>
          <li>Monday mornings, an optional digest email lists overdue items, the next 30 days, and anything new.</li>
        </ol>
        <p className="mt-3 text-[13px] text-muted">
          Last sync: {data.meta.lastSync ? formatDate(data.meta.lastSync.slice(0, 10)) : "not yet"} · {data.items.size} documents and
          guidance items.
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
