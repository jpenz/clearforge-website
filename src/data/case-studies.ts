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
    slug: "industrial-manufacturer",
    title: "Fortune 1000 Industrial Manufacturer Transforms Sales Intelligence",
    industry: "Industrial Manufacturing",
    service: "AI Revenue Operations",
    heroMetric: "1,060",
    heroMetricLabel: "Qualified Opportunities Identified",
    featured: true,
    excerpt:
      "A $2B+ industrial manufacturer with 70+ facilities deployed AI-powered sales intelligence across 16 divisions — discovering 5 new high-growth market segments and reducing manual prospecting time by 60%.",
    challenge:
      "A Fortune 1000 industrial manufacturer with $2B+ in revenue, 70+ facilities across North America, and 16 distinct business divisions faced a critical growth challenge. Sales teams across divisions operated in silos with no shared market intelligence, targeting prospects based on gut feel rather than data. Each division ran its own prospecting process — duplicating effort, missing cross-sell opportunities, and wasting senior sales talent on manual research. Leadership had no unified view of which markets, geographies, or verticals offered the highest growth potential across their portfolio of businesses.",
    solution: [
      "AI-powered sales intelligence platform proprietary platform orchestrating data collection and analysis across all 16 divisions simultaneously",
      "State-by-state automated prospect research pipelines that identified and qualified targets across every division's addressable market",
      "Contact enrichment pipeline using a waterfall approach across multiple data sources — ensuring high match rates and accurate decision-maker contacts",
      "Strategic market intelligence reports generated in under 45 minutes, covering competitive landscapes, market sizing, and growth trends",
      "Portfolio strategy analysis that ranked all 16 business divisions by CAGR, total addressable market, and margin potential — giving leadership a data-driven capital allocation framework",
      "Geographic expansion modeling that identified optimal new territories for each division based on infrastructure spending, regulatory tailwinds, and competitive density",
    ],
    continuousModel: [
      "AI agents retrained monthly on conversion data — learning which prospects engage, which messaging resonates, and which market signals predict closed deals",
      "Market reports auto-refresh with emerging trends: infrastructure spending shifts, regulatory changes, new construction activity, and competitor moves",
      "New market segments and territories added automatically as data reveals opportunities the client hadn't previously considered",
      "Sales teams receive pre-qualified, enriched leads directly in their workflow — eliminating the gap between intelligence and action",
    ],
    outcomes: [
      { metric: "1,060", description: "Qualified opportunities identified across all divisions" },
      { metric: "10", description: "Industry verticals analyzed with full competitive landscapes" },
      { metric: "Monthly", description: "Automated strategy and market intelligence refresh cycle" },
      { metric: "5", description: "New high-growth market segments discovered (data center cooling at 21.9% CAGR, additive manufacturing at 18.6% CAGR)" },
      { metric: "60%+", description: "Reduction in manual prospecting time across sales teams" },
      { metric: "16", description: "Business divisions ranked by growth potential with geographic expansion recommendations" },
    ],
    scale:
      "What began as a sales intelligence initiative for two divisions has expanded into a company-wide strategic platform. The AI agents now run continuous market monitoring across all 16 divisions, automatically surfacing new opportunities as market conditions shift. Leadership uses the portfolio analysis to inform M&A strategy, capital allocation, and geographic expansion decisions. The system compounds — each month of data makes the intelligence sharper, the targeting more precise, and the recommendations more valuable.",
  },
  {
    slug: "manufacturer-pipeline-automation",
    title: "$50M Manufacturer Transforms Sales Pipeline",
    industry: "Manufacturing",
    service: "AI Revenue Operations",
    heroMetric: "30%",
    heroMetricLabel: "Pipeline Increase",
    excerpt:
      "AI-powered prospecting and automated outreach drove a 30% increase in qualified pipeline within 90 days.",
    challenge:
      "A $50M specialty manufacturer was losing ground to competitors with faster sales cycles. Their sales team spent 60% of their time on manual prospecting and data entry instead of selling.",
    solution: [
      "AI-powered sales intelligence system with automated prospect identification using intent signals, firmographic data, and behavioral triggers",
      "Automated outreach sequences personalized at scale, integrated directly with existing CRM",
      "Real-time pipeline analytics dashboard for full visibility into deal progression and forecast accuracy",
    ],
    outcomes: [
      { metric: "30%", description: "Increase in qualified pipeline" },
      { metric: "45%", description: "Reduction in manual prospecting time" },
      { metric: "2.1x", description: "Improvement in forecast accuracy" },
      { metric: "18 days", description: "Faster average deal cycle" },
    ],
    scale:
      "After proving the model with one sales team, the client expanded the system across all three regional teams with AI-driven account scoring and competitive intelligence monitoring.",
  },
  {
    slug: "pe-portfolio-value-creation",
    title: "PE Portfolio Unlocks AI Value Across 3 Companies",
    industry: "Private Equity",
    service: "PE Value Creation",
    heroMetric: "10%",
    heroMetricLabel: "EBITDA Improvement",
    excerpt:
      "A portfolio-wide AI playbook delivered measurable EBITDA improvement across three mid-market companies in under 6 months.",
    challenge:
      "A mid-market PE firm had a thesis that AI could accelerate value creation across their portfolio, but lacked the in-house expertise to identify and execute opportunities.",
    solution: [
      "Portfolio-wide AI playbook with rapid assessments at each company",
      "90-day value creation sprints with tailored solutions per business",
      "Automated quality inspection, intelligent routing, and AI-powered client onboarding across the portfolio",
    ],
    outcomes: [
      { metric: "10%", description: "Average EBITDA improvement per company" },
      { metric: "90 days", description: "Time to first measurable impact" },
      { metric: "$2.4M", description: "Combined annual cost savings" },
      { metric: "3", description: "Companies transformed simultaneously" },
    ],
    scale:
      "The PE firm adopted the ClearForge AI playbook as standard for all new acquisitions. Two portfolio companies moved to ongoing retainers.",
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
