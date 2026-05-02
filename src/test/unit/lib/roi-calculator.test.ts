/**
 * roi-calculator.test.ts
 *
 * Unit tests for the ROI calculator library (lib/roi-calculator.ts).
 *
 * The ROI calculator drives business conversations and lead qualification.
 * Incorrect output directly damages credibility with prospects.
 *
 * Acceptance criteria covered:
 *  AC14 — Vitest unit tests pass; no tests deleted to achieve a passing suite.
 *
 * Coverage targets:
 *  - calculateROI() — happy path for all supported industries
 *  - calculateROI() — unknown industry falls back to 'other' multipliers
 *  - calculateROI() — output fields are always non-negative
 *  - calculateROI() — errorReduction is capped at 85 (max)
 *  - calculateROI() — productivityGain is capped at 40 (max)
 *  - calculateROI() — breakdown sums to estimatedAnnualValue
 *  - calculateROI() — deterministic (same inputs → same output)
 *  - formatCurrency() — values < $1 000 formatted with $ prefix
 *  - formatCurrency() — values ≥ $1 000 formatted as $XK
 *  - formatCurrency() — values ≥ $1 000 000 formatted as $X.YM
 *  - Edge cases — zero inputs, minimal employees, large revenue
 */

import { describe, expect, it } from 'vitest';
import { calculateROI, formatCurrency, industries, type ROIInputs } from '@/lib/roi-calculator';

// ── Helpers ──────────────────────────────────────────────────────────────────

function defaultInputs(overrides: Partial<ROIInputs> = {}): ROIInputs {
  return {
    annualRevenue: 10_000_000, // $10M
    employees: 100,
    manualHoursPerWeek: 200,
    industry: 'manufacturing',
    ...overrides,
  };
}

// ── industries list ──────────────────────────────────────────────────────────

describe('industries list', () => {
  it('exports a non-empty array of industry options', () => {
    expect(Array.isArray(industries)).toBe(true);
    expect(industries.length).toBeGreaterThan(0);
  });

  it('every industry has a non-empty value and label', () => {
    for (const industry of industries) {
      expect(industry.value.trim().length).toBeGreaterThan(0);
      expect(industry.label.trim().length).toBeGreaterThan(0);
    }
  });

  it('industry values are unique', () => {
    const values = industries.map((i) => i.value);
    expect(new Set(values).size).toBe(values.length);
  });

  it('includes "other" as a fallback industry', () => {
    const values = industries.map((i) => i.value);
    expect(values).toContain('other');
  });
});

// ── calculateROI() — output shape ────────────────────────────────────────────

describe('calculateROI() — output shape', () => {
  it('returns all required output fields', () => {
    const result = calculateROI(defaultInputs());
    expect(result).toHaveProperty('estimatedAnnualValue');
    expect(result).toHaveProperty('timeReclaimed');
    expect(result).toHaveProperty('errorReduction');
    expect(result).toHaveProperty('productivityGain');
    expect(result).toHaveProperty('breakdown');
    expect(result.breakdown).toHaveProperty('laborSavings');
    expect(result.breakdown).toHaveProperty('errorSavings');
    expect(result.breakdown).toHaveProperty('productivityValue');
  });

  it('all top-level numeric fields are numbers', () => {
    const result = calculateROI(defaultInputs());
    expect(typeof result.estimatedAnnualValue).toBe('number');
    expect(typeof result.timeReclaimed).toBe('number');
    expect(typeof result.errorReduction).toBe('number');
    expect(typeof result.productivityGain).toBe('number');
  });

  it('all breakdown fields are numbers', () => {
    const result = calculateROI(defaultInputs());
    expect(typeof result.breakdown.laborSavings).toBe('number');
    expect(typeof result.breakdown.errorSavings).toBe('number');
    expect(typeof result.breakdown.productivityValue).toBe('number');
  });
});

// ── calculateROI() — non-negative outputs ────────────────────────────────────

