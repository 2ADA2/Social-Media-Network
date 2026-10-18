import { beforeEach, describe, expect, test, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { MemoryRouter } from 'react-router-dom';
import { NavBar } from '.';
import { useAuth } from '@/features/auth/use-auth';
import { useUser } from '@/entities/user/model/use-user';
import type { User } from '@/entities/user';

function renderWithRouter(children: React.ReactElement) {
  return render(<MemoryRouter>{children}</MemoryRouter>);
}

vi.mock('@/features/auth/use-auth', () => ({
  useAuth: vi.fn(),
}));

type UseAuthType = ReturnType<typeof useAuth>;

vi.mock('@/entities/user/model/use-user', () => ({
  useUser: vi.fn(),
}));

type UseUserType = ReturnType<typeof useUser>;

describe('NavBar', () => {
  beforeEach(() => {
    vi.mocked(useAuth).mockReturnValue({ isAuth: false } as UseAuthType);
    vi.mocked(useUser).mockReturnValue({ user: null, setUser: vi.fn() });
  });
  test('renders when isOpen=true', async () => {
    const setNavBar = vi.fn();
    const screen = await renderWithRouter(
      <NavBar setNavBar={setNavBar} isOpen={true}></NavBar>,
    );

    await expect.element(screen.getByRole('dialog')).toBeVisible();
  });

  test('doesnt render when isOpen=false', async () => {
    const setNavBar = vi.fn();
    const screen = await renderWithRouter(
      <NavBar setNavBar={setNavBar} isOpen={false}></NavBar>,
    );

    await expect.element(screen.getByRole('dialog')).not.toBeInTheDocument();
  });

  test('renders sign in / sign up buttons when not authenticated', async () => {
    const setNavBar = vi.fn();
    const screen = await renderWithRouter(
      <NavBar setNavBar={setNavBar} isOpen={true}></NavBar>,
    );

    await expect
      .element(screen.getByRole('link', { name: 'nav.signIn' }))
      .toBeVisible();
    await expect
      .element(screen.getByRole('link', { name: 'nav.signUp' }))
      .toBeVisible();
  });

  test('renders profile / settings buttons when authenticated', async () => {
    vi.mocked(useAuth).mockReturnValue({ isAuth: true } as UseAuthType);
    vi.mocked(useUser).mockReturnValue({
      user: { id: '1', name: 'Alice', avatar: '/avatar.png' } as User,
      setUser: vi.fn(),
    } as UseUserType);
    const setNavBar = vi.fn();
    const screen = await renderWithRouter(
      <NavBar setNavBar={setNavBar} isOpen={true}></NavBar>,
    );

    await expect
      .element(screen.getByRole('link', { name: 'nav.profile' }))
      .toBeVisible();
    await expect
      .element(screen.getByRole('link', { name: 'nav.statistics' }))
      .toBeVisible();
  });
});
