export interface ServiceOffering {
  name: string;
  description: string;
  /** How long it runs. Duration only, never a billing cadence. */
  term: string;
  /** How it is billed. Never a price. */
  feeBasis: string;
  /** When the fee basis needs a qualifier, one short line. */
  feeNote?: string;
}

/** Anchor id for a service offering, so footer links land on the row. */
export const offeringId = (name: string) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

export interface ServiceStage {
  number: string;
  name: string;
  /** The conclusion the stage supports, written as the band's heading. */
  conclusion: string;
  description: string;
  link?: { label: string; href: string };
  offerings: ServiceOffering[];
}

/** The catalog as a journey: Diagnose, Build, Adopt, Run. */
export const SERVICE_STAGES: ServiceStage[] = [
  {
    number: '01',
    name: 'Diagnose',
    conclusion: 'Two weeks to prove the system is viable before you build.',
    description: 'Map the workflow, prove viability, price the build.',
    link: { label: 'Map the Workflow', href: '/discover' },
    offerings: [
      {
        name: 'Forge Diagnostic',
        description:
          'Two weeks to map the workflow, size the opportunity, and prove the system is viable before you build.',
        term: '2 weeks',
        feeBasis: 'Fixed fee',
        feeNote: 'Agreed up front.',
      },
      {
        name: 'Eval and Reliability Audit',
        description:
          'For AI systems your company already built. Deliverables: an eval harness, reliability gates, a fix plan.',
        term: '2 weeks',
        feeBasis: 'Fixed fee',
        feeNote: 'Agreed up front.',
      },
    ],
  },
  {
    number: '02',
    name: 'Build',
    conclusion: 'Kickoff to a live production system in 10 to 14 weeks.',
    description: 'Built into the workflow your team already runs.',
    offerings: [
      {
        name: 'Forge Sprint',
        description:
          '10 to 14 weeks from kickoff to a live production system. Every Sprint ships with an eval harness and reliability gates.',
        term: '10 to 14 weeks',
        feeBasis: 'Scoped in the Diagnostic',
        feeNote: 'Agreed before any build.',
      },
    ],
  },
  {
    number: '03',
    name: 'Adopt',
    conclusion: 'The team uses it every week, or the work is not done.',
    description: 'A named operator, a weekly working cadence, a live adoption scoreboard.',
    link: { label: 'Take the scorecard', href: '/scorecard' },
    offerings: [
      {
        name: 'Forge Scale',
        description:
          'The Adoption Mile: a named operator, a weekly working cadence, and a live adoption scoreboard.',
        term: 'Ongoing',
        feeBasis: 'Monthly retainer',
        feeNote: 'Scoped to the system.',
      },
      {
        name: 'Fractional Chief AI Officer',
        description:
          'The top tier of Forge Scale. Standing AI leadership across the whole company.',
        term: 'Ongoing',
        feeBasis: 'Monthly retainer',
        feeNote: 'Top tier, scoped to the engagement.',
      },
    ],
  },
  {
    number: '04',
    name: 'Run',
    conclusion: 'Monitored, evaluated, and upgraded after the build.',
    description: 'Managed agent operations for every system we built.',
    offerings: [
      {
        name: 'Forge Run',
        description:
          'Monitoring, production evals, SLAs, and model upgrades for every system we built.',
        term: 'Ongoing',
        feeBasis: 'Monthly retainer',
        feeNote: 'Per system, after the build.',
      },
    ],
  },
];

/** PE Portfolio Pack: deliberately unpriced, scoped with the sponsor. */
export const PE_PACK = {
  title: 'PE Portfolio Pack',
  points: [
    'Portfolio AI scan',
    'Diagnostic multipack across portfolio companies',
    'Sponsor-level adoption scoreboard',
  ],
  priceNote: 'Pricing: scoped with the sponsor.',
  stat: {
    value: '98',
    text: "Accordion's May 2026 survey of 150 PE operating partners found 98 percent of sponsors have mandated AI adoption while only about half of portfolio companies are actively implementing.",
    /** The two-number finding, drawn as a pair wherever the 98 appears. */
    pair: [
      { value: 98, label: 'of sponsors have mandated AI adoption' },
      { value: 50, approximate: true, label: 'of portfolio companies are actively implementing' },
    ],
    source: {
      label: 'Accordion, The PE AI Adoption Benchmark, May 2026, n=150',
      href: 'https://www.accordion.com/the-pe-ai-adoption-benchmark/',
    },
  },
};
