# Signal-Led Outbound — Living Workflow

Self-contained "Living Workflow" service page for the Nebor website, on the locked
workflow-page design system (see the `nebor-workflow-design` skill). Source: the
Nebor article *"5 Signal-Based Outbound Campaigns You Should Be Running Right Now."*

## Self-contained
Everything this page needs is vendored under `assets/` and referenced via `./assets/...`
only (zero `../` paths), so it can be moved or deployed as one unit.

## Topic specifics
- **Tier color:** `tier-demand` (gold), distinct from RSS orange and inbound green.
- **Hero element:** a 3D satellite dish, reused as this workflow's related-card
  thumbnail (`thumb-outbound.svg`) on the other pages.
- **Byline:** Andrew van Rossenberg (Outbound, AI & Clay automation).
- **Flowchart:** a buying signal fires, n8n/Clay catches it, Clay reads and scores it
  hot or cold, enriches the account, finds and verifies the decision-makers, writes
  signal-tied copy, then forks to Instantly (email) and HeyReach (LinkedIn) and lands a
  booked meeting, with a cold-path nurture off-ramp.

## Preview
Served from `/tmp/service-page-design` on port 8765:
`http://localhost:8765/workflow-pages/signal-led-outbound/`
