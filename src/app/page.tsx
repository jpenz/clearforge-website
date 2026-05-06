import { ArrowRight, CheckCircle2, Shield, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { BenefitsRealizationSystem } from '@/components/home/benefits-realization-system';
import { HeroScroll } from '@/components/home/hero-scroll';
import { SectionReveal, StaggerReveal } from '@/components/home/homepage-animations';
import { homeIcons } from '@/components/home/icon-map';
import { MetricCounter } from '@/components/home/metric-counter';
import { TransformationSpine } from '@/components/home/transformation-spine';
import { ValueOperatingSystem } from '@/components/home/value-operating-system';
import { Button } from '@/components/ui/button';
import { UseCaseCardVisual } from '@/components/use-cases/use-case-card-visual';
import { caseStudies } from '@/data/case-studies';
import {
  firstNinetyDays,
  marketGaps,
  priorityUseCaseCopy,
  proofNotes,
  trustStandards,
} from '@/data/homepage';
import { industries } from '@/data/industries-value-chains';
import { useCases } from '@/data/use-cases';
import { createMetadata } from '@/lib/metadata';

export const metadata = createMetadata({
  title: 'ClearForge - AI Transformation Strategy, Build, and Benefits Realization',
  description:
    'ClearForge helps leadership teams set AI ambition, redesign workflows, build custom AI systems, drive adoption, and realize measurable operating benefits.',
  path: '',
});

const industryCount = industries.length;
const activityCount = industries.reduce(
  (total, industry) =>
    total + industry.valueChain.reduce((count, fn) => count + fn.activities.length, 0),
  0,
);

type PriorityUseCase = (typeof priorityUseCaseCopy)[number] & {
  useCase: (typeof useCases)[number];
};

const priorityUseCases: PriorityUseCase[] = priorityUseCaseCopy.flatMap((item) => {
  const useCase = useCases.find((candidate) => candidate.slug === item.slug);
  return useCase ? [{ ...item, useCase }] : [];
});

export default function Home() {
  return (
    <>
      <HeroScroll />

      <section className="bg-parchment py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-end lg:gap-16">
            <SectionReveal animation="slide-left">
              <p className="overline">The Market Has Moved</p>
              <h2 className="mt-6 text-display">
                The question is no longer whether AI works. It is who can make it operational.
              </h2>
            </SectionReveal>
            <SectionReveal animation="fade-up">
              <p className="max-w-3xl text-body-lg text-warm-gray">
                Leaders need a team that can connect strategy, process design, custom technology,
                adoption, governance, and benefits realization without handing the work across
                disconnected vendors.
              </p>
            </SectionReveal>
          </div>

          <StaggerReveal className="mt-14 border-y border-divider">
            {marketGaps.map((problem, index) => {
              const Icon = homeIcons[problem.icon];
              return (
                <div
                  key={problem.title}
                  className="grid gap-4 border-t border-divider py-6 first:border-t-0 md:grid-cols-[10rem_1fr_2rem] md:items-start lg:py-8"
                >
                  <div className="flex items-center justify-between gap-4 md:block">
                    <span className="text-xs font-semibold uppercase text-brass">
                      {problem.label}
                    </span>
                    <p className="metric text-xs text-warm-gray md:mt-4">
                      {String(index + 1).padStart(2, '0')}
                    </p>
                  </div>
                  <div>
                    <h3 className="max-w-3xl text-h3">{problem.title}</h3>
                    <p className="mt-3 max-w-2xl text-body-sm leading-relaxed text-warm-gray">
                      {problem.detail}
                    </p>
                  </div>
                  <Icon className="h-5 w-5 text-brass md:justify-self-end" />
                </div>
              );
            })}
          </StaggerReveal>
        </div>
      </section>

      <ValueOperatingSystem />

      <TransformationSpine />

      <BenefitsRealizationSystem />

      <section id="results" className="scroll-mt-20 bg-recessed py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-[0.68fr_1.32fr] lg:gap-16">
            <SectionReveal animation="slide-left">
              <p className="overline">Execution Evidence</p>
              <h2 className="mt-6 text-display">What changes when strategy becomes a system.</h2>
              <p className="mt-6 text-body-lg text-warm-gray">
                The point is not a demo. The point is an operating change leaders can inspect,
                manage, and scale.
              </p>
              <div className="mt-8 border-y border-divider">
                {proofNotes.map((note) => (
                  <div
                    key={note}
                    className="flex items-center gap-3 border-t border-divider py-3 first:border-t-0"
                  >
                    <CheckCircle2 className="h-4 w-4 text-success" />
                    <p className="text-sm font-semibold text-anthracite">{note}</p>
                  </div>
                ))}
              </div>
            </SectionReveal>

            <div className="border-y border-divider">
              {caseStudies.slice(0, 3).map((cs) => (
                <Link
                  key={cs.slug}
                  href={`/case-studies/${cs.slug}`}
                  className="group grid gap-5 border-t border-divider py-7 first:border-t-0 sm:grid-cols-[1fr_auto] sm:items-start"
                >
                  <div>
                    <p className="overline text-[10px]">{cs.industry}</p>
                    <h3 className="mt-3 text-h3 transition-colors group-hover:text-brass">
                      {cs.title}
                    </h3>
                    <p className="mt-3 line-clamp-2 text-body-sm leading-relaxed text-warm-gray">
                      {cs.excerpt}
                    </p>
                  </div>
                  <div className="flex items-end justify-between gap-5 sm:block sm:text-right">
                    <div>
                      <MetricCounter value={cs.heroMetric} className="metric text-3xl text-brass" />
                      <p className="mt-2 max-w-[12rem] text-xs leading-relaxed text-warm-gray">
                        {cs.heroMetricLabel}
                      </p>
                    </div>
                    <span className="inline-flex items-center text-sm font-semibold text-brass">
                      Read <ArrowRight className="ml-2 h-4 w-4" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-divider bg-parchment py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <SectionReveal animation="fade-up">
            <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end lg:gap-16">
              <div>
                <p className="overline">Where Value Usually Starts</p>
                <h2 className="mt-6 text-display">
                  Six transformation surfaces that make benefits visible.
                </h2>
              </div>
              <p className="max-w-3xl text-body-lg text-warm-gray">
                Each use case starts as a workflow, but the goal is bigger: better growth, service,
                throughput, quality, decision speed, and portfolio value.
              </p>
            </div>
          </SectionReveal>

          <StaggerReveal className="mt-14 border-y border-divider">
            {priorityUseCases.map(({ useCase, focus, line, signal }) => (
              <Link
                key={useCase.slug}
                href={`/use-cases/${useCase.slug}`}
                className="group grid gap-6 border-t border-divider py-7 first:border-t-0 md:grid-cols-[minmax(14rem,0.48fr)_1fr_minmax(10rem,0.32fr)_auto] md:items-center lg:py-8"
              >
                <div className="relative aspect-[16/9] overflow-hidden bg-forge-black">
                  <UseCaseCardVisual useCase={useCase} />
                </div>
                <div>
                  <p className="overline text-[10px]">{focus}</p>
                  <h3 className="mt-2 text-h3 transition-colors group-hover:text-brass">
                    {useCase.shortTitle}
                  </h3>
                  <p className="mt-3 text-body-sm leading-relaxed text-warm-gray">{line}</p>
                </div>
                <p className="border-l border-divider pl-4 text-xs font-semibold uppercase tracking-[0.14em] text-warm-gray">
                  {signal}
                </p>
                <ArrowRight className="hidden h-5 w-5 text-brass transition-transform group-hover:translate-x-1 md:block" />
              </Link>
            ))}
          </StaggerReveal>
        </div>
      </section>

      <section className="border-t border-divider bg-warm-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:gap-16">
            <SectionReveal animation="slide-left">
              <p className="overline">First 90 Days</p>
              <h2 className="mt-6 text-display">Move from value thesis to operating cadence.</h2>
              <p className="mt-6 text-body-lg text-warm-gray">
                The first wave should create a credible roadmap, ship usable systems, train real
                users, and leave leadership with a benefits review rhythm.
              </p>
              <Button className="mt-8" asChild>
                <Link href="/pricing">
                  View engagement model <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </SectionReveal>

            <div className="relative grid gap-8 lg:grid-cols-4 lg:gap-10">
              <div className="absolute left-0 right-0 top-[1.45rem] hidden h-px bg-divider lg:block" />
              {firstNinetyDays.map((step) => (
                <SectionReveal
                  key={step.day}
                  animation="fade-up"
                  className="relative border-t border-divider pt-6 lg:border-t-0"
                >
                  <p className="metric relative z-10 inline-flex bg-warm-white pr-4 text-2xl text-brass">
                    {step.day}
                  </p>
                  <div>
                    <h3 className="mt-6 text-h3">{step.title}</h3>
                    <p className="mt-3 text-body-sm leading-relaxed text-warm-gray">
                      {step.detail}
                    </p>
                  </div>
                </SectionReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="dark-section py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-start lg:gap-16">
            <SectionReveal animation="slide-left">
              <Shield className="h-7 w-7 text-brass-light" />
              <p className="overline mt-6">Trust Standard</p>
              <h2 className="mt-6 text-display text-bone">
                Senior strategy. Builder accountability.
              </h2>
              <p className="mt-6 text-body-lg text-stone">
                ClearForge was founded by James Penz after 15 years in transformation work to close
                the gap between what gets recommended and what actually gets built.
              </p>
            </SectionReveal>

            <div className="border-y border-bone/10">
              {trustStandards.map((standard) => (
                <div
                  key={standard.title}
                  className="grid gap-4 border-t border-bone/10 py-5 first:border-t-0 md:grid-cols-[1fr_1.4fr] md:items-start"
                >
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-success" />
                    <h3 className="text-h4 text-bone">{standard.title}</h3>
                  </div>
                  <p className="text-body-sm leading-relaxed text-stone">{standard.detail}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-14 grid gap-6 border-t border-bone/10 pt-10 md:grid-cols-3">
            {[
              { value: '15+', label: 'Years across Bain, EY, Capgemini, and operator builds' },
              { value: `${industryCount}`, label: 'Industries mapped into AI value chains' },
              {
                value: `${activityCount}+`,
                label: 'Activities available for first-pass value mapping',
              },
            ].map((stat) => (
              <div key={stat.label}>
                <MetricCounter value={stat.value} className="metric text-3xl text-brass-light" />
                <p className="mt-3 text-body-sm leading-relaxed text-stone">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 border-t border-bone/10 pt-8">
            {[
              'Bain: AI automation discipline',
              'EY: digital transformation controls',
              'Capgemini: enterprise delivery',
            ].map((item) => (
              <span
                key={item}
                className="border-l border-brass-light/35 pl-3 text-xs font-semibold text-stone"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="dark-section py-16 sm:py-20">
        <div className="mx-auto max-w-[980px] px-4 text-center sm:px-6 lg:px-10">
          <Sparkles className="mx-auto h-7 w-7 text-brass-light" />
          <p className="overline mt-6">Start Here</p>
          <h2 className="mt-6 text-display text-bone">Turn AI ambition into an operating plan.</h2>
          <p className="mx-auto mt-6 max-w-2xl text-body-lg text-stone">
            Bring ClearForge in when leadership needs the roadmap, the system, the adoption model,
            and the benefits cadence to be designed together.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" asChild>
              <Link href="/contact">
                Book AI Transformation Call <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline-light" asChild>
              <Link href="/discover">Generate AI Value Map</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
