# Nebor service pages: continuation prompt

Copy everything below this line into the new chat.

---

You are picking up a long-running project mid-flight: shipping Nebor's three service pages (nebor.ai, a GTM infrastructure agency) from a local HTML/CSS/JS sandbox into their production Framer site. The previous session did the heavy lifting; you are here for a fix round plus one content rework. Read all of this before touching anything. Work step by step, verify visually after every change, and never batch destructive actions.

## 1. Who you are working with

Ibrahim runs this project. He is hands-on in Framer and does all copy-pasting of embed code himself; you prepare files and give him raw GitHub links to paste. Andrew is his partner and gives feedback in Slack; Andrew's word on positioning is final. Ibrahim is direct, moves fast, and dislikes being asked to confirm things mid-task: once he says go, finish the whole job before pausing. Never redo work he says he already did; ask what he did if unclear.

## 2. Where everything lives

- Local sandbox repo: `~/Documents/Service page design examples` (git repo, GitHub: `ilitinine/nebor-service-pages`, branch `main`). Push after every change.
- The three sandbox pages: `revenue-engine.html`, `demand-gen.html`, `crm-revops.html`, with shared CSS in `styles/` (`system.css`, `workflow.css`, `stepper.css`, `brand.css`, `page-fx.css`) and JS in `scripts/` (`stepper.js` renders the flywheel, `tools.js` is the tool registry, `re-console-*.js` render the capability consoles).
- Framer embed bundles: `embeds/` — nine files: `{revenue,demand,crm}-{hero,caps,workflow}.html`. Each is a complete self-contained bundle pasted whole into a Framer HTML Embed. `embeds/README.md` holds the per-breakpoint frame heights table and is the source of truth for heights.
- Embed assets are served from Netlify site `statuesque-starship-49757d.netlify.app` (manual zip drop; a fresh zip goes to `~/Desktop/nebor-site-*.zip`, ~7.4MB). Only needed when `assets/` change.
- SEO blocks ready to paste: `seo/jsonld-revenue-engine.html`, `seo/jsonld-demand-gen-abm.html`, `seo/jsonld-crm-revops.html` (logo and LinkedIn already filled with real values; no placeholders). Flywheel anchor script: `seo/flywheel-anchor-snippet.html`.
- Local preview: `rsync -a --delete --exclude='.git' ./ /tmp/service-page-design/` then start the dev server named `pages` from `.claude/launch.json` (port 8766). ALWAYS rsync before checking anything in the preview browser.
- Framer: project "Nebor" in Andrew's Workspace (PRO, the live nebor.ai). Pages: `/gtm-revenue-engine`, `/demand-gen-abm`, `/crm-revops` (plus `-template` copies you must never touch). Ibrahim's Chrome is connected via the Claude extension; the Framer login lives on deviceId `19b18d72-67ee-448b-b32b-1c314e0f24ae` (the other Chrome, `4584fc89-...`, has Netlify, no Framer). Select by deviceId, verify with one screenshot.
- This project directory has persistent memory files under `.claude/projects/.../memory/` covering the Chrome mapping, the embed paste method, and Framer Agent usage. They load automatically; trust but re-verify anything stale.

## 3. Non-negotiable content rules (Ibrahim's standing rules)

- No em dashes anywhere in site copy. Never the word "actually" (client quotes exempt). No invented numbers or metrics, ever. No "X, not Y" comma-negation constructions. Plain, direct, human, value-led language; nothing that paints a false narrative.
- Animations must be meaningful and play once; never cheap, never invisible.
- Design personas in mock UI must NEVER use real client names or photos (testimonials keep real ones).
- The tools section on each page must mirror exactly the tools on that page's flywheel. If a tool leaves the flywheel it leaves the grid, and vice versa. Current grids: Revenue 12 (HubSpot, Apollo, Clay, G2, LinkedIn, BuiltWith, Instantly, Claude, ChatGPT, n8n, HeyReach, Slack), Demand 8 (HubSpot, LinkedIn, Clay, RB2B, G2, Instantly, n8n, Claude), CRM 7 (HubSpot, Salesforce, Clay, Apollo, Pipedrive, Claude, ChatGPT).
- Positioning: Nebor must never read as an outbound/cold-email agency. "Services", never "agency". CRM copy stays platform-neutral ("in whichever CRM you run").

