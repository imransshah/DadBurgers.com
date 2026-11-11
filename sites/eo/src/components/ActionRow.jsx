import { useState } from "react";
import { actionStatus, useAppState } from "../lib/state.js";
import { DueText, LensChip, TierChip, VerifyFlag } from "./ui.jsx";
import { href } from "../lib/route.js";

const STATUSES = [
  { value: "open", label: "Open" },
  { value: "in-progress", label: "In progress" },
  { value: "done", label: "Done" },
  { value: "na", label: "N/A" },
];

export default function ActionRow({ action, showSource = true }) {
  const { state, setAction } = useAppState();
  const status = actionStatus(state, action.id);
  const saved = state.actions[action.id];
  const [noteOpen, setNoteOpen] = useState(false);
  const [draft, setDraft] = useState(saved?.note ?? "");
  const closed = status === "done" || status === "na";
  const src = action.source;
  const srcHref = src.group === "internal" ? href("internal") : href(`item/${encodeURIComponent(src.id)}`);

  return (
    <li className={`card px-4 py-3 ${closed ? "opacity-60" : ""}`}>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:gap-4">
        <div className="min-w-0 flex-1">
          <div className="mb-1.5 flex flex-wrap items-center gap-1.5">
            <TierChip tier={action.tier} />
            <LensChip lens={action.lens} />
            {action.verify && <VerifyFlag />}
            {action.recurring && (
              <span className="chip border-line text-muted" title="Recurring obligation">
                ↻ {action.recurring}
              </span>
            )}
          </div>
          <p className={`text-pretty ${closed ? "line-through decoration-faint" : ""}`}>{action.text}</p>
          <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] text-muted">
            {showSource && (
              <a href={srcHref} className="link font-medium" title={src.title}>
                {src.label}
              </a>
            )}
            {action.cite && <span className="font-mono text-[12px]">{action.cite}</span>}
            {action.due && <DueText due={action.due} done={closed} />}
            {action.dueNote && <span className="text-[12px] italic">{action.dueNote}</span>}
          </div>
          {saved?.note && !noteOpen && (
            <p className="mt-2 rounded-md bg-surface-2 px-3 py-2 text-[13px] text-pretty">
              <span className="label mr-2">Note</span>
              {saved.note}
            </p>
          )}
          {noteOpen && (
            <div className="mt-2 flex flex-col gap-2">
              <textarea
                className="input"
                rows={2}
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Who you talked to, what you sent, ticket number…"
                autoFocus
              />
              <div className="flex gap-2">
                <button
                  className="btn btn-sm btn-primary"
                  onClick={() => {
                    setAction(action.id, { note: draft.trim() });
                    setNoteOpen(false);
                  }}
                >
                  Save note
                </button>
                <button className="btn btn-sm" onClick={() => setNoteOpen(false)}>
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="flex shrink-0 items-center gap-2 sm:flex-col sm:items-end">
          <select
            className="input h-[30px] w-auto py-0 text-[13px]"
            aria-label="Status"
            value={status}
            onChange={(e) => setAction(action.id, { status: e.target.value })}
          >
            {STATUSES.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
          {!noteOpen && (
            <button className="btn btn-sm" onClick={() => setNoteOpen(true)}>
              {saved?.note ? "Edit note" : "Add note"}
            </button>
          )}
        </div>
      </div>
    </li>
  );
}
