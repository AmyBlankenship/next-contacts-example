import { test, expect } from '@playwright/test';
import { testCleanUpUsers, create } from "../lib/users";

const browserUsers = {
  chromium: {first_name: 'Amelia', last_name: 'Earhardt'},
  firefox: {first_name: 'Frank', last_name: 'Stein'},
  webkit: {first_name: 'Carmen', last_name: 'San Diego'},
}

test.beforeEach(async() => {
  testCleanUpUsers();
})

test('default state', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await expect(page.getByText('No friends yet')).toBeVisible();
});

test('adding user', async ({ page, browserName }) => {
  const user = browserUsers[browserName] ?? {first_name: 'Scooby', last_name: 'Doo'};
  await page.goto('http://localhost:3000/');
  await page.getByRole('link', { name: 'Add Friend' }).click();
  await page.getByLabel('First Name').fill(user.first_name);
  await page.getByLabel('First Name').press('Tab');
  await page.getByLabel('Last Name').fill(user.last_name);
  await page.getByRole('button', { name: 'Create Friend' }).click();
  await expect(page.getByRole('heading', { name: `${user.first_name} ${user.last_name}` })).toBeVisible();
});

test.describe('working with existing users', () => {
  let userId = 0
  test.beforeEach(async({browserName}) => {
    const user = browserUsers[browserName] ?? {first_name: 'Scooby', last_name: 'Doo'};
    const users = await create(user);
    userId = users[0]?.id;
    console.log({userId})
  });
  test('updating user', async ({ page , browserName}) => {
    await page.goto('http://localhost:3000/');
    //allows us to see newly added user
    await page.reload();
    const user = browserUsers[browserName] ?? {first_name: 'Scooby', last_name: 'Doo'};
    const editedLastName = user.last_name + '(edited)';
    await page.getByRole('listitem')
      .filter({hasText: `${user.first_name} ${user.last_name}`})
      .getByText('Edit').click();
    await expect(page.getByLabel('First Name')).toHaveValue(user.first_name);
    await expect(page.getByLabel('Last Name')).toHaveValue(user.last_name);
    await page.getByLabel('Last Name').fill(editedLastName);
    await page.getByRole('button', {name: 'Update Friend'}).click();
    await expect(page.getByRole('heading', { name: `${user.first_name} ${editedLastName}` })).toBeVisible();
  });
})