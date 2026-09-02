import { describe, expect, it } from 'vitest';
import {
  calculateOpportunityPriority,
  formatCurrencyRange,
  isSignalStale,
  priorityBand,
} from '@/lib/revenue-ops/scoring';

const strongInputs = {
  icpFit: 0.9,
  timing: 0.88,
  expectedValue: 0.8,
  reachability: 0.72,
  confidence: 0.84,
  strategicAlignment: 0.86,
};

describe('revenue opportunity scoring', () => {
  it('returns an explainable 0–100 priority score', () => {
    const score = calculateOpportunityPriority(strongInputs);
    expect(score).toBeGreaterThanOrEqual(75);
    expect(score).toBeLessThanOrEqual(100);
  });

  it('makes a weak constraint materially lower the score', () => {
    const highAccess = calculateOpportunityPriority(strongInputs);
    const lowAccess = calculateOpportunityPriority({ ...strongInputs, reachability: 0.03 });
    expect(lowAccess).toBeLessThan(highAccess - 20);
  });

  it('assigns stable priority bands', () => {
    expect(priorityBand(72)).toBe('High');
    expect(priorityBand(71)).toBe('Medium');
    expect(priorityBand(52)).toBe('Low');
  });

  it('recognizes stale evidence and formats commercial ranges', () => {
    expect(isSignalStale('2026-08-01T00:00:00Z', new Date('2026-08-08T00:00:00Z'))).toBe(true);
    expect(isSignalStale('2026-08-10T00:00:00Z', new Date('2026-08-08T00:00:00Z'))).toBe(false);
    expect(formatCurrencyRange(120000, 240000)).toBe('$120,000–$240,000');
  });
});
