// The explainer line: the 9 steps as a phase-grouped sequence above the
// flowchart. One explains (this line), one proves (the flowchart below).
// Clicking a step jumps to its node on the canvas. Plus the live counter.
(function () {
  const stepsEl = document.getElementById('wf-steps');
  const data = window.NEBOR_WORKFLOW || [];
  if (!stepsEl || !data.length || !window.toolMarkInner) return;
  const esc = s => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  // step index -> the fcx node id it lands on
  const STEP_TO_NODE = ['define', 'input', 'score', 'enrich', 'summarize', 'ch_email', 'qualify', 'win', 'learn'];
  const PHASE_META = {
    Find:  { key: 'find',  sub: 'who we go after' },
    Reach: { key: 'reach', sub: 'how we reach them' },
    Run:   { key: 'run',   sub: 'how it runs, books, and learns' }
  };

  // group consecutive steps by phase
  const groups = [];
  data.forEach((d, i) => {
    if (!groups.length || groups[groups.length - 1].phase !== d.phase) groups.push({ phase: d.phase, items: [] });
    groups[groups.length - 1].items.push({ d, i });
  });

  let html = '';
  groups.forEach((g, gi) => {
    const m = PHASE_META[g.phase] || { key: '', sub: '' };
    if (gi) html += '<span class="wf-phase-sep" aria-hidden="true">&rarr;</span>';
    const chips = g.items.map(({ d, i }) => {
      const logos = (d.tools || []).slice(0, 3).map(sl => '<span class="wf-step-logo">' + window.toolMarkInner(sl, 13) + '</span>').join('');
      return '<button class="wf-step" data-node="' + STEP_TO_NODE[i] + '" type="button">' +
        '<span class="wf-step-num">' + String(i + 1).padStart(2, '0') + '</span>' +
        '<span class="wf-step-name">' + esc(d.step) + '</span>' +
        '<span class="wf-step-logos">' + logos + '</span></button>';
    }).join('');
    html += '<div class="wf-phase wf-phase--' + m.key + '">' +
      '<div class="wf-phase-head"><b>' + esc(g.phase) + '</b><span>' + esc(m.sub) + '</span></div>' +
      '<div class="wf-phase-steps">' + chips + '</div></div>';
  });
  stepsEl.innerHTML = html;

  stepsEl.addEventListener('click', e => {
    const btn = e.target.closest('.wf-step');
    if (!btn) return;
    const node = document.querySelector('.fcx-node .fcx-card'); // ensure canvas exists
    const target = document.querySelector('.fcx-node[data-node-hook="' + btn.dataset.node + '"]') ||
                   window.__fcxNode && window.__fcxNode(btn.dataset.node);
    stepsEl.querySelectorAll('.wf-step').forEach(s => s.classList.toggle('current', s === btn));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });

  // live counter ticking in the flowchart cap
  const counter = document.getElementById('wf-fc-count');
  if (counter) {
    let n = 1300;
    setInterval(() => { n += 1 + Math.floor(Math.random() * 3); counter.textContent = n.toLocaleString('en-US') + ' engine actions today'; }, 3200);
  }
})();

