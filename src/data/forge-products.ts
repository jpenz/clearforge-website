/**
 * The Forge Method™ — three named engagement products.
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
      'A senior-led assessment that maps your highest-value AI opportunities, scores data readiness, and delivers an execution-ready roadmap — not a strategy deck.',
    whatsIncluded: [
      'Stakeholder interviews across leadership and operations',
      'Process mapping with AI opportunity scoring',
      'Data readiness and infrastructure audit',
      'Prioritized roadmap with ROI projections',
      'Quick-win identification for immediate impact',
      'Executive presentation with go/no-go recommendations',
    ],
    idealFor: 'Companies exploring AI for the first time or needing a clear starting point.',
    cta: 'Generate AI Value Map',
    href: '/discover',
  },
  {
    name: 'Forge Sprint™',
    price: '$75K–$200K',
    period: 'one-time',
    timeline: '10–14 weeks',
    description:
      'An intensive build engagement. We diagnose the problem, engineer the solution, deploy it into production, and train your team to run it — all in one sprint.',
    whatsIncluded: [
      'Working production system, not a prototype',
      'Integration with your existing tech stack',
      'Team training and knowledge transfer',
      'Change management and adoption support',
      'Measurable KPIs tracked from day one',
      '30-day post-launch support',
      'Documentation and runbooks for your team',
    ],
    idealFor: 'Companies ready to build and deploy AI into production with measurable ROI targets.',
    cta: 'Generate AI Value Map',
    href: '/discover',
    featured: true,
  },
  {
    name: 'Forge Scale™',
    price: '$5K–$15K',
    period: '/month',
    timeline: 'Ongoing',
    description:
      'Continuous AI operations embedded in your business. New agents built monthly, existing systems optimized, and senior strategy on demand.',
    whatsIncluded: [
      'Senior AI expertise on demand',
      'New AI agents built and deployed monthly',
      'Continuous optimization of live systems',
      'Weekly strategy sessions with leadership',
      'Priority support and rapid iteration',
      'Quarterly business impact reviews',
      'Access to ClearForge agent library',
    ],
    idealFor: 'Companies with production AI that want continuous improvement and expansion.',
    cta: 'Generate AI Value Map',
    href: '/discover',
  },
];
