// @ts-check
// require('dotenv').config();
const { devices } = require('@playwright/test');


const config = ({
  testDir: './tests',
  // retries: 1,
  workers: 5,
  timeout: 40 *1000,
  expect: {
    timeout: 40*1000,
  },
  reporter: 'html',
  use: {
    browserName: 'chromium',
    headless: process.env.CI ? true : false,
    screenshot : 'on',
    // video: 'on',
    trace : 'on',
   
  },
});

module.exports = config
