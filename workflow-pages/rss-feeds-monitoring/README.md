# RSS Signal Monitoring — Living Workflow

Self-contained Living Workflow variant for the Nebor website, built on the reference
"Living Workflow" section. Source: the blog post *"Clay + n8n + HubSpot +
LeadsFactory.io: How to build an RSS feeds monitoring workflow that captures buying
signals."*

## Self-contained

Everything this page needs is vendored under `assets/` — it references no files outside
this folder and can be moved or deployed anywhere as one unit. It does **not** touch the
repo's reference `workflow/` folder or root service pages.

```
rss-feeds-monitoring/
  index.html          ← header + <section id="workflow"> + inline NEBOR_WORKFLOW (7 steps)
  assets/
    system.css        ← vendored; adds the .tier-signal (cyan) theme at the end
    workflow.css      ← vendored, unmodified
    workflow.js       ← vendored renderer, unmodified
    tools.js          ← vendored; adds rss, leadsfactory, heyreach tool entries
```

## Steps

`Monitor → Extract → Score → Enrich → Find → Route → Outreach`

The 7th step (Outreach via Instantly + HeyReach) reflects the post's optional
"run it further" automation.

## Theme

Body class `tier-signal` (cyan / data-signal energy), appended to the vendored
`system.css` so the reference tiers stay untouched.

## Preview

Served from `/tmp/service-page-design` (macOS TCC blocks serving from Downloads):
`http://localhost:<port>/workflow-pages/rss-feeds-monitoring/`
