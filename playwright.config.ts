import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  reporter: [['list'], ['html', { open: 'never' }]],
  projects: [
    {
      name: 'api-tests',
      testMatch: /posts\.spec\.ts/,
      use: {
        baseURL: 'https://jsonplaceholder.typicode.com',
        extraHTTPHeaders: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      },
    },
    {
      name: 'ui-tests',
      testMatch: /shop\.spec\.ts/,
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'https://saucedemo.com',
        testIdAttribute: 'data-test', // SauceDemo gebruikt 'data-test' i.p.v. 'data-testid'
        screenshot: 'only-on-failure',
      },
    },
  ],
});
