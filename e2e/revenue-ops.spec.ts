import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test.describe('Samuel Revenue OS demo', () => {
  test('renders without a hydration or runtime error', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));

    await page.goto('/revenue-ops');
    await expect(page.getByTestId('revenue-ops-title')).toBeVisible();
    await page.waitForTimeout(250);

    expect(errors).toEqual([]);
  });

  test('keeps the signal-to-handoff workflow evidence-first and safe', async ({ page }) => {
    await page.goto('/revenue-ops');

    await expect(page.getByRole('heading', { name: 'Revenue decisions, with evidence.' })).toBeVisible();
    await expect(page.getByTestId('demo-safety-notice')).toContainText('no CRM');
    await expect(page.getByText('Capacity expansion permit issued').first()).toBeVisible();

    await page.getByTestId('approve-opportunity').click();
    await expect(page.getByText(/Play approval is frozen locally through/)).toBeVisible();
    await expect(page.getByText('Frozen approval record')).toBeVisible();

    await page.getByTestId('prepare-crm-handoff').click();
    await expect(
      page.getByText('No CRM API was invoked and no customer was contacted.'),
    ).toBeVisible();
    await expect(
      page.getByText('The system still has not performed an external mutation.'),
    ).toBeVisible();
  });

  test('requires a fresh approval when the reviewed context changes', async ({ page }) => {
    await page.goto('/revenue-ops');

    await page.getByTestId('approve-opportunity').click();
    await page.locator('#opportunity-owner').selectOption('Jordan Patel');
    await page.getByRole('button', { name: 'Save local assignment' }).click();
    await page.getByTestId('prepare-crm-handoff').click();

    await expect(page.getByText(/Handoff blocked locally:/)).toBeVisible();
    await expect(page.getByText(/Approval context changed/)).toBeVisible();
  });

  test('shows the strategic market and growth-review views', async ({ page }) => {
    await page.goto('/revenue-ops');

    await page.getByRole('button', { name: /Market map/ }).click();
    await expect(page.getByRole('heading', { name: 'Market Opportunity Command Center' })).toBeVisible();
    await expect(page.getByText('Fund a capital-project signal pod')).toBeVisible();

    await page.getByRole('button', { name: /Growth review/ }).click();
    await expect(page.getByRole('heading', { name: 'Weekly growth review' })).toBeVisible();
    await expect(page.getByRole('combobox', { name: 'Segment' })).toBeVisible();
  });

  test('has no detectable automated accessibility violations on the opportunity desk', async ({
    page,
  }) => {
    await page.goto('/revenue-ops');
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations).toEqual([]);
  });
});
