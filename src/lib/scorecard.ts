export interface ScorecardQuestion {
  id: number;
  text: string;
  pillar: PillarKey;
}

export type PillarKey =
  | "data"
  | "workforce"
  | "process"
  | "tech"
  | "strategy";

export interface Pillar {
  key: PillarKey;
  name: string;
  weight: number;
  description: string;
}

export const pillars: Pillar[] = [
  {
    key: "data",
    name: "Data Readiness",
    weight: 0.25,
    description: "Is your data accessible, trustworthy, and ready for AI agents to work with?",
  },
  {
    key: "workforce",
    name: "Workforce & Leadership",
    weight: 0.25,
    description: "Is your team prepared to work alongside AI agents as part of a hybrid workforce?",
  },
  {
    key: "process",
    name: "Process Maturity",
    weight: 0.2,
    description: "Are your workflows documented, measured, and ready to be redesigned for AI?",
  },
  {
    key: "tech",
    name: "Technology & Systems",
    weight: 0.15,
    description: "Can your infrastructure support AI agents - including legacy systems that need bridging?",
  },
  {
    key: "strategy",
    name: "Strategic Alignment",
    weight: 0.15,
    description: "Is AI tied to your growth strategy, with budget and executive commitment behind it?",
  },
];

export const questions: ScorecardQuestion[] = [
  // Data Readiness (Q1-Q4)
  {
    id: 1,
    text: "Our key business data is centralized and accessible - not trapped in spreadsheets or individual computers",
    pillar: "data",
  },
  {
    id: 2,
    text: "We trust our data enough to make important business decisions with it",
    pillar: "data",
  },
  {
    id: 3,
    text: "Data can flow between departments and systems without manual re-entry",
    pillar: "data",
  },
  {
    id: 4,
    text: "We know where our most valuable data lives and who has access to it",
    pillar: "data",
  },
  // Workforce & Leadership (Q5-Q8)
  {
    id: 5,
    text: "Our leadership team understands what AI agents can and cannot do today",
    pillar: "workforce",
  },
  {
    id: 6,
    text: "Our people would embrace AI tools that make their jobs easier - not resist them",
    pillar: "workforce",
  },
  {
    id: 7,
    text: "We have someone in the organization who could champion an AI initiative",
    pillar: "workforce",
  },
  {
    id: 8,
    text: "We would be comfortable with AI agents handling routine decisions while our team focuses on complex judgment calls",
    pillar: "workforce",
  },
  // Process Maturity (Q9-Q12)
  {
    id: 9,
    text: "Our most important business processes are documented - someone new could follow them",
    pillar: "process",
  },
  {
    id: 10,
    text: "We track performance metrics for our core operations",
    pillar: "process",
  },
  {
    id: 11,
    text: "We can point to specific workflows that are time-consuming, repetitive, or error-prone",
    pillar: "process",
  },
  {
    id: 12,
    text: "Our sales, marketing, or operations processes have steps that could clearly be automated",
    pillar: "process",
  },
  // Technology & Systems (Q13-Q16)
  {
    id: 13,
    text: "We use at least some cloud-based or web-based tools in our daily operations",
    pillar: "tech",
  },
  {
    id: 14,
    text: "Our core systems can connect to other software (APIs, integrations, exports)",
    pillar: "tech",
  },
  {
    id: 15,
    text: "We have legacy systems (old ERP, mainframes, COBOL) that still run critical processes",
    pillar: "tech",
  },
  {
    id: 16,
    text: "We have basic cybersecurity measures in place (access controls, backups, monitoring)",
    pillar: "tech",
  },
  // Strategic Alignment (Q17-Q20)
  {
    id: 17,
    text: "AI is a strategic priority for our leadership - not just an experiment",
    pillar: "strategy",
  },
  {
    id: 18,
    text: "We have budget allocated (or could allocate budget) for AI and technology improvement",
    pillar: "strategy",
  },
  {
    id: 19,
    text: "We know which areas of our business need to improve most to drive growth",
    pillar: "strategy",
  },
  {
    id: 20,
    text: "We would invest in AI if we could see clear ROI within 6-12 months",
    pillar: "strategy",
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

export interface RoadmapStep {
  phase: string;
  title: string;
  description: string;
  service: string;
  timeline: string;
}

export interface ScorecardResult {
  compositeScore: number;
  maturityLevel: string;
  maturityDescription: string;
  recommendation: string;
  recommendedService: string;
  segment: string;
  pillarScores: PillarScore[];
  roadmap: RoadmapStep[];
  weakestPillar: PillarKey;
  strongestPillar: PillarKey;
}

export function getQuestionsForPillar(pillarKey: PillarKey): ScorecardQuestion[] {
  return questions.filter((q) => q.pillar === pillarKey);
}

function buildRoadmap(pillarScores: PillarScore[], compositeScore: number): RoadmapStep[] {
  const sorted = [...pillarScores].sort((a, b) => a.percentage - b.percentage);
  const roadmap: RoadmapStep[] = [];

  // Phase 1: Always start with diagnosis
  roadmap.push({
    phase: "Phase 1",
    title: "Growth Strategy & Diagnosis",
    description: `We start by understanding your market, competitive position, and where AI creates the most value for your specific business. ${
      sorted[0].percentage < 50
        ? `Your ${sorted[0].name.toLowerCase()} scored lowest - we'll prioritize that in our assessment.`
        : "Your foundations are solid - we'll identify where to accelerate."
    }`,
    service: "Growth Strategy & Diagnosis",
    timeline: "Weeks 1-4",
  });

  // Phase 2: Based on weakest areas
  const weakAreas = sorted.filter((p) => p.percentage < 60);
  if (weakAreas.some((p) => p.key === "process" || p.key === "data")) {
    roadmap.push({
      phase: "Phase 2",
      title: "Process Redesign & Data Foundation",
      description: "Before deploying AI agents, we standardize and simplify your core workflows. Map what exists, fix what's broken, then redesign for AI - not bolt automation onto broken processes.",
      service: "AI Agent Design & Build",
      timeline: "Weeks 5-10",
    });
  } else if (weakAreas.some((p) => p.key === "tech")) {
    roadmap.push({
      phase: "Phase 2",
      title: "Legacy System Modernization",
      description: "Your existing systems still run critical operations. We deploy AI agents that bridge those systems - connecting legacy infrastructure to modern capabilities without ripping and replacing.",
      service: "Legacy System Modernization",
      timeline: "Weeks 5-12",
    });
  } else {
    roadmap.push({
      phase: "Phase 2",
      title: "AI Agent Design & Build",
      description: "Your foundations are strong. We deploy AI agents into your highest-impact workflows - handling real tasks, making real decisions, operating alongside your team from day one.",
      service: "AI Agent Design & Build",
      timeline: "Weeks 5-12",
    });
  }

  // Phase 3: Workforce readiness
  if (sorted.find((p) => p.key === "workforce")!.percentage < 70) {
    roadmap.push({
      phase: "Phase 3",
      title: "Hybrid Workforce Activation",
      description: "Your team learns to work with AI agents as teammates. We redesign roles, build adoption plans, and train your people on the new workflows. Technology without workforce readiness doesn't stick.",
      service: "Managed AI Operations",
      timeline: "Weeks 8-16",
    });
  } else {
    roadmap.push({
      phase: "Phase 3",
      title: "Scale & Optimize",
      description: "Expand proven AI systems across the organization. Replicate wins from one area to the next. Your AI agents get smarter every cycle - performance compounds, not plateaus.",
      service: "Managed AI Operations",
      timeline: "Ongoing",
    });
  }

  // Phase 4: Always end with managed operations
  roadmap.push({
    phase: "Phase 4",
    title: "Continuous AI Operations",
    description: "We run and optimize your AI operations continuously. Real-time dashboards, monthly performance reviews, and agents that improve with every cycle. The value compounds over time.",
    service: "Managed AI Operations",
    timeline: "Ongoing",
  });

  return roadmap;
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
  const sorted = [...pillarScores].sort((a, b) => a.percentage - b.percentage);
  const weakestPillar = sorted[0].key;
  const strongestPillar = sorted[sorted.length - 1].key;
  const roadmap = buildRoadmap(pillarScores, rounded);

  let maturityLevel: string;
  let maturityDescription: string;
  let recommendation: string;
  let recommendedService: string;
  let segment: string;

  if (rounded <= 35) {
    maturityLevel = "Foundation";
    maturityDescription =
      "Your organization is in the early stages. The gap between where you are and where AI leaders operate is significant - but closeable. The key is starting with the right diagnosis, not jumping to tools.";
    recommendation =
      "Start with Growth Strategy & Diagnosis. We'll map your operations, identify where AI creates real value, and build a phased roadmap so you're not guessing.";
    recommendedService = "Growth Strategy & Diagnosis";
    segment = "D";
  } else if (rounded <= 50) {
    maturityLevel = "Emerging";
    maturityDescription =
      "You have some foundations in place but gaps remain - especially in your weaker pillars. Companies at this stage often know AI matters but haven't connected it to specific business outcomes yet.";
    recommendation =
      "Growth Strategy & Diagnosis will cut through the noise and show you exactly where to focus. Most companies at this stage try to do too much at once - we'll help you prioritize.";
    recommendedService = "Growth Strategy & Diagnosis";
    segment = "C";
  } else if (rounded <= 65) {
    maturityLevel = "Developing";
    maturityDescription =
      "Solid foundations. Your organization can support targeted AI agent deployment. The risk at this stage is stalling between strategy and execution - the companies pulling ahead don't pause here.";
    recommendation =
      "Move to AI Agent Design & Build. Deploy agents into your highest-impact workflows while preparing your team to work alongside them.";
    recommendedService = "AI Agent Design & Build";
    segment = "B";
  } else if (rounded <= 80) {
    maturityLevel = "Advanced";
    maturityDescription =
      "You're well-positioned for AI transformation. Your data, team, and processes can support sophisticated AI agents operating across your business. Now it's about scaling and compounding the value.";
    recommendation =
      "Deploy AI agents at scale with AI Agent Design & Build, then transition to Managed AI Operations for continuous optimization.";
    recommendedService = "AI Agent Design & Build";
    segment = "A";
  } else {
    maturityLevel = "Leader";
    maturityDescription =
      "Your organization is AI-ready across all dimensions. You're in the top tier - positioned to build sustainable competitive advantages through AI-native operations and a hybrid workforce.";
    recommendation =
      "Managed AI Operations keeps your AI systems compounding in value. Focus on scaling across the organization and measuring human + agent productivity together.";
    recommendedService = "Managed AI Operations";
    segment = "A+";
  }

  return {
    compositeScore: rounded,
    maturityLevel,
    maturityDescription,
    recommendation,
    recommendedService,
    pillarScores,
    segment,
    roadmap,
    weakestPillar,
    strongestPillar,
  };
}
