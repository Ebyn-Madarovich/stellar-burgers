import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  testMatch: '**/*.pl.tsx',

  use: {
    browserName: 'chromium',
    baseURL: 'http://localhost:4000'
  },

  webServer: {
    command: 'npm start -- --no-open',
    url: 'http://localhost:4000',
    reuseExistingServer: true
  }
});
