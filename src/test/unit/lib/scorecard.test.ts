/**
 * scorecard.test.ts
 *
 * Unit tests for the AI Readiness Scorecard engine.
 * This is the core business logic — users fill this out and get a personalized
 * roadmap. Getting scores and tiers right directly affects lead quality.
 *
 * Coverage targets:
 *  - calculateResults() — weighted pillar scoring + composite
 *  - Tier classification — Starter / Developing / Advanced / Leader
 *  - getQuestionsForPillar() — question filtering
 *  - pillar weights sum to 1.0 — data integrity
 *  - Roadmap generation — weakest-pillar-first logic
 *  - Edge cases — all 1s, all 5s, missing answers
 */

import { describe, expect, it } from 'vitest';
import {
  type Answers,
  calculateResults,
  getQuestionsForPillar,
  pillars,
  questions,
} from '@/lib/scorecard';

// ── Helpers ────────────────────────────────────────────────────────────────

/** Build answers with a uniform score for all questions */
function uniformAnswers(score: number): Answers {
  return Object.fromEntries(questions.map((q) => [q.id, score]));
}

/** Build answers with per-pillar overrides */
function answersWithPillarScore(
  defaultScore: number,
  pillarOverrides: Partial<Record<string, number>>,
): Answers {
  return Object.fromEntries(
    questions.map((q) => [q.id, pillarOverrides[q.pillar] ?? defaultScore]),
  );
}

// ── Pillar integrity ────────────────────────────────────────────────────────

describe('pillars', () => {
  it('has exactly 5 pillars', () => {
    expect(pillars).toHaveLength(5);
  });

  it('weights sum to exactly 1.0', () => {
    const total = pillars.reduce((sum, p) => sum + p.weight, 0);
    expect(total).toBeCloseTo(1.0, 5);
  });

  it('every pillar has a non-empty name and description', () => {
    for (const pillar of pillars) {
      expect(pillar.name.length).toBeGreaterThan(0);
      expect(pillar.description.length).toBeGreaterThan(0);
    }
  });

  it('all pillar keys are unique', () => {
    const keys = pillars.map((p) => p.key);
    expect(new Set(keys).size).toBe(keys.length);
  });
});

// ── Question integrity ──────────────────────────────────────────────────────

