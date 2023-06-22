import { test, expect } from '@playwright/test';
import {testCleanUpUsers} from "../lib/users";

const browserUsers = {
  chromium: {firstName: 'Amelia', lastName: 'Earhardt'},
  firefox: {firstName: 'Frank', lastName: 'Stein'},
  webkit: {firstName: 'Carmen', lastName: 'San Diego'},
}

test.beforeEach(async() => {
  testCleanUpUsers();
})

test('default state', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await expect(page.getByText('No friends yet')).toBeVisible();
});

test('adding user', async ({ page, browserName }) => {
  const user = browserUsers[browserName] ?? {firstName: 'Scooby', lastName: 'Doo'};
  await page.goto('http://localhost:3000/');
  await page.getByRole('link', { name: 'Add Friend' }).click();
  await page.getByLabel('First Name').fill(user.firstName);
  await page.getByLabel('First Name').press('Tab');
  await page.getByLabel('Last Name').fill(user.lastName);
  await page.getByRole('button', { name: 'Create Friend' }).click();
  await expect(page.getByRole('heading', { name: `${user.firstName} ${user.lastName}` })).toBeVisible();
});