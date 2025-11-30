import { test, expect } from '@playwright/test';

test.describe('Admin Login', () => {
  test('should display an error message with invalid credentials', async ({ page }) => {
    await page.goto('/');
    await page.fill('input[placeholder="Admin Email"]', 'invalid@email.com');
    await page.fill('input[placeholder="Password"]', 'invalidpassword');
    await page.click('button:has-text("Login")');
    const errorMessage = await page.waitForSelector('.Toastify__toast--error');
    expect(errorMessage).not.toBeNull();
  });
});