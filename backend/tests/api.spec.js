import { test, expect } from '@playwright/test';

test.describe('API', () => {
  test('should return "API Working" for the root endpoint', async ({ request }) => {
    const response = await request.get('/');
    expect(response.status()).toBe(200);
    const text = await response.text();
    expect(text).toBe('API Working');
  });

  test('should return a list of products', async ({ request }) => {
    const response = await request.get('/api/product/list');
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.success).toBe(true);
    expect(Array.isArray(body.products)).toBe(true);
  });
});