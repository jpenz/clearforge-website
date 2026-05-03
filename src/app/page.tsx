import { ArrowRight, CheckCircle2, Shield, Sparkles } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { ForgeMethodDiagram } from '@/components/home/forge-method-diagram';
import { HeroScroll } from '@/components/home/hero-scroll';
import { SectionReveal, StaggerReveal } from '@/components/home/homepage-animations';
import { MetricCounter } from '@/components/home/metric-counter';
import { OperatingChangeMap } from '@/components/home/operating-change-map';
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

const breakdownSignals = [
  {
    title: 'AI activity, little operating change',
    signal: 'Teams test tools, but the workflow still runs through manual coordination.',
    move: 'Pick one workflow with a named owner, baseline, data path, and first production scope.',
  },
  {
    title: 'Good people, too much hand stitching',
    signal:
      'Leads, requests, exceptions, and approvals move through inboxes, meetings, and memory.',
    move: 'Build the agent, dashboard, handoff, and review path around how the work actually moves.',
  },
  {
    title: 'Pressure to fund AI without proof',
    signal:
      'Executives need confidence that the next build can improve growth, speed, quality, service, or margin.',
    move: 'Run a diagnostic that shows value, feasibility, controls, adoption needs, and the first build decision.',
  },
];

const operatingReadiness = [
  {
    dimension: 'Ambition and value case',
    standard: 'KPI owner, baseline, value threshold',
    clearforge: 'Set the AI ambition and choose the first workflow worth funding.',
  },
  {
    dimension: 'Operating model design',
    standard: 'Future workflow, decisions, handoffs, controls',
    clearforge: 'Map how work moves before engineering starts.',
  },
  {
    dimension: 'Custom technology build',
    standard: 'Agents, data paths, dashboards, integrations',
    clearforge: 'Fit the build into the systems the team already uses.',
  },
  {
    dimension: 'People and adoption',
    standard: 'Training, roles, decision rights, review rhythm',
    clearforge: 'Train leaders and users into the new way of working.',
  },
  {
    dimension: 'Governance and improvement',
    standard: 'Monitoring, escalation, audit trail, backlog',
    clearforge: 'Keep the system observable, safe, and improving after launch.',
  },
];

const readinessChecks = [
  {
    title: 'Owner named',
    detail: 'One accountable operator can approve scope and review results.',
  },
  {
    title: 'Baseline measured',
    detail: 'Current volume, cost, cycle time, quality, or revenue signal is visible.',
  },
  {
    title: 'Data path known',
    detail: 'The sources, systems, documents, and gaps are understood before build.',
  },
  {
    title: 'Controls explicit',
    detail: 'Confidence thresholds, escalation rules, and review rights are defined.',
  },
  {
    title: 'Users trained',
    detail: 'The team knows what AI handles and where human judgment stays.',
  },
  {
    title: 'Review cadence set',
    detail: 'Adoption, exceptions, quality, and movement are reviewed after launch.',
  },
];

