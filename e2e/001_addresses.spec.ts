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

test.beforeEach(async({page}) => {
  await page.goto('http://localhost:3000/');
})

test.afterEach(async () => {
  await testCleanUpAddresses();
});

test.afterAll(() => {
  console.log('cleaning up users (address)')
  testCleanUpUsers();
});

test('default state', async ({ page, browserName}) => {
  const user = testUsers[browserName];
  await page.getByRole('listitem')
    .filter({hasText: `${user!.first_name} ${user!.last_name}`})
    .locator('css=.select-friend')
    .click();
  await expect(page.getByText('No addresses yet...')).toBeVisible();
});

test('adding address', async ({ page, browserName}) => {
  const user = testUsers[browserName];
  const address = addresses[browserName];
  await page.getByRole('listitem')
    .filter({hasText: `${user!.first_name} ${user!.last_name}`})
    .locator('css=.select-friend')
    .click();

  await page.getByRole('link', { name: 'New Contact' }).click();
  await expect(page.getByRole('heading', {name: 'Add Contact'})).toBeVisible();
  await page.getByLabel('Line 1').fill(address!.line_1);
  await page.getByLabel('Line 2').fill(address!.line_2);
  await page.getByLabel('City').fill(address!.city);
  await page.getByLabel('State').fill(address!.state);
  await page.getByLabel('Zipcode').fill(address!.zip);

  await page.getByRole('button', {name: 'Create Contact'}).click();

  await expect(page.getByRole('heading', {name: 'Add Contact'})).toBeHidden();


  await expect(page.getByText(address.line_1)).toBeVisible();
  if (!!address.line_2) {
    await expect(page.getByText(address.line_2)).toBeVisible();
  }
  await expect(page.getByText(address.city)).toBeVisible();
  await expect(page.getByText(address.state)).toBeVisible();
  await expect(page.getByText(address.zip)).toBeVisible();

})
