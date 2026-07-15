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

  // Génération automatique du rapport HTML
  reporter: [
    [
      'html',
      {
        outputFolder: 'playwright-report',
        open: 'never'
      }
    ],

    // Rapport lisible dans la console Jenkins
    [
      'list'
    ]
  ],


  use: {

    // URL de base de ton application
    baseURL: 'http://localhost/Sokali/',

    // Capture une trace si le test échoue
    trace: 'retain-on-failure',

    // Capture écran en cas d'erreur
    screenshot: 'only-on-failure',

    // Enregistre une vidéo uniquement si le test échoue
    video: 'retain-on-failure',

  },


  projects: [

    {
      name: 'chromium',

      use: {
        ...devices['Desktop Chrome'],
      },

    },

  ],


  // Dossier où Playwright stocke les résultats temporaires
  outputDir: 'test-results',

});