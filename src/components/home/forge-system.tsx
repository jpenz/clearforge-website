import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { SectionReveal, StaggerReveal } from '@/components/home/homepage-animations';
import { skuIntro, skus } from '@/data/homepage';

/**
 * The Forge System — the homepage's ONE bento. Four named SKUs, each with a
 * DOM-built product-UI visual (no rasters): Intelligence (thesis output),
 * Scorecard (score dashboard), Blueprints (artifact stack), Method (ladder).
 */
export function ForgeSystem() {
  return (
    <section className="bg-parchment py-16 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <SectionReveal animation="fade-up">
          <p className="overline">{skuIntro.eyebrow}</p>
          <h2 className="mt-5 text-display max-w-3xl">
            {skuIntro.headlineLead}{' '}
            <span className="display-accent">{skuIntro.headlineAccent}</span>
          </h2>
          <p className="mt-5 max-w-2xl text-body-lg text-warm-gray">{skuIntro.lede}</p>
        </SectionReveal>

        <StaggerReveal className="mt-12 grid gap-4 md:grid-cols-2">
          {skus.map((sku) => (
            <Link
              key={sku.id}
              href={sku.href}
              className="card-hover group flex flex-col rounded-[12px] border border-divider bg-warm-white p-6 sm:p-7"
            >
              <div className="flex items-baseline justify-between gap-3">
                <span className="metric text-[10px] uppercase tracking-[0.16em] text-warm-gray">
                  {sku.tag}
                </span>
                <span className="flex items-baseline gap-1.5">
                  <span className="metric text-lg text-brass">{sku.stat}</span>
                  <span className="text-[11px] text-warm-gray">{sku.statLabel}</span>
                </span>
              </div>
              <h3 className="mt-3 text-h3 text-anthracite transition-colors group-hover:text-brass">
                {sku.name}
              </h3>
              <p className="mt-2 max-w-lg text-body-sm text-warm-gray">{sku.desc}</p>

              {/* Product-UI visual */}
              <div className="mt-5 flex-1">
                <SkuVisual id={sku.id} />
              </div>

              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brass">
                {sku.cta}
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </StaggerReveal>
      </div>
    </section>
  );
}

/* DOM-built product visuals — crisp, tiny, theme-native. */
function SkuVisual({ id }: { id: string }) {
  if (id === 'intelligence') {
    return (
      <div className="rounded-[6px] border border-divider bg-parchment p-4">
        <div className="flex items-center justify-between">
          <span className="metric text-[10px] uppercase tracking-[0.14em] text-brass">
            Priority play
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-ember-vivid)]" />
            <span className="metric text-[10px] text-warm-gray">LIVE</span>
          </span>
        </div>
        <p className="metric mt-2 text-2xl text-anthracite">Likely 55–70</p>
        <div className="mt-3 space-y-1.5">
          {[
            'Demand-driven inventory forecasting',
            'RFQ intake triage agent',
            'At-risk account signals',
          ].map((line, i) => (
            <div key={line} className="flex items-center gap-2">
              <span className="metric text-[10px] text-brass">0{i + 1}</span>
              <span className="truncate text-xs text-warm-gray">{line}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  if (id === 'scorecard') {
    const bars = [
      { k: 'Data', w: 62 },
      { k: 'Workforce', w: 48 },
      { k: 'Process', w: 71 },
      { k: 'Technology', w: 55 },
      { k: 'Strategy', w: 66 },
    ];
    return (
      <div className="rounded-[6px] border border-divider bg-parchment p-4">
        <div className="flex items-baseline justify-between">
          <span className="metric text-3xl text-anthracite">
            61<span className="text-base text-warm-gray">/100</span>
          </span>
          <span className="metric text-[10px] uppercase tracking-[0.14em] text-warm-gray">
            5 pillars
          </span>
        </div>
        <div className="mt-3 space-y-2">
          {bars.map((b) => (
            <div key={b.k} className="flex items-center gap-2.5">
              <span className="metric w-20 shrink-0 text-[10px] uppercase text-warm-gray">
                {b.k}
              </span>
              <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-divider">
                <span className="block h-full rounded-full bg-brass" style={{ width: `${b.w}%` }} />
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  if (id === 'blueprints') {
    return (
      <div className="relative h-[136px]">
        {[
          { t: 'Sales Intelligence Command', o: 'z-30 top-0 left-0 right-6' },
          { t: 'Service Quality Command Center', o: 'z-20 top-7 left-3 right-3 opacity-80' },
          { t: 'Exception Control Tower', o: 'z-10 top-14 left-6 right-0 opacity-60' },
        ].map((c) => (
          <div
            key={c.t}
            className={`absolute ${c.o} rounded-[6px] border border-divider bg-parchment p-3.5`}
          >
            <div className="flex items-center justify-between">
              <span className="metric text-[10px] uppercase tracking-[0.12em] text-brass">
                BLUEPRINT
              </span>
              <span className="metric text-[10px] text-warm-gray">v1.2</span>
            </div>
            <p className="mt-1.5 truncate text-xs font-semibold text-anthracite">{c.t}</p>
          </div>
        ))}
      </div>
    );
  }
  // method
  return (
    <div className="rounded-[6px] border border-divider bg-parchment p-4">
      <div className="flex items-center gap-1.5">
        {[
          { n: 'Diagnostic', p: '$15K' },
          { n: 'Sprint', p: '$75–200K' },
          { n: 'Scale', p: '$5–15K/mo' },
        ].map((step, i) => (
          <div key={step.n} className="flex flex-1 items-center gap-1.5">
            <div
              className={`flex-1 rounded-[6px] border p-2 text-center ${i === 1 ? 'border-brass bg-warm-white' : 'border-divider'}`}
            >
              <p className="text-[11px] font-semibold text-anthracite">{step.n}</p>
              <p className="metric mt-0.5 text-[10px] text-brass">{step.p}</p>
            </div>
            {i < 2 && <ArrowRight className="h-3 w-3 shrink-0 text-warm-gray" />}
          </div>
        ))}
      </div>
      <p className="metric mt-3 text-center text-[10px] uppercase tracking-[0.12em] text-warm-gray">
        Production criteria defined up front
      </p>
    </div>
  );
}
