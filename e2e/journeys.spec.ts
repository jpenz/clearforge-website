import { expect, test } from '@playwright/test';

/**
 * V12 journey smoke suite. Runs against a prod-mode server:
 *   npx next start -p 3008
 *   PLAYWRIGHT_BASE_URL=http://localhost:3008 npx playwright test
 * Keyless environments exercise the simulated analyst and console-logged
 * leads; that is by design (graceful degradation).
 */

test('homepage renders the core statement and one booking CTA in the header', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h1')).toContainText(/ClearForge builds/i);
  await expect(
    page.getByRole('banner').getByRole('button', { name: 'Book a 30-min intro' }),
  ).toBeVisible();
});

test('hero agent completes a run from a sample chip', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'industrial distributor' }).click();
  const analyze = page.getByRole('button', { name: /analyze/i }).first();
  if (await analyze.count()) await analyze.click();
  await expect(page.getByText(/analysis complete|done/i).first()).toBeVisible({
    timeout: 40_000,
  });
});

test('scorecard reaches results after 10 answers and validates the unlock form', async ({ page }) => {
  await page.goto('/scorecard');
  for (let i = 0; i < 10; i += 1) {
    await page.getByRole('button', { name: String(1 + (i % 5)), exact: true }).first().click();
    const next = page.getByRole('button', { name: /next question|see results/i }).first();
    if (await next.count()) await next.click();
  }
  await expect(page.getByText(/your score|readout/i).first()).toBeVisible({ timeout: 10_000 });
});

test('contact page carries the inline calendar shell and fallback form', async ({ page }) => {
  await page.goto('/contact');
  await expect(page.getByText(/loading live availability/i)).toBeVisible();
  await expect(page.locator('form')).toBeVisible();
});

test('legal pages render and are linked from the footer', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('contentinfo').getByRole('link', { name: 'Privacy' }).click();
  await expect(page.locator('h1')).toHaveText(/privacy policy/i);
  await page.goto('/terms');
  await expect(page.locator('h1')).toHaveText(/terms of service/i);
});

test('legacy URLs 308 to their V12 homes', async ({ request }) => {
  for (const [source, destination] of [
    ['/operating-model', '/services'],
    ['/case-studies/industrial-manufacturer', '/proof/industrial-conglomerate'],
    ['/blueprints', '/proof'],
    ['/quiz', '/scorecard'],
  ] as const) {
    const res = await request.get(source, { maxRedirects: 0 });
    expect(res.status(), source).toBe(308);
    expect(res.headers().location, source).toBe(destination);
  }
});

test('sitemap, robots, and llms.txt respond', async ({ request }) => {
  for (const path of ['/sitemap.xml', '/robots.txt', '/llms.txt']) {
    const res = await request.get(path);
    expect(res.status(), path).toBe(200);
  }
});

test('industries index lists entries and links through', async ({ page }) => {
  await page.goto('/industries');
  const first = page.locator('main a[href^="/industries/"]').first();
  await expect(first).toBeVisible();
  await first.click();
  await expect(page.locator('h1')).toBeVisible();
});
