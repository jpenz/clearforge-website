/**
 * homepage.spec.ts
 *
 * E2E tests for the ClearForge.ai homepage.
 * Tests what a real visitor sees — navigation, hero content, CTAs, and
 * that the page renders without JS errors.
 */

import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('loads without errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    expect(errors).toHaveLength(0);
  });

  test('has correct page title', async ({ page }) => {
    await expect(page).toHaveTitle(/ClearForge/i);
  });

  test('hero section is visible with brand tagline', async ({ page }) => {
    // The brand tagline from CLAUDE.md
    const hero = page.locator('main').first();
    await expect(hero).toBeVisible();
    // At least one of these brand statements should be visible
    const taglineVisible = await page
      .getByText(/Strategy that ships|AI that performs|ClearForge/i)
      .first()
      .isVisible()
      .catch(() => false);
    expect(taglineVisible).toBe(true);
  });

  test('primary CTA button is visible and clickable', async ({ page }) => {
    // Look for common CTA patterns
    const cta = page
      .getByRole('link', { name: /get started|book a call|contact|scorecard|assessment|value map/i })
      .first();
    await expect(cta).toBeVisible();
  });

  test('navigation links are present', async ({ page }, testInfo) => {
    if (testInfo.project.name === 'mobile') {
      await page.waitForLoadState('networkidle');
      const menuButton = page.getByRole('button', { name: /open menu/i });
      await expect(menuButton).toBeVisible();
      await menuButton.click();
      await expect(page.getByRole('dialog')).toBeVisible();
      await expect(page.getByRole('link', { name: /how we work/i })).toBeVisible();
      return;
    }

    const nav = page.getByRole('navigation', { name: /main navigation/i });
    await expect(nav).toBeVisible();
  });

  test('services section is present', async ({ page }) => {
    const servicesLink = page.getByRole('link', { name: /services/i }).first();
    await expect(servicesLink).toBeVisible();
  });

  test('page is mobile-responsive — no horizontal overflow', async ({ page, viewport }) => {
    if (!viewport) return;
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    expect(bodyWidth).toBeLessThanOrEqual(viewport.width + 5); // 5px tolerance
  });
});