// Living workflow · standing spine + Clay hub flowchart (#fcx)
// Renderer ported verbatim from the Nebor workflow-page design system
// (signal-led-outbound). Only the NODES / WIRES / TOOLS data is authored for
// THIS page: the Sales Engine & GTM Execution motion, FIND -> REACH -> RUN,
// with the amber Learn loop-back so the system compounds and never dead-ends.
(function () {
  const canvas  = document.getElementById('fcx-canvas');
  const svg     = document.getElementById('fcx-wires');
  const nodesEl = document.getElementById('fcx-nodes');
  const pillsEl = document.getElementById('fcx-pills');
  const scroll  = document.querySelector('.fcx-scroll');
  if (!canvas || !svg || !nodesEl || !window.toolMarkInner) return;
  const NS = 'http://www.w3.org/2000/svg';
  const esc = s => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const logo = (s, sz) => window.toolMarkInner(s, sz || 14);

  // What each tool IS (hover shows this + its role in this build).
  const TOOLS = {
    nebor:     { name: 'Nebor',      what: 'Your go-to-market partner, the team that designs, builds, and runs this system with you.' },
    anthropic: { name: 'Claude',     what: 'Anthropic\'s Claude, the reasoning layer: it reads win/loss, writes the ICP, drafts copy and briefs, and runs the learning pass.' },
    openai:    { name: 'ChatGPT',    what: 'OpenAI\'s ChatGPT, used for high-volume classification and drafting.' },
    clay:      { name: 'Clay',       what: 'An AI-driven spreadsheet that connects to many data sources and runs AI research on every account.' },
    n8n:       { name: 'n8n',        what: 'Open-source automation that catches signals around the clock and moves data between apps.' },
    hubspot:   { name: 'HubSpot',    what: 'A CRM: the database where your team stores companies, contacts, and deals.' },
    salesforce:{ name: 'Salesforce', what: 'A CRM, like HubSpot. The same records can sync here instead.' },
    zoominfo:  { name: 'ZoomInfo',   what: 'A B2B database of companies, org charts, and direct dials.' },
    apollo:    { name: 'Apollo',     what: 'A B2B prospecting database with verified contact data.' },
    builtwith: { name: 'BuiltWith',  what: 'Detects the tools a company\'s website runs on.' },
    datanyze:  { name: 'Datanyze',   what: 'Technographic data on what software companies run and spend.' },
    bombora:   { name: 'Bombora',    what: 'Intent data on which accounts are researching your category this week.' },
    g2:        { name: 'G2',         what: 'Buyer intent from the software review marketplace.' },
    linkedin:  { name: 'LinkedIn',   what: 'The B2B network. Sales Navigator surfaces job changes, hiring, and funding on target accounts.' },
    ocean:     { name: 'Ocean.io',   what: 'Finds lookalike companies based on your best customers.' },
    lusha:     { name: 'Lusha',      what: 'Contact enrichment with verified emails and direct dials.' },
    clearbit:  { name: 'Clearbit',   what: 'B2B enrichment that completes each company record.' },
    notion:    { name: 'Notion',     what: 'The workspace where the ICP, playbooks, and voice rules live.' },
    instantly: { name: 'Instantly',  what: 'A cold-email platform that runs automated outreach sequences.' },
    heyreach:  { name: 'HeyReach',   what: 'A LinkedIn outreach platform that runs multi-sender sequences.' },
    slack:     { name: 'Slack',      what: 'Team messaging where reps get real-time alerts and pre-meeting briefs.' },
    chilipiper:{ name: 'Chili Piper',what: 'A scheduling tool that routes and books meetings on the right rep\'s calendar in real time.' }
  };

  function tip(slug, role) { const t = TOOLS[slug] || { name: slug, what: '' }; return ' data-tip-name="' + esc(t.name) + '" data-tip-tool="' + slug + '" data-tip-what="' + esc(t.what) + '" data-tip-role="' + esc(role || '') + '"'; }
  function chip(slug, role) { const t = TOOLS[slug] || { name: slug }; return '<span class="fcx-tool"' + tip(slug, role) + '><span class="t-logo">' + logo(slug, 14) + '</span><span class="t-name">' + esc(t.name) + '</span></span>'; }
  function nebor(role) { return '<span class="fcx-tool nb" data-tip-name="Nebor" data-tip-tool="" data-tip-what="' + esc(TOOLS.nebor.what) + '" data-tip-role="' + esc(role || '') + '"><img class="nebor-mark" src="./assets/wf/nebor-logo.png" alt="Nebor"><span class="t-name">with your team</span></span>'; }
  function chips(arr) { return '<div class="fcx-chips">' + arr.map(c => '<span class="fcx-chip">' + esc(c) + '</span>').join('') + '</div>'; }
  function card(ac, num, title, method, body) { return '<div class="fcx-card ' + ac + '"><div class="ch">' + (num ? '<span class="fcx-num ' + ac + '">' + num + '</span>' : '') + '<span class="fcx-title">' + esc(title) + '</span></div>' + (method ? '<p class="fcx-method">' + esc(method) + '</p>' : '') + (body || '') + '</div>'; }

  const A = 'am', V = 'vi', B = 'bl', G = 'gr';
  const NODES = [
    // Foundation (01 Define) — a wide top card, Nebor + your team lock the ICP
    { id: 'define', cx: 680, cy: 96, cls: 'fcx-foundation', html:
      '<div class="fcx-card am"><div class="fcx-fhead"><span class="fcx-eyebrow">Foundation &middot; 01 Define</span><span class="fcx-title">Read the win/loss history, write the ICP</span></div>' +
      '<div class="fcx-mid"><p class="fcx-method" style="margin:0;max-width:34ch">Nebor and your team lock who you sell to and the signals worth watching, before anything goes live.</p>' +
      '<div class="fcx-tools">' + nebor('Runs the working session to lock your ICP and the buying signals that count.') + chip('anthropic', 'Reads the win/loss history and writes the ICP, with the reasons why.') + chip('notion', 'Holds the ICP as a living document every later step reads from.') + chip('ocean', 'Turns closed-won accounts into lookalike seeds across the market.') + '</div></div></div>' },

    // Signal source cards (top row) — the buying signals that surface an account
    { id: 's1', cx: 180,  cy: 300, w: 214, html: card(A, null, 'Firmographic fit', 'Size, industry, and revenue match the ICP.', '') },
    { id: 's2', cx: 506,  cy: 300, w: 214, html: card(A, null, 'Tech + intent', 'The stack fits and the account is researching now.', '') },
    { id: 's3', cx: 842,  cy: 300, w: 214, html: card(A, null, 'Live triggers', 'Hiring, funding, a launch, or a champion moves.', '') },
    { id: 's4', cx: 1168, cy: 300, w: 214, html: card(A, null, 'Lookalikes', 'A twin of a closed-won account appears.', '') },

    // Input (02 Identify) — the account surfaces, n8n drops it into Clay
    { id: 'input', cx: 680, cy: 520, cls: 'fcx-input', html:
      '<div class="fcx-card am fcx-io fcx-in"><span class="fcx-io-tag">In</span>' +
      '<div class="ch"><span class="fcx-num am">02</span><span class="fcx-title">A fit, in-market account surfaces</span></div>' +
      '<p class="fcx-method">The universe gets pulled and narrowed to the accounts that match, then n8n drops each one into Clay.</p>' +
      '<div class="fcx-tools">' + chip('zoominfo', 'Pulls the account universe: firmographics and org charts.') + chip('apollo', 'Runs the ICP filters and returns matching organizations.') + chip('builtwith', 'Detects the tech stack each account runs.') + chip('n8n', 'Catches the account and sends it into Clay.') + '</div></div>' },

    // Clay hub — the command center
    { id: 'clay', cx: 680, cy: 792, cls: 'fcx-hub', html:
      '<div class="fcx-hub-ring"><div class="fcx-hub-tile"' + tip('clay', 'The command center. Every account lands in Clay, which reads, scores, enriches, and writes.') + '><span class="fcx-hub-run"></span><span class="hub-logo"><img src="./assets/wf/clay-hub.webp" alt="Clay"></span><span class="hub-name">Clay</span><span class="hub-sub">the command center</span></div></div>' },

    // Branch 03 Signal (left, teal) — score fit + intent, fork hot/cold
    { id: 'score', cx: 316, cy: 1030, w: 324, html: card(V, '03', 'Score fit and intent', 'Claygent reads every signal and grades the account, then it forks two ways.',
        '<div class="fcx-tools">' + chip('bombora', 'Category-surge intent per account.') + chip('g2', 'Buyers viewing your category and competitors.') + chip('anthropic', 'One of the models grading fit and intent.') + '</div><div class="fcx-fork"><span class="fcx-fork-row"><span class="t-coin" style="--c:#E8804D"></span><b>Hot</b><span class="fcx-fork-arr">&#8594;</span>reach now</span><span class="fcx-fork-row dim"><span class="t-coin" style="--c:#5C9BD6"></span><b>Cold</b><span class="fcx-fork-arr">&#8669;</span>nurture track</span></div>') },

    // Branch 04 Enrich (right, blue) — find the buying committee, verify
    { id: 'enrich', cx: 1044, cy: 1030, w: 340, html: card(B, '04', 'Enrich to the buying committee', 'Clay researches the account, finds the decision-makers by role, and verifies every email.',
        '<div class="fcx-tools">' + chip('apollo', 'Pulls the people: titles, seniority, committee roles.') + chip('lusha', 'Finds direct dials and work emails.') + chip('clearbit', 'Fills the remaining firmographic gaps.') + chip('hubspot', 'Dedupes against what your CRM already knows.') + '</div>' + chips(['Firmographics', 'Decision-makers', 'Verified email'])) },

    // 05 Personalize (center) — write the signal-tied message, in your voice
    { id: 'summarize', cx: 680, cy: 1316, w: 344, html: card(V, '05', 'Write the signal-tied message', 'Each opening line is written from the account\'s live signal, in your voice, checked against your rules.',
        '<div class="fcx-tools">' + chip('anthropic', 'Writes the line from the signal, in your voice.') + chip('notion', 'Supplies the voice rules and the do-not-say list.') + '</div>' + chips(['Signal hook', 'Personalized', 'Zero mail-merge'])) },

    // Nurture cold-path off Signal
    { id: 'nurture', cx: 150, cy: 1286, w: 180, cls: 'fcx-nurture', html: '<div class="fcx-card fcx-nurture-card"><span class="fcx-nurture-tag">Cold path</span><div class="fcx-title">Hold for nurture</div><p class="fcx-method">A low-touch track. Re-enters the moment a stronger signal shows up.</p></div>' },

    // 06 Send — fork to the two channels
    { id: 'ch_email', cx: 452, cy: 1580, w: 224, html: card(G, '06', 'Run email', 'A verified cold-email sequence tied to the signal.',
        '<div class="fcx-tools">' + chip('instantly', 'Runs the automated email sequence.') + chip('n8n', 'Releases both channels on one clock.') + '</div>') },
    { id: 'ch_linkedin', cx: 908, cy: 1580, w: 236, html: card(G, '06', 'Run LinkedIn', 'Connection requests and follow-ups, on the same clock as email.',
        '<div class="fcx-tools">' + chip('heyreach', 'Runs the LinkedIn sequence, synced with email.') + chip('linkedin', 'The network the motion runs on.') + '</div>') },

    // 07 Qualify — the reply classifier, sits on the reply wire
    { id: 'qualify', cx: 1150, cy: 1580, w: 196, cls: 'fcx-nurture', html: '<div class="fcx-card fcx-nurture-card" style="border-style:solid;border-color:rgba(21,124,142,0.3)"><span class="fcx-nurture-tag" style="color:#147A8C;background:rgba(21,124,142,0.12)">07 Qualify</span><div class="fcx-title">Classify every reply</div><p class="fcx-method">Replies are graded in seconds and routed: reply, switch channel, or stop.</p></div>' },

    // 08 Book — the green win
    { id: 'win', cx: 680, cy: 1806, cls: 'fcx-win', html: '<div class="fcx-card gr fcx-io fcx-out"><span class="fcx-io-tag">Out</span><div class="ch" style="justify-content:center"><span class="fcx-num gr">08</span><span class="fcx-title">A booked meeting</span></div><p class="fcx-method">On a rep\'s calendar, briefed before the invite is accepted, and stamped with the source, signal, and sequence that produced it.</p><div class="fcx-tools">' + chip('chilipiper', 'Books the right rep\'s calendar on your routing rules.') + chip('anthropic', 'Drafts the pre-meeting brief.') + chip('slack', 'Delivers the brief into the rep\'s hands.') + chip('hubspot', 'Where the stamped meeting is logged.') + '</div></div>' },

    // 09 Learn — the loop-back node
    { id: 'learn', cx: 1210, cy: 1806, w: 200, cls: 'fcx-nurture', html: '<div class="fcx-card" style="background:linear-gradient(180deg,#FBF0DC,#fff);border:1.5px solid rgba(225,150,46,0.4)"><span class="fcx-nurture-tag" style="color:#8A5410;background:rgba(225,150,46,0.15)">09 Learn</span><div class="fcx-title">Teach the next cycle</div><p class="fcx-method">Claude reads what booked, reweights the targeting, and reseeds the lookalikes.</p><div class="fcx-tools">' + chip('anthropic', 'Reads the stamps and decides what to find more of next cycle.') + chip('clay', 'Reweights the sourcing filters toward what converted.') + '</div></div>' }
  ];

  const map = {};
  NODES.forEach(n => { const el = document.createElement('div'); el.className = 'fcx-node ' + (n.cls || ''); el.style.left = n.cx + 'px'; el.style.top = n.cy + 'px'; el.innerHTML = n.html; nodesEl.appendChild(el); if (n.w) { const c = el.querySelector('.fcx-card'); if (c) c.style.width = n.w + 'px'; } map[n.id] = el; });
  // expose the node lookup so the explainer line can jump to a node on click
  window.__fcxNode = id => map[id] || null;

  const WIRES = [
    { a: 'define', as: 'b', b: 's1', bs: 't', c: '#D9922E', vert: true },
    { a: 'define', as: 'b', b: 's2', bs: 't', c: '#D9922E', vert: true },
    { a: 'define', as: 'b', b: 's3', bs: 't', c: '#D9922E', vert: true },
    { a: 'define', as: 'b', b: 's4', bs: 't', c: '#D9922E', vert: true },
    { a: 's1', as: 'b', b: 'input', bs: 't', c: '#D9922E', vert: true },
    { a: 's2', as: 'b', b: 'input', bs: 't', c: '#D9922E', vert: true },
    { a: 's3', as: 'b', b: 'input', bs: 't', c: '#D9922E', vert: true },
    { a: 's4', as: 'b', b: 'input', bs: 't', c: '#D9922E', vert: true },
    { a: 'input', as: 'b', b: 'clay', bs: 't', c: '#D9922E', vert: true, pill: 'the account', tone: 'orange' },
    { a: 'clay', as: 'b', b: 'score', bs: 't', c: '#157C8E', vert: true, pill: 'to score' },
    { a: 'clay', as: 'b', b: 'enrich', bs: 't', c: '#3F7AD6', vert: true, pill: 'to enrich' },
    { a: 'score', as: 'b', b: 'summarize', bs: 't', c: '#157C8E', vert: true, pill: 'scored' },
    { a: 'enrich', as: 'b', b: 'summarize', bs: 't', c: '#3F7AD6', vert: true, pill: 'enriched' },
    { a: 'summarize', as: 'b', b: 'ch_email', bs: 't', c: '#2F9E6F', vert: true, pill: 'ready to send', tone: 'green', anim: true },
    { a: 'summarize', as: 'b', b: 'ch_linkedin', bs: 't', c: '#2F9E6F', vert: true, pill: 'ready to send', tone: 'green' },
    { a: 'ch_email', as: 'b', b: 'win', bs: 't', c: '#2F9E6F', vert: true, pill: 'a reply' },
    { a: 'ch_linkedin', as: 'b', b: 'win', bs: 't', c: '#2F9E6F', vert: true, pill: 'a reply' },
    { a: 'ch_linkedin', as: 'r', b: 'qualify', bs: 'l', c: '#157C8E' },
    { a: 'score', as: 'l', b: 'nurture', bs: 't', c: '#88A0C4', cold: true },
    // the Learn loop-back: win feeds Learn, Learn feeds the next cycle's Define
    { a: 'win', as: 'r', b: 'learn', bs: 'l', c: '#E1962E', pill: 'what booked', tone: 'orange' },
    { a: 'learn', as: 'r', b: 'define', bs: 'r', c: '#E1962E', loop: true }
  ];

  function anchor(id, side) {
    const el = map[id]; const x = el.offsetLeft, y = el.offsetTop, w = el.offsetWidth, h = el.offsetHeight;
    if (side === 'l') return { x: x - w / 2, y: y }; if (side === 'r') return { x: x + w / 2, y: y };
    if (side === 't') return { x: x, y: y - h / 2 }; if (side === 'b') return { x: x, y: y + h / 2 }; return { x: x, y: y };
  }
  function path(a, b, vert) {
    let d; if (vert) { const k = Math.max(38, Math.abs(b.y - a.y) * 0.5); d = 'M ' + a.x + ' ' + a.y + ' C ' + a.x + ' ' + (a.y + k) + ', ' + b.x + ' ' + (b.y - k) + ', ' + b.x + ' ' + b.y; }
    else { const k = Math.max(56, Math.abs(b.x - a.x) * 0.55), s = b.x >= a.x ? 1 : -1; d = 'M ' + a.x + ' ' + a.y + ' C ' + (a.x + s * k) + ' ' + a.y + ', ' + (b.x - s * k) + ' ' + b.y + ', ' + b.x + ' ' + b.y; } return d;
  }
  function coldPath(a, b) { const mx = Math.min(a.x, b.x) - 95; return 'M ' + a.x + ' ' + a.y + ' C ' + mx + ' ' + (a.y + 90) + ', ' + mx + ' ' + (b.y - 24) + ', ' + b.x + ' ' + b.y; }
  // the loop rides the far-right gutter: out of Learn, up the edge, back into Define's right side
  function loopPath(a, b) { const gx = 1330; return 'M ' + a.x + ' ' + a.y + ' C ' + gx + ' ' + a.y + ', ' + gx + ' ' + (a.y - 120) + ', ' + gx + ' ' + ((a.y + b.y) / 2) + ' S ' + gx + ' ' + b.y + ', ' + b.x + ' ' + b.y; }

  let pills = [];
  function draw() {
    while (svg.firstChild) svg.removeChild(svg.firstChild);
    pillsEl.innerHTML = '';
    pills = [];
    WIRES.forEach(function (wr, i) {
      const a = anchor(wr.a, wr.as), b = anchor(wr.b, wr.bs);
      const d = wr.loop ? loopPath(a, b) : (wr.cold ? coldPath(a, b) : path(a, b, wr.vert));
      const p = document.createElementNS(NS, 'path'); p.setAttribute('d', d); p.setAttribute('class', 'fcx-wire' + (wr.loop ? ' fcx-wire--loop' : '')); p.setAttribute('stroke', wr.c); p.setAttribute('stroke-width', wr.loop ? '2.6' : (wr.cold ? '1.8' : '2')); if (wr.cold) p.setAttribute('stroke-dasharray', '5 7'); if (wr.loop) p.setAttribute('stroke-dasharray', '9 7'); svg.appendChild(p);
      const plug = document.createElementNS(NS, 'circle'); plug.setAttribute('cx', b.x); plug.setAttribute('cy', b.y); plug.setAttribute('r', '4'); plug.setAttribute('class', 'fcx-plug'); plug.setAttribute('stroke', wr.c); svg.appendChild(plug);
      if (wr.pill) { const pl = document.createElement('div'); pl.className = 'fcx-pill' + (wr.tone ? ' fcx-pill--' + wr.tone : ''); pl.textContent = wr.pill; pillsEl.appendChild(pl); const ln = p.getTotalLength(); const isSpine = !!wr.vert || !!wr.anim || !!wr.loop; if (!isSpine) { const mp = p.getPointAtLength(0.5 * ln); pl.style.left = mp.x + 'px'; pl.style.top = mp.y + 'px'; pl.style.opacity = '1'; } pills.push({ path: p, el: pl, len: ln, dir: wr.dir || 1, off: (i * 2100) % 12000, spine: isSpine }); }
    });
  }
  function fit() { const s = Math.min(1, scroll.clientWidth / 1360); canvas.style.transform = 'scale(' + s + ')'; scroll.style.height = (1980 * s) + 'px'; }

  fit(); draw();
  window.addEventListener('resize', function () { clearTimeout(window.__fcxt); window.__fcxt = setTimeout(function () { fit(); draw(); }, 120); });
  window.addEventListener('load', function () { fit(); draw(); });
  setTimeout(function () { fit(); draw(); }, 400); setTimeout(function () { fit(); draw(); }, 1100);
  if (window.ResizeObserver) new ResizeObserver(function () { fit(); draw(); }).observe(scroll);

  // each data label travels its wire, in the direction the data actually flows
  function anim(now) {
    for (let i = 0; i < pills.length; i++) {
      const pu = pills[i]; if (!pu.spine) continue; const period = 12000; const ph = ((now + pu.off) % period) / period; const t = pu.dir < 0 ? 1 - ph : ph;
      if (pu.len > 0) { const pos = (0.2 + t * 0.6) * pu.len; const pt = pu.path.getPointAtLength(pos); pu.el.style.left = pt.x + 'px'; pu.el.style.top = pt.y + 'px'; }
      const op = t < 0.14 ? t / 0.14 : t > 0.86 ? (1 - t) / 0.14 : 1; pu.el.style.opacity = op.toFixed(2);
    }
    requestAnimationFrame(anim);
  }
  requestAnimationFrame(anim);
})();

