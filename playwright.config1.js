// @ts-check
import { defineConfig, devices } from '@playwright/test';
//import { use } from 'react';

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
  timeout: 40*1000,
  retries: 1, //will retry the test once if it fails. If you want to retry more than once, you can change the value to 2 or 3
  //time out used for actions
  expect: {
    timeout: 40 *1000,
  },
  reporter: 'html',
  //useful for parallel execution of tests in different browsers
  projects:[
  {name:'safari',
   use: {
    actionTimeout: 10*1000,
    navigationTimeout: 30*1000,
    browserName:'webkit',
    headless: false,
    screenshot: 'on', //on,off,only-on-failure are options
    trace: 'on',
    video: 'retain-on-failure', //on,off,retain-on-failure are options
    //viewport: { width: 720, height: 720 }, //changes the viewport size of the browser
    ...devices['iPhone 13 Pro'], //emulates the device in the browser
    ignoreHTTPSErrors: true, //ignores the SSL certificate errors
    permissions: ['geolocation'], //gives permission to access the location. To say OK in the pop up for location. If not given it will say permission denied

    }
  },
  {name:'firefox',  
   use: {
     actionTimeout: 10*1000,
    navigationTimeout: 30*1000,
    browserName:'firefox',
    headless: false,
    screenshot: 'on',
    trace: 'on',
    video: 'retain-on-failure'
    }
  },
    {name:'chrome',  
   use: {
     actionTimeout: 10*1000,
    navigationTimeout: 30*1000,
    browserName:'chromium',
    headless: false,
    screenshot: 'on',
    trace: 'on',
    video: 'retain-on-failure'
    }
  }
],

 
});

