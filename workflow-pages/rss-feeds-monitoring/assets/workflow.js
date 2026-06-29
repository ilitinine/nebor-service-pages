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
  const toolsEl    = document.getElementById("wf-tools");
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

  // A single tool/text chip used inside the hub diagram.
  // {slug} → tool node with logo; {label} → plain text node (for non-tool concepts).
  function hubChip(chip, role) {
    if (!chip) return '';
    if (chip.slug) {
      const t = window.NEBOR_TOOLS && window.NEBOR_TOOLS[chip.slug];
      const name = t ? t.name : chip.slug;
      const tip  = role || chip.role || name;
      const mark = window.toolMarkInner ? window.toolMarkInner(chip.slug, 15) : '';
      return `<span class="hub-node tip" data-tip="${escapeAttr(tip)}" data-tip-name="${escapeAttr(name)}"><span class="hub-node-mark">${mark}</span><span class="hub-node-name">${escapeAttr(name)}</span></span>`;
    }
    return `<span class="hub-node hub-node-text">${escapeAttr(chip.label || '')}</span>`;
  }

  // One spoke: an input feeds INTO the hub (node then wire), an output leaves the
  // hub (wire then node). Both read left → right, so the row reads inputs → hub → outputs.
  function hubSpoke(chip, dir, role) {
    const wire = `<span class="hub-wire"><span class="hub-wire-line"></span>${chip.wire ? `<span class="hub-wire-label">${escapeAttr(chip.wire)}</span>` : ''}</span>`;
    return dir === 'in'
      ? `<span class="hub-spoke in">${hubChip(chip, role)}${wire}</span>`
      : `<span class="hub-spoke out">${wire}${hubChip(chip, role)}</span>`;
  }

  // Per-step hub diagram: the central tool (Clay by default) sits ON the spine,
  // inputs branch in from the left, outputs branch out to the right, plus the
  // step's result. The dotted .cum-trunk spine threads vertically through the hub.
  function renderHub(d, idx) {
    const num   = String(idx + 1).padStart(2, '0');
    const roles = d.roles || {};
    const hub   = d.hub || { slug: 'clay' };
    const ins   = d.ins || [];
    const outs  = d.outs || [];

    const hubInner = hub.slug
      ? hubChip({ slug: hub.slug }, roles[hub.slug])
      : `<span class="hub-core-label">${escapeAttr(hub.label || '')}${hub.sub ? `<small>${escapeAttr(hub.sub)}</small>` : ''}</span>`;

    const insHtml    = ins.map(c => hubSpoke(c, 'in', roles[c.slug])).join('');
    const outsHtml   = outs.map(c => hubSpoke(c, 'out', roles[c.slug])).join('');
    const resultHtml = d.result ? `<span class="hub-result"><span class="hub-result-arrow">→</span>${escapeAttr(d.result)}</span>` : '';

    return `
      <div class="hub-section${d.foundation ? ' is-foundation' : ''}">
        <div class="hub-pill">
          <span class="hub-pill-num">${num}</span>
          <span class="hub-pill-name">${escapeAttr(d.step)}</span>
        </div>
        <div class="hub-row">
          <div class="hub-side hub-in">${insHtml}</div>
          <div class="hub-core${hub.slug ? '' : ' is-text'}">${hubInner}</div>
          <div class="hub-side hub-out">${outsHtml}${resultHtml}</div>
        </div>
      </div>`;
  }

  // The whole cumulative: a single spine with each step's description on the
  // alternating side, and the Clay-hub diagram centered on the spine.
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
          ${renderHub(d, i)}
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
    if (toolsEl) {
      const roles = d.roles || {};
      const rows = (d.tools || []).map(function (slug) {
        const t = (window.NEBOR_TOOLS && window.NEBOR_TOOLS[slug]) || { name: slug };
        const mark = window.toolMarkInner ? window.toolMarkInner(slug, 18) : '';
        const role = roles[slug] || '';
        return '<div class="wf-tool-row">' +
                 '<span class="wf-tool-ico">' + mark + '</span>' +
                 '<div class="wf-tool-txt">' +
                   '<span class="wf-tool-nm">' + escapeAttr(t.name) + '</span>' +
                   '<span class="wf-tool-rl">' + escapeAttr(role) + '</span>' +
                 '</div>' +
               '</div>';
      }).join('');
      toolsEl.innerHTML = rows
        ? '<div class="wf-tools-label">Tools in this step</div>' + rows
        : '';
    }
    if (trackFill) {
      const pct = data.length > 1 ? (idx / (data.length - 1)) * 100 : 0;
      trackFill.style.width = pct + "%";
    }
  }

  setActive(0);

  // Click to select a step (no hover).
  nodesEl.addEventListener("click", (e) => {
    const node = e.target.closest(".wf-node");
    if (!node) return;
    setActive(parseInt(node.dataset.idx, 10));
  });
})();