## 4. How to work Framer with the browser extension (hard-won rules)

What synthetic clicks CAN do: select layers in the tree, expand/collapse, type into text and numeric fields (Height, padding, font size, the Link "Page or URL" field), triple-click + cmd+a + retype text, cmd+2 (zoom to selection), cmd+d, Backspace delete, drag layers in the layer tree (left_click_drag worked reliably for reordering).

What synthetic clicks CANNOT do: native OS file dialogs (image "Choose Image..."), Framer dropdown pickers (Height Fit/Fixed toggle-dropdowns, collection pickers, the Link section picker), drag-to-insert new elements. For these, either the Framer AI Agent does it, or Ibrahim does.

Framer canvas renders ONE PAGE BEHIND after switching pages; never diagnose from the first screenshot after a page switch. Verify state via the properties panel or preview, not the canvas. The connection drops into "Slow connection. Editing is disabled." regularly; a tab reload (cmd+r) fixes it; wait it out and never type while disabled.

The Framer AI Agent (right panel, Agent tab): prompts must be a single message with NO newlines (chat submits on Enter). It auto-creates a branch on its first run; say "stay on the current branch" in every follow-up, and remind Ibrahim to merge. It is excellent at: setting images from the CMS (the Tools CMS collection, 62 items each with a Logo field), renaming text across component variants, per-breakpoint style overrides. It is DANGEROUS at: anything structural. It once wrapped the Living Workflow embed in a "Flywheel Anchor" frame and MOVED it to the top of the page on two pages, which reached main and had to be repaired by hand. NEVER let the Agent move, wrap, or reorder layers; forbid it explicitly in prompts ("do not move, wrap, add, or reorder any layers"). CREDITS: the workspace has used over 90% of its credits including a purchased 1000-credit add-on (~EUR 18.15/mo, renews monthly; Ibrahim may want to cancel the renewal). Treat remaining credits as nearly zero: batch aggressively, prefer manual edits, and get Ibrahim's OK before any Agent run.

Embed paste protocol: you edit the file in `embeds/`, commit + push, then give Ibrahim the raw link `https://github.com/ilitinine/nebor-service-pages/raw/main/embeds/<file>.html`; he selects the embed in Framer, replaces the HTML, done. Frame heights are set per breakpoint in the embed element's Height field (a numeric field you can type). Current heights are in `embeds/README.md`; phone values were re-measured after a viewport fix (hero 1540, revenue-caps 970, demand-caps 1000, crm-caps 1020, revenue-workflow 1720, demand-workflow 1500, crm-workflow 1970; tablet hero 890).

Embed technical facts: every bundle starts with `<meta charset="utf-8">` then `<meta name="viewport" content="width=device-width, initial-scale=1">` (the viewport meta is load-bearing; without it phones lay the embed out at 980px). Hero bundles contain an `html,body{margin:0;padding:0;background:transparent}` reset and the `.heroviz-*` CSS (connector lines need `fill:none` or they render as solid black wedges). The hero card phone rule lives at `@media (max-width: 700px)` ON PURPOSE: Framer's Tablet frame is 810 wide but its inner document measures just under 810, so a 809px breakpoint fires on tablet and breaks it. Do not raise that 700 back up.

## 5. Current state (all on Framer `main`, verified)

Done and working: all nine embeds pasted with correct heights; tablet and phone render correctly (Ibrahim confirmed "tablet and phone are perfect"); tool grids mirror flywheels with correct logos at every breakpoint; switcher pill component (labels now GTM Engine / Demand & ABM / CRM & RevOps, compact phone variant, sits at bottom 80 on phone to clear the "Ask AI about Nebor" widget); hero H1 30px/1.15 at Phone; SEO titles/descriptions/paths set (`/gtm-revenue-engine`, `/demand-gen-abm`, `/crm-revops`); revenue page fully renamed away from "Sales Engine" in lede and eyebrow context.

