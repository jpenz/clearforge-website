/**
 * Assessment scoring utilities.
 *
 * The canonical `calculateResults` function lives in `@/lib/scorecard`.
 * This module re-exports it alongside helpers used by the new UI components.
 */

export type {
  Answers,
  PillarKey,
  PillarScore,
  RoadmapStep,
  ScorecardResult,
} from '@/lib/scorecard';
export {
  calculateResults,
  getQuestionsForPillar,
  pillars,
  questions,
  scaleLabels,
} from '@/lib/scorecard';

/**
 * Returns the percentage of questions answered for a given set of answers
 * relative to the total question count.
 */
export function completionPercentage(
  answers: Record<number, number>,
  totalQuestions: number,
): number {
  const answered = Object.keys(answers).length;
  return Math.round((answered / totalQuestions) * 100);
}

/**
 * Returns a human-readable label for a maturity level string.
 */
export function maturityLabel(level: string): string {
  const labels: Record<string, string> = {
    Foundation: 'Foundation Stage',
    Emerging: 'Emerging Stage',
    Developing: 'Developing Stage',
    Advanced: 'Advanced Stage',
    Leader: 'AI Leader',
  };
  return labels[level] ?? level;
}

/**
 * Returns a teal-toned CSS hex color matching the maturity level.
 */
export function maturityColor(level: string): string {
  const colors: Record<string, string> = {
    Foundation: '#475569',
    Emerging: '#0891B2',
    Developing: '#059669',
    Advanced: '#059E87',
    Leader: '#00E5C3',
  };
  return colors[level] ?? '#00E5C3';
}

/**
 * Validates that all required fields in the business context are filled.
 * Returns an array of field names that are invalid.
 */
export function validateBusinessContext(ctx: Record<string, string | undefined>): string[] {
  const required = ['name', 'email', 'company', 'industry', 'role', 'challenge'];
  const invalid: string[] = [];

  for (const field of required) {
    const value = ctx[field];
    if (!value || value.trim().length === 0) {
      invalid.push(field);
    }
  }

  const email = ctx['email'];
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    if (!invalid.includes('email')) invalid.push('email');
  }

  const challenge = ctx['challenge'];
  if (challenge && challenge.trim().length < 20) {
    if (!invalid.includes('challenge')) invalid.push('challenge');
  }

  const website = ctx['website'];
  if (website && website.trim().length > 0) {
    try {
      new URL(website.trim().startsWith('http') ? website.trim() : `https://${website.trim()}`);
    } catch {
      invalid.push('website');
    }
  }

  return invalid;
}
