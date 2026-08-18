export interface ServiceOffering {
  name: string;
  description: string;
  meta: string;
  price: string;
}

export interface ServiceStage {
  number: string;
  name: string;
  description: string;
  link?: { label: string; href: string };
  offerings: ServiceOffering[];
}

/** The catalog as a journey: Diagnose, Build, Adopt, Run. */
export const SERVICE_STAGES: ServiceStage[] = [
  {
    number: "01",
    name: "Diagnose",
    description: "Map the workflow, prove viability, price the build.",
    link: { label: "Map the Workflow", href: "/discover" },
    offerings: [
      {
        name: "Forge Diagnostic",
        description:
          "Two weeks to map the workflow, size the opportunity, and prove the system is viable before you build.",
        meta: "Fixed price · 2 weeks",
        price: "$15K",
      },
      {
        name: "Eval and Reliability Audit",
        description:
          "For AI systems your company already built. Deliverables: an eval harness, reliability gates, a fix plan.",
        meta: "Fixed price · 2 weeks",
        price: "$15K",
      },
    ],
  },
  {
    number: "02",
    name: "Build",
    description: "Kickoff to a live production system in 10 to 14 weeks.",
    offerings: [
      {
        name: "Forge Sprint",
        description:
          "10 to 14 weeks from kickoff to a live production system. Every Sprint ships with an eval harness and reliability gates.",
        meta: "Typical $75K to $200K+",
        price: "from $75K",
      },
    ],
  },
  {
    number: "03",
    name: "Adopt",
    description: "The bar: 70 percent weekly-active adoption by day 90.",
    link: { label: "Take the scorecard", href: "/scorecard" },
    offerings: [
      {
        name: "Forge Scale",
        description:
          "The Adoption Mile: a named operator, a weekly working cadence, and a live adoption scoreboard.",
        meta: "Per month",
        price: "$5K to $15K",
      },
      {
        name: "Fractional Chief AI Officer",
        description:
          "The top tier of Forge Scale. Standing AI leadership across the whole company.",
        meta: "Top tier · Per month",
        price: "from $15K",
      },
    ],
  },
  {
    number: "04",
    name: "Run",
    description: "Managed agent operations after a build.",
    offerings: [
      {
        name: "Forge Run",
        description:
          "Monitoring, production evals, SLAs, and model upgrades for every system we built.",
        meta: "Per system · Per month",
        price: "$2.5K to $7.5K",
      },
    ],
  },
];

/** PE Portfolio Pack: deliberately unpriced, scoped with the sponsor. */
export const PE_PACK = {
  title: "PE Portfolio Pack",
  points: [
    "Portfolio AI scan",
    "Diagnostic multipack across portfolio companies",
    "Sponsor-level adoption scoreboard",
  ],
  priceNote: "Pricing: scoped with the sponsor.",
  stat: {
    value: "98",
    text: "Accordion's May 2026 survey of 150 PE operating partners found 98 percent of sponsors have mandated AI adoption while only about half of portfolio companies are actively implementing.",
    source: "Source: accordion.com/the-pe-ai-adoption-benchmark",
  },
};
