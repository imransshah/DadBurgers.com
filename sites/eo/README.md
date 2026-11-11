# Order of Operations

`eo.therealdadburgers.com`. A private tracker of presidential executive orders
and memoranda, mapped to the OMB, OPM/CHCO, CISA, FedRAMP and NIST guidance
that implements them. Every item is read from one chair: IT Operations
Director, Office of Information Technology, U.S. International Development
Finance Corporation (DFC). Each action is sorted by what it asks of that person:

- **Must do**: you own the deliverable.
- **Feed**: someone else owns it and will need your input.
- **Know**: awareness only.

…and by lens: **IT Ops** (systems, network, cloud, security ops, contracts),
**Manager** (feds you supervise; COR over contractors), **Employee** (you).

## Ground rules

1. **A summary isn't the law.** Every action carries a citation and a link to
   the primary source. Act on the source.
2. **Drafts until reviewed.** Claude wrote every analysis. Nothing is
   "reviewed" until you mark it on the site.
3. **Verify flags mean it.** A ⚑ Verify chip means the fact came from secondary
   reporting or couldn't be checked against the primary text.
4. **Neutral voice.** It's a runbook, not an op-ed.
5. **No CUI, PII or non-public agency text, anywhere.** This runs on a personal
   Cloudflare account, which is not an authorized agency system, password or no
   password (EO 13556; 32 CFR 2002). The Internal page takes titles, dates,
   reference numbers, intranet links and one-line summaries in your own words.
   Those entries live in Workers KV, never in this repository.

## Setup checklist

Do these once, in order.

1. **Cloudflare deploy secrets.** `CLOUDFLARE_API_TOKEN` and
   `CLOUDFLARE_ACCOUNT_ID`; see the root README.
2. **Password.** Add a repository secret `EO_SITE_PASSWORD` (a long
   passphrase). It's uploaded to the worker on every deploy. Changing it signs
   every session out.
3. **Deploy.** Push to the branch, or Actions → *Order of Operations* → Run
   workflow. The first deploy creates the `eo.therealdadburgers.com` DNS record
   and certificate. Allow a few minutes.
4. **AI drafts (optional, recommended).** Add `ANTHROPIC_API_KEY`. Each run
   drafts up to 40 new documents (`EO_TRIAGE_LIMIT` variable to change). The
   first full sync brings in roughly 300 EOs and ~100 memoranda. Trade and tariff
   orders are auto-marked "none" by rule without an API call. For the backlog,
   run the workflow by hand with a higher limit.
5. **Weekly digest email (optional).**
   1. Cloudflare → `therealdadburgers.com` → Email → Email Routing → enable it
      (adds MX/TXT records; skip this if the domain already receives mail
      elsewhere).
   2. Email Routing → Destination addresses → add and verify your address.
   3. Repository secret `EO_DIGEST_TO` = that address. Repository variable
      `EO_DIGEST_ENABLED` = `true`.
   4. The digest goes out Mondays at 11:23 UTC. Preview it any time at
      `/api/digest/preview` while signed in.
6. **Nightly schedule.** GitHub runs scheduled workflows only from the default
   branch. Merge this work there (or make this branch the default) to start the
   nightly sync.

## How data flows

```
Federal Register API ──┐
OMB memoranda page ────┤   nightly GitHub Action          Cloudflare Worker
OPM CHCO memos ────────┼─▶ sync → watch → triage ─▶ commit ─▶ build ─▶ deploy
CISA directives ───────┤   (public/data/*.json)                 │
FedRAMP notices ───────┘                                        ▼
                                          password gate ─▶ static site + /api ─▶ Workers KV
                                                                                (your statuses,
                                                                                 notes, reviews,
                                                                                 internal guidance)
```

| File (`public/data/`) | Written by | Holds |
| --- | --- | --- |
| `catalog.json` | sync script + hand seed | Every presidential document: number, title, dates, citation, links |
| `analysis.json` | hand + triage script | Per-document relevance, plain-English summary, "For DFC OIT", actions, lineage, litigation |
| `guidance.json` | hand | OMB/OPM/CISA/FedRAMP/NIST items with their own analysis and `implements` links |
| `inbox.json` | watcher script | New guidance found on agency pages, waiting for review |
| `meta.json` | scripts | Sync health, title mismatches, watcher status |
| `profile.json` | hand | The reader profile every analysis is written for |

Hand edits to `analysis.json` and `guidance.json` are never overwritten. The
triage script only fills documents with no analysis yet. Action ids
(`<item-id>:<key>`) must stay stable, because your statuses in KV are keyed on
them.

**Seed vs. official record.** The curated seed was written before this
sandbox could reach the Federal Register. On each sync, every seeded document
is compared with the official title for its number. A mismatch (say, a wrong
EO number) shows up on the Review page until it's fixed.

## Local development

```bash
npm install
npm run dev          # UI only; statuses save to localStorage ("local mode")

echo 'SITE_PASSWORD=dev' > .dev.vars
npm run worker:dev   # full stack: password gate, KV, API, on http://localhost:8787
```

Scripts: `npm run sync`, `npm run watch-guidance`, `npm run triage`,
`npm run validate`.

## Layout

```
src/
  App.jsx              shell, nav, lens switch, routing
  pages/               Queue, Orders, Guidance, Item, Brief, Map, Calendar, Internal, Review, Search, About
  components/          ActionRow, ItemList, ui (chips, badges, sections)
  lib/                 data (index + links graph), state (KV/localStorage), dates, ics, route
worker/
  index.js             auth gate, security headers, /api, scheduled()
  auth.js              password check, signed session cookie, login page
  digest.js            Monday email
scripts/               sync-federal-register, watch-guidance, triage, validate-data, enable-digest
public/data/           the JSON above
```
