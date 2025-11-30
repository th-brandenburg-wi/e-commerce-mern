import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test('should display the hero section', async ({ page }) => {
    await page.goto('/');
    const heroTitle = await page.waitForSelector('h1:has-text("Latest Arrivals")');
    expect(heroTitle).not.toBeNull();
  });
});