// tests/example.spec.js
import { test, expect } from '@playwright/test';

test('should get a 404 response for a non-existent route', async ({ request }) => {
  const response = await request.get('http://localhost:4000/api/non-existent-route');
  expect(response.status()).toBe(404);
});
