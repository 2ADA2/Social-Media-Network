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

let mockFormValues = {
  firstName: 'Helena',
  secondName: 'Hills',
  email: 'helena@social.com',
  password: 'Password123',
};

vi.mock('@/features/auth/use-auth', () => ({
  useAuth: vi.fn(),
}));

vi.mock('@/app/providers/notifications-context/useNotifications', () => ({
  useNotifications: vi.fn(),
}));

vi.mock('react-hook-form', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-hook-form')>();
  return {
    ...actual,
    useForm: () => ({
      control: {},
      handleSubmit:
        (fn: (data: unknown) => void) =>
        (e?: { preventDefault?: () => void }) => {
          e?.preventDefault?.();
          fn({ ...mockFormValues });
        },
      formState: { dirtyFields: {} },
      reset: vi.fn(),
      watch: () => mockFormValues.email,
      trigger: vi.fn(),
    }),
    Controller: ({ render }: { render: (args: unknown) => React.ReactNode }) =>
      render({
        field: {
          value: '',
          onChange: vi.fn(),
          onBlur: vi.fn(),
          name: '',
          ref: vi.fn(),
        },
        fieldState: { error: undefined, isTouched: false },
      }),
  };
});

describe('SignUp', () => {
  beforeEach(() => {
    user = userEvent.setup();
    mockSignup.mockReset();
    mockAdd.mockReset();

    mockFormValues = {
      firstName: 'Helena',
      secondName: 'Hills',
      email: 'helena@social.com',
      password: 'Password123',
    };

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

  const renderSignUp = () =>
    render(
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>,
    );

  test('calls signup with form data on submit', async () => {
    mockSignup.mockResolvedValueOnce(undefined);

    const screen = await renderSignUp();

    await user.click(screen.getByRole('button', { name: 'signUp.submit' }));

    expect(mockSignup).toHaveBeenCalledWith({
      firstName: 'Helena',
      secondName: 'Hills',
      email: 'helena@social.com',
      password: 'Password123',
    });
  });

  test('shows success notification when signup resolves', async () => {
    mockSignup.mockResolvedValueOnce(undefined);

    const screen = await renderSignUp();

    await user.click(screen.getByRole('button', { name: 'signUp.submit' }));

    await vi.waitFor(() => {
      expect(mockAdd).toHaveBeenCalledWith({ message: 'signUp.success' });
    });
  });

  test('shows error notification when signup rejects', async () => {
    mockSignup.mockRejectedValueOnce(new Error('Email taken'));

    const screen = await renderSignUp();

    await user.click(screen.getByRole('button', { name: 'signUp.submit' }));

    await vi.waitFor(() => {
      expect(mockAdd).toHaveBeenCalledWith({
        message: 'signUp.error {"message":"Email taken"}',
        type: 'error',
      });
    });
  });
});
