// Tool logo registry.
// Resolution order per tool:
//   1) `icon`   — simple-icons slug, rendered as SVG mask-image (color-tinted)
//   2) `domain` — fetch the tool's live favicon (real logo)
//   3) `fb`     — letter mark on a brand-colored disc (last resort)
// `desc` and `cat` describe what the tool does and its role in the stack
//   — used by stack chips on hover.
window.NEBOR_TOOLS = {
  hubspot:    { name: "HubSpot",        color: "#FF7A59", icon: "hubspot",
    cat: "CRM", desc: "All-in-one CRM that anchors most of our builds — pipeline, contacts, lifecycle, marketing automation, and reporting in one place. Where the source of truth lives." },
  salesforce: { name: "Salesforce",     color: "#00A1E0", icon: "salesforce",
    cat: "CRM", desc: "Enterprise CRM with the deepest customization surface. We build on it when teams need complex object models, territory rules, or strict permissions." },
  pipedrive:  { name: "Pipedrive",      color: "#1A1A1A", img: "./assets/tools/pipedrive.png",
    cat: "CRM", desc: "Lightweight, sales-rep-friendly CRM. We pick it for smaller teams who want fast adoption and a cleaner deal-pipeline UX than HubSpot." },
  apollo:     { name: "Apollo",         color: "#47423D", domain: "apollo.io", fb: "Ap",
    cat: "Data", desc: "B2B prospecting database with verified contact data, intent signals, and a built-in sequencing tool. Our default for TAM mapping and net-new sourcing." },
  clay:       { name: "Clay",           color: "#181818", domain: "clay.com", fb: "Cl",
    cat: "Enrichment", desc: "Spreadsheet-meets-API platform that orchestrates dozens of data providers in one waterfall. The backbone of every enrichment workflow we build." },
  ocean:      { name: "Ocean.io",       color: "#2563EB", domain: "ocean.io", fb: "Oc",
    cat: "Lookalike", desc: "Lookalike company search across 35M companies and 330M data points. Show it your best closed-won customers and it returns companies that look and behave like them, plus the likely decision-makers. A Nebor partner and the core of this play." },
  bettercontact: { name: "BetterContact", color: "#6C5CE7", domain: "bettercontact.rocks", fb: "Bc",
    cat: "Enrichment", desc: "Waterfall enrichment across 20+ providers for verified emails and phone numbers, with 4-layer validation so you only pay for valid contacts. Email find rates of 60 to 70%, phone discovery near 88%." },
  hunter:     { name: "Hunter.io",      color: "#FA5320", domain: "hunter.io", fb: "Hu",
    cat: "Email", desc: "Email-finder + verifier. We use it as the deliverability gate before any outbound send to keep bounce rates near-zero." },
  builtwith:  { name: "BuiltWith",      color: "#004FFF", domain: "builtwith.com", fb: "Bw",
    cat: "Tech data", desc: "Detects what tools a company runs (CMS, analytics, CRM, etc.). We feed it into ICP scoring so reps target accounts with compatible stacks." },
  smartlead:  { name: "Smartlead",      color: "#6E58F1", domain: "smartlead.ai", fb: "Sm",
    cat: "Sending", desc: "Cold-email infrastructure with multi-domain rotation, warm-up, and reply detection. Our usual choice for high-volume outbound at scale." },
  instantly:  { name: "Instantly",      color: "#4580F7", domain: "instantly.ai", fb: "In",
    cat: "Sending", desc: "Outbound email platform with AI-driven send pacing and inbox rotation. Picked when teams want a simpler interface than Smartlead." },
  lemlist:    { name: "Lemlist",        color: "#DD637F", domain: "lemlist.com", fb: "Lm",
    cat: "Sending", desc: "Outbound platform with strong personalization features (variable images, video). Picked when creative-led, high-touch sequences matter most." },
  linkedin:   { name: "LinkedIn",       color: "#0A66C2", icon: "linkedin",
    cat: "Channel", desc: "The single biggest B2B graph. We wire it for LinkedIn ad targeting, LinkedIn Sales Nav prospecting, and synchronized social-touch motions." },
  lagrowth:   { name: "La Growth",      color: "#FF645A", domain: "lagrowthmachine.com", fb: "La",
    cat: "LinkedIn", desc: "Multi-channel automation tool focused on LinkedIn (connection requests, messages) coordinated with email. Used when LinkedIn is the lead channel." },
  n8n:        { name: "n8n",            color: "#EA4B71", icon: "n8n",
    cat: "Automation", desc: "Self-hostable workflow automation platform. The default for any non-trivial workflow — branching logic, custom code nodes, long-running runs." },
  zapier:     { name: "Zapier",         color: "#FF4F00", icon: "zapier",
    cat: "Automation", desc: "Lightweight glue for one-step triggers between SaaS apps. We use it for simple 'X happens → do Y' wiring where n8n would be overkill." },
  make:       { name: "Make",           color: "#6D00CC", icon: "make",
    cat: "Automation", desc: "Visual orchestration canvas. Picked when ops teams want to operate workflows themselves through a more graphical interface than n8n." },
  openai:     { name: "OpenAI",         color: "#000000", icon: "openai",
    cat: "AI", desc: "Foundation model API. Used for personalization drafting, intent classification on replies, summarization of public signals, and lightweight agent loops." },
  anthropic:  { name: "Anthropic",      color: "#D97757", icon: "anthropic",
    cat: "AI", desc: "Claude API. Our default for high-context reasoning — pre-meeting briefs, battle-card refresh, complex tone-of-voice rewrites, and long-document synthesis." },
  perplexity: { name: "Perplexity",     color: "#1FB8CD", icon: "perplexity",
    cat: "AI", desc: "AI search with live web access + citations. We wire it into research workflows when reps need fresh, sourced context on accounts and contacts." },
  slack:      { name: "Slack",          color: "#4A154B", domain: "slack.com", fb: "Sl",
    cat: "Notify", desc: "Where reps actually live. We surface qualified replies, lead routes, deal alerts, and weekly digests directly into the right Slack channels." },
  chilipiper: { name: "Chili Piper",    color: "#FF5721", domain: "chilipiper.com", fb: "Cp",
    cat: "Routing", desc: "Real-time lead routing + meeting scheduler. Wired in when speed-to-rep matters and round-robin / territory rules are non-trivial." },
  calendly:   { name: "Calendly",       color: "#006BFF", icon: "calendly",
    cat: "Booking", desc: "Self-serve meeting scheduler. Our backup booking link for inbound and a fallback when Chili Piper's overhead isn't justified." },
  google:     { name: "Google",         color: "#4285F4", icon: "google",
    cat: "Workspace", desc: "Workspace anchors email infrastructure (SPF, DKIM, DMARC), shared docs, and the calendar layer most outbound systems plug into." },
  notion:     { name: "Notion",         color: "#000000", icon: "notion",
    cat: "Docs", desc: "Source of truth for runbooks, ICP definitions, battle cards, and process docs. Often the system that AI agents read from when generating context." },
  webflow:    { name: "Webflow",        color: "#146EF5", icon: "webflow",
    cat: "Web", desc: "Web platform we wire dynamic landing pages on. Best when marketing wants to ship variants without engineering and own the CMS." },
  framer:     { name: "Framer",         color: "#0055FF", icon: "framer",
    cat: "Web", desc: "Modern site builder with stronger animation primitives. Picked for landing pages where motion + design polish are part of the pitch." },
  ahrefs:     { name: "Ahrefs",         color: "#0075FF", icon: "ahrefs",
    cat: "SEO", desc: "Keyword research, backlink analysis, and competitor SEO intelligence. Feeds the content + paid strategy with real search-demand data." },
  semrush:    { name: "Semrush",        color: "#FF642D", icon: "semrush",
    cat: "SEO", desc: "All-in-one search marketing toolkit. Picked when teams want SEO + paid keyword data in a single subscription." },
  googleads:  { name: "Google Ads",     color: "#4285F4", icon: "googleads",
    cat: "Paid", desc: "Search + display + YouTube ads, audience-list targeted off your CRM. We instrument every campaign down to the pipeline number." },
  meta:       { name: "Meta",           color: "#0866FF", icon: "meta",
    cat: "Paid", desc: "Facebook + Instagram ads. Used for retargeting and lookalikes off closed-won audiences exported from the CRM." },
  ga:         { name: "GA4",            color: "#F9AB00", icon: "googleanalytics",
    cat: "Analytics", desc: "Source-of-truth on session + acquisition channel. We wire it into the data layer so attribution joins back to deal records cleanly." },
  mixpanel:   { name: "Mixpanel",       color: "#7856FF", icon: "mixpanel",
    cat: "Analytics", desc: "Product + content engagement analytics. Surfaces depth/recency/repeat-visit signals that feed scoring models." },
  segment:    { name: "Twilio Segment", color: "#F22F46", icon: "twilio",
    cat: "CDP", desc: "Customer data platform that stitches every event source into one identity graph. Routes the unified record to CRM, ads, and the warehouse." },
  airtable:   { name: "Airtable",       color: "#18BFFF", icon: "airtable",
    cat: "Database", desc: "Spreadsheet-as-database. Used as a staging surface for data migrations, manual reconciliation, and lightweight ops dashboards." },
  bigquery:   { name: "BigQuery",       color: "#669DF6", icon: "googlebigquery",
    cat: "Warehouse", desc: "Google's serverless data warehouse. Where we model the unified data layer behind reports, scoring, and reverse-ETL." },
  snowflake:  { name: "Snowflake",      color: "#29B5E8", icon: "snowflake",
    cat: "Warehouse", desc: "Cloud data warehouse alternative. Picked when teams already standardize on Snowflake or need cross-cloud + advanced governance." },
  metabase:   { name: "Metabase",       color: "#509EE3", icon: "metabase",
    cat: "BI", desc: "Open-source BI tool. Used for self-serve exploration by ops teams who shouldn't be blocked on a Looker license." },
  looker:     { name: "Looker",         color: "#4285F4", icon: "looker",
    cat: "BI", desc: "Enterprise BI with strong semantic modelling. Used for leadership dashboards where defined metrics need to be governed centrally." },
  dbt:        { name: "dbt",            color: "#FF694A", icon: "dbt",
    cat: "Transform", desc: "SQL-based data transformation framework. Where we model raw warehouse data into the account-grain marts everything else reads from." },
  retool:     { name: "Retool",         color: "#3D3D3D", icon: "retool",
    cat: "Internal tools", desc: "Internal-app builder. Used for ops admin surfaces — manual override panels, approval queues, edge-case data correction." },
  typeform:   { name: "Typeform",       color: "#262627", icon: "typeform",
    cat: "Forms", desc: "Conversational forms with branching logic. Captures structured input from inbound leads and enriches on submit." },
  intercom:   { name: "Intercom",       color: "#1F8DED", icon: "intercom",
    cat: "Support", desc: "Chat + messaging on the website. Wired in for high-intent visitor capture and to surface qualified conversations into the CRM." },
  clearbit:   { name: "Clearbit",       color: "#091135", domain: "clearbit.com", fb: "Cb",
    cat: "Enrichment", desc: "Reverse-IP + B2B enrichment (now part of HubSpot). Turns anonymous web traffic into known company records the CRM can act on." },
  census:     { name: "Census",         color: "#5F1E69", domain: "getcensus.com", fb: "Ce",
    cat: "Reverse ETL", desc: "Pipes modelled warehouse data back into the CRM, ad platforms, and tools where reps live. Now part of Fivetran." },
  hightouch:  { name: "Hightouch",      color: "#40DE9E", domain: "hightouch.com", fb: "Ht",
    cat: "Reverse ETL", desc: "Reverse-ETL platform that syncs warehouse models into operational tools. Picked when teams already have a data team in place." },
  rss:        { name: "RSS Feeds",      color: "#EE802F", icon: "rss",
    cat: "Source", desc: "The publications, business journals, and press-release aggregators we monitor. Each new article is a potential buying signal the workflow captures the moment it's published." },
  leadsfactory:{ name: "LeadsFactory.io", color: "#2F6BFF", domain: "leadsfactory.io", fb: "Lf",
    cat: "Contacts", desc: "Contact-enrichment tool that finds verified decision-makers by job function (workplace, facilities, corporate real estate) rather than by name. Returns contacts via webhook into Clay." },
  heyreach:   { name: "HeyReach",       color: "#7A5CFF", domain: "heyreach.io", fb: "Hr",
    cat: "LinkedIn", desc: "LinkedIn outreach automation built for agencies and multi-account sending. We wire it as the LinkedIn arm of automated follow-up once a qualified signal lands." },
  lemlist:    { name: "Lemlist",        color: "#0E2A5A", img: "./assets/tools/lemlist.png",
    cat: "Outreach", desc: "Cold-email and multichannel outreach platform. An alternative email arm alongside Instantly when a qualified signal lands." },
  leadmagic:  { name: "LeadMagic",      color: "#6C4DF6", img: "./assets/tools/leadmagic.png",
    cat: "Enrichment", desc: "Enrichment provider for firmographic and contact data. One step of the waterfall Clay runs to fill out an account." },
  fullenrich: { name: "FullEnrich",     color: "#1F2937", img: "./assets/tools/fullenrich.png",
    cat: "Enrichment", desc: "Waterfall enrichment that fans a lookup across many providers and returns the best hit. Part of Clay's enrichment chain." },
  findymail:  { name: "Findymail",      color: "#2563EB", img: "./assets/tools/findymail.png",
    cat: "Email finding", desc: "Finds and validates work emails for the decision-makers sourced for an account." },
  bounceban:  { name: "BounceBan",      color: "#16A34A", img: "./assets/tools/bounceban.png",
    cat: "Verification", desc: "Email verification that confirms an address is deliverable before any outreach goes out." },
  debounce:   { name: "DeBounce",       color: "#2DA9E1", img: "./assets/tools/debounce.png",
    cat: "Verification", desc: "Email-list validation that removes invalid and risky addresses, protecting deliverability." },
  chatgpt:    { name: "ChatGPT",        color: "#10A37F", img: "./assets/tools/chatgpt.png",
    cat: "AI", desc: "OpenAI's model. One of the LLMs that can sit behind Claygent to read and structure each article." },
  claude:     { name: "Claude",         color: "#D97757", img: "./assets/tools/claude.png",
    cat: "AI", desc: "Anthropic's model. One of the LLMs that can sit behind Claygent to read articles and write the lead summary." }
};