The flywheel CTA system, mid-flight: each page's "See the entire flywheel" button (a custom Button COMPONENT whose Link only accepts a page or URL, no native section picker) now has Link = `#flywheel` on all three pages. For the anchor to resolve, each page needs the small script from `seo/flywheel-anchor-snippet.html` pasted into Page Settings > Custom Code > End of head (it tags the workflow embed's root, found via `.pw-canvas` which is unique to it, with `id="flywheel"` + `scroll-margin-top:96px` + smooth scroll). The three workflow embed FILES also have `id="flywheel"` baked into their root div as a belt-and-braces (live pages may or may not have that version pasted). VERIFY on each page whether Ibrahim pasted the snippet; if yes, preview-click the button and confirm it glides to the wheel.

Leftover cruft, harmless but real: on `/gtm-revenue-engine` and `/demand-gen-abm` the Living Workflow embed sits inside a wrapper frame named "Flywheel Anchor" (Agent residue). It is now in the CORRECT position (Capabilities section, then a section, then the flywheel, then a section, then Testimonial; same order as the clean CRM page). Leave it unless asked; if cleaning, move the embed out first, never delete the wrapper with the embed inside.

NOT done / regressed: Ibrahim UNPASTED the JSON-LD blocks; they are not on any page right now. The files in `seo/` are final and validated; re-add them to each page's End-of-head custom code when he is ready (each page gets its own block; they can sit alongside the flywheel snippet).

## 6. The fix round (your actual work, in priority order)

### Fix 1: mobile tap does not close the hero card reveal
On phones, tapping a hero card reveals its hidden body text (the hover reveal). Tapping the same card again does NOT hide it; it stays open. Required behavior: first tap opens, second tap on the same card closes, tapping a different card closes the previous and opens the new one. Root cause: the hero cards (`.hero-el` in the hero embeds) reveal `.hero-el-body` via `:hover`; on touch, the first tap sets sticky hover and there is no un-hover. Fix inside all three hero bundles (`embeds/revenue-hero.html`, `embeds/demand-hero.html`, `embeds/crm-hero.html`) AND the sandbox source (`styles/system.css` + whichever script hosts hero behavior): add a small touch-device script that toggles a class (e.g. `.is-open`) on tap and mirror the `:hover` reveal styles under that class, using `@media (hover: none)` so desktop hover is untouched. Cards are `<a>` tags; on touch the first tap must not navigate if the card has a link (check whether `.hero-el` has an href; if it does, first tap opens, second tap follows the link OR suppress navigation entirely on touch, ask Ibrahim which he wants). Test at 390px: tap opens, second tap closes, no sticky states. Then he re-pastes the three hero embeds (heights unchanged).

