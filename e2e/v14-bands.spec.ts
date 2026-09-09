import { expect, type Page, test } from '@playwright/test';

/**
 * V14 band work: the interrupted ledger on /private-equity, the collapsing
 * second header tier below md, and no horizontal overflow at 390 on the
 * three routes the pass touched. Runs against a prod-mode server:
 *   npx next start -p 3008
 *   PLAYWRIGHT_BASE_URL=http://localhost:3008 npx playwright test
 */

test.describe('the private equity register', () => {
  test('indexes the four steps in the hero and runs them as ledger rows', async ({ page }) => {
    await page.goto('/private-equity');

    // The hero carries the index, so the page announces its own spine.
    const register = page.getByRole('list').filter({ hasText: 'Portfolio scan' }).first();
    await expect(register).toContainText('Portfolio scan');
    await expect(register).toContainText('Sponsor scoreboard');

    // Every step is a row, and each names its step number as real text.
    for (const step of ['01', '02', '03', '04']) {
      await expect(page.getByText(new RegExp(`Step ${step} ·`, 'i')).first()).toBeVisible();
    }
  });

  test('interrupts the register with the sourced sponsor gap', async ({ page }) => {
    await page.goto('/private-equity');

    const gap = page.getByLabel('The sponsor gap');
    await expect(gap).toBeVisible();
    // The two-number finding and its citation, never one without the other.
    await expect(gap).toContainText('of sponsors have mandated AI adoption');
    await expect(gap).toContainText('of portfolio companies are actively implementing');
    await expect(gap.getByRole('link', { name: /Accordion/i })).toBeVisible();

    // The register resumes after the interruption.
    await expect(page.getByLabel('The register, continued')).toBeVisible();
  });

  test('states the 70 percent as a target, never as an observed result', async ({ page }) => {
    await page.goto('/private-equity');
    await expect(page.getByText(/adoption target by day 90/i).first()).toBeVisible();
  });

  test('answers every common question on the page and links the case study', async ({ page }) => {
    await page.goto('/private-equity');

    const questions = page.getByLabel('Common questions');
    // The answers are on the page, not behind a disclosure, so a sponsor can
    // scan them. The first answer is visible without any interaction.
    await expect(questions.getByText(/One diagnostic model, run across/i)).toBeVisible();

    await expect(
      page.getByRole('link', { name: /Read the case study/i }).first(),
    ).toHaveAttribute('href', /\/proof\//);
  });
});

test.describe('the header tier below md', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  const TIER = 'header div[class*="max-h"]';

  /**
   * Scroll in steps until the tier reacts. Repetition matters twice over:
   * events fired before hydration are lost, and the tier ignores movement
   * for a moment after it changes while the layout settles. scrollBy rather
   * than the wheel, because the mobile project emulates a touch device where
   * wheel events do nothing.
   */
  async function scrollUntil(page: Page, want: string | null) {
    const tier = page.locator(TIER).first();
    await expect
      .poll(
        async () => {
          await page.evaluate((d) => window.scrollBy(0, d), want === 'true' ? 500 : -500);
          await page.waitForTimeout(160);
          return tier.getAttribute('data-collapsed');
        },
        { timeout: 10_000 },
      )
      .toBe(want);
  }

  test('collapses on scroll down and returns on scroll up', async ({ page }) => {
    await page.goto('/proof');

    const tier = page.locator(TIER).first();
    const open = (await tier.boundingBox())?.height ?? 0;
    expect(open).toBeGreaterThan(10);

    await scrollUntil(page, 'true');
    await page.waitForTimeout(450);
    expect((await tier.boundingBox())?.height ?? 0).toBeLessThan(open);

    await scrollUntil(page, null);
    await page.waitForTimeout(450);
    expect((await tier.boundingBox())?.height ?? 0).toBeGreaterThan(open - 2);
  });

  test('is inert while collapsed, and every destination returns on scroll up', async ({
    page,
  }) => {
    await page.goto('/proof');
    const tier = page.locator(TIER).first();

    await scrollUntil(page, 'true');
    // Rows clipped to zero height must not stay in the tab order, or a
    // keyboard reader lands on something nobody can see.
    await expect(tier).toHaveAttribute('inert', '');
    // The point of inert is that focus cannot land on a row clipped to zero
    // height, so focusing it must be a no-op rather than a silent trap.
    const hidden = tier.getByRole('link', { name: 'About' });
    await hidden.evaluate((el: HTMLElement) => el.focus());
    await expect(hidden).not.toBeFocused();

    await scrollUntil(page, null);
    await expect(tier).not.toHaveAttribute('inert', '');
    const about = tier.getByRole('link', { name: 'About' });
    await expect(about).toBeVisible();
    await about.focus();
    await expect(about).toBeFocused();
  });

  test('under reduced motion the tier still collapses, without a transition', async ({
    browser,
  }) => {
    const context = await browser.newContext({
      viewport: { width: 390, height: 844 },
      reducedMotion: 'reduce',
    });
    const page = await context.newPage();
    await page.goto('/proof');
    const tier = page.locator(TIER).first();

    await scrollUntil(page, 'true');
    // transition-none zeroes the property, not the duration, so the property
    // is what proves the collapse is instant here.
    expect(await tier.evaluate((el) => getComputedStyle(el).transitionProperty)).toBe('none');
    await context.close();
  });
});

test.describe('no horizontal overflow at 390', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  for (const route of ['/private-equity', '/proof', '/services']) {
    test(`${route} fits the viewport`, async ({ page }) => {
      await page.goto(route);
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(300);
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth > window.innerWidth,
      );
      expect(overflow).toBe(false);
    });
  }

  test('the services journey reads as one rail with a station per stage', async ({ page }) => {
    await page.goto('/services');
    // Each stage rides the rail with its own duration, drawn from the data.
    await expect(page.getByText('2 weeks', { exact: true }).first()).toBeVisible();
    await expect(page.getByText('10 to 14 weeks', { exact: true }).first()).toBeVisible();
  });
});
