/**
 * Deep route QA for secondary pages.
 *
 * These tests make sure every public content route loads at the top, has a
 * meaningful H1, avoids placeholder copy, and that representative click paths
 * land on the intended page instead of preserving stale scroll position.
 */

import { expect, type Page, test } from '@playwright/test';
import { caseStudies } from '../src/data/case-studies';
import { industries } from '../src/data/industries-value-chains';
import { insights } from '../src/data/insights';
import { services } from '../src/data/services';
import { useCases } from '../src/data/use-cases';

const staticRoutes = [
  '/',
  '/about',
  '/blueprints/cybersecurity-technology-company',
  '/case-studies',
  '/contact',
  '/discover',
  '/industries',
  '/insights',
  '/operating-model',
  '/pricing',
  '/privacy',
  '/scorecard',
  '/services',
  '/terms',
  '/use-cases',
];

const contentRoutes = [
  ...staticRoutes,
  ...services.map((service) => `/services/${service.slug}`),
  ...useCases.map((useCase) => `/use-cases/${useCase.slug}`),
  ...industries.map((industry) => `/industries/${industry.slug}`),
  ...caseStudies.map((study) => `/case-studies/${study.slug}`),
  ...insights.map((insight) => `/insights/${insight.slug}`),
];

const representativeClicks = [
  {
    from: '/',
    href: '/use-cases',
    destination: '/use-cases',
    h1: 'The highest-leverage places to build AI into the operating machine.',
  },
  {
    from: '/services',
    href: '/services/custom-ai-agents',
    destination: '/services/custom-ai-agents',
    h1: 'Strategy, engineering, integration, and governance for agents built around your workflows.',
  },
  {
    from: '/use-cases',
    href: '/use-cases/ai-sales-pipeline-acceleration',
    destination: '/use-cases/ai-sales-pipeline-acceleration',
    h1: 'Find the accounts most likely to move. Give your team the AI machine to reach them first.',
  },
  {
    from: '/industries',
    href: '/industries/manufacturing',
    destination: '/industries/manufacturing',
    h1: 'AI Agents & Automation for Manufacturing & Industrial',
  },
  {
    from: '/case-studies',
    href: '/case-studies/industrial-manufacturer',
    destination: '/case-studies/industrial-manufacturer',
    h1: '$4B Industrial Conglomerate Deploys AI Sales Intelligence Across 16 Divisions',
  },
  {
    from: '/insights',
    href: '/insights/ai-pilots-operating-systems',
    destination: '/insights/ai-pilots-operating-systems',
    h1: 'Why AI Pilots Fail to Become Operating Systems',
  },
];

async function expectAtPageTop(pagePath: string, page: Page) {
  await expect
    .poll(async () => page.evaluate(() => window.scrollY), {
      message: `${pagePath} should load near the top`,
      timeout: 1500,
    })
    .toBeLessThan(24);
}

const placeholderPattern = /lorem ipsum|todo:|coming soon|\[object Object\]|\bNaN\b/i;

test.describe('Public content route integrity', () => {
  test.skip(({ browserName }) => browserName !== 'chromium', 'Full route audit runs once.');

  for (const path of contentRoutes) {
    test(`${path} loads with clear page context`, async ({ page }) => {
      const errors: string[] = [];
      page.on('pageerror', (error) => errors.push(error.message));

      const response = await page.goto(path);
      await page.waitForLoadState('domcontentloaded');

      expect(response?.status(), `${path} returned ${response?.status()}`).toBeLessThan(400);
      expect(errors, `JS errors on ${path}: ${errors.join(', ')}`).toHaveLength(0);
      await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible();
      await expectAtPageTop(path, page);

      const bodyText = await page.locator('body').innerText();
      expect(bodyText, `${path} should not contain placeholder copy`).not.toMatch(placeholderPattern);
    });
  }
});

test.describe('Representative click paths land correctly', () => {
  test.skip(({ browserName }) => browserName !== 'chromium', 'Click path audit runs once.');

  for (const clickPath of representativeClicks) {
    test(`${clickPath.from} -> ${clickPath.destination}`, async ({ page }) => {
      await page.goto(clickPath.from);
      await page.waitForLoadState('domcontentloaded');
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

      const link = page.locator(`a[href="${clickPath.href}"]`).filter({ visible: true }).first();
      await expect(link).toBeVisible();

      await Promise.all([page.waitForURL(`**${clickPath.destination}`), link.click()]);
      await page.waitForLoadState('domcontentloaded');

      await expect(page.getByRole('heading', { level: 1, name: clickPath.h1 })).toBeVisible();
      await expectAtPageTop(clickPath.destination, page);
    });
  }
});
