import { ArrowRight, Stethoscope, Clock, DollarSign, FileCheck } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FadeIn, Stagger, StaggerItem } from '@/components/ui/animate';
import { createMetadata } from '@/lib/metadata';

export const metadata = createMetadata({
  title: 'AI for Healthcare & Life Sciences | ClearForge',
  description:
    'ClearForge helps healthcare organizations deploy AI for clinical operations, patient flow optimization, revenue cycle management, and regulatory compliance.',
  path: '/industries/healthcare',
  keywords: [
    'healthcare AI',
    'clinical operations AI',
    'revenue cycle AI',
    'patient flow optimization',
    'healthcare compliance automation',
  ],
});

const challenges = [
  {
    icon: Stethoscope,
    title: 'Clinical Operations Overload',
    description:
      'Clinicians spend nearly half their working hours on administrative tasks — documentation, prior authorizations, care coordination. This administrative burden drives burnout, reduces patient face time, and inflates staffing costs across every department.',
    metric: '49%',
    metricLabel: 'Of physician time spent on administrative work',
  },
  {
    icon: Clock,
    title: 'Patient Flow Bottlenecks',
    description:
      'Emergency department boarding, surgical scheduling conflicts, and discharge delays cascade through the system. Bed management remains largely manual, creating throughput constraints that directly impact patient outcomes and revenue.',
    metric: '$1.5M',
    metricLabel: 'Average annual cost of ED boarding per hospital',
  },
  {
    icon: DollarSign,
    title: 'Revenue Cycle Leakage',
    description:
      'Claim denials, coding errors, and prior authorization delays create systemic revenue leakage. Most health systems recover only 60-65% of initially denied claims, and the cost of rework often exceeds the margin on the claim itself.',
    metric: '$262B',
    metricLabel: 'In initial claim denials annually across US hospitals',
  },
  {
    icon: FileCheck,
    title: 'Regulatory Compliance Complexity',
    description:
      'HIPAA, CMS quality measures, state licensing, and payor-specific requirements generate an enormous compliance surface. Manual tracking and reporting consume FTEs that could be redirected toward clinical operations and patient care.',
    metric: '59%',
    metricLabel: 'Of health system leaders cite compliance as top cost driver',
  },
];

const forgeSteps = [
  {
    phase: 'Forge Diagnostic',
    timeline: '4 weeks',
    title: 'Map your clinical and operational AI opportunity',
    outcomes: [
      'Workflow analysis across clinical, administrative, and revenue cycle operations',
      'Data readiness audit spanning EHR, billing, scheduling, and ancillary systems',
      'HIPAA and regulatory risk assessment for each identified AI use case',
      'Quantified business case with FTE savings, denial rate reduction, and throughput impact',
      'Prioritized roadmap balancing quick wins with long-term strategic capability',
    ],
  },
  {
    phase: 'Forge Sprint',
    timeline: '10-14 weeks',
    title: 'Deploy HIPAA-compliant production AI systems',
    outcomes: [
      'Automated prior authorization and denial management workflows',
      'Predictive patient flow models for bed management and discharge planning',
      'Clinical documentation assistance that reduces physician administrative burden',
      'Intelligent coding review that catches errors before claim submission',
      'Full integration with your EHR, billing, and scheduling systems',
    ],
  },
  {
    phase: 'Forge Scale',
    timeline: 'Ongoing',
    title: 'Continuous optimization across the care continuum',
    outcomes: [
      'Monthly model retraining as patient population and payor mix evolve',
      'New AI capabilities deployed for emerging operational and clinical needs',
      'Regulatory compliance monitoring and automated reporting updates',
      'Quarterly business impact reviews with ROI attribution',
      'Expansion playbook for rolling AI across departments and facilities',
    ],
  },
];

const results = [
  { metric: '25%', label: 'Operational efficiency improvement' },
  { metric: '35%', label: 'Faster claims processing' },
  { metric: '40%', label: 'Reduction in claim denials' },
  { metric: '12 wk', label: 'From diagnostic to production' },
];

export default function HealthcarePage() {
  return (
    <>
      {/* — Hero — */}
      <section className="dark-section noise-texture relative overflow-hidden py-32 lg:py-48">
        <div className="absolute inset-0 pointer-events-none">
          <Image
            src="/images/abstract-network.webp"
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
            <p className="overline">Healthcare &amp; Life Sciences</p>
            <h1
              className="mt-6 text-display max-w-4xl text-bone"
              style={{ fontFamily: 'var(--font-instrument-serif)' }}
            >
              AI for Healthcare &amp; Life Sciences
            </h1>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p className="mt-6 max-w-2xl text-body-lg text-stone">
              Healthcare organizations are caught between rising patient volumes,
              shrinking margins, and an administrative burden that pulls
              clinicians away from care. AI has the potential to address all three
              — but only if it is deployed in a way that meets the regulatory,
              privacy, and interoperability demands of clinical environments.
            </p>
            <p className="mt-4 max-w-2xl text-body text-stone">
              ClearForge builds production AI for healthcare that improves
              clinical operations, accelerates revenue cycles, and reduces
              compliance burden — all within HIPAA-compliant frameworks designed
              for real clinical workflows.
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
            The operational gaps draining margin and clinical capacity
          </h2>
          <p className="mt-6 max-w-2xl text-body-lg text-warm-gray">
            Healthcare faces a structural problem: demand is growing, labor
            markets are tightening, and reimbursement is compressing. The
            organizations that thrive will be those that deploy AI to multiply
            the capacity of their existing workforce — not replace it.
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
          <p className="overline">The Forge Method for Healthcare</p>
          <h2 className="mt-6 text-display text-bone max-w-3xl">
            HIPAA-compliant AI from assessment to production
          </h2>
          <p className="mt-6 max-w-2xl text-body-lg text-stone">
            Every AI system we build for healthcare is designed for clinical
            workflows, not retrofitted from a generic platform. We build with
            privacy, interoperability, and clinician adoption in mind from the
            first conversation.
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
            Measured outcomes across clinical and revenue operations
          </h2>
          <p className="mt-6 max-w-2xl text-body-lg text-warm-gray">
            ClearForge has deployed AI systems for healthcare organizations
            that reduce administrative burden, accelerate revenue recovery,
            and improve clinical throughput — all within HIPAA-compliant
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
            Ready to transform healthcare operations?
          </h2>
          <p className="mt-6 text-body-lg text-stone">
            The Forge Diagnostic maps your highest-value clinical and
            operational AI opportunities in four weeks — with HIPAA
            compliance and clinician adoption built into every recommendation.
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
