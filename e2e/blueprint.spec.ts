/**
 * blueprint.spec.ts
 *
 * E2E coverage for high-intent blueprint pages.
 * These are proposal-style routes, so they need to load cleanly, retain the
 * strategic narrative, and avoid mobile overflow.
 */

import { expect, test } from '@playwright/test';

const BLUEPRINT_PATH = '/blueprints/cybersecurity-technology-company';

test.describe('Cybersecurity blueprint', () => {
  test('loads the strategy proposal without JavaScript errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    const response = await page.goto(BLUEPRINT_PATH);
    expect(response?.status(), `${BLUEPRINT_PATH} returned ${response?.status()}`).toBeLessThan(
      400,
    );

    await page.waitForLoadState('domcontentloaded');
    await expect(page.getByRole('heading', { level: 1 })).toContainText(
      /James-led AI strategy proposal/i,
    );
    await expect(page.getByText(/Future-state value chain/i).first()).toBeVisible();
    await expect(page.getByText(/Function-level value map/i).first()).toBeVisible();
    expect(errors, `JS errors: ${errors.join(', ')}`).toHaveLength(0);
  });

  test('stays readable on mobile without horizontal overflow', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(BLUEPRINT_PATH);
    await page.waitForLoadState('domcontentloaded');

    const layout = await page.evaluate(() => ({
      bodyWidth: document.body.scrollWidth,
      documentWidth: document.documentElement.scrollWidth,
      viewportWidth: document.documentElement.clientWidth,
      sectionCount: document.querySelectorAll('section').length,
    }));

    expect(layout.bodyWidth).toBeLessThanOrEqual(layout.viewportWidth + 5);
    expect(layout.documentWidth).toBeLessThanOrEqual(layout.viewportWidth + 5);
    expect(layout.sectionCount).toBeGreaterThanOrEqual(8);
  });
});
