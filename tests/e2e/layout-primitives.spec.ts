import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test('storybook layout primitives has no critical a11y violations', async ({ page }) => {
  await page.goto('/?path=/story/primitives-layout--stack');
  await expect(page.getByText('First item')).toBeVisible();

  const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
  const criticalViolations = accessibilityScanResults.violations.filter(
    (violation) => violation.impact === 'critical'
  );

  expect(criticalViolations).toEqual([]);
});
