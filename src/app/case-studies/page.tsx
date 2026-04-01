import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
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

      {/* — Case Study Cards — */}
      <section className="bg-parchment py-24 lg:py-40">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {caseStudies.map((cs) => (
              <Link
                key={cs.slug}
                href={`/case-studies/${cs.slug}`}
                className="group flex flex-col border border-divider bg-surface p-8 transition-all hover:border-brass hover:shadow-md hover:-translate-y-1"
              >
                <span className="text-body-sm font-medium text-brass">
                  {cs.industry}
                </span>
                <p
                  className="mt-4 metric-lg text-anthracite"
                  style={{ fontFamily: 'var(--font-jetbrains-mono, monospace)' }}
                >
                  {cs.heroMetric}
                </p>
                <h3 className="mt-3 text-h4 group-hover:text-brass transition-colors flex-grow">
                  {cs.title}
                </h3>
                <p className="mt-2 text-body-sm text-warm-gray">
                  {cs.heroMetricLabel}
                </p>
                <span className="mt-6 inline-flex items-center text-sm font-medium text-brass opacity-0 group-hover:opacity-100 transition-opacity">
                  Read case study <ArrowRight className="ml-1 h-3.5 w-3.5" />
                </span>
              </Link>
            ))}
          </div>
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
