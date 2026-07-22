// Reliable tool logo: a Google favicon for every tool (simple-icons removed
// most brand marks, so toolMarkInner's mask path renders blank).
window.neborLogo = window.neborLogo || function (slug, size) {
  size = size || 16;
  var t = (window.NEBOR_TOOLS || {})[slug];
  if (!t) return '';
  var DOM = { anthropic: 'claude.ai', openai: 'openai.com', n8n: 'n8n.io', hubspot: 'hubspot.com', salesforce: 'salesforce.com', linkedin: 'linkedin.com', notion: 'notion.so', slack: 'slack.com', google: 'google.com', pipedrive: 'pipedrive.com', calendly: 'calendly.com', make: 'make.com', zapier: 'zapier.com', perplexity: 'perplexity.ai', webflow: 'webflow.com', framer: 'framer.com', airtable: 'airtable.com' };
  var domain = t.domain || DOM[slug];
  var name = String(t.name || slug).replace(/&/g, '&amp;').replace(/"/g, '&quot;');
  if (domain) return '<img class="tfavi" src="https://www.google.com/s2/favicons?domain=' + domain + '&sz=64" width="' + size + '" height="' + size + '" alt="' + name + '" loading="lazy" />';
  var disc = size + 2, fs = Math.max(8, size - 6);
  return '<span class="fb" style="background:' + (t.color || '#556') + ';font-size:' + fs + 'px;width:' + disc + 'px;height:' + disc + 'px;display:inline-grid;place-items:center;border-radius:50%;color:#fff;font-family:ui-monospace,monospace;font-weight:700">' + (t.fb || name.slice(0, 2)) + '</span>';
};

// Living workflow · header stepper (explainer) drives a playbook flywheel that
// builds up on click: 9 step cards coming around, the active step's data flow
// in the centre, and a 5-stage GTM wheel (FIND/REACH/QUALIFY/BOOK/LEARN) with
// the Clay + n8n hub behind it.
(function () {
  const data = window.NEBOR_WORKFLOW || [];
  const nodesEl = document.getElementById('wf-nodes');
  const pwNodes = document.getElementById('pw-nodes');
  const pwWires = document.getElementById('pw-wires');
  const pwCenter = document.getElementById('pw-center');
  const trackFill = document.querySelector('.workflow-track-fill');
  if (!nodesEl || !pwNodes || !data.length || !window.neborLogo) return;
  const NS = 'http://www.w3.org/2000/svg';
  const esc = s => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  const TOOLS = {
    anthropic: { name: 'Claude',     what: 'Anthropic\'s Claude, the reasoning layer of the engine.' },
    openai:    { name: 'ChatGPT',    what: 'OpenAI\'s ChatGPT, used for high-volume classification and drafting.' },
    clay:      { name: 'Clay',       what: 'An AI-driven spreadsheet that orchestrates enrichment across dozens of providers.' },
    n8n:       { name: 'n8n',        what: 'Open-source automation that moves data between apps around the clock.' },
    hubspot:   { name: 'HubSpot',    what: 'A CRM: the database where your team stores companies, contacts, and deals.' },
    zoominfo:  { name: 'ZoomInfo',   what: 'A B2B database of companies, org charts, and direct dials.' },
    apollo:    { name: 'Apollo',     what: 'A B2B prospecting database with verified contact data.' },
    builtwith: { name: 'BuiltWith',  what: 'Detects the tools a company\'s website runs on.' },
    datanyze:  { name: 'Datanyze',   what: 'Technographic data on what software companies run and spend.' },
    bombora:   { name: 'Bombora',    what: 'Intent data on which accounts are researching your category this week.' },
    g2:        { name: 'G2',         what: 'Buyer intent from the software review marketplace.' },
    linkedin:  { name: 'LinkedIn',   what: 'The B2B network. Sales Navigator surfaces job changes, hiring, and funding.' },
    ocean:     { name: 'Ocean.io',   what: 'Finds lookalike companies based on your best customers.' },
    discolike: { name: 'Discolike',  what: 'AI lookalike discovery from how companies describe themselves.' },
    lusha:     { name: 'Lusha',      what: 'Contact enrichment with verified emails and direct dials.' },
    rb2b:      { name: 'RB2B',       what: 'Identifies the people visiting your site, turning an anonymous session into a named person.' },
    snitcher:  { name: 'Snitcher',   what: 'Resolves anonymous website traffic to the company behind it.' },
    pipedrive: { name: 'Pipedrive',  what: 'A CRM built around the sales pipeline, common in leaner sales teams.' },
    clearbit:  { name: 'Clearbit',   what: 'B2B enrichment that completes each company record.' },
    notion:    { name: 'Notion',     what: 'The workspace where the ICP, playbooks, and voice rules live.' },
    instantly: { name: 'Instantly',  what: 'An email outreach platform that runs automated sequences.' },
    heyreach:  { name: 'HeyReach',   what: 'A LinkedIn outreach platform that runs multi-sender sequences.' },
    slack:     { name: 'Slack',      what: 'Team messaging where reps get real-time alerts and pre-meeting briefs.' },
    chilipiper:{ name: 'Chili Piper',what: 'A scheduling tool that routes and books meetings in real time.' }
  };
  // Per-page config: each page can supply its own phases/wheel via window globals; defaults = Sales Engine.
  const PHASE = window.NEBOR_PHASE || { Find: 'find', Reach: 'reach', Run: 'run' };
  const TAG = window.NEBOR_TAG || ['win/loss to ICP', 'TAM to matched', 'intent, scored', 'replies, routed', 'accounts to people', 'signal to message', 'lanes on one clock', 'meeting, stamped', 'wins to next ICP'];
  const HANDOFF = window.NEBOR_HANDOFF || ['market map', 'matched accounts', 'scored set', 'the committee', 'the message', 'live sends', 'qualified reply', 'booked & stamped', 'wins, next run'];
  const PLAIN = {
    'won-lost.records': 'win/loss records', 'icp.doc': 'the ICP', 'icp.traits': 'the ICP traits', 'closed-won.seeds': 'closed-won seeds', 'lookalike.expand': 'lookalikes',
    'firmo.page[n]': 'firmographics', 'orgs.filtered': 'matching orgs', 'stack.lookup': 'tech stack', 'tech.confirm': 'stack signals',
    'surge.topics': 'surge intent', 'category.views': 'category views', 'salesnav.alerts': 'Sales Nav alerts', 'fit+intent.scores': 'fit + intent scores',
    'people.page[n]': 'the people', 'contact.rows': 'direct contacts', 'firmo.fill': 'firmographics', 'contact.upsert': 'clean contacts',
    'signals.payload': 'the live signal', 'voice.rules': 'your voice rules', 'approved.copy': 'approved copy',
    'email.release[n]': 'the email lane', 'li.release[n]': 'the LinkedIn lane', 'email.activity': 'email activity', 'li.activity': 'LinkedIn activity',
    'replies.json': 'the replies', 'intent.class': 'reply intent', 'rep.ping': 'a rep alert', 'stage.sync': 'stage update',
    'qualified.contact': 'qualified lead', 'brief.prompt': 'account context', 'brief.md': 'the brief', 'meeting.stamped': 'stamped meeting',
    'stamped.meetings': 'booked stamps', 'icp.delta': 'ICP updates', 'targeting.weights': 'new targeting', 'new.seeds': 'new seeds'
  };
  const plain = l => PLAIN[l] || String(l || '').replace(/\[n\]/g, '').replace(/[._-]+/g, ' ').trim();

  function tipAttrs(slug, role) {
    const t = TOOLS[slug] || { name: slug, what: '' };
    return ' data-tip-name="' + esc(t.name) + '" data-tip-tool="' + slug + '" data-tip-what="' + esc(t.what) + '" data-tip-role="' + esc(role || '') + '"';
  }
  const miniLogo = slug => '<span class="tlogo-mini wf-clickable"' + tipAttrs(slug) + '>' + window.neborLogo(slug, 14) + '</span>';

  // ---- the explainer line · header stepper ----
  data.forEach((d, i) => {
    const node = document.createElement('div');
    // the stage class lets the mobile chips wear their wheel-stage colour
    node.className = 'wf-node wf-node--' + (PHASE[d.phase] || 'find') + (i === 0 ? ' active' : '');
    node.dataset.idx = i;
    node.innerHTML =
      '<span class="step-num">Step ' + String(i + 1).padStart(2, '0') + '</span>' +
      '<div class="dot-wrap"><div class="dot"></div></div>' +
      '<div class="step-label">' + esc(d.step) + '</div>' +
      '<div class="step-tools">' + (d.tools || []).slice(0, 3).map(miniLogo).join('') + '</div>';
    nodesEl.appendChild(node);
  });

  // ---- geometry ----
  // The flywheel is scaled down in CSS to ~0.78, so its rendered outer edge is ~353.
  // Ghost cards sit at CARD_R (slightly overlapping the wheel); opened cards pop out to
  // WIRE_R (next to the wheel). The connecting wires ride WIRE_R with the opened cards.
  const BOX = 1100, CX = 550, CY = 550, R = 448, N = data.length;
  const CARD_R = 392, POP = 60, WIRE_R = CARD_R + POP;
  const ang = i => (-90 + i * (360 / N)) * Math.PI / 180;
  const pt = (a, r) => ({ x: CX + r * Math.cos(a), y: CY + r * Math.sin(a) });
  const arc = (r, a0, a1) => { const s = pt(a0, r), e = pt(a1, r); const large = Math.abs(a1 - a0) > Math.PI ? 1 : 0; return 'M ' + s.x + ' ' + s.y + ' A ' + r + ' ' + r + ' 0 ' + large + ' 1 ' + e.x + ' ' + e.y; };

  // ---- the 5-stage GTM wheel · machine-plate build (ref shapes) + vivid clay palette (ref colors) ----
  const STAGES = window.NEBOR_STAGES || [
    { k: 'Find', c: '#9F86EC', ic: 'search' },   // lavender (ATTRACT)
    { k: 'Qualify', c: '#6FA6E9', ic: 'filter' },// blue slab, now reads Qualify (label+icon swapped, color unchanged)
    { k: 'Reach', c: '#3FCDAD', ic: 'send' },    // mint slab, now reads Reach (label+icon swapped, color unchanged)
    { k: 'Book', c: '#F2CE60', ic: 'cal' },      // yellow (DELIGHT)
    { k: 'Learn', c: '#F0776A', ic: 'loop' }     // coral (ADVOCATE)
  ];
  // colour helpers for the moulded 3D shading
  const hx = h => { h = h.replace('#', ''); return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)]; };
  const cl = x => Math.max(0, Math.min(255, Math.round(x)));
  const toHex = (r, g, b) => '#' + [r, g, b].map(v => cl(v).toString(16).padStart(2, '0')).join('');
  const lighten = (h, f) => { const [r, g, b] = hx(h); return toHex(r + (255 - r) * f, g + (255 - g) * f, b + (255 - b) * f); };
  const darken = (h, f) => { const [r, g, b] = hx(h); return toHex(r * (1 - f), g * (1 - f), b * (1 - f)); };
  // dust a colour toward warm sand: takes the plastic shine out of the saturation
  const dust = (h, f) => { const [r, g, b] = hx(h); return toHex(r + (184 - r) * f, g + (176 - g) * f, b + (162 - b) * f); };
  // vivid: push each channel away from its mean → more saturated / punchier
  const vivid = (h, f) => { const [r, g, b] = hx(h); const m = (r + g + b) / 3; return toHex(r + (r - m) * f, g + (g - m) * f, b + (b - m) * f); };
  // small line glyph for each stage badge
  function glyph(ic, col) {
    const a = 'fill="none" stroke="' + col + '" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" pathLength="1"';
    if (ic === 'search') return '<circle cx="-3" cy="-3" r="7.5" ' + a + '/><line x1="2.8" y1="2.8" x2="9.5" y2="9.5" ' + a + '/>';
    if (ic === 'send') return '<path d="M -10 9 L 10 0 L -10 -9 L -6 0 Z" ' + a + '/>';
    if (ic === 'filter') return '<path d="M -10 -8 L 10 -8 L 2.5 1 L 2.5 9 L -2.5 6 L -2.5 1 Z" ' + a + '/>';
    if (ic === 'cal') return '<rect x="-9.5" y="-8" width="19" height="17" rx="2.5" ' + a + '/><line x1="-9.5" y1="-2.5" x2="9.5" y2="-2.5" ' + a + '/><line x1="-4.5" y1="-11" x2="-4.5" y2="-5.5" ' + a + '/><line x1="4.5" y1="-11" x2="4.5" y2="-5.5" ' + a + '/>';
    if (ic === 'loop') return '<path d="M 9 -3.5 A 9 9 0 1 0 9 3.5" ' + a + '/><path d="M 9 -9.5 L 9 -2.5 L 2.3 -3.6" ' + a + '/>';
    if (ic === 'grid') return '<rect x="-9.5" y="-9.5" width="8" height="8" rx="1.6" ' + a + '/><rect x="1.5" y="-9.5" width="8" height="8" rx="1.6" ' + a + '/><rect x="-9.5" y="1.5" width="8" height="8" rx="1.6" ' + a + '/><rect x="1.5" y="1.5" width="8" height="8" rx="1.6" ' + a + '/>';
    return '';
  }

  // ---- active-stage glow (additive overlay on top of the slabs; slabs untouched) ----
  let stageInfo = null, glowEl = null;
  // which of the 5 wheel slabs each step lights. Slab order clockwise is now
  // Find(0), Qualify(1), Reach(2), Book(3), Learn(4) — Qualify/Reach labels swapped on the wheel.
  // Define/Identify/Signal→Find, Qualify→Qualify(1), Enrich/Personalize/Send→Reach(2), Book, Learn.
  const STEP_STAGE = window.NEBOR_STEP_STAGE || [0, 0, 0, 1, 2, 2, 2, 3, 4];
  function stageOf(i) { return STEP_STAGE[i] != null ? STEP_STAGE[i] : 0; }
  function glowStage(k) {
    if (!glowEl || !stageInfo || !stageInfo[k]) return;
    const sh = stageInfo[k];
    glowEl.innerHTML =
      '<defs><filter id="pwGlowF" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="8"/></filter></defs>' +
      '<path d="' + sh.d + '" fill="' + lighten(sh.c, 0.55) + '" class="pw-glow-halo" filter="url(#pwGlowF)"/>' +
      '<path d="' + sh.d + '" fill="' + lighten(sh.c, 0.4) + '" class="pw-glow-face"/>' +
      '<g class="pw-glow-badge" transform="translate(' + sh.ix.toFixed(1) + ',' + sh.iy.toFixed(1) + ')">' +
        '<circle r="24" fill="none" stroke="' + sh.c + '" stroke-width="2.5" class="pw-glow-ping"/>' +
        '<circle r="24" fill="none" stroke="' + sh.c + '" stroke-width="2.5" class="pw-glow-ping p2"/>' +
        '<g class="pw-glow-disc"><circle r="24" fill="#FFFFFF"/><g class="pw-glow-glyph">' + glyph(sh.ic, sh.c) + '</g></g>' +
      '</g>' +
      '<text class="pw-glow-lbl" text-anchor="middle" fill="#FFFFFF"><textPath href="#pwLA' + k + '" startOffset="50%">' + sh.k + '</textPath></text>';
  }

  function drawFlywheel() {
    const svg = document.getElementById('pw-flywheel');
    if (!svg) return;
    svg.setAttribute('viewBox', '0 0 ' + BOX + ' ' + BOX);
    // soft-3D slab band (ref: clean sanded chevron slabs), kept slim so the card fits
    const rOut = 452, rIn = 354, rMid = (rOut + rIn) / 2;
    const n = STAGES.length, seg = 2 * Math.PI / n, start = -Math.PI / 2 - seg / 2;
    const gapA = 0.027;   // clean, even seam: close but with clear, symmetric breathing room
    const chevA = 0.102;  // deeper chevron: sharper noses and tails
    const RND = 9;        // tighter corner rounding: crisp points, still not razor-sharp

    // one slab: outer arc -> chevron tip (points clockwise) -> inner arc -> notch (receives the previous tip)
    const f = p => p.x.toFixed(1) + ' ' + p.y.toFixed(1);
    const slab = (a0, a1) => {
      return 'M ' + f(pt(a0, rOut)) +
        ' A ' + rOut + ' ' + rOut + ' 0 0 1 ' + f(pt(a1, rOut)) +      // outer rim arc
        ' L ' + f(pt(a1 + chevA, rMid)) +                              // arrow tip
        ' L ' + f(pt(a1, rIn)) +
        ' A ' + rIn + ' ' + rIn + ' 0 0 0 ' + f(pt(a0, rIn)) +         // inner arc
        ' L ' + f(pt(a0 + chevA, rMid)) + ' Z';                        // notch for the previous tip
    };

    const bounds = STAGES.map((s, i) => {
      const a0 = start + i * seg + gapA, a1 = start + (i + 1) * seg - gapA;
      return { a0, a1, d: slab(a0, a1) };
    });
    const col = STAGES.map(s => vivid(s.c, 0.30)); // vivid, punchy palette (shapes/bevels unchanged)

    // gentle top light across each face: matte shading, not a shine
    let defs = '<defs>';
    STAGES.forEach((s, i) => {
      defs += '<linearGradient id="pwSeg' + i + '" gradientUnits="userSpaceOnUse" x1="' + CX + '" y1="' + (CY - rOut) + '" x2="' + CX + '" y2="' + (CY + rOut) + '">' +
        '<stop offset="0" stop-color="' + lighten(col[i], 0.10) + '"/>' +
        '<stop offset="0.55" stop-color="' + col[i] + '"/>' +
        '<stop offset="1" stop-color="' + darken(col[i], 0.05) + '"/>' +
        '</linearGradient>';
    });
    defs += '</defs>';

    const P = [defs];
    // thick sanded edge: stacked offset layers grade the thickness smoothly,
    // like a rounded sanded block — no hard shadow line, no blur, no cast shadow
    const EDGE = [[16, 0.26], [13.5, 0.22], [11, 0.18], [8.5, 0.14], [6, 0.10], [3.5, 0.06], [1.5, 0.03]];
    EDGE.forEach(L => {
      STAGES.forEach((s, i) => {
        const c = darken(col[i], L[1]);
        P.push('<path d="' + bounds[i].d + '" transform="translate(0,' + L[0] + ')" fill="' + c + '" stroke="' + c + '" stroke-width="' + RND + '" stroke-linejoin="round"/>');
      });
    });
    // top faces with the soft matte light
    STAGES.forEach((s, i) => {
      P.push('<path d="' + bounds[i].d + '" fill="url(#pwSeg' + i + ')" stroke="url(#pwSeg' + i + ')" stroke-width="' + RND + '" stroke-linejoin="round"/>');
    });
    // white hub disc framing the centre card · hairline edge instead of a shadow
    P.push('<circle cx="' + CX + '" cy="' + CY + '" r="' + (rIn - RND / 2 - 10) + '" fill="#FDFAF2" stroke="rgba(23,42,45,0.07)" stroke-width="1.5"/>');
    // white icon badges + dark stage labels · icon stacked straight above its label
    // Words ride the band itself. Each label curves along its own slab on a
    // textPath, so it can never fall out of the bar, whatever the slab's angle.
    // Lower-half slabs get a reversed (coin-bottom) arc so their words read
    // upright; radii keep glyphs on the hub side of the band, icons on the rim
    // side, at every position.
    const arcDefs = [];
    const arcFor = (id, r, am, half, rev) => {
      const p1 = pt(am - half, r), p2 = pt(am + half, r);
      const d = rev
        ? 'M ' + p2.x.toFixed(1) + ' ' + p2.y.toFixed(1) + ' A ' + r + ' ' + r + ' 0 0 0 ' + p1.x.toFixed(1) + ' ' + p1.y.toFixed(1)
        : 'M ' + p1.x.toFixed(1) + ' ' + p1.y.toFixed(1) + ' A ' + r + ' ' + r + ' 0 0 1 ' + p2.x.toFixed(1) + ' ' + p2.y.toFixed(1);
      arcDefs.push('<path id="' + id + '" d="' + d + '" fill="none"/>');
    };
    STAGES.forEach((s, i) => {
      const am = start + i * seg + seg / 2;
      const half = seg / 2 - chevA - 0.08;
      const rev = Math.sin(am) > 0.3;               // lower-half slab: flip the arc
      arcFor('pwLA' + i, rev ? rMid - 15 : rMid - 30, am, half, rev);
      if (s.sub) arcFor('pwSA' + i, rev ? rMid - 31 : rMid - 46, am, half, rev);
      const ip = pt(am, rMid + 14);
      P.push('<g transform="translate(' + ip.x.toFixed(1) + ',' + ip.y.toFixed(1) + ')"><circle r="24" fill="#FFFFFF" stroke="rgba(23,42,45,0.08)" stroke-width="1"/>' + glyph(s.ic, col[i]) + '</g>');
      P.push('<text class="pw-fw-label" text-anchor="middle" fill="#202B33"><textPath href="#pwLA' + i + '" startOffset="50%">' + s.k + '</textPath></text>');
      // optional sub-label under a slab: the CRM build uses it to say the Architect arc happens once
      if (s.sub) P.push('<text class="pw-fw-sub" text-anchor="middle" fill="rgba(32,43,51,0.55)"><textPath href="#pwSA' + i + '" startOffset="50%">' + s.sub + '</textPath></text>');
    });
    P.push('<defs>' + arcDefs.join('') + '</defs>');
    svg.innerHTML = P.join('');

    // stash the slab shapes + label spots so the glow overlay can light up the active stage
    stageInfo = bounds.map((b, i) => {
      const am = start + i * seg + seg / 2, lp = pt(am, rMid);
      return { d: b.d, c: col[i], lx: lp.x, ly: lp.y + 25, ix: lp.x, iy: lp.y - 25, ic: STAGES[i].ic, k: STAGES[i].k };
    });
    if (!glowEl) {
      glowEl = document.createElementNS(NS, 'svg');
      glowEl.setAttribute('class', 'pw-glow');
      glowEl.setAttribute('viewBox', '0 0 ' + BOX + ' ' + BOX);
      glowEl.setAttribute('aria-hidden', 'true');
      svg.parentNode.insertBefore(glowEl, svg.nextSibling);
    }

    const clay = document.getElementById('pw-clay');
    // hub chip is page-configurable: sales default is Clay + n8n, demand runs Clay alone
    const HUB = window.NEBOR_HUB || [{ sl: 'clay', name: 'Clay' }, { sl: 'n8n', name: 'n8n' }];
    const HUB_TX = window.NEBOR_HUB_TEXT || ('built on ' + HUB.map(h => '<b>' + h.name + '</b>').join(' + '));
    if (clay) clay.innerHTML = HUB.map(h => '<span class="pw-clay-mk">' + window.neborLogo(h.sl, 18) + '</span>').join('') + '<span class="pw-clay-tx">' + HUB_TX + '</span>';
    // anchor the chip to the wheel box: identical geometry on desktop, and on
    // mobile it centres in the wheel instead of drifting down the tall stack
    const wheelBox = document.querySelector('.pw-wheel');
    if (clay && wheelBox) wheelBox.appendChild(clay);
  }

  // ---- the ring step cards (compact tiles, built progressively) ----
  const ringEls = [];
  data.forEach((d, i) => {
    const a = ang(i);
    const p = pt(a, CARD_R);
    const ph = PHASE[d.phase] || 'find';
    const roles0 = d.roles || {};
    const logos = (d.tools || []).map(sl => '<span class="pw-node-logo wf-clickable"' + tipAttrs(sl, roles0[sl]) + '>' + window.neborLogo(sl, 15) + '</span>').join('');
    const el = document.createElement('div');
    el.className = 'pw-node pw-node--' + ph;
    el.dataset.idx = i;
    el.style.left = (p.x / BOX * 100) + '%';
    el.style.top = (p.y / BOX * 100) + '%';
    // outward unit vector: opened cards translate along it to lift off the wheel
    el.style.setProperty('--ox', Math.cos(a).toFixed(3));
    el.style.setProperty('--oy', Math.sin(a).toFixed(3));
    el.innerHTML =
      '<div class="pw-node-name">' + esc(d.step) + '</div>' +
      '<div class="pw-node-tag">' + esc(TAG[i]) + '</div>' +
      '<p class="pw-node-desc">' + esc(d.brief || d.desc) + '</p>' +
      '<div class="pw-node-logos">' + logos + '</div>';
    pwNodes.appendChild(el);
    ringEls.push(el);
  });

  // ---- the centre detail card (active step's data flow) ----
  function renderCenter(i) {
    const d = data[i];
    const roles = d.roles || {};
    const ph = PHASE[d.phase] || 'find';
    const flowTool = (slug, role) => { const t = TOOLS[slug] || { name: slug }; return '<span class="pw-fl-tool wf-clickable"' + tipAttrs(slug, role) + '><span class="pw-fl-mk">' + window.neborLogo(slug, 15) + '</span>' + esc(t.name) + '</span>'; };
    const flows = (d.flow || []).map((f, fi) => {
      const dly = 'animation-delay:' + (0.25 + fi * 0.22).toFixed(2) + 's';
      return '<div class="pw-fl">' + flowTool(f.from, roles[f.from]) +
        '<span class="pw-fl-pipe"><span class="pw-fl-data pw-fl-live" style="' + dly + '">' + esc(plain(f.label)) + '</span><span class="pw-fl-arw pw-fl-arwlive" aria-hidden="true" style="' + dly + '"></span></span>' +
        flowTool(f.to, roles[f.to]) + '</div>';
    }).join('');
    pwCenter.className = 'pw-center pw-center--' + ph;
    // the stamp is the wheel bar's own badge: same word, same rendered colour
    const slab = stageInfo && stageInfo[stageOf(i)];
    if (slab) pwCenter.style.setProperty('--stage-c', slab.c);
    pwCenter.innerHTML =
      '<span class="pw-stage-pill" aria-hidden="true"' + (slab ? ' style="background:' + slab.c + '"' : '') + '>' + esc(slab ? slab.k : d.phase) + '</span>' +
      '<div class="pw-c-head"><h4 class="pw-c-name">' + esc(d.step) + '</h4></div>' +
      '<p class="pw-c-desc">' + esc(d.desc) + '</p>' +
      // On desktop the handoff rows show tool-to-tool data movement; on phones
      // they repeated the wheel cards and stretched the panel, so CSS hides
      // them under 900px.
      (flows ? '<div class="pw-c-k"><b>How the data moves</b><span>each row is one handoff: a tool passes data to the next</span></div>' +
        '<div class="pw-flows">' + flows + '</div>' : '') +
      (d.output ? '<div class="pw-c-out"><span class="pw-c-out-k">Produces</span>' + esc(d.output) + '</div>' : '');
  }

  // ---- the handoff wires between the cards (build up to the active step) ----
  const phaseColor = { find: '#9F86EC', reach: '#6FA6E9', run: '#3FCDAD' };
  const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  // a glowing data-spark that races along a wire once, then fades
  function fireSpark(dPath, color) {
    const g = document.createElementNS(NS, 'g');
    const halo = document.createElementNS(NS, 'circle'); halo.setAttribute('r', '11'); halo.setAttribute('fill', color); halo.setAttribute('opacity', '0.32');
    const core = document.createElementNS(NS, 'circle'); core.setAttribute('r', '5'); core.setAttribute('fill', '#ffffff');
    const am = document.createElementNS(NS, 'animateMotion'); am.setAttribute('dur', '0.9s'); am.setAttribute('begin', 'indefinite'); am.setAttribute('fill', 'freeze'); am.setAttribute('path', dPath);
    const op = document.createElementNS(NS, 'animate'); op.setAttribute('attributeName', 'opacity'); op.setAttribute('values', '0;1;1;0'); op.setAttribute('dur', '0.9s'); op.setAttribute('begin', 'indefinite'); op.setAttribute('fill', 'freeze');
    g.appendChild(halo); g.appendChild(core); g.appendChild(am); g.appendChild(op);
    pwWires.appendChild(g);
    try { am.beginElement(); op.beginElement(); } catch (e) {}
    setTimeout(function () { if (g.parentNode) g.parentNode.removeChild(g); }, 1000);
  }
  function drawWires(active) {
    while (pwWires.firstChild) pwWires.removeChild(pwWires.firstChild);
    pwWires.setAttribute('viewBox', '0 0 ' + BOX + ' ' + BOX);
    for (let i = 0; i < N; i++) {
      const j = (i + 1) % N;
      const isClose = j === 0;
      const built = i < active || (isClose && active >= N - 1);
      const a0 = ang(i) + 0.12, a1 = ang(j) - 0.12 + (isClose ? 2 * Math.PI : 0);
      const dPath = arc(WIRE_R, a0, a1);
      const sc = isClose ? '#E1962E' : (phaseColor[PHASE[data[i].phase]] || '#C08636');
      const p = document.createElementNS(NS, 'path');
      p.setAttribute('d', dPath);
      if (built) {
        p.setAttribute('class', 'pw-wire built' + (isClose ? ' close' : ''));
        p.setAttribute('stroke', sc);
      } else {
        p.setAttribute('class', 'pw-wire ghost');
      }
      pwWires.appendChild(p);
      if (built) {
        const leads = (j === active) && !reduceMotion; // this wire hands off into the active card
        const mid = pt((a0 + a1) / 2, WIRE_R);
        const fo = document.createElementNS(NS, 'foreignObject');
        fo.setAttribute('x', mid.x - 62); fo.setAttribute('y', mid.y - 13); fo.setAttribute('width', 124); fo.setAttribute('height', 26);
        fo.innerHTML = '<div xmlns="http://www.w3.org/1999/xhtml" class="pw-handoff' + (isClose ? ' close' : '') + (leads ? ' hit' : '') + '">' + esc(HANDOFF[i]) + '</div>';
        pwWires.appendChild(fo);
        // the wire that just handed off gets a data-spark; its pill pops as the spark lands
        if (leads) fireSpark(dPath, sc);
      }
    }
  }

  function setActive(i) {
    nodesEl.querySelectorAll('.wf-node').forEach((n, k) => n.classList.toggle('active', k === i));
    if (trackFill) trackFill.style.width = (N > 1 ? (i / (N - 1)) * 100 : 0) + '%';
    ringEls.forEach((el, k) => { el.classList.toggle('built', k <= i); el.classList.toggle('ghost', k > i); el.classList.toggle('active', k === i); });
    glowStage(stageOf(i));   // set the glow in the SAME style batch as the card toggle, before any reflow renderCenter might force
    drawWires(i);
    renderCenter(i);
    // renderCenter rewrites the class list, so the catch re-arms on every step
    void pwCenter.offsetWidth;
    pwCenter.classList.add('lit');
    // and the wheel advances a notch (mobile only; the class is inert on desktop)
    const wheelEl = document.querySelector('.pw-wheel');
    if (wheelEl) { wheelEl.classList.remove('kick'); void wheelEl.offsetWidth; wheelEl.classList.add('kick'); }
  }

  // ---- autoplay: build the play on scroll-in, loop it, hand control to any click ----
  let autoT = null, autoI = 0, autoOn = false, tookOver = false;
  function autoStep() {
    setActive(autoI);
    const atEnd = autoI === N - 1;
    autoI = (autoI + 1) % N;
    autoT = setTimeout(autoStep, atEnd ? 2600 : 1650);
  }
  function startAuto() { if (autoOn || tookOver || reduceMotion) return; autoOn = true; autoI = 0; autoStep(); }
  function stopAuto() { autoOn = false; if (autoT) { clearTimeout(autoT); autoT = null; } }
  function takeOver() { tookOver = true; stopAuto(); }

  nodesEl.addEventListener('click', e => { const n = e.target.closest('.wf-node'); if (n) { takeOver(); setActive(+n.dataset.idx); } });
  pwNodes.addEventListener('click', e => { if (e.target.closest('.pw-node-logo')) return; const n = e.target.closest('.pw-node'); if (n) { takeOver(); setActive(+n.dataset.idx); } });

  const pwEl = document.getElementById('pw');
  if (pwEl && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver(es => { es.forEach(e => { if (e.isIntersecting) startAuto(); else stopAuto(); }); }, { threshold: 0.35 });
    io.observe(pwEl);
  }

  drawFlywheel();
  // each step chip wears the colour of the wheel bar its step lights up
  if (stageInfo) nodesEl.querySelectorAll('.wf-node').forEach((n, i) => {
    const sh = stageInfo[stageOf(i)];
    if (sh) n.style.setProperty('--sc', sh.c);
  });
  setActive(0);
})();

// Dark tool hover card · name + what-it-is + "In this workflow:" + Learn more.
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
    let html = '<div class="tt-name">' + (slug && window.neborLogo ? '<span class="t-logo">' + window.neborLogo(slug, 13) + '</span>' : '') + esc(el.getAttribute('data-tip-name')) + '</div>';
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
