import { test as base } from '@playwright/test';
import { PostActions } from '../act-assert/PostActions';
import { PostAssertions } from '../act-assert/PostAssertions';
import { ShopActions } from '../act-assert/ShopActions';
import { ShopAssertions } from '../act-assert/ShopAssertions';

type SpartaFixtures = {
  postAct: PostActions;
  postAssert: PostAssertions;
  shopAct: ShopActions;
  shopAssert: ShopAssertions;
};

export const test = base.extend<SpartaFixtures>({
  // API Fixtures
  postAct: async ({ request }, use) => {
    await use(new PostActions(request));
  },
  postAssert: async ({ request }, use) => {
    await use(new PostAssertions(request));
  },

  // UI Fixtures
  shopAct: async ({ page }, use) => {
    await use(new ShopActions(page));
  },
  shopAssert: async ({ page }, use) => {
    await use(new ShopAssertions(page));
  },
});
