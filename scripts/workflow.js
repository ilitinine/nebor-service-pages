// Living workflow — horizontal node bar + cumulative tree-flowchart.
// Each step in the cumulative is rendered as a real tree:
//   root node  ->  fork bar  ->  N flow columns (from-tool / payload / to-tool)
// Per-step description text alternates left/right alongside the tree.
// All steps' payloads animate live (not just the current one).
(function () {
  const data       = window.NEBOR_WORKFLOW || [];
  const nodesEl    = document.getElementById("wf-nodes");
  const titleEl    = document.getElementById("wf-title");
  const descEl     = document.getElementById("wf-desc");
  const cumulEl    = document.getElementById("wf-cumulative");
  const outputEl   = document.getElementById("wf-output");
  const trackFill  = document.querySelector(".workflow-track-fill");

  if (!nodesEl || !data.length) return;

  function escapeAttr(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/"/g, '&quot;')
      .replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function miniLogo(slug) {
    const t = window.NEBOR_TOOLS && window.NEBOR_TOOLS[slug];
    if (!t) return '';
    return `<span class="tlogo-mini" title="${escapeAttr(t.name)}">${window.toolMarkInner(slug, 14)}</span>`;
  }

  // A boxed tree-style tool node (used inside each tree column)
  function treeNode(slug, role) {
    const t = window.NEBOR_TOOLS && window.NEBOR_TOOLS[slug];
    if (!t) return `<div class="tree-node"><span class="tn-name">${escapeAttr(slug)}</span></div>`;
    const role_attr = role || (t.name + ' tool');
    return `<div class="tree-node tip" data-tip="${escapeAttr(role_attr)}" data-tip-name="${escapeAttr(t.name)}"><span class="tn-mark">${window.toolMarkInner(slug, 14)}</span><span class="tn-name">${escapeAttr(t.name)}</span></div>`;
  }

  function protoLabel(proto, label) {
    if (label) return label;
    switch (proto) {
      case 'api':     return 'API call';
      case 'webhook': return 'webhook';
      case 'event':   return 'event';
      case 'sql':     return 'SQL query';
      case 'llm':     return 'prompt → completion';
      default:        return 'sync';
    }
  }

  // Render the per-step tree section that lives in the center of the trunk.
  // root → fork-bar → N flow columns → merge-bar → trunk-merge dot.
  // The .cum-trunk container's vertical line links every step's root and merge,
  // forming ONE continuous tree that grows downward.
  function renderTreeSection(d, idx) {
    const flow = d.flow || [];
    const roles = d.roles || {};
    const num = String(idx + 1).padStart(2, '0');

    let colsHtml = '';
    let colCount = 0;
    if (!flow.length) {
      const tools = (d.tools || []).slice(0, 4);
      colCount = tools.length;
      colsHtml = tools.map(slug => `
        <div class="trunk-col">
          ${treeNode(slug, roles[slug])}
        </div>`).join('');
    } else {
      colCount = flow.length;
      colsHtml = flow.map((f, i) => {
        const proto = (f.proto || 'api').toLowerCase();
        const label = protoLabel(proto, f.label);
        // No stagger — all column packets fire together so they read as branches
        // of the same trunk packet hitting the fork at the same instant.
        return `
          <div class="trunk-col">
            ${treeNode(f.from, roles[f.from])}
            <div class="tree-wire">
              <span class="tree-payload proto-${proto}">${escapeAttr(label)}</span>
            </div>
            ${treeNode(f.to, roles[f.to])}
          </div>`;
      }).join('');
    }

    return `
      <div class="tree-section">
        <div class="trunk-root">
          <span class="trunk-root-num">${num}</span>
          <span class="trunk-root-name">${escapeAttr(d.step)}</span>
        </div>
        <div class="trunk-fork"></div>
        <div class="trunk-cols" data-cols="${colCount}">
          ${colsHtml}
        </div>
        <div class="trunk-merge" aria-hidden="true"></div>
      </div>`;
  }

  // The whole cumulative: a single trunk with each step's description
  // centered ABOVE its root, along the same vertical axis as the tree.
  function renderCumulative(currentIdx) {
    const steps = data.slice(0, currentIdx + 1);
    if (!steps.length) return '';

    const stepsHtml = steps.map((d, i) => {
      const isCurrent = i === currentIdx;
      const sideClass = (i % 2 === 0) ? 'text-right' : 'text-left';
      const status = isCurrent
        ? '<span class="cum-now">live</span>'
        : '<span class="cum-prev">wired</span>';
      return `
        <div class="trunk-step ${sideClass}${isCurrent ? ' current' : ' past'}">
          <aside class="trunk-text">
            <div class="trunk-text-head">
              <span class="cum-num">${String(i+1).padStart(2,'0')}</span>
              <h4 class="cum-step">${escapeAttr(d.step)}</h4>
            </div>
            <p class="cum-desc">${escapeAttr(d.desc)}</p>
            ${status}
          </aside>
          ${renderTreeSection(d, i)}
        </div>
      `;
    }).join('');

    return `
      <div class="cum-chart">
        <div class="cum-head">
          <span class="cum-tag">System wired through step ${String(currentIdx + 1).padStart(2, '0')}</span>
          <span class="cum-live"><i></i>live</span>
        </div>
        <div class="cum-trunk">${stepsHtml}</div>
      </div>`;
  }

  // Build the horizontal node bar.
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

  function setActive(idx) {
    document.querySelectorAll(".wf-node").forEach((n, i) => {
      n.classList.toggle("active", i === idx);
    });
    const d = data[idx];
    if (!d) return;
    if (titleEl)  titleEl.textContent = d.step;
    if (descEl)   descEl.textContent = d.desc;
    if (cumulEl)  cumulEl.innerHTML = renderCumulative(idx);
    if (outputEl) outputEl.innerHTML = `<span class="arrow">→</span> ${escapeAttr(d.output || '')}`;
    if (trackFill) {
      const pct = data.length > 1 ? (idx / (data.length - 1)) * 100 : 0;
      trackFill.style.width = pct + "%";
    }
  }

  setActive(0);

  nodesEl.addEventListener("mouseover", (e) => {
    const node = e.target.closest(".wf-node");
    if (!node) return;
    setActive(parseInt(node.dataset.idx, 10));
  });
  nodesEl.addEventListener("click", (e) => {
    const node = e.target.closest(".wf-node");
    if (!node) return;
    setActive(parseInt(node.dataset.idx, 10));
  });
})();
