# Delivery-team feedback · Revenue/GTM page
Source: "website visual fedback" Google Doc, Revenue/GTM tab (read 2026-07-02).
Applies to: revenue-engine-v2.html

## Framing
All three hero visuals answer one buyer question each, in sequence:
**who do we go after → how do we reach them → how does it run** (GTM arc: find → reach → run).
Each pillar is a strategic decision a GTM partner makes, all at the same altitude.
Deliverability was pulled from pillar 2: it's execution plumbing, not a strategic
decision — it lives downstream inside the capabilities. This makes us read as a GTM
partner, not an email shop.

## Visual 1 — TAM mapping (left) → WHO
- Kill the tool ring around "Clay + HubSpot". A logo cloud says "which tools we use",
  not what a TAM map is. Drop the Clay+HubSpot lockup as centerpiece.
- Show the actual mapping = **defining and narrowing a market**, top to bottom:
  1. Total addressable market (big, top) — e.g. 48k
  2. Firmographic (size/industry/revenue) — 3.2k
  3. Technographic (tech stack) — 2.8k
  4. Geographic (region/language) — 2.3k
  5. **Intent signals** — 1.9k → the set of accounts **ready to buy now** at the bottom
- Descending numbers next to each layer — the shrinking numbers ARE the map.
- **Intent layer is the hero** — different/warm color, set apart; ties to "the moment
  they're ready to buy."
- Tools secondary: one source per data type as a small side-label (e.g. Ocean.io for
  firmographic) + a "+ custom scrapes" tag. Clay runs through as a subtle orchestration
  layer, not a center node.
- Optional (to weigh): end the funnel on **contacts at ready accounts** (persona layer:
  title, seniority, department, decision-maker vs influencer) instead of accounts.
  If too tall, merge geographic into firmographic (both static filters).

## Visual 2 — middle: deliverability → CHANNEL STRATEGY → HOW WE REACH
- Pillar = channel strategy: deciding which channels a client's GTM should run on,
  based on how their buyers actually buy. Strategy first, execution as the add-on
  (some GTM clients buy only the channel decision).
- Visual:
  - Start from the buyer, not a channel/tool. Left = buyer profile + how they buy
    (enterprise, considered purchase, long cycle, where they're active).
  - Channels on the right, matched to fit. Strong-fit highlighted "primary";
    weak-fit visibly DIMMED and labeled "skip". The dimming is the credibility hero —
    deliberately recommending against channels is what a single-channel agency can't do.
  - Show only channels we'd actually run; skips are plausible misfits, not strawmen.
    Don't imply a five-channel orchestra we don't operate. NOT a logo wall.
- Headline direction: "Reach buyers where they actually are" or "The right channels
  for how your market buys." Avoid "multi-channel outreach". Sub-line: "we map each
  segment to the channels that convert — and run the sequences if you want us to."
- Same card chrome as visuals 1+3, green status pill, live feel; connectors draw in /
  fit channels light up on scroll.
- Use a real, clearly-enterprise buyer example — no placeholders.

## Visual 3 — AI workflows (right) → HOW IT RUNS
Keeps its role: the engine that executes it all at scale, alongside the rep.

## 9 capabilities (structure stays; two problems fixed)
Problem A: four of nine belong to other services (lead routing → RevOps; pipeline
stages → RevOps; attribution/reporting → RevOps + Demand Gen). Keep the overlaps but
reframe each as the outbound job it actually is, with an elegant sideways nod where it
touches another service ("flows / extends / syncs into"), never "that bit isn't us."
Refer sideways, not away.
Problem B: the engine got buried at #3. It's the product — move it up to 02, give it
the biggest, most alive visual (the one panel that never stops moving). MAYBE SHOW
SOME OUTBOUND PLAYS.
Business & Market Analysis: one-time strategic deliverable, not an always-on
capability → becomes the foundation of 01 (produces the ICP); also the Diagnose beat
in "how we work."

New list:
- **01 — GTM Strategy, ICP Definition & TAM Mapping** (strategy). "Define your ICP,
  map your TAM, narrow to the accounts worth reaching now." Visual: the shrinking
  funnel (mirrors hero 1), intent layer = warm hero. B&MA lives here as the win/loss
  groundwork under the ICP.
- **02 — AI-Powered GTM Workflows Built Around You** (system). THE ANCHOR. "The
  engine: pull, enrich, score, sync — running daily inside your stack." Keep the live
  run panel (pull/enrich/score/sync, 96.4% match, next in 23h) — biggest and most
  central thing in the block. Deliverability folds in as one quiet row
  (domain health, 98.4%, monitored) — not its own capability.
- **03 — Account Scoring & Prioritisation** (scoring). "Fit and intent scored, so reps
  work the right accounts first." Keep fit/intent/engagement bars; CUT the "Routed to
  Sara / Slack ping" rows (that's RevOps). Second line: scores flow straight into the
  CRM your team runs on.
- **04 — Channel Strategy** (channels). "The right channels for how your market buys —
  and the ones to skip." Buyer left, channels right, good-fit lit, misfits dimmed +
  "skip". Second line: for account-based segments this extends into full ABM.
- **05 — Signal-Based Personalisation** (messaging). "Sequences written off real
  signals, not mail-merge." Visual: one signal → the line it writes ("hired 4 SDRs" →
  the sentence that comes out) — three stacked. Copywriting as intelligence; zero
  cold-email language.
