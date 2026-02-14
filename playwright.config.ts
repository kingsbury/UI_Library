import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  use: {
    baseURL: 'http://127.0.0.1:6006',
    trace: 'on-first-retry'
  },
  webServer: {
    command: 'npm run storybook -- --ci --no-open',
    url: 'http://127.0.0.1:6006',
    reuseExistingServer: true,
    timeout: 120000
  }
});
