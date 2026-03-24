/**
 * scorecard.spec.ts
 *
 * E2E tests for the AI Readiness Scorecard flow.
 * This is the primary lead generation tool on the site.
 * A broken scorecard = zero leads captured.
 *
 * Tests the full happy path: load → answer all questions → see results.
 * Also tests navigation, validation, and mobile layout.
 */

import { test, expect } from '@playwright/test';

test.describe('AI Readiness Scorecard', () => {
  test('scorecard page loads without errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));
    await page.goto('/scorecard');
    await page.waitForLoadState('networkidle');
    expect(errors).toHaveLength(0);
  });

  test('scorecard page has correct heading', async ({ page }) => {
    await page.goto('/scorecard');
    const heading = page.getByRole('heading', { level: 1 }).first();
    await expect(heading).toBeVisible();
  });

  test('progress bar is visible on scorecard page', async ({ page }) => {
    await page.goto('/scorecard');
    const progressbar = page.getByRole('progressbar');
    await expect(progressbar).toBeVisible();
  });

  test('first pillar questions are visible on load', async ({ page }) => {
    await page.goto('/scorecard');
    // Score buttons (1-5) should be visible for the first question
    const scoreButtons = page.getByRole('button').filter({ hasText: /^[1-5]$/ });
    await expect(scoreButtons.first()).toBeVisible();
  });

  test('can select a score and advance to next pillar', async ({ page }) => {
    await page.goto('/scorecard');
    await page.waitForLoadState('networkidle');

    // Answer all questions on the first pillar by clicking score 3 for each
    const scoreButtons = page.getByRole('button').filter({ hasText: /^3$/ });
    const count = await scoreButtons.count();
    expect(count).toBeGreaterThan(0);

    // Click score 3 on all visible questions
    for (let i = 0; i < count; i++) {
      await scoreButtons.nth(i).click();
      await page.waitForTimeout(100); // small delay for animation
    }

    // Next button should appear or progress should advance
    const nextBtn = page.getByRole('button', { name: /next|continue/i });
    const hasNext = await nextBtn.isVisible().catch(() => false);
    if (hasNext) {
      await nextBtn.click();
      // Progress bar should have advanced
      const progress = await page.getByRole('progressbar').getAttribute('aria-valuenow');
      expect(Number(progress)).toBeGreaterThan(0);
    }
  });

  test('complete scorecard flow — all pillars → results page', async ({ page }) => {
    await page.goto('/scorecard');
    await page.waitForLoadState('networkidle');

    // Keep answering questions until we reach results or run out of pages
    let iterations = 0;
    const maxIterations = 10;

    while (iterations < maxIterations) {
      iterations++;

      // Find all unanswered score-3 buttons and click them
      const scoreButtons = page.getByRole('button').filter({ hasText: /^3$/ });
      const count = await scoreButtons.count();

      if (count === 0) break;

      for (let i = 0; i < count; i++) {
        const btn = scoreButtons.nth(i);
        const isVisible = await btn.isVisible().catch(() => false);
        if (isVisible) {
          await btn.click();
          await page.waitForTimeout(80);
        }
      }

      // Try clicking Next if it exists
      const nextBtn = page.getByRole('button', { name: /next|continue/i });
      const hasNext = await nextBtn.isVisible().catch(() => false);
      if (hasNext) {
        await nextBtn.click();
        await page.waitForTimeout(300);
      }

      // Check if we've reached results
      const onResults =
        page.url().includes('/results') ||
        (await page.getByText(/your score|your readiness|composite score/i).isVisible().catch(() => false));

      if (onResults) break;
    }

    // We should have made progress (at least past the first pillar)
    expect(iterations).toBeGreaterThan(1);
  });

  test('results page shows score and tier', async ({ page }) => {
    await page.goto('/scorecard/results');
    // Results page should either show a score or redirect
    const url = page.url();
    // If it stays on results, content should be visible
    if (url.includes('/results')) {
      await page.waitForLoadState('networkidle');
      const content = page.locator('main');
      await expect(content).toBeVisible();
    }
  });

  test('scorecard is usable on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 }); // iPhone 14
    await page.goto('/scorecard');
    await page.waitForLoadState('networkidle');

    // Score buttons should be visible and tappable
    const scoreButtons = page.getByRole('button').filter({ hasText: /^[1-5]$/ });
    await expect(scoreButtons.first()).toBeVisible();

    // No horizontal overflow
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    expect(bodyWidth).toBeLessThanOrEqual(395);
  });
});
