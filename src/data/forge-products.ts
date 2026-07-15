/**
 * The Forge Method™ — three named engagement paths.
 * Single source of truth for /services and /pricing pages.
 */

export interface ForgeProduct {
  name: string;
  price: string;
  period: string;
  timeline: string;
  description: string;
  whatsIncluded: string[];
  idealFor: string;
  cta: string;
  href: string;
  featured?: boolean;
}

export const forgeProducts: ForgeProduct[] = [
  {
    name: 'Forge Diagnostic™',
    price: '$15K',
    period: 'one-time',
    timeline: '4 weeks',
    description:
      'A senior-led assessment that selects the right workflow, checks data readiness, sets a baseline, and gives leadership a build plan they can approve.',
    whatsIncluded: [
      'Stakeholder interviews across leadership and operations',
      'Workflow mapping with value, effort, and risk scoring',
      'Data readiness and infrastructure audit',
      'Adoption readiness read — who will run the system, and what changes for them',
      'Prioritized build plan with value hypotheses and assumptions',
      'Baseline metrics for throughput, error rates, cycle time, or cost',
      'Executive readout with go/no-go recommendations',
    ],
    idealFor: 'Companies exploring AI for the first time or needing a clear starting point.',
    cta: 'Map the Workflow',
    href: '/discover',
  },
  {
    name: 'Forge Sprint™',
    price: '$75K–$200K',
    period: 'one-time',
    timeline: '10–14 weeks',
    description:
      'An intensive build engagement. We diagnose the problem, engineer the solution, deploy it into production — then run The Adoption Mile™ until your team actually works in it.',
    whatsIncluded: [
      'Working production system, not a prototype',
      'Integration with your existing tech stack',
      'Named workflow owner and handoff plan',
      'The Adoption Mile™ — named operator, weekly working cadence, live adoption scoreboard',
      '70% weekly-active usage bar tracked to day 90',
      'Baseline KPIs tracked from day one',
      'Documentation, runbooks, and 30-day post-launch support',
    ],
    idealFor:
      'Companies ready to put one important workflow into production with clear owners and metrics.',
    cta: 'Map the Workflow',
    href: '/discover',
    featured: true,
  },
  {
    name: 'Forge Scale™',
    price: '$5K–$15K',
    period: '/month',
    timeline: 'Ongoing',
    description:
      'Ongoing AI operations for live systems. We review usage, tune workflows, scope the next build, and keep owners aligned on measured value.',
    whatsIncluded: [
      'Senior AI operators on demand',
      'New workflow scopes and agent updates as needed',
      'Monthly review of live-system performance and retraining',
      'Weekly or biweekly working sessions with leadership',
      'Adoption scoreboard maintained across every live system',
      'Priority support and rapid iteration',
      'Quarterly value reviews against the original baseline',
    ],
    idealFor: 'Companies with production AI that want continuous improvement and expansion.',
    cta: 'Map the Workflow',
    href: '/discover',
  },
];
