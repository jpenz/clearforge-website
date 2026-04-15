import { ArrowRight, ShieldCheck, FileSearch, Brain, TrendingUp } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FadeIn, Stagger, StaggerItem } from '@/components/ui/animate';
import { createMetadata } from '@/lib/metadata';

export const metadata = createMetadata({
  title: 'AI for Financial Services | ClearForge',
  description:
    'ClearForge helps financial services firms deploy AI for risk assessment, compliance automation, fraud detection, and customer analytics. Production AI built for regulated environments.',
  path: '/industries/financial-services',
  keywords: [
    'financial services AI',
    'risk assessment AI',
    'compliance automation',
    'fraud detection AI',
    'fintech AI consulting',
  ],
});

const challenges = [
  {
    icon: ShieldCheck,
    title: 'Risk Assessment at Speed',
    description:
      'Manual risk evaluation creates bottlenecks that slow deal flow and frustrate clients. Analysts spend 60-70% of their time on data gathering and standardized analysis rather than exercising judgment on edge cases that actually require expertise.',
    metric: '40%',
    metricLabel: 'Of risk analyst time spent on automatable tasks',
  },
  {
    icon: FileSearch,
    title: 'Compliance Burden',
    description:
      'Regulatory requirements are multiplying faster than compliance teams can scale. KYC, AML, and transaction monitoring generate enormous manual review volumes while regulators expect faster, more comprehensive coverage.',
    metric: '$270B',
    metricLabel: 'Annual global compliance spending in financial services',
  },
  {
    icon: Brain,
    title: 'Fraud Detection Gaps',
    description:
      'Rules-based fraud systems generate excessive false positives while sophisticated fraud patterns evolve faster than manual rule updates. The cost of false negatives grows as transaction volumes increase and attack vectors multiply.',
    metric: '95%',
    metricLabel: 'Of fraud alerts are false positives at most institutions',
  },
  {
    icon: TrendingUp,
    title: 'Customer Analytics Blindness',
    description:
      'Financial institutions sit on decades of transactional data but lack the intelligence layer to predict churn, identify cross-sell opportunities, or personalize at scale. Customer lifetime value remains a theoretical metric rather than an operational lever.',
    metric: '5-25%',
    metricLabel: 'Revenue uplift from AI-driven personalization',
  },
];

const forgeSteps = [
  {
    phase: 'Forge Diagnostic',
    timeline: '4 weeks',
    title: 'Audit your regulatory and operational AI readiness',
    outcomes: [
      'Process mapping of risk, compliance, and customer workflows with AI opportunity scoring',
      'Data readiness assessment across core banking, CRM, and data warehouse systems',
      'Regulatory risk analysis for each AI use case with explainability requirements',
      'Quantified business case including FTE savings, error reduction, and revenue impact',
      'Prioritized roadmap balancing quick wins with strategic capabilities',
    ],
  },
  {
    phase: 'Forge Sprint',
    timeline: '10-14 weeks',
    title: 'Deploy compliant, production-grade AI systems',
    outcomes: [
      'Automated risk scoring models with full audit trails and explainability layers',
      'Intelligent document processing for KYC, loan origination, and claims review',
      'Anomaly detection systems that reduce false positives while catching more true fraud',
      'Customer segmentation and propensity models integrated with your CRM and marketing stack',
      'Model governance framework aligned with regulatory expectations',
    ],
  },
  {
    phase: 'Forge Scale',
    timeline: 'Ongoing',
    title: 'Continuous model governance and performance optimization',
    outcomes: [
      'Monthly model monitoring with drift detection and automated retraining',
      'Regulatory reporting on model performance, fairness, and explainability',
      'New AI capabilities deployed as business needs and regulations evolve',
      'Quarterly business impact reviews with ROI attribution',
      'Senior AI strategy for technology planning and vendor evaluation',
    ],
  },
];

const results = [
  { metric: '40%', label: 'Faster risk assessment cycle time' },
  { metric: '60%', label: 'Reduction in manual review volume' },
  { metric: '95%', label: 'Document processing accuracy' },
  { metric: '3x', label: 'Improvement in fraud detection precision' },
];

export default function FinancialServicesPage() {
  return (
    <>
      {/* — Hero — */}
      <section className="dark-section noise-texture relative overflow-hidden py-32 lg:py-48">
        <div className="absolute inset-0 pointer-events-none">
          <Image
            src="/images/abstract-dataflow.jpg"
            alt=""
            fill
            sizes="100vw"
            quality={65}
            className="object-cover opacity-[0.18]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-forge-black via-forge-black/40 to-forge-black/60" />
        </div>
        <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
          <FadeIn>
            <p className="overline">Financial Services</p>
            <h1
              className="mt-6 text-display max-w-4xl text-bone"
              style={{ fontFamily: 'var(--font-instrument-serif)' }}
            >
              AI for Financial Services
            </h1>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p className="mt-6 max-w-2xl text-body-lg text-stone">
              Financial institutions face a paradox: the industry generates more
              structured data than almost any other sector, yet most AI
              initiatives stall in pilot because they cannot meet the
              explainability, auditability, and governance requirements that
              regulators demand.
            </p>
            <p className="mt-4 max-w-2xl text-body text-stone">
              ClearForge builds production AI for regulated environments --
              systems that accelerate risk assessment, automate compliance
              workflows, and surface customer insights while maintaining the
              audit trails and governance frameworks your regulators expect.
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
      </section>

      {/* — Key Challenges — */}
      <section className="bg-parchment py-24 lg:py-40">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <p className="overline">Industry Challenges</p>
          <h2 className="mt-6 text-display max-w-3xl">
            Where margin, compliance, and customer trust converge
          </h2>
          <p className="mt-6 max-w-2xl text-body-lg text-warm-gray">
            The pressure on financial services firms is compounding: tighter
            regulations, faster customer expectations, and competitive threats
            from digital-native entrants who were built on AI from day one.
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
          <p className="overline">The Forge Method for Financial Services</p>
          <h2 className="mt-6 text-display text-bone max-w-3xl">
            Production AI built for regulated environments
          </h2>
          <p className="mt-6 max-w-2xl text-body-lg text-stone">
            Every AI system we build for financial services includes
            explainability, audit trails, and model governance by default --
            not as an afterthought. We design for your regulators from day one.
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
            Measured outcomes in regulated environments
          </h2>
          <p className="mt-6 max-w-2xl text-body-lg text-warm-gray">
            ClearForge has delivered AI systems for financial services firms
            that reduce manual processing, accelerate risk decisions, and
            improve compliance coverage — all within existing regulatory
            frameworks.
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
                View All Case Studies{' '}
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
            Ready to transform financial services operations?
          </h2>
          <p className="mt-6 text-body-lg text-stone">
            The Forge Diagnostic maps your highest-value AI opportunities in
            four weeks — with regulatory considerations built into every
            recommendation.
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
