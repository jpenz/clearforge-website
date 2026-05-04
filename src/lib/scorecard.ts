export interface ScorecardQuestion {
  id: number;
  text: string;
  pillar: PillarKey;
}

export type PillarKey = 'data' | 'workforce' | 'process' | 'tech' | 'strategy';

export interface Pillar {
  key: PillarKey;
  name: string;
  weight: number;
  description: string;
}

export const pillars: Pillar[] = [
  {
    key: 'strategy',
    name: 'Ambition & Value Case',
    weight: 0.25,
    description: 'Is the first AI build tied to a real business constraint and decision owner?',
  },
  {
    key: 'process',
    name: 'Workflow Clarity',
    weight: 0.22,
    description: 'Can the team see the handoffs, exceptions, approvals, and baseline?',
  },
  {
    key: 'data',
    name: 'Data Path',
    weight: 0.2,
    description: 'Are the source systems and data owners clear enough to build safely?',
  },
  {
    key: 'tech',
    name: 'Controls & Integration',
    weight: 0.18,
    description: 'Can AI fit into the current systems with human review and audit trail?',
  },
  {
    key: 'workforce',
    name: 'Adoption Cadence',
    weight: 0.15,
    description: 'Will leaders and users have the operating rhythm to make the build stick?',
  },
];

export const questions: ScorecardQuestion[] = [
  // Ambition & Value Case
  {
    id: 1,
    text: 'We can name the workflow where AI should change revenue, cost, cycle time, quality, or service',
    pillar: 'strategy',
  },
  {
    id: 2,
    text: 'That workflow has one accountable owner who can approve scope and judge results',
    pillar: 'strategy',
  },
  // Workflow Clarity
  {
    id: 3,
    text: 'The current handoffs, exceptions, approvals, and rework are visible enough to redesign',
    pillar: 'process',
  },
  {
    id: 4,
    text: 'We know the baseline: volume, cost, cycle time, error rate, or revenue signal',
    pillar: 'process',
  },
  // Data Path
  {
    id: 5,
    text: 'The source systems, documents, and data owners for this workflow are known',
    pillar: 'data',
  },
  {
    id: 6,
    text: 'People trust the data enough to let it drive recommendations or draft work',
    pillar: 'data',
  },
  // Controls & Integration
  {
    id: 7,
    text: 'The workflow can connect to existing CRM, ERP, ticketing, document, or reporting systems',
    pillar: 'tech',
  },
  {
    id: 8,
    text: 'We know where AI needs human review, escalation, and audit trail before launch',
    pillar: 'tech',
  },
  // Adoption Cadence
  {
    id: 9,
    text: 'Frontline users and managers would have time and permission to adopt a new cadence',
    pillar: 'workforce',
  },
  {
    id: 10,
    text: 'Leadership would review adoption, exceptions, quality, and value movement after launch',
    pillar: 'workforce',
  },
];

export const scaleLabels = ['Not true', 'Partly true', 'Mixed', 'Mostly true', 'Already true'];

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

