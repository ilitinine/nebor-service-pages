# Nebor — Service Pages (Design Reference)

Static HTML/CSS/SVG mockups for the three Nebor service pages. Built as a reference for the
production designer; production itself is Framer, where the wireframes are fixed and only the
content changes.

## The three pages

| Page | Service |
| --- | --- |
| [`revenue-engine.html`](revenue-engine.html) | Sales Engine & GTM Execution |
| [`demand-gen.html`](demand-gen.html) | Demand Generation & ABM |
| [`crm-revops.html`](crm-revops.html) | CRM & RevOps |

Every page carries a sticky switcher pill at the bottom of the viewport, so you can move between
the three without going back to an index. Opening any one of them is enough.

All three share one palette (cream, amber, gold, ink) and one chassis: nav, hero cards, problem
section, nine capabilities, living workflow, FAQ, footer. They differentiate by content, not by
color.

## Running locally

Plain static HTML, no build step. From the project root:

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000/revenue-engine.html>.

The pages collapse to a single column under 980px. View at 1100px+ for the full layout.

## File layout

```
revenue-engine.html    · Sales Engine & GTM
demand-gen.html        · Demand Gen & ABM
crm-revops.html        · CRM & RevOps
index.html             · redirects to revenue-engine.html

styles/system.css      · shared chrome: nav, type, grid, footer, switcher
styles/brand.css       · nebor.ai brand primitives
styles/page-revenue.css · hero + section layout shared by all three pages
styles/stepper.css     · living workflow (rail, canvas, flywheel, popover)
styles/workflow.css    · older workflow styles still referenced by the pages
styles/page-fx.css     · page-level ambient animation

scripts/stepper.js     · renders the living workflow from window.NEBOR_* config
scripts/re-console-v2.js    · the nine capability views · revenue-engine
scripts/re-console-demand.js · the nine capability views · demand-gen
scripts/re-console-crm.js    · the nine capability views · crm-revops
scripts/tools.js       · tool registry (names, favicons, roles)
scripts/page-fx.js     · page-level ambient animation

caps-proof.html        · capability-view proof sheet · demand-gen
caps-proof-re.html     · capability-view proof sheet · revenue-engine
caps-proof-crm.html    · capability-view proof sheet · crm-revops
hero-proof-crm.html    · hero-card proof sheet · crm-revops

assets/                · logos and static media
FEEDBACK-*.md          · the delivery-team feedback each page was built to
```

The proof sheets render one page's visuals in isolation on a bare canvas. They are a verification
tool, not part of the site.

## The living workflow

`stepper.js` renders it from globals each page defines inline near the bottom of its HTML:

- `NEBOR_STAGES` · the pillars (key, color, icon, optional sub-label)
- `NEBOR_WORKFLOW` · the steps (phase, step, desc, brief, tools, roles, flow, output)
- `NEBOR_STEP_STAGE` · maps each step to its pillar
- `NEBOR_TAG` / `NEBOR_HANDOFF` · the line above and below each step
- `NEBOR_HUB` / `NEBOR_HUB_TEXT` · the tools at the center of the wheel

Change the config, not the renderer: it is shared by all three pages.

## Notes for production

- Tool logos are pulled live from `https://www.google.com/s2/favicons?domain=X&sz=128`. Replace
  with vector logos for the production build. (simple-icons dropped brand logos, so favicons are
  the fallback.)
- All illustration animation is SMIL, which survives a Framer export. Content arrives finished and
  readable at t=0; story beats play once and freeze; only ambient motion loops.
- Copy rules: US English, no em dashes.
