// Client for /api/ask. Sends the question plus the retrieved entries (what the
// search already found), streams the answer back as Server-Sent Events. The
// Anthropic key lives on the worker; nothing here is secret.

const MAX_SOURCE_TEXT = 3500;

function compact(entry, i, statuses) {
  const src = {
    n: i + 1,
    id: entry.id,
    title: entry.title,
    kind: entry.origin === "eo" ? "mandate" : entry.type,
    summary: entry.summary ?? "",
    text: String(entry.text ?? "").slice(0, MAX_SOURCE_TEXT),
  };
  if (entry.fed) {
    src.relevance = entry.fed.relevance;
    src.status = entry.fed.status;
    src.forYou = entry.fed.forYou ?? "";
    src.actions = (entry.fed.actions ?? []).slice(0, 8).map((a) => ({
      tier: a.tier,
      lens: a.lens,
      text: a.text,
      due: a.due ?? null,
      yourStatus: statuses?.[a.id]?.status ?? "open",
      verify: !!a.verify,
    }));
  }
  return src;
}

export async function askKb({ question, sources, statuses, onText, signal }) {
  const res = await fetch("/api/ask", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "same-origin",
    signal,
    body: JSON.stringify({ question: question.slice(0, 500), sources: sources.map((e, i) => compact(e, i, statuses)) }),
  });
  if (res.status === 401) {
    window.location.href = "/login";
    throw new Error("Signed out.");
  }
  if (!res.ok) {
    let message = `Ask failed (${res.status}).`;
    try {
      const body = await res.json();
      if (body?.error) message = body.error;
    } catch {
      if (res.status === 404) message = "Ask needs the Career KB worker (it isn't running in plain `vite dev`).";
    }
    throw new Error(message);
  }
  const reader = res.body.getReader();
  const dec = new TextDecoder();
  let buf = "";
  for (;;) {
    const { value, done } = await reader.read();
    if (done) break;
    buf += dec.decode(value, { stream: true });
    let i;
    while ((i = buf.indexOf("\n\n")) >= 0) {
      const frame = buf.slice(0, i);
      buf = buf.slice(i + 2);
      const line = frame.split("\n").find((l) => l.startsWith("data: "));
      if (!line) continue;
      const msg = JSON.parse(line.slice(6));
      if (msg.type === "text") onText(msg.text);
      else if (msg.type === "error") throw new Error(msg.message);
      else if (msg.type === "done") return;
    }
  }
}

const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);

/**
 * A deliberately small Markdown subset (paragraphs, headings, bullets,
 * numbered lists, bold, italics, code) rendered from escaped text, so nothing
 * the model writes can inject HTML. [n] citations become links to sources.
 */
export function renderAnswer(md, sources) {
  const inline = (s) =>
    esc(s)
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/(^|[^*])\*(?!\s)(.+?)\*(?!\*)/g, "$1<em>$2</em>")
      .replace(/`([^`]+)`/g, "<code>$1</code>")
      .replace(/\[(\d{1,2})\]/g, (m, n) => {
        const e = sources[Number(n) - 1];
        if (!e) return m;
        const href = e.link ?? `#/e/${e.id}`;
        return `<a class="cite" href="${esc(href)}" title="${esc(e.title)}">[${n}]</a>`;
      });
  const out = [];
  let list = null;
  const close = () => {
    if (list) out.push(`</${list}>`);
    list = null;
  };
  for (const raw of String(md).split("\n")) {
    const line = raw.trimEnd();
    let m;
    if (!line.trim()) close();
    else if ((m = line.match(/^#{1,4}\s+(.*)$/))) {
      close();
      out.push(`<h3>${inline(m[1])}</h3>`);
    } else if ((m = line.match(/^\s*[-*]\s+(.*)$/))) {
      if (list !== "ul") (close(), out.push("<ul>"), (list = "ul"));
      out.push(`<li>${inline(m[1])}</li>`);
    } else if ((m = line.match(/^\s*\d+[.)]\s+(.*)$/))) {
      if (list !== "ol") (close(), out.push("<ol>"), (list = "ol"));
      out.push(`<li>${inline(m[1])}</li>`);
    } else {
      close();
      out.push(`<p>${inline(line)}</p>`);
    }
  }
  close();
  return out.join("");
}
