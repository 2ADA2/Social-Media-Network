import { describe, expect, test, vi, beforeEach } from 'vitest';
import { render } from 'vitest-browser-react';
import { userEvent } from 'vitest/browser';
import { MemoryRouter } from 'react-router-dom';
import SignUp from '.';
import { useAuth } from '@/features/auth/use-auth';
import { useNotifications } from '@/app/providers/notifications-context/useNotifications';

let user: ReturnType<typeof userEvent.setup>;

const mockSignup = vi.fn();
const mockAdd = vi.fn();

vi.mock('@/features/auth/use-auth', () => ({
  useAuth: vi.fn(),
}));

vi.mock('@/app/providers/notifications-context/useNotifications', () => ({
  useNotifications: vi.fn(),
}));

describe('SignUp', () => {
  beforeEach(() => {
    user = userEvent.setup();
    mockSignup.mockReset();
    mockAdd.mockReset();

    vi.mocked(useAuth).mockReturnValue({
      signup: mockSignup,
      signin: vi.fn(),
      logout: vi.fn(),
      auth: vi.fn(),
      isAuth: false,
    } as unknown as ReturnType<typeof useAuth>);

    vi.mocked(useNotifications).mockReturnValue({
      add: mockAdd,
      notifications: [],
    } as unknown as ReturnType<typeof useNotifications>);
  });

  test('renders form fields and submit button', async () => {
    const screen = await render(
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>,
    );

    await expect
      .element(screen.getByRole('textbox', { name: /signUp\.firstName/ }))
      .toBeVisible();
    await expect
      .element(screen.getByRole('textbox', { name: /signUp\.secondName/ }))
      .toBeVisible();
    await expect
      .element(screen.getByRole('textbox', { name: /signUp\.email/ }))
      .toBeVisible();
    await expect
      .element(screen.getByPlaceholder('signUp.passwordPlaceholder'))
      .toBeVisible();
    await expect
      .element(screen.getByRole('button', { name: 'signUp.submit' }))
      .toBeVisible();
  });

  test('shows validation errors when submitting empty form', async () => {
    const screen = await render(
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>,
    );

    await user.click(screen.getByRole('button', { name: 'signUp.submit' }));

    await expect
      .element(screen.getByRole('textbox', { name: /signUp\.firstName/ }))
      .toHaveAttribute('aria-invalid', 'true');
    await expect
      .element(screen.getByRole('textbox', { name: /signUp\.secondName/ }))
      .toHaveAttribute('aria-invalid', 'true');
    await expect
      .element(screen.getByRole('textbox', { name: /signUp\.email/ }))
      .toHaveAttribute('aria-invalid', 'true');
    await expect
      .element(screen.getByPlaceholder('signUp.passwordPlaceholder'))
      .toHaveAttribute('aria-invalid', 'true');
  });
});
