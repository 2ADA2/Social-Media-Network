import { describe, expect, test, vi, beforeEach } from 'vitest';
import { render } from 'vitest-browser-react';
import { userEvent } from 'vitest/browser';
import { ProfileInfo } from '.';
import { useAuth } from '@/features/auth/use-auth';

let user: ReturnType<typeof userEvent.setup>;

const mockLogout = vi.fn();

vi.mock('@/features/auth/use-auth', () => ({
  useAuth: vi.fn(),
}));

vi.mock('@/features/theme-switcher', () => ({
  ThemeSwitcher: () => <div data-testid="theme-switcher" />,
}));

vi.mock('@/features/language-switcher', () => ({
  LanguageSwitcher: () => <div data-testid="language-switcher" />,
}));

vi.mock('./edit-profile', () => ({
  EditProfile: () => <div data-testid="edit-profile" />,
}));

describe('ProfileInfo', () => {
  beforeEach(() => {
    user = userEvent.setup();
    mockLogout.mockReset();

    vi.mocked(useAuth).mockReturnValue({
      logout: mockLogout,
      signin: vi.fn(),
      signup: vi.fn(),
      auth: vi.fn(),
      isAuth: true,
    } as unknown as ReturnType<typeof useAuth>);
  });

  test('renders preferences section with switchers', async () => {
    const screen = await render(<ProfileInfo />);

    await expect
      .element(screen.getByRole('heading', { name: 'preferences.title' }))
      .toBeVisible();
    await expect
      .element(screen.getByTestId('theme-switcher'))
      .toBeInTheDocument();
    await expect
      .element(screen.getByTestId('language-switcher'))
      .toBeInTheDocument();
  });

  test('renders actions section with logout button', async () => {
    const screen = await render(<ProfileInfo />);

    await expect
      .element(screen.getByRole('heading', { name: 'actions.title' }))
      .toBeVisible();
    await expect
      .element(screen.getByRole('button', { name: 'actions.logout' }))
      .toBeVisible();
  });

  test('calls logout on button click', async () => {
    const screen = await render(<ProfileInfo />);

    await user.click(screen.getByRole('button', { name: 'actions.logout' }));

    expect(mockLogout).toHaveBeenCalledTimes(1);
  });
});
