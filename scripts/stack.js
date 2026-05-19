// Render stack-chip grid from a list of slugs in NEBOR_TOOLS.
// Each chip expands on hover to show description + a CTA to the tools page.
window.renderStack = function (containerId, slugs) {
  const el = document.getElementById(containerId);
  if (!el || !window.NEBOR_TOOLS) return;

  function escapeHtml(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/"/g, '&quot;')
      .replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  el.innerHTML = slugs.map(slug => {
    const t = window.NEBOR_TOOLS[slug];
    if (!t) return "";
    const iconHtml = window.toolMarkInner ? window.toolMarkInner(slug, 22) : "";
    const cat = t.cat || "";
    const desc = t.desc || `${t.name} — used in our builds.`;
    const href = `https://www.nebor.ai/tools/${slug}`;
    return `<article class="stack-chip" data-slug="${slug}">
      <div class="stack-chip-head">
        <div class="icon">${iconHtml}</div>
        <div class="name">${escapeHtml(t.name)}</div>
        <div class="cat">${escapeHtml(cat)}</div>
      </div>
      <div class="stack-chip-extra">
        <p class="stack-chip-desc">${escapeHtml(desc)}</p>
        <a class="stack-chip-cta" href="${href}" target="_blank" rel="noopener">
          <span>Learn more</span>
          <span class="stack-chip-arrow">→</span>
        </a>
      </div>
    </article>`;
  }).join("");
};
