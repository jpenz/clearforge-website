import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

/**
 * /value and /engineering: the front of the lifecycle with the return
 * scoreboard, and the engineering standard. Each page states its answer
 * in the h1, carries FAQ structured data, has a booking path, and is
 * reachable from the home page and the services catalog.
 */

const PAGES = [
  { route: '/value', h1: /value your business/i, faqs: 4 },
  { route: '/engineering', h1: /forward-deployed engineers/i, faqs: 5 },
];

for (const { route, h1, faqs } of PAGES) {
  test(`${route} states its answer, books a call, and carries FAQ data`, async ({ page }) => {
    await page.goto(route);
    await expect(page.locator('h1')).toContainText(h1);
    await expect(page.getByRole('button', { name: 'Book a 30-min intro' }).first()).toBeVisible();
    const schema = await page
      .locator('script[type="application/ld+json"]')
      .evaluateAll((nodes) =>
        nodes.map((node) => JSON.parse(node.textContent ?? '{}')).find((d) => d['@type'] === 'FAQPage'),
      );
    expect(schema?.mainEntity).toHaveLength(faqs);
  });

  test(`${route} has no serious or critical axe violations`, async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto(route);
    const results = await new AxeBuilder({ page }).exclude('iframe').analyze();
    const blocking = results.violations.filter(
      (v) => v.impact === 'serious' || v.impact === 'critical',
    );
    expect(blocking.map((v) => v.id)).toEqual([]);
    await context.close();
  });
}

test('the scoreboard section is addressable at /value#return', async ({ page }) => {
  await page.goto('/value#return');
  await expect(page.locator('#return')).toBeInViewport();
  for (const name of ['Adoption', 'Quality', 'Outcome', 'Cost']) {
    await expect(page.locator('#return').getByText(name, { exact: true })).toBeVisible();
  }
});

test('home trust band links each promise to the page with the detail', async ({ page }) => {
  await page.goto('/');
  const band = page.getByRole('region', { name: 'Why you can trust it' });
  for (const [name, href] of [
    ['How people stay in charge', '/engineering#control'],
    ['How it is checked', '/engineering#operate'],
    ['How the return is measured', '/value#return'],
  ]) {
    await expect(band.getByRole('link', { name })).toHaveAttribute('href', href);
  }
});

test('each services stage links to the page that explains it', async ({ page }) => {
  await page.goto('/services');
  for (const [name, href] of [
    ['How we find the value', '/value'],
    ['The engineering standard', '/engineering'],
    ['How the return is measured', '/value#return'],
    ['How systems are watched', '/engineering#operate'],
  ]) {
    await expect(page.getByRole('link', { name })).toHaveAttribute('href', href);
  }
});

test('insight pages carry article and breadcrumb data, and the firm is named plainly', async ({
  page,
}) => {
  await page.goto('/insights/pe-value-creation-with-ai');
  const data = await page
    .locator('script[type="application/ld+json"]')
    .evaluateAll((nodes) => nodes.map((node) => JSON.parse(node.textContent ?? '{}')));
  const article = data.find((d) => d['@type'] === 'Article');
  expect(article?.headline).toMatch(/AI value creation in private equity/);
  expect(article?.datePublished).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  expect(data.find((d) => d['@type'] === 'BreadcrumbList')?.itemListElement).toHaveLength(3);

  await page.goto('/');
  const home = await page
    .locator('script[type="application/ld+json"]')
    .evaluateAll((nodes) => nodes.map((node) => JSON.parse(node.textContent ?? '{}')));
  const org = home.find((d) => d['@type'] === 'ProfessionalService');
  expect(org?.legalName).toBe('Clearforge AI LLC');
  expect(org?.knowsAbout).toContain('AI value creation in private equity');
});
