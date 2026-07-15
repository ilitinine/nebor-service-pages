# Delivery-team feedback · CRM & RevOps page
Source: "website visual fedback" Google Doc, CRM/RevOps tab (t.l0xxkqjjks1x), retrieved 2026-07-15.

## The three banners — Architect → Unify → Activate

### Banner 1 — Architect → how we build it
- CRM-specialist depth up front: object model, pipelines, lifecycle stages, custom properties;
  fresh build or fixing a messy instance, no rip-and-replace. Decision: how the system should be
  structured around how the business actually sells.
- Sentence: "We structure your CRM around how your business actually sells."
- Visual: the system being DESIGNED, not a populated pipeline (current banner shows Stripe $24k /
  Figma $32k board = output, not architecture). Show stages being defined, lifecycle mapped,
  custom properties configured, the object model taking shape. Hero = the structure being laid
  down. Tools as faint labels.

### Banner 2 — Unify → how we make it trustworthy
- Dedupe, validation, hygiene, enrichment, attribution wired in → one record, one source of truth.
  Decision: what counts as the truth and how the system keeps it true automatically. Replaces the
  current middle banner (account-intelligence feed = demand/signal work, belongs on other pages).
- Sentence: "We turn scattered data into one record every team can trust."
- Visual: three messy duplicate records for one company MERGING into one clean enriched record —
  the merge is the hero. Then marketing/sales/success all reading from that one record. DROP the
  logo wall (HubSpot, Klaviyo, Salesforce, Outreach, Gong, Clearbit, Zendesk…).

### Banner 3 — Activate → how it drives revenue (the missing pillar, most important)
- The clean foundation runs the motion: routing, scoring enforcement, lifecycle automation,
  workflows firing off real signals, dashboards leadership trusts. Connects to the other two
  services: RevOps enforces rules and fires triggers, the demand pages execute.
- Sentence: "We put that data to work — routing leads, triggering workflows, and driving
  forecasts your team trusts."
- Visual: the data ACTING. A lead routing itself to the right rep, a stage transition enforced,
  a workflow firing off a live signal, a forecast rolling up. Hero = the system taking action on
  its own. Keep the soft sideways link to Sales Engine / Demand Gen.

### How the three fit
Architect → Unify → Activate: build the system, make it trustworthy, put it to work. Current
banners all stuck on the data half; none shows data doing anything. Lead with the build, prove
the trust, end on the system driving revenue.

## The nine capabilities
Same rules as other pages: technical titles + plain one-liner + visual carries the meaning.
TOOLS COME OFF ENTIRELY here — depth shows through what panels show, not logo chips.
Order = the three-pillar story. Four borrowed demand/sales caps get cut; deep RevOps promoted in.

### ARCHITECT — build the system
- 01 CRM Implementation & Configuration — "We set up your CRM — objects, pipelines, lifecycle
  stages, properties — around how your business actually operates, whether that's a fresh build
  or optimizing the setup you already have." Visual: the system being designed; stages defined,
  lifecycle mapped, properties configured, object model taking shape. Hero = structure being laid
  down, not a full pipeline screenshot.
- 02 Migration & Consolidation — "We move you off legacy tools or bring separate instances into
  one clean system — without losing a single record or deal along the way." Visual: records
  merging from old system into the new model, every touchpoint carried across. Hero =
  nothing-gets-lost, the migration fear shown handled.
- 03 CRM Optimization & Performance Tuning — "We audit what's underperforming and rebuild the
  workflows, automations and reporting until they're something your team can rely on again."
  Visual: before-and-after; underperforming flagged, then rebuilt clean. Hero = the repair.

### UNIFY — make it trustworthy
- 04 Data Hygiene & Cleanup — "We dedupe, normalize and validate your data as it comes in — the
  clean foundation everything else depends on." Visual: three duplicates for one company merging
  into a single clean record. The merge is the hero.
- 05 Dynamic Enrichment & Live Data — "Your CRM keeps itself current as the world changes — job
  changes, promotions, funding, tech moves flow in on their own, so your records never quietly go
  stale." Visual: a static record coming alive; "VP hired," "Series C raised" updating in real
  time. Hero = static becoming dynamic, a database that maintains itself.
- 06 Integration & Data Flow — "We connect marketing, sales, product and success so every team
  works from the same source of truth — not separate tools quietly disagreeing with each other."
  Visual: silos vs connected; disconnected islands on one side, same tools wired into one flowing
  system on the other. The contrast is the hero.

### ACTIVATE — put it to work
- 07 Workflow Automation — "The system does the manual work for you — the right actions fire
  automatically off real events in the CRM, instead of waiting for someone to remember them."
  Visual: an event lands, a chain fires on its own (field updates, task created, notification
  out). Hero = no hands on it.
- 08 Lead Scoring & Routing — "Leads get scored on fit and intent, then routed to the right rep
  by rules the system enforces — every time, not whenever someone gets around to it." Visual: a
  lead scored, then routed to the right owner automatically.
- 09 Attribution & Pipeline Reporting — "You see exactly what's driving pipeline and revenue — in
  dashboards and a forecast your leadership actually trusts on Monday morning." Visual:
  pipeline-by-source rolling up into a forecast number. Home of the other pages' "rolls up in
  RevOps" nods.

### What moved and why
Cut the four borrowed demand/sales caps (Signal Tracking, Research Systems, demand halves of old
automation + scoring). Promoted Migration, Integration & Data Flow, Attribution & Reporting.
Enrichment reframed as the living-database story. Workflow automation pulled into its own module
(engine of the Activate half). Result: shows the deep engineering that makes "CRM specialists,
not just Clay" true on screen.

## Living workflow — LINEAR, not a flywheel (deliberate)
- RevOps does not loop: it's a build you do once, in order, then it stays built and compounds.
  A wheel would contradict "not a quarterly cleanup project." The two demand services spin; the
  foundation is the solid linear build they spin on top of.
- Current flow (Audit → Architect → Migrate → Integrate → Automate → Report) has good bones and
  strong copy ("hygiene runs on every write," "38 workflows live, 22 hrs/wk reclaimed").
- Fix 1 — align to the three pillars: the workflow's spine becomes Architect → Unify → Activate,
  with the NINE CAPABILITIES as the steps inside them (same nine things shown two ways: static
  list in caps section, running build in the workflow). One vocabulary top to bottom.
- Fix 2 — gentle dividers between pillars, not walls: light rule or margin phase label; one
  continuous build top to bottom; chapter breaks in one story, the line keeps running through.
- Fix 3 — strip the tools, keep the detail: OPPOSITE of the demand pages. This page sells depth;
  the flow's real detail is the strongest evidence ("records merged with nothing lost in the
  cutover," "reverse-ETL pipes the warehouse back into the CRM where reps live," "lifecycle drift
  surfaced before we touch anything"). Substance stays; the walls of tool chips (HubSpot,
  Salesforce, Metabase, Notion, Retool, Airtable, OpenAI, BigQuery, dbt, n8n…) go. Max ONE faint
  label per step. One sharp line of real detail per step. Strip the clutter, not the substance.
- The ending: don't dead-end at Report, don't loop back to Audit. Report is where the asset
  starts compounding — the final beat opens FORWARD into ongoing operation. End state: "built,
  and now compounding," shown as the system running live.
