import { expect, test } from '@playwright/test';

test.describe('main page', () => {
  test('shows layout and posts', async ({ page }) => {
    await page.goto('http://localhost:5173/');

    const header = page.getByRole('banner');
    await expect(header).toBeVisible();
    await expect(
      header.getByRole('link', { name: 'Helena Hills' }),
    ).toBeVisible();
  });
});
