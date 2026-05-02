import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  ClipboardCheck,
  Gauge,
  GitPullRequestArrow,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import Link from 'next/link';
import { AiOperatingSystemDiagram } from '@/components/operating-model/ai-operating-system-diagram';
import { Button } from '@/components/ui/button';
import { createMetadata } from '@/lib/metadata';

export const metadata = createMetadata({
  title: 'AI Operating Model - Custom AI Transformation | ClearForge',
  description:
    'How ClearForge sets AI ambition, maps value chains, builds custom AI systems, and trains teams into a measurable operating model.',
  path: '/operating-model',
  keywords: [
    'AI operating model',
    'custom AI transformation',
    'AI center of excellence',
    'agentic workflow design',
  ],
});

const phases = [
  {
    title: 'Set Ambition',
    description:
      'Define the business performance step-change AI must create: revenue growth, margin expansion, faster service, better quality, or OPEX leverage.',
    output: 'Executive ambition, value thesis, and decision guardrails',
  },
  {
    title: 'Map Value',
    description:
      'Break the company into value-chain activities and score each one by economic impact, feasibility, data readiness, adoption risk, and time-to-value.',
    output: 'Prioritized AI value map and first-build recommendation',
  },
  {
    title: 'Design Future State',
    description:
      'Redesign how work should move across people, agents, systems, approvals, exceptions, and management review.',
    output: 'Future-state workflow, governance path, and KPI tree',
  },
  {
    title: 'Build the Machine',
    description:
      'Engineer the custom agents, copilots, data paths, dashboards, integrations, and controls around the systems that already run the business.',
    output: 'Production AI workflow with testing and human-in-the-loop controls',
  },
  {
    title: 'Train the Organization',
    description:
      'Make the new workflow real through role design, manager routines, adoption coaching, documentation, and escalation rules.',
    output: 'Trained users, owner handoff, and adoption cadence',
  },
  {
    title: 'Run the Loop',
    description:
      'Instrument quality, cycle time, usage, exceptions, financial movement, and backlog priorities so the system improves every month.',
    output: 'Performance dashboard and continuous improvement backlog',
  },
];

const executiveControls = [
  {
    icon: Gauge,
    title: 'Value score',
    detail: 'Each use case is ranked by growth, cost, speed, quality, service, margin, and risk.',
  },
  {
    icon: ShieldCheck,
    title: 'Governance score',
    detail:
      'Access, data sensitivity, auditability, human approval, and failure-mode controls are explicit.',
  },
  {
    icon: GitPullRequestArrow,
    title: 'Build readiness',
    detail:
      'Data sources, systems, owners, edge cases, and workflow complexity are assessed before build.',
  },
  {
    icon: BarChart3,
    title: 'Operating performance',
    detail: 'Dashboards show adoption, throughput, quality, exceptions, and financial movement.',
  },
];

const boardQuestions = [
  'Where can AI materially bend the revenue or OPEX curve?',
  'Which workflows should be redesigned before we buy or build more tools?',
  'What can agents do autonomously, and where must people stay in the loop?',
  'Which systems, data, and approvals must be integrated for production use?',
  'How will leaders know whether AI is improving performance or just creating activity?',
  'What governance model makes the system safe, observable, and scalable?',
];

const operatingMetrics = [
  { label: 'Workflow cycle time', before: 'Manual handoffs', after: 'Agent-routed next action' },
  { label: 'Decision quality', before: 'Tribal knowledge', after: 'Context-rich recommendations' },
  {
    label: 'Service consistency',
    before: 'Rep-by-rep variation',
    after: 'Measured response standards',
  },
  {
    label: 'Management visibility',
    before: 'Lagging reports',
    after: 'Live exception and KPI review',
  },
  {
    label: 'Improvement speed',
    before: 'Quarterly projects',
    after: 'Monthly optimization backlog',
  },
];

