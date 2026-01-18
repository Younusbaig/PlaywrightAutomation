// @ts-check
const { devices } = require('@playwright/test');


const config = ({
  testDir: './tests',
  timeout: 40 *1000,
  expect: {
    timeout: 40*1000,
  },
  reporter: 'html',

  projects: [
    {
      name: 'chrome',
      use: {
        browserName: 'chromium',
        headless : false,
        screenshot : 'on',
        ...devices['iPhone 11'],
        trace : 'on',
       
      }
      },
      {
        name: 'safari',
        use: {
          browserName: 'webkit',
          headless : false,
          screenshot : 'on',
          ignoreHttpsError:true, // will handle ssl certificate error
          viewport: {width:720,height:720},
          trace : 'on',
      }
    }
  ]

});

module.exports = config
