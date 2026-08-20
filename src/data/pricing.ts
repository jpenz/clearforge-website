export interface PricingTier {
  index?: string;
  name: string;
  subtitle: string;
  term: string;
  price: string;
  priceDetail?: string;
  /** Numeric price bounds in USD for structured data. Omitted when unpublished. */
  minPrice?: number;
  maxPrice?: number;
}

/** The published tiers ledger. One unnumbered row is deliberately unpriced. */
export const PRICING_TIERS: PricingTier[] = [
  {
    index: "01",
    name: "Forge Diagnostic",
    subtitle: "Where every engagement starts.",
    term: "Fixed fee · 2 weeks",
    price: "Fixed fee",
    minPrice: 15000,
    maxPrice: 15000,
  },
  {
    index: "02",
    name: "Eval and Reliability Audit",
    subtitle:
      "For AI systems you already built. An eval harness, reliability gates, a fix plan.",
    term: "Fixed fee · 2 weeks",
    price: "Fixed fee",
    minPrice: 15000,
    maxPrice: 15000,
  },
  {
    index: "03",
    name: "Forge Sprint",
    subtitle:
      "A live production system. Ships with an eval harness and reliability gates as a named deliverable.",
    term: "10 to 14 weeks",
    price: "Scoped in the Diagnostic",
    minPrice: 75000,
  },
  {
    index: "04",
    name: "Forge Scale",
    subtitle:
      "The Adoption Mile. The top tier is a Fractional Chief AI Officer engagement, from $15K per month.",
    term: "Monthly",
    price: "Monthly retainer",
        minPrice: 5000,
    maxPrice: 15000,
  },
  {
    index: "05",
    name: "Forge Run",
    subtitle:
      "Managed agent operations after a build. Monitoring, production evals, SLAs, model upgrades.",
    term: "Per system · Monthly",
    price: "Monthly, per system",
    priceDetail: "per system per month",
    minPrice: 2500,
    maxPrice: 7500,
  },
];

export const UNPUBLISHED_TIER: PricingTier = {
  name: "PE and multi-company platform work",
  subtitle: "Scoped with the sponsor.",
  term: "Portfolio scope",
  price: "Not published",
};

export const FIRST_TWO_WEEKS = [
  {
    label: "Week 1",
    title: "Map the workflow, size the opportunity",
    description:
      "We sit inside the workflow and put a number on what the manual steps cost.",
  },
  {
    label: "Week 2",
    title: "Prove viability, price the build",
    description:
      "We test the system against your real data and scope the Sprint.",
  },
  {
    label: "Day 10 to 14",
    title: "A decision you can price",
    description:
      "Build, fix, or stop. If you build, the Sprint is priced from $75K.",
  },
];

export const ADOPTION_MILE_POINTS = [
  "Named operator",
  "Weekly working cadence",
  "Live adoption scoreboard",
];
