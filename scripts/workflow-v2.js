// Living workflow — a live GTM system canvas inside the ORIGINAL chassis.
// Looks like the automation canvas the engine actually runs on: dot-grid
// surface, three phase zones (FIND / REACH / RUN), nine compact step nodes
// (name + tool logos + one stat), animated wires with traveling packets,
// a dark engine hub with a ticking counter, and the amber loop wire
// carrying 09 back into 01. Text is minimal; tool info lives in the dark
// hover popover (one-liner + "In this workflow:" + Learn more).
(function () {
  const data       = window.NEBOR_WORKFLOW || [];
  const nodesEl    = document.getElementById("wf-nodes");
  const cumulEl    = document.getElementById("wf-cumulative");
  const trackFill  = document.querySelector(".workflow-track-fill");

  if (!nodesEl || !data.length) return;

  const PHASE_SUBS = {
    Find:  "who we go after",
    Reach: "how we reach them",
    Run:   "how it runs, books, and learns"
  };

  // one distilled stat per node — the numbers echo each step's output line
  const NODE_STATS = [
    "6,400 lookalikes seeded",
    "48.2k → 2,800 matched",
    "620 with live intent",
    "2,100 contacts · verified",
    "1 specific line per contact",
    "2 channels · one clock",
    "every reply routed",
    "23 booked · stamped",
    "214 queued for next cycle"
  ];

  // canvas geometry · zones + node slots (left as %, top in px, H = 640)
  const ZONES = [
    { phase: "Find",  left: 2,  width: 30, cx: 17 },
    { phase: "Reach", left: 36, width: 30, cx: 51 },
    { phase: "Run",   left: 70, width: 28, cx: 84 }
  ];
  const SLOTS = [
    { cx: 17, top: 60 },  { cx: 17, top: 182 }, { cx: 17, top: 304 }, { cx: 17, top: 426 },
    { cx: 51, top: 150 }, { cx: 51, top: 330 },
    { cx: 84, top: 80 },  { cx: 84, top: 250 }, { cx: 84, top: 420 }
  ];

  function escapeAttr(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/"/g, '&quot;')
      .replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function miniLogo(slug) {
    const t = window.NEBOR_TOOLS && window.NEBOR_TOOLS[slug];
    if (!t) return '';
    return `<span class="tlogo-mini wf-clickable" data-slug="${escapeAttr(slug)}">${window.toolMarkInner(slug, 14)}</span>`;
  }

  // logo disc on a node · hover opens the dark popover (never the old white tip)
  function logoDisc(slug, role) {
    const t = window.NEBOR_TOOLS && window.NEBOR_TOOLS[slug];
    if (!t) return '';
    return `<span class="wfs-logo wf-clickable" data-slug="${escapeAttr(slug)}" data-tip="${escapeAttr(role || '')}">${window.toolMarkInner(slug, 18)}</span>`;
  }

  function renderCanvas() {
    const toolSet = new Set();
    data.forEach(d => (d.tools || []).forEach(t => toolSet.add(t)));

    const zones = ZONES.map(z => `
      <div class="wfs-zone" style="left:${z.left}%;width:${z.width}%;" data-phase="${escapeAttr(z.phase)}">
        <div class="wfs-zone-head"><b>${escapeAttr(z.phase)}</b><span>${escapeAttr(PHASE_SUBS[z.phase] || '')}</span></div>
      </div>`).join('');

    const nodes = data.map((d, i) => {
      const s = SLOTS[i] || { cx: 50, top: 60 };
      const roles = d.roles || {};
      const logos = (d.tools || []).map(sl => logoDisc(sl, roles[sl])).join('');
      return `
        <div class="wfs-node" data-idx="${i}" style="left:${s.cx}%;top:${s.top}px;">
          <div class="wfs-node-head"><span class="wfs-nnum">${String(i + 1).padStart(2, '0')}</span><span class="wfs-nname">${escapeAttr(d.step)}</span></div>
          <div class="wfs-nlogos">${logos}</div>
          <div class="wfs-nstat">${escapeAttr(NODE_STATS[i] || '')}</div>
        </div>`;
    }).join('');

    const engineLogos = ['anthropic', 'openai', 'n8n', 'clay'].map(sl => logoDisc(sl)).join('');

    return `
      <div class="wfs-wrap">
      <div class="wfs-meta">
        <span>The full system · wired end-to-end · and it loops</span>
        <span>${data.length} steps · ${toolSet.size} tools · 1 loop</span>
      </div>
      <div class="wfs" id="wfs">
        <svg class="wfs-wires" aria-hidden="true" preserveAspectRatio="none"></svg>
        ${zones}
        ${nodes}
        <div class="wfs-engine">
          <div class="wfs-engine-left">
            <span class="wfs-engine-tag">The engine · runs all three</span>
            <div class="wfs-engine-logos">${engineLogos}</div>
          </div>
          <div class="wfs-engine-count">
            <b id="wfs-counter">1,284</b>
            <span>engine actions today</span>
          </div>
        </div>
        <div class="wfs-loop-chip">↻ what books this cycle decides what gets found in the next</div>
      </div>
      </div>`;
  }

  // ---- wire layer · measured from the real DOM, so it never drifts ----
  function drawWires() {
    const root = document.getElementById('wfs');
    if (!root) return;
    const svg = root.querySelector('.wfs-wires');
    const rootR = root.getBoundingClientRect();
    const W = Math.round(rootR.width), H = Math.round(rootR.height);
    if (!W || !H) return;
    svg.setAttribute('viewBox', `0 0 ${W} ${H}`);

    const box = el => {
      const r = el.getBoundingClientRect();
      return {
        l: r.left - rootR.left, t: r.top - rootR.top,
        r: r.right - rootR.left, b: r.bottom - rootR.top,
        cx: r.left - rootR.left + r.width / 2, cy: r.top - rootR.top + r.height / 2
      };
    };
    const nb = [...root.querySelectorAll('.wfs-node')]
      .sort((a, b) => (+a.dataset.idx) - (+b.dataset.idx)).map(box);

    let parts = [];
    // sequential step wires 01→…→09
    for (let k = 0; k < nb.length - 1; k++) {
      const A = nb[k], B = nb[k + 1];
      let d;
      if (Math.abs(A.cx - B.cx) < 40) {
        d = `M ${A.cx} ${A.b} C ${A.cx} ${A.b + 22}, ${B.cx} ${B.t - 22}, ${B.cx} ${B.t - 3}`;
      } else {
        d = `M ${A.r} ${A.cy} C ${A.r + 80} ${A.cy}, ${B.l - 80} ${B.cy}, ${B.l - 3} ${B.cy}`;
      }
      parts.push(`<path class="wfs-wire" d="${d}" marker-end="url(#wfsArrow)"/>`);
      parts.push(`<circle class="wfs-dot" r="3"><animateMotion dur="3.4s" begin="${(k * 0.4).toFixed(2)}s" repeatCount="indefinite" path="${d}"/></circle>`);
    }
    // the amber loop · 09 exits right, rides the gutter and the top edge, drops into 01
    const A = nb[8], B = nb[0];
    const gx = W - 10, ty = 12;
    const dLoop = `M ${A.r} ${A.cy} H ${gx - 16} Q ${gx} ${A.cy} ${gx} ${A.cy - 16} V ${ty + 16} Q ${gx} ${ty} ${gx - 16} ${ty} H ${B.cx + 16} Q ${B.cx} ${ty} ${B.cx} ${ty + 16} V ${B.t - 5}`;
    parts.push(`<path class="wfs-wire loop" d="${dLoop}" marker-end="url(#wfsArrowAmber)"/>`);
    parts.push(`<circle class="wfs-dot loop" r="4"><animateMotion dur="8s" repeatCount="indefinite" path="${dLoop}"/></circle>`);
    // engine fan · the hub feeds all three zones
    const eng = box(root.querySelector('.wfs-engine'));
    [...root.querySelectorAll('.wfs-zone')].map(box).forEach(z => {
      parts.push(`<path class="wfs-wire eng" d="M ${eng.cx} ${eng.t} C ${eng.cx} ${eng.t - 28}, ${z.cx} ${z.b + 28}, ${z.cx} ${z.b - 2}"/>`);
    });

    svg.innerHTML = `
      <defs>
        <marker id="wfsArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="rgba(23,42,45,0.5)"/>
        </marker>
        <marker id="wfsArrowAmber" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="#E1962E"/>
        </marker>
      </defs>` + parts.join('');
  }

  // Build the horizontal node bar (the navigator) — untouched chassis behavior.
  data.forEach((d, i) => {
    const node = document.createElement("div");
    node.className = "wf-node" + (i === 0 ? " active" : "");
    node.dataset.idx = i;
    const num = String(i + 1).padStart(2, "0");
    const previewTools = (d.tools || []).slice(0, 3).map(miniLogo).join("");
    node.innerHTML = `
      <span class="step-num">Step ${num}</span>
      <div class="dot-wrap"><div class="dot"></div></div>
      <div class="step-label">${escapeAttr(d.step)}</div>
      <div class="step-tools">${previewTools}</div>
    `;
    nodesEl.appendChild(node);
  });

  function setActive(idx, highlight) {
    document.querySelectorAll(".wf-node").forEach((n, i) => {
      n.classList.toggle("active", i === idx);
    });
    if (cumulEl) {
      cumulEl.querySelectorAll(".wfs-node").forEach((el) => {
        el.classList.toggle("current", !!highlight && parseInt(el.dataset.idx, 10) === idx);
      });
      if (highlight) {
        const el = cumulEl.querySelector(`.wfs-node[data-idx="${idx}"]`);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    }
    if (trackFill) {
      const pct = data.length > 1 ? (idx / (data.length - 1)) * 100 : 0;
      trackFill.style.width = pct + "%";
    }
  }

  if (cumulEl) {
    cumulEl.innerHTML = renderCanvas();
    drawWires();
    let rT = null;
    window.addEventListener('resize', () => { clearTimeout(rT); rT = setTimeout(drawWires, 150); });
    // the counter in the hub ticks · the engine's output climbing
    const counter = document.getElementById('wfs-counter');
    if (counter) {
      let n = 1284;
      setInterval(() => {
        n += 1 + Math.floor(Math.random() * 3);
        counter.textContent = n.toLocaleString('en-US');
      }, 3200);
    }
  }
  setActive(0, false);

  nodesEl.addEventListener("click", (e) => {
    const node = e.target.closest(".wf-node");
    if (!node) return;
    setActive(parseInt(node.dataset.idx, 10), true);
  });

  // ---- tool popover · shows on HOVER · flips above when near the fold ----
  let pop = null;
  let popAnchor = null;
  let hideTimer = null;

  function closePop() {
    clearTimeout(hideTimer);
    if (pop) { pop.remove(); pop = null; popAnchor = null; }
  }
  function scheduleClose() {
    clearTimeout(hideTimer);
    hideTimer = setTimeout(closePop, 160);
  }
  function cancelClose() { clearTimeout(hideTimer); }

  function dot(s) { s = String(s || '').trim(); return s && !/[.!?]$/.test(s) ? s + '.' : s; }

  function openPop(target) {
    if (popAnchor === target) { cancelClose(); return; }
    closePop();
    const slug = target.getAttribute('data-slug');
    const t = (window.NEBOR_TOOLS || {})[slug];
    if (!t) return;
    const role = target.getAttribute('data-tip') || '';
    const mark = window.toolMarkInner ? window.toolMarkInner(slug, 18) : '';
    const toolUrl = 'https://www.nebor.ai/tools/' + encodeURIComponent(slug);

    pop = document.createElement('div');
    pop.className = 'wf-tool-pop';
    pop.innerHTML = `
      <div class="wtp-head">
        <span class="wtp-mark">${mark}</span>
        <span class="wtp-name">${escapeAttr(t.name)}</span>
      </div>
      <p class="wtp-desc">${escapeAttr(dot(t.desc))}</p>
      ${role ? `<div class="wtp-div"></div><p class="wtp-role"><b>In this workflow:</b> ${escapeAttr(dot(role))}</p>` : ''}
      <a class="wtp-more" href="${toolUrl}" target="_blank" rel="noopener">Learn more about ${escapeAttr(t.name)} <span class="wtp-arrow">→</span></a>
    `;
    document.body.appendChild(pop);
    popAnchor = target;

    // position near the hovered element; open UPWARD when the fold is close
    const r = target.getBoundingClientRect();
    const pw = 300;
    const ph = pop.offsetHeight;
    let left = window.scrollX + r.left + r.width / 2 - pw / 2;
    left = Math.max(12, Math.min(left, window.scrollX + document.documentElement.clientWidth - pw - 12));
    let top;
    if (r.bottom + ph + 18 > window.innerHeight && r.top - ph - 10 > 8) {
      top = window.scrollY + r.top - ph - 10;      // flip above
    } else {
      top = window.scrollY + r.bottom + 10;        // default below
    }
    pop.style.left = left + 'px';
    pop.style.top = top + 'px';

    // keep it open while the cursor is inside the popover (so the button is clickable)
    pop.addEventListener('mouseenter', cancelClose);
    pop.addEventListener('mouseleave', scheduleClose);
  }

  const stageEl = document.getElementById('wf-stage');
  if (stageEl) {
    stageEl.addEventListener('mouseover', (e) => {
      const target = e.target.closest('.wf-clickable');
      if (target) openPop(target);
    });
    stageEl.addEventListener('mouseout', (e) => {
      const target = e.target.closest('.wf-clickable');
      if (target && pop) scheduleClose();
    });
  }
  // tap fallback (touch devices have no hover)
  document.addEventListener('click', (e) => {
    const target = e.target.closest('.wf-clickable');
    if (target && stageEl && stageEl.contains(target)) {
      e.preventDefault();
      openPop(target);
      return;
    }
    if (pop && !e.target.closest('.wf-tool-pop')) closePop();
  });
  window.addEventListener('scroll', () => { if (pop) closePop(); }, { passive: true });

})();
