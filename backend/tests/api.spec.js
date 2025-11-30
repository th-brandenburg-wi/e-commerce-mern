import { test, expect } from '@playwright/test';

test.describe('API', () => {
  test('should return "API Working" for the root endpoint', async ({ request }) => {
    const response = await request.get('/');
    expect(response.status()).toBe(200);
    const text = await response.text();
    expect(text).toBe('API Working');
  });
});