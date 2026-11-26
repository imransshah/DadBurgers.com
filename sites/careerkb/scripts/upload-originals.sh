#!/usr/bin/env bash
# Upload the unredacted originals to the private R2 bucket behind /originals.
# Run from sites/careerkb on a machine logged in with `npx wrangler login`:
#   scripts/upload-originals.sh /path/to/careerkb-originals
# The PDFs never enter this repo; they go straight from the private clone to R2.
set -euo pipefail
SRC="${1:?path to a clone of the private careerkb-originals repo}"
BUCKET=careerkb-originals
put() { # file key
  [ -f "$SRC/$1" ] || { echo "missing: $1" >&2; return 1; }
  echo "→ $2"
  npx wrangler r2 object put "$BUCKET/$2" --remote --file "$SRC/$1" \
    --content-type application/pdf --cache-control "private, no-store" >/dev/null
}
put "desk-cards/AI Quick Reference Desk Card.pdf"           ai-quick-reference.pdf
put "desk-cards/Cybersecurity Quick Reference Desk Card.pdf" cybersecurity-quick-reference.pdf
put "desk-cards/Data Quick Reference Desk Card.pdf"         data-quick-reference.pdf
put "desk-cards/ITIL Quick Reference Desk Card.pdf"         itil-quick-reference.pdf
put "decks/AI The Things You Need to Know.pdf"              ai-things-you-need-to-know.pdf
put "decks/Cybersecurity The Things You Need to Know.pdf"   cybersecurity-things-you-need-to-know.pdf
put "decks/Data The Things You Need to Know.pdf"            data-things-you-need-to-know.pdf
put "decks/ITIL The Things You Need to Know.pdf"            itil-things-you-need-to-know.pdf
echo "done"
