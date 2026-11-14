import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  use: {
    baseURL: 'https://jsonplaceholder.typicode.com',
    extraHTTPHeaders: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
  },
  reporter: [['list'], ['html', { open: 'never' }]],
});
