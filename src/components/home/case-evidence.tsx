import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { SectionReveal, StaggerReveal } from '@/components/home/homepage-animations';
import { MetricCounter } from '@/components/home/metric-counter';
import { caseStudies } from '@/data/case-studies';
import { casesIntro } from '@/data/homepage';

/**
 * Evidence — metric-paired case cards ("a number in every viewport, tied to
 * a name"). Data from case-studies.ts.
 */
export function CaseEvidence() {
  return (
    <section id="results" className="scroll-mt-20 bg-parchment py-16 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <SectionReveal animation="fade-up">
          <div className="grid items-end gap-6 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
            <div>
              <p className="overline">{casesIntro.eyebrow}</p>
              <h2 className="mt-5 text-display">
                {casesIntro.headlineLead}{' '}
                <span className="display-accent">{casesIntro.headlineAccent}</span>
              </h2>
            </div>
            <p className="text-body-lg text-warm-gray">{casesIntro.lede}</p>
          </div>
        </SectionReveal>

        <StaggerReveal className="mt-12 grid gap-4 lg:grid-cols-3">
          {caseStudies.slice(0, 3).map((cs) => (
            <Link
              key={cs.slug}
              href={`/case-studies/${cs.slug}`}
              className="card-hover group flex flex-col rounded-[12px] border border-divider bg-warm-white p-6 sm:p-7"
            >
              <span className="metric text-[10px] uppercase tracking-[0.16em] text-warm-gray">
                {cs.industry}
              </span>
              <div className="mt-4">
                <MetricCounter value={cs.heroMetric} className="metric text-4xl text-brass" />
                <p className="mt-2 text-body-sm text-warm-gray">{cs.heroMetricLabel}</p>
              </div>
              <h3 className="mt-4 flex-1 text-h4 text-anthracite transition-colors group-hover:text-brass">
                {cs.title}
              </h3>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brass">
                Read the case
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </StaggerReveal>
      </div>
    </section>
  );
}
