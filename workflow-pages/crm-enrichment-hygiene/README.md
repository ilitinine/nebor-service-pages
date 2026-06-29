# CRM Enrichment & Hygiene — Living Workflow

Self-contained "Living Workflow" service page for the Nebor website, on the locked
workflow-page design system (see the `nebor-workflow-design` skill). Source: the
*Clay CRM Automation* article (clean and turn your CRM into a revenue engine),
focused on the enrichment + hygiene core.

## Self-contained
Everything this page needs is vendored under `assets/` and referenced via `./assets/...`
only (zero `../` paths), so it can be moved or deployed as one unit.

## Topic specifics
- **Tier color:** `tier-revops` (lavender), the color reserved for this page.
- **Hero element:** a 3D self-updating CRM record (filled fields, verified green
  checks, a refresh loop). Exported to `thumb-crm.svg`.
- **Byline:** Yannick Kok (CRM & RevOps automation), `yannick-kok.webp`.
- **Flowchart:** your CRM as it is today, Clay audits every record, dedupes and
  merges, validates and prunes dead data, enriches the gaps from a provider
  waterfall, catches job changes, and unifies the silos, then routes, triggers,
  and syncs, landing a living, self-updating CRM.

## Preview
Served from `/tmp/service-page-design` on port 8765:
`http://localhost:8765/workflow-pages/crm-enrichment-hygiene/`
