# Nebor — Service Pages (Design Reference)

Static HTML/CSS/SVG mockups for the three Nebor service pages. Built as a reference for the production designer.

## For the designer — start here

The **workflow section** is the row of three cards under each page's hero copy. It uses the class `.hero-elements` and contains three `.hero-el` cards, each composed of:

- An inline SVG illustration (`.hero-el-canvas`)
- A frosted-glass content overlay at the bottom (`.hero-el-content`) — tag, title, body

The three service pages and their workflow cards:

| Page | Theme color | Card 1 | Card 2 | Card 3 |
| --- | --- | --- | --- | --- |
| `revenue-engine.html` | Sage green | TAM mapping (Clay + HubSpot hub + 8 data tools) | Deliverability (inbox + infrastructure panel) | AI workflows (triggers → orchestrate orb → actions) |
| `demand-gen.html` | Pure yellow | ABM operating model (tier breakdown + ICP orbit) | Funnel workflows (centered conversion funnel + velocity) | Audience → channels (live distribution + sparklines) |
| `crm-revops.html` | Whitish lavender | (see file) | (see file) | (see file) |

The cards live between approximately lines 60 and 500 of each HTML file. Search for `<!-- Card 1`, `<!-- Card 2`, `<!-- Card 3` to jump to each one.

## Running locally

The site is plain static HTML — no build step. From the project root:

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000/revenue-engine.html>.

The pages collapse to a single column under 980px wide. View at desktop width (1100px+) to see the three-card layout.

## File layout

```
revenue-engine.html   · Sales Engine & GTM (Tier 01)
demand-gen.html       · Demand Gen & ABM   (Tier 02)
crm-revops.html       · CRM & RevOps       (Tier 03)
styles/system.css     · all shared styles, animations, breakpoints
scripts/              · small JS modules for marquees and interactive demos
assets/, uploads/     · logos and other static media
screenshots/          · reference screenshots from earlier iterations
```

## Theme tokens

Each page sets a tier class on `<body>` (`tier-revenue`, `tier-demand`, `tier-revops`) which swaps three CSS custom properties:

- `--page-accent` · base accent color
- `--page-accent-strong` · dark variant for text and emphasis
- `--page-accent-soft` · light wash for backgrounds

All other styling — type, spacing, card composition, grid, animations — is shared in `styles/system.css`.

## Notes for production

- Logos in the illustrations are pulled live from `https://www.google.com/s2/favicons?domain=X&sz=128`. Replace with vector logos for the production build.
- Only one element animates: the Orchestrate orb on the AI workflows card (`.heroviz-pulse-on` / `.heroviz-pulse-ring`). Everything else is static.
- Card SVGs use `viewBox="0 0 400 380"` with `preserveAspectRatio="xMidYMin meet"` so they scale cleanly with the card width.
