/* ClearForge — sections (pyramid restructure) */
const { useEffect: useEffect_s, useState: useState_s } = React;

function Nav() {
  return (
    <nav className="nav">
      <div className="wrap nav__row">
        <a className="brand" href="#">
          <span className="brand__mark">CF</span>
          <span>ClearForge<span className="brand__dot">.</span>ai</span>
        </a>
        <div className="nav__links">
          <a href="#gap">Why</a>
          <a href="#engagements">Engagements</a>
          <a href="#work">Work</a>
          <a href="#firm">Firm</a>
          <a className="nav__cta" href="#score" data-keep>
            Take readiness score
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
              <path d="M2 5h6M5 2l3 3-3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square"/>
            </svg>
          </a>
        </div>
      </div>
    </nav>
  );
}

function Hero({ focus = 'tightened' }) {
  const tightened = focus === 'tightened';
  return (
    <section className="hero">
      <div className="hero__schema" aria-hidden="true"></div>
      <div className="wrap" style={{position:'relative'}}>
        <div className="hero__grid">
          <div className="hero__main">
            <div className="hero__top">
              <span className="pip"></span>
              <span>For mid-market &amp; PE-backed companies</span>
            </div>
            <h1 className="hero__h">
              AI that ships.<br/>
              ROI you can <span className="accent">prove.</span>
            </h1>
            <p className="hero__sub">
              We diagnose the highest-value workflows, ship production AI in 10–14 weeks,
              and track every dollar of impact. Transparent pricing. No platform lock-in.
            </p>
            <div className="hero__cta">
              <a className="btn btn--accent" href="#score">
                Get your readiness score
                <svg className="arrow" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"/>
                </svg>
              </a>
              <a className="btn btn--ghost hero__secondary" href="#engagements">See engagements &amp; pricing</a>
            </div>
          </div>

          {tightened && <HeroProof />}
        </div>

        <div className="hero__strip">
          <div>
            <div className="num tnum">79% → 11%</div>
            <div className="lbl">Claim AI adoption vs. run agents in production</div>
          </div>
          <div>
            <div className="num tnum">$11B</div>
            <div className="lbl">AI consulting market, growing 26% YoY</div>
          </div>
          <div>
            <div className="num tnum">47%</div>
            <div className="lbl">Of PE funds increasing AI spend in 2026</div>
          </div>
          <div>
            <div className="num tnum">10–14 wk</div>
            <div className="lbl">Kickoff to live production system</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroProof() {
  const lines = [
    ['Data readiness', '2 / 5', 40],
    ['Deployment path', '1 / 5', 20],
    ['Adoption plan', '1 / 5', 20],
  ];
  return (
    <aside className="hero__proof" aria-hidden="true">
      <div className="hero__proof-row">
        <span>Production-readiness</span>
        <span>scorecard / v0.12</span>
      </div>
      <div className="hero__score">
        <span className="n tnum">34</span>
        <span className="d">/ 100</span>
        <span className="tag">● BENCHMARK</span>
      </div>
      <div className="hero__meter"><i style={{width:'34%'}}></i></div>
      <div className="hero__lines">
        {lines.map(([k, v, w], i) => (
          <div className="hero__line" key={i}>
            <span className="k">{k}</span>
            <span className="t"><i style={{width:`${w}%`}}></i></span>
            <span className="v">{v}</span>
          </div>
        ))}
      </div>
      <div className="hero__proof-row hero__proof-foot">
        <span>Most firms score &lt; 40</span>
        <span className="live">Yours in 4 min →</span>
      </div>
    </aside>
  );
}

function PillarStrip({ focus = 'tightened' }) {
  const classic = [
    ['Production systems', 'Not strategy decks'],
    ['Benefits realization', 'Tracked, not estimated'],
    ['Transparent pricing', 'Published, fixed-price'],
    ['No platform lock-in', 'You own everything'],
  ];
  // Objection-neutralizing bullets, ordered by how often the objection comes up.
  const objections = [
    ['“Pilots that never ship”', 'We define “live” up front and build to production criteria — not another POC that dies in a deck.'],
    ['“No one can prove the ROI”', 'We baseline your KPIs on day one and track every dollar of impact through launch and beyond.'],
    ['“We’ll be locked into a vendor”', 'You own the code, the models, and the runbooks. Hand-built in your stack, yours to keep.'],
  ];
  const items = focus === 'tightened' ? objections : classic;
  return (
    <section style={{borderBottom:'1px solid var(--rule)'}}>
      <div className="wrap">
        <div className="pillar-strip">
          {items.map(([k, v], i) => (
            <div className="pillar-strip__cell" key={i}>
              <div className="pillar-strip__k">{k}</div>
              <div className="pillar-strip__v">{v}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductionGap() {
  return (
    <section className="section section--ivory" id="gap">
      <div className="wrap">
        <div className="sec-head">
          <div className="sec-head__title">
            <span className="eyebrow">01 — The thesis</span>
            <h2 className="h-1">79% are buying AI.<br/>11% are running it.</h2>
          </div>
          <p className="sec-head__lede">
            The 68-point production gap is where strategy decks die — and where every ClearForge engagement begins.
          </p>
        </div>

        <div className="gap">
          <div className="gap__panel">
            <div className="gap__bars">
              <div className="gap__bar">
                <div className="row">
                  <span className="lbl">Claim AI adoption</span>
                  <span className="num">79%</span>
                </div>
                <div className="track"><div className="fill" style={{width:'79%'}}></div></div>
              </div>
              <div className="gap__bar is-accent">
                <div className="row">
                  <span className="lbl">Agents in production</span>
                  <span className="num">11%</span>
                </div>
                <div className="track"><div className="fill" style={{width:'11%'}}></div></div>
              </div>
              <div className="gap__bar">
                <div className="row">
                  <span className="lbl">Mid-market firms at full adoption</span>
                  <span className="num">15%</span>
                </div>
                <div className="track"><div className="fill" style={{width:'15%'}}></div></div>
              </div>
              <div className="gap__bar is-accent">
                <div className="row">
                  <span className="lbl">Agentic projects facing cancellation</span>
                  <span className="num">40%</span>
                </div>
                <div className="track"><div className="fill" style={{width:'40%'}}></div></div>
              </div>
            </div>
            <div className="gap__delta">
              <span>The production gap</span>
              <span className="big tnum">68 pts</span>
            </div>
          </div>

          <div>
            <ul style={{listStyle:'none', padding:0, margin:0, display:'grid', gap:'22px'}}>
              <li>
                <div className="eyebrow">Pilot purgatory</div>
                <p style={{marginTop:'6px', color:'var(--ink-2)'}}>POCs without production-readiness criteria. We define "live" up front and ship to it.</p>
              </li>
              <li>
                <div className="eyebrow">Benefits void</div>
                <p style={{marginTop:'6px', color:'var(--ink-2)'}}>72% of AI investments destroyed value because no one tracked it. We measure baselines on day one.</p>
              </li>
              <li>
                <div className="eyebrow">Adoption gap</div>
                <p style={{marginTop:'6px', color:'var(--ink-2)'}}>Builders leave; teams revert. We ship runbooks, training, and an operating cadence — not a handoff slide.</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function Engagements() {
  const tiers = [
    {
      name: 'Diagnostic',
      id: 'D-01',
      price: '$25–35K',
      cad: 'Fixed · 4 weeks',
      best: 'PE operating partners · stalled pilots',
      desc: 'Map highest-ROI workflows, set baselines, deliver a production-readiness scorecard.',
      list: ['Workflow & value analysis', 'Data readiness audit', 'Production-readiness scorecard', 'Build plan with ROI projection'],
      cta: 'Scope a Diagnostic',
    },
    {
      name: 'Sprint',
      id: 'D-02',
      price: '$100–250K',
      cad: 'Fixed · 10–14 weeks',
      best: 'Industrial CEOs · revenue ops AI',
      desc: 'One production AI system, built and deployed in your stack. Optional 10–15% performance bonus.',
      list: ['Production AI system', 'Integrations & runbooks', 'Team training', 'KPI baseline + 30-day tracking'],
      cta: 'Plan a Sprint',
      featured: true,
    },
    {
      name: 'Scale',
      id: 'D-03',
      price: '$7.5–20K/mo',
      cad: 'Retainer · 3 tiers',
      best: 'Post-Sprint clients · fractional CAIO',
      desc: 'Ongoing operations: monitor, tune, expand. Monitor → Operate → Expand.',
      list: ['KPI dashboard & reviews', 'Active model tuning', 'Adoption coaching', 'New workflow identification'],
      cta: 'Choose a tier',
    },
    {
      name: 'Transform',
      id: 'D-04',
      price: '$250–500K',
      cad: 'Program · 6–9 months',
      best: 'PE portfolios · mid-market enterprise',
      desc: '2–3 production workflows plus operating-model redesign and exec reporting cadence.',
      list: ['2–3 production workflows', 'Operating model redesign', 'Team training program', 'Executive reporting cadence'],
      cta: 'Book a program call',
    },
  ];
  return (
    <section className="section" id="engagements">
      <div className="wrap">
        <div className="sec-head">
          <div className="sec-head__title">
            <span className="eyebrow">02 — Engagements</span>
            <h2 className="h-1">A transparent ladder.<br/>Mid-market budgets.</h2>
          </div>
          <p className="sec-head__lede">
            Four tiers, published prices, fixed scope. Each step ships an artifact you own and credits forward into the next.
          </p>
        </div>
        <div className="ladder">
          {tiers.map((t) => (
            <div className={`tier ${t.featured ? 'tier--featured' : ''}`} key={t.id}>
              <div className="tier__top">
                <div className="tier__name">{t.name}</div>
                <div className="tier__id mono">{t.id}</div>
              </div>
              <div className="tier__price">{t.price}</div>
              <div className="tier__cad">{t.cad}</div>
              <div className="tier__best">Best for · {t.best}</div>
              <p className="tier__desc">{t.desc}</p>
              <ul className="tier__list">
                {t.list.map((x, i) => <li key={i}>{x}</li>)}
              </ul>
              <div className="tier__cta">
                <a href="#contact">
                  <span>{t.cta}</span>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square"/>
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Operators() {
  const points = [
    { k: 'No bench', v: 'The senior operator who scopes the work runs the work. No handoff to a junior delivery team.' },
    { k: 'No nameless team', v: 'Every engagement lists the named humans on it. You meet them in week one.' },
    { k: 'Hand-built systems', v: 'Code, integrations, and runbooks are written by people — and reviewed by the operator who owns the outcome.' },
    { k: 'Adoption is staffed', v: 'A real human runs your training and 30-day post-launch reviews. Not a Notion doc and a Slack channel.' },
  ];
  return (
    <section className="section section--ink" id="operators">
      <div className="wrap">
        <div className="ops">
          <div className="ops__lead">
            <span className="eyebrow" style={{color:'var(--accent-2)'}}>03 — Operators</span>
            <h2 className="h-1" style={{color:'var(--paper)', marginTop:'18px'}}>
              The humans on<br/>your engagement,<br/>by name.
            </h2>
            <p className="ops__lede">
              ClearForge is staffed by senior operators only — Bain-grade strategists who also write production code.
              We don't sell a methodology and pyramid a team underneath it. The signature on the proposal is the signature on the commit.
            </p>
          </div>
          <div className="ops__grid">
            {points.map((p, i) => (
              <div className="ops__cell" key={i}>
                <div className="ops__num mono">— 0{i+1}</div>
                <div className="ops__k">{p.k}</div>
                <div className="ops__v">{p.v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Case() {
  return (
    <section className="section section--ivory" id="work">
      <div className="wrap">
        <div className="sec-head">
          <div className="sec-head__title">
            <span className="eyebrow">03 — Selected work</span>
            <h2 className="h-1">A 14-region<br/>spreadsheet,<br/>retired.</h2>
          </div>
          <p className="sec-head__lede">
            A multi-billion-dollar industrial business replaced its prospecting workflow with a production AI system in 12 weeks.
          </p>
        </div>

        <div className="case">
          <div className="case__body">
            <div className="case__sector">Industrial · Sales Intelligence</div>
            <h3 className="case__h">Custom market segmentation and lead discovery on the client's own warehouse.</h3>
            <p className="case__p">
              Integrated with Salesforce, fed reps a daily prioritized prospect list, and surfaced regional value-pool shifts — with KPIs tracked from day one.
            </p>
            <div className="case__metrics">
              <div className="case__metric">
                <div className="num tnum">−61%</div>
                <div className="lbl">Time spent prospecting per rep</div>
              </div>
              <div className="case__metric">
                <div className="num tnum">3.4×</div>
                <div className="lbl">Qualified pipeline within 90 days</div>
              </div>
              <div className="case__metric">
                <div className="num tnum">12 wk</div>
                <div className="lbl">Kickoff to live production</div>
              </div>
            </div>
          </div>

          <div className="case__viz" aria-hidden="true">
            <div style={{display:'flex', justifyContent:'space-between', fontFamily:'var(--type-mono)', fontSize:11, letterSpacing:'.16em', color:'#A6B0C2'}}>
              <span>SIGHTFORGE / R0.12</span>
              <span>14 REGIONS</span>
            </div>
            <CaseHeatmap />
            <div style={{display:'flex', justifyContent:'space-between', fontFamily:'var(--type-mono)', fontSize:11, color:'#A6B0C2'}}>
              <span>VALUE POOL — $ / WEEK</span>
              <span style={{color:'var(--accent-2)'}}>● LIVE</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CaseHeatmap() {
  const cells = [];
  const seed = (i) => {
    const x = Math.sin(i * 9301 + 49297) * 233280;
    return x - Math.floor(x);
  };
  for (let r = 0; r < 6; r++) {
    for (let c = 0; c < 7; c++) {
      cells.push(Math.pow(seed(r * 7 + c), 1.6));
    }
  }
  return (
    <div style={{display:'grid', gridTemplateColumns:'repeat(7, 1fr)', gap:'4px', margin:'24px 0'}}>
      {cells.map((v, i) => {
        const accent = v > 0.78;
        const bg = accent
          ? `rgba(232, 195, 106, ${0.35 + v * 0.6})`
          : `rgba(255, 255, 255, ${0.05 + v * 0.18})`;
        return (
          <div key={i} style={{aspectRatio:'1.4', background: bg, border: '1px solid rgba(255,255,255,0.06)'}}></div>
        );
      })}
    </div>
  );
}

function CredibilityBand() {
  return (
    <section className="section section--tight" id="firm">
      <div className="wrap">
        <div className="cred">
          <div className="cred__lead">
            <span className="eyebrow">04 — Firm</span>
            <h3 className="h-2" style={{marginTop:'12px'}}>A Bain alum<br/>who builds.</h3>
          </div>
          <div className="cred__copy">
            <p style={{color:'var(--ink-2)', fontSize:'17px', lineHeight:1.55, maxWidth:'52ch'}}>
              Founded by James Penz — former Bain Senior Manager and founding member of Bain's Automation
              Center of Excellence. The team in the discovery call is the team that ships. Senior operators only.
            </p>
          </div>
          <div className="cred__cv">
            <div className="cred__row"><span className="yr mono">2024–</span><span>ClearForge.ai · Founder</span></div>
            <div className="cred__row"><span className="yr mono">2021–24</span><span>Bain · Automation CoE (founding)</span></div>
            <div className="cred__row"><span className="yr mono">2018–21</span><span>Bain · Industrial Practice</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="cta" id="score">
      <div className="cta__schema" aria-hidden="true"></div>
      <div className="wrap">
        <div className="cta__inner">
          <div>
            <div className="eyebrow" style={{color:'var(--accent-2)'}}>— Next step</div>
            <h2 className="cta__h" style={{marginTop:'18px'}}>
              Five questions.<br/>
              Your <span className="accent">production-readiness</span> score in four minutes.
            </h2>
          </div>
          <div>
            <p className="cta__sub">
              See where you sit against the 11% running agents in production — and what to fix first.
            </p>
            <div className="cta__btns">
              <a className="btn btn--accent" href="#">
                Take the readiness score
                <svg className="arrow" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"/>
                </svg>
              </a>
              <a className="btn btn--ghost" href="#contact">Book a 30-min intro</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="foot" id="contact">
      <div className="wrap">
        <div className="foot__row">
          <div className="foot__brand">
            <a className="brand" href="#"><span className="brand__mark">CF</span><span>ClearForge<span className="brand__dot">.</span>ai</span></a>
            <p>AI strategy, production systems, and benefits realization for mid-market and PE-backed companies.</p>
          </div>
          <div className="foot__cols">
            <div>
              <h5>Engagements</h5>
              <ul>
                <li><a href="#engagements">Forge Diagnostic</a></li>
                <li><a href="#engagements">Forge Sprint</a></li>
                <li><a href="#engagements">Forge Scale</a></li>
                <li><a href="#engagements">Forge Transform</a></li>
              </ul>
            </div>
            <div>
              <h5>Firm</h5>
              <ul>
                <li><a href="#gap">Why ClearForge</a></li>
                <li><a href="#work">Selected work</a></li>
                <li><a href="#firm">Founder</a></li>
                <li><a href="#">Insights</a></li>
              </ul>
            </div>
            <div>
              <h5>Contact</h5>
              <ul>
                <li><a href="mailto:james@clearforge.ai">james@clearforge.ai</a></li>
                <li><a href="#">LinkedIn</a></li>
                <li><a href="#">Bain alumni network</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="foot__copy">
          <span>© 2026 ClearForge.ai · All rights reserved</span>
          <span>v3.1 — Pyramid restructure</span>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { Nav, Hero, HeroProof, PillarStrip, ProductionGap, Engagements, Operators, Case, CredibilityBand, FinalCTA, Footer });
