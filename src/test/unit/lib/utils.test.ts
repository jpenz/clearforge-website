/**
 * utils.test.ts
 *
 * Tests for shared utility functions.
 * cn() is used in virtually every component — if it breaks, the whole UI breaks.
 */

import { describe, expect, it } from 'vitest';
import { cn } from '@/lib/utils';

describe('cn() — className merger', () => {
  it('merges two class strings', () => {
    expect(cn('px-4', 'py-2')).toBe('px-4 py-2');
  });

  it('resolves Tailwind conflicts — last value wins', () => {
    // Tailwind-merge: px-4 then px-6 → px-6
    expect(cn('px-4', 'px-6')).toBe('px-6');
  });

  it('handles conditional classes with falsy values', () => {
    expect(cn('base', false && 'not-this', 'also-this')).toBe('base also-this');
    expect(cn('base', undefined, 'also-this')).toBe('base also-this');
    expect(cn('base', null, 'also-this')).toBe('base also-this');
  });

  it('handles object syntax (clsx-style)', () => {
    expect(cn({ 'text-red-500': true, 'text-blue-500': false })).toBe('text-red-500');
  });

  it('handles array syntax', () => {
    expect(cn(['px-4', 'py-2'])).toBe('px-4 py-2');
  });

  it('deduplicates classes', () => {
    const result = cn('px-4 py-2', 'px-4');
    expect(result).toBe('py-2 px-4');
  });

  it('returns empty string for no arguments', () => {
    expect(cn()).toBe('');
  });

  it('handles complex real-world component class patterns', () => {
    // Pattern used in button variants
    const isActive = true;
    const isDisabled = false;
    const result = cn(
      'inline-flex items-center rounded-md px-4 py-2',
      'bg-blue-600 text-white font-medium',
      isActive && 'ring-2 ring-blue-400',
      isDisabled && 'opacity-50 cursor-not-allowed',
    );
    expect(result).toContain('bg-blue-600');
    expect(result).toContain('ring-2');
    expect(result).not.toContain('opacity-50');
  });
});
