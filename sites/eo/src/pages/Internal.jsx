import { useMemo, useState } from "react";
import { useData } from "../App.jsx";
import { formatDate } from "../lib/dates.js";
import { href, parseHash } from "../lib/route.js";
import { useAppState } from "../lib/state.js";
import { Empty, ItemLink, PageHeader, Section, TierChip } from "../components/ui.jsx";

const blank = () => ({
  title: "",
  issuer: "",
  reference: "",
  date: "",
  url: "",
  summary: "",
  links: [],
  actions: [],
});

export default function Internal() {
  const data = useData();
  const { internal, saveInternal, deleteInternal, mode } = useAppState();
  const preset = parseHash().query.link;
  const [form, setForm] = useState(() => (preset ? { ...blank(), links: [preset] } : null));
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState(null);

  return (
    <>
      <PageHeader
        eyebrow="Internal guidance"
        title="DFC's own implementing guidance."
        actions={
          !form && (
            <button className="btn btn-primary" onClick={() => setForm(blank())}>
              Add guidance
            </button>
          )
        }
      >
        Agency notices, CIO directives, HR announcements: link them to the orders they implement, and their actions join your
        queue. Stored in your private Cloudflare KV{mode === "local" ? " (this browser only, in local mode)" : ""}, never in the
        public repo.
      </PageHeader>

      <div className="card mb-6 border-must/40 bg-must-soft px-4 py-3 text-[14px] text-pretty">
        <strong className="font-semibold">No CUI, no PII, no non-public text.</strong> This is a personal account, not an
        authorized agency system (EO 13556, 32 CFR 2002). Enter titles, dates, reference numbers, intranet links and your own
        one-line summaries — nothing copied from the document.
      </div>

      {form && (
        <Editor
          data={data}
          form={form}
          setForm={setForm}
          saving={saving}
          err={err}
          onCancel={() => {
            setForm(null);
            setErr(null);
          }}
          onSave={async () => {
            if (!form.title.trim()) return setErr("A title is required.");
            setSaving(true);
            setErr(null);
            try {
              await saveInternal({
                ...form,
                title: form.title.trim(),
                actions: form.actions.filter((a) => a.text.trim()),
              });
              setForm(null);
            } catch (e) {
              setErr(e.message);
            } finally {
              setSaving(false);
            }
          }}
        />
      )}

      <Section title={`Saved · ${internal.length}`}>
        {internal.length === 0 ? (
          <Empty>Nothing yet. Add the first DFC notice that implements an order you're tracking.</Empty>
        ) : (
          <ul className="flex flex-col gap-2">
            {internal.map((e) => (
              <li key={e.id} className="card px-4 py-3">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <div className="font-medium text-pretty">{e.title}</div>
                    <div className="text-[13px] text-muted">
                      {[e.issuer, e.reference, e.date && formatDate(e.date)].filter(Boolean).join(" · ")}
                    </div>
                    {e.summary && <p className="mt-1 text-[14px] text-pretty">{e.summary}</p>}
                    {e.links?.length > 0 && (
                      <div className="mt-1.5 flex flex-wrap gap-x-2 text-[13px]">
                        <span className="text-muted">Implements:</span>
                        {e.links.map((id) => (
                          <ItemLink key={id} item={data.items.get(id)} id={id} />
                        ))}
                      </div>
                    )}
                    {e.actions?.length > 0 && (
                      <ul className="mt-2 flex flex-col gap-1">
                        {e.actions.map((a, i) => (
                          <li key={i} className="flex items-center gap-2 text-[13.5px]">
                            <TierChip tier={a.tier} compact /> {a.text}
                            {a.due && <span className="font-mono text-[12px] text-muted">· {formatDate(a.due)}</span>}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <div className="flex shrink-0 gap-2">
                    {e.url && (
                      <a className="btn btn-sm" href={e.url} target="_blank" rel="noreferrer">
                        Open ↗
                      </a>
                    )}
                    <button className="btn btn-sm" onClick={() => setForm({ ...blank(), ...e })}>
                      Edit
                    </button>
                    <button
                      className="btn btn-sm text-must"
                      onClick={() => {
                        if (confirm(`Delete "${e.title}"?`)) deleteInternal(e.id);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Section>
    </>
  );
}

function Editor({ data, form, setForm, onSave, onCancel, saving, err }) {
  const [q, setQ] = useState("");
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const options = useMemo(() => {
    const needle = q.toLowerCase();
    if (!needle) return [];
    return [...data.items.values()]
      .filter((i) => !form.links.includes(i.id) && `${i.label} ${i.title}`.toLowerCase().includes(needle))
      .slice(0, 8);
  }, [q, data, form.links]);

  return (
    <div className="card mb-8 px-4 py-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Title *" className="sm:col-span-2">
          <input className="input" value={form.title} onChange={set("title")} placeholder="e.g. OIT notice: logging plan inputs due" />
        </Field>
        <Field label="Issued by">
          <input className="input" value={form.issuer} onChange={set("issuer")} placeholder="Office of the CIO, HR, OGC…" />
        </Field>
        <Field label="Reference no.">
          <input className="input" value={form.reference} onChange={set("reference")} placeholder="Notice/directive number" />
        </Field>
        <Field label="Date">
          <input className="input" type="date" value={form.date} onChange={set("date")} />
        </Field>
        <Field label="Link (intranet is fine)">
          <input className="input" type="url" value={form.url} onChange={set("url")} placeholder="https://…" />
        </Field>
        <Field label="Your one-line summary" className="sm:col-span-2">
          <textarea className="input" rows={2} value={form.summary} onChange={set("summary")} placeholder="In your own words. Don't paste the document." />
        </Field>

        <Field label="Implements" className="sm:col-span-2">
          <div className="mb-2 flex flex-wrap gap-1.5">
            {form.links.map((id) => (
              <span key={id} className="chip border-line bg-surface-2">
                {data.items.get(id)?.label ?? id}
                <button
                  type="button"
                  aria-label={`Remove ${id}`}
                  className="text-muted hover:text-must"
                  onClick={() => setForm({ ...form, links: form.links.filter((x) => x !== id) })}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          <input className="input" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search EOs, memos, directives to link…" />
          {options.length > 0 && (
            <ul className="mt-1 max-h-56 overflow-auto rounded-lg border border-line bg-surface">
              {options.map((i) => (
                <li key={i.id}>
                  <button
                    type="button"
                    className="block w-full px-3 py-1.5 text-left text-[13.5px] hover:bg-surface-2"
                    onClick={() => {
                      setForm({ ...form, links: [...form.links, i.id] });
                      setQ("");
                    }}
                  >
                    <span className="font-mono font-medium text-accent">{i.label}</span> <span className="text-muted">{i.title}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </Field>

        <Field label="Actions it asks of you" className="sm:col-span-2">
          <ul className="flex flex-col gap-2">
            {form.actions.map((a, idx) => (
              <li key={idx} className="grid gap-2 sm:grid-cols-[110px_110px_1fr_150px_auto]">
                <select
                  className="input"
                  value={a.tier}
                  aria-label="Tier"
                  onChange={(e) => setForm({ ...form, actions: form.actions.map((x, i) => (i === idx ? { ...x, tier: e.target.value } : x)) })}
                >
                  <option value="must">Must do</option>
                  <option value="feed">Feed</option>
                  <option value="know">Know</option>
                </select>
                <select
                  className="input"
                  value={a.lens}
                  aria-label="Lens"
                  onChange={(e) => setForm({ ...form, actions: form.actions.map((x, i) => (i === idx ? { ...x, lens: e.target.value } : x)) })}
                >
                  <option value="ops">IT Ops</option>
                  <option value="manager">Manager</option>
                  <option value="employee">Employee</option>
                </select>
                <input
                  className="input"
                  value={a.text}
                  placeholder="What you need to do"
                  aria-label="Action"
                  onChange={(e) => setForm({ ...form, actions: form.actions.map((x, i) => (i === idx ? { ...x, text: e.target.value } : x)) })}
                />
                <input
                  className="input"
                  type="date"
                  value={a.due ?? ""}
                  aria-label="Due date"
                  onChange={(e) => setForm({ ...form, actions: form.actions.map((x, i) => (i === idx ? { ...x, due: e.target.value } : x)) })}
                />
                <button type="button" className="btn btn-sm self-center" onClick={() => setForm({ ...form, actions: form.actions.filter((_, i) => i !== idx) })}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <button
            type="button"
            className="btn btn-sm mt-2"
            onClick={() =>
              setForm({ ...form, actions: [...form.actions, { key: crypto.randomUUID().slice(0, 8), tier: "must", lens: "ops", text: "", due: "" }] })
            }
          >
            + Add action
          </button>
        </Field>
      </div>
      {err && <p className="mt-3 text-[13px] text-must">{err}</p>}
      <div className="mt-4 flex gap-2">
        <button className="btn btn-primary" onClick={onSave} disabled={saving}>
          {saving ? "Saving…" : "Save"}
        </button>
        <button className="btn" onClick={onCancel}>
          Cancel
        </button>
        <a className="link ml-auto self-center text-[13px]" href={href("")}>
          Saved actions appear in your queue
        </a>
      </div>
    </div>
  );
}

function Field({ label, children, className = "" }) {
  return (
    <label className={`flex flex-col gap-1 ${className}`}>
      <span className="text-[12.5px] font-medium text-muted">{label}</span>
      {children}
    </label>
  );
}
