import { describe, expect, test, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { MainLayout } from './';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { useAuth } from '@/features/auth/use-auth';
import { useUser } from '@/entities/user/model/use-user';
import type { UseAuthType } from '@/test/mock-hooks';

function renderWithRouter(
  children: React.ReactElement,
  { route = '/', hiddenNav = false } = {},
) {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <Routes>
        <Route path="/" element={<MainLayout hiddenNav={hiddenNav} />}>
          <Route index element={children} />
        </Route>
      </Routes>
    </MemoryRouter>,
  );
}

vi.mock('@/features/auth/use-auth', () => ({
  useAuth: vi.fn(),
}));

vi.mock('@/entities/user/model/use-user', () => ({
  useUser: vi.fn(),
}));

describe('MainLayout component', () => {
  test('renders header, footer and content', async () => {
    vi.mocked(useAuth).mockReturnValue({ isAuth: false } as UseAuthType);
    vi.mocked(useUser).mockReturnValue({ user: null, setUser: vi.fn() });
    const screen = await renderWithRouter(<div> children </div>);

    await expect.element(screen.getByText('children')).toBeVisible();
    await expect.element(screen.getByRole('contentinfo')).toBeVisible();
    await expect.element(screen.getByRole('main')).toBeVisible();
    await expect.element(screen.getByRole('banner')).toBeVisible();
  });
});
