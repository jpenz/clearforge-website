import { ArrowRight, Search, Layers, TrendingUp, LogOut } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { createMetadata } from '@/lib/metadata';

export const metadata = createMetadata({
  title: 'AI for Private Equity Value Creation | ClearForge',
  description:
    'ClearForge helps private equity firms deploy AI across portfolio companies for EBITDA improvement, operational diagnostics, post-acquisition integration, and exit preparation.',
  path: '/industries/private-equity',
  keywords: [
    'private equity AI',
    'portfolio value creation AI',
    'PE operational improvement',
    'EBITDA improvement AI',
    'post-acquisition AI integration',
  ],
});

const challenges = [
  {
    icon: Search,
    title: 'Portfolio Diagnostics at Scale',
    description:
      'PE firms hold 5-20 portfolio companies with no shared framework for identifying AI value levers. Each company operates on different systems, different data maturity, and different operational priorities — making it impossible to apply a consistent diagnostic across the portfolio.',
    metric: '70%',
    metricLabel: 'Of PE firms lack an AI readiness framework for portcos',
  },
  {
    icon: Layers,
    title: 'Post-Acquisition Integration',
    description:
      'The first 100 days after acquisition are critical for value creation, but technology integration and operational optimization compete for bandwidth with management transitions and culture alignment. AI opportunities are identified in diligence but rarely survive the integration timeline.',
    metric: '60%',
    metricLabel: 'Of planned synergies are never fully realized',
  },
  {
    icon: TrendingUp,
    title: 'EBITDA Improvement Velocity',
    description:
      'Traditional operational improvement takes 12-18 months to show measurable EBITDA impact. PE holding periods are compressing, and LPs expect faster value creation. The firms that can deploy AI-driven operational improvement in 90-day sprint cycles have a structural advantage.',
    metric: '4.2 yr',
    metricLabel: 'Average PE holding period (down from 5.8 years)',
  },
  {
    icon: LogOut,
    title: 'Exit Preparation',
    description:
      'Buyers pay premium multiples for companies with embedded AI capabilities and data-driven operations. Preparing a portfolio company for exit requires demonstrating that AI-driven improvements are sustainable, documented, and transferable to the next owner.',
    metric: '2-3x',
    metricLabel: 'Multiple premium for AI-enabled portfolio companies',
  },
];

const forgeSteps = [
  {
    phase: 'Forge Diagnostic',
    timeline: '4 weeks per portco',
    title: 'Rapid AI readiness assessment across the portfolio',
    outcomes: [
      'Standardized AI maturity scoring across every portfolio company',
      'Identification of cross-portfolio AI themes and shared infrastructure opportunities',
      'Company-specific opportunity maps with ROI projections and implementation timelines',
      'Data readiness and technology gap analysis for each portco',
      'Prioritized 90-day sprint plan ranked by EBITDA impact and feasibility',
    ],
  },
  {
    phase: 'Forge Sprint',
    timeline: '10-14 weeks',
    title: 'Deploy value-creation AI at portfolio company level',
    outcomes: [
      'Revenue operations AI: pipeline optimization, lead scoring, pricing intelligence',
      'Operational efficiency: process automation, predictive maintenance, workforce optimization',
      'Financial operations: forecasting, cash flow prediction, vendor consolidation analytics',
      'Customer intelligence: churn prediction, cross-sell models, NPS driver analysis',
      'Measurable KPIs tracked from day one with clear EBITDA attribution',
    ],
  },
  {
    phase: 'Forge Scale',
    timeline: 'Ongoing',
    title: 'Continuous value creation and exit preparation',
    outcomes: [
      'Monthly AI capability expansion across the portfolio company',
      'Quarterly EBITDA impact reporting aligned with board cadence',
      'Exit readiness documentation: AI capabilities, data assets, and operational IP',
      'Cross-portfolio knowledge transfer and best-practice propagation',
      'Senior AI strategy for technology due diligence on new acquisitions',
    ],
  },
];

const results = [
  { metric: '10%', label: 'Average EBITDA improvement' },
  { metric: '90 day', label: 'Time to measurable value' },
  { metric: '5', label: 'Portfolio companies assessed in parallel' },
  { metric: '3x', label: 'ROI on diagnostic investment' },
];

