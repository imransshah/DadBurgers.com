# Mandates data

The JSON behind Career KB's Mandates section and its search entries. Every
item is read from one chair, set in `data/profile.json`: IT Operations
Director in a small civilian agency's IT office. Each action is sorted by what it asks of that
person:

- **Must do**: you own the deliverable.
- **Feed**: someone else owns it and will need your input.
- **Know**: awareness only.

Each action also has a lens: **IT Ops** (systems, network, cloud, security
ops, contracts), **Manager** (feds you supervise; COR over contractors) or
**Employee** (you).

## Files

| File (`data/`) | Written by | Holds |
| --- | --- | --- |
| `catalog.json` | sync script + hand seed | Every presidential document since Jan 20, 2025 (plus older ones IT still runs on): number, title, dates, citation, links |
| `analysis.json` | hand + triage script | Per-document relevance, plain-English summary, "for you", actions, lineage, litigation |
| `guidance.json` | hand | OMB/OPM/CISA/FedRAMP/NIST items with their own analysis and `implements` links |
| `inbox.json` | watcher script | New guidance found on agency pages, waiting for review |
| `meta.json` | scripts | Sync health, seed/official title mismatches, watcher status, last triage |
| `profile.json` | hand | The reader profile every analysis, and every Ask answer, is written for |

## Nightly pipeline (`.github/workflows/careerkb.yml`)

```
Federal Register API ──┐
OMB memoranda page ────┤
OPM CHCO memos ────────┼─▶ sync → watch → triage → validate → commit ─▶ build index ─▶ deploy
CISA directives ───────┤      (scripts/)                (data/)        (kb.json)
FedRAMP notices ───────┘
```

- `scripts/sync-federal-register.mjs` merges every EO and presidential
  memorandum since Jan 20, 2025. It never deletes, and it records a title
  mismatch whenever a hand-seeded entry's number points at a differently
  titled official document.
- `scripts/watch-guidance.mjs` adds new OMB memos, OPM/CHCO memos, CISA
  directives and FedRAMP notices to the inbox. Each source fails on its own.
- `scripts/triage.mjs` drafts analysis for documents with none: title rules
  first (trade and tariff orders become "none"), then Claude on the full text
  when `ANTHROPIC_API_KEY` is set. It never overwrites hand-written analysis.
- `scripts/validate-data.mjs` fails the run on duplicate ids, bad enums or bad
  dates, and warns on references to documents not synced yet.

Hand edits to `analysis.json` and `guidance.json` are safe. Keep action ids
(`<item-id>:<key>`) stable: Your statuses in Workers KV are keyed on them.

## Promoting an inbox memo

Add an entry to `guidance.json` (copy a neighbour's shape: issuer, number,
title, date, url, implements, relevance, summary, forYou, actions), remove it
from `inbox.json`, push. Or ask Claude to do it.
