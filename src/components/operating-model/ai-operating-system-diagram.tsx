import { BarChart3, BrainCircuit, GitBranch, ShieldCheck, Target, Users } from 'lucide-react';

const nodes = [
  {
    icon: Target,
    title: 'AI Ambition',
    detail: 'What must change in growth, margin, service, quality, or speed.',
  },
  {
    icon: GitBranch,
    title: 'Value Chain',
    detail: 'Where the work really moves across people, systems, decisions, and controls.',
  },
  {
    icon: BrainCircuit,
    title: 'Custom Agents',
    detail: 'Purpose-built AI workers, copilots, models, and automations tied to the workflow.',
  },
  {
    icon: Users,
    title: 'Human Cadence',
    detail: 'The meetings, roles, escalation paths, and adoption routines that make AI useful.',
  },
  {
    icon: ShieldCheck,
    title: 'Governance',
    detail: 'Security, access, quality checks, approvals, audit trail, and responsible use rules.',
  },
  {
    icon: BarChart3,
    title: 'Performance Loop',
    detail: 'Dashboards and feedback data that make the system smarter every month.',
  },
];

export function AiOperatingSystemDiagram() {
  return (
    <div className="relative">
      <div className="absolute left-1/2 top-10 bottom-10 hidden w-px -translate-x-1/2 bg-divider lg:block" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {nodes.map((node, index) => {
          const Icon = node.icon;
          return (
            <div
              key={node.title}
              className="relative border border-divider bg-warm-white p-5 transition-colors hover:border-brass/50"
            >
              <div className="flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-divider bg-parchment text-brass">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <span className="metric text-xs text-brass">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mt-2 text-h4">{node.title}</h3>
                  <p className="mt-2 text-body-sm leading-relaxed text-warm-gray">{node.detail}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