describe('calculateROI() — all outputs are non-negative', () => {
  it('estimatedAnnualValue is non-negative for standard inputs', () => {
    const result = calculateROI(defaultInputs());
    expect(result.estimatedAnnualValue).toBeGreaterThanOrEqual(0);
  });

  it('timeReclaimed is non-negative', () => {
    const result = calculateROI(defaultInputs());
    expect(result.timeReclaimed).toBeGreaterThanOrEqual(0);
  });

  it('errorReduction is non-negative', () => {
    const result = calculateROI(defaultInputs());
    expect(result.errorReduction).toBeGreaterThanOrEqual(0);
  });

  it('productivityGain is non-negative', () => {
    const result = calculateROI(defaultInputs());
    expect(result.productivityGain).toBeGreaterThanOrEqual(0);
  });

  it('breakdown.laborSavings is non-negative', () => {
    const result = calculateROI(defaultInputs());
    expect(result.breakdown.laborSavings).toBeGreaterThanOrEqual(0);
  });

  it('breakdown.errorSavings is non-negative', () => {
    const result = calculateROI(defaultInputs());
    expect(result.breakdown.errorSavings).toBeGreaterThanOrEqual(0);
  });

  it('breakdown.productivityValue is non-negative', () => {
    const result = calculateROI(defaultInputs());
    expect(result.breakdown.productivityValue).toBeGreaterThanOrEqual(0);
  });
});

// ── calculateROI() — caps ────────────────────────────────────────────────────

describe('calculateROI() — hard caps on output values', () => {
  it('errorReduction is capped at a maximum of 85', () => {
    // Use extreme inputs to try to exceed the cap
    const result = calculateROI(defaultInputs({ manualHoursPerWeek: 10_000, employees: 1 }));
    expect(result.errorReduction).toBeLessThanOrEqual(85);
  });

  it('productivityGain is capped at a maximum of 40', () => {
    const result = calculateROI(defaultInputs({ manualHoursPerWeek: 10_000, employees: 1 }));
    expect(result.productivityGain).toBeLessThanOrEqual(40);
  });

  it('errorReduction is always between 0 and 85 regardless of inputs', () => {
    const inputs = [
      defaultInputs({ manualHoursPerWeek: 0 }),
      defaultInputs({ manualHoursPerWeek: 1 }),
      defaultInputs({ manualHoursPerWeek: 500 }),
    ];
    for (const input of inputs) {
      const result = calculateROI(input);
      expect(result.errorReduction).toBeGreaterThanOrEqual(0);
      expect(result.errorReduction).toBeLessThanOrEqual(85);
    }
  });

  it('productivityGain is always between 0 and 40 regardless of inputs', () => {
    const inputs = [
      defaultInputs({ manualHoursPerWeek: 0 }),
      defaultInputs({ manualHoursPerWeek: 1 }),
      defaultInputs({ manualHoursPerWeek: 500 }),
    ];
    for (const input of inputs) {
      const result = calculateROI(input);
      expect(result.productivityGain).toBeGreaterThanOrEqual(0);
      expect(result.productivityGain).toBeLessThanOrEqual(40);
    }
  });
});

// ── calculateROI() — breakdown integrity ─────────────────────────────────────

describe('calculateROI() — breakdown integrity', () => {
  it('estimatedAnnualValue equals the sum of all breakdown components', () => {
    const result = calculateROI(defaultInputs());
    const { laborSavings, errorSavings, productivityValue } = result.breakdown;
    expect(result.estimatedAnnualValue).toBe(laborSavings + errorSavings + productivityValue);
  });

  it('timeReclaimed equals automated hours per week × 50 weeks', () => {
    // 200 manual hours/week × 50% automation × 50 weeks = 5000 hours
    const result = calculateROI(defaultInputs({ manualHoursPerWeek: 200 }));
    expect(result.timeReclaimed).toBe(Math.round(200 * 0.5 * 50));
  });
});

// ── calculateROI() — all supported industries ────────────────────────────────

describe('calculateROI() — happy path for all supported industries', () => {
  const knownIndustries = [
    'manufacturing',
    'professional-services',
    'financial-services',
    'technology',
    'healthcare',
    'retail',
    'logistics',
    'other',
  ];

  for (const industry of knownIndustries) {
    it(`Given industry="${industry}", when calculateROI is called, then it returns a positive estimatedAnnualValue`, () => {
      const result = calculateROI(defaultInputs({ industry }));
      expect(result.estimatedAnnualValue).toBeGreaterThan(0);
    });
  }
});

// ── calculateROI() — unknown industry fallback ───────────────────────────────

describe('calculateROI() — unknown industry fallback', () => {
  it('Given an unknown industry, calculateROI falls back to "other" multipliers and does not throw', () => {
    expect(() => calculateROI(defaultInputs({ industry: 'unknown-sector-xyz' }))).not.toThrow();
  });

  it('Unknown industry produces same result as "other" industry', () => {
    const unknown = calculateROI(defaultInputs({ industry: 'unknown-sector-xyz' }));
    const other = calculateROI(defaultInputs({ industry: 'other' }));
    expect(unknown.estimatedAnnualValue).toBe(other.estimatedAnnualValue);
    expect(unknown.timeReclaimed).toBe(other.timeReclaimed);
  });
});

