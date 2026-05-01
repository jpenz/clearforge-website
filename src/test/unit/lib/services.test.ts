/**
 * services.test.ts
 *
 * Tests for the services data layer.
 * Services are the core product offering — if slugs are wrong, links 404.
 * If pricing is missing, the contact form sends incomplete context.
 */

import { describe, expect, it } from 'vitest';
import { type Service, services } from '@/data/services';

describe('services data', () => {
  it('exports exactly 4 services (the Clearforge product suite)', () => {
    expect(services).toHaveLength(4);
  });

  it('all service slugs are unique', () => {
    const slugs = services.map((s) => s.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('all service slugs are URL-safe (kebab-case, no spaces)', () => {
    for (const service of services) {
      expect(service.slug).toMatch(/^[a-z0-9-]+$/);
    }
  });

  it('expected service slugs are present', () => {
    const slugs = services.map((s) => s.slug);
    expect(slugs).toContain('ai-revenue-operations');
    expect(slugs).toContain('custom-ai-agents');
    expect(slugs).toContain('pe-value-creation');
    expect(slugs).toContain('performance-improvement');
  });

  it('every service has required fields populated', () => {
    const requiredFields: (keyof Service)[] = [
      'slug',
      'title',
      'tagline',
      'description',
      'icon',
      'idealClient',
      'deliverables',
      'outcomes',
      'workflow',
    ];
    for (const service of services) {
      for (const field of requiredFields) {
        expect(service[field], `Service "${service.slug}" missing "${field}"`).toBeTruthy();
      }
    }
  });

  it('every service has at least 3 deliverables', () => {
    for (const service of services) {
      expect(
        service.deliverables.length,
        `"${service.slug}" has too few deliverables`,
      ).toBeGreaterThanOrEqual(3);
    }
  });

  it('every service has at least 2 outcomes with value, label, and description', () => {
    for (const service of services) {
      expect(
        service.outcomes.length,
        `"${service.slug}" has too few outcomes`,
      ).toBeGreaterThanOrEqual(2);
      for (const outcome of service.outcomes) {
        expect(outcome.value.length).toBeGreaterThan(0);
        expect(outcome.label.length).toBeGreaterThan(0);
        expect(outcome.description.length).toBeGreaterThan(0);
      }
    }
  });

  it('every service workflow has at least 3 phases', () => {
    for (const service of services) {
      expect(
        service.workflow.length,
        `"${service.slug}" workflow has too few phases`,
      ).toBeGreaterThanOrEqual(3);
    }
  });

  it('workflow phases have non-empty titles and descriptions', () => {
    for (const service of services) {
      for (const step of service.workflow) {
        expect(step.phase.length).toBeGreaterThan(0);
        expect(step.title.length).toBeGreaterThan(0);
        expect(step.description.length).toBeGreaterThan(0);
      }
    }
  });

  it('icon values are one of the valid ServiceIcon types', () => {
    const validIcons = ['LineChart', 'Cog', 'Rocket', 'Bot'];
    for (const service of services) {
      expect(validIcons).toContain(service.icon);
    }
  });
});
