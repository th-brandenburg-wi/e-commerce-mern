// playwright.config.js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  webServer: {
    command: 'npm start',
    url: 'http://localhost:4000',
    reuseExistingServer: !process.env.CI,
  },
  use: {
    baseURL: 'http://localhost:4000',
  },
});
