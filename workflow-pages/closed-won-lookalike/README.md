# Closed-Won Lookalike — Living Workflow

Self-contained "Living Workflow" service page for the Nebor website, on the locked
workflow-page design system (see the `nebor-workflow-design` skill). Source: a
transcribed founder voice note plus research (Ocean.io lookalike modeling, the
ICP-from-closed-won method, ABM on the buying committee, BetterContact enrichment).

## Self-contained
Everything this page needs is vendored under `assets/` and referenced via `./assets/...`
only (zero `../` paths), so it can be moved or deployed as one unit.

## Topic specifics
- **Tier color:** `tier-won` (deep teal / emerald), distinct from the other pages.
- **Hero element:** a 3D gold trophy (the won deal) with two teal lookalike company
  cards fanning behind it and a green won-check. Exported to `thumb-closedwon.svg`.
- **Byline:** Andrew van Rossenberg.
- **New tools registered in `tools.js`:** Ocean.io (lookalike) and BetterContact
  (waterfall enrichment).
- **Flowchart:** define your best customer, pull closed-won from the CRM, rank by
  value, run Ocean.io lookalike across 35M companies, score and dedupe, find and
  verify the buying committee, then activate via outbound (Instantly) or ABM
  (LinkedIn ads), landing pipeline that looks like your best customers.

## Preview
Served from `/tmp/service-page-design` on port 8765:
`http://localhost:8765/workflow-pages/closed-won-lookalike/`