export default function PrivateEquityPage() {
  return (
    <>
      {/* — Hero — */}
      <section className="dark-section noise-texture relative overflow-hidden py-32 lg:py-48">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <p className="overline">Private Equity</p>
          <h1
            className="mt-6 text-display max-w-4xl text-bone"
            style={{ fontFamily: 'var(--font-instrument-serif)' }}
          >
            AI for Private Equity Value Creation
          </h1>
          <p className="mt-6 max-w-2xl text-body-lg text-stone">
            Private equity firms are sitting on an enormous, untapped value
            creation lever. AI can accelerate EBITDA improvement across
            portfolio companies — but only if it is deployed with the speed,
            rigor, and measurability that PE operating models demand.
          </p>
          <p className="mt-4 max-w-2xl text-body text-stone">
            ClearForge works with PE firms and their portfolio companies to
            diagnose AI opportunities, deploy production systems in 90-day
            sprint cycles, and build the operational AI capabilities that
            command premium exit multiples.
          </p>
          <div className="mt-10">
            <Button size="lg" asChild>
              <Link href="/discover">
                Get My Free AI Readiness Score <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* — Key Challenges — */}
      <section className="bg-parchment py-24 lg:py-40">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <p className="overline">Industry Challenges</p>
          <h2 className="mt-6 text-display max-w-3xl">
            The value creation gap in private equity portfolios
          </h2>
          <p className="mt-6 max-w-2xl text-body-lg text-warm-gray">
            PE firms recognize AI as a value creation lever, but most lack the
            operating framework to deploy it across diverse portfolio companies
            with different systems, different data maturity, and different
            management capabilities.
          </p>

          <div className="mt-16 grid gap-8 sm:grid-cols-2">
            {challenges.map((challenge) => (
              <div
                key={challenge.title}
                className="border border-divider bg-surface p-8"
              >
                <challenge.icon className="h-6 w-6 text-brass" />
                <h3 className="mt-4 text-h3">{challenge.title}</h3>
                <p className="mt-3 text-body text-warm-gray">
                  {challenge.description}
                </p>
                <div className="mt-6 border-t border-divider pt-6">
                  <p
                    className="metric-lg text-anthracite"
                    style={{
                      fontFamily: 'var(--font-jetbrains-mono, monospace)',
                    }}
                  >
                    {challenge.metric}
                  </p>
                  <p className="mt-1 text-body-sm text-warm-gray">
                    {challenge.metricLabel}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* — How ClearForge Helps — */}
      <section className="dark-section noise-texture relative overflow-hidden py-24 lg:py-40">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <p className="overline">The Forge Method for Private Equity</p>
          <h2 className="mt-6 text-display text-bone max-w-3xl">
            90-day sprint cycles aligned with PE operating cadence
          </h2>
          <p className="mt-6 max-w-2xl text-body-lg text-stone">
            The Forge Method maps directly to the PE value creation playbook:
            rapid diagnostics, measurable sprints, and ongoing operations that
            compound returns. Every engagement is structured around EBITDA
            impact and board-ready reporting.
          </p>

          <div className="mt-16 space-y-12">
            {forgeSteps.map((step, i) => (
              <div
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
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* — Industry Results — */}
      <section className="bg-parchment py-24 lg:py-40">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <p className="overline">Results</p>
          <h2 className="mt-6 text-display max-w-3xl">
            What ClearForge delivered for a PE portfolio diagnostic
          </h2>
          <p className="mt-6 max-w-2xl text-body-lg text-warm-gray">
            A mid-market PE firm engaged ClearForge to assess AI readiness
            across their portfolio. The diagnostic identified actionable
            opportunities in every company, with the first sprint cycle
            delivering measurable EBITDA impact within 90 days.
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
            Ready to unlock AI value across your portfolio?
          </h2>
          <p className="mt-6 text-body-lg text-stone">
            The Forge Diagnostic gives you a standardized AI readiness
            assessment across your portfolio in four weeks per company. See
            exactly where AI can drive EBITDA improvement — with a clear
            business case and 90-day sprint plan for each.
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
