import { useEffect, useRef, useState } from "react";
import { C, display, body } from "../lib/tokens.js";
import {
  askClaude,
  CHAT_ENABLED,
  MAX_QUESTION_LENGTH,
} from "../lib/chat.js";

/**
 * ASK BOX
 *
 * Same editorial rules as the cards: short sentences, concrete nouns, no
 * atrocity content, say "we don't know" when we don't know. Those rules are
 * enforced server-side in the worker's system prompt — not here — because
 * anything in this file ships to the browser and can be edited by anyone.
 */

const STARTERS = [
  "Who first made paper?",
  "Why does an hour have 60 minutes?",
  "What is cuneiform?",
  "How old is the Indus Valley?",
];

function Bubble({ message }) {
  const isKid = message.role === "user";
  return (
    <div className={isKid ? "flex justify-end" : "flex justify-start"}>
      <div
        className="max-w-[85%] rounded-2xl px-4 py-3"
        style={{
          ...body,
          background: isKid ? C.marigold : `${C.ivory}`,
          color: isKid ? C.indigoDeep : C.ink,
          fontWeight: isKid ? 800 : 500,
          fontSize: "1rem",
          lineHeight: 1.6,
          whiteSpace: "pre-wrap",
        }}
      >
        {message.text}
        {message.pending && !message.text && (
          <span className="opacity-60">Thinking…</span>
        )}
      </div>
    </div>
  );
}

export default function ChatPanel() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);

  const scrollRef = useRef(null);
  const inputRef = useRef(null);
  const abortRef = useRef(null);

  // Keep the newest message in view as it streams in.
  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  // Esc closes the panel.
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Cancel an in-flight answer if the component goes away.
  useEffect(() => () => abortRef.current?.abort(), []);

  async function send(question) {
    const text = question.trim();
    if (!text || busy) return;

    setError(null);
    setDraft("");

    const history = messages.map((m) => ({ role: m.role, text: m.text }));
    const answerId = crypto.randomUUID();

    setMessages((prev) => [
      ...prev,
      { id: crypto.randomUUID(), role: "user", text },
      { id: answerId, role: "assistant", text: "", pending: true },
    ]);
    setBusy(true);

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      await askClaude({
        question: text,
        history,
        signal: controller.signal,
        onText: (chunk) => {
          setMessages((prev) =>
            prev.map((m) =>
              m.id === answerId ? { ...m, text: m.text + chunk } : m,
            ),
          );
        },
      });
    } catch (err) {
      if (err.name !== "AbortError") {
        setError(err.message || "Something went wrong.");
        // Drop the empty bubble so the panel doesn't show a blank answer.
        setMessages((prev) =>
          prev.filter((m) => !(m.id === answerId && !m.text)),
        );
      }
    } finally {
      setMessages((prev) =>
        prev.map((m) => (m.id === answerId ? { ...m, pending: false } : m)),
      );
      setBusy(false);
      abortRef.current = null;
      inputRef.current?.focus();
    }
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        aria-label="Ask a question about history"
        className="fixed bottom-5 right-5 z-40 rounded-full px-5 py-4 shadow-lg focus:outline-none focus-visible:ring-4"
        style={{
          ...body,
          fontWeight: 800,
          fontSize: "1rem",
          background: C.marigold,
          color: C.indigoDeep,
          border: `3px solid ${C.ivory}`,
        }}
      >
        Ask a question
      </button>
    );
  }

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 sm:inset-x-auto sm:right-5 sm:bottom-5 sm:w-[27rem]"
      role="dialog"
      aria-label="Ask a question about history"
    >
      <div
        className="flex flex-col overflow-hidden rounded-t-3xl sm:rounded-3xl shadow-2xl"
        style={{
          background: C.indigoDeep,
          border: `2px solid ${C.marigold}66`,
          maxHeight: "min(80vh, 40rem)",
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between gap-3 px-5 py-4"
          style={{ borderBottom: `1px solid ${C.ivory}22` }}
        >
          <div>
            <h2
              style={{ ...display, fontWeight: 900, color: C.ivory }}
              className="text-xl leading-tight"
            >
              Ask a question
            </h2>
            <p
              style={{ ...body, color: C.marigold }}
              className="text-xs font-semibold"
            >
              About any of these places, or history in general
            </p>
          </div>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close"
            className="rounded-full px-3 py-2 focus:outline-none focus-visible:ring-4"
            style={{
              ...body,
              fontWeight: 800,
              color: C.ivory,
              background: `${C.ivory}18`,
            }}
          >
            Close
          </button>
        </div>

        {/* Transcript */}
        <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-5 py-4">
          {!CHAT_ENABLED && (
            <div
              className="rounded-2xl p-4"
              style={{ background: `${C.marigold}1A` }}
            >
              <p
                style={{ ...body, fontWeight: 800, color: C.ivory }}
                className="text-base"
              >
                The asking box is not switched on yet.
              </p>
              <p
                style={{ ...body, color: C.ivory }}
                className="mt-1 text-sm leading-relaxed opacity-80"
              >
                Abba still has to plug in the key. Everything else on this page
                works — go pick a place.
              </p>
            </div>
          )}

          {CHAT_ENABLED && messages.length === 0 && (
            <div className="space-y-3">
              <p
                style={{ ...body, color: C.ivory }}
                className="text-base leading-relaxed opacity-85"
              >
                Ask me anything about the people on this page. If I do not know,
                I will say so.
              </p>
              <div className="flex flex-wrap gap-2">
                {STARTERS.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="rounded-full px-3 py-2 text-left focus:outline-none focus-visible:ring-4"
                    style={{
                      ...body,
                      fontWeight: 700,
                      fontSize: "0.85rem",
                      color: C.ivory,
                      background: "transparent",
                      border: `2px solid ${C.ivory}33`,
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((m) => (
            <Bubble key={m.id} message={m} />
          ))}

          {error && (
            <div
              className="rounded-2xl p-4"
              style={{ background: `${C.rose}26` }}
            >
              <p style={{ ...body, color: C.ivory }} className="text-sm">
                {error}
              </p>
            </div>
          )}
        </div>

        {/* Composer */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(draft);
          }}
          className="flex items-end gap-2 px-4 py-4"
          style={{ borderTop: `1px solid ${C.ivory}22` }}
        >
          <label className="sr-only" htmlFor="chat-input">
            Your question
          </label>
          <textarea
            id="chat-input"
            ref={inputRef}
            rows={1}
            value={draft}
            maxLength={MAX_QUESTION_LENGTH}
            disabled={!CHAT_ENABLED || busy}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send(draft);
              }
            }}
            placeholder={
              CHAT_ENABLED ? "Type your question…" : "Not switched on yet"
            }
            className="flex-1 resize-none rounded-2xl px-4 py-3 focus:outline-none focus-visible:ring-4 disabled:opacity-50"
            style={{
              ...body,
              fontSize: "1rem",
              background: C.ivory,
              color: C.ink,
              border: "none",
              maxHeight: "7rem",
            }}
          />
          <button
            type="submit"
            disabled={!CHAT_ENABLED || busy || !draft.trim()}
            className="rounded-2xl px-5 py-3 focus:outline-none focus-visible:ring-4 disabled:opacity-40"
            style={{
              ...body,
              fontWeight: 800,
              background: C.marigold,
              color: C.indigoDeep,
            }}
          >
            {busy ? "…" : "Ask"}
          </button>
        </form>
      </div>
    </div>
  );
}
