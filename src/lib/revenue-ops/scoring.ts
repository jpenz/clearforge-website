import type {
  ConfidenceLevel,
  OpportunityScoreKey,
  PriorityInputs,
  PriorityWeights,
} from './types';

export const DEFAULT_PRIORITY_WEIGHTS: PriorityWeights = {
  icpFit: 0.23,
  timing: 0.21,
  expectedValue: 0.19,
  reachability: 0.14,
  confidence: 0.13,
  strategicAlignment: 0.1,
};

export const PRIORITY_LABELS = {
  icpFit: 'ICP fit',
  timing: 'Timing & signal strength',
  expectedValue: 'Expected value',
  reachability: 'Reachability',
  confidence: 'Evidence confidence',
  strategicAlignment: 'Strategic alignment',
} as const;

function clampUnit(value: number): number {
  return Math.min(1, Math.max(0, value));
}

/**
 * A weighted geometric mean keeps any weak commercial constraint visible:
 * a high-value opportunity cannot outrank its lack of evidence or access.
 * Inputs are normalized 0–1, and the returned score is 0–100.
 */
export function calculateOpportunityPriority(
  inputs: PriorityInputs,
  weights: PriorityWeights = DEFAULT_PRIORITY_WEIGHTS,
): number {
  const keys = Object.keys(weights) as OpportunityScoreKey[];
  const totalWeight = keys.reduce((total, key) => total + weights[key], 0);
  if (totalWeight <= 0) return 0;

  const logTotal = keys.reduce(
    (total, key) => total + weights[key] * Math.log(Math.max(clampUnit(inputs[key]), 0.01)),
    0,
  );

  return Math.round(Math.exp(logTotal / totalWeight) * 100);
}

export function priorityBand(score: number): 'High' | 'Medium' | 'Low' {
  if (score >= 72) return 'High';
  if (score >= 53) return 'Medium';
  return 'Low';
}

export function confidenceLevel(value: number): ConfidenceLevel {
  if (value >= 0.75) return 'high';
  if (value >= 0.5) return 'medium';
  return 'low';
}

export function isSignalStale(decayAt: string, now = new Date()): boolean {
  return new Date(decayAt).getTime() < now.getTime();
}

export function formatCurrencyRange(low: number, high: number): string {
  const format = (value: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
      notation: value >= 1_000_000 ? 'compact' : 'standard',
    }).format(value);

  return `${format(low)}–${format(high)}`;
}
