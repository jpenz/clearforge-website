/**
 * content-quality.test.ts
 *
 * Guards the high-visibility marketing data against obvious AI-slop phrases.
 * This does not replace editorial judgment; it catches the terms we have
 * explicitly removed from buyer-facing copy.
 */

import { describe, expect, it } from 'vitest';
import { caseStudies } from '@/data/case-studies';
import { industries } from '@/data/industries-value-chains';
import { services } from '@/data/services';
import { useCases } from '@/data/use-cases';

const bannedPatterns = [
  /\bAI machine\b/i,
  /\boperating machine\b/i,
  /\bhighest-leverage\b/i,
  /\b3-5x ROI\b/i,
  /\b100x speed\b/i,
  /\bexponentially smarter\b/i,
  /\bworld-class\b/i,
  /\bsupercharge\b/i,
  /\bgame[- ]changer\b/i,
  /\bparadigm\b/i,
  /\bsynergy\b/i,
];

function collectStrings(value: unknown, path = 'root'): { path: string; text: string }[] {
  if (typeof value === 'string') return [{ path, text: value }];
  if (!value || typeof value !== 'object') return [];

  if (Array.isArray(value)) {
    return value.flatMap((item, index) => collectStrings(item, `${path}[${index}]`));
  }

  return Object.entries(value).flatMap(([key, item]) => collectStrings(item, `${path}.${key}`));
}

describe('buyer-facing content quality', () => {
  it('does not reintroduce obvious AI-slop phrases', () => {
    const corpus = {
      caseStudies,
      industries,
      services,
      useCases,
    };

    const offenders = collectStrings(corpus)
      .map(({ path, text }) => {
        const match = bannedPatterns.find((pattern) => pattern.test(text));
        return match ? `${path}: ${match.source} -> ${text}` : null;
      })
      .filter(Boolean);

    expect(offenders).toEqual([]);
  });
});
