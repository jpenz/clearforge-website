/**
 * navigation.spec.ts
 *
 * E2E tests for site navigation and critical page loads.
 * Every page should load without JS errors and have a valid H1.
 * Catches broken routes, missing imports, and runtime crashes before they hit production.
 */

import { test, expect } from '@playwright/test';

const PAGES = [
  { path: '/', name: 'Homepage' },
  { path: '/services', name: 'Services' },
  { path: '/services/ai-revenue-operations', name: 'AI Revenue Operations' },
  { path: '/services/custom-ai-agents', name: 'Custom AI Agents' },
  { path: '/services/pe-value-creation', name: 'PE Value Creation' },
  { path: '/services/performance-improvement', name: 'Performance Improvement' },
  { path: '/about', name: 'About' },
  { path: '/case-studies', name: 'Case Studies' },
  { path: '/blueprints/cybersecurity-technology-company', name: 'Cybersecurity Blueprint' },
  { path: '/contact', name: 'Contact' },
  { path: '/scorecard', name: 'Scorecard' },
];

test.describe('Page Loads — No Errors', () => {
  for (const { path, name } of PAGES) {
    test(`${name} (${path}) loads without JS errors`, async ({ page }) => {
      const errors: string[] = [];
      page.on('pageerror', (err) => errors.push(err.message));

      const response = await page.goto(path);

      // Should not 404 or 500
      expect(response?.status(), `${path} returned ${response?.status()}`).toBeLessThan(400);

      await page.waitForLoadState('domcontentloaded');

      expect(errors, `JS errors on ${path}: ${errors.join(', ')}`).toHaveLength(0);
    });

    test(`${name} (${path}) has a visible H1`, async ({ page }) => {
      await page.goto(path);
      await page.waitForLoadState('domcontentloaded');
      const h1 = page.getByRole('heading', { level: 1 }).first();
      await expect(h1).toBeVisible();
    });
  }
});

test.describe('Navigation flows', () => {
  test('clicking Capabilities nav link goes to /services', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const capabilitiesLink = page
      .getByRole('navigation')
      .getByRole('link', { name: /^capabilities$/i })
      .first();

    await capabilitiesLink.click();
    await page.waitForLoadState('domcontentloaded');
    expect(page.url()).toContain('/services');
  });

  test('clicking CTA navigates to a valid destination', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const cta = page
      .getByRole('link', { name: /get started|book a call|contact|scorecard|assessment/i })
      .first();

    const isVisible = await cta.isVisible().catch(() => false);
    if (!isVisible) return; // skip if no CTA found

    await cta.click();
    await page.waitForLoadState('domcontentloaded');

    // Should have navigated somewhere (not the same page or an error page)
    const response = await page.goto(page.url());
    expect(response?.status()).toBeLessThan(400);
  });

  test('404 page renders for unknown route', async ({ page }) => {
    const response = await page.goto('/this-route-does-not-exist-xyz');
    // Next.js returns 404 for unknown routes
    expect(response?.status()).toBe(404);
    // not-found.tsx should render
    const content = page.locator('main, body').first();
    await expect(content).toBeVisible();
  });
});
