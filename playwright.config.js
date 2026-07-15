// playwright.config.ts

import { defineConfig, devices } from '@playwright/test';

export default defineConfig({

  // Dossier contenant les tests
  testDir: './tests',

  // Exécution adaptée à Jenkins
  fullyParallel: true,

  // Nombre de tentatives supplémentaires en cas d'échec
  retries: 1,

  // Timeout maximum d'un test
  timeout: 60000,


  reporter: [
    [
      'html',
      {
        outputFolder: 'playwright-report',
        open: 'never'
      }
    ],

    [
      'list'
    ]
  ],


  use: {

    // Playwright testera le code récupéré par Jenkins
    baseURL: 'http://127.0.0.1:3000/',

    trace: 'retain-on-failure',

    screenshot: 'only-on-failure',

    video: 'retain-on-failure',

  },


  // Lance automatiquement un serveur sur le workspace Jenkins
 webServer: {
  command: 'npx http-server Sokali -p 3000',
  url: 'http://127.0.0.1:3000',
  reuseExistingServer: false,
  timeout: 120000
},

  projects: [

    {
      name: 'chromium',

      use: {
        ...devices['Desktop Chrome'],
      },

    },

  ],


  outputDir: 'test-results',

});