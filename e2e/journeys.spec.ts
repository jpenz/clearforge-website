import { expect, test } from '@playwright/test';

/**
 * User-journey acceptance — the flows a buyer actually takes, codified from
 * the QA sweep's ad-hoc scripts so they run on every suite invocation.
 */

test.describe('Booking journey', () => {
  test('popup CTA opens the Cal booker from /pricing', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name === 'mobile', 'Covered by desktop; popup identical.');
    await page.goto('/pricing');
    await page.waitForLoadState('networkidle');
    const btn = page.getByRole('button', { name: /book a 30-min intro/i }).first();
    await btn.scrollIntoViewIfNeeded();
    await btn.hover(); // intent-preload
    await btn.click();
    await expect(page.locator('iframe[src*="cal.com"]').first()).toBeVisible({ timeout: 20000 });
  });

  test('inline calendar renders on /contact', async ({ page }) => {
    await page.goto('/contact');
    const frame = page.locator('iframe[src*="cal.com"]').first();
    await expect(frame).toBeVisible({ timeout: 20000 });
    const box = await frame.boundingBox();
    expect(box?.height ?? 0).toBeGreaterThan(300);
  });
});

test.describe('Legal journey', () => {
  test('privacy and terms are linked from the homepage footer and load', async ({ page }) => {
    await page.goto('/');
    const footer = page.locator('footer');
    await expect(footer.getByRole('link', { name: /privacy policy/i })).toBeVisible();
    await expect(footer.getByRole('link', { name: /terms of service/i })).toBeVisible();
    await page.goto('/privacy');
    await expect(page.getByRole('heading', { name: /privacy policy/i })).toBeVisible();
    await expect(page.getByText(/Service Providers We Use/i)).toBeVisible();
    await page.goto('/terms');
    await expect(page.getByText(/Free Diagnostic Tools/i)).toBeVisible();
  });
});

test.describe('Contact journey', () => {
  test('form submits and shows an honest outcome state', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name === 'mobile', 'Covered by desktop.');
    await page.goto('/contact');
    await page.locator('#name').fill('QA TEST — ignore');
    await page.locator('#email').fill('jamesrpenz+qatest@gmail.com');
    await page.locator('#company').fill('[AUTOMATED QA TEST]');
    await page.locator('#revenue').selectOption({ index: 1 });
    await page.locator('#message').fill('[AUTOMATED QA TEST] journey spec.');
    await page.getByRole('button', { name: /send the workflow/i }).click();
    // Local prod has no RESEND key (503 by design) → error banner; with a key → thank-you.
    await expect(
      page.getByText(/thank you|did not send|email james directly/i).first(),
    ).toBeVisible({ timeout: 15000 });
  });
});

test.describe('Hero agent journey (streaming)', () => {
  test('streams real progress and a filled thesis', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name === 'mobile', 'Covered by desktop.');
    test.skip(!process.env.ANTHROPIC_API_KEY, 'Needs a model key on the server under test.');
    await page.goto('/');
    await page.getByLabel('Your company website').fill('rhirt.com');
    await page.locator('#hero-url').press('Enter');
    // Real progress line appears fast (no fake timers)
    await expect(page.getByText(/Fetching rhirt\.com|Read rhirt\.com/).first()).toBeVisible({
      timeout: 8000,
    });
    // Thesis completes
    await expect(page.getByText('Priority play')).toBeVisible({ timeout: 45000 });
    await expect(page.getByText(/^Likely \d/).first()).toBeVisible();
  });
});
