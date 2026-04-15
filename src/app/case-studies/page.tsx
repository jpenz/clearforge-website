import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Stagger, StaggerItem } from '@/components/ui/animate';
import { caseStudies } from '@/data/case-studies';
import { createMetadata } from '@/lib/metadata';

export const metadata = createMetadata({
  title: 'Case Studies — Real Outcomes, Verified Results | ClearForge',
  description:
    'Real outcomes from real engagements. See how ClearForge turns AI strategy into operating performance with measurable results.',
  path: '/case-studies',
});

export default function CaseStudiesPage() {
  return (
    <>
      {/* — Hero — */}
      <section className="dark-section noise-texture relative overflow-hidden py-32 lg:py-48">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
          <p className="overline">Case Studies</p>
          <h1
            className="mt-6 text-display max-w-3xl text-bone"
            style={{ fontFamily: 'var(--font-instrument-serif)' }}
          >
            Real Outcomes. Verified Results.
          </h1>
          <p className="mt-6 max-w-xl text-body-lg text-stone">
            Every engagement is measured against revenue, cost, or throughput.
            We build, we ship, we deploy — and we measure what happens next.
          </p>
        </div>
      </section>

      {/* — Case Study List — Editorial ruled-line, matches homepage Results ═ */}
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

      {/* — CTA — */}
      <section className="dark-section noise-texture relative overflow-hidden py-24 lg:py-40">
        <div className="mx-auto max-w-2xl px-6 text-center lg:px-10">
          <h2 className="text-display text-bone">
            See how we would help your company.
          </h2>
          <p className="mt-6 text-body-lg text-stone">
            Every business is different. Start with a Forge Diagnostic and we
            will show you exactly where AI can drive measurable results.
          </p>
          <div className="mt-10">
            <Button size="lg" asChild>
              <Link href="/discover">
                Get My Free AI Readiness Score <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
