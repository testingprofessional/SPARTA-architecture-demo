import { test as base } from '@playwright/test';
import { PostActions } from '../act-assert/PostActions';
import { PostAssertions } from '../act-assert/PostAssertions';

type SpartaFixtures = {
  postAct: PostActions;
  postAssert: PostAssertions;
};

export const test = base.extend<SpartaFixtures>({
  postAct: async ({ request }, use) => {
    await use(new PostActions(request));
  },
  postAssert: async ({ request }, use) => {
    await use(new PostAssertions(request));
  },
});
