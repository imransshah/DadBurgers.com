# Decolonized History

A world-history explorer for kids roughly ages 5–10. What your ancestors built,
who tried to take the credit, and who fought to keep it.

Live at the GitHub Pages URL for this repo, and intended for
`decolonized.therealdadburgers.com`.

---

## Editorial rules

These are not style suggestions. They are the point of the site. Read them
before adding a card.

1. **Lead with what people BUILT.** Every place opens with what they made, not
   what was done to them. Nobody here is only a victim.
2. **Name who did what.** Active voice, real names, no exceptions. "A Spanish
   priest burned the books" — not "the books were lost." Passive voice is how
   you hide a person who is still standing there.
3. **No false "we".** A sentence like "we still argue about the pyramids"
   quietly seats these kids next to the people who spent a century insisting
   Africans could not have built them. Say who argued. "We" in this house
   means us — this family — and nobody else.
4. **Pair every erasure with whoever saved it,** wherever that is true. The
   Timbuktu librarians. The families with the buried trunks. These kids need
   ancestors who fought back and won, not a list of losses.
5. **No atrocity content** — unchanged. Naming the man who burned a library is
   not the same as describing violence to a child. These are 6- and
   8-year-olds. Hard history is for later, in person, from their dad.
6. **If a claim is contested among historians, say so or leave it out.**
   Accuracy beats a good story. Every card here is checkable.
7. **Short sentences. Concrete nouns.** No abstractions like "influence" or
   "legacy" — say what the thing actually was.

The same rules are restated in the chat worker's system prompt
(`worker/src/index.js`), on the server side where a visitor cannot edit them.

---

## Running it locally

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually http://localhost:5173).

`npm run build` produces `dist/`. `npm run preview` serves that build.

---

## Adding a place

Everything editorial lives in `src/lib/content.js`. Add an entry to `PLACES`
and the map pin, the name button, and the card all appear on their own.

```js
{
  id: "somewhere",              // unique, lowercase
  name: "The Place",
  where: "Modern country",
  when: "about N years ago",
  x: 50, y: 45,                 // percentages on the map band, 0–100
  color: C.marigold,            // C.marigold | C.rose | C.jade
  hook: "One sentence a kid will repeat at dinner.",
  built: [
    { thing: "The concrete thing", why: "Two or three short sentences." },
  ],
  // Who took it, hid it, or took the credit. Name them. Name whoever
  // saved it too, when someone did. Optional.
  erased: "In 1562 a Spanish priest named Diego de Landa burned the books…",
  // Genuine open questions only — not erasure. Optional.
  stillUnknown: "What nobody knows yet. Say it plainly.",
}
```

Colors and fonts are in `src/lib/tokens.js`.

The map band is still the placeholder dot grid from the original design — a
real SVG world map can drop straight in behind the pins, since pin positions
are percentages and will still line up.

---

## The chat feature ("Ask a question")

**The Anthropic API key never goes in this repo or in the browser bundle.**
The site is static, so anything it ships is public. Instead there is a small
Cloudflare Worker in `worker/` that holds the key as a server-side secret,
applies the kid-safety system prompt, and streams the answer back.

```
browser  ──POST──▶  worker (holds the key)  ──▶  Anthropic API
         ◀──SSE───                          ◀───
```

Until it is wired up, the chat panel shows a friendly
"the asking box is not switched on yet" state. The rest of the site works
normally.

### Switching it on

**1. Deploy the worker** (needs a Cloudflare account, free tier is fine):

```bash
cd worker
npm install
npx wrangler secret put ANTHROPIC_API_KEY   # paste the key when prompted
npx wrangler deploy
```

`wrangler deploy` prints the worker's URL, e.g.
`https://decolonized-chat.<your-subdomain>.workers.dev`.

**2. Point the site at it.** In this repo on GitHub:
Settings → Secrets and variables → Actions → **Variables** → New variable

| Name | Value |
| --- | --- |
| `CHAT_API_URL` | `https://decolonized-chat.<your-subdomain>.workers.dev/chat` |

It is a repository *variable*, not a secret — it is a public URL that ships in
the bundle either way, and secrets are not readable at build time for a static
site.

**3. Re-run the deploy workflow** (Actions → Deploy to GitHub Pages → Run
workflow). The chat box switches itself on.

For local development, copy `.env.example` to `.env.local` and set
`VITE_CHAT_API_URL` to the same URL.

### Worker settings

In `worker/wrangler.toml`:

- `ALLOWED_ORIGINS` — comma-separated sites allowed to call the worker. Set
  this before the site is public, or the worker is a free proxy for anyone.
- The `RATE_LIMITER` block caps each visitor at 20 questions a minute. Delete
  the block if you don't want it; the worker checks the binding exists before
  using it.

The model is `claude-opus-5` at low effort — answers here are short and the
audience is impatient. Change `MODEL` in `worker/src/index.js` to adjust.

`GET /health` on the worker reports whether the key is configured.

---

## Deploying the site

This site lives in `sites/decolonized/` of the multi-site repo; run every
command below from this folder.

Two workflows build it:

- `.github/workflows/deploy.yml` publishes to **GitHub Pages** (the current
  home). The build uses a relative asset base, so the same output works at the
  Pages project path and at the root of a custom domain.
- `.github/workflows/decolonized-cloudflare.yml` deploys the same build as a
  **Cloudflare Worker with static assets** (`wrangler.json`), once the
  `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` repository secrets exist.

### Moving to Cloudflare

1. Let the Cloudflare workflow deploy once (it serves on `workers.dev` first).
2. In Cloudflare DNS, delete the `decolonized` CNAME that points at GitHub Pages.
3. Add `"routes": [{ "pattern": "decolonized.therealdadburgers.com", "custom_domain": true }]`
   to `wrangler.json` and push. Cloudflare creates the record and certificate.
4. Delete `.github/workflows/deploy.yml` and remove the custom domain under
   Settings → Pages.

The chat worker's `ALLOWED_ORIGINS` doesn't change; the origin stays the same.

## Layout

```
sites/decolonized/
src/
  Decolonized.jsx          page layout and the map/card/accordion components
  components/ChatPanel.jsx the "Ask a question" panel
  lib/content.js           PLACES and CONNECTIONS — the editorial content
  lib/tokens.js            palette and type
  lib/chat.js              streaming client for the worker
worker/
  src/index.js             the chat proxy: key, safety prompt, rate limit
wrangler.json              static-assets Worker config (Cloudflare)
```
