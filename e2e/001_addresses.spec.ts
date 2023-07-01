import { test, expect } from '@playwright/test';
import { each } from 'lodash';
import {browserUsers, addresses } from "./data";
import {User, create as createUser, testCleanUpUsers} from "../lib/users";
import {testCleanUpAddresses} from "../lib/addresses";

type TestUserHash = {
  [browser in keyof typeof browserUsers]?: User;
}
let testUsers: TestUserHash = {};

test.describe.configure({mode:"serial"});

test.beforeAll(async () => {
  console.log('creating users');
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
  console.log('cleaning up users (address)')
  testCleanUpUsers();
});

test('default state', async ({ page, browserName}) => {
  await page.goto('http://localhost:3000/');
  //allows us to see newly added user
  await page.reload();
  const user = testUsers[browserName];
  await page.getByRole('listitem')
    .filter({hasText: `${user!.first_name} ${user!.last_name}`})
    .locator('css=.select-friend')
    .click();
  await expect(page.getByText('No addresses yet...')).toBeVisible();
});
