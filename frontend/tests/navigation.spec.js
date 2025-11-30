import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('should navigate to the collection page', async ({ page }) => {
    await page.goto('/');
    await page.click('a:has-text("COLLECTION")');
    await expect(page).toHaveURL('/collection');
  });
});
