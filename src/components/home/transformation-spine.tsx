import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { SectionReveal } from '@/components/home/homepage-animations';
import { Button } from '@/components/ui/button';
import { transformationSpine } from '@/data/homepage';
import { homeIcons } from './icon-map';

export function TransformationSpine() {
  return (
    <section className="border-t border-divider bg-warm-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-end lg:gap-16">
          <SectionReveal animation="slide-left">
            <p className="overline">Transformation Value Chain</p>
            <h2 className="mt-6 text-display">One accountable path from ambition to results.</h2>
          </SectionReveal>
          <SectionReveal animation="fade-up">
            <p className="max-w-3xl text-body-lg text-warm-gray">
              ClearForge covers the work most AI programs split apart: strategy, operating design,
              implementation, adoption, governance, and benefits tracking.
            </p>
          </SectionReveal>
        </div>

        <div className="mt-14 border border-divider bg-parchment">
          <div className="grid lg:grid-cols-5">
            {transformationSpine.map((item, index) => {
              const Icon = homeIcons[item.icon];
              return (
                <div
                  key={item.title}
                  className="group relative border-b border-divider p-6 transition-colors hover:bg-warm-white lg:border-b-0 lg:border-r lg:last:border-r-0"
                >
                  <div className="flex items-start justify-between gap-4">
                    <p className="metric text-xs text-brass">
                      {String(index + 1).padStart(2, '0')}
                    </p>
                    <Icon className="h-5 w-5 text-brass" />
                  </div>
                  <h3 className="mt-7 text-h4">{item.title}</h3>
                  <p className="mt-4 text-body-sm leading-relaxed text-warm-gray">{item.detail}</p>
                  <p className="mt-7 border-t border-divider pt-4 text-xs font-semibold uppercase tracking-[0.14em] text-anthracite">
                    {item.output}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <Button asChild>
            <Link href="/services">
              Explore capabilities <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="secondary" asChild>
            <Link href="/operating-model">See operating model</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
