/**
 * scoring.test.ts
 *
 * Unit tests for lib/assessment/scoring.ts
 *
 * AC-13: All unit tests pass with ≥ 80% coverage on new utility functions,
 *        animation helper hooks, and form validation logic.
 *
 * Covers:
 *  - completionPercentage() — question answer progress calculation
 *  - maturityLabel()        — human-readable level labels
 *  - maturityColor()        — teal-toned CSS hex colors per level
 *  - validateBusinessContext() — required-field validation, email format,
 *                                challenge min-length, optional website URL
 */

import { describe, expect, it } from 'vitest';
import {
  completionPercentage,
  maturityColor,
  maturityLabel,
  validateBusinessContext,
} from '@/lib/assessment/scoring';

// ─────────────────────────────────────────────────────────────────────────────
// completionPercentage
// ─────────────────────────────────────────────────────────────────────────────

describe('completionPercentage', () => {
  // Given: an 18-question assessment, When: all questions are answered,
  // Then: returns 100
  it('returns 100 when all questions are answered', () => {
    const answers: Record<number, number> = {};
    for (let i = 1; i <= 18; i++) answers[i] = 3;
    expect(completionPercentage(answers, 18)).toBe(100);
  });

  // Given: an 18-question assessment, When: no questions are answered,
  // Then: returns 0
  it('returns 0 when no questions are answered', () => {
    expect(completionPercentage({}, 18)).toBe(0);
  });

  // Given: 18 questions total, When: 9 are answered, Then: returns 50
  it('returns 50 for half-answered questions', () => {
    const answers: Record<number, number> = {};
    for (let i = 1; i <= 9; i++) answers[i] = 4;
    expect(completionPercentage(answers, 18)).toBe(50);
  });

  // Given: 18 questions, When: 1 is answered, Then: returns 6 (rounds from 5.55…)
  it('rounds to nearest integer', () => {
    const answers = { 1: 3 };
    const result = completionPercentage(answers, 18);
    expect(result).toBe(6);
    expect(Number.isInteger(result)).toBe(true);
  });

  // Edge case: When: 3 of 18 answered, Then: returns 17 (rounds 16.67)
  it('rounds 3/18 correctly to 17', () => {
    const answers = { 1: 3, 2: 4, 3: 2 };
    expect(completionPercentage(answers, 18)).toBe(17);
  });

  // Edge case: When: totalQuestions is 1 and 1 is answered, Then: returns 100
  it('handles single-question assessment fully answered', () => {
    expect(completionPercentage({ 1: 5 }, 1)).toBe(100);
  });

  // Edge case: When: totalQuestions is 1 and none answered, Then: returns 0
  it('handles single-question assessment unanswered', () => {
    expect(completionPercentage({}, 1)).toBe(0);
  });

  // Edge case: answer values do not affect count, only keys matter
  it('counts answer keys regardless of value', () => {
    const answers = { 1: 0, 2: 0, 3: 0 };
    expect(completionPercentage(answers, 18)).toBe(17);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// maturityLabel
// ─────────────────────────────────────────────────────────────────────────────

describe('maturityLabel', () => {
  // Given: a recognized maturity level string, When: passed to maturityLabel,
  // Then: a human-readable stage label is returned

  it('returns "Foundation Stage" for Foundation', () => {
    expect(maturityLabel('Foundation')).toBe('Foundation Stage');
  });

  it('returns "Emerging Stage" for Emerging', () => {
    expect(maturityLabel('Emerging')).toBe('Emerging Stage');
  });

  it('returns "Developing Stage" for Developing', () => {
    expect(maturityLabel('Developing')).toBe('Developing Stage');
  });

  it('returns "Advanced Stage" for Advanced', () => {
    expect(maturityLabel('Advanced')).toBe('Advanced Stage');
  });

  it('returns "AI Leader" for Leader', () => {
    expect(maturityLabel('Leader')).toBe('AI Leader');
  });

  // Edge case: unknown level falls back to the raw string
  it('returns the raw string for unrecognised levels', () => {
    expect(maturityLabel('Unknown')).toBe('Unknown');
    expect(maturityLabel('')).toBe('');
    expect(maturityLabel('intermediate')).toBe('intermediate');
  });

  // All five canonical levels produce non-empty labels
  it('all canonical levels produce non-empty labels', () => {
    for (const level of ['Foundation', 'Emerging', 'Developing', 'Advanced', 'Leader']) {
      expect(maturityLabel(level).length).toBeGreaterThan(0);
    }
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// maturityColor
// ─────────────────────────────────────────────────────────────────────────────

describe('maturityColor', () => {
  // Given: a recognized maturity level, When: passed to maturityColor,
  // Then: a CSS hex color is returned

  it('returns a hex color for Foundation', () => {
    const color = maturityColor('Foundation');
    expect(color).toMatch(/^#[0-9A-Fa-f]{6}$/);
  });

  it('returns a hex color for Emerging', () => {
    const color = maturityColor('Emerging');
    expect(color).toMatch(/^#[0-9A-Fa-f]{6}$/);
  });

  it('returns a hex color for Developing', () => {
    const color = maturityColor('Developing');
    expect(color).toMatch(/^#[0-9A-Fa-f]{6}$/);
  });

  it('returns a hex color for Advanced', () => {
    const color = maturityColor('Advanced');
    expect(color).toMatch(/^#[0-9A-Fa-f]{6}$/);
  });

  it('returns a hex color for Leader', () => {
    const color = maturityColor('Leader');
    expect(color).toMatch(/^#[0-9A-Fa-f]{6}$/);
  });

  it('returns the teal fallback (#00E5C3) for unknown levels', () => {
    expect(maturityColor('Unknown')).toBe('#00E5C3');
    expect(maturityColor('')).toBe('#00E5C3');
  });

  // Levels produce distinct colors to visually differentiate maturity
  it('all five canonical levels produce distinct colors', () => {
    const levels = ['Foundation', 'Emerging', 'Developing', 'Advanced', 'Leader'];
    const colors = levels.map((l) => maturityColor(l));
    const unique = new Set(colors);
    expect(unique.size).toBe(5);
  });

  // Lower maturity (Foundation) should be a muted/grey tone
  it('Foundation has a subdued slate color', () => {
    expect(maturityColor('Foundation')).toBe('#475569');
  });

  // Leader should be the vibrant teal brand color
  it('Leader has the vibrant teal brand color', () => {
    expect(maturityColor('Leader')).toBe('#00E5C3');
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// validateBusinessContext
// ─────────────────────────────────────────────────────────────────────────────

describe('validateBusinessContext', () => {
  /** A fully-valid business context used as a baseline */
  const validCtx = {
    name: 'James Penz',
    email: 'james@clearforge.ai',
    company: 'ClearForge AI',
    industry: 'Technology',
    role: 'CEO',
    challenge: 'We need to automate our sales pipeline with AI tooling.',
  };

  // Given: all required fields are present and valid,
  // When: validateBusinessContext is called,
  // Then: returns an empty array (no invalid fields)
  it('returns [] for a fully valid context', () => {
    expect(validateBusinessContext(validCtx)).toEqual([]);
  });

  // ── Required field checks ────────────────────────────────────────────────

  it('flags missing name', () => {
    const ctx = { ...validCtx, name: '' };
    expect(validateBusinessContext(ctx)).toContain('name');
  });

  it('flags whitespace-only name', () => {
    const ctx = { ...validCtx, name: '   ' };
    expect(validateBusinessContext(ctx)).toContain('name');
  });

  it('flags missing email', () => {
    const ctx = { ...validCtx, email: '' };
    expect(validateBusinessContext(ctx)).toContain('email');
  });

  it('flags missing company', () => {
    const ctx = { ...validCtx, company: '' };
    expect(validateBusinessContext(ctx)).toContain('company');
  });

  it('flags missing industry', () => {
    const ctx = { ...validCtx, industry: '' };
    expect(validateBusinessContext(ctx)).toContain('industry');
  });

  it('flags missing role', () => {
    const ctx = { ...validCtx, role: '' };
    expect(validateBusinessContext(ctx)).toContain('role');
  });

  it('flags missing challenge', () => {
    const ctx = { ...validCtx, challenge: '' };
    expect(validateBusinessContext(ctx)).toContain('challenge');
  });

  it('flags undefined required fields', () => {
    const ctx = { ...validCtx, name: undefined };
    expect(validateBusinessContext(ctx)).toContain('name');
  });

  // ── Email format validation ──────────────────────────────────────────────

  it('flags invalid email missing @ symbol', () => {
    const ctx = { ...validCtx, email: 'notanemail.com' };
    expect(validateBusinessContext(ctx)).toContain('email');
  });

  it('flags invalid email missing domain', () => {
    const ctx = { ...validCtx, email: 'user@' };
    expect(validateBusinessContext(ctx)).toContain('email');
  });

  it('flags invalid email missing TLD', () => {
    const ctx = { ...validCtx, email: 'user@domain' };
    expect(validateBusinessContext(ctx)).toContain('email');
  });

  it('accepts valid email addresses', () => {
    const emails = ['james@clearforge.ai', 'user.name+tag@example.co.uk', 'test123@sub.domain.com'];
    for (const email of emails) {
      const result = validateBusinessContext({ ...validCtx, email });
      expect(result, `email "${email}" should be valid`).not.toContain('email');
    }
  });

  it('does not double-add email when both empty and malformed', () => {
    // If email is empty it's already flagged; shouldn't appear twice
    const ctx = { ...validCtx, email: '' };
    const result = validateBusinessContext(ctx);
    expect(result.filter((f) => f === 'email')).toHaveLength(1);
  });

  // ── Challenge minimum length ─────────────────────────────────────────────

  it('flags challenge shorter than 20 characters', () => {
    const ctx = { ...validCtx, challenge: 'Too short.' };
    expect(validateBusinessContext(ctx)).toContain('challenge');
  });

  it('flags challenge with exactly 19 characters', () => {
    const ctx = { ...validCtx, challenge: 'Nineteen chars here' }; // 19 chars
    expect(validateBusinessContext(ctx)).toContain('challenge');
  });

  it('accepts challenge with exactly 20 characters', () => {
    const ctx = { ...validCtx, challenge: 'Twenty characters!!!' }; // 20 chars
    expect(validateBusinessContext(ctx)).not.toContain('challenge');
  });

  it('accepts challenge longer than 20 characters', () => {
    const ctx = {
      ...validCtx,
      challenge: 'We need to automate our entire sales pipeline end-to-end.',
    };
    expect(validateBusinessContext(ctx)).not.toContain('challenge');
  });

  it('does not double-add challenge when empty and under 20 chars', () => {
    const ctx = { ...validCtx, challenge: '' };
    const result = validateBusinessContext(ctx);
    expect(result.filter((f) => f === 'challenge')).toHaveLength(1);
  });

  // ── Optional website URL validation ─────────────────────────────────────

  it('accepts a valid http URL for website', () => {
    const ctx = { ...validCtx, website: 'http://clearforge.ai' };
    expect(validateBusinessContext(ctx)).not.toContain('website');
  });

  it('accepts a valid https URL for website', () => {
    const ctx = { ...validCtx, website: 'https://clearforge.ai' };
    expect(validateBusinessContext(ctx)).not.toContain('website');
  });

  it('accepts a bare domain (auto-prefixes https)', () => {
    const ctx = { ...validCtx, website: 'clearforge.ai' };
    expect(validateBusinessContext(ctx)).not.toContain('website');
  });

  it('flags an obviously invalid website URL', () => {
    const ctx = { ...validCtx, website: 'not a url !!!' };
    expect(validateBusinessContext(ctx)).toContain('website');
  });

  it('skips website validation when website is undefined', () => {
    const ctx = { ...validCtx, website: undefined };
    expect(validateBusinessContext(ctx)).not.toContain('website');
  });

  it('skips website validation when website is empty string', () => {
    const ctx = { ...validCtx, website: '' };
    expect(validateBusinessContext(ctx)).not.toContain('website');
  });

  it('skips website validation when website is whitespace only', () => {
    const ctx = { ...validCtx, website: '   ' };
    expect(validateBusinessContext(ctx)).not.toContain('website');
  });

  // ── Multiple simultaneous errors ─────────────────────────────────────────

  it('reports multiple invalid fields at once', () => {
    const ctx = {
      name: '',
      email: 'bad-email',
      company: '',
      industry: '',
      role: '',
      challenge: 'Short',
    };
    const result = validateBusinessContext(ctx);
    expect(result).toContain('name');
    expect(result).toContain('email');
    expect(result).toContain('company');
    expect(result).toContain('industry');
    expect(result).toContain('role');
    expect(result).toContain('challenge');
  });

  it('returns an array (never a non-array value)', () => {
    expect(Array.isArray(validateBusinessContext(validCtx))).toBe(true);
    expect(Array.isArray(validateBusinessContext({}))).toBe(true);
  });

  // ── phone is optional — never flagged ───────────────────────────────────

  it('never flags missing phone (it is optional)', () => {
    const ctxWithoutPhone = { ...validCtx };
    expect(validateBusinessContext(ctxWithoutPhone)).not.toContain('phone');
  });
});
