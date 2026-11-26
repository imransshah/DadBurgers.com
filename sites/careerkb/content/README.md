# Content

One Markdown file per entry. The folder sets the type.

```
desk-cards/   one-page references
slideshows/   decks: slides split by a line of `---`, speaker notes after a line of `???`
articles/     longer notes
                (set `type: book-note` in front matter for book notes)
taxonomy.json domains and type labels
```

## Front matter

```yaml
---
title: ATO lifecycle (NIST RMF) on one page      # required
domain: cyber                                    # required, a key in taxonomy.json
summary: One or two sentences shown in results.  # required
handling: public                                 # required, attests no CUI/PII/non-public text
tags: [rmf, ato, fisma]
status: draft                                    # draft | reviewed (default draft)
updated: 2026-11-23
sources:
  - title: NIST SP 800-37 Rev. 2
    url: https://csrc.nist.gov/pubs/sp/800/37/r2/final
  - title: A source with no link yet shows a ⚑ Verify flag
related: [zero-trust-briefing]                   # other entry ids (file names)
markings: teaching-examples                      # optional: file explains marking formats; marking hits warn instead of fail
redacted: "What was removed and under which rules" # optional: shown on the entry
---
```

The id is the file name without `.md` (lowercase, digits, hyphens).

## Blocked by the build

- Missing required fields, unknown domain, broken `related` ids, duplicate ids
- Control or classification markings (CUI banners or portion marks, FOUO,
  NOFORN-style caveats, classification banners, pre-decisional)
- SSN-shaped numbers