- **06 — Sales Enablement & Playbook Development** (playbook). "Battle cards and
  playbooks your reps actually use." Keep the Workato battle card exactly as is.
- **07 — Pre-Meeting Intelligence Automation** (context). "Every call starts with the
  brief already done." Keep the Morrow Labs brief card as is — most differentiated
  thing we've got.
- **08 — Mid-Funnel Orchestration** (ops). "Sequences branch on replies and behaviour,
  so no lead stalls mid-conversation." Drop SQL/Discovery/Demo/Closed-won (RevOps).
  Show reply-based branching: replied → route it; no open in six days → switch
  channel; booked → stop. Second line: deal stages stay in sync with your live pipeline.
- **09 — Performance Reporting** (metrics). "Every meeting stamped to source, signal
  and sequence." Keep pipeline-by-source bars; the Looker/BigQuery/€514K roll-up moves
  to the RevOps page — keep the honest outbound slice (we stamp every record).
  Second line: every touch feeds your full revenue attribution.

Summary of moves: cut lead routing + pipeline stages (both → RevOps) and
deliverability-as-a-box (now a row inside the engine). Reframed scoring, mid-funnel,
reporting as outbound-native w/ clean handoffs. Added Channel Strategy +
Signal-Based Personalisation. B&MA → 01 + Diagnose. Engine → 02 as anchor.
Enablement + pre-meeting intel untouched.

## Living workflow → split in two: steps line + FLYWHEEL
Current problems: tool-heavy (every step = 3 rows of tool chips — Apollo, BuiltWith,
Clay, OpenAI, Smartlead, La Growth, Instantly, n8n, Chili Piper, HubSpot; tools are
the medium not the story) and it DEAD-ENDS at Book (a pipeline, not a flywheel —
literally contradicts "systems compound, every week is faster than the last").

The approach:
1. Keep a simple LINE of steps as the explainer — teaches the sequence; a line is the
   right shape for a sequence.
2. Underneath, the living workflow becomes the FLYWHEEL — its job is to prove the
   thing is alive and compounds. One explains, one proves.

Flywheel spec:
- Three loud phase labels: **FIND, REACH, RUN** — same words as the three banners up
  top. Engine sits at the hub → "AI POWERED WORKFLOWS" (the engine is the center;
  everything runs off it). The three phases cycle around the engine.
- Six operational steps as quiet live detail, two per phase: Find{Identify, Enrich},
  Reach{Personalize, Send}, Run{Qualify, Book}. Three loud, six quiet.
- **HERO = the loop-back arc**: Book (last step) curves back around the engine to
  Identify. That arc carries the compounding — booked meetings teach the engine which
  accounts to find next (same source/signal/sequence stamp as capability 09). Make
  that arc the loudest line on screen — if someone screenshots one piece, it's that.
- Keep the live feel: green "running" pill, ticking counter — put the counter IN THE
  HUB so it reads as the engine's output climbing, not a total at a funnel's bottom.
- Tools recede to one faint label per step (the way the TAM funnel does it).
- Book = where a meeting becomes a real pipeline record — one soft nod to RevOps
  there; flow, not redirect: the booked meeting lands in your live pipeline.

## Other tabs in the doc (not yet read)
- Demand gen/ABM tab
- Tab 3
