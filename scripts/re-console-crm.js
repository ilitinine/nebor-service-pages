// Live console for the CRM & RevOps page (FEEDBACK-crm-revops.md).
// Nine capabilities in three pillars: Architect · Unify · Activate.
//
// TWO RULES, learned the hard way:
//  1. Every view is its OWN artifact (blueprint, report, scorecard, table,
//     dossier, map, canvas, model, dashboard). Never one chassis nine times.
//  2. The design arrives FINISHED. Content is readable at t=0. Story beats play
//     once, fast (done by ~3.5s) and freeze. Only ambient motion loops forever.
// House style: canvas #F5F1EA, panels #FCFAF7 + white 2px + soft shadow. No textures.
// No stack logos (doc: tools come off entirely here); example accounts only.
(function () {
  const caps = window.NEBOR_RE_CAPS || [];
  const rail = document.getElementById("rec-rail");
  const body = document.getElementById("rec-body");
  const path = document.getElementById("rec-path");
  if (!rail || !body) return;

  const INK = "#172A2D", CARD = "#FCFAF7", PAPER = "#FFFFFF", BEIGE = "#F0E9DD", CANVAS = "#F5F1EA";
  const MUT = "rgba(23,42,45,0.5)", LAB = "rgba(23,42,45,0.42)";
  const BLUE = "#5A87A8", BLUEBG = "#E3EDF4", BLUET = "#3D6480";
  const GREEN = "#3E8E58", GREENBG = "#E7F2E9";
  const RED = "#B0563A", REDBG = "#FBE9E4";
  const AMB = "#E1962E", AMBBG = "#F3E7CC", AMBD = "#8A5410", GOLD = "#F3D06A";
  const TEAL = "#2FA093";
  const SLATE = "#8C9AA3";

  // play-once-and-stay (story beats)
  const IN = (b, d) => `<animate attributeName="opacity" from="0" to="1" dur="${d || 0.4}s" begin="${b}s" fill="freeze"/>`;
  const OUT = (b, d) => `<animate attributeName="opacity" from="1" to="0" dur="${d || 0.3}s" begin="${b}s" fill="freeze"/>`;
  const GROW = (attr, from, to, b, d) => `<animate attributeName="${attr}" from="${from}" to="${to}" dur="${d || 0.7}s" begin="${b}s" calcMode="spline" keySplines="0.2 0.7 0.3 1" keyTimes="0;1" fill="freeze"/>`;
  const RISE = (b, dy, d) => `<animateTransform attributeName="transform" type="translate" values="0 ${dy};0 0" dur="${d || 0.5}s" begin="${b}s" calcMode="spline" keySplines="0.2 0.7 0.3 1" fill="freeze"/>`;
  // ambient (loops forever)
  const PULSE = (dur, b) => `<animate attributeName="opacity" values="1;0.35;1" dur="${dur || 2.4}s" begin="${b || 0}s" repeatCount="indefinite"/>`;
  const TRAVEL = (d, dur, b, r, col) => `<circle r="${r || 2.8}" fill="${col || BLUE}" opacity="0"><animateMotion path="${d}" dur="${dur}s" begin="${b}s" repeatCount="indefinite"/><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.12;0.88;1" dur="${dur}s" begin="${b}s" repeatCount="indefinite"/></circle>`;

  const fav = (dom, x, y, s) => `<rect x="${x}" y="${y}" width="${s + 6}" height="${s + 6}" rx="5" fill="#FFFFFF" stroke="rgba(23,42,45,0.06)"/><image href="https://www.google.com/s2/favicons?domain=${dom}&amp;sz=64" x="${x + 3}" y="${y + 3}" width="${s}" height="${s}" class="heroviz-favicon"/>`;
  const canvas = (fill) => `<rect x="14" y="14" width="672" height="344" rx="18" fill="${fill || CANVAS}" stroke="#FFFFFF" stroke-width="2"/>`;
  const panel = (x, y, w, h, fill, rx) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx || 14}" fill="${fill || CARD}" stroke="#FFFFFF" stroke-width="2" filter="drop-shadow(0 6px 14px rgba(23,42,45,0.06))"/>`;
  const strip = (t, pill, pw) => `
    <rect x="14" y="372" width="672" height="34" rx="17" fill="${INK}"/>
    <text x="34" y="393" font-size="12" font-weight="600" fill="rgba(255,255,255,0.88)">${t}</text>
    <rect x="${668 - pw}" y="378" width="${pw}" height="22" rx="11" fill="${GOLD}"/>
    <text x="${668 - pw / 2}" y="392.5" text-anchor="middle" font-size="9.5" font-weight="700" fill="#4A3708">${pill}</text>`;
  const lab = (x, y, t, c) => `<text x="${x}" y="${y}" font-size="7.5" font-weight="700" letter-spacing="0.09em" fill="${c || LAB}">${t}</text>`;

  // your CRM (HubSpot or Salesforce, or whatever you run) and Clay, shown by role
  const crmMarks = (x, y, trail) => `
    ${fav("hubspot.com", x, y, 11)}
    ${fav("salesforce.com", x + 21, y, 11)}
    ${trail ? `<text x="${x + 46}" y="${y + 12}" font-size="7" fill="${LAB}">${trail}</text>` : ""}`;
  const clayMark = (x, y, trail) => `
    ${fav("clay.com", x, y, 11)}
    <text x="${x + 24}" y="${y + 12}" font-size="7" fill="${LAB}">${trail}</text>`;

  const views = {};

  // ═══ 01 · THE SCHEMA BLUEPRINT ═════════════════════════════════════════
  views.implement = () => {
    const ent = (x, y, w, name, rows) => {
      const h = 30 + rows.length * 17;
      return `
        <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" fill="${PAPER}" stroke="#FFFFFF" stroke-width="2" filter="drop-shadow(0 5px 12px rgba(23,42,45,0.08))"/>
        <path d="M${x} ${y + 10} a10 10 0 0 1 10 -10 h${w - 20} a10 10 0 0 1 10 10 v14 h-${w} Z" fill="${INK}"/>
        <text x="${x + 13}" y="${y + 17}" font-size="8.5" font-weight="700" letter-spacing="0.08em" fill="#FFFFFF">${name}</text>
        <circle cx="${x + w - 13}" cy="${y + 12}" r="2.5" fill="${GOLD}"/>
        ${rows.map((r, i) => `
          <circle cx="${x + 15}" cy="${y + 39 + i * 17}" r="2.4" fill="${r[1] ? AMB : "none"}" stroke="${r[1] ? "none" : "rgba(23,42,45,0.22)"}" stroke-width="1"/>
          <text x="${x + 25}" y="${y + 42 + i * 17}" font-size="8" fill="${r[1] ? INK : "rgba(23,42,45,0.55)"}" font-weight="${r[1] ? 600 : 400}">${r[0]}</text>
          ${r[2] ? `<text x="${x + w - 12}" y="${y + 42 + i * 17}" text-anchor="end" font-size="6.5" fill="${r[2] === "required" ? AMBD : LAB}">${r[2]}</text>` : ""}`).join("")}`;
    };
    const rel = (d, lx, ly) => `
      <path d="${d}" fill="none" stroke="rgba(23,42,45,0.28)" stroke-width="1.3"/>
      <rect x="${lx - 3}" y="${ly - 8}" width="26" height="12" rx="6" fill="${AMBBG}"/>
      <text x="${lx + 10}" y="${ly + 1}" text-anchor="middle" font-size="6.5" font-weight="700" fill="${AMBD}">1 : n</text>`;
    const note = (y, k, v) => `
      <text x="512" y="${y}" font-size="6.5" font-weight="700" letter-spacing="0.06em" fill="${LAB}">${k}</text>
      <text x="512" y="${y + 14}" font-size="8.5" font-weight="600" fill="${INK}">${v}</text>`;
    return `<div class="rec-viz"><svg viewBox="0 0 700 412" preserveAspectRatio="xMidYMid meet" aria-hidden="true" font-family="var(--font-sans)">
      ${canvas()}
      ${panel(28, 28, 456, 316, "#EFEAE3", 16)}
      ${lab(46, 52, "THE OBJECT MODEL WE DESIGN WITH YOU")}
      ${crmMarks(414, 42, "")}
      <line x1="46" y1="62" x2="466" y2="62" stroke="rgba(23,42,45,0.1)"/>
      ${ent(46, 78, 168, "COMPANY", [["domain", 1, "unique"], ["ICP tier", 1, "picklist"], ["employees", 0, ""], ["owner", 1, ""]])}
      ${ent(46, 220, 168, "CONTACT", [["email", 1, "unique"], ["role", 0, "picklist"], ["lifecycle stage", 1, ""], ["opted in", 0, ""]])}
      ${ent(288, 144, 178, "DEAL", [["amount", 1, ""], ["stage", 1, ""], ["close date", 1, "required"], ["source", 1, "stamped"], ["next step", 0, ""]])}
      ${rel("M130 184 L130 220", 117, 206)}
      ${rel("M214 124 L252 124 L252 180 L288 180", 222, 118)}
      ${rel("M214 268 L252 268 L252 216 L288 216", 222, 274)}
      <circle r="3" fill="${AMB}" opacity="0"><animateMotion path="M130,184 L130,220" dur="2.6s" begin="0.6s" repeatCount="indefinite"/><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.15;0.85;1" dur="2.6s" begin="0.6s" repeatCount="indefinite"/></circle>
      ${TRAVEL("M214,124 L252,124 L252,180 L288,180", 3, 1.2, 3, AMB)}
      ${TRAVEL("M214,268 L252,268 L252,216 L288,216", 3, 2, 3, AMB)}
      <text x="46" y="330" font-size="8" fill="${LAB}">a fresh build, or the instance you already have · nothing gets ripped out</text>
      ${panel(496, 28, 190, 316, CARD, 16)}
      ${lab(512, 52, "THE SPEC")}
      <line x1="512" y1="62" x2="670" y2="62" stroke="rgba(23,42,45,0.1)"/>
      ${note(82, "PIPELINE · SALES", "New 10 · Qualified 30")}
      <text x="512" y="110" font-size="8.5" font-weight="600" fill="${INK}">Proposal 60 · Won 100</text>
      ${note(140, "LIFECYCLE", "Lead › MQL › SQL › Customer")}
      ${note(184, "PROPERTIES", "14 custom · 4 required")}
      ${note(228, "ROUTING", "by tier, then territory")}
      <g opacity="0">${IN(1.2, 0.45)}
        <g transform="rotate(-7 582 292)">
          <rect x="512" y="270" width="140" height="44" rx="8" fill="none" stroke="${GREEN}" stroke-width="2"/>
          <text x="582" y="290" text-anchor="middle" font-size="10.5" font-weight="800" letter-spacing="0.14em" fill="${GREEN}">SIGNED OFF</text>
          <text x="582" y="304" text-anchor="middle" font-size="6" font-weight="600" fill="${GREEN}">by your team, before we build</text>
        </g>
      </g>
      ${strip("The architecture, drawn around your motion", "the blueprint", 108)}
    </svg></div>`;
  };

  // ═══ 02 · THE CUTOVER REPORT ═══════════════════════════════════════════
  views.migrate = () => {
    const row = (y, obj, n, b) => `
      <text x="52" y="${y}" font-size="9" font-weight="600" fill="${INK}">${obj}</text>
      <text x="262" y="${y}" text-anchor="end" font-size="9" fill="rgba(23,42,45,0.55)">${n}</text>
      <rect x="284" y="${y - 8}" width="72" height="8" rx="4" fill="rgba(23,42,45,0.06)"/>
      <rect x="284" y="${y - 8}" width="0" height="8" rx="4" fill="${GREEN}" opacity="0.8">${GROW("width", 0, 72, b, 0.8)}</rect>
      <text x="404" y="${y}" text-anchor="end" font-size="9" font-weight="700" fill="${INK}" opacity="0">${n}${IN(b + 0.7, 0.3)}</text>
      <path d="M418 ${y - 8} L422 ${y - 4} L430 ${y - 13}" fill="none" stroke="${GREEN}" stroke-width="1.9" stroke-linecap="round" opacity="0">${IN(b + 0.85, 0.25)}</path>
      <line x1="52" y1="${y + 10}" x2="440" y2="${y + 10}" stroke="rgba(23,42,45,0.05)"/>`;
    const chip = (i, t) => {
      const x = 480 + (i % 2) * 96, y = 250 + Math.floor(i / 2) * 24;
      return `<g opacity="0">${IN(2.4 + i * 0.08, 0.3)}
        <rect x="${x}" y="${y}" width="88" height="18" rx="9" fill="${GREENBG}"/>
        <text x="${x + 44}" y="${y + 12.5}" text-anchor="middle" font-size="6.5" font-weight="700" fill="${GREEN}">${t} ✓</text></g>`;
    };
    return `<div class="rec-viz"><svg viewBox="0 0 700 412" preserveAspectRatio="xMidYMid meet" aria-hidden="true" font-family="var(--font-sans)">
      ${canvas()}
      ${panel(28, 28, 428, 316, CARD, 16)}
      ${lab(52, 56, "CUTOVER REPORT · LEGACY TO YOUR NEW CRM")}
      <text x="52" y="78" font-size="14" font-weight="700" fill="${INK}">Every record accounted for</text>
      ${crmMarks(360, 66, "· into yours")}
      <line x1="52" y1="92" x2="440" y2="92" stroke="rgba(23,42,45,0.1)"/>
      ${lab(52, 112, "OBJECT")}
      ${lab(212, 112, "IN LEGACY")}
      ${lab(284, 112, "MOVING ACROSS")}
      ${lab(414, 112, "MATCHED")}
      ${row(142, "Companies", "8,412", 0.4)}
      ${row(176, "Contacts", "21,338", 0.6)}
      ${row(210, "Deals · open and closed", "3,104", 0.8)}
      ${row(244, "Notes, calls and emails", "96,240", 1.0)}
      ${row(278, "Attachments", "4,878", 1.2)}
      <text x="52" y="306" font-size="8" fill="${LAB}">the legacy tool stays read-only until you sign off · nothing is deleted on our word</text>
      <text x="52" y="322" font-size="8" font-style="italic" fill="${MUT}">owners, timestamps and threads land exactly where they belong</text>
      ${panel(472, 28, 214, 316, CARD, 16)}
      <g opacity="0">${IN(2, 0.5)}
        <g transform="rotate(-6 578 150)">
          <circle cx="578" cy="150" r="72" fill="${GREENBG}"/>
          <circle cx="578" cy="150" r="72" fill="none" stroke="${GREEN}" stroke-width="1.5" stroke-dasharray="2 4"/>
          <circle cx="578" cy="150" r="62" fill="none" stroke="${GREEN}" stroke-width="2"/>
          <text x="578" y="142" text-anchor="middle" font-size="38" font-weight="800" fill="${GREEN}">0</text>
          <text x="578" y="162" text-anchor="middle" font-size="9" font-weight="700" letter-spacing="0.1em" fill="${GREEN}">RECORDS</text>
          <text x="578" y="176" text-anchor="middle" font-size="9" font-weight="700" letter-spacing="0.1em" fill="${GREEN}">LOST</text>
        </g>
      </g>
      ${lab(480, 240, "CARRIED ACROSS", "rgba(62,142,88,0.75)")}
      ${chip(0, "history")}
      ${chip(1, "owners")}
      ${chip(2, "threads")}
      ${chip(3, "files")}
      ${chip(4, "timestamps")}
      ${chip(5, "custom fields")}
      <text x="578" y="330" text-anchor="middle" font-size="8" font-weight="700" fill="${INK}" opacity="0">counts match on both sides${IN(2.8, 0.4)}</text>
      ${strip("Off the legacy tool, with everything intact", "zero loss", 82)}
    </svg></div>`;
  };

  // ═══ 03 · THE TANGLE, AND THE REPAIR ═════════════════════════════════
  views.optimize = () => {
    const N = [[74, 92], [148, 122], [216, 84], [286, 118], [112, 128], [252, 136], [186, 108]];
    const tangle = N.map(([x, y], i) => `<circle cx="${x}" cy="${y}" r="7" fill="${PAPER}" stroke="${RED}" stroke-width="1.4"/>`).join("");
    const wires = [[0, 3], [1, 2], [4, 5], [2, 4], [6, 3], [0, 5], [1, 6], [2, 5]].map(([a, b], i) => {
      const [x1, y1] = N[a], [x2, y2] = N[b];
      return `<path d="M${x1} ${y1} C ${(x1 + x2) / 2} ${y1 - 26}, ${(x1 + x2) / 2} ${y2 + 26}, ${x2} ${y2}" fill="none" stroke="rgba(176,86,58,0.5)" stroke-width="1.3"><animate attributeName="opacity" values="0.85;0.4;0.85" dur="${2.6 + i * 0.2}s" repeatCount="indefinite"/></path>`;
    }).join("");
    const chain = [408, 484, 560, 636].map((x, i) => `
      ${i < 3 ? `<path d="M${x + 9} 110 L${x + 67} 110" fill="none" stroke="rgba(62,142,88,0.5)" stroke-width="1.5"/><path d="M${x + 61} 106 L${x + 69} 110 L${x + 61} 114 Z" fill="${GREEN}"/>` : ""}
      <circle cx="${x}" cy="110" r="9" fill="${PAPER}" stroke="${GREEN}" stroke-width="1.6"/>
      <text x="${x}" y="132" text-anchor="middle" font-size="6.5" font-weight="600" fill="${MUT}">${["score", "match", "assign", "notify"][i]}</text>`).join("");
    const found = (y, sev, sevc, sevbg, txt, detail) => `
      <rect x="42" y="${y}" width="58" height="17" rx="8.5" fill="${sevbg}"/>
      <text x="71" y="${y + 12}" text-anchor="middle" font-size="6" font-weight="700" letter-spacing="0.04em" fill="${sevc}">${sev}</text>
      <text x="110" y="${y + 12}" font-size="8.5" font-weight="600" fill="${INK}">${txt}</text>
      <text x="110" y="${y + 25}" font-size="7.5" fill="${MUT}">${detail}</text>`;
    const fixed = (y, txt, detail, b) => `
      <g opacity="0">${IN(b, 0.35)}${RISE(b, 6, 0.4)}
        <circle cx="391" cy="${y + 8}" r="8" fill="${GREENBG}"/>
        <path d="M387 ${y + 8} L390 ${y + 11} L395.5 ${y + 4.5}" fill="none" stroke="${GREEN}" stroke-width="1.6" stroke-linecap="round"/>
        <text x="410" y="${y + 12}" font-size="8.5" font-weight="600" fill="${INK}">${txt}</text>
        <text x="410" y="${y + 25}" font-size="7.5" fill="${MUT}">${detail}</text>
      </g>`;
    return `<div class="rec-viz"><svg viewBox="0 0 700 412" preserveAspectRatio="xMidYMid meet" aria-hidden="true" font-family="var(--font-sans)">
      ${canvas()}
      ${panel(28, 28, 314, 316, CARD, 16)}
      ${lab(42, 52, "WHAT WE FOUND", RED)}
      ${crmMarks(246, 42, "")}
      <line x1="42" y1="62" x2="328" y2="62" stroke="rgba(176,86,58,0.18)"/>
      <rect x="42" y="70" width="286" height="82" rx="10" fill="rgba(176,86,58,0.05)"/>
      ${wires}
      ${tangle}
      <text x="185" y="166" text-anchor="middle" font-size="7.5" font-weight="600" fill="${RED}">rules stacked on rules, nobody sure which one wins</text>
      <line x1="42" y1="178" x2="328" y2="178" stroke="rgba(23,42,45,0.06)"/>
      ${found(190, "CRITICAL", RED, REDBG, "rules that contradict each other", "leads land with two owners, or none")}
      ${found(232, "CRITICAL", RED, REDBG, "automations firing on the same event", "the second silently undoes the first")}
      ${found(274, "HIGH", AMBD, AMBBG, "deals close with no source", "nobody can prove what is working")}
      ${found(316, "MEDIUM", "rgba(23,42,45,0.55)", "rgba(23,42,45,0.07)", "dashboards nobody trusts", "everyone brings their own numbers")}
      <path d="M348 186 L360 186" stroke="rgba(23,42,45,0.3)" stroke-width="1.5"/>
      <path d="M356 182 L364 186 L356 190 Z" fill="${INK}"/>
      ${panel(366, 28, 306, 316, CARD, 16)}
      ${lab(382, 52, "WHAT WE REBUILT", GREEN)}
      <text x="656" y="52" text-anchor="end" font-size="8" font-weight="700" fill="${GREEN}" opacity="0">rebuilt ✓${IN(1.8, 0.4)}</text>
      <line x1="382" y1="62" x2="656" y2="62" stroke="rgba(62,142,88,0.18)"/>
      <rect x="382" y="70" width="274" height="82" rx="10" fill="rgba(62,142,88,0.05)"/>
      ${chain}
      <text x="519" y="166" text-anchor="middle" font-size="7.5" font-weight="600" fill="${GREEN}">one path, one owner, one place to look</text>
      <line x1="382" y1="178" x2="656" y2="178" stroke="rgba(23,42,45,0.06)"/>
      ${fixed(190, "one rule set, one owner per lead", "written with your team, tested on real leads", 0.5)}
      ${fixed(232, "one automation, tested end to end", "you can name what fires, and when", 0.8)}
      ${fixed(274, "source stamped on every deal", "the attribution report finally adds up", 1.1)}
      ${fixed(316, "one dashboard leadership signs off on", "one number, one meaning, one place", 1.4)}
      ${strip("Rebuilt until your team relies on it again", "the repair", 88)}
    </svg></div>`;
  };

  // ═══ 04 · THE RECORDS TABLE ════════════════════════════════════════════
  views.hygiene = () => {
    const dupe = (y, dom, nm, domain, own, made, i) => `
      <g opacity="1">${i > 0 ? OUT(3.6, 0.4) : OUT(3.6, 0.4)}
        <rect x="44" y="${y}" width="484" height="28" fill="${REDBG}" opacity="0.5"/>
        <rect x="52" y="${y + 9}" width="10" height="10" rx="2.5" fill="${PAPER}" stroke="rgba(23,42,45,0.25)"/>
        <g opacity="0">${IN(1.6 + i * 0.35, 0.3)}
          <rect x="52" y="${y + 9}" width="10" height="10" rx="2.5" fill="${BLUE}"/>
          <path d="M54.5 ${y + 14} L56.5 ${y + 16} L59.8 ${y + 11.6}" fill="none" stroke="#FFFFFF" stroke-width="1.4" stroke-linecap="round"/>
        </g>
        ${fav(dom, 70, y + 6, 10)}
        <text x="98" y="${y + 18.5}" font-size="9" font-weight="600" fill="${INK}">${nm}</text>
        <text x="228" y="${y + 18.5}" font-size="8.5" fill="rgba(23,42,45,0.6)">${domain}</text>
        <text x="348" y="${y + 18.5}" font-size="8.5" fill="rgba(23,42,45,0.6)">${own}</text>
        <text x="418" y="${y + 18.5}" font-size="8" fill="${LAB}">${made}</text>
        <rect x="472" y="${y + 6}" width="50" height="16" rx="8" fill="${REDBG}"/>
        <text x="497" y="${y + 17.5}" text-anchor="middle" font-size="6.5" font-weight="700" fill="${RED}">duplicate</text>
      </g>`;
    const clean = (y, dom, nm, domain, own, made, shift, b) => `
      <g${b !== undefined ? ' opacity="0"' : ""}>
        ${b !== undefined ? IN(b, 0.4) : ""}
        ${shift ? `<animateTransform attributeName="transform" type="translate" values="0 0;0 -56" dur="0.5s" begin="3.8s" calcMode="spline" keySplines="0.2 0.7 0.3 1" fill="freeze"/>` : ""}
        <rect x="52" y="${y + 9}" width="10" height="10" rx="2.5" fill="${PAPER}" stroke="rgba(23,42,45,0.25)"/>
        ${fav(dom, 70, y + 6, 10)}
        <text x="98" y="${y + 18.5}" font-size="9" font-weight="600" fill="${INK}">${nm}</text>
        <text x="228" y="${y + 18.5}" font-size="8.5" fill="rgba(23,42,45,0.6)">${domain}</text>
        <text x="348" y="${y + 18.5}" font-size="8.5" fill="rgba(23,42,45,0.6)">${own}</text>
        <text x="418" y="${y + 18.5}" font-size="8" fill="${LAB}">${made}</text>
        <rect x="472" y="${y + 6}" width="50" height="16" rx="8" fill="${GREENBG}"/>
        <text x="497" y="${y + 17.5}" text-anchor="middle" font-size="6.5" font-weight="700" fill="${GREEN}">clean ✓</text>
        <line x1="44" y1="${y + 28}" x2="528" y2="${y + 28}" stroke="rgba(23,42,45,0.05)"/>
      </g>`;
    const gate = (y, nm, sub, b) => `
      <g opacity="0">${IN(b, 0.35)}
        <circle cx="570" cy="${y}" r="9" fill="${GREENBG}"/>
        <path d="M565.5 ${y} L568.5 ${y + 3} L574.5 ${y - 3.5}" fill="none" stroke="${GREEN}" stroke-width="1.7" stroke-linecap="round"/>
        <text x="588" y="${y - 1}" font-size="8.5" font-weight="700" fill="${INK}">${nm}</text>
        <text x="588" y="${y + 10}" font-size="7" fill="${MUT}">${sub}</text>
      </g>`;
    return `<div class="rec-viz"><svg viewBox="0 0 700 412" preserveAspectRatio="xMidYMid meet" aria-hidden="true" font-family="var(--font-sans)">
      ${canvas()}
      ${panel(28, 28, 512, 316, CARD, 16)}
      <text x="44" y="52" font-size="12" font-weight="700" fill="${INK}">Companies</text>
      <text x="116" y="52" font-size="9" fill="${MUT}">8,412 records</text>
      ${crmMarks(300, 40, "")}
      <g opacity="0">${IN(2.9, 0.3)}${OUT(3.7, 0.3)}
        <rect x="196" y="38" width="94" height="20" rx="10" fill="${INK}"/>
        <text x="243" y="51.5" text-anchor="middle" font-size="8" font-weight="700" fill="${CARD}">Merge 3 into 1</text>
      </g>
      <rect x="444" y="38" width="84" height="20" rx="10" fill="${REDBG}"><animate attributeName="opacity" from="1" to="0" dur="0.3s" begin="3.6s" fill="freeze"/></rect>
      <text x="486" y="51.5" text-anchor="middle" font-size="7.5" font-weight="700" fill="${RED}">3 flagged<animate attributeName="opacity" from="1" to="0" dur="0.3s" begin="3.6s" fill="freeze"/></text>
      <g opacity="0">${IN(3.9, 0.45)}
        <rect x="424" y="38" width="104" height="20" rx="10" fill="${GREENBG}"/>
        <text x="476" y="51.5" text-anchor="middle" font-size="7.5" font-weight="700" fill="${GREEN}">0 duplicates left</text>
      </g>
      <line x1="44" y1="68" x2="524" y2="68" stroke="rgba(23,42,45,0.1)"/>
      ${lab(98, 86, "COMPANY")}
      ${lab(228, 86, "DOMAIN")}
      ${lab(348, 86, "OWNER")}
      ${lab(418, 86, "CREATED")}
      ${lab(472, 86, "STATUS")}
      <line x1="44" y1="94" x2="528" y2="94" stroke="rgba(23,42,45,0.06)"/>
      ${dupe(98, "figma.com", "Figma", "figma.com", "Sara", "Mar 2024", 0)}
      ${dupe(126, "figma.com", "Figma Inc.", "www.Figma.com/", "unassigned", "Jan 2023", 1)}
      ${dupe(154, "figma.com", "FIGMA (import)", "figma.com", "Tom", "CSV import", 2)}
      <g opacity="0">${IN(3.85, 0.45)}
        <rect x="44" y="98" width="484" height="28" fill="${GREENBG}" opacity="0.45"/>
        <rect x="52" y="107" width="10" height="10" rx="2.5" fill="${PAPER}" stroke="rgba(23,42,45,0.25)"/>
        ${fav("figma.com", 70, 104, 10)}
        <text x="98" y="116.5" font-size="9" font-weight="700" fill="${INK}">Figma</text>
        <text x="228" y="116.5" font-size="8.5" font-weight="600" fill="${INK}">figma.com</text>
        <text x="348" y="116.5" font-size="8.5" font-weight="600" fill="${INK}">Sara</text>
        <text x="418" y="116.5" font-size="8" fill="${LAB}">Jan 2023</text>
        <rect x="472" y="104" width="50" height="16" rx="8" fill="${GREENBG}"/>
        <text x="497" y="115.5" text-anchor="middle" font-size="6.5" font-weight="700" fill="${GREEN}">clean ✓</text>
        <text x="44" y="312" font-size="7.5" font-style="italic" fill="${GREEN}" opacity="0">${IN(4.1, 0.4)}the oldest record was kept · history from all three merged in · nothing dropped</text>
      </g>
      ${clean(182, "loom.com", "Loom", "loom.com", "Dana", "Feb 2024", 1)}
      ${clean(210, "linear.app", "Linear", "linear.app", "Ravi", "Apr 2024", 1)}
      ${clean(238, "notion.so", "Notion", "notion.so", "Sara", "Apr 2024", 1)}
      ${clean(210, "miro.com", "Miro", "miro.com", "Dana", "Apr 2024", 0, 4.3)}
      ${clean(238, "vercel.com", "Vercel", "vercel.com", "Ravi", "May 2024", 0, 4.45)}
      ${clean(266, "airtable.com", "Airtable", "airtable.com", "Sara", "May 2024", 0, 4.6)}
      <text x="44" y="332" font-size="9" font-weight="600" fill="${INK}">Runs on every record coming in <tspan font-weight="400" fill="${MUT}">· not once a quarter when someone finally notices</tspan></text>
      ${panel(556, 28, 130, 316, CARD, 16)}
      ${lab(572, 56, "ON EVERY WRITE")}
      <line x1="572" y1="66" x2="670" y2="66" stroke="rgba(23,42,45,0.07)"/>
      ${gate(96, "Deduped", "no second Figma", 0.4)}
      ${gate(146, "Normalized", "one clean format", 0.55)}
      ${gate(196, "Validated", "proven real", 0.7)}
      <text x="572" y="250" font-size="7.5" font-style="italic" fill="${MUT}">the next import</text>
      <text x="572" y="261" font-size="7.5" font-style="italic" fill="${MUT}">cannot undo</text>
      <text x="572" y="272" font-size="7.5" font-style="italic" fill="${MUT}">any of this</text>
      ${clayMark(572, 286, "+ your rules")}
      <text x="572" y="312" font-size="7" fill="${LAB}">checks each write</text>
      <circle cx="576" cy="330" r="3" fill="${GREEN}">${PULSE(2.4)}</circle>
      <text x="586" y="333" font-size="7.5" font-weight="700" fill="${GREEN}">always on</text>
      ${strip("The clean foundation everything else depends on", "always on", 84)}
    </svg></div>`;
  };

  // ═══ 05 · THE LIVING DOSSIER ═══════════════════════════════════════════
  views.enrich = () => {
    const field = (y, k, oldv, newv, w, b) => `
      <text x="64" y="${y}" font-size="6.5" font-weight="700" letter-spacing="0.06em" fill="${LAB}">${k}</text>
      <g opacity="1"><animate attributeName="opacity" from="1" to="0.4" dur="0.3s" begin="${b + 0.3}s" fill="freeze"/>
        <text x="64" y="${y + 16}" font-size="9.5" font-weight="600" fill="rgba(23,42,45,0.55)">${oldv}</text>
        <line x1="64" y1="${y + 12}" x2="64" y2="${y + 12}" stroke="rgba(23,42,45,0.5)" stroke-width="1.2">${GROW("x2", 64, 64 + w, b, 0.35)}</line>
      </g>
      <g opacity="0">${IN(b + 0.35, 0.3)}
        <circle cx="${70 + w}" cy="${y + 12}" r="1.6" fill="${GREEN}"/>
        <text x="${78 + w}" y="${y + 16}" font-size="9.5" font-weight="700" fill="${INK}">${newv}</text>
      </g>`;
    const evt = (y, when, head, sub, b) => `
      <g opacity="0">${IN(b, 0.35)}${RISE(b, -8, 0.4)}
        <circle cx="408" cy="${y + 16}" r="4.5" fill="${PAPER}" stroke="${TEAL}" stroke-width="2"/>
        <rect x="426" y="${y}" width="244" height="42" rx="10" fill="${PAPER}" stroke="rgba(23,42,45,0.06)" filter="drop-shadow(0 3px 7px rgba(23,42,45,0.05))"/>
        <text x="440" y="${y + 15}" font-size="6" font-weight="700" letter-spacing="0.06em" fill="${TEAL}">${when}</text>
        <text x="440" y="${y + 28}" font-size="9" font-weight="600" fill="${INK}">${head}</text>
        <text x="440" y="${y + 38}" font-size="7" fill="${MUT}">${sub}</text>
      </g>`;
    return `<div class="rec-viz"><svg viewBox="0 0 700 412" preserveAspectRatio="xMidYMid meet" aria-hidden="true" font-family="var(--font-sans)">
      <defs><clipPath id="crmDsr"><circle cx="78" cy="88" r="20"/></clipPath></defs>
      ${canvas()}
      ${panel(28, 28, 356, 316, CARD, 16)}
      <circle cx="78" cy="88" r="21" fill="#EFE9DC" stroke="#FFFFFF" stroke-width="1.5"/>
      <image href="assets/brand/wouter.png" x="58" y="68" width="40" height="40" clip-path="url(#crmDsr)" preserveAspectRatio="xMidYMin slice"/>
      <text x="112" y="82" font-size="13" font-weight="700" fill="${INK}">Dana Wu</text>
      <text x="112" y="97" font-size="8.5" fill="${MUT}">the buyer at Loom</text>
      ${fav("loom.com", 336, 62, 14)}
      ${crmMarks(64, 300, "")}
      <line x1="64" y1="124" x2="360" y2="124" stroke="rgba(23,42,45,0.07)"/>
      ${field(146, "TITLE", "Head of Design", "VP Design", 80, 0.6)}
      ${field(198, "COMPANY FUNDING", "Series B · 2024", "Series C", 78, 1.0)}
      ${field(250, "ACCOUNT TIER", "Tier 2 · watch", "Tier 1", 76, 1.4)}
      <line x1="64" y1="290" x2="360" y2="290" stroke="rgba(23,42,45,0.07)"/>
      <circle cx="68" cy="310" r="3" fill="${GREEN}">${PULSE(2.4)}</circle>
      <text x="78" y="313" font-size="8" font-weight="700" fill="${GREEN}">verified moments ago</text>
      <text x="360" y="313" text-anchor="end" font-size="7.5" font-style="italic" fill="${MUT}">no rep opened this</text>
      <line x1="408" y1="52" x2="408" y2="308" stroke="rgba(47,160,147,0.25)" stroke-width="1.5"/>
      ${lab(426, 44, "THE WORLD, CHANGING", TEAL)}
      ${clayMark(600, 34, "+ workflows")}
      ${evt(54, "SPOTTED JUST NOW", "Dana Wu promoted to VP Design", "title updated · she signs the contract now", 0.5)}
      ${evt(110, "SPOTTED THIS MORNING", "Loom announces its Series C", "funding updated · the budget just moved", 0.9)}
      ${evt(166, "SPOTTED THIS WEEK", "12 open roles across design ops", "tier raised · they are scaling the team you sell to", 1.3)}
      ${evt(222, "ALWAYS WATCHING", "job moves · funding · tech · hiring", "flowing in on their own, as they happen", 1.7)}
      <circle cx="408" cy="290" r="4" fill="${TEAL}" opacity="0.9">${PULSE(2.2)}</circle>
      <text x="426" y="313" font-size="8" font-style="italic" fill="${MUT}">every change lands on the record before your rep needs it</text>
      ${strip("A database that keeps itself current", "never stale", 90)}
    </svg></div>`;
  };

  // ═══ 06 · THE HUB · every system converges on one record ═════════════
  views.integrate = () => {
    const XS = [34, 195, 356, 517], CW = 149, CX = XS.map((x) => x + CW / 2);
    const box = (i, y, nm, what) => `
      ${panel(XS[i], y, CW, 44, PAPER, 11)}
      <text x="${XS[i] + 14}" y="${y + 19}" font-size="9.5" font-weight="700" fill="${INK}">${nm}</text>
      <text x="${XS[i] + 14}" y="${y + 33}" font-size="7" fill="${MUT}">${what}</text>`;
    // one packet at a time, visiting each system in turn: calm, not a swarm
    const CYCLE = 10;
    const packet = (d, slot, col) => {
      const s = slot * 0.125, e = s + 0.1;
      return `<circle r="3.2" fill="${col}" opacity="0">
        <animateMotion path="${d}" keyPoints="0;0;1;1" keyTimes="0;${s};${e};1" calcMode="linear" dur="${CYCLE}s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0;${s};${(s + 0.012).toFixed(3)};${(e - 0.012).toFixed(3)};${e};1" dur="${CYCLE}s" repeatCount="indefinite"/>
      </circle>`;
    };
    const inCurve = (i) => {
      const x = CX[i], tx = 338 + i * 8;
      const d = `M${x},98 C ${x},130 ${(x + tx) / 2},128 ${tx},158`;
      return `<path d="${d}" fill="none" stroke="rgba(23,42,45,0.2)" stroke-width="1.4"/>${packet(d, i * 2, BLUE)}`;
    };
    const outCurve = (i) => {
      const x = CX[i], fx = 338 + i * 8;
      const d = `M${fx},244 C ${fx},268 ${(x + fx) / 2},266 ${x},292`;
      return `<path d="${d}" fill="none" stroke="rgba(225,150,46,0.28)" stroke-width="1.4"/>${packet(d, i * 2 + 1, AMB)}`;
    };
    return `<div class="rec-viz"><svg viewBox="0 0 700 412" preserveAspectRatio="xMidYMid meet" aria-hidden="true" font-family="var(--font-sans)">
      ${canvas()}
      ${lab(34, 44, "EVERY SYSTEM THAT KNOWS SOMETHING")}
      ${box(0, 54, "Website & forms", "who asked, and for what")}
      ${box(1, 54, "Product", "who is using it, and how much")}
      ${box(2, 54, "Billing", "what they pay, and when")}
      ${box(3, 54, "Support desk", "what is going wrong")}
      ${inCurve(0)}${inCurve(1)}${inCurve(2)}${inCurve(3)}
      <rect x="262" y="158" width="176" height="86" rx="16" fill="${INK}" filter="drop-shadow(0 10px 22px rgba(23,42,45,0.18))"/>
      <circle cx="350" cy="201" r="58" fill="none" stroke="rgba(243,208,106,0.22)" stroke-width="1.5" opacity="0"><animate attributeName="r" values="50;74" dur="3.4s" repeatCount="indefinite"/><animate attributeName="opacity" values="0.5;0" dur="3.4s" repeatCount="indefinite"/></circle>
      <text x="350" y="182" text-anchor="middle" font-size="13" font-weight="700" fill="#FFFFFF">Your CRM</text>
      ${fav("hubspot.com", 306, 190, 11)}
      ${fav("salesforce.com", 327, 190, 11)}
      <text x="352" y="202" font-size="7" fill="rgba(255,255,255,0.5)">· or yours</text>
      <rect x="278" y="214" width="144" height="18" rx="9" fill="${GOLD}"/>
      <text x="350" y="227" text-anchor="middle" font-size="7.5" font-weight="700" fill="#4A3708">one record per company</text>
      <circle cx="428" cy="168" r="3.5" fill="${GREEN}">${PULSE(2.4)}</circle>
      ${outCurve(0)}${outCurve(1)}${outCurve(2)}${outCurve(3)}
      ${box(0, 292, "Marketing", "who is real, who converted")}
      ${box(1, 292, "Sales", "one pipeline, one number")}
      ${box(2, 292, "Success", "who is at risk, who renews")}
      ${box(3, 292, "Leadership", "the forecast they trust")}
      ${strip("Every team, one source of truth", "all wired in", 96)}
    </svg></div>`;
  };

  // ═══ 07 · THE WORKFLOW CANVAS ══════════════════════════════════════════
  views.automation = () => {
    const node = (x, y, w, h, nm, sub, fill, stroke) => `
      <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="11" fill="${fill || PAPER}" stroke="${stroke || "#FFFFFF"}" stroke-width="2" filter="drop-shadow(0 4px 10px rgba(23,42,45,0.06))"/>
      <text x="${x + 14}" y="${y + 19}" font-size="9" font-weight="700" fill="${INK}">${nm}</text>
      ${sub ? `<text x="${x + 14}" y="${y + 32}" font-size="7" fill="${MUT}">${sub}</text>` : ""}`;
    const wire = (d, col) => `<path d="${d}" fill="none" stroke="${col || "rgba(90,135,168,0.4)"}" stroke-width="1.5"/>`;
    return `<div class="rec-viz"><svg viewBox="0 0 700 412" preserveAspectRatio="xMidYMid meet" aria-hidden="true" font-family="var(--font-sans)">
      ${canvas()}
      <text x="34" y="46" font-size="11" font-weight="700" fill="${INK}">Workflow · Proposal hygiene</text>
      <circle cx="204" cy="42" r="3.5" fill="${GREEN}">${PULSE(2.2)}</circle>
      <text x="213" y="45" font-size="8" font-weight="700" fill="${GREEN}">live</text>
      ${crmMarks(560, 34, "")}
      ${lab(34, 76, "WHEN THIS HAPPENS")}
      ${node(34, 92, 152, 48, "Deal → Proposal", "any rep, any deal", BEIGE, "#FFFFFF")}
      ${wire("M186 116 L236 116")}
      <path d="M300 88 L354 116 L300 144 L246 116 Z" fill="${PAPER}" stroke="${BLUE}" stroke-width="1.6" filter="drop-shadow(0 4px 10px rgba(23,42,45,0.06))"/>
      <text x="300" y="113" text-anchor="middle" font-size="7.5" font-weight="700" fill="${INK}">close date</text>
      <text x="300" y="124" text-anchor="middle" font-size="7.5" font-weight="700" fill="${INK}">set?</text>
      <text x="308" y="70" font-size="7" font-weight="700" fill="${RED}">NO</text>
      <text x="308" y="168" font-size="7" font-weight="700" fill="${GREEN}">YES</text>
      ${wire("M300 88 L300 58 L376 58", "rgba(176,86,58,0.45)")}
      ${wire("M300 144 L300 174 L376 174", "rgba(62,142,88,0.45)")}
      ${lab(376, 30, "SO IT DOES THIS, ITSELF")}
      ${node(376, 36, 158, 44, "Hold the deal", "it cannot move without one", "#FBF3F0", "#FFFFFF")}
      ${node(376, 152, 158, 44, "Notify the channel", "the room sees it move")}
      ${wire("M534 58 L562 58 L562 96")}
      ${wire("M534 174 L562 174 L562 140")}
      ${node(506, 96, 160, 44, "Task to the owner", "due today, not someday")}
      ${wire("M586 140 L586 184")}
      ${node(506, 184, 160, 44, "Re-roll the forecast", "the Monday number stays true")}
      ${wire("M586 228 L586 252 L300 252 L300 230")}
      ${node(220, 186, 160, 44, "Log the run", "every action, reversible")}
      <circle r="4" fill="${AMB}"><animateMotion path="M188,116 L236,116 M300,88 L300,58 L376,58 M534,58 L562,58 L562,96 M586,140 L586,184 M586,228 L586,252 L300,252 L300,230" dur="4.5s" repeatCount="indefinite"/><animate attributeName="opacity" values="0;1;1;1;0" keyTimes="0;0.05;0.5;0.9;1" dur="4.5s" repeatCount="indefinite"/></circle>
      <rect x="34" y="186" width="152" height="44" rx="11" fill="${GREENBG}"/>
      <text x="110" y="206" text-anchor="middle" font-size="9" font-weight="700" fill="${GREEN}">done in 3 seconds</text>
      <text x="110" y="219" text-anchor="middle" font-size="7.5" font-weight="600" fill="${GREEN}">nobody touched it</text>
      <line x1="34" y1="272" x2="666" y2="272" stroke="rgba(23,42,45,0.06)"/>
      <text x="34" y="300" font-size="9" font-weight="600" fill="${INK}">One of the workflows we build with you <tspan font-weight="400" fill="${MUT}">· each one wired to a real event in your CRM, each one logged and reversible</tspan></text>
      <text x="34" y="322" font-size="8" font-style="italic" fill="${MUT}">the shape stays the same whatever the trigger is: something happens, the system checks, the system acts</text>
      ${strip("The manual work, done by the system", "the engine", 84)}
    </svg></div>`;
  };

  // ═══ 08 · THE SCORING MODEL + IF/THEN ROUTING ════════════════════════
  views.routing = () => {
    const crit = (y, txt, pts, b, neg) => `
      <rect x="34" y="${y}" width="250" height="22" rx="7" fill="${PAPER}" stroke="#FFFFFF" stroke-width="1.5"/>
      <text x="46" y="${y + 15}" font-size="8.5" fill="${INK}">${txt}</text>
      <text x="272" y="${y + 15}" text-anchor="end" font-size="8.5" font-weight="700" fill="${neg ? RED : GREEN}">${pts}</text>
      <rect x="34" y="${y}" width="250" height="22" rx="7" fill="${BLUEBG}" opacity="0"><animate attributeName="opacity" values="0;0.9;0" keyTimes="0;0.4;1" dur="0.5s" begin="${b}s"/></rect>`;
    const lane = (y, h, range, dest, why, hit) => `
      <rect x="326" y="${y}" width="214" height="${h}" rx="12" fill="${hit ? BLUEBG : "none"}" stroke="${hit ? BLUE : "rgba(23,42,45,0.16)"}" stroke-width="${hit ? 2 : 1.2}" ${hit ? "" : 'stroke-dasharray="5 4"'}/>
      <rect x="340" y="${y + 12}" width="24" height="14" rx="7" fill="${hit ? BLUE : "rgba(23,42,45,0.1)"}"/>
      <text x="352" y="${y + 22}" text-anchor="middle" font-size="6" font-weight="800" fill="${hit ? "#FFFFFF" : "rgba(23,42,45,0.5)"}">IF</text>
      <text x="372" y="${y + 23}" font-size="9" font-weight="700" fill="${hit ? BLUET : "rgba(23,42,45,0.5)"}">${range}</text>
      <text x="340" y="${y + 40}" font-size="7" font-weight="800" fill="${hit ? BLUE : "rgba(23,42,45,0.3)"}">THEN</text>
      <text x="372" y="${y + 40}" font-size="9" font-weight="${hit ? 700 : 400}" fill="${hit ? INK : "rgba(23,42,45,0.5)"}">${dest}</text>
      ${why ? `<text x="372" y="${y + 58}" font-size="7.5" font-weight="600" fill="${BLUET}">${why}</text>` : ""}`;
    return `<div class="rec-viz"><svg viewBox="0 0 700 412" preserveAspectRatio="xMidYMid meet" aria-hidden="true" font-family="var(--font-sans)">
      <defs><clipPath id="crmRepR"><circle cx="615" cy="222" r="17"/></clipPath></defs>
      ${canvas()}
      ${panel(20, 26, 280, 318, CARD, 16)}
      ${lab(34, 50, "1 · SCORED ON FIT AND INTENT")}
      <text x="284" y="50" text-anchor="end" font-size="7" fill="${LAB}">POINTS</text>
      ${crit(54, "ICP industry match", "+34", 0.4)}
      ${crit(80, "200 to 2,000 employees", "+20", 0.5)}
      ${crit(106, "visited pricing twice this week", "+28", 0.6)}
      ${crit(132, "replied to the last sequence", "+25", 0.7)}
      ${crit(158, "free email domain", "-15", 0.8, 1)}
      ${crit(184, "a competitor in their stack", "+10", 0.9)}
      ${clayMark(34, 218, "fit data, kept fresh")}
      <text x="34" y="244" font-size="7.5" fill="${LAB}">your model, configured with your team</text>
      <line x1="34" y1="256" x2="284" y2="256" stroke="rgba(23,42,45,0.08)"/>
      ${fav("miro.com", 34, 266, 14)}
      <text x="60" y="278" font-size="10" font-weight="700" fill="${INK}">Miro</text>
      <text x="60" y="290" font-size="7.5" fill="${MUT}">form fill · pricing page · just now</text>
      <rect x="34" y="304" width="180" height="10" rx="5" fill="rgba(23,42,45,0.07)"/>
      <rect x="34" y="304" width="0" height="10" rx="5" fill="${BLUE}">${GROW("width", 0, 156, 0.4, 1)}</rect>
      <text x="284" y="314" text-anchor="end" font-size="17" font-weight="800" fill="${BLUET}" opacity="0">87${IN(1.3, 0.3)}</text>
      <text x="34" y="334" font-size="7.5" font-style="italic" fill="${MUT}">scored the moment the form hit</text>
      ${lab(326, 50, "2 · ROUTED BY THE RULE THAT MATCHES")}
      ${crmMarks(560, 40, "")}
      ${lane(64, 52, "0 to 39", "nurture, no rep time", "", 0)}
      ${lane(128, 52, "40 to 74", "the round robin", "", 0)}
      ${lane(192, 72, "75 and up, ICP fit", "a senior AE, directly", "this lead scored 87 · matched", 1)}
      <path d="M300 297 L312 297 L312 228 L326 228" fill="none" stroke="rgba(90,135,168,0.55)" stroke-width="1.6" stroke-dasharray="100" stroke-dashoffset="100"><animate attributeName="stroke-dashoffset" from="100" to="0" dur="0.7s" begin="1.4s" fill="freeze"/></path>
      <path d="M318 224 L328 228 L318 232 Z" fill="${BLUE}" opacity="0">${IN(2.1, 0.25)}</path>
      <circle r="4.5" fill="${AMB}" opacity="0"><animateMotion path="M302,297 L312,297 L312,228 L326,228" dur="2.8s" begin="2.2s" repeatCount="indefinite"/><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.85;1" dur="2.8s" begin="2.2s" repeatCount="indefinite"/></circle>
      <path d="M540 228 L556 228" fill="none" stroke="rgba(90,135,168,0.55)" stroke-width="1.6" opacity="0">${IN(2.2, 0.3)}</path>
      <path d="M550 224 L560 228 L550 232 Z" fill="${BLUE}" opacity="0">${IN(2.2, 0.3)}</path>
      <g opacity="0">${IN(2.3, 0.4)}
        <rect x="560" y="192" width="110" height="72" rx="12" fill="${PAPER}" stroke="#FFFFFF" stroke-width="2" filter="drop-shadow(0 4px 10px rgba(23,42,45,0.08))"/>
        <circle cx="615" cy="222" r="18" fill="#EFE9DC" stroke="#FFFFFF" stroke-width="1.5"/>
        <image href="assets/brand/almaz.png" x="598" y="205" width="34" height="34" clip-path="url(#crmRepR)" preserveAspectRatio="xMidYMin slice"/>
        <text x="615" y="252" text-anchor="middle" font-size="9.5" font-weight="700" fill="${INK}">Almaz</text>
        <text x="615" y="262" text-anchor="middle" font-size="6.5" fill="${MUT}">senior AE · enterprise</text>
      </g>
      <g opacity="0">${IN(2.5, 0.4)}
        <rect x="326" y="286" width="200" height="20" rx="10" fill="${GREENBG}"/>
        <text x="426" y="300" text-anchor="middle" font-size="8" font-weight="700" fill="${GREEN}">assigned to Almaz in 4 seconds ✓</text>
        <rect x="536" y="286" width="134" height="20" rx="10" fill="${GREENBG}"/>
        <text x="603" y="300" text-anchor="middle" font-size="8" font-weight="700" fill="${GREEN}">task created · call today</text>
      </g>
      <text x="326" y="330" font-size="8" font-style="italic" fill="${MUT}">same lead, same rule, same outcome, every single time, not whenever someone checks the queue</text>
      ${strip("Scored on fit and intent, routed by rule", "enforced", 82)}
    </svg></div>`;
  };

  // ═══ 09 · THE DASHBOARD ════════════════════════════════════════════════
  views.reporting = () => {
    const C = 2 * Math.PI * 34;
    const seg = (frac, off, col, b) => {
      const len = (C * frac).toFixed(1), rest = (C - C * frac).toFixed(1), cs = C.toFixed(1);
      return `<circle cx="570" cy="146" r="34" fill="none" stroke="${col}" stroke-width="17" transform="rotate(-90 570 146)" stroke-dasharray="0 ${cs}" stroke-dashoffset="${(-C * off).toFixed(1)}"><animate attributeName="stroke-dasharray" from="0 ${cs}" to="${len} ${rest}" dur="0.7s" begin="${b}s" calcMode="spline" keySplines="0.2 0.7 0.3 1" keyTimes="0;1" fill="freeze"/></circle>`;
    };
    const legend = (y, col, nm, v, b) => `
      <g opacity="0">${IN(b, 0.3)}
        <rect x="448" y="${y}" width="8" height="8" rx="2" fill="${col}"/>
        <text x="462" y="${y + 8}" font-size="7.5" fill="${INK}">${nm}</text>
        <text x="518" y="${y + 8}" text-anchor="end" font-size="7.5" font-weight="700" fill="${MUT}">${v}</text>
      </g>`;
    const wk = (i, h) => {
      const x = 54 + i * 30, b = 0.4 + i * 0.05;
      return `<rect x="${x}" y="${252 - h}" width="18" height="${h}" rx="4" fill="${BLUE}" opacity="0.85"><animate attributeName="height" from="0" to="${h}" dur="0.6s" begin="${b}s" calcMode="spline" keySplines="0.2 0.7 0.3 1" keyTimes="0;1" fill="freeze"/><animate attributeName="y" from="252" to="${252 - h}" dur="0.6s" begin="${b}s" calcMode="spline" keySplines="0.2 0.7 0.3 1" keyTimes="0;1" fill="freeze"/></rect>`;
    };
    return `<div class="rec-viz"><svg viewBox="0 0 700 412" preserveAspectRatio="xMidYMid meet" aria-hidden="true" font-family="var(--font-sans)">
      ${canvas()}
      <text x="34" y="46" font-size="11" font-weight="700" fill="${INK}">Your revenue dashboard</text>
      <text x="168" y="46" font-size="8.5" fill="${MUT}">Monday, 9:00</text>
      ${crmMarks(250, 34, "")}
      <circle cx="600" cy="42" r="3.5" fill="${GREEN}">${PULSE(2.4)}</circle>
      <text x="610" y="45" font-size="8" font-weight="700" fill="${GREEN}">up to date</text>
      ${panel(34, 58, 192, 88, CARD)}
      ${lab(52, 82, "PIPELINE CREATED · Q3")}
      <text x="52" y="116" font-size="26" font-weight="800" fill="${INK}">€1.24M</text>
      <text x="52" y="133" font-size="7.5" fill="${MUT}">every euro traced to a source</text>
      ${panel(238, 58, 192, 88, CARD)}
      ${lab(256, 82, "DEALS IN FLIGHT")}
      <text x="256" y="116" font-size="26" font-weight="800" fill="${INK}">148</text>
      <text x="256" y="133" font-size="7.5" fill="${MUT}">each with a stage, owner and date</text>
      ${panel(444, 58, 222, 164, CARD)}
      ${lab(460, 82, "WHERE THE PIPELINE CAME FROM")}
      ${seg(0.42, 0, AMB, 0.4)}
      ${seg(0.28, 0.42, BLUE, 0.55)}
      ${seg(0.18, 0.7, TEAL, 0.7)}
      ${seg(0.12, 0.88, SLATE, 0.85)}
      <circle cx="570" cy="146" r="23" fill="${CARD}"/>
      <text x="570" y="143" text-anchor="middle" font-size="10" font-weight="800" fill="${INK}">4</text>
      <text x="570" y="154" text-anchor="middle" font-size="6" fill="${MUT}">sources</text>
      ${legend(106, AMB, "Outbound", "42%", 0.5)}
      ${legend(126, BLUE, "Inbound", "28%", 0.65)}
      ${legend(146, TEAL, "Events", "18%", 0.8)}
      ${legend(166, SLATE, "Partners", "12%", 0.95)}
      <text x="460" y="206" font-size="7.5" font-style="italic" fill="${MUT}">no impressions, no clicks · real pipeline only</text>
      ${panel(34, 158, 396, 132, CARD)}
      ${lab(54, 182, "PIPELINE BY WEEK")}
      <line x1="54" y1="252" x2="414" y2="252" stroke="rgba(23,42,45,0.1)"/>
      ${[38, 52, 44, 66, 58, 74, 62, 82, 70, 88, 78, 94].map((h, i) => wk(i, h)).join("")}
      <text x="54" y="268" font-size="7" fill="${LAB}">W1</text>
      <text x="414" y="268" text-anchor="end" font-size="7" fill="${LAB}">this week</text>
      <rect x="444" y="236" width="222" height="86" rx="14" fill="${INK}" filter="drop-shadow(0 6px 14px rgba(23,42,45,0.12))"/>
      ${lab(462, 260, "THE FORECAST", "rgba(255,255,255,0.5)")}
      <text x="462" y="280" font-size="8" fill="rgba(255,255,255,0.6)">Q3 commit</text>
      <rect x="462" y="288" width="186" height="10" rx="5" fill="rgba(255,255,255,0.15)"/>
      <rect x="462" y="288" width="0" height="10" rx="5" fill="${GOLD}">${GROW("width", 0, 138, 1, 1)}</rect>
      <text x="462" y="314" font-size="7.5" fill="rgba(255,255,255,0.55)">built from stamped deals, not from gut feel</text>
      <g opacity="0">${IN(1.9, 0.4)}
        <rect x="556" y="250" width="92" height="18" rx="9" fill="${GOLD}"/>
        <text x="602" y="263" text-anchor="middle" font-size="7" font-weight="700" fill="#4A3708">leadership signs it</text>
      </g>
      <text x="34" y="310" font-size="8.5" fill="rgba(23,42,45,0.5)">your Sales Engine and Demand Gen motions report into this same backbone</text>
      <text x="34" y="328" font-size="8.5" font-style="italic" fill="${MUT}">so Monday is one number on one screen, and nobody argues with it</text>
      ${strip("The number your leadership trusts", "the backbone", 100)}
    </svg></div>`;
  };

  window.NEBOR_CRM_VIEWS = views;

  function setActive(idx) {
    document.querySelectorAll(".rec-rail-btn").forEach((b, i) => b.classList.toggle("active", i === idx));
    const c = caps[idx];
    if (path) path.textContent = "/ crm-revops / capabilities / " + c.id;
    const head = `<header class="rec-cap-head"><p class="rec-cap-desc">${c.desc || ""}</p></header>`;
    body.innerHTML = head + (views[c.id] || (() => `<div class="rec-viz"></div>`))();
  }

  caps.forEach((c, i) => {
    const btn = document.createElement("button");
    btn.className = "rec-rail-btn" + (c.anchor ? " rec-anchor" : "");
    btn.innerHTML = `
      <span class="idx">${String(i + 1).padStart(2, "0")}</span>
      <span class="lbl">${c.title}</span>
      <span class="tag">${c.tag}</span>`;
    btn.addEventListener("click", () => setActive(i));
    rail.appendChild(btn);
  });
  setActive(Math.max(0, caps.findIndex((c) => c.anchor)));
})();
