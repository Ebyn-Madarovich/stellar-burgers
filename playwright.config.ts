import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  testMatch: '**/*.pl.tsx',
  workers: 1,
  reporter: 'list',

  use: {
    baseURL: 'http://localhost:4000',
    trace: 'retain-on-failure'
  },

  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } }
  ],

  webServer: {
    command: 'npm start -- --no-open',
    url: 'http://localhost:4000',
    reuseExistingServer: !process.env.CI
  }
});
