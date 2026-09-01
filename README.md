# Everybody built this

A world-history explorer for kids roughly ages 5–10. Pick a place, see what the
people there actually worked out.

Live at the GitHub Pages URL for this repo, and intended for
`decolonized.therealdadburgers.com`.

---

## Editorial rules

These are not style suggestions. Read them before adding a card.

1. **Every civilization gets credited for what it BUILT.** This is a
   contribution map, not a grievance leaderboard.
2. **No atrocity content.** These are 6- and 8-year-olds. Hard history is for
   later, in person, from their dad.
3. **If a claim is contested among historians, say so or leave it out.**
   Accuracy beats a good story. Every card here is checkable.
4. **Short sentences. Concrete nouns.** No abstractions like "influence" or
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
  stillUnknown: "What we genuinely do not know. Say it plainly.",
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

Pushing to `main` builds and publishes to GitHub Pages automatically
(`.github/workflows/deploy.yml`). The first run also turns Pages on.

The build uses a relative asset base, so the same output works both at the
Pages project path (`/DadBurgers.com/`) and at the root of a custom domain.

### Custom domain

To serve it at `decolonized.therealdadburgers.com`:

1. Add a DNS `CNAME` record: `decolonized` → `<username>.github.io`
2. In this repo: Settings → Pages → Custom domain → enter the domain, save,
   and tick **Enforce HTTPS** once the certificate is issued.
3. Add the same origin to `ALLOWED_ORIGINS` in `worker/wrangler.toml` and
   redeploy the worker.

GitHub writes a `CNAME` file into the published site when you set the domain in
Settings, so there is nothing to commit here.

---

## Layout

```
src/
  Decolonized.jsx          page layout and the map/card/accordion components
  components/ChatPanel.jsx the "Ask a question" panel
  lib/content.js           PLACES and CONNECTIONS — the editorial content
  lib/tokens.js            palette and type
  lib/chat.js              streaming client for the worker
worker/
  src/index.js             the chat proxy: key, safety prompt, rate limit
.github/workflows/         build and publish to GitHub Pages
```
