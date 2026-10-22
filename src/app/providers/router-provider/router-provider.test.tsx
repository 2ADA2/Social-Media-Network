import { beforeEach, describe, expect, test, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { RouterProvider } from '.';
import { useAuth } from '@/features/auth/use-auth';
import { useAppSelector } from '@/app/store/hooks';
import type { UseAuthType } from '@/test/mock-hooks';
import { Outlet } from 'react-router-dom';

vi.mock('@/features/auth/use-auth', () => ({
  useAuth: vi.fn(),
}));

vi.mock('@/entities/user/model/use-user', () => ({
  useUser: vi.fn(),
}));

vi.mock('@/app/store/hooks', () => ({
  useAppSelector: vi.fn(),
}));

vi.mock('@/pages/main', () => ({ MainPage: () => <div>Main Page</div> }));
vi.mock('@/pages/not-found', () => ({ NotFound: () => <div>Not Found</div> }));
vi.mock('@/pages/signin', () => ({ default: () => <div>Sign In</div> }));
vi.mock('@/pages/signup', () => ({ default: () => <div>Sign Up</div> }));
vi.mock('@/pages/profile', () => ({ default: () => <div>Profile</div> }));

vi.mock('@/app/layouts/main-layout', () => ({
  MainLayout: () => (
    <div data-testid="main-layout">
      <Outlet />
    </div>
  ),
}));

describe('RouterProvider', () => {
  beforeEach(() => {
    vi.mocked(useAppSelector).mockReturnValue(true);
    vi.mocked(useAuth).mockReturnValue({ isAuth: false } as UseAuthType);
  });

  test('shows Loader when isInit is false', async () => {
    vi.mocked(useAppSelector).mockReturnValue(false);

    const screen = await render(<RouterProvider />);

    await expect.element(screen.getByTestId('loader')).toBeVisible();
  });

  test('renders app when isInit is true', async () => {
    const screen = await render(<RouterProvider />);

    await expect.element(screen.getByText('Main Page')).toBeVisible();
  });
});
