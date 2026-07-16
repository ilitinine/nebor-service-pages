// Live console for the Demand Gen / ABM page (FEEDBACK-demand-abm.md).
// Nine demand capabilities · anchor at 02 (the plays engine) · ABM (06) the heaviest card.
// Forked from re-console-v2.js: same rail/click framework, demand-specific views.
(function () {
  const caps = window.NEBOR_RE_CAPS || [];
  const rail = document.getElementById("rec-rail");
  const body = document.getElementById("rec-body");
  const path = document.getElementById("rec-path");
  if (!rail || !body) return;

  const STRIP = (msg, pill) =>
    `<rect x="14" y="372" width="672" height="34" rx="17" fill="#172A2D"/>` +
    `<text x="32" y="393" font-size="12" font-weight="600" fill="rgba(255,255,255,0.85)">${msg}</text>` +
    (pill ? `<rect x="${686 - 24 - pill.w}" y="380" width="${pill.w}" height="18" rx="9" fill="#FAC064"/>` +
      `<text x="${686 - 24 - pill.w / 2}" y="392.5" text-anchor="middle" font-size="9.5" font-weight="700" fill="#172A2D">${pill.t}</text>` : "");
  const LIVE = (x, msg) =>
    `<circle cx="${x + 10}" cy="389" r="4" fill="#FAC064"/>` +
    `<rect x="${x + 20}" y="381" width="40" height="16" rx="8" fill="#FAC064"/>` +
    `<text x="${x + 40}" y="392.5" text-anchor="middle" font-size="8" font-weight="700" fill="#172A2D">live</text>`;
  const fav = (d, x, y, s) => `<image href="https://www.google.com/s2/favicons?domain=${d}&sz=64" x="${x}" y="${y}" width="${s || 15}" height="${s || 15}" class="heroviz-favicon"/>`;

  const views = {
    // 01 · Demand Strategy & Channel Mapping · THE CHANNEL MAP: every channel, graded (no fake numbers)
    strategy: () => `
      <div class="rec-viz">
      <svg viewBox="0 0 700 412" preserveAspectRatio="xMidYMid meet" aria-hidden="true" font-family="var(--font-sans)">
        <g class="cap-layer">
          <rect x="24" y="18" width="652" height="306" rx="14" fill="#FCFAF7" stroke="#FFFFFF" stroke-width="2.5" filter="drop-shadow(0 16px 34px rgba(23,42,45,0.13)) drop-shadow(0 4px 9px rgba(23,42,45,0.06))"/>
          <path d="M24 32 a14 14 0 0 1 14 -14 h624 a14 14 0 0 1 14 14 v16 h-652 Z" fill="#EFEAE3"/>
          <circle cx="42" cy="33" r="3.5" fill="#E0776A"/><circle cx="55" cy="33" r="3.5" fill="#F2CE60"/><circle cx="68" cy="33" r="3.5" fill="#3FCDAD"/>
          <text x="88" y="37" font-size="9" font-family="ui-monospace, Menlo, monospace" fill="rgba(23,42,45,0.55)">your channel map · week 2 deliverable</text>
          <text x="46" y="74" font-size="15" font-weight="800" fill="#172A2D">Every channel your buyers could be on, graded</text>
          <text x="46" y="90" font-size="9" fill="rgba(23,42,45,0.55)">straight from your closed-won data and buyer interviews</text>
          <rect x="46" y="104" width="196" height="24" rx="8" fill="#F5F1EA"/>
          <text x="58" y="120" font-size="9.5" font-weight="800" letter-spacing="0.05em" fill="#8A5410">GO HARD</text>
          <text x="234" y="120" text-anchor="end" font-size="8" fill="rgba(138,84,16,0.7)">where they are</text>
          <rect x="46" y="136" width="196" height="44" rx="10" fill="#FCFAF7" stroke="#FFFFFF" stroke-width="1.6"/>
          <rect x="56" y="146" width="24" height="24" rx="7" fill="#FFFFFF"/>${fav('linkedin.com', 60, 150, 16)}
          <text x="90" y="156" font-size="10.5" font-weight="700" fill="#172A2D">LinkedIn</text>
          <text x="90" y="169" font-size="7.5" fill="rgba(23,42,45,0.55)">your committee scrolls it daily</text>
          <rect x="46" y="186" width="196" height="44" rx="10" fill="#FCFAF7" stroke="#FFFFFF" stroke-width="1.6"/>
          <rect x="56" y="196" width="24" height="24" rx="7" fill="#FFFFFF"/><g transform="translate(61,202)"><rect x="0" y="1.8" width="14" height="11.2" rx="2" fill="none" stroke="#8A5410" stroke-width="1.4"/><line x1="0" y1="5.8" x2="14" y2="5.8" stroke="#8A5410" stroke-width="1.4"/><line x1="3.6" y1="0" x2="3.6" y2="2.6" stroke="#8A5410" stroke-width="1.4"/><line x1="10.4" y1="0" x2="10.4" y2="2.6" stroke="#8A5410" stroke-width="1.4"/></g>
          <text x="90" y="206" font-size="10.5" font-weight="700" fill="#172A2D">Industry events</text>
          <text x="90" y="219" font-size="7.5" fill="rgba(23,42,45,0.55)">where the big deals shake hands</text>
          <rect x="46" y="236" width="196" height="44" rx="10" fill="#FCFAF7" stroke="#FFFFFF" stroke-width="1.6"/>
          <rect x="56" y="246" width="24" height="24" rx="7" fill="#FFFFFF"/>${fav('google.com', 60, 250, 16)}
          <text x="90" y="256" font-size="10.5" font-weight="700" fill="#172A2D">Search</text>
          <text x="90" y="269" font-size="7.5" fill="rgba(23,42,45,0.55)">already typing the problem in</text>
          <rect x="252" y="104" width="194" height="24" rx="8" fill="#F0E9DD"/>
          <text x="264" y="120" font-size="9.5" font-weight="800" letter-spacing="0.05em" fill="rgba(23,42,45,0.6)">SUPPORT</text>
          <text x="434" y="120" text-anchor="end" font-size="8" fill="rgba(23,42,45,0.45)">keeps you warm</text>
          <rect x="252" y="136" width="194" height="32" rx="9" fill="#FCFAF7" stroke="#FFFFFF" stroke-width="1.4"/>
          <rect x="260" y="141" width="24" height="24" rx="7" fill="#FFFFFF" stroke="rgba(23,42,45,0.08)"/><g transform="translate(265,146)"><circle cx="7" cy="7" r="6.8" fill="none" stroke="#8A5410" stroke-width="1.6"/><path d="M5.3 4.2 L10.3 7 L5.3 9.8 Z" fill="#8A5410"/></g>
          <text x="292" y="152" font-size="9.5" font-weight="700" fill="#172A2D">Webinars</text><text x="292" y="162" font-size="7" fill="rgba(23,42,45,0.5)">warm the committee up</text>
          <rect x="252" y="174" width="194" height="32" rx="9" fill="#FCFAF7" stroke="#FFFFFF" stroke-width="1.4"/>
          <rect x="260" y="179" width="24" height="24" rx="7" fill="#FFFFFF" stroke="rgba(23,42,45,0.08)"/><g transform="translate(265,185)"><path d="M1 1 h13 v8.5 h-7.5 l-3.2 3.2 v-3.2 h-2.3 Z" fill="none" stroke="#8A5410" stroke-width="1.6" stroke-linejoin="round"/></g>
          <text x="292" y="190" font-size="9.5" font-weight="700" fill="#172A2D">Communities</text><text x="292" y="200" font-size="7" fill="rgba(23,42,45,0.5)">where ops people ask for help</text>
          <rect x="252" y="212" width="194" height="32" rx="9" fill="#FCFAF7" stroke="#FFFFFF" stroke-width="1.4"/>
          <rect x="260" y="217" width="24" height="24" rx="7" fill="#FFFFFF" stroke="rgba(23,42,45,0.08)"/><g transform="translate(265,223)"><rect x="0.7" y="1" width="13.6" height="10.5" rx="1.8" fill="none" stroke="#8A5410" stroke-width="1.6"/><path d="M0.7 2.2 L7.5 7 L14.3 2.2" fill="none" stroke="#8A5410" stroke-width="1.5"/></g>
          <text x="292" y="228" font-size="9.5" font-weight="700" fill="#172A2D">Newsletters</text><text x="292" y="238" font-size="7" fill="rgba(23,42,45,0.5)">stay in mind between cycles</text>
          <rect x="252" y="250" width="194" height="32" rx="9" fill="#FCFAF7" stroke="#FFFFFF" stroke-width="1.4"/>
          <rect x="260" y="255" width="24" height="24" rx="7" fill="#FFFFFF" stroke="rgba(23,42,45,0.08)"/><g transform="translate(265,261)"><path d="M4.5 8 a3.6 3.6 0 0 1 3.6 -3.6 h2.4 M10.5 8 a3.6 3.6 0 0 1 -3.6 3.6 h-2.4" fill="none" stroke="#8A5410" stroke-width="1.7" stroke-linecap="round"/></g>
          <text x="292" y="266" font-size="9.5" font-weight="700" fill="#172A2D">Partnerships</text><text x="292" y="276" font-size="7" fill="rgba(23,42,45,0.5)">borrowed trust from tools you sit beside</text>
          <rect x="458" y="104" width="194" height="24" rx="8" fill="none" stroke="rgba(23,42,45,0.12)"/>
          <text x="470" y="120" font-size="9.5" font-weight="800" letter-spacing="0.05em" fill="rgba(23,42,45,0.45)">SKIP</text>
          <text x="640" y="120" text-anchor="end" font-size="8" font-style="italic" fill="rgba(23,42,45,0.45)">your buyers ignore these</text>
          <g opacity="0.5">
            <rect x="458" y="136" width="194" height="32" rx="9" fill="#FCFAF7" stroke="rgba(23,42,45,0.1)" stroke-width="1.2" stroke-dasharray="4 3"/>
            <rect x="466" y="140" width="24" height="24" rx="7" fill="#FFFFFF" stroke="rgba(23,42,45,0.12)"/><g transform="translate(472,146)"><path d="M2.4 0.8 C 1.1 0.8 0.7 1.6 0.7 2.7 C 0.7 7.4 5 11.7 9.7 11.7 C 10.8 11.7 11.6 11.3 11.6 10 L11.6 8.6 L8.9 7.4 L7.7 8.6 C 6.3 7.9 4.6 6.2 3.9 4.8 L5.1 3.6 L3.9 0.8 Z" fill="none" stroke="rgba(23,42,45,0.65)" stroke-width="1.5"/></g>
            <text x="494" y="152" font-size="9.5" font-weight="700" fill="rgba(23,42,45,0.6)">Cold calls</text><text x="494" y="162" font-size="7" fill="rgba(23,42,45,0.45)">a committee buys, nobody picks up</text>
            <rect x="458" y="174" width="194" height="32" rx="9" fill="#FCFAF7" stroke="rgba(23,42,45,0.1)" stroke-width="1.2" stroke-dasharray="4 3"/>
            <rect x="466" y="178" width="24" height="24" rx="7" fill="#FFFFFF" stroke="rgba(23,42,45,0.12)"/><g transform="translate(471,184)"><rect x="0.7" y="0.8" width="13" height="8" rx="1.2" fill="none" stroke="rgba(23,42,45,0.65)" stroke-width="1.5"/><line x1="4" y1="9.2" x2="4" y2="13" stroke="rgba(23,42,45,0.65)" stroke-width="1.5"/><line x1="10.4" y1="9.2" x2="10.4" y2="13" stroke="rgba(23,42,45,0.65)" stroke-width="1.5"/></g>
            <text x="494" y="190" font-size="9.5" font-weight="700" fill="rgba(23,42,45,0.6)">Broad display</text><text x="494" y="200" font-size="7" fill="rgba(23,42,45,0.45)">eyeballs without buyers</text>
            <rect x="458" y="212" width="194" height="32" rx="9" fill="#FCFAF7" stroke="rgba(23,42,45,0.1)" stroke-width="1.2" stroke-dasharray="4 3"/>
            <rect x="466" y="216" width="24" height="24" rx="7" fill="#FFFFFF" stroke="rgba(23,42,45,0.12)"/><g transform="translate(471,222)"><rect x="0.7" y="1" width="13.6" height="10.2" rx="1.6" fill="none" stroke="rgba(23,42,45,0.65)" stroke-width="1.5"/><path d="M0.7 2.1 L7.5 7 L14.3 2.1" fill="none" stroke="rgba(23,42,45,0.65)" stroke-width="1.4"/><line x1="2.2" y1="13.5" x2="13" y2="1" stroke="rgba(23,42,45,0.65)" stroke-width="1.5"/></g>
            <text x="494" y="228" font-size="9.5" font-weight="700" fill="rgba(23,42,45,0.6)">Mass email blasts</text><text x="494" y="238" font-size="7" fill="rgba(23,42,45,0.45)">straight to the spam folder</text>
            <rect x="458" y="250" width="194" height="32" rx="9" fill="#FCFAF7" stroke="rgba(23,42,45,0.1)" stroke-width="1.2" stroke-dasharray="4 3"/>
            <rect x="466" y="254" width="24" height="24" rx="7" fill="#FFFFFF" stroke="rgba(23,42,45,0.12)"/><g transform="translate(473,260)"><rect x="0.7" y="0.7" width="10" height="12.6" rx="1.2" fill="none" stroke="rgba(23,42,45,0.65)" stroke-width="1.5"/><line x1="3" y1="4" x2="8.4" y2="4" stroke="rgba(23,42,45,0.65)" stroke-width="1.2"/><line x1="3" y1="6.8" x2="8.4" y2="6.8" stroke="rgba(23,42,45,0.65)" stroke-width="1.2"/></g>
            <text x="494" y="266" font-size="9.5" font-weight="700" fill="rgba(23,42,45,0.6)">Trade print</text><text x="494" y="276" font-size="7" fill="rgba(23,42,45,0.45)">nobody's reading it anymore</text>
          </g>
          <line x1="46" y1="292" x2="654" y2="292" stroke="rgba(23,42,45,0.08)"/>
          <text x="46" y="310" font-size="9" fill="rgba(23,42,45,0.55)">graded for <tspan font-weight="700" fill="#172A2D">your</tspan> buyer: Series B to C · 4,212 companies fit · 312 in market now</text>
          <circle cx="646" cy="306" r="4" fill="#E1962E"></circle>
        </g>
        <g class="cap-layer" style="animation-delay:0.2s">
          <g transform="rotate(-2 120 348)">
            <rect x="34" y="332" width="180" height="30" rx="5" fill="#F5F1EA" filter="drop-shadow(0 6px 14px rgba(23,42,45,0.12))"/>
            <text x="48" y="345" font-size="8.5" font-weight="600" fill="#8A5410">re-graded monthly · a channel that</text>
            <text x="48" y="356" font-size="8.5" font-weight="600" fill="#8A5410">stops earning its column moves</text>
          </g>
        </g>
        ${STRIP('We map where demand shows, so you never guess where to show up', { w: 92, t: 'the map' })}
      </svg></div>`,

    // 02 · AI-Powered Demand Workflows & Plays · THE SHELF: playbook-library folder cards (anchor)
    workflows: () => `
      <div class="rec-viz">
      <svg viewBox="0 0 700 412" preserveAspectRatio="xMidYMid meet" aria-hidden="true" font-family="var(--font-sans)">
        <text x="36" y="40" font-size="15" font-weight="800" fill="#172A2D">The plays we install</text>
        <text x="222" y="40" font-size="9" fill="rgba(23,42,45,0.55)">spot the buying moment, answer it in minutes · AI writes, your voice stays</text>
        <g class="cap-layer" style="animation-delay:0.00s">
        <path d="M24 52 h64 q8 0 12 6 l6 8 h-82 z" fill="#E3F1EF"/>
        <rect x="14" y="64" width="214" height="118" rx="14" fill="#FCFAF7" stroke="#FFFFFF" stroke-width="2" filter="drop-shadow(0 6px 14px rgba(23,42,45,0.08))"/>
        <rect x="34" y="80" width="42" height="42" rx="12" fill="#E3F1EF"/>
        <g opacity="0"><animate attributeName="opacity" from="0" to="1" dur="0.5s" begin="0.15s" fill="freeze"/><animateTransform attributeName="transform" type="translate" values="0 10;0 0" dur="0.6s" begin="0.15s" calcMode="spline" keySplines="0.2 0.7 0.3 1" fill="freeze" additive="sum"/><g><animateTransform attributeName="transform" type="translate" values="0 0;0 -4;0 0" dur="3.2s" begin="1.0s" repeatCount="indefinite"/><g transform="translate(43,88)"><path d="M0 2 h15 v20 h-15 Z" fill="#2FA093"/><path d="M0 2 l1.6 -1.6 h15 l-1.6 1.6 Z" fill="#8ED2C9"/><path d="M15 2 l1.6 -1.6 v20 l-1.6 1.6 Z" fill="#106B60"/><circle cx="7.5" cy="8.5" r="3" fill="#FFFFFF"/><path d="M4.5 15.5 h6 M4.5 18.5 h4" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round"/></g></g></g>
        <text x="34" y="148" font-size="14.5" font-weight="700" fill="#172A2D">Pricing-page play</text>
        <text x="34" y="167" font-size="9.5" fill="rgba(23,42,45,0.75)"><tspan font-weight="800" fill="#B26F14">→</tspan> a personal note, within the hour</text>
        </g>
        <g class="cap-layer" style="animation-delay:0.06s">
        <path d="M254 52 h64 q8 0 12 6 l6 8 h-82 z" fill="#E8F0F8"/>
        <rect x="244" y="64" width="214" height="118" rx="14" fill="#FCFAF7" stroke="#FFFFFF" stroke-width="2" filter="drop-shadow(0 6px 14px rgba(23,42,45,0.08))"/>
        <rect x="264" y="80" width="42" height="42" rx="12" fill="#E8F0F8"/>
        <g opacity="0"><animate attributeName="opacity" from="0" to="1" dur="0.5s" begin="0.29000000000000004s" fill="freeze"/><animateTransform attributeName="transform" type="translate" values="0 10;0 0" dur="0.6s" begin="0.29000000000000004s" calcMode="spline" keySplines="0.2 0.7 0.3 1" fill="freeze" additive="sum"/><g><animateTransform attributeName="transform" type="translate" values="0 0;0 -4;0 0" dur="3.2s" begin="1.5s" repeatCount="indefinite"/><g transform="translate(273,88)"><path d="M6 0 h13 v15 h-13 Z" fill="#A9C6E4"/><path d="M19 0 l1.6 1.6 v15 l-1.6 -1.6 Z" fill="#2D5684"/><path d="M0 6 h13 v15 h-13 Z" fill="#4A7EB5"/><path d="M13 6 l1.6 1.6 v15 l-1.6 -1.6 Z" fill="#2D5684"/><path d="M3 11 h7 M3 14.5 h7 M3 18 h4.5" stroke="#FFFFFF" stroke-width="1.4" stroke-linecap="round"/></g></g></g>
        <text x="264" y="148" font-size="14.5" font-weight="700" fill="#172A2D">Competitor play</text>
        <text x="264" y="167" font-size="9.5" fill="rgba(23,42,45,0.75)"><tspan font-weight="800" fill="#B26F14">→</tspan> your point of view, mid-decision</text>
        </g>
        <g class="cap-layer" style="animation-delay:0.12s">
        <path d="M484 52 h64 q8 0 12 6 l6 8 h-82 z" fill="#FBF0DC"/>
        <rect x="474" y="64" width="214" height="118" rx="14" fill="#FCFAF7" stroke="#FFFFFF" stroke-width="2" filter="drop-shadow(0 6px 14px rgba(23,42,45,0.08))"/>
        <rect x="494" y="80" width="42" height="42" rx="12" fill="#FBF0DC"/>
        <g opacity="0"><animate attributeName="opacity" from="0" to="1" dur="0.5s" begin="0.43000000000000005s" fill="freeze"/><animateTransform attributeName="transform" type="translate" values="0 10;0 0" dur="0.6s" begin="0.43000000000000005s" calcMode="spline" keySplines="0.2 0.7 0.3 1" fill="freeze" additive="sum"/><g><animateTransform attributeName="transform" type="translate" values="0 0;0 -4;0 0" dur="3.2s" begin="2.0s" repeatCount="indefinite"/><g transform="translate(503,88)"><rect x="3" y="3" width="15" height="20" rx="2.5" fill="#E8A93C"/><path d="M3 3 l1.6 -1.6 h15 l-1.6 1.6 Z" fill="#F8D48A"/><path d="M18 3 l1.6 -1.6 v20 l-1.6 1.6 Z" fill="#B26F14"/><rect x="8.5" y="6" width="4" height="2.2" rx="1.1" fill="#FFFFFF"/><circle cx="10.5" cy="13" r="2.8" fill="#FFFFFF"/><path d="M6.5 19.5 h8" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round"/></g></g></g>
        <text x="494" y="148" font-size="14.5" font-weight="700" fill="#172A2D">Event follow-up</text>
        <text x="494" y="167" font-size="9.5" fill="rgba(23,42,45,0.75)"><tspan font-weight="800" fill="#B26F14">→</tspan> lands before their flight does</text>
        </g>
        <g class="cap-layer" style="animation-delay:0.18s">
        <path d="M24 204 h64 q8 0 12 6 l6 8 h-82 z" fill="#F9E7E3"/>
        <rect x="14" y="216" width="214" height="118" rx="14" fill="#FCFAF7" stroke="#FFFFFF" stroke-width="2" filter="drop-shadow(0 6px 14px rgba(23,42,45,0.08))"/>
        <rect x="34" y="232" width="42" height="42" rx="12" fill="#F9E7E3"/>
        <g opacity="0"><animate attributeName="opacity" from="0" to="1" dur="0.5s" begin="0.5700000000000001s" fill="freeze"/><animateTransform attributeName="transform" type="translate" values="0 10;0 0" dur="0.6s" begin="0.5700000000000001s" calcMode="spline" keySplines="0.2 0.7 0.3 1" fill="freeze" additive="sum"/><g><animateTransform attributeName="transform" type="translate" values="0 0;0 -4;0 0" dur="3.2s" begin="2.5s" repeatCount="indefinite"/><g transform="translate(43,240)"><circle cx="9" cy="6.5" r="4.6" fill="#C05B4D"/><path d="M9 1.9 a4.6 4.6 0 0 1 0 9.2 Z" fill="#8E3A2E"/><path d="M1 23 a8 8 0 0 1 16 0 Z" fill="#C05B4D"/><path d="M9 15 a8 8 0 0 1 8 8 h-8 Z" fill="#8E3A2E"/><path d="M18 1 l0.9 2.3 2.3 0.9 -2.3 0.9 -0.9 2.3 -0.9 -2.3 -2.3 -0.9 2.3 -0.9 Z" fill="#E8A79C"/></g></g></g>
        <text x="34" y="300" font-size="14.5" font-weight="700" fill="#172A2D">New-leader play</text>
        <text x="34" y="319" font-size="9.5" fill="rgba(23,42,45,0.75)"><tspan font-weight="800" fill="#B26F14">→</tspan> a week-one hello worth a reply</text>
        </g>
        <g class="cap-layer" style="animation-delay:0.24s">
        <path d="M254 204 h64 q8 0 12 6 l6 8 h-82 z" fill="#E7F2E9"/>
        <rect x="244" y="216" width="214" height="118" rx="14" fill="#FCFAF7" stroke="#FFFFFF" stroke-width="2" filter="drop-shadow(0 6px 14px rgba(23,42,45,0.08))"/>
        <rect x="264" y="232" width="42" height="42" rx="12" fill="#E7F2E9"/>
        <g opacity="0"><animate attributeName="opacity" from="0" to="1" dur="0.5s" begin="0.7100000000000001s" fill="freeze"/><animateTransform attributeName="transform" type="translate" values="0 10;0 0" dur="0.6s" begin="0.7100000000000001s" calcMode="spline" keySplines="0.2 0.7 0.3 1" fill="freeze" additive="sum"/><g><animateTransform attributeName="transform" type="translate" values="0 0;0 -4;0 0" dur="3.2s" begin="3.0s" repeatCount="indefinite"/><g transform="translate(273,240)"><ellipse cx="10" cy="19.5" rx="9" ry="3.4" fill="#2C6B41"/><rect x="1" y="13.5" width="18" height="6" fill="#4A9E64"/><ellipse cx="10" cy="13.5" rx="9" ry="3.4" fill="#A9D4B4"/><ellipse cx="10" cy="10.5" rx="6.5" ry="2.6" fill="#2C6B41"/><rect x="3.5" y="5.5" width="13" height="5" fill="#4A9E64"/><ellipse cx="10" cy="5.5" rx="6.5" ry="2.6" fill="#A9D4B4"/><path d="M7.5 5.5 h5" stroke="#2C6B41" stroke-width="1.3" stroke-linecap="round"/></g></g></g>
        <text x="264" y="300" font-size="14.5" font-weight="700" fill="#172A2D">Funding play</text>
        <text x="264" y="319" font-size="9.5" fill="rgba(23,42,45,0.75)"><tspan font-weight="800" fill="#B26F14">→</tspan> congrats + the scaling angle</text>
        </g>
        <g class="cap-layer" style="animation-delay:0.30s">
        <path d="M484 204 h64 q8 0 12 6 l6 8 h-82 z" fill="none" stroke="rgba(178,111,20,0.35)" stroke-dasharray="5 4" stroke-width="1.4"/>
        <rect x="474" y="216" width="214" height="118" rx="14" fill="none" stroke="rgba(178,111,20,0.4)" stroke-width="1.6" stroke-dasharray="6 5"/>
        <rect x="494" y="232" width="42" height="42" rx="12" fill="none" stroke="rgba(178,111,20,0.4)" stroke-dasharray="5 4" stroke-width="1.4"/>
        <path d="M515 246 v14 M508 253 h14" stroke="#B26F14" stroke-width="2.4" stroke-linecap="round"/>
        <text x="494" y="300" font-size="14.5" font-weight="700" fill="#8A5410">Yours: №6, 7, 8…</text>
        <text x="494" y="319" font-size="9.5" fill="rgba(138,84,16,0.85)">your triggers, your voice, your rules</text>
        </g>
        ${STRIP('The same engine that runs your outbound, now bringing demand in', { w: 78, t: 'always on' })}
      </svg></div>`,

    // 03 · Audience Building & Paid Media Strategy · AUDIENCE → AD → PROOF (no invented numbers)
    paid: () => `
      <div class="rec-viz">
      <svg viewBox="0 0 700 412" preserveAspectRatio="xMidYMid meet" aria-hidden="true" font-family="var(--font-sans)">
        <g class="cap-layer">
          <rect x="36" y="52" width="192" height="232" rx="14" fill="#FCFAF7" stroke="#FFFFFF" stroke-width="2" filter="drop-shadow(0 10px 22px rgba(23,42,45,0.1))"/>
          <circle cx="64" cy="78" r="11" fill="#FAC064"/><text x="64" y="82" text-anchor="middle" font-size="10" font-weight="800" fill="#172A2D">1</text>
          <text x="84" y="75" font-size="13" font-weight="800" fill="#172A2D">The audience</text>
          <text x="84" y="89" font-size="8" fill="rgba(23,42,45,0.55)">companies like your closed-won</text>
          <rect x="52" y="104" width="160" height="30" rx="9" fill="#F5F1EA"/>
          <rect x="60" y="110" width="18" height="18" rx="5" fill="#FFFFFF"/>${fav('figma.com', 63, 113, 12)}
          <text x="86" y="123" font-size="9.5" font-weight="700" fill="#172A2D">Figma</text>
          <rect x="52" y="140" width="160" height="30" rx="9" fill="#FCFAF7" stroke="rgba(23,42,45,0.06)"/>
          <rect x="60" y="146" width="18" height="18" rx="5" fill="#FFFFFF" stroke="rgba(23,42,45,0.06)"/>${fav('stripe.com', 63, 149, 12)}
          <text x="86" y="159" font-size="9.5" font-weight="700" fill="#172A2D">Stripe</text>
          <rect x="52" y="176" width="160" height="30" rx="9" fill="#FCFAF7" stroke="rgba(23,42,45,0.06)"/>
          <rect x="60" y="182" width="18" height="18" rx="5" fill="#FFFFFF" stroke="rgba(23,42,45,0.06)"/>${fav('miro.com', 63, 185, 12)}
          <text x="86" y="195" font-size="9.5" font-weight="700" fill="#172A2D">Miro <tspan font-size="7.5" font-weight="400" fill="rgba(23,42,45,0.5)">· and more like them</tspan></text>
          <line x1="52" y1="220" x2="212" y2="220" stroke="rgba(23,42,45,0.08)"/>
          <text x="52" y="238" font-size="8" fill="rgba(23,42,45,0.55)">your customers</text>
          <path d="M186 231 L196 241 M196 231 L186 241" stroke="rgba(23,42,45,0.4)" stroke-width="1.6"/>
          <text x="52" y="256" font-size="8" fill="rgba(23,42,45,0.55)">bad-fit companies</text>
          <path d="M186 249 L196 259 M196 249 L186 259" stroke="rgba(23,42,45,0.4)" stroke-width="1.6"/>
          <text x="52" y="274" font-size="7.5" font-style="italic" fill="rgba(23,42,45,0.45)">never on the list, never charged</text>
        </g>
        <path d="M232 168 L256 168" stroke="rgba(178,111,20,0.55)" stroke-width="2" stroke-dasharray="4 5"/><path d="M254 162 L264 168 L254 174 Z" fill="rgba(178,111,20,0.75)"/>
        <g class="cap-layer" style="animation-delay:0.12s">
          <rect x="268" y="52" width="192" height="232" rx="14" fill="#FCFAF7" stroke="#FFFFFF" stroke-width="2" filter="drop-shadow(0 10px 22px rgba(23,42,45,0.1))"/>
          <circle cx="296" cy="78" r="11" fill="#FAC064"/><text x="296" y="82" text-anchor="middle" font-size="10" font-weight="800" fill="#172A2D">2</text>
          <text x="316" y="75" font-size="13" font-weight="800" fill="#172A2D">The ad they see</text>
          <text x="316" y="89" font-size="8" fill="rgba(23,42,45,0.55)">personal to one reader</text>
          <rect x="282" y="100" width="164" height="148" rx="10" fill="#FFFFFF" stroke="rgba(23,42,45,0.08)"/>
          <circle cx="302" cy="120" r="10" fill="#172A2D"/><text x="302" y="124" text-anchor="middle" font-size="9" font-weight="800" fill="#FAC064">N</text>
          <text x="318" y="118" font-size="8.5" font-weight="700" fill="#172A2D">Your company</text>
          <text x="318" y="128" font-size="7" fill="rgba(23,42,45,0.5)">Sponsored</text>
          ${fav('linkedin.com', 424, 110, 12)}
          <rect x="292" y="138" width="144" height="60" rx="8" fill="#F5F1EA"/>
          <text x="302" y="160" font-size="9.5" font-weight="700" fill="#6B420D">Speaks to the problem</text>
          <text x="302" y="173" font-size="9.5" font-weight="700" fill="#6B420D">their week already has,</text>
          <text x="302" y="186" font-size="9.5" font-weight="700" fill="#6B420D">not a generic pitch</text>
          <rect x="292" y="208" width="76" height="20" rx="10" fill="#172A2D"/>
          <text x="330" y="221.5" text-anchor="middle" font-size="8" font-weight="700" fill="#FFFFFF">Learn more</text>
          <text x="292" y="240" font-size="7.5" fill="rgba(23,42,45,0.5)">seen only by the companies on the list</text>
          <text x="282" y="266" font-size="8" font-style="italic" fill="rgba(23,42,45,0.5)">rewritten per segment, kept only</text>
          <text x="282" y="277" font-size="8" font-style="italic" fill="rgba(23,42,45,0.5)">while it earns its keep</text>
        </g>
        <path d="M464 168 L488 168" stroke="rgba(178,111,20,0.55)" stroke-width="2" stroke-dasharray="4 5"/><path d="M486 162 L496 168 L486 174 Z" fill="rgba(178,111,20,0.75)"/>
        <g class="cap-layer" style="animation-delay:0.24s">
          <rect x="500" y="52" width="186" height="232" rx="14" fill="#FCFAF7" stroke="#FFFFFF" stroke-width="2" filter="drop-shadow(0 10px 22px rgba(23,42,45,0.1))"/>
          <circle cx="528" cy="78" r="11" fill="#FAC064"/><text x="528" y="82" text-anchor="middle" font-size="10" font-weight="800" fill="#172A2D">3</text>
          <text x="548" y="75" font-size="13" font-weight="800" fill="#172A2D">The proof you get</text>
          <text x="548" y="89" font-size="8" fill="rgba(23,42,45,0.55)">deals, with receipts</text>
          <rect x="516" y="104" width="154" height="44" rx="9" fill="#F5F1EA"/>
          <rect x="524" y="112" width="16" height="16" rx="5" fill="#FFFFFF"/>${fav('figma.com', 526, 114, 12)}
          <text x="548" y="121" font-size="9" font-weight="700" fill="#172A2D">Figma · deal open</text>
          <text x="548" y="136" font-size="7" font-family="ui-monospace, Menlo, monospace" fill="#8A5410">source: LinkedIn ABM ad ✓</text>
          <rect x="516" y="154" width="154" height="44" rx="9" fill="#FCFAF7" stroke="rgba(23,42,45,0.06)"/>
          <rect x="524" y="162" width="16" height="16" rx="5" fill="#FFFFFF" stroke="rgba(23,42,45,0.06)"/>${fav('stripe.com', 526, 164, 12)}
          <text x="548" y="171" font-size="9" font-weight="700" fill="#172A2D">Stripe · meeting set</text>
          <text x="548" y="186" font-size="7" font-family="ui-monospace, Menlo, monospace" fill="#8A5410">source: search campaign ✓</text>
          <line x1="516" y1="214" x2="670" y2="214" stroke="rgba(23,42,45,0.08)"/>
          <text x="516" y="234" font-size="8.5" fill="rgba(23,42,45,0.6)">clicks and impressions?</text>
          <text x="516" y="248" font-size="8.5" font-weight="700" fill="#172A2D">footnotes under the report.</text>
          <text x="516" y="270" font-size="7.5" font-style="italic" fill="rgba(23,42,45,0.45)">a campaign that opens no deals</text>
          <text x="516" y="280" font-size="7.5" font-style="italic" fill="rgba(23,42,45,0.45)">loses its budget. simple.</text>
        </g>
        <g class="cap-layer" style="animation-delay:0.36s">
          <rect x="36" y="300" width="650" height="44" rx="14" fill="#FCFAF7" stroke="#FFFFFF" stroke-width="1.6"/>
          <text x="56" y="319" font-size="11" font-weight="700" fill="#8A5410">Spend follows companies that look like your best customers.</text>
          <text x="56" y="334" font-size="9" fill="rgba(138,84,16,0.85)">and comes back as traceable deals, so budget decisions stop being arguments.</text>
          <circle cx="662" cy="322" r="4" fill="#E1962E"></circle>
        </g>
        ${STRIP('You see the pipeline your spend creates, traced end to end', { w: 104, t: 'influenced pipeline' })}
      </svg></div>`,

    // 04 · Social Listening & Competitive Tracking · REAL PUBLIC SIGNALS become a same-day brief
    listen: () => `
      <div class="rec-viz">
      <svg viewBox="0 0 700 412" preserveAspectRatio="xMidYMid meet" aria-hidden="true" font-family="var(--font-sans)">
        <defs><clipPath id="lsF1"><circle cx="64" cy="74" r="13"/></clipPath></defs>
        <text x="36" y="36" font-size="10" font-weight="700" letter-spacing="0.07em" fill="rgba(23,42,45,0.45)">POSTED IN PUBLIC, THIS WEEK</text>
        <g class="cap-layer">
          <rect x="36" y="46" width="316" height="82" rx="14" fill="#FCFAF7" stroke="#FFFFFF" stroke-width="2" filter="drop-shadow(0 8px 18px rgba(23,42,45,0.09))"/>
          <circle cx="64" cy="74" r="14" fill="#EFE9DC"/><image href="assets/brand/wouter.png" x="51" y="61" width="26" height="26" clip-path="url(#lsF1)" preserveAspectRatio="xMidYMin slice"/>
          <text x="88" y="70" font-size="10.5" font-weight="700" fill="#172A2D">Wouter van D. · VP Ops, Figma</text>
          <text x="88" y="83" font-size="8.5" fill="rgba(23,42,45,0.5)">1h ago</text>
          ${fav('linkedin.com', 322, 60, 14)}
          <text x="56" y="108" font-size="11.5" font-weight="600" fill="#172A2D">"Thrilled to share: we're expanding into DACH 🚀"</text>
          <circle cx="330" cy="104" r="4" fill="#E1962E"></circle>
        </g>
        <g class="cap-layer" style="animation-delay:0.1s">
          <rect x="36" y="138" width="316" height="74" rx="14" fill="#FCFAF7" stroke="#FFFFFF" stroke-width="2" filter="drop-shadow(0 8px 18px rgba(23,42,45,0.09))"/>
          <rect x="52" y="152" width="24" height="24" rx="7" fill="#FFFFFF" stroke="rgba(23,42,45,0.06)"/>${fav('stripe.com', 56, 156, 16)}
          <text x="88" y="162" font-size="10.5" font-weight="700" fill="#172A2D">Stripe · careers page · today</text>
          <text x="88" y="175" font-size="8.5" fill="rgba(23,42,45,0.5)">public job listings, anyone can see them</text>
          <text x="56" y="198" font-size="11.5" font-weight="600" fill="#172A2D">4 new SDR openings posted in Dublin</text>
        </g>
        <g class="cap-layer" style="animation-delay:0.2s">
          <rect x="36" y="222" width="316" height="66" rx="14" fill="#FCFAF7" stroke="#FFFFFF" stroke-width="1.6" opacity="0.85"/>
          <rect x="52" y="236" width="24" height="24" rx="7" fill="#FFFFFF" stroke="rgba(23,42,45,0.06)"/><path d="M64 240 L66.2 244.6 L71.2 245.3 L67.6 248.8 L68.5 253.8 L64 251.4 L59.5 253.8 L60.4 248.8 L56.8 245.3 L61.8 244.6 Z" fill="#F0B45A"/>
          <text x="88" y="246" font-size="10.5" font-weight="700" fill="#172A2D">a rival's customer, frustrated in public</text>
          <text x="88" y="260" font-size="8.5" fill="rgba(23,42,45,0.5)">review site · "2★ · support went quiet" · yesterday</text>
        </g>
        <text x="36" y="316" font-size="10" font-style="italic" fill="rgba(23,42,45,0.5)">expansions, hiring pushes, unhappy rival customers:</text>
        <text x="36" y="330" font-size="10" font-style="italic" fill="rgba(23,42,45,0.5)">all public, all real, all watchable.</text>
        <g class="cap-layer" style="animation-delay:0.3s">
          <rect x="416" y="46" width="270" height="242" rx="16" fill="#FCFAF7" stroke="#FFFFFF" stroke-width="2" filter="drop-shadow(0 14px 30px rgba(23,42,45,0.13))"/>
          ${fav('slack.com', 434, 62, 15)}<text x="456" y="74" font-size="11.5" font-weight="700" fill="#172A2D">#signals</text>
          <circle cx="666" cy="68" r="3.5" fill="#E1962E"></circle>
          <line x1="434" y1="86" x2="670" y2="86" stroke="rgba(23,42,45,0.08)"/>
          <rect x="434" y="98" width="24" height="24" rx="7" fill="#FFFFFF" stroke="rgba(23,42,45,0.08)"/>${fav('clay.com', 438, 102, 16)}
          <text x="466" y="110" font-size="10.5" font-weight="700" fill="#172A2D">Demand Engine</text>
          <rect x="552" y="101" width="30" height="13" rx="4" fill="#EFEAE3"/><text x="567" y="111" text-anchor="middle" font-size="7.5" font-weight="700" fill="rgba(23,42,45,0.55)">APP</text>
          <text x="466" y="124" font-size="8.5" fill="rgba(23,42,45,0.5)">today, 09:40</text>
          <rect x="434" y="136" width="236" height="104" rx="10" fill="#F5F1EA"/>
          <text x="448" y="158" font-size="10.5" font-weight="700" fill="#172A2D">Figma is expanding into DACH.</text>
          <text x="448" y="176" font-size="9.5" fill="rgba(23,42,45,0.7)">Angle: new market, new pipeline target.</text>
          <text x="448" y="190" font-size="9.5" fill="rgba(23,42,45,0.7)">Their team will need to build coverage.</text>
          <text x="448" y="212" font-size="9.5" fill="rgba(23,42,45,0.7)">Owner: <tspan font-weight="700" fill="#172A2D">Robin</tspan> · draft attached</text>
          <rect x="448" y="220" width="76" height="14" rx="7" fill="#FAC064"/><text x="486" y="230.5" text-anchor="middle" font-size="7.5" font-weight="700" fill="#172A2D">brief · same day</text>
          <text x="434" y="264" font-size="9" fill="rgba(23,42,45,0.5)">🔥 2   👀 3</text>
        </g>
        <g class="cap-layer" style="animation-delay:0.4s">
          <rect x="416" y="298" width="270" height="40" rx="13" fill="#FCFAF7" stroke="#FFFFFF" stroke-width="1.6"/>
          <text x="434" y="322" font-size="10.5" font-weight="700" fill="#8A5410">Your team just acts. The watching is done.</text>
        </g>
        ${STRIP('Catch a target account the moment it complains or shops a rival', null)}
      </svg></div>`,

    // 05 · Inbound Capture & Dynamic Landing Pages · the page personalizes, the record builds itself
    capture: () => `
      <div class="rec-viz">
      <svg viewBox="0 0 700 412" preserveAspectRatio="xMidYMid meet" aria-hidden="true" font-family="var(--font-sans)">
        <defs>
          <clipPath id="cp5a"><circle cx="286" cy="322" r="11"/></clipPath>
          <clipPath id="cp5b"><circle cx="306" cy="322" r="11"/></clipPath>
          <clipPath id="cp5c"><circle cx="326" cy="322" r="11"/></clipPath>
        </defs>
        <g class="cap-layer" opacity="0.85">
          <rect x="14" y="40" width="246" height="204" rx="14" fill="#FCFAF7" stroke="#FFFFFF" stroke-width="2" filter="drop-shadow(0 8px 18px rgba(23,42,45,0.08))"/>
          <path d="M14 54 a14 14 0 0 1 14 -14 h218 a14 14 0 0 1 14 14 v16 h-246 Z" fill="#EFEAE3"/>
          <circle cx="32" cy="55" r="3.5" fill="#E0776A"/><circle cx="45" cy="55" r="3.5" fill="#F2CE60"/><circle cx="58" cy="55" r="3.5" fill="#3FCDAD"/>
          <rect x="72" y="47" width="172" height="16" rx="8" fill="#FCFAF7"/><text x="82" y="58" font-size="8" font-family="ui-monospace, Menlo, monospace" fill="rgba(23,42,45,0.55)">yoursite.com/pricing</text>
          <circle cx="137" cy="100" r="15" fill="#EFEAE3"/><text x="137" y="106" text-anchor="middle" font-size="14" font-weight="700" fill="rgba(23,42,45,0.3)">?</text>
          <text x="137" y="136" text-anchor="middle" font-size="11.5" font-weight="700" fill="rgba(23,42,45,0.45)">Welcome, visitor</text>
          <rect x="49" y="150" width="176" height="6" rx="3" fill="#EFEAE3"/>
          <rect x="49" y="162" width="148" height="6" rx="3" fill="#EFEAE3"/>
          <rect x="91" y="182" width="92" height="22" rx="11" fill="#EFEAE3"/>
          <text x="137" y="228" text-anchor="middle" font-size="9" font-style="italic" fill="rgba(23,42,45,0.4)">the same page as everyone else</text>
        </g>
        <g class="cap-layer" style="animation-delay:0.12s">
          <rect x="272" y="86" width="96" height="128" rx="12" fill="#FCFAF7" stroke="#FFFFFF" stroke-width="2" filter="drop-shadow(0 10px 22px rgba(23,42,45,0.13))"/>
          <text x="284" y="104" font-size="6.5" font-weight="700" letter-spacing="0.1em" font-family="ui-monospace, Menlo, monospace" fill="rgba(23,42,45,0.45)">DEANONYMIZED</text>
          <text x="284" y="118" font-size="7.5" font-family="ui-monospace, Menlo, monospace" fill="rgba(23,42,45,0.4)">visitor #4821</text>
          <line x1="284" y1="115.5" x2="330" y2="115.5" stroke="rgba(23,42,45,0.35)"/>
          <rect x="284" y="126" width="15" height="15" rx="5" fill="#FFFFFF" stroke="rgba(23,42,45,0.08)"/>${fav('figma.com', 286, 128, 11)}
          <text x="305" y="137.5" font-size="10.5" font-weight="800" fill="#172A2D">Figma</text>
          <text x="284" y="155" font-size="7.5" fill="rgba(23,42,45,0.6)">design software</text>
          <text x="284" y="168" font-size="7.5" fill="rgba(23,42,45,0.6)">1,200 people</text>
          <text x="284" y="181" font-size="7.5" fill="rgba(23,42,45,0.6)">committee of 8</text>
          <text x="284" y="198" font-size="7.5" font-weight="700" fill="#8A5410">3rd visit this week</text>
          <path d="M262 150 L268 150" stroke="rgba(178,111,20,0.6)" stroke-width="2"/><path d="M266 145 L272 150 L266 155 Z" fill="rgba(178,111,20,0.75)"/>
          <path d="M368 150 L372 150" stroke="rgba(178,111,20,0.6)" stroke-width="2"/><path d="M370 145 L376 150 L370 155 Z" fill="rgba(178,111,20,0.75)"/>
          <text x="320" y="230" text-anchor="middle" font-size="8" font-weight="600" fill="#8A5410">identified · in 90 seconds</text>
        </g>
        <g class="cap-layer" style="animation-delay:0.2s">
          <rect x="376" y="28" width="310" height="216" rx="14" fill="#FCFAF7" stroke="#FFFFFF" stroke-width="2" filter="drop-shadow(0 14px 30px rgba(23,42,45,0.14)) drop-shadow(0 3px 7px rgba(23,42,45,0.07))"/>
          <path d="M376 42 a14 14 0 0 1 14 -14 h282 a14 14 0 0 1 14 14 v16 h-310 Z" fill="#EFEAE3"/>
          <circle cx="394" cy="43" r="3.5" fill="#E0776A"/><circle cx="407" cy="43" r="3.5" fill="#F2CE60"/><circle cx="420" cy="43" r="3.5" fill="#3FCDAD"/>
          <rect x="434" y="35" width="236" height="16" rx="8" fill="#FCFAF7"/><text x="444" y="46" font-size="8" font-family="ui-monospace, Menlo, monospace" fill="rgba(23,42,45,0.55)">yoursite.com/pricing</text>
          <rect x="400" y="66" width="118" height="22" rx="11" fill="#F5F1EA"/>
          <rect x="408" y="70" width="13" height="13" rx="4" fill="#FFFFFF"/>${fav('figma.com', 410, 72, 9)}
          <text x="426" y="81" font-size="9" font-weight="700" fill="#8A5410">Built for Figma</text>
          <text x="400" y="112" font-size="14" font-weight="700" fill="#172A2D">Pricing for design</text>
          <text x="400" y="129" font-size="14" font-weight="700" fill="#172A2D">platforms like yours</text>
          <rect x="400" y="144" width="254" height="6" rx="3" fill="#EFEAE3"/>
          <rect x="400" y="156" width="212" height="6" rx="3" fill="#EFEAE3"/>
          <rect x="400" y="176" width="254" height="26" rx="9" fill="#F5F1EA"/>
          <text x="412" y="193" font-size="8.5" font-weight="600" fill="#8A5410">case study: how a design platform traced its pipeline</text>
          <rect x="400" y="212" width="96" height="22" rx="11" fill="#172A2D"/>
          <text x="448" y="227" text-anchor="middle" font-size="9.5" font-weight="700" fill="#FFFFFF">Talk to us</text>
        </g>
        <text x="14" y="272" font-size="9" font-weight="700" letter-spacing="0.1em" font-family="ui-monospace, Menlo, monospace" fill="rgba(23,42,45,0.4)">MEANWHILE · EVERY VISIT STITCHED TO ONE ACCOUNT RECORD</text>
        <g class="cap-layer" style="animation-delay:0.32s">
          <rect x="14" y="284" width="672" height="74" rx="15" fill="#FCFAF7" stroke="#FFFFFF" stroke-width="2" filter="drop-shadow(0 12px 26px rgba(23,42,45,0.11)) drop-shadow(0 2px 5px rgba(23,42,45,0.06))"/>
          <rect x="30" y="304" width="34" height="34" rx="10" fill="#FFFFFF" stroke="rgba(23,42,45,0.06)"/>${fav('figma.com', 37, 311, 20)}
          <text x="76" y="317" font-size="13.5" font-weight="700" fill="#172A2D">Figma</text>
          <text x="76" y="332" font-size="8.5" fill="rgba(23,42,45,0.5)">design platform · 1,200 people</text>
          <line x1="248" y1="298" x2="248" y2="344" stroke="rgba(23,42,45,0.07)"/>
          <text x="262" y="308" font-size="7.5" font-weight="700" letter-spacing="0.08em" fill="rgba(23,42,45,0.4)">COMMITTEE</text>
          <circle cx="286" cy="322" r="12" fill="#EFE9DC"/><image href="assets/brand/vincent.png" x="275" y="311" width="22" height="22" clip-path="url(#cp5a)" preserveAspectRatio="xMidYMin slice"/>
          <circle cx="306" cy="322" r="12" fill="#EFE9DC"/><image href="assets/brand/wouter.png" x="295" y="311" width="22" height="22" clip-path="url(#cp5b)" preserveAspectRatio="xMidYMin slice"/>
          <circle cx="326" cy="322" r="12" fill="#EFE9DC"/><image href="assets/brand/almaz.png" x="315" y="311" width="22" height="22" clip-path="url(#cp5c)" preserveAspectRatio="xMidYMin slice"/>
          <text x="346" y="326" font-size="8.5" fill="rgba(23,42,45,0.5)">+5</text>
          <line x1="374" y1="298" x2="374" y2="344" stroke="rgba(23,42,45,0.07)"/>
          <text x="388" y="308" font-size="7.5" font-weight="700" letter-spacing="0.08em" fill="rgba(23,42,45,0.4)">INTENT</text>
          <circle cx="392" cy="324" r="3.5" fill="#E1962E"></circle>
          <text x="402" y="328" font-size="9.5" font-weight="600" fill="#172A2D">pricing ×4 this week</text>
          <line x1="506" y1="298" x2="506" y2="344" stroke="rgba(23,42,45,0.07)"/>
          <circle cx="537" cy="321" r="17" fill="#FAC064" filter="drop-shadow(0 4px 9px rgba(225,150,46,0.4))"/>
          <text x="537" y="326" text-anchor="middle" font-size="12.5" font-weight="800" fill="#172A2D">91</text>
          <rect x="548" y="306" width="124" height="30" rx="15" fill="#172A2D"/>
          <text x="610" y="325" text-anchor="middle" font-size="9.5" font-weight="700" fill="#FFFFFF">enters pipeline</text>
          <text x="610" y="350" text-anchor="middle" font-size="7.5" fill="rgba(23,42,45,0.45)">Tier 1 · joins the ABM push</text>
        </g>
        ${STRIP('Anonymous traffic becomes named accounts, on a page built for them', { w: 96, t: 'enters pipeline' })}
      </svg></div>`,

    // 06 · Account-Based Marketing & ABM Programs · WHAT FIGMA SEES THIS WEEK vs everyone else (the star)
    abm: () => `
      <div class="rec-viz">
      <svg viewBox="0 0 700 412" preserveAspectRatio="xMidYMid meet" aria-hidden="true" font-family="var(--font-sans)">
        <rect x="36" y="24" width="196" height="26" rx="13" fill="#FCFAF7" stroke="#FFFFFF" stroke-width="1.4"/>
        ${fav('figma.com', 48, 30, 13)}<text x="68" y="41" font-size="9.5" font-weight="700" fill="#8A5410">Figma · a Tier 1 account</text>
        <text x="244" y="41" font-size="9.5" fill="rgba(23,42,45,0.55)">four fronts, one week, one story</text>
        <text x="36" y="72" font-size="8.5" font-weight="700" letter-spacing="0.1em" font-family="ui-monospace, Menlo, monospace" fill="rgba(23,42,45,0.45)">WHAT FIGMA SEES</text>
        <g class="cap-layer">
          <rect x="36" y="82" width="222" height="126" rx="12" fill="#FCFAF7" stroke="#FFFFFF" stroke-width="2" filter="drop-shadow(0 10px 22px rgba(23,42,45,0.1))"/>
          <circle cx="58" cy="104" r="9" fill="#172A2D"/><text x="58" y="107.5" text-anchor="middle" font-size="8" font-weight="800" fill="#FAC064">N</text>
          <text x="72" y="102" font-size="8" font-weight="700" fill="#172A2D">Your company</text>
          <text x="72" y="111" font-size="6.5" fill="rgba(23,42,45,0.5)">Sponsored</text>
          ${fav('linkedin.com', 234, 94, 11)}
          <rect x="50" y="122" width="194" height="46" rx="8" fill="#F5F1EA"/>
          <text x="62" y="141" font-size="10" font-weight="700" fill="#6B420D">"Every euro of pipeline,</text>
          <text x="62" y="154" font-size="10" font-weight="700" fill="#6B420D">traced to its source."</text>
          <rect x="50" y="178" width="62" height="16" rx="8" fill="#172A2D"/><text x="81" y="189.5" text-anchor="middle" font-size="7" font-weight="700" fill="#FFFFFF">Learn more</text>
          <text x="120" y="190" font-size="7.5" fill="rgba(23,42,45,0.5)">Monday · in the committee's feed</text>
        </g>
        <g class="cap-layer" style="animation-delay:0.1s">
          <rect x="270" y="82" width="222" height="126" rx="12" fill="#FCFAF7" stroke="#FFFFFF" stroke-width="2" filter="drop-shadow(0 10px 22px rgba(23,42,45,0.1))"/>
          <rect x="284" y="94" width="20" height="20" rx="6" fill="#FFFFFF" stroke="rgba(23,42,45,0.06)"/><image href="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/gmail.ico" x="288" y="98" width="12" height="12" class="heroviz-favicon"/>
          <text x="312" y="103" font-size="8" fill="rgba(23,42,45,0.55)">To: <tspan font-weight="700" fill="#172A2D">Wouter · VP Ops</tspan></text>
          <text x="312" y="114" font-size="9" font-weight="700" fill="#172A2D">About your Q3 pipeline goal</text>
          <line x1="284" y1="124" x2="478" y2="124" stroke="rgba(23,42,45,0.08)"/>
          <text x="284" y="142" font-size="8.5" fill="rgba(23,42,45,0.7)">Hi Wouter, saw the DACH plans.</text>
          <rect x="284" y="150" width="194" height="20" rx="6" fill="#F5F1EA"/>
          <text x="292" y="163.5" font-size="8.5" font-weight="700" fill="#6B420D">A pipeline plan you can trace end to end.</text>
          <text x="284" y="190" font-size="7.5" fill="rgba(23,42,45,0.5)">Wednesday · written to his goal, same story</text>
        </g>
        <g class="cap-layer" style="animation-delay:0.2s">
          <rect x="36" y="220" width="222" height="118" rx="12" fill="#FCFAF7" stroke="#FFFFFF" stroke-width="2" filter="drop-shadow(0 10px 22px rgba(23,42,45,0.1))"/>
          <path d="M36 232 a12 12 0 0 1 12 -12 h198 a12 12 0 0 1 12 12 v10 h-222 Z" fill="#EFEAE3"/>
          <circle cx="52" cy="231" r="2.8" fill="#E0776A"/><circle cx="62" cy="231" r="2.8" fill="#F2CE60"/><circle cx="72" cy="231" r="2.8" fill="#3FCDAD"/>
          <rect x="82" y="225" width="164" height="12" rx="6" fill="#FCFAF7"/><text x="90" y="234" font-size="6.5" font-family="ui-monospace, Menlo, monospace" fill="rgba(23,42,45,0.55)">yoursite.com/for-design-teams</text>
          <rect x="50" y="252" width="92" height="18" rx="9" fill="#F5F1EA"/>
          <rect x="56" y="255" width="11" height="11" rx="3" fill="#FFFFFF"/>${fav('figma.com', 58, 257, 8)}
          <text x="72" y="264.5" font-size="7.5" font-weight="700" fill="#8A5410">Built for Figma</text>
          <text x="50" y="290" font-size="10" font-weight="700" fill="#172A2D">Traceable pipeline,</text>
          <text x="50" y="303" font-size="10" font-weight="700" fill="#172A2D">for design platforms</text>
          <text x="50" y="326" font-size="7.5" fill="rgba(23,42,45,0.5)">always on · rebuilt for whoever visits</text>
        </g>
        <g class="cap-layer" style="animation-delay:0.3s">
          <rect x="270" y="220" width="222" height="118" rx="12" fill="#172A2D" filter="drop-shadow(0 12px 26px rgba(23,42,45,0.3))"/>
          <rect x="284" y="234" width="24" height="24" rx="7" fill="rgba(255,255,255,0.1)"/>
          <g transform="translate(289,239)"><rect x="0" y="1.6" width="14" height="11" rx="2" fill="none" stroke="#FAC064" stroke-width="1.5"/><line x1="0" y1="5.4" x2="14" y2="5.4" stroke="#FAC064" stroke-width="1.5"/><line x1="3.6" y1="0" x2="3.6" y2="2.6" stroke="#FAC064" stroke-width="1.5"/><line x1="10.4" y1="0" x2="10.4" y2="2.6" stroke="#FAC064" stroke-width="1.5"/></g>
          <text x="318" y="245" font-size="9.5" font-weight="700" fill="#FFFFFF">Thursday · 10:00</text>
          <text x="318" y="258" font-size="7.5" fill="rgba(255,255,255,0.6)">Robin ↔ the Figma committee</text>
          <line x1="284" y1="272" x2="478" y2="272" stroke="rgba(255,255,255,0.12)"/>
          <text x="284" y="292" font-size="9" font-weight="700" fill="#FAC064">they take the call warm:</text>
          <text x="284" y="306" font-size="8.5" fill="rgba(255,255,255,0.75)">by Thursday, every person on it has</text>
          <text x="284" y="319" font-size="8.5" fill="rgba(255,255,255,0.75)">heard the same story three ways</text>
        </g>
        <g class="cap-layer" style="animation-delay:0.4s" opacity="0.5">
          <rect x="510" y="82" width="154" height="256" rx="12" fill="#FCFAF7" stroke="rgba(23,42,45,0.1)" stroke-width="1.2" stroke-dasharray="5 4"/>
          <text x="526" y="106" font-size="8" font-weight="700" letter-spacing="0.08em" font-family="ui-monospace, Menlo, monospace" fill="rgba(23,42,45,0.45)">EVERYONE ELSE</text>
          <circle cx="540" cy="130" r="8" fill="rgba(23,42,45,0.08)"/><text x="554" y="128" font-size="7" fill="rgba(23,42,45,0.4)">generic ad</text><text x="554" y="137" font-size="7" fill="rgba(23,42,45,0.4)">for the whole market</text>
          <rect x="526" y="152" width="122" height="6" rx="3" fill="rgba(23,42,45,0.06)"/>
          <rect x="526" y="164" width="98" height="6" rx="3" fill="rgba(23,42,45,0.06)"/>
          <line x1="526" y1="188" x2="648" y2="188" stroke="rgba(23,42,45,0.08)"/>
          <text x="526" y="210" font-size="8.5" fill="rgba(23,42,45,0.55)">4,188 accounts on the</text>
          <text x="526" y="222" font-size="8.5" fill="rgba(23,42,45,0.55)">standard track: good</text>
          <text x="526" y="234" font-size="8.5" fill="rgba(23,42,45,0.55)">nurture on autopilot</text>
          <text x="526" y="262" font-size="8.5" font-style="italic" fill="rgba(23,42,45,0.5)">that's the point.</text>
          <text x="526" y="276" font-size="8.5" font-style="italic" fill="rgba(23,42,45,0.5)">this treatment is for</text>
          <text x="526" y="290" font-size="8.5" font-style="italic" fill="rgba(23,42,45,0.5)">the accounts that can</text>
          <text x="526" y="304" font-size="8.5" font-style="italic" fill="rgba(23,42,45,0.5)">change your year</text>
        </g>
        ${STRIP('The accounts that matter get a coordinated push of their own', { w: 84, t: 'in lockstep' })}
      </svg></div>`,

    // 07 · Nurture & Lifecycle Journeys · A REAL CRM: dense clean activity list, her journey in the rail
    nurture: () => `
      <div class="rec-viz">
      <svg viewBox="0 0 700 412" preserveAspectRatio="xMidYMid meet" aria-hidden="true" font-family="var(--font-sans)">
        <defs><clipPath id="n7c"><circle cx="97" cy="92" r="20"/></clipPath></defs>
        <g class="cap-layer">
          <rect x="24" y="18" width="652" height="326" rx="14" fill="#FCFAF7" stroke="#FFFFFF" stroke-width="2.5" filter="drop-shadow(0 16px 34px rgba(23,42,45,0.13)) drop-shadow(0 4px 9px rgba(23,42,45,0.06))"/>
          <path d="M24 32 a14 14 0 0 1 14 -14 h624 a14 14 0 0 1 14 14 v16 h-652 Z" fill="#EFEAE3"/>
          <circle cx="42" cy="33" r="3.5" fill="#E0776A"/><circle cx="55" cy="33" r="3.5" fill="#F2CE60"/><circle cx="68" cy="33" r="3.5" fill="#3FCDAD"/>
          <text x="88" y="37" font-size="9" font-family="ui-monospace, Menlo, monospace" fill="rgba(23,42,45,0.55)">your CRM · contacts</text>
          ${fav('hubspot.com', 646, 27, 12)}
          <rect x="24" y="48" width="146" height="296" fill="#F7F4EE"/>
          <circle cx="97" cy="92" r="21" fill="#EFE9DC" stroke="#FFFFFF" stroke-width="2"/><image href="assets/brand/almaz.png" x="77" y="72" width="40" height="40" clip-path="url(#n7c)" preserveAspectRatio="xMidYMin slice"/>
          <text x="97" y="128" text-anchor="middle" font-size="12" font-weight="800" fill="#172A2D">Almaz K.</text>
          <text x="97" y="142" text-anchor="middle" font-size="8" fill="rgba(23,42,45,0.55)">Head of Ops</text>
          <rect x="58" y="150" width="78" height="18" rx="9" fill="#FFFFFF" stroke="rgba(23,42,45,0.08)"/>
          ${fav('figma.com', 66, 153, 11)}<text x="82" y="163" font-size="8.5" font-weight="700" fill="#172A2D">Figma</text>
          <line x1="44" y1="182" x2="150" y2="182" stroke="rgba(23,42,45,0.08)"/>
          <text x="44" y="200" font-size="7" font-weight="700" letter-spacing="0.06em" fill="rgba(23,42,45,0.4)">STAGE</text>
          <rect x="44" y="206" width="72" height="16" rx="8" fill="#F5F1EA"/><text x="80" y="217.5" text-anchor="middle" font-size="7.5" font-weight="700" fill="#8A5410">warm lead</text>
          <text x="44" y="244" font-size="7" font-weight="700" letter-spacing="0.06em" fill="rgba(23,42,45,0.4)">HER JOURNEY</text>
          <line x1="48" y1="254" x2="48" y2="316" stroke="rgba(23,42,45,0.12)"/>
          <circle cx="48" cy="258" r="3.5" fill="#FCFAF7" stroke="rgba(23,42,45,0.3)" stroke-width="1.2"/>
          <text x="58" y="261" font-size="7.5" fill="rgba(23,42,45,0.6)">downloaded · Feb</text>
          <circle cx="48" cy="277" r="3.5" fill="#FCFAF7" stroke="rgba(23,42,45,0.3)" stroke-width="1.2"/>
          <text x="58" y="280" font-size="7.5" fill="rgba(23,42,45,0.6)">warmed up · Mar</text>
          <circle cx="48" cy="296" r="3.5" fill="#FCFAF7" stroke="rgba(23,42,45,0.3)" stroke-width="1.2"/>
          <text x="58" y="299" font-size="7.5" fill="rgba(23,42,45,0.6)">re-engaged · Mar 18</text>
          <circle cx="48" cy="315" r="4" fill="#FAC064"/>
          <text x="58" y="318" font-size="7.5" font-weight="700" fill="#8A5410">with sales · today</text>
          <text x="192" y="72" font-size="9.5" font-weight="700" fill="#172A2D">Activity</text>
          <rect x="188" y="78" width="42" height="2.5" rx="1.25" fill="#E1962E"/>
          <text x="248" y="72" font-size="9.5" fill="rgba(23,42,45,0.45)">Emails</text>
          <text x="298" y="72" font-size="9.5" fill="rgba(23,42,45,0.45)">Notes</text>
          <text x="344" y="72" font-size="9.5" fill="rgba(23,42,45,0.45)">Calls</text>
          <line x1="188" y1="84" x2="654" y2="84" stroke="rgba(23,42,45,0.08)"/>
          <circle cx="204" cy="106" r="9" fill="#F0E9DD"/><path d="M200 104 h8 v5.5 h-8 Z M200 104 L204 107 L208 104" fill="none" stroke="#8A5410" stroke-width="1"/>
          <text x="222" y="110" font-size="9.5" font-weight="700" fill="#172A2D">Opened the pricing email</text>
          <text x="640" y="110" text-anchor="end" font-size="7.5" font-family="ui-monospace, Menlo, monospace" fill="rgba(23,42,45,0.45)">Mar 02 · 2 opens, 1 click</text>
          <line x1="188" y1="122" x2="654" y2="122" stroke="rgba(23,42,45,0.05)"/>
          <rect x="188" y="128" width="466" height="30" rx="8" fill="#F5F1EA"/>
          <rect x="198" y="135" width="42" height="16" rx="8" fill="#FAC064"/><text x="219" y="146.5" text-anchor="middle" font-size="6.5" font-weight="800" fill="#172A2D">ENGINE</text>
          <text x="250" y="147" font-size="9.5" font-weight="700" fill="#8A5410">Answered with the ROI breakdown she was circling</text>
          <text x="640" y="147" text-anchor="end" font-size="7.5" font-family="ui-monospace, Menlo, monospace" fill="rgba(138,84,16,0.7)">same day</text>
          <line x1="196" y1="176" x2="646" y2="176" stroke="rgba(23,42,45,0.12)" stroke-dasharray="3 5"/>
          <rect x="314" y="166" width="214" height="20" rx="10" fill="#F7F4EE"/>
          <text x="421" y="179.5" text-anchor="middle" font-size="8.5" font-style="italic" fill="rgba(23,42,45,0.55)">quiet for 14 days · the engine waits</text>
          <rect x="188" y="196" width="466" height="30" rx="8" fill="#F5F1EA"/>
          <rect x="198" y="203" width="42" height="16" rx="8" fill="#FAC064"/><text x="219" y="214.5" text-anchor="middle" font-size="6.5" font-weight="800" fill="#172A2D">ENGINE</text>
          <text x="250" y="215" font-size="9.5" font-weight="700" fill="#8A5410">Came back with a new angle: her team's DACH launch</text>
          <text x="640" y="215" text-anchor="end" font-size="7.5" font-family="ui-monospace, Menlo, monospace" fill="rgba(138,84,16,0.7)">Mar 18</text>
          <circle cx="204" cy="248" r="9" fill="#E7F2E9"/><path d="M200 248 L203 251 L208.5 244.5" fill="none" stroke="#3E8E58" stroke-width="1.5" stroke-linecap="round"/>
          <text x="222" y="252" font-size="9.5" font-weight="700" fill="#172A2D">Replied: <tspan font-style="italic">"good timing for us"</tspan></text>
          <text x="640" y="252" text-anchor="end" font-size="7.5" font-family="ui-monospace, Menlo, monospace" fill="rgba(23,42,45,0.45)">Mar 19</text>
          <line x1="188" y1="264" x2="654" y2="264" stroke="rgba(23,42,45,0.05)"/>
          <circle cx="204" cy="284" r="9" fill="#F0E9DD"/><g transform="translate(199,279)"><circle cx="5" cy="5" r="4" fill="none" stroke="#8A5410" stroke-width="1.1"/><circle cx="5" cy="5" r="1.4" fill="#8A5410"/></g>
          <text x="222" y="288" font-size="9.5" font-weight="700" fill="#172A2D">Visited pricing twice more</text>
          <text x="640" y="288" text-anchor="end" font-size="7.5" font-family="ui-monospace, Menlo, monospace" fill="rgba(23,42,45,0.45)">Mar 19</text>
          <line x1="188" y1="300" x2="654" y2="300" stroke="rgba(23,42,45,0.05)"/>
          <rect x="188" y="308" width="466" height="28" rx="8" fill="#172A2D" filter="drop-shadow(0 6px 14px rgba(23,42,45,0.22))"/>
          <rect x="198" y="314" width="42" height="16" rx="8" fill="#FAC064"/><text x="219" y="325.5" text-anchor="middle" font-size="6.5" font-weight="800" fill="#172A2D">ENGINE</text>
          <text x="250" y="326" font-size="9.5" font-weight="700" fill="#FFFFFF">Handed to a human, the whole story attached</text>
          <text x="640" y="326" text-anchor="end" font-size="7.5" font-family="ui-monospace, Menlo, monospace" fill="rgba(255,255,255,0.6)">today</text>
        </g>
        ${STRIP('Nobody who was interested slips through the cracks', { w: 108, t: 'branches on behavior' })}
      </svg></div>`,

    // 08 · Inbound-Led Outbound Sequences · THE TRIGGER OPENS THE SEQUENCE (doc: lead on the trigger, end on handoff)
    sequences: () => `
      <div class="rec-viz">
      <svg viewBox="0 0 700 412" preserveAspectRatio="xMidYMid meet" aria-hidden="true" font-family="var(--font-sans)">
        <text x="36" y="30" font-size="10" font-weight="700" letter-spacing="0.07em" fill="rgba(23,42,45,0.45)">ANY REAL SIGN OF INTEREST CAN OPEN IT</text>
        <g class="cap-layer">
          <rect x="36" y="40" width="152" height="48" rx="12" fill="#FCFAF7" stroke="#FFFFFF" stroke-width="2" filter="drop-shadow(0 6px 14px rgba(23,42,45,0.09))"/>
          <rect x="48" y="52" width="22" height="22" rx="7" fill="#FFFFFF"/>${fav('figma.com', 52, 56, 14)}
          <text x="78" y="60" font-size="8.5" font-weight="700" fill="#172A2D">pricing ×3 this week</text>
          <text x="78" y="73" font-size="7" font-weight="700" fill="#8A5410">just fired · 14:02</text>
          <rect x="196" y="40" width="152" height="48" rx="12" fill="#FCFAF7" stroke="#FFFFFF" stroke-width="1.6"/>
          <rect x="208" y="52" width="22" height="22" rx="7" fill="#FFFFFF" stroke="rgba(23,42,45,0.06)"/>${fav('linkedin.com', 212, 56, 14)}
          <text x="238" y="60" font-size="8.5" font-weight="700" fill="#172A2D">commented on</text>
          <text x="238" y="71" font-size="8.5" font-weight="700" fill="#172A2D">your post</text>
          <rect x="356" y="40" width="152" height="48" rx="12" fill="#FCFAF7" stroke="#FFFFFF" stroke-width="1.6"/>
          <rect x="368" y="52" width="22" height="22" rx="7" fill="#FFFFFF" stroke="rgba(23,42,45,0.06)"/><image href="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/gmail.ico" x="372" y="56" width="14" height="14" class="heroviz-favicon"/>
          <text x="398" y="60" font-size="8.5" font-weight="700" fill="#172A2D">replied to your</text>
          <text x="398" y="71" font-size="8.5" font-weight="700" fill="#172A2D">newsletter</text>
          <rect x="516" y="40" width="152" height="48" rx="12" fill="#FCFAF7" stroke="#FFFFFF" stroke-width="1.6"/>
          <rect x="528" y="52" width="22" height="22" rx="7" fill="#FFFFFF" stroke="rgba(23,42,45,0.06)"/><g transform="translate(533,57)"><rect x="0.5" y="0.5" width="9" height="11.5" rx="1" fill="none" stroke="#8A5410" stroke-width="1.3"/><line x1="2.5" y1="3.5" x2="7.5" y2="3.5" stroke="#8A5410" stroke-width="1"/><line x1="2.5" y1="6" x2="7.5" y2="6" stroke="#8A5410" stroke-width="1"/><path d="M6 14 L9 11 L12 14" fill="none" stroke="#8A5410" stroke-width="1.3" transform="rotate(180 9 12.5)"/></g>
          <text x="558" y="60" font-size="8.5" font-weight="700" fill="#172A2D">downloaded</text>
          <text x="558" y="71" font-size="8.5" font-weight="700" fill="#172A2D">the guide</text>
        </g>
        <g class="cap-layer" style="animation-delay:0.12s">
          <rect x="36" y="100" width="632" height="30" rx="15" fill="#FCFAF7" stroke="#FFFFFF" stroke-width="2" filter="drop-shadow(0 6px 14px rgba(23,42,45,0.09))"/>
          <text x="352" y="120" text-anchor="middle" font-size="10.5" font-weight="800" fill="#172A2D">one of them just crossed the line → the sequence opens itself, while the interest is real</text>
        </g>
        <path d="M292 132 L292 144" stroke="rgba(178,111,20,0.6)" stroke-width="2" stroke-dasharray="3 4"/>
        <path d="M286 142 L292 152 L298 142 Z" fill="rgba(178,111,20,0.75)"/>
        <g class="cap-layer" style="animation-delay:0.24s">
          <rect x="72" y="148" width="440" height="180" rx="16" fill="#FCFAF7" stroke="#FFFFFF" stroke-width="2" filter="drop-shadow(0 14px 30px rgba(23,42,45,0.12)) drop-shadow(0 3px 7px rgba(23,42,45,0.06))"/>
          <text x="92" y="174" font-size="9" font-weight="700" letter-spacing="0.1em" font-family="ui-monospace, Menlo, monospace" fill="rgba(23,42,45,0.45)">SEQUENCE · OPENED 14:03</text>
          <circle cx="488" cy="170" r="4" fill="#E1962E"></circle>
          <line x1="105" y1="196" x2="105" y2="300" stroke="rgba(23,42,45,0.1)"/>
          <circle cx="105" cy="204" r="9" fill="#FAC064"/><text x="105" y="207.5" text-anchor="middle" font-size="8.5" font-weight="800" fill="#172A2D">1</text>
          <rect x="126" y="190" width="24" height="24" rx="7" fill="#FFFFFF" stroke="rgba(23,42,45,0.06)"/><image href="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/gmail.ico" x="131" y="195" width="14" height="14" class="heroviz-favicon"/>
          <text x="160" y="200" font-size="11" font-weight="700" fill="#172A2D">Personal email · today</text>
          <text x="160" y="214" font-size="8.5" fill="rgba(23,42,45,0.55)">references the pricing question they just researched</text>
          <rect x="428" y="192" width="66" height="18" rx="9" fill="#E7F2E9"/><text x="461" y="204.5" text-anchor="middle" font-size="8" font-weight="700" fill="#3E8E58">SENT ✓</text>
          <circle cx="105" cy="252" r="9" fill="#FCFAF7" stroke="rgba(23,42,45,0.2)" stroke-width="1.4"/><text x="105" y="255.5" text-anchor="middle" font-size="8.5" font-weight="800" fill="rgba(23,42,45,0.6)">2</text>
          <rect x="126" y="238" width="24" height="24" rx="7" fill="#FFFFFF" stroke="rgba(23,42,45,0.06)"/>${fav('linkedin.com', 131, 243, 14)}
          <text x="160" y="248" font-size="11" font-weight="700" fill="#172A2D">LinkedIn touch · day 2</text>
          <text x="160" y="262" font-size="8.5" fill="rgba(23,42,45,0.55)">only if the email stays quiet</text>
          <rect x="428" y="240" width="66" height="18" rx="9" fill="none" stroke="rgba(23,42,45,0.25)"/><text x="461" y="252.5" text-anchor="middle" font-size="8" font-weight="700" fill="rgba(23,42,45,0.55)">QUEUED</text>
          <circle cx="105" cy="300" r="9" fill="#FCFAF7" stroke="rgba(23,42,45,0.2)" stroke-width="1.4"/><text x="105" y="303.5" text-anchor="middle" font-size="8.5" font-weight="800" fill="rgba(23,42,45,0.6)">3</text>
          <rect x="126" y="286" width="24" height="24" rx="7" fill="#FFFFFF" stroke="rgba(23,42,45,0.06)"/><g transform="translate(132,292)"><path d="M2.4 0.8 C 1.1 0.8 0.7 1.6 0.7 2.7 C 0.7 7.4 5 11.7 9.7 11.7 C 10.8 11.7 11.6 11.3 11.6 10 L11.6 8.6 L8.9 7.4 L7.7 8.6 C 6.3 7.9 4.6 6.2 3.9 4.8 L5.1 3.6 L3.9 0.8 Z" fill="none" stroke="#8A5410" stroke-width="1.2"/></g>
          <text x="160" y="296" font-size="11" font-weight="700" fill="#172A2D">Call task for your rep · day 4</text>
          <text x="160" y="310" font-size="8.5" fill="rgba(23,42,45,0.55)">with the whole story attached</text>
          <rect x="428" y="288" width="66" height="18" rx="9" fill="none" stroke="rgba(23,42,45,0.25)"/><text x="461" y="300.5" text-anchor="middle" font-size="8" font-weight="700" fill="rgba(23,42,45,0.55)">QUEUED</text>
        </g>
        <g class="cap-layer" style="animation-delay:0.4s">
          <rect x="528" y="148" width="120" height="180" rx="14" fill="#FCFAF7" stroke="#FFFFFF" stroke-width="1.6"/>
          <text x="544" y="172" font-size="8" font-weight="700" letter-spacing="0.06em" fill="rgba(138,84,16,0.75)">HANDOFF</text>
          <text x="544" y="192" font-size="9.5" font-weight="700" fill="#8A5410">your engine</text>
          <text x="544" y="205" font-size="9.5" font-weight="700" fill="#8A5410">picks it up</text>
          <text x="544" y="218" font-size="9.5" font-weight="700" fill="#8A5410">the moment</text>
          <text x="544" y="231" font-size="9.5" font-weight="700" fill="#8A5410">intent hits</text>
          <path d="M544 248 L588 248" stroke="rgba(178,111,20,0.4)" stroke-width="1.4"/>
          <text x="544" y="272" font-size="8" font-style="italic" fill="rgba(138,84,16,0.8)">most sequences</text>
          <text x="544" y="284" font-size="8" font-style="italic" fill="rgba(138,84,16,0.8)">never need step 3.</text>
          <text x="544" y="296" font-size="8" font-style="italic" fill="rgba(138,84,16,0.8)">the reply comes first.</text>
        </g>
        ${STRIP('Reach out while interest is still hot, instead of losing the moment', null)}
      </svg></div>`,

    // 09 · Pipeline & Attribution Reporting · THE RECEIPT + the #wins post everyone sees
    attrib: () => `
      <div class="rec-viz">
      <svg viewBox="0 0 700 412" preserveAspectRatio="xMidYMid meet" aria-hidden="true" font-family="var(--font-sans)">
        <g class="cap-layer" transform="rotate(-2 200 190)">
          <rect x="66" y="26" width="272" height="322" rx="6" fill="#FCFAF7" stroke="#FFFFFF" stroke-width="2" filter="drop-shadow(0 12px 26px rgba(23,42,45,0.12))"/>
          <text x="202" y="54" text-anchor="middle" font-size="9.5" font-weight="700" letter-spacing="0.22em" font-family="ui-monospace, Menlo, monospace" fill="rgba(23,42,45,0.45)">DEAL RECEIPT</text>
          <rect x="90" y="70" width="26" height="26" rx="7" fill="#FFFFFF" stroke="rgba(23,42,45,0.06)"/>${fav('figma.com', 95, 75, 16)}
          <text x="126" y="84" font-size="17" font-weight="700" fill="#172A2D">Figma</text>
          <text x="126" y="100" font-size="12.5" font-weight="800" fill="#8A5410">€180k <tspan font-weight="500" font-size="10" fill="rgba(138,84,16,0.75)">· closed Mar 18</tspan></text>
          <line x1="90" y1="118" x2="314" y2="118" stroke="rgba(23,42,45,0.15)" stroke-dasharray="4 4"/>
          <text x="90" y="146" font-size="10" font-weight="700" font-family="ui-monospace, Menlo, monospace" fill="rgba(23,42,45,0.45)">SOURCE</text>
          ${fav('linkedin.com', 176, 136, 12)}<text x="194" y="146" font-size="11" font-weight="700" fill="#172A2D">LinkedIn ad <tspan font-weight="400" fill="rgba(23,42,45,0.5)">· Feb 12</tspan></text>
          <text x="90" y="174" font-size="10" font-weight="700" font-family="ui-monospace, Menlo, monospace" fill="rgba(23,42,45,0.45)">SIGNAL</text>
          <text x="176" y="174" font-size="11" font-weight="700" fill="#172A2D">pricing ×3 <tspan font-weight="400" fill="rgba(23,42,45,0.5)">· Mar 02</tspan></text>
          <text x="90" y="202" font-size="10" font-weight="700" font-family="ui-monospace, Menlo, monospace" fill="rgba(23,42,45,0.45)">TOUCH</text>
          <text x="176" y="202" font-size="11" font-weight="700" fill="#172A2D">personal note <tspan font-weight="400" fill="rgba(23,42,45,0.5)">· Mar 04</tspan></text>
          <text x="90" y="230" font-size="10" font-weight="700" font-family="ui-monospace, Menlo, monospace" fill="rgba(23,42,45,0.45)">CLOSING</text>
          <text x="176" y="230" font-size="11" font-weight="700" fill="#172A2D">AE call <tspan font-weight="400" fill="rgba(23,42,45,0.5)">· Mar 16</tspan></text>
          <line x1="90" y1="252" x2="314" y2="252" stroke="rgba(23,42,45,0.15)" stroke-dasharray="4 4"/>
          ${fav('hubspot.com', 90, 266, 14)}<text x="112" y="277" font-size="10.5" font-weight="600" fill="#172A2D">stamped in your CRM</text>
          <text x="90" y="306" font-size="9.5" font-style="italic" fill="rgba(23,42,45,0.5)">kept on the deal, forever</text>
          <line x1="90" y1="326" x2="314" y2="326" stroke="rgba(23,42,45,0.15)" stroke-dasharray="2 5"/>
        </g>
        <g transform="translate(252,298)"><g opacity="0">
          <animate attributeName="opacity" from="0" to="0.92" dur="0.25s" begin="0.9s" fill="freeze"/>
          <animateTransform attributeName="transform" type="scale" values="1.8;1" dur="0.35s" begin="0.9s" calcMode="spline" keySplines="0.2 0.7 0.3 1" fill="freeze"/>
          <g transform="rotate(-14)">
            <rect x="-74" y="-28" width="148" height="56" rx="10" fill="rgba(225,150,46,0.07)" stroke="#E1962E" stroke-width="3.5"/>
            <rect x="-67" y="-21" width="134" height="42" rx="7" fill="none" stroke="#E1962E" stroke-width="1.2"/>
            <text x="0" y="9" text-anchor="middle" font-size="24" font-weight="800" letter-spacing="0.18em" fill="#E1962E">TRACED</text>
          </g>
        </g></g>
        <text x="380" y="44" font-size="10" font-weight="700" letter-spacing="0.07em" fill="rgba(23,42,45,0.45)">AND THE WHOLE TEAM SEES IT LAND</text>
        <g class="cap-layer" style="animation-delay:0.15s">
          <rect x="380" y="56" width="306" height="284" rx="16" fill="#FFFFFF" stroke="#FFFFFF" stroke-width="2" filter="drop-shadow(0 14px 30px rgba(23,42,45,0.13)) drop-shadow(0 3px 7px rgba(23,42,45,0.06))"/>
          <path d="M380 72 a16 16 0 0 1 16 -16 h274 a16 16 0 0 1 16 16 v14 h-306 Z" fill="#FCFAF7"/>
          ${fav('slack.com', 396, 63, 13)}<text x="416" y="74" font-size="11" font-weight="700" fill="#172A2D"># wins</text>
          <text x="668" y="74" text-anchor="end" font-size="8" fill="rgba(23,42,45,0.4)">3 new</text>
          <line x1="380" y1="86" x2="686" y2="86" stroke="rgba(23,42,45,0.07)"/>
          <rect x="396" y="100" width="34" height="34" rx="9" fill="#F5F1EA"/>${fav('clay.com', 403, 107, 20)}
          <text x="442" y="112" font-size="11" font-weight="800" fill="#172A2D">Demand Engine</text>
          <rect x="534" y="103" width="28" height="13" rx="3" fill="#EFEAE3"/><text x="548" y="113" text-anchor="middle" font-size="7.5" font-weight="700" fill="rgba(23,42,45,0.55)">APP</text>
          <text x="570" y="112" font-size="8.5" fill="rgba(23,42,45,0.45)">16:04</text>
          <text x="442" y="130" font-size="11" fill="#172A2D">🎉 <tspan font-weight="700">Figma closed · €180k</tspan></text>
          <rect x="442" y="140" width="3.5" height="58" rx="1.75" fill="#E1962E"/>
          <text x="456" y="154" font-size="8" font-weight="700" letter-spacing="0.06em" fill="rgba(23,42,45,0.45)">SOURCE</text>
          <text x="510" y="154" font-size="9.5" font-weight="700" fill="#172A2D">LinkedIn ad · Feb 12</text>
          <text x="456" y="170" font-size="8" font-weight="700" letter-spacing="0.06em" fill="rgba(23,42,45,0.45)">PATH</text>
          <text x="510" y="170" font-size="9.5" font-weight="600" fill="#172A2D">pricing ×3 → note → AE call</text>
          <text x="456" y="186" font-size="8" font-weight="700" letter-spacing="0.06em" fill="rgba(23,42,45,0.45)">VALUE</text>
          <text x="510" y="186" font-size="9.5" font-weight="800" fill="#8A5410">€180k</text>
          <rect x="442" y="208" width="40" height="18" rx="9" fill="#F5F1EA" stroke="rgba(225,150,46,0.4)"/><text x="462" y="220.5" text-anchor="middle" font-size="8.5" fill="#8A5410">🔥 3</text>
          <rect x="488" y="208" width="40" height="18" rx="9" fill="#F5F1EA" stroke="rgba(225,150,46,0.4)"/><text x="508" y="220.5" text-anchor="middle" font-size="8.5" fill="#8A5410">🙌 2</text>
          <rect x="534" y="208" width="30" height="18" rx="9" fill="none" stroke="rgba(23,42,45,0.15)"/><text x="549" y="220.5" text-anchor="middle" font-size="9" fill="rgba(23,42,45,0.45)">+</text>
          <text x="442" y="240" font-size="8.5" font-weight="600" fill="#B26F14">↳ 1 reply</text>
          <line x1="396" y1="246" x2="670" y2="246" stroke="rgba(23,42,45,0.06)"/>
          <circle cx="413" cy="266" r="15" fill="#EFE9DC"/><image href="assets/brand/peter.png" x="399" y="252" width="28" height="28" clip-path="url(#atPtr)" preserveAspectRatio="xMidYMin slice"/>
          <text x="442" y="262" font-size="11" font-weight="800" fill="#172A2D">Peter <tspan font-weight="400" font-size="8.5" fill="rgba(23,42,45,0.45)">· CEO · 16:11</tspan></text>
          <text x="442" y="280" font-size="10.5" fill="#172A2D">love it. double the LinkedIn budget ✅</text>
          <circle cx="666" cy="102" r="3.5" fill="#E1962E"></circle>
        </g>
        <defs><clipPath id="atPtr"><circle cx="413" cy="266" r="14"/></clipPath></defs>
        <g class="cap-layer" style="animation-delay:0.3s">
          <rect x="380" y="352" width="0" height="0" fill="none"/>
        </g>
        ${STRIP('Real pipeline and revenue, traced to the campaign that made them', { w: 118, t: 'full attribution' })}
      </svg></div>`
  };

  window.NEBOR_RE_VIEWS = views; // proof-sheet hook (caps-proof.html)

  function setActive(idx) {
    document.querySelectorAll(".rec-rail-btn").forEach((b, i) => b.classList.toggle("active", i === idx));
    const c = caps[idx];
    if (path) path.textContent = "/ demand-gen / capabilities / " + c.id;
    const inner = (views[c.id] || (() => ""))();
    const head = `
      <header class="rec-cap-head">
        <p class="rec-cap-desc">${c.desc || c.short || ''}</p>
      </header>`;
    body.innerHTML = head + inner;
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
  // open on the anchor (the plays engine at 02) so the most alive panel greets first
  const anchorIdx = Math.max(0, caps.findIndex((c) => c.anchor));
  setActive(anchorIdx);
})();
