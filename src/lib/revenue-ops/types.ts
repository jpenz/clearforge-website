export type ConfidenceLevel = 'high' | 'medium' | 'low';

export type SignalReviewStatus = 'needs_review' | 'validated' | 'grouped' | 'dismissed';

export type OpportunityStage =
  | 'needs_review'
  | 'validated'
  | 'approved'
  | 'activated'
  | 'deferred'
  | 'rejected';

export type OpportunityScoreKey =
  | 'icpFit'
  | 'timing'
  | 'expectedValue'
  | 'reachability'
  | 'confidence'
  | 'strategicAlignment';

export interface SourceEvidence {
  id: string;
  label: string;
  capturedAt: string;
  detail: string;
  kind: 'synthetic_demo' | 'customer_data' | 'public_source' | 'crm';
  url?: string;
}

export interface Signal {
  id: string;
  title: string;
  type: string;
  affectedEntity: string;
  segment: string;
  source: string;
  observedAt: string;
  decayAt: string;
  confidence: number;
  businessRelevance: number;
  reviewStatus: SignalReviewStatus;
  groupId?: string;
  groupLabel?: string;
  evidence: SourceEvidence[];
  limitations: string[];
}

export interface PriorityWeights extends Record<OpportunityScoreKey, number> {}

export interface PriorityInputs extends Record<OpportunityScoreKey, number> {}

export interface ExpectedValue {
  low: number;
  high: number;
  currency: 'USD';
  basis: string;
}

export interface Opportunity {
  id: string;
  title: string;
  account: string;
  segment: string;
  geography: string;
  owner: string;
  ownerRole: string;
  sla: string;
  stage: OpportunityStage;
  signalIds: string[];
  whyNow: string;
  buyingHypothesis: string;
  recommendedMotion: string;
  nextAction: string;
  playbookId: string;
  crmState: string;
  relationshipState: string;
  expectedValue: ExpectedValue;
  scoreInputs: PriorityInputs;
  scoreOverride?: { value: number; reason: string; by: string };
  risks: string[];
  exclusions: string[];
  dueAt: string;
}

export interface PlayStep {
  id: string;
  title: string;
  ownerRole: string;
  channel: string;
  approvalRequired: boolean;
  timing: string;
}

export interface Playbook {
  id: string;
  name: string;
  shortName: string;
  trigger: string;
  eligibleWhen: string;
  buyer: string;
  valueProposition: string;
  researchRequired: string;
  owner: string;
  sla: string;
  stopConditions: string[];
  successCriteria: string[];
  guardrail: string;
  steps: PlayStep[];
}

export interface MarketSegment {
  id: string;
  name: string;
  geography: string;
  accountUniverse: number;
  coveredAccounts: number;
  customerPenetration: number;
  attractiveness: number;
  access: number;
  confidence: ConfidenceLevel;
  growthHypothesis: string;
  evidence: string;
  status: 'fund' | 'test' | 'monitor';
}

export interface CommercialInitiative {
  id: string;
  name: string;
  marketInsight: string;
  expectedImpact: string;
  effort: 'Low' | 'Medium' | 'High';
  readiness: 'Ready' | 'Needs data' | 'Needs decision';
  owner: string;
  dependency: string;
  confidence: ConfidenceLevel;
  stage: 'Propose' | 'Validate' | 'Fund' | 'In flight';
}

export interface OutcomeRecord {
  id: string;
  opportunityId: string;
  outcome: 'accepted' | 'rejected' | 'deferred' | 'contacted' | 'replied' | 'meeting' | 'pipeline';
  reason: string;
  responseHours: number | null;
  recordedAt: string;
  playbookVersion: string;
  attributionNote: string;
}

export interface GrowthMetric {
  label: string;
  value: string;
  detail: string;
  trend: string;
  tone: 'positive' | 'neutral' | 'attention';
}
