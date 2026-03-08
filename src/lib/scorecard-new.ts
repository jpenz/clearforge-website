export interface ScorecardQuestion {
  id: number;
  text: string;
  category: ScorecardCategory;
  weight: number;
}

export type ScorecardCategory =
  | "data"
  | "adoption"
  | "automation"
  | "team"
  | "competition"
  | "budget";

export interface CategoryInfo {
  key: ScorecardCategory;
  name: string;
  icon: string;
  description: string;
}

export const categories: CategoryInfo[] = [
  {
    key: "data",
    name: "Data Infrastructure",
    icon: "database",
    description: "Your data systems and accessibility",
  },
  {
    key: "adoption",
    name: "AI Adoption",
    icon: "brain",
    description: "How you've implemented AI so far",
  },
  {
    key: "automation",
    name: "Process Automation",
    icon: "workflow",
    description: "Workflow optimization opportunities",
  },
  {
    key: "team",
    name: "Team Readiness",
    icon: "users",
    description: "Your team's AI capabilities",
  },
  {
    key: "competition",
    name: "Competitive Pressure",
    icon: "trending",
    description: "Market forces driving AI adoption",
  },
  {
    key: "budget",
    name: "Budget Allocation",
    icon: "dollar",
    description: "Investment in AI initiatives",
  },
];

// 7 focused questions - one per category (except budget shares with adoption)
export const questions: ScorecardQuestion[] = [
  {
    id: 1,
    text: "How would you describe your company's data infrastructure?",
    category: "data",
    weight: 1.5,
  },
  {
    id: 2,
    text: "What best describes your current AI and automation initiatives?",
    category: "adoption",
    weight: 1.5,
  },
  {
    id: 3,
    text: "How much of your business processes are currently automated vs. manual?",
    category: "automation",
    weight: 1.2,
  },
  {
    id: 4,
    text: "How would you rate your team's readiness to work with AI tools?",
    category: "team",
    weight: 1.2,
  },
  {
    id: 5,
    text: "How competitive is the pressure to adopt AI in your industry?",
    category: "competition",
    weight: 1.0,
  },
  {
    id: 6,
    text: "What percentage of your annual budget is allocated to AI/technology initiatives?",
    category: "budget",
    weight: 1.0,
  },
  {
    id: 7,
    text: "Where do you see your company in terms of AI implementation compared to competitors?",
    category: "competition",
    weight: 0.6,
  },
];

// Options for each question with score values
export const questionOptions = [
  // Q1: Data Infrastructure
  [
    { value: 1, label: "Scattered spreadsheets & silos" },
    { value: 2, label: "Some centralized systems" },
    { value: 3, label: "Mostly unified data platform" },
    { value: 4, label: "Fully integrated data infrastructure" },
  ],
  // Q2: AI Adoption
  [
    { value: 1, label: "No AI initiatives yet" },
    { value: 2, label: "Exploring/ experimenting" },
    { value: 3, label: "Several AI projects in production" },
    { value: 4, label: "AI-first strategy company-wide" },
  ],
  // Q3: Process Automation
  [
    { value: 1, label: "Mostly manual processes" },
    { value: 2, label: "Some basic automation" },
    { value: 3, label: "Significant automation in place" },
    { value: 4, label: "Highly automated operations" },
  ],
  // Q4: Team Readiness
  [
    { value: 1, label: "Limited AI knowledge" },
    { value: 2, label: "Some team members trained" },
    { value: 3, label: "Majority AI-fluent" },
    { value: 4, label: "AI champions across teams" },
  ],
  // Q5: Competitive Pressure
  [
    { value: 1, label: "No pressure yet" },
    { value: 2, label: "Some competitive movement" },
    { value: 3, label: "Significant pressure to catch up" },
    { value: 4, label: "Industry-leading competitors" },
  ],
  // Q6: Budget Allocation
  [
    { value: 1, label: "Less than 5%" },
    { value: 2, label: "5-10% of budget" },
    { value: 3, label: "10-20% of budget" },
    { value: 4, label: "Over 20% dedicated to AI" },
  ],
  // Q7: Competitive Position
  [
    { value: 1, label: "Significantly behind" },
    { value: 2, label: "Slightly behind average" },
    { value: 3, label: "On par with industry" },
    { value: 4, label: "Ahead of competitors" },
  ],
];

export type Answers = Record<number, number>;

export interface ScoreResult {
  score: number;
  maxScore: number;
  percentage: number;
  tier: ResultTier;
  tierDescription: string;
  gapFromLeader: number;
  recommendations: string[];
  ctaText: string;
  ctaLink: string;
}

export type ResultTier = "leader" | "ready" | "curious" | "behind";

export function calculateScore(answers: Answers): ScoreResult {
  let totalScore = 0;
  let maxScore = 0;

  questions.forEach((q) => {
    const answer = answers[q.id] || 1;
    totalScore += answer * q.weight;
    maxScore += 4 * q.weight;
  });

  const percentage = Math.round((totalScore / maxScore) * 100);

  let tier: ResultTier;
  let tierDescription: string;
  let gapFromLeader: number;
  let recommendations: string[];
  let ctaText: string;
  let ctaLink: string;

  if (percentage >= 75) {
    tier = "leader";
    tierDescription = "You're an AI Leader. Your organization has strong foundations across data, automation, and team capabilities. You're well-positioned to leverage advanced AI solutions and build sustainable competitive advantages.";
    gapFromLeader = 0;
    recommendations = [
      "Expand AI initiatives to new business units",
      "Build custom AI agents for strategic workflows",
      "Share learnings as industry thought leadership",
    ];
    ctaText = "Scale Your AI Initiatives";
    ctaLink = "/contact";
  } else if (percentage >= 55) {
    tier = "ready";
    tierDescription = "You're AI Ready. You have solid foundations and are positioned for targeted AI implementation. Focus on your strongest areas to generate quick wins and build momentum across the organization.";
    gapFromLeader = 75 - percentage;
    recommendations = [
      "Prioritize high-impact automation opportunities",
      "Invest in team AI training and upskilling",
      "Establish AI governance frameworks",
    ];
    ctaText = "Accelerate Your AI Roadmap";
    ctaLink = "/contact";
  } else if (percentage >= 35) {
    tier = "curious";
    tierDescription = "You're AI Curious. You've recognized the opportunity but need to build foundational capabilities. Small, focused steps now will pay off significantly as AI adoption accelerates.";
    gapFromLeader = 75 - percentage;
    recommendations = [
      "Start with a focused AI readiness assessment",
      "Pilot AI in one department or process",
      "Invest in basic data infrastructure",
    ];
    ctaText = "Start Your AI Journey";
    ctaLink = "/contact";
  } else {
    tier = "behind";
    tierDescription = "You're AI Behind. Your competitors are likely already leveraging AI to gain advantages in efficiency, customer experience, or innovation. The good news: starting now with the right foundation sets you up for rapid progress.";
    gapFromLeader = 75 - percentage;
    recommendations = [
      "Begin with an AI readiness audit",
      "Focus on data infrastructure basics",
      "Build executive alignment on AI priorities",
    ];
    ctaText = "Book Your Discovery Call";
    ctaLink = "/contact";
  }

  return {
    score: totalScore,
    maxScore,
    percentage,
    tier,
    tierDescription,
    gapFromLeader,
    recommendations,
    ctaText,
    ctaLink,
  };
}
