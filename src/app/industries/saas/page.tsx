import { ArrowRight, Target, UserMinus, Rocket, Headphones } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FadeIn, Stagger, StaggerItem } from '@/components/ui/animate';
import { createMetadata } from '@/lib/metadata';

export const metadata = createMetadata({
  title: 'AI for SaaS & Technology Companies | ClearForge',
  description:
    'ClearForge helps SaaS companies deploy AI for sales pipeline optimization, churn prediction, product-led growth, and support automation. Production AI built for high-growth tech companies.',
  path: '/industries/saas',
  keywords: [
    'SaaS AI consulting',
    'sales pipeline AI',
    'churn prediction',
    'product-led growth AI',
    'support automation AI',
  ],
});

const challenges = [
  {
    icon: Target,
    title: 'Sales Pipeline Visibility',
    description:
      'Most SaaS sales teams operate on gut feel and lagging indicators. Pipeline forecasting is unreliable, lead scoring is static, and reps spend time on accounts that will never convert while high-intent prospects go untouched.',
    metric: '67%',
    metricLabel: 'Of SaaS pipeline never converts to revenue',
  },
  {
    icon: UserMinus,
    title: 'Churn Prediction Gaps',
    description:
      'By the time a customer signals intent to churn, it is too late. Product usage decay, support ticket sentiment, and engagement drop-offs are visible in the data months before cancellation — but most SaaS companies lack the models to detect these patterns.',
    metric: '5-7%',
    metricLabel: 'Average monthly churn rate for B2B SaaS',
  },
  {
    icon: Rocket,
    title: 'Product-Led Growth Friction',
    description:
      'PLG motions generate enormous volumes of sign-ups but struggle with activation and conversion. The gap between a free trial and a paying customer is a data problem — understanding which product actions predict conversion and engineering the path toward them.',
    metric: '2-5%',
    metricLabel: 'Typical free-to-paid conversion rate',
  },
  {
    icon: Headphones,
    title: 'Support at Scale',
    description:
      'Ticket volumes grow linearly with customers, but support budgets do not. Tier-1 support handles repetitive questions that could be resolved by intelligent automation, while complex issues wait in queue behind routine requests.',
    metric: '40%',
    metricLabel: 'Of support tickets are repetitive and automatable',
  },
];

const forgeSteps = [
  {
    phase: 'Forge Diagnostic',
    timeline: '4 weeks',
    title: 'Audit your go-to-market and product AI opportunity',
    outcomes: [
      'Full-funnel analysis from lead capture through expansion and renewal',
      'Data readiness audit across CRM, product analytics, billing, and support systems',
      'AI opportunity scoring for every stage of the customer lifecycle',
      'Quantified business case with conversion lift, churn reduction, and efficiency projections',
      'Quick-win identification — the 2-3 AI initiatives that pay for the program immediately',
    ],
  },
  {
    phase: 'Forge Sprint',
    timeline: '10-14 weeks',
    title: 'Deploy production AI across your growth engine',
    outcomes: [
      'Predictive lead scoring trained on your historical win/loss data and product signals',
      'Churn risk models that surface at-risk accounts weeks before cancellation indicators',
      'Product-led growth optimization with automated activation and conversion nudges',
      'Intelligent support routing and AI-assisted resolution for Tier-1 ticket volumes',
      'Full integration with your CRM, product analytics, and support stack',
    ],
  },
  {
    phase: 'Forge Scale',
    timeline: 'Ongoing',
    title: 'Continuous optimization of your growth machine',
    outcomes: [
      'Monthly model retraining as your customer base and product evolve',
      'New AI agents deployed for emerging GTM and product needs',
      'A/B testing framework for AI-driven interventions across the funnel',
      'Quarterly business impact reviews with revenue attribution',
      'Senior AI strategy for product roadmap and technology decisions',
    ],
  },
];

const results = [
  { metric: '3.5x', label: 'Conversion lift from AI-scored leads' },
  { metric: '30%', label: 'Pipeline increase in 90 days' },
  { metric: '45%', label: 'Reduction in Tier-1 support volume' },
  { metric: '8 wk', label: 'From diagnostic to first production model' },
];

