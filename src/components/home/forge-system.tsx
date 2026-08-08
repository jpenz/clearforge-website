import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { ForgeIntelDemo } from '@/components/home/forge-intel-demo';
import { ScorecardDemo } from '@/components/home/scorecard-demo';
import { skuIntro, skus } from '@/data/homepage';

/**
 * Working AI systems — research-driven replacement for the old 2x2 card
 * grid (uniform bordered cards read as "template site" on every leader
 * homepage inspected). Pattern: DEMO WHAT'S DEMOABLE, INDEX THE REST —
 * two full-width editorial product bands for the live tools (flagship
 * Forge Intelligence first, per owner call 2026-07-15), then a ruled
 * editorial index for Blueprints + Method. Server component; the two demo
 * surfaces are the only client islands.
 */
export function ForgeSystem() {
  const intel = skus.find((s) => s.id === 'intelligence');
  const scorecard = skus.find((s) => s.id === 'scorecard');
  const indexRows = skus.filter((s) => s.id === 'blueprints' || s.id === 'method');

  return (
    <section className="bg-parchment py-16 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <p className="overline">{skuIntro.eyebrow}</p>
        <h2 className="mt-5 text-display max-w-3xl">
          {skuIntro.headlineLead} <span className="display-accent">{skuIntro.headlineAccent}</span>
        </h2>
        <p className="mt-5 max-w-2xl text-body-lg text-warm-gray">{skuIntro.lede}</p>

        {/* ── Band 1 · Forge Intelligence (flagship) ── */}
        {intel && (
          <div className="mt-16 grid items-center gap-10 border-t border-divider pt-12 lg:grid-cols-12 lg:gap-16 lg:pt-16">
            <div className="lg:col-span-5">
              <p className="overline">01 · {intel.tag}</p>
              <h3 className="mt-5 font-display text-h1">{intel.name}</h3>
              <p className="mt-4 max-w-md text-body-lg text-warm-gray">{intel.desc}</p>
              <div className="mt-6 flex items-baseline gap-2 border-t border-divider pt-5">
                <span className="metric text-2xl text-brass">{intel.stat}</span>
                <span className="text-body-sm text-warm-gray">{intel.statLabel}</span>
              </div>
              <div className="mt-7">
                <Link
                  href={intel.href}
                  data-analytics="home_band_intelligence"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-brass transition-colors hover:text-brass-hover"
                >
                  Map the Workflow, free to run
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
            <div className="lg:col-span-7">
              <ForgeIntelDemo />
            </div>
          </div>
        )}

        {/* ── Band 2 · Forge Scorecard ── */}
        {scorecard && (
          <div className="mt-14 grid items-center gap-10 border-t border-divider pt-12 lg:grid-cols-12 lg:gap-16 lg:pt-16">
            <div className="order-1 lg:order-2 lg:col-span-5">
              <p className="overline">02 · {scorecard.tag}</p>
              <h3 className="mt-5 font-display text-h1">{scorecard.name}</h3>
              <p className="mt-4 max-w-md text-body-lg text-warm-gray">{scorecard.desc}</p>
              <div className="mt-6 flex items-baseline gap-2 border-t border-divider pt-5">
                <span className="metric text-2xl text-brass">{scorecard.stat}</span>
                <span className="text-body-sm text-warm-gray">{scorecard.statLabel}</span>
              </div>
              <div className="mt-7">
                <Link
                  href={scorecard.href}
                  data-analytics="home_band_scorecard"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-brass transition-colors hover:text-brass-hover"
                >
                  Take the scorecard, free and no signup
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
            <div className="order-2 lg:order-1 lg:col-span-7">
              <ScorecardDemo />
            </div>
          </div>
        )}

        {/* ── Ruled index · Blueprints + Method ── */}
        <div className="mt-14 border-t border-divider">
          {indexRows.map((sku, i) => (
            <Link
              key={sku.id}
              href={sku.href}
              data-analytics={`home_index_${sku.id}`}
              className="group -mx-4 grid items-baseline gap-2 border-b border-divider px-4 py-7 transition-colors hover:bg-warm-white sm:-mx-6 sm:px-6 lg:-mx-10 lg:grid-cols-12 lg:gap-8 lg:px-10"
            >
              <div className="flex items-baseline gap-4 lg:col-span-5">
                <span className="metric text-sm text-brass">0{i + 3}</span>
                <span className="font-display text-h3 text-anthracite transition-colors group-hover:text-brass">
                  {sku.name}
                </span>
              </div>
              <p className="text-body-sm text-warm-gray lg:col-span-5">{sku.desc}</p>
              <div className="flex items-baseline justify-between gap-3 lg:col-span-2 lg:justify-end">
                <span className="metric text-sm text-anthracite">
                  {sku.stat}{' '}
                  <span className="text-[10px] uppercase text-warm-gray">{sku.statLabel}</span>
                </span>
                <ArrowRight className="h-4 w-4 shrink-0 self-center text-warm-gray transition-all group-hover:translate-x-1 group-hover:text-brass" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
