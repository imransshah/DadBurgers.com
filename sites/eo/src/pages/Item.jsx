import { useState } from "react";
import { useData, useLens } from "../App.jsx";
import { formatDate } from "../lib/dates.js";
import { href } from "../lib/route.js";
import { useAppState, isReviewed } from "../lib/state.js";
import ActionRow from "../components/ActionRow.jsx";
import { DraftBadge, Empty, ItemLink, RelevanceChip, Section, StatusText, LENSES } from "../components/ui.jsx";

const LINK_LABELS = {
  implements: { out: "Implements", in: "Implemented by" },
  amends: { out: "Amends", in: "Amended by" },
  revokes: { out: "Revokes", in: "Revoked by" },
  supersedes: { out: "Supersedes", in: "Superseded by" },
  related: { out: "Related", in: "Referenced by" },
};

function frSearchUrl(item) {
  if (item.kind === "eo" && item.number)
    return `https://www.federalregister.gov/documents/search?conditions%5Bpresidential_document_type%5D=executive_order&conditions%5Bterm%5D=${item.number}`;
  return `https://www.federalregister.gov/documents/search?conditions%5Bterm%5D=${encodeURIComponent(`"${item.title}"`)}`;
}

export default function Item({ id }) {
  const data = useData();
  const { state, setReview, setNote, internal } = useAppState();
  const [lens] = useLens();
  const item = data.items.get(id);
  const [noteDraft, setNoteDraft] = useState(null);

  if (!item)
    return (
      <Empty>
        <p className="mb-2">
          <span className="font-mono">{id}</span> isn't in the catalog yet.
        </p>
        <p className="text-[13px]">
          It's referenced by another document but hasn't been synced or seeded. It will appear after the next nightly sync if it
          was published in the Federal Register.
        </p>
      </Empty>
    );

  const reviewed = isReviewed(state, item);
  const links = data.links.get(item.id) ?? [];
  const grouped = {};
  // A typed link (implements, amends…) says more than "related"; don't list both.
  const typed = new Set(links.filter((l) => l.type !== "related").map((l) => l.id));
  for (const l of links) {
    if (l.type === "related" && typed.has(l.id)) continue;
    const key = `${l.type}:${l.dir}`;
    (grouped[key] ??= []).push(l.id);
  }
  const linkedInternal = internal.filter((e) => (e.links ?? []).includes(item.id));
  const actions = (item.actions ?? []).map((a) => ({ ...a, source: item }));
  const lensActions = lens === "all" ? actions : actions.filter((a) => a.lens === lens);
  const hiddenByLens = actions.length - lensActions.length;
  const byTier = ["must", "feed", "know"].map((t) => [t, lensActions.filter((a) => a.tier === t)]);
  const note = state.notes[item.id]?.text ?? "";
  const reviewedAt = state.reviews[item.id]?.at;

  return (
    <article>
      <nav className="mb-4 text-[13px] text-muted">
        <a className="link" href={href(item.group === "presidential" ? "orders" : "guidance")}>
          {item.group === "presidential" ? "Orders" : "Guidance"}
        </a>
        <span className="mx-1.5">/</span>
        <span className="font-mono">{item.label}</span>
      </nav>

      <header className="mb-6">
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <span className="font-mono text-[13px] font-medium text-accent">{item.label}</span>
          <span className="text-faint">·</span>
          <span className="text-[13px] text-muted">{item.issuer}</span>
          <RelevanceChip relevance={item.relevance} />
          <StatusText status={item.status} />
          {item.triaged && <DraftBadge item={item} reviewed={reviewed} />}
          {item.legacy && <span className="chip border-line text-muted">Legacy, still governs</span>}
        </div>
        <h1 className="max-w-4xl text-[24px] font-semibold leading-snug tracking-tight text-balance sm:text-[28px]">{item.title}</h1>
        <dl className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-[13px] text-muted">
          {(item.date || item.dateApprox) && (
            <div>
              <dt className="inline">{item.group === "presidential" ? "Signed " : "Issued "}</dt>
              <dd className="inline font-medium text-ink">{formatDate(item.date ?? item.dateApprox)}</dd>
            </div>
          )}
          {item.published && (
            <div>
              <dt className="inline">Published </dt>
              <dd className="inline font-medium text-ink">{formatDate(item.published)}</dd>
            </div>
          )}
          {item.citation && (
            <div>
              <dt className="inline">Citation </dt>
              <dd className="inline font-mono text-ink">{item.citation}</dd>
            </div>
          )}
        </dl>
        <div className="no-print mt-4 flex flex-wrap gap-2">
          {item.url && (
            <a className="btn btn-sm" href={item.url} target="_blank" rel="noreferrer">
              Primary source ↗
            </a>
          )}
          {item.group === "presidential" && (
            <a className="btn btn-sm" href={frSearchUrl(item)} target="_blank" rel="noreferrer">
              Federal Register ↗
            </a>
          )}
          {item.pdfUrl && (
            <a className="btn btn-sm" href={item.pdfUrl} target="_blank" rel="noreferrer">
              PDF ↗
            </a>
          )}
          <a className="btn btn-sm" href={href(`brief/${encodeURIComponent(item.id)}`)}>
            One-page brief
          </a>
          <a className="btn btn-sm" href={href("map", { focus: item.id })}>
            Show on map
          </a>
          {item.triaged && (
            <button className={`btn btn-sm ${reviewed ? "" : "btn-primary"}`} onClick={() => setReview(item.id, !reviewed)}>
              {reviewed ? "Mark unreviewed" : "Mark reviewed"}
            </button>
          )}
        </div>
        {reviewedAt && <p className="mt-2 text-[12px] text-muted">You reviewed this on {formatDate(reviewedAt.slice(0, 10))}.</p>}
      </header>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="min-w-0">
          {!item.triaged && (
            <div className="card mb-6 border-gold/40 bg-gold-soft px-4 py-3 text-[14px]">
              Not triaged yet. The nightly job drafts an analysis when an Anthropic API key is configured. Until then, this is the
              Federal Register abstract.
            </div>
          )}

          {item.summary && (
            <Section title="Plain English">
              <p className="max-w-3xl text-pretty">{item.summary}</p>
            </Section>
          )}

          {item.forYou && (
            <Section title="For DFC OIT">
              <div className="max-w-3xl rounded-lg border-l-4 border-accent bg-accent-soft px-4 py-3 text-pretty">{item.forYou}</div>
            </Section>
          )}

          {item.statusNote && (
            <Section title="Status">
              <p className="max-w-3xl text-pretty">
                <StatusText status={item.status} /> <span className="ml-1">{item.statusNote}</span>
              </p>
            </Section>
          )}

          <Section
            title={`What's needed from you · ${lensActions.length}`}
            right={
              hiddenByLens > 0 ? (
                <span className="text-[12px] text-muted">
                  {hiddenByLens} hidden by the {LENSES[lens]?.label} lens
                </span>
              ) : null
            }
          >
            {lensActions.length === 0 ? (
              <Empty>{actions.length ? "Nothing for this lens." : "No actions. Awareness only."}</Empty>
            ) : (
              byTier.map(([t, list]) =>
                list.length ? (
                  <ul key={t} className="mb-3 flex flex-col gap-2">
                    {list.map((a) => (
                      <ActionRow key={a.id} action={a} showSource={false} />
                    ))}
                  </ul>
                ) : null,
              )
            )}
          </Section>

          {item.litigation?.length > 0 && (
            <Section title="Litigation & legislation">
              <ul className="flex flex-col gap-2">
                {item.litigation.map((l, i) => (
                  <li key={i} className="card px-4 py-3">
                    <div className="font-medium">{l.case}</div>
                    <div className="text-[13px] text-muted">{l.court}</div>
                    <p className="mt-1 text-[14px] text-pretty">{l.status}</p>
                    {l.url && (
                      <a className="link text-[13px]" href={l.url} target="_blank" rel="noreferrer">
                        Docket ↗
                      </a>
                    )}
                  </li>
                ))}
              </ul>
              <p className="mt-2 text-[12px] text-muted">
                Court status moves fast. Check before acting on any of these: Just Security and Lawfare keep litigation trackers.
              </p>
            </Section>
          )}

          {item.frNotes && (
            <Section title="Federal Register notes">
              <p className="whitespace-pre-line font-mono text-[13px] text-muted">{item.frNotes}</p>
            </Section>
          )}

          <Section title="Your notes">
            {noteDraft === null ? (
              <div>
                {note ? <p className="max-w-3xl whitespace-pre-line text-pretty">{note}</p> : <p className="text-muted">None yet.</p>}
                <button className="btn btn-sm no-print mt-2" onClick={() => setNoteDraft(note)}>
                  {note ? "Edit" : "Add a note"}
                </button>
              </div>
            ) : (
              <div className="flex max-w-3xl flex-col gap-2">
                <textarea
                  className="input"
                  rows={4}
                  value={noteDraft}
                  onChange={(e) => setNoteDraft(e.target.value)}
                  placeholder="Your read, who owns it at DFC, what you've told your CIO…"
                  autoFocus
                />
                <div className="flex gap-2">
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => {
                      setNote(item.id, noteDraft.trim());
                      setNoteDraft(null);
                    }}
                  >
                    Save
                  </button>
                  <button className="btn btn-sm" onClick={() => setNoteDraft(null)}>
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </Section>

          {item.sources?.length > 0 && (
            <Section title="Sources">
              <ul className="flex flex-col gap-1 text-[14px]">
                {item.sources.map((s) => (
                  <li key={s.url}>
                    <a className="link" href={s.url} target="_blank" rel="noreferrer">
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </Section>
          )}
        </div>

        <aside className="flex flex-col gap-6">
          <div>
            <h2 className="label mb-2">Connected</h2>
            {Object.keys(grouped).length === 0 ? (
              <p className="text-[13px] text-muted">No mapped connections yet.</p>
            ) : (
              <div className="card divide-y divide-line">
                {Object.entries(grouped)
                  .sort()
                  .map(([key, ids]) => {
                    const [type, dir] = key.split(":");
                    return (
                      <div key={key} className="px-3 py-2.5">
                        <div className="mb-1 text-[12px] font-medium text-muted">{LINK_LABELS[type]?.[dir] ?? type}</div>
                        <ul className="flex flex-col gap-1">
                          {ids.map((lid) => {
                            const li = data.items.get(lid);
                            return (
                              <li key={lid} className="text-[13.5px] leading-snug">
                                <ItemLink item={li} id={lid} />
                                {li && <span className="ml-1.5 text-muted">{li.title}</span>}
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    );
                  })}
              </div>
            )}
          </div>

          <div>
            <h2 className="label mb-2">Internal guidance</h2>
            {linkedInternal.length === 0 ? (
              <p className="text-[13px] text-muted">
                None linked. <a className="link" href={href("internal", { link: item.id })}>Add DFC guidance</a>
              </p>
            ) : (
              <ul className="card divide-y divide-line">
                {linkedInternal.map((e) => (
                  <li key={e.id} className="px-3 py-2.5 text-[13.5px]">
                    <div className="font-medium">{e.title}</div>
                    <div className="text-muted">
                      {[e.issuer, e.reference, e.date && formatDate(e.date)].filter(Boolean).join(" · ")}
                    </div>
                    {e.url && (
                      <a className="link" href={e.url} target="_blank" rel="noreferrer">
                        Open (intranet) ↗
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {item.topics?.length > 0 && (
            <div>
              <h2 className="label mb-2">Topics</h2>
              <div className="flex flex-wrap gap-1.5">
                {item.topics.map((t) => (
                  <a key={t} className="chip border-line text-muted hover:text-ink" href={href("search", { q: t })}>
                    {t}
                  </a>
                ))}
              </div>
            </div>
          )}

          {item.updated && (
            <p className="text-[12px] text-muted">
              Analysis by{" "}
              {{ "claude-draft": "Claude (curated draft)", "ai-triage": "nightly AI triage", rule: "title rule", "title-scan": "title scan" }[item.author] ??
                item.author}
              , {formatDate(item.updated)}.
            </p>
          )}
        </aside>
      </div>
    </article>
  );
}