export default function SaaSPage() {
  return (
    <>
      {/* — Hero — atmospheric bg + two-column with headline stat — */}
      <section className="dark-section noise-texture relative overflow-hidden py-32 lg:py-48">
        <div className="absolute inset-0 pointer-events-none">
          <Image
            src="/images/abstract-forge-progression.webp"
            alt=""
            fill
            sizes="100vw"
            quality={65}
            className="object-cover opacity-[0.22]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-forge-black via-forge-black/40 to-forge-black/60" />
        </div>
        <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="lg:grid lg:grid-cols-12 lg:gap-16 lg:items-end">
            <div className="lg:col-span-7">
              <FadeIn>
                <p className="overline">SaaS &amp; Technology</p>
                <h1
                  className="mt-6 text-display max-w-3xl text-bone"
                  style={{ fontFamily: 'var(--font-instrument-serif)' }}
                >
                  AI for SaaS &amp; Technology Companies
                </h1>
              </FadeIn>
              <FadeIn delay={0.15}>
                <p className="mt-6 max-w-xl text-body-lg text-stone">
                  SaaS companies are uniquely positioned to benefit from AI —
                  they already have the data infrastructure, the product
                  telemetry, and the digital-first customer relationships. What
                  most lack is the intelligence layer that turns this data into
                  decisions across sales, product, and customer success.
                </p>
                <p className="mt-4 max-w-xl text-body text-stone">
                  ClearForge deploys AI that accelerates pipeline, reduces
                  churn, optimizes product-led growth, and scales support —
                  without adding headcount proportional to growth.
                </p>
                <div className="mt-10">
                  <Button size="lg" asChild>
                    <Link href="/discover">
                      Get My Free AI Readiness Score <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </FadeIn>
            </div>

            <div className="mt-16 lg:col-span-5 lg:mt-0">
              <FadeIn delay={0.25}>
                <div className="border-l border-brass/40 pl-8 lg:pl-10">
                  <p className="overline text-brass-light text-[10px]">
                    Client Outcome
                  </p>
                  <p
                    className="mt-4 text-brass-light"
                    style={{
                      fontFamily: 'var(--font-instrument-serif)',
                      fontSize: 'clamp(4rem, 8vw, 7rem)',
                      lineHeight: 0.92,
                      letterSpacing: '-0.04em',
                      fontWeight: 400,
                    }}
                  >
                    {results[0].metric}
                  </p>
                  <p className="mt-4 text-h3 text-bone">{results[0].label}</p>
                  <p className="mt-3 text-body-sm text-stone max-w-xs">
                    Built for a $40M ARR SaaS platform scaling from Series B to
                    Series C.
                  </p>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* — Key Challenges — */}
      <section className="bg-parchment py-24 lg:py-40">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <p className="overline">Industry Challenges</p>
          <h2 className="mt-6 text-display max-w-3xl">
            The growth bottlenecks that manual processes cannot solve
          </h2>
          <p className="mt-6 max-w-2xl text-body-lg text-warm-gray">
            High-growth SaaS companies hit an inflection point where the
            processes that worked at $5M ARR break at $20M. Sales cannot
            prioritize at scale, support cannot keep up with ticket volume,
            and product teams are flying blind on what drives activation.
          </p>

          <Stagger className="mt-16 lg:grid lg:grid-cols-2 lg:gap-x-16" stagger={0.1}>
            {challenges.map((challenge) => {
              const Icon = challenge.icon;
              return (
              <StaggerItem
                key={challenge.title}
                className="border-t border-divider py-10 lg:py-12"
              >
                <div className="flex items-start gap-5">
                  <Icon className="h-5 w-5 text-brass shrink-0 mt-1" />
                  <div className="flex-1">
                    <h3 className="text-h3">{challenge.title}</h3>
                    <p className="mt-3 text-body text-warm-gray max-w-lg">
                      {challenge.description}
                    </p>
                    <div className="mt-5 flex items-baseline gap-3 flex-wrap">
                      <span
                        className="metric text-2xl text-anthracite"
                        style={{ fontFamily: 'var(--font-jetbrains-mono, monospace)' }}
                      >
                        {challenge.metric}
                      </span>
                      <span className="text-xs text-warm-gray leading-snug">
                        {challenge.metricLabel}
                      </span>
                    </div>
                  </div>
                </div>
              </StaggerItem>
              );
            })}
          </Stagger>
          <div className="border-t border-divider" />
        </div>
      </section>

      {/* — How ClearForge Helps — */}
      <section className="dark-section noise-texture relative overflow-hidden py-24 lg:py-40">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <p className="overline">The Forge Method for SaaS</p>
          <h2 className="mt-6 text-display text-bone max-w-3xl">
            AI that scales your growth engine, not your headcount
          </h2>
          <p className="mt-6 max-w-2xl text-body-lg text-stone">
            We build AI systems that plug into your existing stack — CRM,
            product analytics, billing, support — and create an intelligence
            layer that makes every team more effective without changing how
            they work.
          </p>

          <Stagger className="mt-16 space-y-12" stagger={0.15}>
            {forgeSteps.map((step, i) => (
              <StaggerItem
                key={step.phase}
                className="border-t border-divider-dark pt-10"
              >
                <div className="flex flex-col lg:flex-row lg:gap-16">
                  <div className="lg:w-1/3 shrink-0">
                    <span className="metric text-sm text-brass">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 className="mt-2 text-h2 text-bone">{step.phase}</h3>
                    <p className="mt-2 text-body-sm text-stone">
                      {step.timeline}
                    </p>
                    <p className="mt-4 text-body-lg text-bone">{step.title}</p>
                  </div>
                  <ul className="mt-6 lg:mt-0 space-y-4 lg:w-2/3">
                    {step.outcomes.map((outcome) => (
                      <li
                        key={outcome}
                        className="flex items-start gap-3 text-body text-stone"
                      >
                        <span className="mt-2 block h-1.5 w-1.5 shrink-0 rounded-full bg-brass" />
                        {outcome}
                      </li>
                    ))}
                  </ul>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* — Industry Results — */}
      <section className="bg-parchment py-24 lg:py-40">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <p className="overline">Results</p>
          <h2 className="mt-6 text-display max-w-3xl">
            What ClearForge delivered for a B2B software company
          </h2>
          <p className="mt-6 max-w-2xl text-body-lg text-warm-gray">
            A mid-market B2B SaaS company engaged ClearForge to overhaul
            their sales pipeline and lead scoring. Static MQL definitions
            were flooding reps with unqualified leads while high-intent
            product users were going untouched.
          </p>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {results.map((result) => (
              <div key={result.label} className="border-t border-divider pt-6">
                <p
                  className="metric-xl text-anthracite"
                  style={{
                    fontFamily: 'var(--font-jetbrains-mono, monospace)',
                  }}
                >
                  {result.metric}
                </p>
                <p className="mt-2 text-body-sm text-warm-gray">
                  {result.label}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <Button variant="secondary" asChild>
              <Link href="/case-studies">
                Read the Full Case Study{' '}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* — CTA — */}
      <section className="dark-section noise-texture relative overflow-hidden py-24 lg:py-40">
        <div className="mx-auto max-w-2xl px-6 text-center lg:px-10">
          <h2
            className="text-display text-bone"
            style={{ fontFamily: 'var(--font-instrument-serif)' }}
          >
            Ready to transform your growth engine?
          </h2>
          <p className="mt-6 text-body-lg text-stone">
            The Forge Diagnostic maps your highest-value GTM and product AI
            opportunities in four weeks. See exactly where AI can lift
            conversion, reduce churn, and scale support — with clear ROI
            projections for each initiative.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/discover">
                Get My Free AI Readiness Score <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline-light" asChild>
              <Link href="/contact">Schedule a Confidential Discussion</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
