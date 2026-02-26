export interface CaseStudy {
  slug: string;
  title: string;
  industry: string;
  service: string;
  heroMetric: string;
  heroMetricLabel: string;
  excerpt: string;
  challenge: string;
  solution: string;
  outcomes: { metric: string; description: string }[];
  scale: string;
}

export const caseStudies: CaseStudy[] = [
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
      "A $50M specialty manufacturer was losing ground to competitors with faster sales cycles. Their sales team spent 60% of their time on manual prospecting and data entry instead of selling. Pipeline visibility was poor — leadership couldn't forecast accurately, and high-value leads were falling through the cracks. Despite a strong product, their go-to-market motion was stuck in spreadsheets and gut instinct.",
    solution:
      "We deployed an AI-powered sales intelligence system that automated prospect identification using intent signals, firmographic data, and behavioral triggers. We built automated outreach sequences personalized at scale, integrated directly with their existing CRM. A real-time pipeline analytics dashboard gave leadership full visibility into deal progression, conversion rates, and forecast accuracy for the first time.",
    outcomes: [
      { metric: "30%", description: "Increase in qualified pipeline" },
      { metric: "45%", description: "Reduction in manual prospecting time" },
      { metric: "2.1x", description: "Improvement in forecast accuracy" },
      { metric: "18 days", description: "Faster average deal cycle" },
    ],
    scale:
      "After proving the model with one sales team, the client expanded the system across all three regional teams. They've since added AI-driven account scoring and competitive intelligence monitoring, turning their sales operation into a data-driven growth engine.",
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
      "A mid-market PE firm had a thesis that AI could accelerate value creation across their portfolio, but lacked the in-house expertise to identify and execute opportunities. Their portfolio companies — spanning manufacturing, services, and logistics — each had different tech stacks, team capabilities, and operational challenges. Previous technology initiatives had stalled due to vendor dependency and lack of strategic alignment.",
    solution:
      "We designed a portfolio-wide AI playbook starting with rapid assessments at each company. Using 90-day sprints, we identified and built high-impact solutions tailored to each business: automated quality inspection for the manufacturer, intelligent routing for the logistics company, and AI-powered client onboarding for the services firm. Each sprint followed our Diagnose → Design → Build → Optimize methodology with clear KPIs tied to EBITDA impact.",
    outcomes: [
      { metric: "10%", description: "Average EBITDA improvement per company" },
      { metric: "90 days", description: "Time to first measurable impact" },
      { metric: "$2.4M", description: "Combined annual cost savings" },
      { metric: "3", description: "Companies transformed simultaneously" },
    ],
    scale:
      "The PE firm has adopted the ClearForge AI playbook as a standard part of their value creation plan for all new acquisitions. Two of the three portfolio companies have moved to ongoing retainers for continued AI development, and the firm now uses AI readiness as part of their due diligence process.",
  },
  {
    slug: "services-company-process-automation",
    title: "$25M Services Company Saves $240K Annually",
    industry: "Professional Services",
    service: "Performance Improvement",
    heroMetric: "$240K",
    heroMetricLabel: "Annual Savings",
    excerpt:
      "Process mining and targeted automation eliminated bottlenecks and saved $240K annually in a professional services firm.",
    challenge:
      "A $25M professional services company was growing revenue but margins were declining. Process inefficiencies were hidden across disconnected systems — billing errors, duplicate data entry, and manual reporting consumed thousands of hours annually. The leadership team knew they had operational drag but couldn't pinpoint where the biggest opportunities were or what to fix first.",
    solution:
      "We conducted a comprehensive process mining engagement, mapping every major workflow from client onboarding to billing. We identified $400K+ in addressable waste across 12 processes and prioritized the top three for immediate automation: invoice reconciliation, project status reporting, and client onboarding documentation. Each solution integrated with their existing project management and accounting systems — no rip-and-replace required.",
    outcomes: [
      { metric: "$240K", description: "Annual cost savings from automation" },
      { metric: "1,200 hrs", description: "Staff hours reclaimed per year" },
      { metric: "85%", description: "Reduction in billing errors" },
      { metric: "3 weeks", description: "Faster client onboarding" },
    ],
    scale:
      "With the quick wins generating immediate ROI, the client expanded the engagement to tackle the remaining nine identified opportunities. They've built an internal automation playbook based on our methodology and now evaluate every major process through an AI-readiness lens.",
  },
  {
    slug: "b2b-software-ai-sdr",
    title: "B2B Software Company Achieves 3.5x Conversion Lift",
    industry: "B2B Software",
    service: "Custom AI Agents",
    heroMetric: "3.5x",
    heroMetricLabel: "Conversion Improvement",
    excerpt:
      "Custom AI SDR agents transformed top-of-funnel conversion, generating 3.5x more qualified meetings from the same traffic.",
    challenge:
      "A growing B2B software company had strong inbound traffic but poor lead conversion. Their SDR team was overwhelmed — response times averaged 4+ hours, most leads went cold, and reps spent more time qualifying than selling. They'd tried chatbots and form automation, but nothing moved the needle on actual qualified meetings booked.",
    solution:
      "We built custom AI SDR agents that handled initial prospect engagement 24/7. The agents could understand product questions, qualify leads based on firmographic and behavioral signals, handle objections with contextual responses, and book meetings directly on rep calendars. We integrated with their CRM and enrichment tools so every interaction was logged and scored. The agents learned from successful rep conversations and improved over time.",
    outcomes: [
      { metric: "3.5x", description: "Increase in qualified meetings booked" },
      { metric: "< 2 min", description: "Average lead response time (was 4+ hrs)" },
      { metric: "62%", description: "Of meetings booked outside business hours" },
      { metric: "28%", description: "Higher close rate on AI-qualified leads" },
    ],
    scale:
      "The client has expanded AI agents across their entire go-to-market motion — including renewal outreach, expansion opportunity identification, and customer success check-ins. The initial SDR agent now handles 70% of inbound qualification autonomously, freeing the human team to focus on high-value conversations.",
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug);
}

export function getCaseStudiesByService(service: string): CaseStudy[] {
  return caseStudies.filter((cs) => cs.service === service);
}

export function getCaseStudiesByIndustry(industry: string): CaseStudy[] {
  return caseStudies.filter((cs) => cs.industry === industry);
}