export default function OperatingModelPage() {
  return (
    <>
      <section className="dark-section noise-texture relative overflow-hidden py-32 lg:py-44">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(207,163,101,0.16),transparent_28%),linear-gradient(135deg,rgba(10,12,12,0.9),rgba(10,12,12,1))]" />
        <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <div className="grid gap-14 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <p className="overline text-brass-light">ClearForge AI Operating Model</p>
              <h1 className="mt-6 max-w-4xl text-display-xl text-bone">
                The system that turns AI ambition into operating performance.
              </h1>
              <p className="mt-6 max-w-2xl text-body-lg text-stone">
                ClearForge helps leadership set the AI ambition, map the value chain, build the
                custom agentic workflows, and train the organization to run the new machine.
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Button size="lg" asChild>
                  <Link href="/discover" data-analytics="operating_model_hero_value_map">
                    Generate AI Value Map <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline-light" asChild>
                  <Link href="/case-studies" data-analytics="operating_model_hero_case_studies">
                    See Production Proof
                  </Link>
                </Button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="border border-divider-dark bg-forge-black/70 p-5 sm:p-7">
                <div className="flex items-center gap-3 border-b border-divider-dark pb-4">
                  <Sparkles className="h-5 w-5 text-brass-light" />
                  <p className="text-sm font-semibold text-bone">Executive control stack</p>
                </div>
                <div className="mt-6 space-y-4">
                  {[
                    ['Ambition', 'What must AI make measurably better?'],
                    ['Value Map', 'Where is the highest-confidence leverage?'],
                    ['Build System', 'What agents, workflows, and data paths are required?'],
                    ['Adoption Loop', 'How do people, KPIs, and governance make it stick?'],
                  ].map(([label, detail], index) => (
                    <div key={label} className="grid grid-cols-[3rem_1fr] gap-4">
                      <span className="metric text-sm text-brass-light">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-bone">{label}</p>
                        <p className="mt-1 text-xs leading-relaxed text-stone">{detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-parchment py-20 sm:py-32 lg:py-40">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <div className="lg:grid lg:grid-cols-12 lg:items-end lg:gap-16">
            <div className="lg:col-span-7">
              <p className="overline">The Model</p>
              <h2 className="mt-6 max-w-3xl text-display">
                Strategy, agents, workflows, governance, and adoption in one operating design.
              </h2>
            </div>
            <p className="mt-6 text-body-lg text-warm-gray lg:col-span-5 lg:mt-0">
              The value is not in an AI demo. The value is in redesigning the work so the best
              actions happen faster, with better context, tighter controls, and measurable
              management visibility.
            </p>
          </div>

          <div className="mt-16">
            <AiOperatingSystemDiagram />
          </div>
        </div>
      </section>

      <section className="border-t border-divider bg-warm-white py-20 sm:py-32 lg:py-40">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <div className="lg:grid lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <p className="overline">How It Runs</p>
              <h2 className="mt-6 text-display">A practical sequence from ambition to adoption.</h2>
            </div>
            <div className="mt-12 border-t border-divider lg:col-span-8 lg:mt-0">
              {phases.map((phase, index) => (
                <div
                  key={phase.title}
                  className="grid gap-5 border-b border-divider py-8 lg:grid-cols-[4rem_1fr_1fr]"
                >
                  <span className="metric text-sm text-brass">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="text-h4">{phase.title}</h3>
                    <p className="mt-2 text-body-sm leading-relaxed text-warm-gray">
                      {phase.description}
                    </p>
                  </div>
                  <div className="flex items-start gap-3 text-body-sm font-medium text-anthracite">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brass" />
                    <span>{phase.output}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-parchment py-20 sm:py-32 lg:py-40">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="overline">Executive Lens</p>
              <h2 className="mt-6 text-display">
                The questions leaders need answered before scale.
              </h2>
              <p className="mt-5 text-body-lg text-warm-gray">
                We use these questions to keep the work out of pilot theater and tied to operating
                value, investment decisions, and responsible deployment.
              </p>
            </div>
            <div className="lg:col-span-7">
              <div className="grid gap-0 border-t border-divider sm:grid-cols-2">
                {boardQuestions.map((question) => (
                  <div key={question} className="border-b border-divider py-5 sm:pr-8">
                    <p className="text-body font-medium text-anthracite">{question}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="dark-section py-20 sm:py-32 lg:py-40">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <div className="lg:grid lg:grid-cols-12 lg:items-start lg:gap-16">
            <div className="lg:col-span-4">
              <p className="overline text-brass-light">Control System</p>
              <h2 className="mt-6 text-display text-bone">What the executive team can manage.</h2>
              <p className="mt-5 text-body-lg text-stone">
                The operating model gives leaders visibility into the value case, build readiness,
                governance posture, and performance movement.
              </p>
            </div>
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:col-span-8 lg:mt-0">
              {executiveControls.map((control) => {
                const Icon = control.icon;
                return (
                  <div key={control.title} className="border border-divider-dark p-5">
                    <Icon className="h-5 w-5 text-brass-light" />
                    <h3 className="mt-5 text-h4 text-bone">{control.title}</h3>
                    <p className="mt-2 text-body-sm leading-relaxed text-stone">{control.detail}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-warm-white py-20 sm:py-32 lg:py-40">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <div className="lg:grid lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <p className="overline">Future State</p>
              <h2 className="mt-6 text-display">What changes when the model is working.</h2>
            </div>
            <div className="mt-12 border-t border-divider lg:col-span-8 lg:mt-0">
              {operatingMetrics.map((metric) => (
                <div
                  key={metric.label}
                  className="grid gap-4 border-b border-divider py-6 sm:grid-cols-[1fr_1fr_1fr]"
                >
                  <p className="text-h4">{metric.label}</p>
                  <p className="text-body-sm text-warm-gray">{metric.before}</p>
                  <p className="text-body-sm font-medium text-anthracite">{metric.after}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-14 border-l-2 border-brass pl-5">
            <div className="flex items-start gap-4">
              <ClipboardCheck className="mt-1 h-5 w-5 shrink-0 text-brass" />
              <div>
                <p className="text-h4">The proprietary part is not a checklist.</p>
                <p className="mt-2 max-w-3xl text-body text-warm-gray">
                  We show enough for leaders to understand the discipline: ambition, value, build,
                  governance, and adoption. The detailed prompts, scoring weights, architectures,
                  and implementation methods are tailored inside the engagement.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="dark-section py-20 sm:py-32 lg:py-40">
        <div className="mx-auto max-w-[840px] px-4 sm:px-6 lg:px-10">
          <p className="overline text-brass-light">Start Here</p>
          <h2 className="mt-6 text-display text-bone">
            Generate the first value map. Then build the first machine.
          </h2>
          <p className="mt-6 text-body-lg text-stone">
            Forge Intelligence gives you a fast read on where AI could create leverage. ClearForge
            turns the right opportunities into production systems.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button size="lg" asChild>
              <Link href="/discover" data-analytics="operating_model_bottom_value_map">
                Generate AI Value Map <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline-light" asChild>
              <Link href="/contact" data-analytics="operating_model_bottom_contact">
                Book a Diagnostic Call
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
