export interface ScorecardQuestion {
  id: number;
  text: string;
  pillar: PillarKey;
}

export type PillarKey =
  | "data"
  | "team"
  | "process"
  | "tech"
  | "budget";

export interface Pillar {
  key: PillarKey;
  name: string;
  weight: number;
  description: string;
}

export const pillars: Pillar[] = [
  {
    key: "data",
    name: "Data Maturity",
    weight: 0.3,
    description: "How centralized, trustworthy, and accessible your data is",
  },
  {
    key: "team",
    name: "Team Capability",
    weight: 0.25,
    description: "Leadership understanding, team openness, and AI championing",
  },
  {
    key: "process",
    name: "Process Documentation",
    weight: 0.2,
    description: "How well processes are mapped, measured, and understood",
  },
  {
    key: "tech",
    name: "Tech Infrastructure",
    weight: 0.15,
    description: "Cloud readiness, API capabilities, and security posture",
  },
  {
    key: "budget",
    name: "Budget Alignment",
    weight: 0.1,
    description: "Budget allocation, ROI expectations, and strategic priority",
  },
];

export const questions: ScorecardQuestion[] = [
  // Data Maturity (Q1-Q4)
  {
    id: 1,
    text: "Key business data is stored in centralized systems (not spreadsheets)",
    pillar: "data",
  },
  {
    id: 2,
    text: "We trust our data quality for decision-making",
    pillar: "data",
  },
  {
    id: 3,
    text: "Clear data governance policies exist and are followed",
    pillar: "data",
  },
  {
    id: 4,
    text: "Our systems can share data easily across departments",
    pillar: "data",
  },
  // Team Capability (Q5-Q8)
  {
    id: 5,
    text: "Leadership understands AI capabilities and limitations",
    pillar: "team",
  },
  {
    id: 6,
    text: "Our team is open to adopting new technology and workflows",
    pillar: "team",
  },
  {
    id: 7,
    text: "We have (or could hire) people with data and analytics skills",
    pillar: "team",
  },
  {
    id: 8,
    text: "There is a clear AI champion or sponsor in our organization",
    pillar: "team",
  },
  // Process Documentation (Q9-Q12)
  {
    id: 9,
    text: "Core business processes are documented and understood",
    pillar: "process",
  },
  {
    id: 10,
    text: "We track KPIs for our most important processes",
    pillar: "process",
  },
  {
    id: 11,
    text: "We can identify which workflows are time-consuming or error-prone",
    pillar: "process",
  },
  {
    id: 12,
    text: "Significant manual or repetitive work exists that could be automated",
    pillar: "process",
  },
  // Tech Infrastructure (Q13-Q15)
  {
    id: 13,
    text: "We use cloud-based tools at least partially",
    pillar: "tech",
  },
  {
    id: 14,
    text: "Our systems are modern enough to support API integrations",
    pillar: "tech",
  },
  {
    id: 15,
    text: "We have adequate cybersecurity measures in place",
    pillar: "tech",
  },
  // Budget Alignment (Q16-Q18)
  {
    id: 16,
    text: "Budget is allocated for AI or technology improvement",
    pillar: "budget",
  },
  {
    id: 17,
    text: "We expect ROI within 6-18 months (realistic timeline)",
    pillar: "budget",
  },
  {
    id: 18,
    text: "AI is a strategic priority for our leadership team",
    pillar: "budget",
  },
];

export const scaleLabels = [
  "Strongly Disagree",
  "Disagree",
  "Neutral",
  "Agree",
  "Strongly Agree",
];

export type Answers = Record<number, number>;

export interface PillarScore {
  key: PillarKey;
  name: string;
  score: number;
  maxScore: number;
  percentage: number;
}

export interface ScorecardResult {
  compositeScore: number;
  maturityLevel: string;
  maturityDescription: string;
  recommendation: string;
  recommendedService: string;
  segment: string;
  pillarScores: PillarScore[];
}

export function getQuestionsForPillar(pillarKey: PillarKey): ScorecardQuestion[] {
  return questions.filter((q) => q.pillar === pillarKey);
}

export function calculateResults(answers: Answers): ScorecardResult {
  const pillarScores: PillarScore[] = pillars.map((pillar) => {
    const pillarQuestions = getQuestionsForPillar(pillar.key);
    const totalScore = pillarQuestions.reduce(
      (sum, q) => sum + (answers[q.id] || 1),
      0
    );
    const maxScore = pillarQuestions.length * 5;
    const percentage = (totalScore / maxScore) * 100;
    return {
      key: pillar.key,
      name: pillar.name,
      score: totalScore,
      maxScore,
      percentage,
    };
  });

  const compositeScore = pillars.reduce((total, pillar, i) => {
    return total + pillarScores[i].percentage * pillar.weight;
  }, 0);

  const rounded = Math.round(compositeScore);

  let maturityLevel: string;
  let maturityDescription: string;
  let recommendation: string;
  let recommendedService: string;
  let segment: string;

  if (rounded <= 40) {
    maturityLevel = "Foundation Building";
    maturityDescription =
      "Your organization is in the early stages of AI readiness. Key foundational elements — data infrastructure, team capability, and process documentation — need attention before AI can deliver reliable value.";
    recommendation =
      "Start with an AI Readiness Audit to identify your highest-impact opportunities and build a roadmap.";
    recommendedService = "AI Readiness Audit";
    segment = "D";
  } else if (rounded <= 55) {
    maturityLevel = "Emerging";
    maturityDescription =
      "You have some foundational elements in place but gaps remain. With targeted improvements in your weaker areas, you can move quickly toward successful AI implementation.";
    recommendation =
      "An AI Readiness Audit will pinpoint exactly where to focus for maximum impact.";
    recommendedService = "AI Readiness Audit";
    segment = "C";
  } else if (rounded <= 70) {
    maturityLevel = "Developing";
    maturityDescription =
      "Your organization has solid foundations and is ready for targeted AI implementation. Focus on your strongest areas first to generate quick wins and build momentum.";
    recommendation =
      "A Performance Sprint will tackle your top opportunities and deliver working solutions in 6-8 weeks.";
    recommendedService = "Performance Sprint";
    segment = "B";
  } else if (rounded <= 85) {
    maturityLevel = "Implemented";
    maturityDescription =
      "You're well-positioned for AI-driven transformation. Your data, team, and processes can support sophisticated AI solutions that drive measurable business impact.";
    recommendation =
      "Move directly to implementation with a Performance Sprint or Custom AI Agent engagement.";
    recommendedService = "Performance Sprint";
    segment = "A";
  } else {
    maturityLevel = "Leader";
    maturityDescription =
      "Your organization is AI-ready across all dimensions. You're positioned to deploy advanced AI solutions and build sustainable competitive advantages through AI-native operations.";
    recommendation =
      "An AI Agent Retainer gives you ongoing access to expertise for continuous AI development and optimization.";
    recommendedService = "AI Agent Retainer";
    segment = "A";
  }

  return {
    compositeScore: rounded,
    maturityLevel,
    maturityDescription,
    recommendation,
    recommendedService,
    pillarScores,
    segment,
  };
}
