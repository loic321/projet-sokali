import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  // Générer un rapport HTML
  reporter: [
    ['html', { open: 'never' }]
  ],

  use: {
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});