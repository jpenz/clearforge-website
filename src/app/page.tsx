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

const buyerProblems = [
  {
    icon: LineChart,
    buyer: 'Strategy',
    title: 'The ambition is real, but the value thesis is not owned.',
    detail: 'AI priorities need a sponsor, baseline, business case, and investment sequence.',
  },
  {
    icon: Workflow,
    buyer: 'Design',
    title: 'The workflow has not been redesigned for AI and people together.',
    detail: 'Most teams add tools to old work instead of changing decisions, handoffs, and review.',
  },
  {
    icon: Gauge,
    buyer: 'Implementation',
    title: 'The build is not connected to adoption and governance.',
    detail: 'Agents, automations, dashboards, controls, and training need to launch as one system.',
  },
  {
    icon: Search,
    buyer: 'Realization',
    title: 'Benefits are discussed, but not tracked like an operating plan.',
    detail: 'Leaders need a cadence that shows adoption, value captured, risk, and next actions.',
  },
];

const buildModel = [
  {
    icon: Target,
    title: 'Set the AI ambition',
    detail:
      'Define where AI should improve growth, speed, quality, service, margin, or enterprise value.',
    output: 'Value thesis',
  },
  {
    icon: Workflow,
    title: 'Design the operating model',
    detail:
      'Redesign the workflow, decisions, handoffs, controls, and roles before the build starts.',
    output: 'Future-state work',
  },
  {
    icon: Gauge,
    title: 'Build the custom AI system',
    detail:
      'Implement agents, automations, dashboards, integrations, and exception rules around your systems.',
    output: 'Production system',
  },
  {
    icon: Users,
    title: 'Drive adoption and governance',
    detail:
      'Train users, define human review, establish risk controls, and install the leadership cadence.',
    output: 'Adoption model',
  },
  {
    icon: LineChart,
    title: 'Realize and scale benefits',
    detail:
      'Track value captured, identify leakage, improve the system, and sequence the next wave.',
    output: 'Benefits ledger',
  },
];

const proofNotes = ['Value thesis', 'Future workflow', 'System shipped', 'Benefits tracked'];

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

const firstNinetyDays = [
  {
    day: '01',
    title: 'Align ambition and value pools',
    detail:
      'Confirm the business outcomes, sponsors, baselines, constraints, and first priority areas.',
  },
  {
    day: '30',
    title: 'Design the future-state workflow',
    detail: 'Define the operating design, controls, data path, user journey, and benefits model.',
  },
  {
    day: '60',
    title: 'Build and launch the first system',
    detail: 'Ship the custom AI workflow with dashboard, handoffs, escalation, and user training.',
  },
  {
    day: '90',
    title: 'Run the benefits cadence',
    detail: 'Review adoption, value captured, risks, exceptions, and the next wave of automation.',
  },
];

const trustStandards = [
  {
    title: 'Strategy with implementation inside it',
    detail: 'The roadmap is designed around what can actually be built, adopted, and measured.',
  },
  {
    title: 'Workflow before platform',
    detail: 'The operating model is designed before tools are selected.',
  },
  {
    title: 'Governance by design',
    detail: 'Human review, escalation, monitoring, and auditability are part of the system.',
  },
  {
    title: 'Benefits realization discipline',
    detail: 'Value capture is tracked after launch, not assumed at go-live.',
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
            ['01', 'Set AI ambition'],
            ['02', 'Design and build the system'],
            ['03', 'Realize measurable benefits'],
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
              <p className="overline">Transformation Value Chain</p>
              <h2 className="mt-6 text-display">One accountable path from ambition to results.</h2>
              <p className="mt-6 max-w-xl text-body-lg text-warm-gray">
                ClearForge covers the work most AI programs split apart: strategy, operating design,
                implementation, adoption, governance, and benefits tracking.
              </p>
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
              <p className="overline">Execution Evidence</p>
              <h2 className="mt-6 text-display">What changes when strategy becomes a system.</h2>
              <p className="mt-6 text-body-lg text-warm-gray">
                The point is not a demo. The point is an operating change leaders can inspect,
                manage, and scale.
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

            <div className="grid gap-4">
              {firstNinetyDays.map((step) => (
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
              <h2 className="mt-6 text-display text-bone">
                Senior strategy. Builder accountability.
              </h2>
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
