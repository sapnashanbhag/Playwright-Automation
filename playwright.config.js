// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  testMatch: '**/*.spec.js',
  fullyParallel: true,
  workers:2,
  timeout: 40*1000,
  //time out used for actions
  expect: {
    timeout: 40 *1000,
  },
  
  reporter: 'html',
   use: {
    actionTimeout: 10*1000,
    navigationTimeout: 30*1000,
    browserName:'chromium',
    headless: false,
    screenshot: 'on',
    trace: 'on',
    video: 'retain-on-failure'
  
  },

 
});

