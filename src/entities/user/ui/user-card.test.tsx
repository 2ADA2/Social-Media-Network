import { describe, expect, test } from 'vitest';
import { UserCard } from './user-card';
import { render } from 'vitest-browser-react';

describe('UserCard component', () => {
  const title = 'title';
  const subtitle = 'subtitle';
  const avatarUrl = '/assets/avatar.png';

  test('Renders title subtitle and avatarUrl', async () => {
    const screen = await render(
      <UserCard title={title} subtitle={subtitle} avatarUrl={avatarUrl} />,
    );

    await expect.element(screen.getByText(title)).toBeVisible();
    await expect.element(screen.getByText(subtitle)).toBeVisible();
    await expect
      .element(screen.getByRole('img', { name: 'avatar' }))
      .toBeVisible();
  });
});