describe('questions', () => {
  it('has at least 15 questions', () => {
    expect(questions.length).toBeGreaterThanOrEqual(15);
  });

  it('all question IDs are unique', () => {
    const ids = questions.map((q) => q.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('all questions reference a valid pillar key', () => {
    const validKeys = new Set(pillars.map((p) => p.key));
    for (const q of questions) {
      expect(validKeys.has(q.pillar), `Question ${q.id} has invalid pillar: ${q.pillar}`).toBe(
        true,
      );
    }
  });

  it('every pillar has at least one question', () => {
    for (const pillar of pillars) {
      const pillarQs = questions.filter((q) => q.pillar === pillar.key);
      expect(pillarQs.length, `Pillar "${pillar.key}" has no questions`).toBeGreaterThan(0);
    }
  });
});

// ── getQuestionsForPillar ───────────────────────────────────────────────────

describe('getQuestionsForPillar()', () => {
  it('returns only questions for the given pillar', () => {
    const dataQs = getQuestionsForPillar('data');
    expect(dataQs.every((q) => q.pillar === 'data')).toBe(true);
  });

  it('returns a non-empty array for every valid pillar key', () => {
    for (const pillar of pillars) {
      const qs = getQuestionsForPillar(pillar.key);
      expect(qs.length).toBeGreaterThan(0);
    }
  });

  it('all pillar questions together equal the full question set', () => {
    const allFromPillars = pillars.flatMap((p) => getQuestionsForPillar(p.key));
    expect(allFromPillars.length).toBe(questions.length);
  });
});

// ── Maturity levels ────────────────────────────────────────────────────────
// Foundation (≤35) | Emerging (≤50) | Developing (≤65) | Advanced (≤80) | Leader (>80)
const VALID_MATURITY_LEVELS = ['Foundation', 'Emerging', 'Developing', 'Advanced', 'Leader'];

// ── calculateResults() — maturity level classification ──────────────────────

describe('calculateResults() — maturity level classification', () => {
  it('returns "Foundation" maturity when all answers are 1 (minimum)', () => {
    const result = calculateResults(uniformAnswers(1));
    // All 1s → composite ~20 → "Foundation"
    expect(result.maturityLevel).toBe('Foundation');
    expect(result.compositeScore).toBeLessThanOrEqual(35);
  });

  it('returns "Leader" maturity when all answers are 5 (maximum)', () => {
    const result = calculateResults(uniformAnswers(5));
    expect(result.maturityLevel).toBe('Leader');
    expect(result.compositeScore).toBeGreaterThan(80);
  });

  it('returns a valid maturity level for mid-range answers (score 3)', () => {
    const result = calculateResults(uniformAnswers(3));
    expect(VALID_MATURITY_LEVELS).toContain(result.maturityLevel);
  });

  it('maturityLevel is always one of the 5 valid levels', () => {
    for (const score of [1, 2, 3, 4, 5]) {
      const result = calculateResults(uniformAnswers(score));
      expect(
        VALID_MATURITY_LEVELS,
        `Score ${score} produced unexpected level: ${result.maturityLevel}`,
      ).toContain(result.maturityLevel);
    }
  });

  it('segment is A+, A, B, C, or D matching maturity', () => {
    const validSegments = ['A+', 'A', 'B', 'C', 'D'];
    for (const score of [1, 2, 3, 4, 5]) {
      const result = calculateResults(uniformAnswers(score));
      expect(validSegments, `Unexpected segment "${result.segment}" for score ${score}`).toContain(
        result.segment,
      );
    }
  });

  it('composite score is always between 0 and 100', () => {
    for (const score of [1, 2, 3, 4, 5]) {
      const result = calculateResults(uniformAnswers(score));
      expect(result.compositeScore).toBeGreaterThanOrEqual(0);
      expect(result.compositeScore).toBeLessThanOrEqual(100);
    }
  });

  it('higher uniform answers always produce higher composite scores', () => {
    const scores = [1, 2, 3, 4, 5].map((s) => calculateResults(uniformAnswers(s)).compositeScore);
    for (let i = 1; i < scores.length; i++) {
      expect(scores[i]).toBeGreaterThan(scores[i - 1]);
    }
  });

  it('result includes a non-empty recommendation and recommendedService', () => {
    const result = calculateResults(uniformAnswers(3));
    expect(result.recommendation.length).toBeGreaterThan(0);
    expect(result.recommendedService.length).toBeGreaterThan(0);
  });

  it('weakestPillar and strongestPillar are valid pillar keys', () => {
    const validKeys = new Set(pillars.map((p) => p.key));
    const result = calculateResults(uniformAnswers(3));
    expect(validKeys.has(result.weakestPillar)).toBe(true);
    expect(validKeys.has(result.strongestPillar)).toBe(true);
  });
});

// ── calculateResults() — pillar scores ─────────────────────────────────────

describe('calculateResults() — pillar scores', () => {
  it('returns a pillar score for every pillar', () => {
    const result = calculateResults(uniformAnswers(3));
    expect(result.pillarScores).toHaveLength(pillars.length);
    const keys = result.pillarScores.map((p) => p.key);
    for (const pillar of pillars) {
      expect(keys).toContain(pillar.key);
    }
  });

  it('pillar percentages are between 0 and 100', () => {
    const result = calculateResults(uniformAnswers(3));
    for (const ps of result.pillarScores) {
      expect(ps.percentage).toBeGreaterThanOrEqual(0);
      expect(ps.percentage).toBeLessThanOrEqual(100);
    }
  });

  it('a weak data pillar (score 1) produces a low data pillar percentage', () => {
    const answers = answersWithPillarScore(5, { data: 1 });
    const result = calculateResults(answers);
    const dataScore = result.pillarScores.find((p) => p.key === 'data');
    const otherAvg =
      result.pillarScores
        .filter((p) => p.key !== 'data')
        .reduce((sum, p) => sum + p.percentage, 0) / 4;
    expect(dataScore!.percentage).toBeLessThan(otherAvg);
  });

  it('a strong strategy pillar (score 5) produces a high strategy percentage', () => {
    const answers = answersWithPillarScore(1, { strategy: 5 });
    const result = calculateResults(answers);
    const strategyScore = result.pillarScores.find((p) => p.key === 'strategy');
    const otherAvg =
      result.pillarScores
        .filter((p) => p.key !== 'strategy')
        .reduce((sum, p) => sum + p.percentage, 0) / 4;
    expect(strategyScore!.percentage).toBeGreaterThan(otherAvg);
  });
});

// ── calculateResults() — roadmap ───────────────────────────────────────────

describe('calculateResults() — roadmap', () => {
  it('always starts with Phase 1 (Diagnosis)', () => {
    const result = calculateResults(uniformAnswers(3));
    expect(result.roadmap[0].phase).toBe('Phase 1');
  });

  it('roadmap has at least 3 phases', () => {
    const result = calculateResults(uniformAnswers(2));
    expect(result.roadmap.length).toBeGreaterThanOrEqual(3);
  });

  it('roadmap phases are in order', () => {
    const result = calculateResults(uniformAnswers(3));
    result.roadmap.forEach((step, i) => {
      expect(step.phase).toBe(`Phase ${i + 1}`);
    });
  });

  it('when data + process pillars are weak, roadmap includes data/process phase', () => {
    const answers = answersWithPillarScore(5, { data: 1, process: 1 });
    const result = calculateResults(answers);
    const titles = result.roadmap.map((s) => s.title.toLowerCase());
    const hasDataOrProcess = titles.some(
      (t) => t.includes('data') || t.includes('process') || t.includes('foundation'),
    );
    expect(hasDataOrProcess).toBe(true);
  });

  it('each roadmap step has a title, description, and timeline', () => {
    const result = calculateResults(uniformAnswers(3));
    for (const step of result.roadmap) {
      expect(step.title.length).toBeGreaterThan(0);
      expect(step.description.length).toBeGreaterThan(0);
      expect(step.timeline.length).toBeGreaterThan(0);
    }
  });
});

// ── calculateResults() — edge cases ───────────────────────────────────────

describe('calculateResults() — edge cases', () => {
  it('handles empty answers object without throwing', () => {
    expect(() => calculateResults({})).not.toThrow();
  });

  it('handles partially-filled answers (only some questions answered)', () => {
    const partial: Answers = { 1: 5, 2: 4, 3: 3 };
    const result = calculateResults(partial);
    expect(result.compositeScore).toBeGreaterThanOrEqual(0);
    expect(result.compositeScore).toBeLessThanOrEqual(100);
    expect(result.maturityLevel).toBeTruthy();
  });

  it('consistent results — same inputs always produce same output', () => {
    const answers = uniformAnswers(3);
    const r1 = calculateResults(answers);
    const r2 = calculateResults(answers);
    expect(r1.compositeScore).toBe(r2.compositeScore);
    expect(r1.maturityLevel).toBe(r2.maturityLevel);
  });
});
