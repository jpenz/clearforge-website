import { ArrowRight, AlertTriangle, Eye, Wrench, Users, BarChart3, Zap, Settings } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { createMetadata } from '@/lib/metadata';

export const metadata = createMetadata({
  title: 'AI for Manufacturing & Industrial Operations | ClearForge',
  description:
    'ClearForge helps industrial manufacturers deploy AI across supply chain, maintenance, quality control, and workforce optimization. Built for mid-market manufacturers ready to operationalize AI.',
  path: '/industries/manufacturing',
  keywords: [
    'manufacturing AI',
    'predictive maintenance AI',
    'supply chain AI',
    'industrial AI consulting',
    'quality control automation',
  ],
});

const challenges = [
  {
    icon: Eye,
    title: 'Supply Chain Blind Spots',
    description:
      'Multi-tier supplier networks create visibility gaps that surface as stockouts, excess inventory, and margin erosion. Most manufacturers operate on spreadsheets and tribal knowledge across divisions.',
    metric: '$1.1T',
    metricLabel: 'Annual cost of supply chain disruptions globally',
  },
  {
    icon: Wrench,
    title: 'Reactive Maintenance Cycles',
    description:
      'Unplanned downtime costs 10x more than scheduled maintenance. Legacy systems generate data but lack the intelligence layer to predict failures before they cascade across production lines.',
    metric: '82%',
    metricLabel: 'Of manufacturers still use reactive maintenance',
  },
  {
    icon: AlertTriangle,
    title: 'Quality Control at Scale',
    description:
      'Manual inspection catches defects after the fact. As product complexity and regulatory requirements increase, visual inspection and sampling methods cannot keep pace with throughput demands.',
    metric: '15-20%',
    metricLabel: 'Of manufacturing cost attributed to quality failures',
  },
  {
    icon: Users,
    title: 'Labor Optimization',
    description:
      'Skilled labor shortages force manufacturers to choose between overtime costs and lost production. Workforce scheduling remains manual in most mid-market operations, creating chronic inefficiency.',
    metric: '2.1M',
    metricLabel: 'Manufacturing jobs unfilled by 2030 (Deloitte)',
  },
];

const forgeSteps = [
  {
    phase: 'Forge Diagnostic',
    timeline: '4 weeks',
    title: 'Map your operational AI opportunity',
    outcomes: [
      'Process-level mapping of every production workflow with AI opportunity scoring',
      'Data readiness audit across ERP, MES, SCADA, and IoT systems',
      'Quantified business case with ROI projections for each opportunity',
      'Prioritized roadmap ranked by implementation feasibility and margin impact',
      'Quick-win identification — the 2-3 initiatives that pay for the program',
    ],
  },
  {
    phase: 'Forge Sprint',
    timeline: '10-14 weeks',
    title: 'Build and deploy production AI systems',
    outcomes: [
      'Predictive maintenance models trained on your equipment data and failure history',
      'Demand sensing and supply chain visibility dashboards with anomaly detection',
      'Automated quality inspection using computer vision on your production line',
      'Intelligent workforce scheduling integrated with your existing HR and ERP systems',
      'Full integration with existing MES, ERP, and shop floor systems',
    ],
  },
  {
    phase: 'Forge Scale',
    timeline: 'Ongoing',
    title: 'Continuous optimization and new capability builds',
    outcomes: [
      'Monthly model retraining as production data evolves',
      'New AI agents built and deployed for emerging operational needs',
      'KPI tracking against baseline with quarterly business impact reviews',
      'Senior AI strategy on demand for capital planning and technology decisions',
      'Expansion playbook for rolling AI across divisions and facilities',
    ],
  },
];

const results = [
  { metric: '30%', label: 'Reduction in operational costs' },
  { metric: '1,181', label: 'Qualified opportunities identified' },
  { metric: '$4B', label: 'Client conglomerate revenue' },
  { metric: '6 mo', label: 'Time to measurable impact' },
];

export default function ManufacturingPage() {
  return (
    <>
      {/* — Hero — */}
      <section className="dark-section noise-texture relative overflow-hidden py-32 lg:py-48">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <p className="overline">Manufacturing &amp; Industrial</p>
          <h1
            className="mt-6 text-display max-w-4xl text-bone"
            style={{ fontFamily: 'var(--font-instrument-serif)' }}
          >
            AI for Manufacturing &amp; Industrial Operations
          </h1>
          <p className="mt-6 max-w-2xl text-body-lg text-stone">
            Most manufacturers are generating more data than ever — from IoT
            sensors and SCADA systems to ERP transactions and quality logs. The
            problem is not data. The problem is that none of it is working
            together to drive decisions.
          </p>
          <p className="mt-4 max-w-2xl text-body text-stone">
            ClearForge helps industrial manufacturers deploy AI that connects
            supply chain, maintenance, quality, and workforce systems into a
            single intelligence layer — built for production, not for pilots
            that never ship.
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
            The operational gaps costing manufacturers millions
          </h2>
          <p className="mt-6 max-w-2xl text-body-lg text-warm-gray">
            Mid-market manufacturers face a compounding problem: legacy systems
            generate data in silos, skilled labor is increasingly scarce, and
            competitive pressure demands precision that manual processes cannot
            deliver.
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
          <p className="overline">The Forge Method for Manufacturing</p>
          <h2 className="mt-6 text-display text-bone max-w-3xl">
            From operational assessment to production AI in weeks, not quarters
          </h2>
          <p className="mt-6 max-w-2xl text-body-lg text-stone">
            The Forge Method is purpose-built for manufacturers who need
            production systems, not proof-of-concept demos. Every engagement
            starts with your data, your processes, and your constraints.
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
            What ClearForge delivered for a $4B industrial conglomerate
          </h2>
          <p className="mt-6 max-w-2xl text-body-lg text-warm-gray">
            A Fortune 500 industrial manufacturer engaged ClearForge to
            unify fragmented sales operations across six divisions. Manual
            quoting, siloed CRM data, and zero cross-sell visibility were
            leaving revenue on the table.
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
            Ready to transform manufacturing operations?
          </h2>
          <p className="mt-6 text-body-lg text-stone">
            The Forge Diagnostic maps your highest-value AI opportunities in
            four weeks. See exactly where AI can reduce cost, improve quality,
            and increase throughput — with a clear business case for each.
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