function buildRoadmap(pillarScores: PillarScore[], _compositeScore: number): RoadmapStep[] {
  const sorted = [...pillarScores].sort((a, b) => a.percentage - b.percentage);
  const roadmap: RoadmapStep[] = [];

  roadmap.push({
    phase: 'Phase 1',
    title: 'Forge Diagnostic',
    description: `Select the workflow, owner, baseline, data path, and proof plan before anything gets built. ${
      sorted[0].percentage < 50
        ? `Your ${sorted[0].name.toLowerCase()} scored lowest, so the diagnostic should resolve that gap first.`
        : 'Your foundations are workable, so the diagnostic should move quickly into first-build scope.'
    }`,
    service: 'Forge Diagnostic',
    timeline: 'Weeks 1-4',
  });

  const weakAreas = sorted.filter((p) => p.percentage < 60);
  if (weakAreas.some((p) => p.key === 'process' || p.key === 'data')) {
    roadmap.push({
      phase: 'Phase 2',
      title: 'Workflow and Data Path Design',
      description:
        'Map the real handoffs, source systems, documents, and exception paths. The goal is a build scope that engineering and operators can both trust.',
      service: 'Forge Sprint',
      timeline: 'Weeks 5-10',
    });
  } else if (weakAreas.some((p) => p.key === 'tech')) {
    roadmap.push({
      phase: 'Phase 2',
      title: 'Control and Integration Design',
      description:
        'Define the integrations, confidence thresholds, escalation paths, and audit trail before launch. This keeps AI inside the operating model.',
      service: 'Forge Sprint',
      timeline: 'Weeks 5-10',
    });
  } else {
    roadmap.push({
      phase: 'Phase 2',
      title: 'First Production Build',
      description:
        'Build the first custom AI workflow around the selected constraint, then launch it with dashboards, controls, and owner review.',
      service: 'Forge Sprint',
      timeline: 'Weeks 5-10',
    });
  }

  if (sorted.find((p) => p.key === 'workforce')!.percentage < 70) {
    roadmap.push({
      phase: 'Phase 3',
      title: 'Adoption and Manager Cadence',
      description:
        'Train users, managers, and the operating owner on what AI handles, what people decide, and which exceptions need review.',
      service: 'Forge Sprint',
      timeline: 'Weeks 8-10',
    });
  } else {
    roadmap.push({
      phase: 'Phase 3',
      title: 'Launch and Value Review',
      description:
        'Move the build into daily work, inspect adoption, review exceptions, and compare results against the starting baseline.',
      service: 'Forge Sprint',
      timeline: 'Weeks 8-10',
    });
  }

  roadmap.push({
    phase: 'Phase 4',
    title: 'Managed Improvement Loop',
    description:
      'Keep adoption, quality, exceptions, and business movement visible after launch. The system improves because leaders keep reviewing it.',
    service: 'Forge Scale',
    timeline: 'Ongoing',
  });

  return roadmap;
}

export function calculateResults(answers: Answers): ScorecardResult {
  const pillarScores: PillarScore[] = pillars.map((pillar) => {
    const pillarQuestions = getQuestionsForPillar(pillar.key);
    const totalScore = pillarQuestions.reduce((sum, q) => sum + (answers[q.id] || 1), 0);
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
    maturityLevel = 'Foundation';
    maturityDescription =
      'The first AI build needs more operating clarity before it is worth funding. The risk is jumping to tools before the owner, baseline, data path, and controls are clear.';
    recommendation =
      'Start with a Forge Diagnostic. The job is to choose one workflow, make the baseline visible, and decide whether the first build is worth a sprint.';
    recommendedService = 'Forge Diagnostic';
    segment = 'D';
  } else if (rounded <= 50) {
    maturityLevel = 'Emerging';
    maturityDescription =
      'There is enough signal to keep going, but the first build still has unresolved risk. The weak pillar will likely determine whether AI reaches production.';
    recommendation =
      'Use the diagnostic to narrow scope and remove ambiguity. Do not fund a build until the workflow owner, baseline, controls, and adoption plan are explicit.';
    recommendedService = 'Forge Diagnostic';
    segment = 'C';
  } else if (rounded <= 65) {
    maturityLevel = 'Developing';
    maturityDescription =
      'The organization can likely support a targeted AI workflow if the scope stays focused. The next risk is stalling between a good idea and a working production path.';
    recommendation =
      'Move from diagnostic to a Forge Sprint. Build one production workflow with controls, training, and a baseline review before expanding.';
    recommendedService = 'Forge Sprint';
    segment = 'B';
  } else if (rounded <= 80) {
    maturityLevel = 'Advanced';
    maturityDescription =
      'The foundations are strong enough for production AI. The important move is disciplined expansion, not more disconnected pilots.';
    recommendation =
      'Run a Forge Sprint against the highest-value workflow, then move into Forge Scale once adoption and value movement are visible.';
    recommendedService = 'Forge Sprint';
    segment = 'A';
  } else {
    maturityLevel = 'Leader';
    maturityDescription =
      'The organization is ready to operate AI as part of management cadence. The next job is keeping every build tied to ownership, controls, and measured business movement.';
    recommendation =
      'Use Forge Scale to expand through governed workflows while monitoring adoption, exceptions, quality, and value movement.';
    recommendedService = 'Forge Scale';
    segment = 'A+';
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
