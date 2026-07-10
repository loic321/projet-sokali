// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  // Générer un rapport HTML dans le dossier playwright-report
  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never' }]
  ],

  // Timeout global pour éviter les erreurs de 30s
  timeout: 60000,

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
