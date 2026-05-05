import {
  ArrowRight,
  CheckCircle2,
  Gauge,
  LineChart,
  Search,
  Shield,
  Sparkles,
  Target,
  Users,
  Workflow,
} from 'lucide-react';
import Link from 'next/link';
import { HeroScroll } from '@/components/home/hero-scroll';
import { SectionReveal, StaggerReveal } from '@/components/home/homepage-animations';
import { MetricCounter } from '@/components/home/metric-counter';
import { Button } from '@/components/ui/button';
import { OperatorSystemPreview } from '@/components/use-cases/operator-system-preview';
import { UseCaseCardVisual } from '@/components/use-cases/use-case-card-visual';
import { caseStudies } from '@/data/case-studies';
import { industries } from '@/data/industries-value-chains';
import { useCases } from '@/data/use-cases';
import { createMetadata } from '@/lib/metadata';

export const metadata = createMetadata({
  title: 'ClearForge - Custom AI Operating Systems',
  description:
    'ClearForge helps operators find the workflow worth fixing, build the custom AI system around it, and install the cadence that makes performance measurable.',
  path: '',
});

const industryCount = industries.length;
const activityCount = industries.reduce(
  (total, industry) =>
    total + industry.valueChain.reduce((count, fn) => count + fn.activities.length, 0),
  0,
);

const buyerProblems = [
  {
    icon: LineChart,
    buyer: 'CEO / owner',
    title: 'Growth is not showing up where the market is moving.',
    detail: 'Signals, accounts, and next actions are scattered across tools and people.',
  },
  {
    icon: Users,
    buyer: 'COO',
    title: 'Service quality depends on heroic follow-up.',
    detail: 'Work gets done, but through inboxes, memory, and uneven handoffs.',
  },
  {
    icon: Gauge,
    buyer: 'PE operator',
    title: 'Margin improvement is trapped in exception work.',
    detail: 'The opportunity is visible, but the operating system to capture it is missing.',
  },
  {
    icon: Search,
    buyer: 'Leadership team',
    title: 'AI pilots are active, but the work still runs the old way.',
    detail: 'Tools exist. The workflow, owner, control loop, and adoption model do not.',
  },
];

const buildModel = [
  {
    icon: Target,
    title: 'Find the constraint',
    detail:
      'Map the value chain, baseline the current workflow, and choose the first build that can move a real KPI.',
    output: 'AI value map',
  },
  {
    icon: Workflow,
    title: 'Build the system',
    detail:
      'Design the agents, data paths, dashboards, integrations, and exception rules around how work actually moves.',
    output: 'Production workflow',
  },
  {
    icon: Gauge,
    title: 'Run the cadence',
    detail:
      'Train the team, install the review rhythm, and keep improving the system with measured feedback.',
    output: 'Operating control loop',
  },
];

const proofNotes = ['Constraint', 'System shipped', 'Measured result', 'Operating change'];

const priorityUseCaseCopy = [
  {
    slug: 'ai-sales-pipeline-acceleration',
    focus: 'Revenue growth',
    line: 'Find buying events, match them to fit, and give sellers the next action.',
    signal: 'Lead volume, stage movement, seller feedback',
  },
  {
    slug: 'ai-customer-service-excellence',
    focus: 'Service quality',
    line: 'Reduce response variance while keeping judgment and escalation visible.',
    signal: 'Response time, repeat issues, escalation quality',
  },
  {
    slug: 'ai-operations-efficiency',
    focus: 'Operations efficiency',
    line: 'Move manual coordination, approvals, and exception queues into a managed workflow.',
    signal: 'Cycle time, backlog, manual load',
  },
  {
    slug: 'ai-knowledge-work-automation',
    focus: 'Knowledge work',
    line: 'Turn research, drafting, review, and reuse into a faster expert workflow.',
    signal: 'Hours saved, quality checks, reuse rate',
  },
  {
    slug: 'ai-quality-control-exception-management',
    focus: 'Quality exceptions',
    line: 'Detect repeat issues, route work to the right owner, and close the learning loop.',
    signal: 'Exception rate, rework, root-cause closure',
  },
  {
    slug: 'pe-portfolio-ai-value-creation',
    focus: 'PE value creation',
    line: 'Prioritize portfolio workflows by value, feasibility, adoption, and EBITDA path.',
    signal: 'Value map, build priority, owner readiness',
  },
];

