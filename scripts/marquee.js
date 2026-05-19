// Render the trusted-by marquee with real, recognizable brand logos.
// Mix of fictionalized client wordmarks + real public B2B brand logos via simple-icons.
window.NEBOR_BRANDS = [
  // Real-looking clients (italic serif wordmarks)
  { kind: 'wordmark', name: "Dymaxa",          color: "#E8794A" },
  { kind: 'wordmark', name: "Groeileaders",    color: "#1F2330" },
  { kind: 'wordmark', name: "Northwind",       color: "#1F2330" },
  { kind: 'wordmark', name: "Morrow Labs",     color: "#5F1E69" },
  { kind: 'wordmark', name: "Atlas Logistics", color: "#1F2330" },
  { kind: 'wordmark', name: "Vector·io",       color: "#D9805A" },
  { kind: 'wordmark', name: "Halcyon",         color: "#1F2330" },
  { kind: 'wordmark', name: "Outrider",        color: "#1F2330" },
  { kind: 'wordmark', name: "Helio Studios",   color: "#B084D9" },
  { kind: 'wordmark', name: "Solene Co.",      color: "#1F2330" },
  { kind: 'wordmark', name: "Ridgeway",        color: "#5588D1" },
  // Real public brand logos via simple-icons (representative B2B stack)
  { kind: 'icon', name: "HubSpot",    slug: "hubspot",     color: "#FF7A59" },
  { kind: 'icon', name: "Salesforce", slug: "salesforce",  color: "#00A1E0" },
  { kind: 'icon', name: "Snowflake",  slug: "snowflake",   color: "#29B5E8" },
  { kind: 'icon', name: "Notion",     slug: "notion",      color: "#1F2330" },
  { kind: 'icon', name: "Zapier",     slug: "zapier",      color: "#FF4F00" },
  { kind: 'icon', name: "Linear",     slug: "linear",      color: "#5E6AD2" },
  { kind: 'icon', name: "Slack",      slug: "slack",       color: "#4A154B" },
  { kind: 'icon', name: "Intercom",   slug: "intercom",    color: "#1F8DED" },
  { kind: 'icon', name: "Webflow",    slug: "webflow",     color: "#146EF5" },
  { kind: 'icon', name: "Figma",      slug: "figma",       color: "#F24E1E" }
];

window.renderMarquee = function (id) {
  const el = document.getElementById(id);
  if (!el) return;
  const items = window.NEBOR_BRANDS.concat(window.NEBOR_BRANDS); // duplicate for seamless loop
  el.innerHTML = items.map(b => {
    if (b.kind === 'icon') {
      return `<span class="marquee-item icon-mark">
        <span class="ti" style="--ti-url:url('https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/${b.slug}.svg');--ti-color:${b.color};--ti-size:24px"></span>
        <span class="m-name" style="color:${b.color};">${b.name}</span>
      </span>`;
    }
    return `<span class="marquee-item">
      <span class="m-wm" style="color:${b.color};">${b.name}</span>
    </span>`;
  }).join("");
};
