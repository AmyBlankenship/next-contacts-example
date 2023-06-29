import { test, expect } from '@playwright/test';
import { each } from 'lodash';
import {browserUsers, addresses } from "./data";
import {User, create as createUser, testCleanUpUsers} from "../lib/users";
import {testCleanUpAddresses} from "../lib/addresses";

type TestUserHash = {
  [browser in keyof typeof browserUsers]?: User;
}
let testUsers: TestUserHash = {};
test.beforeAll(async () => {
  // create unique user for each browser
  each(browserUsers, async (partialUser, browserName) => {
    const newUserArr = await createUser(partialUser);
    const user = newUserArr[0];
    if (user) {
      // @ts-ignore
      testUsers[browserName] = user;
    }
  });
});

test.afterEach(() => {
  testCleanUpAddresses();
});

test.afterAll(() => {
  testCleanUpUsers();
});

test('default state', async ({ page, browserName}) => {
  const user = testUsers[browserName];
  await page.locator('li', {hasText: `${user?.first_name} ${user?.last_name}`}).click();
  await expect(page.getByText('No addresses yet...')).toBeVisible();
});