type PriorityUseCase = (typeof priorityUseCaseCopy)[number] & {
  useCase: (typeof useCases)[number];
};

const priorityUseCases: PriorityUseCase[] = priorityUseCaseCopy.flatMap((item) => {
  const useCase = useCases.find((candidate) => candidate.slug === item.slug);
  return useCase ? [{ ...item, useCase }] : [];
});

const firstThirtyDays = [
  {
    day: '01',
    title: 'Pressure-test the value chain',
    detail: 'Identify the workflows with enough volume, pain, data, ownership, and upside.',
  },
  {
    day: '10',
    title: 'Choose the first production bet',
    detail: 'Compare build options by KPI impact, feasibility, risk, and adoption load.',
  },
  {
    day: '30',
    title: 'Leave with a build case',
    detail: 'Define the architecture, sprint scope, controls, owner cadence, and decision path.',
  },
];

const trustStandards = [
  {
    title: 'Workflow before platform',
    detail: 'The work is mapped before tools are chosen.',
  },
  {
    title: 'Proof before scale',
    detail: 'The first system must earn the next one.',
  },
  {
    title: 'Human control by design',
    detail: 'Escalation, review rights, and audit trails are part of the build.',
  },
  {
    title: 'Guarantee on the first bet',
    detail: 'Three measurable opportunities or the diagnostic investment is refunded.',
  },
];

const salesPipelineUseCase =
  useCases.find((useCase) => useCase.slug === 'ai-sales-pipeline-acceleration') ?? useCases[0];