window.toolIconUrl = function(slug) {
  const t = window.NEBOR_TOOLS[slug];
  if (!t || !t.icon) return null;
  return `https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/${t.icon}.svg`;
};
window.toolFaviconUrl = function(slug) {
  const t = window.NEBOR_TOOLS[slug];
  if (!t || !t.domain) return null;
  return `https://www.google.com/s2/favicons?domain=${t.domain}&sz=64`;
};

// Render the inner mark (no surrounding disc) at the requested pixel size.
// Used by every chip/node/pill renderer so the resolution rules stay in one place.
window.toolMarkInner = function(slug, size) {
  size = size || 16;
  const t = window.NEBOR_TOOLS[slug];
  if (!t) return '';
  if (t.img) {
    return `<img class="tfavi" src="${t.img}" alt="${t.name}" width="${size}" height="${size}" loading="lazy" />`;
  }
  if (t.icon) {
    return `<span class="ti" style="--ti-url:url('${window.toolIconUrl(slug)}');--ti-color:${t.color};--ti-size:${size}px"></span>`;
  }
  if (t.domain) {
    return `<img class="tfavi" src="${window.toolFaviconUrl(slug)}" alt="${t.name}" width="${size}" height="${size}" loading="lazy" />`;
  }
  // Last-resort letter mark
  const disc = size + 4;
  return `<span class="fb" style="background:${t.color};font-size:${Math.max(8, size-6)}px;width:${disc}px;height:${disc}px;display:inline-grid;place-items:center;border-radius:50%;color:#fff;font-family:var(--mono);font-weight:700;letter-spacing:-0.02em">${t.fb || t.name.slice(0,2)}</span>`;
};

// Render a circular tool mark — logo on a white disc background.
window.toolMark = function(slug, size) {
  size = size || 22;
  const t = window.NEBOR_TOOLS[slug];
  if (!t) return '<span class="tlogo-mark"></span>';
  return `<span class="tlogo-mark" style="background:#fff;">${window.toolMarkInner(slug, Math.round(size * 0.72))}</span>`;
};

// Render a chip with logo + name
window.toolLogo = function(slug, opts) {
  opts = opts || {};
  const t = window.NEBOR_TOOLS[slug];
  if (!t) return `<span class="tlogo unk">${slug}</span>`;
  const showLabel = opts.showLabel !== false;
  return `<span class="tlogo" data-tool="${slug}">${window.toolMark(slug, 22)}${showLabel ? `<span class="tlogo-name">${t.name}</span>` : ''}</span>`;
};
