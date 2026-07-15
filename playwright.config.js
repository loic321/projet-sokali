import { defineConfig, devices } from '@playwright/test';


export default defineConfig({

  testDir: './tests',

  fullyParallel: true,

  retries: 1,

  timeout: 60000,


  reporter: [
    [
      'html',
      {
        outputFolder: 'playwright-report',
        open: 'never'
      }
    ],
    'list'
  ],


  webServer: {

    command: 'npx http-server docs -p 3000',

    url: 'http://127.0.0.1:3000',

    timeout: 120000,

    reuseExistingServer: false

  },


  use: {

    baseURL: 'http://127.0.0.1:3000',

    trace: 'retain-on-failure',

    screenshot: 'only-on-failure',

    video: 'retain-on-failure'

  },


  projects: [

    {
      name:'chromium',
      use:{
        ...devices['Desktop Chrome']
      }
    }

  ],


  outputDir:'test-results'

});