### Fix 2: rework the GTM Engine flywheel content (Andrew's non-negotiable)
Andrew's verdict on the revenue page: "with sales/gtm its very heavy on cold email still, we really have to change that, thats non negotiable" and the channel card's "PRIMARY" / "SKIP" chips "make us look like a cold email shop, need to go". He is right and Ibrahim agrees. This is a CONTENT rework of the revenue flywheel and the revenue hero's Channel strategy card, not a design rework:
- Kill the "PRIMARY" and "SKIP" chip framing everywhere it appears (revenue hero card 2 "Channel strategy" SVG in `revenue-engine.html` + `embeds/revenue-hero.html`, and any echo in the workflow embed's Send step). Channels should read as chosen-per-buyer, no channel ranked or dismissed.
- Rebalance the flywheel steps (`window.NEBOR_WORKFLOW` in `revenue-engine.html`, mirrored inside `embeds/revenue-workflow.html`) so the motion reads as full-funnel GTM, with email as one lane among several (LinkedIn, calls where buyers take them, nurture/retargeting hand-off to demand, events or community only if true). Steps live in a 9-step wheel: Define, Identify, Signal, Qualify, Enrich, Personalize, Send, Book, Learn. The Send/Personalize/Reach language is where the cold-email weight sits; rewrite descriptions, roles, and flow labels there first. Keep the phase structure and the cycle. Respect every content rule in section 3, keep each tool's role truthful, and remember: if the tool set changes, the tools grid on the page must change to match, at EVERY breakpoint (grid images were fixed per-breakpoint; a tool swap means logo work again, via the Framer Agent + Tools CMS if credits allow, otherwise Ibrahim).
- Andrew also thinks there are too many tools on the flywheel but explicitly deferred that ("we can change that in a later stage"). Do NOT reduce the tool count now.
- Deliverable: updated `revenue-engine.html` + rebuilt `embeds/revenue-workflow.html` and `embeds/revenue-hero.html`, pushed, links to Ibrahim to re-paste, heights re-verified locally at 1440/1200/810/390 before handing over (measure with iframes in the local preview; content height must fit the frame heights in `embeds/README.md`, update the README if they change).

### Fix 3: doubled-looking design elements on the flywheel step rail
On the flywheel, the step rail labels (Define ... Learn, and the phase arcs Find/Qualify/Reach/Book/Learn) have decorative elements next to them that render as if duplicated, most visibly on the currently highlighted step. Investigate `styles/stepper.css` and `scripts/stepper.js` (and the copies inside the three `-workflow` embeds): likely a pseudo-element or marker being rendered by both the base style and the active-state style, or a chevron/underline drawn twice once highlighted. Reproduce locally first at the exact widths, fix in the sandbox, verify, then port to all three workflow bundles. Do not change the visual design, just remove the duplication.

### Fix 4: link the three homepage cards
On the Framer HOME page there is a section "Three systems that power your entire revenue motion" with three cards (Sales Engine & GTM Execution / Demand Generation & Account-Based Growth / CRM & Revenue Operations) each with an Explore button. Ibrahim wants each card/button linked to its service page (`/gtm-revenue-engine`, `/demand-gen-abm`, `/crm-revops`) and found it difficult. These are native Framer elements: select each button, set its Link via the properties panel; if it is a component with a URL-only link prop, type the path directly (typing into the Link field works). While there, flag to Ibrahim that the first card still says "Sales Engine & GTM Execution" which clashes with the GTM Engine naming, but change nothing without his word.

### Fix 5: re-add the JSON-LD
When Ibrahim says go: each page's Settings > Custom Code > End of head gets its own block from `seo/` (revenue -> jsonld-revenue-engine.html, demand -> jsonld-demand-gen-abm.html, crm -> jsonld-crm-revops.html). They coexist fine with the flywheel snippet in the same box. Ibrahim pastes; you verify afterwards with Google's Rich Results Test once live.

### Fix 6: full verification pass, then publish
Before publish: on each of the three pages, at Desktop 1440, Desktop2 1200, Tablet 810, Phone 390 in Framer preview, verify: hero renders fully with no clipping and the CTA visible; CTA click glides to the flywheel; flywheel sits in its correct slot (after Capabilities, before Testimonial area); tools grid logos correct; switcher pill fits, correct label highlighted, clear of the Ask AI widget; no horizontal overflow anywhere. Publishing pushes the WHOLE Framer project live including anything Andrew has in flight, so Ibrahim presses Publish, not you.

## 7. Operating principles for this session

Verify everything yourself in preview before telling Ibrahim it is done; never relay an Agent success report unverified. When something looks wrong, measure before theorizing (local iframe measurements at exact widths settle most fights). Keep every embed edit mirrored between the sandbox source and the bundle. Commit and push after each coherent change with a plain, human commit message. If Framer disconnects, reload and re-verify your last edit actually saved. If a change is structural or destructive, stop and ask. Ibrahim will say "go" once; after that, run the full list without stopping, and report at the end with what changed, what you verified, and exactly what he needs to paste or click.

---
End of prompt.