const trustRules = [
  {
    avoid: 'No platform-first answer',
    instead: 'Workflow-first architecture',
  },
  {
    avoid: 'No value claim without a baseline',
    instead: 'Evidence plan before forecast',
  },
  {
    avoid: 'No build without adoption',
    instead: 'Training and controls built into launch',
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

      <section className="bg-parchment py-20 sm:py-28 lg:py-36">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-start lg:gap-16">
            <SectionReveal animation="slide-left">
              <p className="overline">Operating Change</p>
              <h2 className="mt-6 text-display">
                AI is easy to demo. The advantage comes from making it operable.
              </h2>
              <p className="mt-6 max-w-2xl text-body-lg text-warm-gray">
                ClearForge starts with the business constraint, then builds the custom AI, workflow,
                controls, dashboard, and team rhythm that make better performance repeatable.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Button asChild>
                  <Link href="/operating-model">
                    See the operating model <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="secondary" asChild>
                  <Link href="/case-studies">View proof</Link>
                </Button>
              </div>
            </SectionReveal>

            <SectionReveal animation="fade-up">
              <OperatingChangeMap />
            </SectionReveal>
          </div>

          <div className="mt-16 grid border-t border-divider lg:grid-cols-3">
            {breakdownSignals.map((item) => (
              <div
                key={item.title}
                className="border-b border-divider py-8 lg:border-r lg:px-8 lg:first:pl-0 lg:last:border-r-0"
              >
                <p className="text-h4">{item.title}</p>
                <p className="mt-3 text-body-sm leading-relaxed text-warm-gray">{item.signal}</p>
                <p className="mt-5 flex items-start gap-3 text-body-sm font-medium text-anthracite">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brass" />
                  <span>{item.move}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <OperatorSystemPreview useCase={salesPipelineUseCase} />

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

      <section className="border-t border-divider bg-warm-white py-20 sm:py-28 lg:py-36">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <div className="lg:grid lg:grid-cols-12 lg:items-end lg:gap-12">
            <div className="lg:col-span-7">
              <p className="overline">How ClearForge Makes It Operable</p>
              <h2 className="mt-6 max-w-3xl text-display">
                Board-room discipline. Builder-speed execution.
              </h2>
            </div>
            <div className="mt-8 lg:col-span-5 lg:mt-0">
              <p className="text-body-lg text-warm-gray">
                The work moves from ambition to production only when value, workflow, technology,
                adoption, and governance are designed together.
              </p>
            </div>
          </div>

          <div className="mt-14 overflow-hidden border border-divider">
            <div className="hidden grid-cols-[1fr_1fr_1fr] border-b border-divider bg-parchment px-6 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-warm-gray lg:grid">
              <span>Dimension</span>
              <span>Operator Standard</span>
              <span>ClearForge Role</span>
            </div>
            {operatingReadiness.map((item, index) => (
              <div
                key={item.dimension}
                className="grid gap-4 border-b border-divider bg-warm-white p-6 last:border-b-0 lg:grid-cols-[4rem_1fr_1fr_1fr] lg:items-start"
              >
                <span className="metric text-sm text-brass">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="text-h4">{item.dimension}</h3>
                <p className="text-body-sm leading-relaxed text-warm-gray">{item.standard}</p>
                <p className="text-body-sm leading-relaxed text-anthracite">{item.clearforge}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div className="grid gap-3 sm:grid-cols-2">
              {readinessChecks.map((item) => (
                <div key={item.title} className="border border-divider bg-parchment p-5">
                  <Shield className="h-5 w-5 text-brass" />
                  <h3 className="mt-4 text-h4">{item.title}</h3>
                  <p className="mt-2 text-body-sm leading-relaxed text-warm-gray">{item.detail}</p>
                </div>
              ))}
            </div>

            <div className="border border-divider bg-recessed p-6 sm:p-8">
              <p className="overline text-[10px]">Trust Rules</p>
              <h3 className="mt-4 text-h3">A few things we will not do.</h3>
              <div className="mt-6 divide-y divide-divider border-t border-divider">
                {trustRules.map((rule) => (
                  <div key={rule.avoid} className="grid gap-3 py-5 sm:grid-cols-[1fr_1fr] sm:gap-6">
                    <p className="text-body-sm font-semibold text-anthracite">{rule.avoid}</p>
                    <p className="text-body-sm text-warm-gray">{rule.instead}</p>
                  </div>
                ))}
              </div>
              <Button variant="secondary" className="mt-6" asChild>
                <Link href="/operating-model" data-analytics="home_standards_operating_model">
                  See the AI Operating Model <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

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
            {industries.slice(0, 9).map((ind) => {
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
              <p className="mt-6 text-body text-warm-gray">
                Short answers first. The deeper work happens in the diagnostic.
              </p>
            </div>
            <div className="mt-10 grid gap-4 lg:col-span-8 lg:mt-0 lg:grid-cols-2">
              {objections.map((o, index) => (
                <details
                  key={o.q}
                  className="group border border-divider bg-warm-white p-6"
                  open={index === 0}
                >
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-4">
                    <span className="text-h4">&ldquo;{o.q}&rdquo;</span>
                    <span className="mt-1 text-brass transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-4 text-body-sm leading-relaxed text-warm-gray">{o.a}</p>
                </details>
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
