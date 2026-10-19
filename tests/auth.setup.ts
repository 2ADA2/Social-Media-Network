import { test as setup } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';

const authFile = 'playwright/.auth/user.json';

setup('auth setup', async ({ page }) => {
  await fs.promises.mkdir(path.dirname(authFile), {
    recursive: true,
  });

  await page.goto('http://localhost:5173/sign-in');

  await page.getByLabel('Email').fill('helena.hills@social.com');
  await page.getByLabel('Password').fill('password789');

  await page.getByRole('button', { name: 'Sign in' }).click();

  await page.waitForURL('http://localhost:5173/');

  await page.context().storageState({ path: authFile });
});