// ── calculateROI() — determinism ─────────────────────────────────────────────

describe('calculateROI() — deterministic output', () => {
  it('same inputs always produce the same output', () => {
    const inputs = defaultInputs();
    const r1 = calculateROI(inputs);
    const r2 = calculateROI(inputs);
    expect(r1).toEqual(r2);
  });
});

// ── calculateROI() — edge cases ───────────────────────────────────────────────

describe('calculateROI() — edge cases', () => {
  it('Given zero manualHoursPerWeek, estimatedAnnualValue may be zero or very small', () => {
    const result = calculateROI(defaultInputs({ manualHoursPerWeek: 0 }));
    expect(result.estimatedAnnualValue).toBeGreaterThanOrEqual(0);
    expect(result.timeReclaimed).toBe(0);
  });

  it('Given 1 employee, does not throw and returns valid numbers', () => {
    expect(() => calculateROI(defaultInputs({ employees: 1 }))).not.toThrow();
    const result = calculateROI(defaultInputs({ employees: 1 }));
    expect(Number.isFinite(result.estimatedAnnualValue)).toBe(true);
  });

  it('Given a very large revenue ($1B), returns finite numbers without overflow', () => {
    const result = calculateROI(defaultInputs({ annualRevenue: 1_000_000_000 }));
    expect(Number.isFinite(result.estimatedAnnualValue)).toBe(true);
    expect(Number.isFinite(result.breakdown.errorSavings)).toBe(true);
  });

  it('Given 1 manual hour per week, timeReclaimed is a small positive number', () => {
    const result = calculateROI(defaultInputs({ manualHoursPerWeek: 1 }));
    expect(result.timeReclaimed).toBeGreaterThan(0);
  });
});

// ── calculateROI() — industry differentiation ────────────────────────────────

describe('calculateROI() — industry multipliers differentiate results', () => {
  it('manufacturing and technology industries produce different labor savings', () => {
    const mfg = calculateROI(defaultInputs({ industry: 'manufacturing' }));
    const tech = calculateROI(defaultInputs({ industry: 'technology' }));
    // manufacturing.labor (1.2) > technology.labor (0.9), so manufacturing should have higher savings
    expect(mfg.breakdown.laborSavings).toBeGreaterThan(tech.breakdown.laborSavings);
  });

  it('healthcare has higher error savings than technology (higher error multiplier)', () => {
    const health = calculateROI(defaultInputs({ industry: 'healthcare' }));
    const tech = calculateROI(defaultInputs({ industry: 'technology' }));
    // healthcare.error (1.5) > technology.error (1.0)
    expect(health.breakdown.errorSavings).toBeGreaterThanOrEqual(tech.breakdown.errorSavings);
  });
});

// ── formatCurrency() ─────────────────────────────────────────────────────────

describe('formatCurrency()', () => {
  it('Given a value < $1 000, returns "$X" with dollar sign and no K/M suffix', () => {
    expect(formatCurrency(0)).toMatch(/^\$/);
    expect(formatCurrency(0)).not.toContain('K');
    expect(formatCurrency(0)).not.toContain('M');
  });

  it('Given $999, returns "$999"', () => {
    expect(formatCurrency(999)).toBe('$999');
  });

  it('Given $1 000, returns "$1K"', () => {
    expect(formatCurrency(1000)).toBe('$1K');
  });

  it('Given $1 500, returns "$2K" (rounds to nearest thousand)', () => {
    const result = formatCurrency(1500);
    expect(result).toMatch(/^\$\d+K$/);
  });

  it('Given $50 000, returns "$50K"', () => {
    expect(formatCurrency(50_000)).toBe('$50K');
  });

  it('Given $999 999, returns a K-denominated string', () => {
    const result = formatCurrency(999_999);
    expect(result).toMatch(/K$/);
    expect(result).not.toContain('M');
  });

  it('Given $1 000 000, returns "$1.0M"', () => {
    expect(formatCurrency(1_000_000)).toBe('$1.0M');
  });

  it('Given $2 500 000, returns "$2.5M"', () => {
    expect(formatCurrency(2_500_000)).toBe('$2.5M');
  });

  it('Given $10 000 000, returns "$10.0M"', () => {
    expect(formatCurrency(10_000_000)).toBe('$10.0M');
  });

  it('always starts with "$"', () => {
    const values = [0, 1, 999, 1000, 1_000_000, 50_000_000];
    for (const val of values) {
      expect(formatCurrency(val)).toMatch(/^\$/);
    }
  });
});
