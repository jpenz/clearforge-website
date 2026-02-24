export interface CaseStudyOutcome {
  metric: string;
  description: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  industry: string;
  service: string;
  heroMetric: string;
  heroMetricLabel: string;
  excerpt: string;
  featured?: boolean;
  challenge: string;
  solution: string[];
  continuousModel?: string[];
  outcomes: CaseStudyOutcome[];
  scale: string;
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "metro-detroit-services-company",
    title: "Metro Detroit Services Company Rebuilds Pipeline from Zero",
    industry: "Home & Commercial Services",
    service: "AI Marketing Agent",
    heroMetric: "Growth Mode",
    heroMetricLabel: "From Decline to Repeatable Pipeline",
    featured: true,
    excerpt:
      "A legacy services business with no formal marketing system moved from customer attrition and declining revenue to active growth with recurring commercial contracts.",
    challenge:
      "The company had operated for more than two decades on referrals and reputation. It had no website, no search presence, no paid campaigns, and no structured outreach motion. As legacy customers churned, revenue steadily eroded and there was no predictable pipeline to replace it.",
    solution: [
      "Built and launched a conversion-focused website with clear service positioning and lead capture",
      "Established local search foundation and profile management so qualified buyers could find the company",
      "Implemented lead intelligence and qualification workflows for inbound and outbound opportunities",
      "Deployed coordinated outreach sequences and follow-up workflows",
      "Introduced CRM-centered call workflow with AI-assisted prep and prioritization",
      "Created a recurring commercial maintenance contract motion to stabilize revenue",
      "Built a repeatable review and testimonial engine to strengthen trust in-market",
    ],
    outcomes: [
      { metric: "Active Growth", description: "Revenue direction shifted from decline to expansion" },
      { metric: "Recurring Contracts", description: "Commercial maintenance agreements created more predictable cash flow" },
      { metric: "Acquisition-Ready", description: "Documented systems improved buyer confidence for PE interest" },
      { metric: "Owner Confidence", description: "A repeatable pipeline replaced ad hoc lead generation" },
    ],
    scale:
      "With systems documented and running continuously, the business is no longer dependent on one-off referrals. It now has an operating model that can be scaled, handed off, and diligenced by potential acquirers. Anonymous client quote: \"For the first time, marketing is a system in this business, not a guess.\"",
  },
  {
    slug: "industrial-manufacturer",
    title: "Fortune 1000 Industrial Manufacturer Transforms Sales Intelligence",
    industry: "Industrial Manufacturing",
    service: "AI Strategy + AI Design & Build",
    heroMetric: "1,060",
    heroMetricLabel: "Qualified Opportunities Identified",
    excerpt:
      "A $2B+ industrial manufacturer with 70+ facilities deployed AI-powered sales intelligence across 16 divisions, uncovering new growth segments and reducing manual prospecting time.",
    challenge:
      "Sales teams across divisions operated in silos with no shared market intelligence. Prospecting was manual and inconsistent, cross-sell opportunities were missed, and leadership lacked a unified view of where growth potential was strongest.",
    solution: [
      "Unified sales intelligence workflows across 16 divisions",
      "Automated target identification and qualification by territory and vertical",
      "Decision-maker enrichment and routing into sales workflows",
      "Rapid market intelligence reporting for leadership planning",
      "Portfolio-level prioritization of divisions by growth potential",
      "Geographic expansion modeling tied to infrastructure and demand signals",
    ],
    continuousModel: [
      "Monthly refresh of market and conversion data to improve targeting quality",
      "Automated signal monitoring to surface emerging market shifts",
      "New segment discovery incorporated into ongoing territory planning",
      "Lead intelligence delivered directly into frontline sales execution",
    ],
    outcomes: [
      { metric: "1,060", description: "Qualified opportunities identified across divisions" },
      { metric: "16", description: "Business divisions aligned to a shared intelligence model" },
      { metric: "5", description: "New high-growth segments identified" },
      { metric: "60%+", description: "Reduction in manual prospecting time" },
    ],
    scale:
      "What started with two divisions expanded into a broader company operating system for market visibility and growth planning. Leadership now uses the same intelligence foundation for commercial planning and portfolio decisions.",
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug);
}

export function getCaseStudiesByService(service: string): CaseStudy[] {
  return caseStudies.filter((cs) => cs.service === service);
}

export function getFeaturedCaseStudy(): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.featured);
}
