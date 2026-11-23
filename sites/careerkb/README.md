# Career KB

`careerkb.therealdadburgers.com` (password). A searchable knowledge base for a
federal IT Director and Deputy CIO: desk cards, slideshows and articles on the
concepts, plus the **Mandates** section on the federal requirements (executive
orders, presidential memoranda, OMB/OPM memos, CISA directives, FedRAMP and
NIST items), each with what it asks of you and by when. Claude writes the
content; you review it.

## What's in it

| Type | Where it comes from | Opens in |
| --- | --- | --- |
| Desk card | `content/desk-cards/*.md` | One-page card, printable |
| Slideshow | `content/slideshows/*.md` | 16:9 deck: ←/→, **F** full screen, **N** notes, `?s=3` deep links |
| Article | `content/articles/*.md` | Long-form page |
| Mandate | `mandates/data/*.json` (synced nightly) | The Mandates section: `#/mandates/item/<id>` |

### Search, framed for a federal environment

Everything above is one index (client-side
[MiniSearch](https://github.com/lucaong/minisearch): fuzzy and prefix matching,
titles and tags weighted above body text, type/domain/source/tag facets).
Mandates are ranked by how much they matter to you: documents judged
irrelevant, or not yet analysed, stay findable but rank lower.

On top of the results:

- **Federal context.** For any query, the top matching mandates, with the "for
  you" note and your next open action and deadline (live status).
- **Ask.** On request, a written answer from the top eight results, framed for
  a federal IT leader: the authority behind each requirement, required versus
  good practice, who owns what, your deadlines, and acquisition, workforce, ATO
  and records constraints where they matter. Cites its sources inline. Needs
  `ANTHROPIC_API_KEY`; the key stays on the worker (`worker/ask.js`).
- **Federal requirements that touch this.** On every desk card, slideshow and
  article, the mandates that cover the same ground.
- **From the knowledge base.** On every mandate, the desk cards and decks that
  explain the concepts behind it.
- **Due in the next 30 days** on the home page.

### The Mandates section (`#/mandates`)

Queue (every action by deadline, with status and notes), Orders, Guidance,
Map (order → policy → technical lineage), Calendar (with an Outlook `.ics`),
Internal (your agency's own guidance: titles, links and one-line summaries
only), Review (drafts, untriaged documents, new memos found by the watchers,
data health) and one-page printable briefs. Lenses: IT Ops, Manager,
Employee. Your statuses, notes, review marks and internal entries live in
Workers KV behind the password, not in this repository. See
[`mandates/README.md`](mandates/README.md) for the data pipeline.

## Ground rules

1. **No CUI, PII or non-public agency text, ever.** This is a personal
   Cloudflare account, not an authorized agency system, password or no
   password. Every content file must declare `handling: public`, and the build
   fails on control or classification markings and SSN-shaped numbers.
2. **Drafts until reviewed.** Claude-written content starts as `status: draft`;
   mandate analyses start unreviewed until you mark them on the site.
3. **Sources or a ⚑ Verify flag.** A source without a URL, or a fact taken
   from secondary reporting, shows as "Verify".
4. **A summary isn't the law.** Every mandate action cites its section and
   links to the primary source. Act on the source.

## Adding content

See [`content/README.md`](content/README.md) for the front matter schema.
Drop a `.md` file in the right folder, push, and the workflow validates,
builds and deploys. New mandates arrive by themselves; see
[`mandates/README.md`](mandates/README.md) to curate them.

## Setup checklist

Repository secrets (Settings → Secrets and variables → Actions):

1. `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` (shared with the other
   sites; see the root README).
2. `CAREERKB_SITE_PASSWORD` (a long passphrase). Without it the worker answers
   503: it fails closed. Changing it signs everyone out.
3. Optional: `ANTHROPIC_API_KEY`, which turns on Ask and the nightly AI drafts
   of new mandates (up to 40 a night; set the `CAREERKB_TRIAGE_LIMIT` variable
   to change that).
4. Optional, for the Monday digest email: enable Cloudflare Email Routing for
   `therealdadburgers.com`, verify your address as a destination, then set the
   `CAREERKB_DIGEST_TO` secret and the `CAREERKB_DIGEST_ENABLED=true` variable.

Then push, or run *Career KB* from Actions. The first deploy creates the
`careerkb.therealdadburgers.com` DNS record and certificate. The nightly sync
runs only once the workflow is on the repository's default branch.

## Local development

```sh
npm install
npm run dev                  # content build + Vite; Mandates statuses save to localStorage
printf 'SITE_PASSWORD=test\n' > .dev.vars && npm run worker:dev   # full worker: gate, KV, API, Ask
npm run validate             # content checks + mandates data checks
npm run mandates:sync        # Federal Register pull (needs network)
```

`public/data/` is generated by `scripts/build-content.mjs` (the index plus a
copy of the Mandates JSON) and is not committed.

## Layout

```
content/                 desk cards, slideshows, articles, taxonomy.json
mandates/data/           Mandates JSON (catalog, analysis, guidance, inbox, meta, profile)
mandates/scripts/        sync, watchers, triage, validation, digest switch
scripts/build-content.mjs  builds public/data/kb.json (one index for everything)
src/                     Career KB app: Home, Search, Entry, Slideshow
src/components/Federal.jsx  federal context, requirements, due-soon and Ask panels
src/mandates/            the Mandates section (pages, components, lib)
src/styles.css           CSS layer order (Career KB, Mandates, Tailwind utilities)
worker/                  password gate, KV API, Ask, Monday digest
```
