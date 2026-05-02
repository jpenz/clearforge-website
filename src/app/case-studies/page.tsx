import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Stagger, StaggerItem } from '@/components/ui/animate';
import { Button } from '@/components/ui/button';
import { caseStudies } from '@/data/case-studies';
import { createMetadata } from '@/lib/metadata';

export const metadata = createMetadata({
  title: 'Case Studies — Operator Proof | ClearForge',
  description:
    'Real client work from ClearForge: what changed, what shipped, and how the operating cadence improved.',
  path: '/case-studies',
});

export default function CaseStudiesPage() {
  return (
    <>
      <section className="dark-section noise-texture relative overflow-hidden py-32 lg:py-48">
        <Image
          src="/images/abstract-assessment.webp"
          alt=""
          fill
          sizes="100vw"
          priority
          className="object-cover opacity-[0.22] pointer-events-none"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-forge-black via-forge-black/80 to-forge-black/40 pointer-events-none" />
        <div className="relative mx-auto max-w-[1200px] px-6 lg:px-10">
          <p className="overline">Case Studies</p>
          <h1
            className="mt-6 text-display max-w-3xl text-bone"
            style={{ fontFamily: 'var(--font-instrument-serif)' }}
          >
            Proof from work that shipped.
          </h1>
          <p className="mt-6 max-w-xl text-body-lg text-stone">
            Each case shows the constraint, the operating build, and the evidence leaders used to
            manage what happened next.
          </p>
        </div>
      </section>

      <section className="bg-parchment py-24 lg:py-40">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
          <Stagger className="mt-0" stagger={0.08}>
            {caseStudies.map((cs) => (
              <StaggerItem key={cs.slug}>
                <Link
                  href={`/case-studies/${cs.slug}`}
                  className="group block border-t border-divider"
                >
                  <div className="py-10 sm:py-12 lg:py-14 flex flex-col lg:flex-row lg:items-baseline lg:justify-between gap-6">
                    <div className="flex-1 min-w-0">
                      <span className="overline text-[10px]">{cs.industry}</span>
                      <h3
                        className="mt-3 text-h2 group-hover:text-brass transition-colors duration-300"
                        style={{ fontFamily: 'var(--font-instrument-serif)' }}
                      >
                        {cs.title}
                      </h3>
                      <p className="mt-3 text-body-sm text-warm-gray max-w-xl">
                        {cs.heroMetricLabel}
                      </p>
                    </div>
                    <div className="flex items-baseline gap-8 lg:gap-12 shrink-0">
                      <div>
                        <span
                          className="metric text-3xl sm:text-4xl text-brass"
                          style={{ fontFamily: 'var(--font-jetbrains-mono, monospace)' }}
                        >
                          {cs.heroMetric}
                        </span>
                      </div>
                      <ArrowRight className="h-5 w-5 text-warm-gray group-hover:text-brass group-hover:translate-x-2 transition-all duration-300" />
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
          <div className="border-t border-divider" />
        </div>
      </section>

      <section className="dark-section noise-texture relative overflow-hidden py-24 lg:py-40">
        <div className="mx-auto max-w-2xl px-6 text-center lg:px-10">
          <h2 className="text-display text-bone">See what we would build first.</h2>
          <p className="mt-6 text-body-lg text-stone">
            Start with a Forge Diagnostic. We will identify the workflow worth fixing, the owner who
            needs the view, and the first shipped build that can prove itself.
          </p>
          <div className="mt-10">
            <Button size="lg" asChild>
              <Link href="/discover">
                Map My First Build <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
