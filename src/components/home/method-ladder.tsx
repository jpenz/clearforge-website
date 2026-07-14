import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { SectionReveal, StaggerReveal } from '@/components/home/homepage-animations';
import { forgeProducts } from '@/data/forge-products';
import { methodIntro } from '@/data/homepage';

/**
 * Forge Method™ ladder — Diagnostic → Sprint → Scale. Tier data derives from
 * forge-products.ts so the homepage never drifts from /pricing. Featured tier
 * gets the ember top rule.
 */
export function MethodLadder() {
  return (
    <section className="border-t border-divider bg-recessed py-16 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <SectionReveal animation="fade-up">
          <div className="grid items-end gap-6 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
            <div>
              <p className="overline">{methodIntro.eyebrow}</p>
              <h2 className="mt-5 text-display">
                {methodIntro.headlineLead}{' '}
                <span className="display-accent">{methodIntro.headlineAccent}</span>
              </h2>
            </div>
            <p className="text-body-lg text-warm-gray">{methodIntro.lede}</p>
          </div>
        </SectionReveal>

        <StaggerReveal className="mt-12 grid gap-4 lg:grid-cols-3">
          {forgeProducts.map((product, i) => (
            <div
              key={product.name}
              className={`relative flex flex-col rounded-[12px] border bg-warm-white p-6 sm:p-7 ${
                product.featured ? 'border-brass' : 'border-divider'
              }`}
            >
              {product.featured && (
                <div className="absolute inset-x-0 top-0 h-[3px] rounded-t-[12px] bg-brass" />
              )}
              <div className="flex items-baseline justify-between">
                <span className="metric text-[10px] uppercase tracking-[0.16em] text-warm-gray">
                  PHASE-{String(i + 1).padStart(2, '0')}
                </span>
                {product.featured && (
                  <span className="metric text-[10px] uppercase tracking-[0.14em] text-brass">
                    Most chosen
                  </span>
                )}
              </div>
              <h3 className="mt-3 text-h3 text-anthracite">{product.name}</h3>
              <div className="mt-3 flex items-baseline gap-1.5">
                <span className="metric text-3xl text-anthracite">{product.price}</span>
                <span className="text-body-sm text-warm-gray">{product.period}</span>
              </div>
              <p className="metric mt-1 text-xs text-warm-gray">{product.timeline}</p>
              <p className="mt-4 text-body-sm text-warm-gray">{product.description}</p>
              <ul className="mt-5 flex-1 space-y-2">
                {product.whatsIncluded.slice(0, 4).map((item) => (
                  <li key={item} className="flex gap-2.5 text-body-sm text-anthracite">
                    <span className="mt-2.5 block h-px w-3 shrink-0 bg-brass" aria-hidden="true" />
                    <span className="flex-1">{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/pricing"
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brass transition-colors hover:text-brass-hover"
              >
                Full scope &amp; pricing <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          ))}
        </StaggerReveal>
      </div>
    </section>
  );
}
