import { ArrowRight, CheckCircle2, Gauge, Route, Shield, Sparkles, Workflow } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { ForgeMethodDiagram } from '@/components/home/forge-method-diagram';
import { HeroScroll } from '@/components/home/hero-scroll';
import { SectionReveal, StaggerReveal } from '@/components/home/homepage-animations';
import { MetricCounter } from '@/components/home/metric-counter';
import { Button } from '@/components/ui/button';
import { GsapTextReveal } from '@/components/ui/gsap-text-reveal';
import { caseStudies } from '@/data/case-studies';
import { industries } from '@/data/industries-value-chains';
import { createMetadata } from '@/lib/metadata';

export const metadata = createMetadata({
  title: 'ClearForge — Production AI Systems for Mid-Market Operators',
  description:
    'ClearForge maps where AI can move revenue, cost, or throughput, then builds the production systems and trains your team to run them.',
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
    signal: 'Pilots without ownership',
    symptom: 'AI experiments live in side channels while operators keep using the old workflow.',
    response:
      'We assign each system to an operating metric, a workflow owner, and a launch cadence.',
  },
  {
    signal: 'Manual work hiding in margin',
    symptom: 'High-skill teams spend hours reconciling, quoting, routing, reviewing, or reporting.',
    response:
      'We turn repeatable judgment into agents, copilots, automations, and measurable controls.',
  },
  {
    signal: 'Strategy trapped in translation',
    symptom:
      'A roadmap exists, but engineering, data, and adoption never converge into one build plan.',
    response:
      'The same senior team diagnoses, scopes, builds, deploys, and stays through adoption.',
  },
];

const valueMapSteps = [
  {
    icon: Route,
    label: 'Map the operating model',
    detail: 'Forge Intelligence reads your website and drafts a company-specific value chain.',
  },
  {
    icon: Gauge,
    label: 'Score AI leverage',
    detail: 'Activities are ranked by revenue, cost, throughput, feasibility, and urgency.',
  },
  {
    icon: Workflow,
    label: 'Choose the first build',
    detail: 'You leave with a prioritized path into diagnostic, sprint, or managed operations.',
  },
];

const prioritySituations = [
  {
    situation: 'AI pilots are stuck in demonstration mode',
    problem:
      'The model works in a demo, but nobody owns the workflow, data path, QA loop, or rollout.',
    metric: '89% of ClearForge projects reach production',
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
    metric: '$240K average annual savings identified',
    link: '/services/performance-improvement',
  },
];

const objections = [
  {
    q: "We're not big enough for enterprise AI.",
    a: 'You do not need an enterprise transformation office. You need one high-value workflow, a reliable data path, and an implementation team accountable for adoption.',
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

export default function Home() {
  return (
    <>
      <HeroScroll />

      <div className="border-b border-divider bg-warm-white">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-3 px-4 py-4 text-xs text-warm-gray sm:px-6 sm:py-5 lg:flex-row lg:px-10">
          <span className="font-semibold text-anthracite">
            Founded by ex-Bain, EY, and Capgemini
          </span>
          <span className="hidden text-divider lg:inline">/</span>
          <span>Production AI systems for operators, PE teams, and growth companies</span>
          <span className="hidden text-divider lg:inline">/</span>
          <span>Diagnose, build, deploy, and operate with one accountable team</span>
        </div>
      </div>

      <section className="bg-parchment py-20 sm:py-28 lg:py-36">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <SectionReveal animation="fade-up">
            <div className="max-w-4xl">
              <p className="overline">The Gap We Close</p>
              <h2 className="mt-6 text-display">
                AI does not become valuable when it impresses people. It becomes valuable when it
                changes the operating rhythm.
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
              { value: '$47M+', label: 'Client revenue influenced across 15 engagements' },
              { value: '3.2x', label: 'Average ROI with median payback under 90 days' },
              { value: '89%', label: 'Projects reaching production across recent work' },
              { value: '10', label: 'Weeks from kickoff to deployment, on average' },
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
              Generate an AI Value Map before you buy anything.
            </h2>
            <p className="mt-6 max-w-2xl text-body-lg text-warm-gray">
              Enter your website and Forge Intelligence drafts the first version of your operating
              value chain, then helps you mark which activities are urgent, curious, or irrelevant.
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
                  If our Forge Diagnostic does not identify at least 3 actionable AI opportunities
                  with clear ROI projections, we refund your investment.
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
                The people on your discovery call are the people who do the work. No leverage model,
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