// Tooltip for tools and key terms. Anchored ABOVE the element, grace period +
// hover bridge onto the card so the cursor can reach "Learn more". Tap pins it.
(function () {
  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  const tip = document.createElement('div');
  tip.className = 'fc2-tooltip';
  document.body.appendChild(tip);
  const TOOL_URL_BASE = 'https://www.nebor.ai/tools/';
  let curEl = null, hideT = null, pinned = false;

  function build(el) {
    const slug = el.getAttribute('data-tip-tool');
    const what = el.getAttribute('data-tip-what') || '';
    const role = el.getAttribute('data-tip-role') || '';
    let html = '<div class="tt-name">' +
      (slug && window.toolMarkInner ? '<span class="t-logo">' + window.toolMarkInner(slug, 13) + '</span>' : '') +
      esc(el.getAttribute('data-tip-name')) + '</div>';
    if (what) html += '<div class="tt-what">' + esc(what) + '</div>';
    if (role) html += '<div class="tt-role"><b>In this workflow:</b> ' + esc(role) + '</div>';
    if (slug) html += '<a class="tt-more" href="' + TOOL_URL_BASE + encodeURIComponent(slug) + '" target="_blank" rel="noopener">Learn more about ' + esc(el.getAttribute('data-tip-name')) + ' <span class="tt-arw">&rarr;</span></a>';
    tip.innerHTML = html;
  }
  function place(el) {
    const r = el.getBoundingClientRect();
    tip.classList.add('show');
    const th = tip.offsetHeight, cx = r.left + r.width / 2;
    if (r.top - th - 16 < 6) { tip.classList.add('below'); tip.style.left = cx + 'px'; tip.style.top = (r.bottom + 12) + 'px'; }
    else { tip.classList.remove('below'); tip.style.left = cx + 'px'; tip.style.top = (r.top - 8) + 'px'; }
  }
  function open(el) { if (hideT) { clearTimeout(hideT); hideT = null; } curEl = el; build(el); place(el); }
  function scheduleHide() { if (pinned) return; if (hideT) clearTimeout(hideT); hideT = setTimeout(function () { tip.classList.remove('show'); curEl = null; }, 240); }
  function hideNow() { if (hideT) { clearTimeout(hideT); hideT = null; } tip.classList.remove('show'); curEl = null; pinned = false; }

  document.addEventListener('mouseover', function (e) {
    const el = e.target.closest && e.target.closest('[data-tip-name]');
    if (el && el !== curEl && !pinned) open(el);
  });
  document.addEventListener('mouseout', function (e) {
    const el = e.target.closest && e.target.closest('[data-tip-name]');
    if (!el) return;
    const to = e.relatedTarget;
    if (to && (el.contains(to) || tip.contains(to))) return;
    scheduleHide();
  });
  tip.addEventListener('mouseenter', function () { if (hideT) { clearTimeout(hideT); hideT = null; } });
  tip.addEventListener('mouseleave', function () { scheduleHide(); });

  document.addEventListener('click', function (e) {
    if (tip.contains(e.target)) return;
    const el = e.target.closest && e.target.closest('[data-tip-name]');
    if (el) { pinned = false; open(el); pinned = true; e.stopPropagation(); }
    else hideNow();
  });
})();
