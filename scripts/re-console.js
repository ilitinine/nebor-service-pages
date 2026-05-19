// Live console for "What you get" — capabilities mocked as live terminal panels.
// Each cap provides an `id` that maps to a custom illustration in `views`.
(function () {
  const caps = window.NEBOR_RE_CAPS || [];
  const rail = document.getElementById("rec-rail");
  const body = document.getElementById("rec-body");
  const path = document.getElementById("rec-path");
  if (!rail || !body) return;

  const T = window.NEBOR_TOOLS || {};
  function tm(slug, size) {
    size = size || 14;
    const t = T[slug]; if (!t) return "";
    return window.toolMarkInner ? window.toolMarkInner(slug, size) : '';
  }

  const views = {
    analysis: () => `
      <div class="rec-pane">
        <div class="rec-h">/ analysis · win-loss · last 24 deals</div>
        <div class="rec-bars">
          <div class="rec-bar"><span>Won — price</span><div class="trk"><i style="width:72%"></i></div><b>72%</b></div>
          <div class="rec-bar"><span>Won — integrations</span><div class="trk"><i style="width:58%"></i></div><b>58%</b></div>
          <div class="rec-bar"><span>Lost — wrong ICP</span><div class="trk warn"><i style="width:34%"></i></div><b>34%</b></div>
          <div class="rec-bar"><span>Lost — slow follow-up</span><div class="trk warn"><i style="width:22%"></i></div><b>22%</b></div>
        </div>
        <div class="rec-pills">
          <span>${tm("hubspot")} HubSpot</span>
          <span>${tm("perplexity")} Perplexity</span>
          <span>${tm("openai")} OpenAI</span>
          <span class="ok">→ ICP refined v2.3</span>
        </div>
      </div>`,

    "gtm-icp": () => `
      <div class="rec-pane">
        <div class="rec-h">/ icp · model snapshot · TAM = 4,212 accounts</div>
        <div class="rec-bars">
          <div class="rec-bar"><span>Logistics SaaS</span><div class="trk"><i style="width:84%"></i></div><b>312</b></div>
          <div class="rec-bar"><span>Series B/C</span><div class="trk"><i style="width:64%"></i></div><b>241</b></div>
          <div class="rec-bar"><span>50–250 emp · uses HubSpot</span><div class="trk"><i style="width:74%"></i></div><b>284</b></div>
          <div class="rec-bar"><span>Hiring SDRs (90d)</span><div class="trk"><i style="width:48%"></i></div><b>178</b></div>
        </div>
        <div class="rec-pills">
          <span>${tm("apollo")} Apollo</span>
          <span>${tm("clay")} Clay</span>
          <span>${tm("builtwith")} BuiltWith</span>
        </div>
      </div>`,

    workflows: () => `
      <div class="rec-pane">
        <div class="rec-h">/ workflow · daily TAM refresh</div>
        <div class="rec-steps">
          <div class="rec-step"><span class="rec-step-i">${tm("apollo")}</span><span class="rec-step-t"><b>Pull accounts</b><em>1,284 found</em></span></div>
          <div class="rec-step"><span class="rec-step-i">${tm("clay")}</span><span class="rec-step-t"><b>Enrich each</b><em>96.4% match rate</em></span></div>
          <div class="rec-step"><span class="rec-step-i">${tm("openai")}</span><span class="rec-step-t"><b>Score against ICP</b><em>Top quintile flagged</em></span></div>
          <div class="rec-step"><span class="rec-step-i">${tm("hubspot")}</span><span class="rec-step-t"><b>Sync to CRM</b><em>38 net-new accounts</em></span></div>
        </div>
        <div class="rec-foot ok">✓ run complete · 4m 12s · next in 23h</div>
      </div>`,

    score: () => `
      <div class="rec-pane">
        <div class="rec-h">/ scoring + routing · last 50 leads</div>
        <div class="rec-bars">
          <div class="rec-bar"><span>Fit</span><div class="trk"><i style="width:88%"></i></div><b>88</b></div>
          <div class="rec-bar"><span>Intent</span><div class="trk"><i style="width:72%"></i></div><b>72</b></div>
          <div class="rec-bar"><span>Engagement</span><div class="trk"><i style="width:55%"></i></div><b>55</b></div>
          <div class="rec-bar"><span>Composite</span><div class="trk"><i style="width:78%"></i></div><b>78</b></div>
        </div>
        <div class="rec-rows">
          <div class="rec-row"><span>${tm("chilipiper")} Routed → Sara (AE · EMEA)</span><b class="ok">94s</b></div>
          <div class="rec-row"><span>${tm("slack")} Slack ping with brief</span><b class="ok">delivered</b></div>
        </div>
      </div>`,

    pipe: () => `
      <div class="rec-pane">
        <div class="rec-h">/ pipeline · stage transitions today</div>
        <div class="rec-rows">
          <div class="rec-row"><span>SQL → Discovery</span><b>14</b></div>
          <div class="rec-row"><span>Discovery → Demo</span><b>9</b></div>
          <div class="rec-row"><span>Demo → Proposal</span><b>4</b></div>
          <div class="rec-row hi"><span>Proposal → Closed-won</span><b>2</b></div>
        </div>
        <div class="rec-pills">
          <span>${tm("n8n")} n8n auto-triggers</span>
          <span>${tm("hubspot")} HubSpot updates</span>
          <span class="ok">0 stale &gt; 14d</span>
        </div>
      </div>`,

    enable: () => `
      <div class="rec-pane">
        <div class="rec-h">/ battle card · vs. Workato</div>
        <div class="rec-card">
          <div class="rec-card-row"><span class="rec-card-l">Their pitch</span><span class="rec-card-r">Enterprise iPaaS · all-in-one</span></div>
          <div class="rec-card-row hi"><span class="rec-card-l">Your angle</span><span class="rec-card-r"><b>"Workato is built for IT — Nebor is built for revenue."</b></span></div>
          <div class="rec-card-row"><span class="rec-card-l">Pricing tell</span><span class="rec-card-r">Hides $50k floor — surface it early</span></div>
          <div class="rec-card-row"><span class="rec-card-l">Do say</span><span class="rec-card-r">"Owned by your team"</span></div>
        </div>
        <div class="rec-pills">
          <span>${tm("notion")} Source-of-truth</span>
          <span>${tm("anthropic")} Auto-refreshed weekly</span>
        </div>
      </div>`,

    premeet: () => `
      <div class="rec-pane">
        <div class="rec-h">/ pre-meet brief · Sara (AE) · 09:30 today</div>
        <div class="rec-card">
          <div class="rec-card-row"><span class="rec-card-l">Account</span><span class="rec-card-r"><b>Morrow Labs</b> — logistics SaaS · Series B</span></div>
          <div class="rec-card-row"><span class="rec-card-l">Attending</span><span class="rec-card-r">Vivian Park · Head of GTM · 1 prior touch</span></div>
          <div class="rec-card-row"><span class="rec-card-l">Recent</span><span class="rec-card-r">Hired 4 SDRs in May · uses HubSpot + Outreach</span></div>
          <div class="rec-card-row hi"><span class="rec-card-l">Hooks</span><span class="rec-card-r">cycle time · deliverability · attribution</span></div>
        </div>
        <div class="rec-pills">
          <span>${tm("anthropic")} Auto-drafted</span>
          <span>${tm("perplexity")} News pulled</span>
          <span class="ok">attached · 23s</span>
        </div>
      </div>`,

    domain: () => `
      <div class="rec-pane">
        <div class="rec-h">/ domain-health · last 24h</div>
        <div class="rec-rows">
          <div class="rec-row"><span>nebor.run · primary</span><b class="ok">98.4%</b></div>
          <div class="rec-row"><span>get-nebor.io · pool</span><b class="ok">97.1%</b></div>
          <div class="rec-row"><span>nebor-team.com · warm</span><b class="warn">82.3%</b></div>
          <div class="rec-row"><span>Spam complaints</span><b>0.18%</b></div>
          <div class="rec-row"><span>SPF · DKIM · DMARC</span><b class="ok">all aligned</b></div>
        </div>
        <div class="rec-pills">
          <span>${tm("smartlead")} Smartlead</span>
          <span>${tm("instantly")} Instantly</span>
          <span>${tm("google")} Workspace SPF</span>
        </div>
      </div>`,

    attrib: () => `
      <div class="rec-pane">
        <div class="rec-h">/ attribution · pipeline by source · last 30d</div>
        <div class="rec-bars">
          <div class="rec-bar"><span>Outbound · personalized</span><div class="trk"><i style="width:62%"></i></div><b>€186K</b></div>
          <div class="rec-bar"><span>Inbound · pricing page</span><div class="trk"><i style="width:48%"></i></div><b>€142K</b></div>
          <div class="rec-bar"><span>ABM · Tier 1 plays</span><div class="trk"><i style="width:38%"></i></div><b>€118K</b></div>
          <div class="rec-bar"><span>Referral / partner</span><div class="trk"><i style="width:22%"></i></div><b>€68K</b></div>
        </div>
        <div class="rec-pills">
          <span>${tm("looker")} Looker dashboard</span>
          <span>${tm("bigquery")} BigQuery joins</span>
          <span class="ok">€514K total</span>
        </div>
      </div>`
  };

  function setActive(idx) {
    document.querySelectorAll(".rec-rail-btn").forEach((b, i) => b.classList.toggle("active", i === idx));
    const c = caps[idx];
    if (path) path.textContent = "/ sales-engine / capabilities / " + c.id;
    const inner = (views[c.id] || (() => ""))();
    const head = `
      <header class="rec-cap-head">
        <h3 class="rec-cap-title">${c.title}</h3>
        <p class="rec-cap-desc">${c.desc || c.short || ''}</p>
      </header>`;
    body.innerHTML = head + inner;
  }

  caps.forEach((c, i) => {
    const btn = document.createElement("button");
    btn.className = "rec-rail-btn";
    btn.innerHTML = `
      <span class="idx">${String(i+1).padStart(2,"0")}</span>
      <span class="lbl">${c.title}</span>
      <span class="tag">${c.tag}</span>`;
    btn.addEventListener("mouseenter", () => setActive(i));
    btn.addEventListener("click", () => setActive(i));
    rail.appendChild(btn);
  });
  setActive(0);
})();
