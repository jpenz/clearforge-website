import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { SectionReveal } from '@/components/home/homepage-animations';
import { engagements } from '@/data/homepage';
import { forgeProducts } from '@/data/forge-products';

/**
 * Engagements — a transparent ladder. Tier data is derived from
 * forge-products.ts (the /pricing source of truth) so prices never drift from
 * the pricing page. Bordered grid; the featured tier gets a 2px accent top rule.
 */
export function Engagements() {
  return (
    <section id="engagements" className="scroll-mt-24 bg-warm-white py-20 sm:py-28 lg:py-36">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <SectionReveal animation="fade-up">
          <div className="grid items-end gap-6 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
            <div>
              <p className="overline">{engagements.eyebrow}</p>
              <h2 className="mt-5 text-display">
                {engagements.headline[0]}
                <br />
                {engagements.headline[1]}
              </h2>
            </div>
            <p className="text-body-lg text-warm-gray">{engagements.lede}</p>
          </div>
        </SectionReveal>

        <div className="mt-12 grid border border-divider lg:mt-16 lg:grid-cols-3">
          {forgeProducts.map((product, i) => (
            <div
              key={product.name}
              className={`relative flex flex-col p-7 lg:p-8 ${
                i > 0 ? 'border-t border-divider lg:border-t-0 lg:border-l' : ''
              } ${product.featured ? 'bg-brass/[0.03]' : ''}`}
            >
              {product.featured && <div className="absolute inset-x-0 top-0 h-0.5 bg-brass" />}
              <div className="flex items-baseline justify-between">
                <h3 className="text-h4 text-anthracite">{product.name}</h3>
                <span className="metric text-xs text-warm-gray">
                  D-{String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <div className="mt-4 flex items-baseline gap-1.5">
                <span className="metric text-3xl text-anthracite">{product.price}</span>
                <span className="text-body-sm text-warm-gray">{product.period}</span>
              </div>
              <p className="mt-1 text-body-sm text-warm-gray">{product.timeline}</p>
              <p className="mt-5 text-body-sm italic text-warm-gray">
                Best for · {product.idealFor}
              </p>
              <p className="mt-4 text-body-sm text-warm-gray">{product.description}</p>
              <ul className="mt-6 space-y-2.5">
                {product.whatsIncluded.slice(0, 4).map((item) => (
                  <li key={item} className="flex gap-2.5 text-body-sm text-anthracite">
                    <span className="mt-2 block h-px w-3 shrink-0 bg-brass" aria-hidden="true" />
                    <span className="flex-1">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-7 pt-1">
                <Link
                  href="/pricing"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-brass transition-colors hover:text-brass-hover"
                >
                  See scope & pricing
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <Link
            href={engagements.cta.href}
            className="link-underline inline-flex items-center gap-2 text-sm font-medium text-warm-gray transition-colors hover:text-brass"
          >
            {engagements.cta.label} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
