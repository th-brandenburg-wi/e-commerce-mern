// tests/example.spec.js
import { test, expect } from '@playwright/test';

test('should navigate to the login page', async ({ page }) => {
  await page.goto('http://localhost:5174');
  // The new page should have "Login" in its title.
  await expect(page).toHaveTitle(/ADMIN PANEL/);
});
