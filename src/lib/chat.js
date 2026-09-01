/**
 * CHAT CLIENT
 *
 * The browser NEVER holds the Anthropic API key. It talks to our own small
 * proxy (see /worker), which holds the key as a server-side secret and
 * streams Claude's answer back as Server-Sent Events.
 *
 * Point VITE_CHAT_API_URL at that proxy. Until it is set, the chat UI shows
 * a "not switched on yet" state instead of erroring.
 */

const RAW_ENDPOINT = import.meta.env.VITE_CHAT_API_URL;

// A placeholder left in .env is the same as not configured. Treat the
// literal placeholder strings as "off" so a half-finished setup fails
// friendly instead of firing requests at nothing.
const PLACEHOLDERS = [
  "",
  "REPLACE_ME",
  "PLACEHOLDER",
  "https://your-worker-name.workers.dev/chat",
];

export const CHAT_ENDPOINT =
  RAW_ENDPOINT && !PLACEHOLDERS.includes(RAW_ENDPOINT.trim())
    ? RAW_ENDPOINT.trim()
    : null;

export const CHAT_ENABLED = CHAT_ENDPOINT !== null;

/** Max characters we let a kid send. Keeps the bill and the abuse surface small. */
export const MAX_QUESTION_LENGTH = 500;

/** How many previous turns we send for context. */
const HISTORY_TURNS = 8;

/**
 * Ask a question and stream the answer back.
 *
 * @param {object} opts
 * @param {string} opts.question       The new question.
 * @param {Array<{role:string,text:string}>} opts.history  Prior turns.
 * @param {(chunk:string)=>void} opts.onText  Called with each text chunk.
 * @param {AbortSignal} [opts.signal]
 * @returns {Promise<void>} resolves when the answer is complete
 */
export async function askClaude({ question, history = [], onText, signal }) {
  if (!CHAT_ENABLED) {
    throw new Error("Chat is not configured yet.");
  }

  const response = await fetch(CHAT_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    signal,
    body: JSON.stringify({
      question: question.slice(0, MAX_QUESTION_LENGTH),
      history: history.slice(-HISTORY_TURNS).map((m) => ({
        role: m.role,
        text: m.text,
      })),
    }),
  });

  if (!response.ok) {
    // The worker sends a JSON body with a kid-readable message where it can.
    let message = `Something went wrong (${response.status}).`;
    try {
      const payload = await response.json();
      if (payload?.message) message = payload.message;
    } catch {
      // Non-JSON error body — keep the generic message.
    }
    throw new Error(message);
  }

  if (!response.body) {
    throw new Error("Something went wrong — no answer came back.");
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });

    // SSE frames are separated by a blank line.
    const frames = buffer.split("\n\n");
    buffer = frames.pop() ?? "";

    for (const frame of frames) {
      for (const line of frame.split("\n")) {
        if (!line.startsWith("data:")) continue;
        const raw = line.slice(5).trim();
        if (!raw) continue;

        let event;
        try {
          event = JSON.parse(raw);
        } catch {
          continue; // Ignore a malformed frame rather than killing the stream.
        }

        if (event.type === "text" && event.text) {
          onText(event.text);
        } else if (event.type === "error") {
          throw new Error(event.message || "Something went wrong.");
        } else if (event.type === "done") {
          return;
        }
      }
    }
  }
}