export default function Home() {
  return (
    <>
      <HeroScroll />

      <section className="border-b border-divider bg-warm-white">
        <div className="mx-auto grid max-w-[1400px] gap-0 px-4 sm:px-6 lg:grid-cols-3 lg:px-10">
          {[
            ['01', 'Find the workflow worth fixing'],
            ['02', 'Build the custom AI system'],
            ['03', 'Train the team to run it'],
          ].map(([number, label]) => (
            <div
              key={number}
              className="border-b border-divider py-5 lg:border-b-0 lg:border-r lg:px-8 lg:first:pl-0 lg:last:border-r-0"
            >
              <p className="metric text-xs text-brass">{number}</p>
              <p className="mt-2 text-sm font-semibold text-anthracite">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-parchment py-20 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-end lg:gap-16">
            <SectionReveal animation="slide-left">
              <p className="overline">When To Call</p>
              <h2 className="mt-6 text-display">
                AI needs a business target before it needs more tools.
              </h2>
            </SectionReveal>
            <SectionReveal animation="fade-up">
              <p className="max-w-3xl text-body-lg text-warm-gray">
                ClearForge is built for leaders who can already feel the drag: missed growth,
                inconsistent service, slow knowledge work, margin leaks, or AI pilots that never
                changed the operating rhythm.
              </p>
            </SectionReveal>
          </div>

          <StaggerReveal className="mt-14 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {buyerProblems.map((problem) => {
              const Icon = problem.icon;
              return (
                <div key={problem.title} className="border border-divider bg-warm-white p-6">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-xs font-semibold uppercase tracking-[0.16em] text-warm-gray">
                      {problem.buyer}
                    </span>
                    <Icon className="h-5 w-5 text-brass" />
                  </div>
                  <h3 className="mt-5 text-h4">{problem.title}</h3>
                  <p className="mt-3 text-body-sm leading-relaxed text-warm-gray">
                    {problem.detail}
                  </p>
                </div>
              );
            })}
          </StaggerReveal>
        </div>
      </section>

      <section className="border-t border-divider bg-warm-white py-20 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-[0.84fr_1.16fr] lg:items-start lg:gap-16">
            <SectionReveal animation="slide-left">
              <p className="overline">What We Build</p>
              <h2 className="mt-6 text-display">A working system, not a better deck.</h2>
              <p className="mt-6 max-w-xl text-body-lg text-warm-gray">
                The deliverable is a new way for the work to run: AI where it helps, people where
                judgment matters, and leaders with a clear view of performance.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Button asChild>
                  <Link href="/services">
                    See services <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="secondary" asChild>
                  <Link href="/operating-model">Operating model</Link>
                </Button>
              </div>
            </SectionReveal>

            <div className="grid gap-4">
              {buildModel.map((item, index) => {
                const Icon = item.icon;
                return (
                  <SectionReveal
                    key={item.title}
                    animation="fade-up"
                    className="border border-divider bg-parchment p-6 sm:p-7"
                  >
                    <div className="grid gap-5 sm:grid-cols-[3rem_1fr_auto] sm:items-start">
                      <div className="flex h-11 w-11 items-center justify-center border border-brass/30 bg-brass/10 text-brass">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="metric text-xs text-brass">
                          {String(index + 1).padStart(2, '0')}
                        </p>
                        <h3 className="mt-2 text-h3">{item.title}</h3>
                        <p className="mt-3 text-body-sm leading-relaxed text-warm-gray">
                          {item.detail}
                        </p>
                      </div>
                      <span className="w-fit border border-divider bg-warm-white px-3 py-2 text-xs font-semibold text-anthracite">
                        {item.output}
                      </span>
                    </div>
                  </SectionReveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <OperatorSystemPreview
        useCase={salesPipelineUseCase}
        variant="compact"
        className="py-20 sm:py-24 lg:py-32"
      />

      <section id="results" className="scroll-mt-20 bg-recessed py-20 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-[0.68fr_1.32fr] lg:gap-16">
            <SectionReveal animation="slide-left">
              <p className="overline">Proof You Can Inspect</p>
              <h2 className="mt-6 text-display">Less claim. More operating evidence.</h2>
              <p className="mt-6 text-body-lg text-warm-gray">
                Every serious AI build should answer four questions before it asks for scale.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-3">
                {proofNotes.map((note) => (
                  <div key={note} className="border border-divider bg-warm-white p-4">
                    <CheckCircle2 className="h-4 w-4 text-brass" />
                    <p className="mt-3 text-sm font-semibold text-anthracite">{note}</p>
                  </div>
                ))}
              </div>
            </SectionReveal>

            <div className="grid gap-4">
              {caseStudies.slice(0, 3).map((cs) => (
                <Link
                  key={cs.slug}
                  href={`/case-studies/${cs.slug}`}
                  className="group border border-divider bg-warm-white p-6 transition-colors hover:bg-white sm:p-7"
                >
                  <div className="grid gap-5 sm:grid-cols-[1fr_auto] sm:items-start">
                    <div>
                      <p className="overline text-[10px]">{cs.industry}</p>
                      <h3 className="mt-3 text-h3 transition-colors group-hover:text-brass">
                        {cs.title}
                      </h3>
                      <p className="mt-3 line-clamp-2 text-body-sm leading-relaxed text-warm-gray">
                        {cs.excerpt}
                      </p>
                    </div>
                    <div className="sm:text-right">
                      <MetricCounter value={cs.heroMetric} className="metric text-3xl text-brass" />
                      <p className="mt-2 max-w-[12rem] text-xs leading-relaxed text-warm-gray">
                        {cs.heroMetricLabel}
                      </p>
                    </div>
                  </div>
                  <span className="mt-5 inline-flex items-center text-sm font-semibold text-brass">
                    Read case study <ArrowRight className="ml-2 h-4 w-4" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-divider bg-parchment py-20 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <SectionReveal animation="fade-up">
            <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end lg:gap-16">
              <div>
                <p className="overline">Where We Start</p>
                <h2 className="mt-6 text-display">
                  Six first workflows that buyers understand fast.
                </h2>
              </div>
              <p className="max-w-3xl text-body-lg text-warm-gray">
                These are not generic AI categories. They are operating surfaces where owners can
                see volume, exceptions, accountability, and economic value.
              </p>
            </div>
          </SectionReveal>

          <StaggerReveal className="mt-14 grid gap-5 lg:grid-cols-3">
            {priorityUseCases.map(({ useCase, focus, line, signal }) => (
              <Link
                key={useCase.slug}
                href={`/use-cases/${useCase.slug}`}
                className="group overflow-hidden border border-divider bg-warm-white transition-colors hover:bg-white"
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <UseCaseCardVisual useCase={useCase} />
                </div>
                <div className="p-6">
                  <p className="overline text-[10px]">{focus}</p>
                  <h3 className="mt-2 text-h3 transition-colors group-hover:text-brass">
                    {useCase.shortTitle}
                  </h3>
                  <p className="mt-3 text-body-sm leading-relaxed text-warm-gray">{line}</p>
                  <p className="mt-5 border-t border-divider pt-4 text-xs font-semibold uppercase tracking-[0.14em] text-warm-gray">
                    {signal}
                  </p>
                </div>
              </Link>
            ))}
          </StaggerReveal>
        </div>
      </section>

      <section className="border-t border-divider bg-warm-white py-20 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:gap-16">
            <SectionReveal animation="slide-left">
              <p className="overline">First 30 Days</p>
              <h2 className="mt-6 text-display">A fast path to a build/no-build decision.</h2>
              <p className="mt-6 text-body-lg text-warm-gray">
                The diagnostic is intentionally narrow. It creates enough clarity to fund the first
                production workflow without pretending the whole company has been transformed.
              </p>
              <Button className="mt-8" asChild>
                <Link href="/pricing">
                  View engagement options <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </SectionReveal>

            <div className="grid gap-4">
              {firstThirtyDays.map((step) => (
                <SectionReveal
                  key={step.day}
                  animation="fade-up"
                  className="grid gap-5 border border-divider bg-parchment p-6 sm:grid-cols-[4rem_1fr] sm:p-7"
                >
                  <p className="metric text-2xl text-brass">{step.day}</p>
                  <div>
                    <h3 className="text-h3">{step.title}</h3>
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

      <section className="dark-section py-20 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-start lg:gap-16">
            <SectionReveal animation="slide-left">
              <Shield className="h-7 w-7 text-brass-light" />
              <p className="overline mt-6">Trust Standard</p>
              <h2 className="mt-6 text-display text-bone">Founder-led. Operator-grade.</h2>
              <p className="mt-6 text-body-lg text-stone">
                ClearForge was founded by James Penz after 15 years in transformation work to close
                the gap between what gets recommended and what actually gets built.
              </p>
            </SectionReveal>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {trustStandards.map((standard) => (
                <div key={standard.title} className="border border-bone/10 bg-bone/[0.04] p-6">
                  <CheckCircle2 className="h-5 w-5 text-brass-light" />
                  <h3 className="mt-5 text-h4 text-bone">{standard.title}</h3>
                  <p className="mt-3 text-body-sm leading-relaxed text-stone">{standard.detail}</p>
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

          <div className="mt-10 flex flex-wrap gap-3 border-t border-bone/10 pt-8">
            {[
              'Bain: AI automation discipline',
              'EY: digital transformation controls',
              'Capgemini: enterprise delivery',
            ].map((item) => (
              <span
                key={item}
                className="border border-bone/10 bg-bone/[0.04] px-4 py-2 text-xs font-semibold text-stone"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="dark-section py-20 sm:py-28">
        <div className="mx-auto max-w-[980px] px-4 text-center sm:px-6 lg:px-10">
          <Sparkles className="mx-auto h-7 w-7 text-brass-light" />
          <p className="overline mt-6">Start Here</p>
          <h2 className="mt-6 text-display text-bone">
            Get the first value map before the first meeting.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-body-lg text-stone">
            Enter your website, get a company-specific first read, and use the diagnostic call to
            decide whether the first workflow is worth building.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" asChild>
              <Link href="/discover">
                Generate AI Value Map <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline-light" asChild>
              <Link href="/contact">Book a Diagnostic Call</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
