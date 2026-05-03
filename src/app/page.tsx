import {
  ArrowRight,
  CheckCircle2,
  Crown,
  Gauge,
  Route,
  Shield,
  Sparkles,
  Workflow,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { ForgeMethodDiagram } from '@/components/home/forge-method-diagram';
import { HeroScroll } from '@/components/home/hero-scroll';
import { SectionReveal, StaggerReveal } from '@/components/home/homepage-animations';
import { MetricCounter } from '@/components/home/metric-counter';
import { JsonLdScript } from '@/components/seo/json-ld-script';
import { Button } from '@/components/ui/button';
import { GsapTextReveal } from '@/components/ui/gsap-text-reveal';
import { OperatorSystemPreview } from '@/components/use-cases/operator-system-preview';
import { UseCaseCardVisual } from '@/components/use-cases/use-case-card-visual';
import { caseStudies } from '@/data/case-studies';
import { industries } from '@/data/industries-value-chains';
import { useCases } from '@/data/use-cases';
import { createMetadata, faqJsonLd } from '@/lib/metadata';

export const metadata = createMetadata({
  title: 'ClearForge - Custom AI Transformation Systems',
  description:
    'ClearForge helps operators set AI ambition, find value, build custom agents and workflows, and train teams into a measurable AI operating model.',
  path: '',
});

const industryCount = industries.length;
const activityCount = industries.reduce(
  (total, industry) =>
    total + industry.valueChain.reduce((count, fn) => count + fn.activities.length, 0),
  0,
);

const operatingGaps = [
  {
    signal: 'Value is trapped in the operating model',
    symptom:
      'Every company has places where leads are missed, customers wait, quality slips, decisions stall, and margin leaks.',
    response:
      'We map the value chain and identify the specific workflows where custom AI can change growth, speed, quality, service, or cost.',
  },
  {
    signal: 'AI pilots do not transform the business',
    symptom:
      'A model can look impressive while the business process, data path, controls, incentives, and daily operating rhythm stay the same.',
    response:
      'We design and build the agents, workflows, integrations, governance, and adoption routines into the way your team actually works.',
  },
  {
    signal: 'Competitive advantage requires a system',
    symptom:
      'Speed, quality, service, efficiency, and margin cannot depend on heroic manual effort or disconnected off-the-shelf tools.',
    response:
      'We build the workflow, controls, dashboard, and team rhythm that make better performance repeatable and measurable.',
  },
];

const buyerRealities = [
  {
    tension: 'You have AI activity, but not enough operating change.',
    response:
      'The useful question is not "which model should we use?" It is "which workflow deserves a new way to run?"',
  },
  {
    tension: 'Your best people are still doing too much coordination by hand.',
    response:
      'The first build should give them better context, cleaner handoffs, and fewer avoidable status checks.',
  },
  {
    tension: 'You need confidence before you fund a larger program.',
    response:
      'Start with a diagnostic that names the owner, baseline, data path, control points, and first production scope.',
  },
];

const transformationMaturity = [
  {
    dimension: 'Ambition and value case',
    expectation:
      'Define where AI changes growth, margin, service, quality, or speed - not where a model looks interesting.',
    clearforge:
      'Set the AI ambition, quantify the business case, and choose the first workflows worth building.',
  },
  {
    dimension: 'Operating model design',
    expectation:
      'Redesign how work moves across people, systems, decisions, handoffs, and controls.',
    clearforge:
      'Map the current value chain and write the future workflow before engineering starts.',
  },
  {
    dimension: 'Custom technology build',
    expectation:
      'Fit AI into the existing CRM, ERP, data, documents, and approval paths that run the business.',
    clearforge:
      'Build custom agents, data paths, dashboards, integrations, and exception handling around your systems.',
  },
  {
    dimension: 'People and adoption',
    expectation: 'Give teams a new operating cadence, not another application to remember.',
    clearforge:
      'Train leaders and frontline users into the workflow, KPIs, review rhythm, and human-in-the-loop decisions.',
  },
  {
    dimension: 'Governance and improvement',
    expectation: 'Make the system observable, auditable, safe to operate, and better every month.',
    clearforge:
      'Install monitoring, escalation rules, quality checks, ownership, and an improvement backlog after launch.',
  },
];

const implementationStandards = [
  {
    title: 'Business case before build',
    detail:
      'Every initiative starts with the KPI owner, baseline, value hypothesis, and threshold for success.',
  },
  {
    title: 'Custom workflow design',
    detail:
      'Agents are designed around the real handoffs, approvals, edge cases, and systems your team already uses.',
  },
  {
    title: 'Human-in-the-loop controls',
    detail:
      'We define confidence thresholds, escalation paths, audit trail, quality checks, and failure modes up front.',
  },
  {
    title: 'Managed improvement loop',
    detail:
      'After launch, adoption, quality, exceptions, and performance movement are reviewed in a recurring operating cadence.',
  },
];

const trustFilters = [
  {
    title: 'No platform-first answer',
    detail:
      'We start with the workflow, owner, baseline, and operating constraint before recommending tools or architecture.',
  },
  {
    title: 'No value claim without a baseline',
    detail:
      'Every business case needs a current-state metric, evidence plan, decision owner, and threshold for success.',
  },
  {
    title: 'No build without adoption',
    detail:
      'A workflow is not production-ready until users are trained, controls are visible, and leaders have a review rhythm.',
  },
];

const valueMapSteps = [
  {
    icon: Route,
    label: 'Find the constraint',
    detail:
      'Forge Intelligence reads your website and maps the workflows most likely to affect revenue, cost, service, speed, or quality.',
  },
  {
    icon: Gauge,
    label: 'Score the market advantage',
    detail:
      'Opportunities are ranked by growth, speed, quality, service, margin, feasibility, and urgency.',
  },
  {
    icon: Workflow,
    label: 'Scope the first build',
    detail:
      'You leave with the first system to scope: workflow, data path, controls, human review, and adoption path.',
  },
];

const advantageLoop = [
  {
    label: 'Growth',
    detail: 'Surface better leads, expansion signals, pricing opportunities, and account actions.',
  },
  {
    label: 'Speed',
    detail: 'Compress quoting, triage, scheduling, reporting, review, and handoff cycles.',
  },
  {
    label: 'Quality',
    detail: 'Add repeatable checks, recommendations, and operating controls around critical work.',
  },
  {
    label: 'Service',
    detail: 'Give customers faster answers, cleaner follow-through, and fewer avoidable misses.',
  },
  {
    label: 'Margin',
    detail: 'Remove manual coordination, rework, leakage, and low-value administrative load.',
  },
];

const prioritySituations = [
  {
    situation: 'AI pilots are stuck in demonstration mode',
    problem:
      'The model works in a demo, but nobody owns the workflow, data path, QA loop, or rollout.',
    metric: 'Production path defined before build',
    link: '/services/custom-ai-agents',
  },
  {
    situation: 'Revenue teams need more signal, not more dashboards',
    problem:
      'Pipeline, account coverage, pricing, and customer expansion are scattered across tools and tribal knowledge.',
    metric: '1,181 qualified opportunities surfaced',
    link: '/services/ai-revenue-operations',
  },
  {
    situation: 'Portfolio teams need repeatable AI plays',
    problem:
      'Each company has different maturity, but the operating team needs one way to compare value levers.',
    metric: 'Portfolio playbook in 90 days',
    link: '/services/pe-value-creation',
  },
  {
    situation: 'Operations are losing margin to manual coordination',
    problem:
      'Quoting, scheduling, claims, reporting, and review cycles depend on people stitching systems together.',
    metric: 'Baseline savings model before build',
    link: '/services/performance-improvement',
  },
];

const objections = [
  {
    q: "We're not big enough for enterprise AI.",
    a: 'You do not need a large program office. You need one high-value workflow, a reliable data path, and an implementation team accountable for adoption.',
  },
  {
    q: "We've already tried AI.",
    a: 'Most failed pilots were never tied to a business metric or operating owner. Every ClearForge build is measured against revenue, cost, throughput, quality, or cycle time.',
  },
  {
    q: 'Why not just buy a platform?',
    a: 'Platforms give you capability. They do not redesign the workflow, integrate the messy edge cases, train the team, or keep the system improving after launch.',
  },
  {
    q: 'How do we know where to start?',
    a: 'Start with the AI Value Map. It gives you a fast, company-specific read on where AI is likely to create value before you commit to a paid engagement.',
  },
];

const salesPipelineUseCase =
  useCases.find((useCase) => useCase.slug === 'ai-sales-pipeline-acceleration') ?? useCases[0];

export default function Home() {
  return (
    <>
      <JsonLdScript
        data={faqJsonLd(objections.map((item) => ({ question: item.q, answer: item.a })))}
      />
      <HeroScroll />

      <div className="border-b border-divider bg-warm-white">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-3 px-4 py-4 text-xs text-warm-gray sm:px-6 sm:py-5 lg:flex-row lg:px-10">
          <span className="font-semibold text-anthracite">
            Strategy, engineering, adoption, and governance
          </span>
          <span className="hidden text-divider lg:inline">/</span>
          <span>Custom AI systems for operators, PE teams, and growth companies</span>
          <span className="hidden text-divider lg:inline">/</span>
          <span>Find the value, build the system, train the organization</span>
        </div>
      </div>

      <section className="border-b border-divider bg-warm-white py-14 sm:py-16">
        <div className="mx-auto grid max-w-[1400px] gap-8 px-4 sm:px-6 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16 lg:px-10">
          <div>
            <p className="overline">Start With the Real Problem</p>
            <h2 className="mt-5 text-h1">AI is easy to demo and hard to operate.</h2>
          </div>
          <div className="border-t border-divider">
            {buyerRealities.map((item) => (
              <div
                key={item.tension}
                className="grid gap-3 border-b border-divider py-5 sm:grid-cols-[0.9fr_1.1fr] sm:gap-8"
              >
                <p className="text-body font-semibold text-anthracite">{item.tension}</p>
                <p className="text-body-sm leading-relaxed text-warm-gray">{item.response}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-parchment py-20 sm:py-28 lg:py-36">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <SectionReveal animation="fade-up">
            <div className="max-w-4xl">
              <p className="overline">The Gap We Close</p>
              <h2 className="mt-6 text-display">
                AI only matters when it changes how the work gets done.
              </h2>
            </div>
          </SectionReveal>

          <div className="mt-14 grid border-t border-divider lg:grid-cols-3">
            {operatingGaps.map((item) => (
              <div
                key={item.signal}
                className="border-b border-divider py-8 lg:border-r lg:px-8 lg:first:pl-0 lg:last:border-r-0"
              >
                <p className="text-h4">{item.signal}</p>
                <p className="mt-4 text-body text-warm-gray">{item.symptom}</p>
                <p className="mt-5 flex items-start gap-3 text-body-sm font-medium text-anthracite">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brass" />
                  <span>{item.response}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-warm-white py-20 sm:py-28 lg:py-36">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <div className="lg:grid lg:grid-cols-12 lg:gap-16">
            <SectionReveal animation="slide-left" className="lg:col-span-5">
              <p className="overline">The Advantage Loop</p>
              <h2 className="mt-6 text-display">
                Build the operating loop that makes better work repeatable.
              </h2>
              <p className="mt-6 text-body-lg text-warm-gray">
                ClearForge does not separate technology from people. We define what AI handles, what
                your team decides, how work moves, and which numbers should improve.
              </p>
            </SectionReveal>

            <div className="mt-14 lg:col-span-7 lg:mt-0">
              <div className="border-t border-divider">
                {advantageLoop.map((item) => (
                  <div
                    key={item.label}
                    className="grid gap-3 border-b border-divider py-6 sm:grid-cols-[9rem_1fr] sm:gap-8"
                  >
                    <div className="flex items-center gap-3">
                      <Crown className="h-4 w-4 text-brass" />
                      <p className="metric text-sm text-brass">{item.label}</p>
                    </div>
                    <p className="text-body text-warm-gray">{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-divider bg-parchment py-20 sm:py-32 lg:py-40">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <SectionReveal animation="fade-up">
            <div className="lg:grid lg:grid-cols-12 lg:items-end lg:gap-12">
              <div className="lg:col-span-7">
                <p className="overline">Transformation Maturity</p>
                <h2 className="mt-6 max-w-3xl text-display">
                  Board-room discipline. Builder-speed execution.
                </h2>
              </div>
              <div className="mt-8 lg:col-span-5 lg:mt-0">
                <p className="text-body-lg text-warm-gray">
                  The best AI programs do not start with a vendor demo. They align ambition, value,
                  workflow, technology, adoption, and controls, then prove the model in production.
                </p>
              </div>
            </div>
          </SectionReveal>

          <div className="mt-14 border-t border-divider">
            {transformationMaturity.map((item, index) => (
              <div
                key={item.dimension}
                className="grid gap-5 border-b border-divider py-7 lg:grid-cols-[4rem_1.15fr_1fr_1fr] lg:items-start lg:gap-8"
              >
                <span className="metric text-sm text-brass">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="text-h4">{item.dimension}</h3>
                <p className="text-body-sm leading-relaxed text-warm-gray">{item.expectation}</p>
                <p className="text-body-sm leading-relaxed text-anthracite">{item.clearforge}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-divider bg-warm-white py-20 sm:py-28 lg:py-36">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <div className="lg:grid lg:grid-cols-12 lg:items-end lg:gap-12">
            <div className="lg:col-span-7">
              <p className="overline">Implementation Standards</p>
              <h2 className="mt-6 max-w-3xl text-display">
                Built for executive confidence, not experimentation theater.
              </h2>
            </div>
            <div className="mt-8 lg:col-span-5 lg:mt-0">
              <p className="text-body-lg text-warm-gray">
                ClearForge treats AI as a new way to run the work: measured, governed, adopted, and
                improved after launch. That is what separates a production system from a tool
                rollout.
              </p>
              <Button variant="secondary" className="mt-6" asChild>
                <Link href="/operating-model" data-analytics="home_standards_operating_model">
                  See the AI Operating Model <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="mt-14 grid border-t border-divider lg:grid-cols-4">
            {implementationStandards.map((item) => (
              <div
                key={item.title}
                className="border-b border-divider py-8 lg:border-r lg:px-7 lg:first:pl-0 lg:last:border-r-0"
              >
                <Shield className="h-5 w-5 text-brass" />
                <h3 className="mt-5 text-h4">{item.title}</h3>
                <p className="mt-3 text-body-sm leading-relaxed text-warm-gray">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-divider bg-recessed py-20 sm:py-28 lg:py-36">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <div className="lg:grid lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <p className="overline">How We Earn Trust</p>
              <h2 className="mt-6 text-display">A few things we will not do.</h2>
            </div>
            <div className="mt-12 border-t border-divider lg:col-span-7 lg:mt-0">
              {trustFilters.map((item) => (
                <div
                  key={item.title}
                  className="grid gap-4 border-b border-divider py-7 sm:grid-cols-[0.65fr_1fr] sm:gap-8"
                >
                  <h3 className="text-h4">{item.title}</h3>
                  <p className="text-body text-warm-gray">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <OperatorSystemPreview useCase={salesPipelineUseCase} />

      <section className="border-t border-divider bg-parchment py-20 sm:py-32 lg:py-40">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <SectionReveal animation="fade-up">
            <div className="lg:grid lg:grid-cols-12 lg:items-end lg:gap-12">
              <div className="lg:col-span-7">
                <p className="overline">Use Cases</p>
                <h2 className="mt-6 max-w-3xl text-display">
                  The first AI builds worth funding have a trigger, an owner, and a review loop.
                </h2>
              </div>
              <div className="mt-8 lg:col-span-5 lg:mt-0">
                <p className="text-body-lg text-warm-gray">
                  ClearForge starts where teams already feel pain: sales, service, operations,
                  knowledge work, quality, and portfolio value creation. Each build is tied to a
                  cadence leaders can inspect.
                </p>
              </div>
            </div>
          </SectionReveal>

          <StaggerReveal className="mt-16 grid gap-6 lg:grid-cols-3">
            {useCases.slice(0, 6).map((useCase) => (
              <Link
                key={useCase.slug}
                href={`/use-cases/${useCase.slug}`}
                className="group overflow-hidden border border-divider bg-warm-white transition-colors hover:bg-white"
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <UseCaseCardVisual useCase={useCase} />
                </div>
                <div className="p-6">
                  <p className="overline text-[10px]">{useCase.eyebrow}</p>
                  <h3 className="mt-2 text-h3 transition-colors group-hover:text-brass">
                    {useCase.shortTitle}
                  </h3>
                  <p className="mt-3 text-body-sm leading-relaxed text-warm-gray">
                    {useCase.summary}
                  </p>
                  <span className="mt-5 inline-flex items-center text-sm font-semibold text-brass">
                    See the use case <ArrowRight className="ml-2 h-4 w-4" />
                  </span>
                </div>
              </Link>
            ))}
          </StaggerReveal>

          <div className="mt-12">
            <Button variant="secondary" asChild>
              <Link href="/use-cases">View All AI Use Cases</Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="results" className="scroll-mt-20 bg-recessed py-20 sm:py-32 lg:py-40">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <div className="lg:grid lg:grid-cols-12 lg:gap-16">
            <SectionReveal animation="slide-left" className="lg:col-span-5">
              <p className="overline">Proof</p>
              <h2 className="mt-6 text-display">Selected outcomes from production work.</h2>
              <p className="mt-6 text-body-lg text-warm-gray">
                We keep the work anchored to business movement: qualified opportunities, margin,
                processing accuracy, cycle time, EBITDA, and adoption.
              </p>
            </SectionReveal>

            <div className="mt-12 lg:col-span-7 lg:mt-0">
              {(caseStudies || []).slice(0, 3).map((cs) => (
                <Link
                  key={cs.slug}
                  href={`/case-studies/${cs.slug}`}
                  className="group block border-t border-divider"
                >
                  <div className="py-8 sm:py-10">
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-baseline sm:justify-between">
                      <div className="min-w-0 flex-1">
                        <span className="overline text-[10px]">{cs.industry}</span>
                        <h3 className="mt-2 text-h2 transition-colors duration-300 group-hover:text-brass">
                          {cs.title}
                        </h3>
                      </div>
                      <div className="flex shrink-0 items-baseline gap-8">
                        <div>
                          <span className="metric text-2xl text-brass sm:text-3xl">
                            {cs.heroMetric}
                          </span>
                          <p className="mt-1 text-xs text-warm-gray">{cs.heroMetricLabel}</p>
                        </div>
                        <ArrowRight className="h-5 w-5 text-warm-gray transition-all duration-300 group-hover:translate-x-2 group-hover:text-brass" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
              <div className="border-t border-divider" />
            </div>
          </div>
        </div>
      </section>

      <section className="dark-section relative overflow-hidden py-20 sm:py-32 lg:py-40">
        <div className="absolute inset-0 pointer-events-none">
          <Image
            src="/images/abstract-dataflow.webp"
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-[0.14]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-forge-black/70 via-forge-black/40 to-forge-black" />
        </div>
        <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <div className="grid gap-y-12 gap-x-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-16">
            {[
              { value: '4', label: 'Weeks to a fixed-fee diagnostic and prioritized build case' },
              {
                value: '10',
                label: 'Weeks to a first production workflow when the data path is ready',
              },
              {
                value: '3+',
                label: 'Measurable opportunities required or the diagnostic is refunded',
              },
              { value: '1', label: 'Named operating owner before every Sprint starts' },
            ].map((stat) => (
              <div key={stat.label}>
                <MetricCounter value={stat.value} className="metric-xl text-brass-light" />
                <p className="mt-4 text-body-sm leading-relaxed text-stone">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-parchment py-20 sm:py-32 lg:py-40">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <SectionReveal animation="scale-up">
            <p className="overline">Start Here</p>
            <h2 className="mt-6 max-w-3xl text-display">
              Find the work worth fixing before you build anything.
            </h2>
            <p className="mt-6 max-w-2xl text-body-lg text-warm-gray">
              Enter your website and Forge Intelligence drafts a first-pass value chain, then shows
              which workflows could improve speed, quality, service, cost, or margin.
            </p>
          </SectionReveal>

          <div className="mt-14 grid border-t border-divider lg:grid-cols-3">
            {valueMapSteps.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.label}
                  className="border-b border-divider py-8 lg:border-r lg:px-8 lg:first:pl-0 lg:last:border-r-0"
                >
                  <Icon className="h-6 w-6 text-brass" />
                  <h3 className="mt-5 text-h4">{step.label}</h3>
                  <p className="mt-3 text-body text-warm-gray">{step.detail}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Button size="lg" asChild>
              <Link href="/discover">
                Generate My AI Value Map <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <p className="text-body-sm text-warm-gray">
              Free, website-based, and useful even before a sales conversation.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-recessed py-20 sm:py-32 lg:py-40">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <SectionReveal animation="slide-right">
            <p className="overline">Where We Begin</p>
            <h2 className="mt-6 max-w-2xl text-display">
              Four places AI value usually shows up first.
            </h2>
          </SectionReveal>

          <div className="mt-16 grid lg:grid-cols-2 lg:gap-x-20">
            {prioritySituations.map((item) => (
              <Link
                key={item.situation}
                href={item.link}
                className="group block border-t border-divider py-8 sm:py-10"
              >
                <div className="flex items-start gap-4">
                  <div className="mt-1 h-12 w-0.5 shrink-0 bg-divider transition-colors duration-300 group-hover:bg-brass" />
                  <div>
                    <p className="text-h4 transition-colors duration-300 group-hover:text-brass">
                      {item.situation}
                    </p>
                    <p className="mt-2 text-body text-warm-gray">{item.problem}</p>
                    <p className="mt-3 metric text-sm text-brass">{item.metric}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-parchment py-20 sm:py-32 lg:py-40">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <SectionReveal animation="fade-up">
            <div className="lg:grid lg:grid-cols-12 lg:items-end lg:gap-12">
              <div className="lg:col-span-7">
                <p className="overline">Industry Coverage</p>
                <h2 className="mt-6 max-w-3xl text-display">
                  Production AI for every operating value chain.
                </h2>
              </div>
              <div className="mt-6 lg:col-span-5 lg:mt-0 lg:text-right">
                <p className="text-body-lg text-warm-gray">
                  {industryCount} industries. {activityCount}+ activities mapped to agents,
                  predictive models, copilots, and workflow automations.
                </p>
              </div>
            </div>
          </SectionReveal>

          <StaggerReveal className="mt-16 grid gap-x-12 gap-y-0 sm:grid-cols-2 lg:grid-cols-3">
            {industries.slice(0, 12).map((ind) => {
              const total = ind.valueChain.reduce((a, fn) => a + fn.activities.length, 0);
              return (
                <Link
                  key={ind.slug}
                  href={`/industries/${ind.slug}`}
                  className="group -mx-4 block border-t border-divider px-4 py-6 transition-colors hover:bg-warm-white"
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="text-h4 transition-colors group-hover:text-brass">
                      {ind.shortName}
                    </h3>
                    <span className="metric shrink-0 text-xs text-warm-gray">{total}</span>
                  </div>
                  <p className="mt-1 line-clamp-2 text-body-sm text-warm-gray">{ind.oneLiner}</p>
                </Link>
              );
            })}
          </StaggerReveal>
          <div className="border-t border-divider" />

          <div className="mt-12 flex flex-wrap items-center justify-between gap-4">
            <p className="text-body-sm text-warm-gray">
              Do not see your industry? Forge Intelligence generates a custom value chain from your
              website.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button variant="secondary" asChild>
                <Link href="/industries">View All Industries</Link>
              </Button>
              <Button asChild>
                <Link href="/discover">
                  Generate Custom Value Chain <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-parchment py-20 sm:py-32 lg:py-40">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <SectionReveal animation="scale-up">
            <p className="overline">Our Approach</p>
            <h2 className="mt-6 max-w-3xl text-display">The Forge Method™</h2>
            <p className="mt-6 max-w-2xl text-body-lg text-warm-gray">
              Clear timelines. Transparent investment. Guaranteed deliverables. Three phases from
              opportunity to production and ongoing improvement.
            </p>
          </SectionReveal>

          <ForgeMethodDiagram />

          <div className="mt-20 border-t border-brass/20 pt-10">
            <div className="flex max-w-2xl items-start gap-4">
              <Shield className="mt-1 h-5 w-5 shrink-0 text-brass" />
              <div>
                <p className="text-h4">The ClearForge Guarantee</p>
                <p className="mt-2 text-body text-warm-gray">
                  If our Forge Diagnostic does not identify at least 3 measurable AI opportunities
                  with a baseline, owner, evidence needs, and next build decision, we refund your
                  investment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="dark-section py-20 sm:py-32 lg:py-40">
        <div className="mx-auto max-w-[1000px] px-4 sm:px-6 lg:px-10">
          <GsapTextReveal
            text="They did not just hand us a strategy deck. They built the systems, trained the team, and stayed until the numbers moved."
            tag="h2"
            className="text-display leading-snug text-bone"
            scrub
          />
          <div className="mt-10 flex items-center gap-4">
            <div className="h-px w-12 bg-brass-light" />
            <p className="text-body text-stone">
              <span className="font-semibold text-bone">VP of Operations</span> — Industrial
              Manufacturer, $180M Revenue
            </p>
          </div>
        </div>
      </section>

      <section className="bg-parchment py-20 sm:py-32 lg:py-40">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <div className="items-start lg:grid lg:grid-cols-12 lg:gap-20">
            <SectionReveal animation="clip-reveal" className="lg:col-span-5">
              <p className="overline">Who Does the Work</p>
              <h2 className="mt-6 text-display">Built by operators. Not outsourced.</h2>
            </SectionReveal>
            <div className="mt-10 lg:col-span-7 lg:mt-0">
              <p className="text-body-lg text-warm-gray">
                ClearForge was founded by James Penz after 15 years at Bain, EY, and Capgemini to
                solve the problem he saw everywhere: smart strategy that never became a working
                operating system.
              </p>
              <p className="mt-4 text-body text-warm-gray">
                The people on your discovery call are the people who do the work. No pyramid model,
                offshore handoff, or translation layer between recommendation and implementation.
              </p>

              <div className="mt-10 flex flex-wrap gap-12">
                {[
                  { label: 'Bain', sub: 'AI Automation' },
                  { label: 'EY', sub: 'Digital' },
                  { label: 'Capgemini', sub: 'Consulting' },
                ].map((item) => (
                  <div key={item.label}>
                    <span className="metric text-xl text-brass">{item.label}</span>
                    <p className="mt-1 text-xs text-warm-gray">{item.sub}</p>
                  </div>
                ))}
              </div>

              <div className="mt-10 border-t border-divider pt-8">
                <p className="font-display text-body italic text-anthracite">
                  &ldquo;The gap between what gets recommended and what gets built is where most AI
                  programs die. ClearForge exists to close that gap.&rdquo;
                </p>
                <p className="mt-3 text-xs text-warm-gray">James Penz, Founder</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="dark-section py-20 sm:py-28">
        <div className="mx-auto max-w-[1000px] px-4 text-center sm:px-6 lg:px-10">
          <Sparkles className="mx-auto h-7 w-7 text-brass-light" />
          <p className="overline mt-6">Forge Intelligence</p>
          <h2 className="mt-6 text-display text-bone">See your first value map in minutes.</h2>
          <p className="mx-auto mt-6 max-w-xl text-body-lg text-stone">
            Enter your website. Get a company-specific AI value chain, priority prompts, and a
            clearer starting point before any call.
          </p>
          <Button size="lg" className="mt-10" asChild>
            <Link href="/discover">
              Generate My AI Value Map <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      <section className="bg-parchment py-20 sm:py-32 lg:py-40">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <div className="lg:grid lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-4">
              <p className="overline">Honest Answers</p>
              <h2 className="mt-6 text-display">What leadership usually asks.</h2>
            </div>
            <div className="mt-10 lg:col-span-8 lg:mt-0">
              {objections.map((o, i) => (
                <div
                  key={o.q}
                  className={`py-8 sm:py-10 ${i < objections.length - 1 ? 'border-b border-divider' : ''}`}
                >
                  <p className="text-h2">&ldquo;{o.q}&rdquo;</p>
                  <p className="mt-4 text-body text-warm-gray">{o.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="dark-section py-20 sm:py-32 lg:py-40">
        <div className="mx-auto max-w-[840px] px-4 sm:px-6 lg:px-10">
          <h2 className="text-display text-bone">Start with the map. Build what matters.</h2>
          <p className="mt-6 text-body-lg text-stone">
            Use Forge Intelligence for the first read, then bring ClearForge in when you are ready
            to scope the first production system.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
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
