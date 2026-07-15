// Living workflow · the GTM flywheel.
// A big circular system: the engine hub at the center (live counter ticking),
// nine step cards arranged around the ring in three phase arcs (FIND / REACH /
// RUN), connected by a rotating loop that closes 09 -> 01 so it never dead-ends.
// A vertical step rail on the left drives it: hover a step and its card lights
// up on the wheel. Every tool is a hoverable dot that opens a dark info card.
(function () {
  const data = window.NEBOR_WORKFLOW || [];
  const railEl  = document.getElementById('fw-rail');
  const nodesEl = document.getElementById('fw-nodes');
  const linksEl = document.getElementById('fw-links');
  const hubEl   = document.getElementById('fw-hub');
  if (!railEl || !nodesEl || !data.length || !window.toolMarkInner) return;
  const NS = 'http://www.w3.org/2000/svg';
  const esc = s => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  // What each tool IS (dark hover card) + its role comes from NEBOR_WORKFLOW.roles
  const TOOLS = {
    anthropic: { name: 'Claude',     what: 'Anthropic\'s Claude, the reasoning layer: it reads win/loss, writes the ICP, drafts copy and briefs, and runs the learning pass.' },
    openai:    { name: 'ChatGPT',    what: 'OpenAI\'s ChatGPT, used for high-volume classification and drafting.' },
    clay:      { name: 'Clay',       what: 'An AI-driven spreadsheet that connects to many data sources and runs AI research on every account.' },
    n8n:       { name: 'n8n',        what: 'Open-source automation that catches signals around the clock and moves data between apps.' },
    hubspot:   { name: 'HubSpot',    what: 'A CRM: the database where your team stores companies, contacts, and deals.' },
    zoominfo:  { name: 'ZoomInfo',   what: 'A B2B database of companies, org charts, and direct dials.' },
    apollo:    { name: 'Apollo',     what: 'A B2B prospecting database with verified contact data.' },
    builtwith: { name: 'BuiltWith',  what: 'Detects the tools a company\'s website runs on.' },
    datanyze:  { name: 'Datanyze',   what: 'Technographic data on what software companies run and spend.' },
    bombora:   { name: 'Bombora',    what: 'Intent data on which accounts are researching your category this week.' },
    g2:        { name: 'G2',         what: 'Buyer intent from the software review marketplace.' },
    linkedin:  { name: 'LinkedIn',   what: 'The B2B network. Sales Navigator surfaces job changes, hiring, and funding on target accounts.' },
    ocean:     { name: 'Ocean.io',   what: 'Finds lookalike companies based on your best customers.' },
    discolike: { name: 'Discolike',  what: 'AI lookalike discovery from how companies describe themselves.' },
    lusha:     { name: 'Lusha',      what: 'Contact enrichment with verified emails and direct dials.' },
    clearbit:  { name: 'Clearbit',   what: 'B2B enrichment that completes each company record.' },
    notion:    { name: 'Notion',     what: 'The workspace where the ICP, playbooks, and voice rules live.' },
    instantly: { name: 'Instantly',  what: 'A cold-email platform that runs automated outreach sequences.' },
    heyreach:  { name: 'HeyReach',   what: 'A LinkedIn outreach platform that runs multi-sender sequences.' },
    slack:     { name: 'Slack',      what: 'Team messaging where reps get real-time alerts and pre-meeting briefs.' },
    chilipiper:{ name: 'Chili Piper',what: 'A scheduling tool that routes and books meetings on the right rep\'s calendar in real time.' }
  };
  const PHASE = {
    Find:  { key: 'find',  color: '#B8761F', sub: 'who we go after' },
    Reach: { key: 'reach', color: '#157C8E', sub: 'how we reach them' },
    Run:   { key: 'run',   color: '#2F9E6F', sub: 'how it runs, books, and learns' }
  };
  const QUESTION = [
    'Which customers are worth cloning?',
    'Who is actually in the market?',
    'Which of them are ready now?',
    'Who do we talk to there?',
    'Why would they reply?',
    'Where do they actually respond?',
    'What happens when they reply?',
    'How does it become a meeting?',
    'Why does next month beat this one?'
  ];

  // ---- geometry ----------------------------------------------------------
  const BOX = 940, CX = 470, CY = 470, R = 360;          // wheel design box
  const N = data.length;
  // node i angle: start at top (-90deg) going clockwise, evenly spaced
  const ang = i => (-90 + i * (360 / N)) * Math.PI / 180;
  const pt = (a, r) => ({ x: CX + r * Math.cos(a), y: CY + r * Math.sin(a) });

  function tipAttrs(slug, role) {
    const t = TOOLS[slug] || { name: slug, what: '' };
    return ' data-tip-name="' + esc(t.name) + '" data-tip-tool="' + slug + '" data-tip-what="' + esc(t.what) + '" data-tip-role="' + esc(role || '') + '"';
  }
  function toolDot(slug, role) {
    return '<span class="fw-tool" ' + tipAttrs(slug, role) + '>' + window.toolMarkInner(slug, 16) + '</span>';
  }

  // ---- the ring cards ----------------------------------------------------
  const nodeEls = [];
  data.forEach((d, i) => {
    const p = pt(ang(i), R);
    const ph = PHASE[d.phase] || PHASE.Find;
    const roles = d.roles || {};
    const tools = (d.tools || []).map(sl => toolDot(sl, roles[sl])).join('');
    const el = document.createElement('div');
    el.className = 'fw-node fw-node--' + ph.key;
    el.dataset.idx = i;
    el.style.left = p.x + 'px';
    el.style.top = p.y + 'px';
    el.innerHTML =
      '<div class="fw-node-head"><span class="fw-node-num">' + String(i + 1).padStart(2, '0') + '</span>' +
      '<span class="fw-node-name">' + esc(d.step) + '</span></div>' +
      '<p class="fw-node-q">' + esc(QUESTION[i]) + '</p>' +
      '<div class="fw-node-tools">' + tools + '</div>';
    nodesEl.appendChild(el);
    nodeEls.push(el);
  });

  // ---- the vertical rail (hover navigator) -------------------------------
  let lastPhase = null;
  data.forEach((d, i) => {
    const ph = PHASE[d.phase] || PHASE.Find;
    if (d.phase !== lastPhase) {
      const h = document.createElement('div');
      h.className = 'fw-rail-phase fw-rail-phase--' + ph.key;
      h.innerHTML = '<b>' + esc(d.phase) + '</b><span>' + esc(ph.sub) + '</span>';
      railEl.appendChild(h);
      lastPhase = d.phase;
    }
    const item = document.createElement('button');
    item.type = 'button';
    item.className = 'fw-rail-step fw-rail-step--' + ph.key;
    item.dataset.idx = i;
    item.innerHTML = '<span class="fw-rail-dot"></span><span class="fw-rail-num">' + String(i + 1).padStart(2, '0') + '</span><span class="fw-rail-name">' + esc(d.step) + '</span>';
    railEl.appendChild(item);
  });

  // ---- the rim, the return arc, and the phase arcs -----------------------
  const arc = (r, a0, a1, sweep) => {
    const s = pt(a0, r), e = pt(a1, r);
    const large = Math.abs(a1 - a0) > Math.PI ? 1 : 0;
    return 'M ' + s.x + ' ' + s.y + ' A ' + r + ' ' + r + ' 0 ' + large + ' ' + (sweep == null ? 1 : sweep) + ' ' + e.x + ' ' + e.y;
  };
  function drawLinks() {
    while (linksEl.firstChild) linksEl.removeChild(linksEl.firstChild);
    linksEl.setAttribute('viewBox', '0 0 ' + BOX + ' ' + BOX);
    const mk = (cls, d, stroke) => { const p = document.createElementNS(NS, 'path'); p.setAttribute('class', cls); p.setAttribute('d', d); if (stroke) p.setAttribute('stroke', stroke); linksEl.appendChild(p); };

    // the groove + the flowing rim (one clean circle the nodes sit on)
    const circle = 'M ' + (CX + R) + ' ' + CY + ' A ' + R + ' ' + R + ' 0 1 1 ' + (CX - R) + ' ' + CY + ' A ' + R + ' ' + R + ' 0 1 1 ' + (CX + R) + ' ' + CY;
    mk('fw-track', circle);
    mk('fw-rim', circle);

    // the hero: the return arc from 09 Learn back into 01 Define (closes the loop)
    mk('fw-return', arc(R, ang(N - 1) + 0.12, ang(N) - 0.12, 1));

    // bold labeled phase arcs just outside the rim
    const groups = [];
    data.forEach((d, i) => { if (!groups.length || groups[groups.length - 1].phase !== d.phase) groups.push({ phase: d.phase, from: i, to: i }); else groups[groups.length - 1].to = i; });
    groups.forEach(g => {
      const ph = PHASE[g.phase];
      mk('fw-phasearc', arc(R + 50, ang(g.from) - 0.22, ang(g.to) + 0.22, 1), ph.color);
    });
  }
  drawLinks();

  // ---- interactions ------------------------------------------------------
  function setActive(idx) {
    nodeEls.forEach((el, i) => el.classList.toggle('active', i === idx));
    railEl.querySelectorAll('.fw-rail-step').forEach(b => b.classList.toggle('active', +b.dataset.idx === idx));
  }
  const DEFAULT = 0;   // one card is always focused: never an empty state
  railEl.addEventListener('mouseover', e => { const b = e.target.closest('.fw-rail-step'); if (b) setActive(+b.dataset.idx); });
  railEl.addEventListener('mouseleave', () => setActive(DEFAULT));
  nodesEl.addEventListener('mouseover', e => { const n = e.target.closest('.fw-node'); if (n) setActive(+n.dataset.idx); });
  nodesEl.addEventListener('mouseleave', () => setActive(DEFAULT));
  setActive(DEFAULT);

  // fill the engine hub logos
  document.querySelectorAll('.fw-hub .fw-tool').forEach(el => {
    const slug = el.getAttribute('data-tip-tool');
    if (slug && window.toolMarkInner) el.innerHTML = window.toolMarkInner(slug, 16);
  });

  // live counter in the hub
  const counter = document.getElementById('fw-count');
  if (counter) { let n = 1300; setInterval(() => { n += 1 + Math.floor(Math.random() * 3); counter.textContent = n.toLocaleString('en-US'); }, 3200); }

  window.addEventListener('resize', () => { clearTimeout(window.__fwt); window.__fwt = setTimeout(drawLinks, 150); });
})();

// Dark hover tooltip for tools (name + what-it-is + "In this workflow:" + Learn more).
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
    let html = '<div class="tt-name">' + (slug && window.toolMarkInner ? '<span class="t-logo">' + window.toolMarkInner(slug, 13) + '</span>' : '') + esc(el.getAttribute('data-tip-name')) + '</div>';
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

  document.addEventListener('mouseover', function (e) { const el = e.target.closest && e.target.closest('[data-tip-name]'); if (el && el !== curEl && !pinned) open(el); });
  document.addEventListener('mouseout', function (e) { const el = e.target.closest && e.target.closest('[data-tip-name]'); if (!el) return; const to = e.relatedTarget; if (to && (el.contains(to) || tip.contains(to))) return; scheduleHide(); });
  tip.addEventListener('mouseenter', function () { if (hideT) { clearTimeout(hideT); hideT = null; } });
  tip.addEventListener('mouseleave', function () { scheduleHide(); });
  document.addEventListener('click', function (e) { if (tip.contains(e.target)) return; const el = e.target.closest && e.target.closest('[data-tip-name]'); if (el) { pinned = false; open(el); pinned = true; e.stopPropagation(); } else hideNow(); });
})();
