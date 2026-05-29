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

        <div className="relative mt-16">
          <div className="absolute left-0 right-0 top-[2.15rem] hidden h-px bg-divider lg:block" />
          <div className="grid gap-10 lg:grid-cols-5">
            {transformationSpine.map((item, index) => {
              const Icon = homeIcons[item.icon];
              return (
                <div
                  key={item.title}
                  className="group relative border-t border-divider pt-6 lg:border-t-0 lg:pt-0"
                >
                  <div className="flex items-center justify-between gap-4 lg:block">
                    <p className="metric relative z-10 inline-flex bg-warm-white pr-4 text-xs text-brass lg:bg-white">
                      {String(index + 1).padStart(2, '0')}
                    </p>
                    <Icon className="h-5 w-5 text-brass lg:mt-8" />
                  </div>
                  <h3 className="mt-6 max-w-[13rem] text-h4">{item.title}</h3>
                  <p className="mt-4 text-body-sm leading-relaxed text-warm-gray">{item.detail}</p>
                  <p className="mt-7 border-l border-brass pl-3 text-xs font-semibold uppercase tracking-[0.14em] text-anthracite">
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
