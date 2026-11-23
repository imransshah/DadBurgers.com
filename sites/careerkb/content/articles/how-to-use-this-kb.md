---
title: How to use and grow this knowledge base
domain: leadership
tags: [help, authoring, about]
summary: Searching, keyboard shortcuts, and how new desk cards and slideshows get added.
status: reviewed
updated: 2026-11-23
handling: public
---

## Search

- Press <kbd>/</kbd> anywhere to jump to search.
- Search is fuzzy and prefix-matched: `fitar` finds FITARA, `atho` still finds ATO.
- Filter by **type**, **domain** and **tag** on the results page. Filters stack.
- Titles and tags count more than body text.

## Viewers

- **Desk cards** are one-page references. Use **Print** for a paper copy.
- **Slideshows**: <kbd>←</kbd> <kbd>→</kbd> to move, <kbd>F</kbd> for full screen, <kbd>N</kbd> for speaker notes.
- **References** are imported from Order of Operations and link back to it.

## Adding content

Each item is one Markdown file in `sites/careerkb/content/`:

- `desk-cards/` for one-page references
- `slideshows/` for decks (slides separated by `---`, speaker notes after `???`)
- `articles/` for longer notes

The build validates every file. It rejects anything without `handling: public`, and anything that looks like a control or classification marking, or an SSN.

## Ground rule

No CUI, PII or non-public agency text, ever. This runs on a personal Cloudflare account, which is not an authorized agency system, password or no password.
