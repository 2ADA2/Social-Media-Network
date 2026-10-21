import { describe, expect, test, vi, beforeEach } from 'vitest';
import { userEvent } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import axios from 'axios';
import { ConfirmPasswordModal } from './confirm-password-modal';
import { useUpdateAccount } from '@/features/edit-profile/use-update-account';
import { useNotifications } from '@/app/providers/notifications-context/useNotifications';

let user = userEvent.setup();

const mockMutate = vi.fn();
const mockAdd = vi.fn();
const mockOnClose = vi.fn();
const mockOnSuccess = vi.fn();

vi.mock('@/features/edit-profile/use-update-account', () => ({
  useUpdateAccount: vi.fn(),
}));

vi.mock('@/app/providers/notifications-context/useNotifications', () => ({
  useNotifications: vi.fn(),
}));

describe('ConfirmPasswordModal', () => {
  beforeEach(() => {
    user = userEvent.setup();
    mockMutate.mockReset();
    mockAdd.mockReset();
    mockOnClose.mockReset();
    mockOnSuccess.mockReset();

    vi.mocked(useUpdateAccount).mockReturnValue({
      mutate: mockMutate,
      isPending: false,
    } as unknown as ReturnType<typeof useUpdateAccount>);

    vi.mocked(useNotifications).mockReturnValue({
      add: mockAdd,
      notifications: [],
    } as unknown as ReturnType<typeof useNotifications>);
  });

  const renderModal = () =>
    render(
      <ConfirmPasswordModal
        isOpen
        onClose={mockOnClose}
        onSuccess={mockOnSuccess}
        newEmail="new@example.com"
      />,
    );

  test('renders modal with password field and submit button', async () => {
    const screen = await renderModal();

    await expect
      .element(screen.getByLabelText('confirmPassword.password'))
      .toBeVisible();
    await expect
      .element(screen.getByRole('button', { name: 'confirmPassword.submit' }))
      .toBeVisible();
  });

  test('shows required error if password is empty', async () => {
    const screen = await renderModal();

    await user.click(
      screen.getByRole('button', { name: 'confirmPassword.submit' }),
    );

    expect(mockMutate).not.toHaveBeenCalled();
    expect(mockAdd).toHaveBeenCalledWith({
      message: 'confirmPassword.required',
      type: 'error',
    });
  });

  test('calls updateAccount with password and email on submit', async () => {
    mockMutate.mockImplementation((_, opts) => {
      opts.onSuccess();
    });

    const screen = await renderModal();

    await user.type(
      screen.getByLabelText('confirmPassword.password'),
      'currentPass123',
    );
    await user.click(
      screen.getByRole('button', { name: 'confirmPassword.submit' }),
    );

    expect(mockMutate).toHaveBeenCalledWith(
      { currentPassword: 'currentPass123', email: 'new@example.com' },
      expect.objectContaining({
        onSuccess: expect.any(Function),
        onError: expect.any(Function),
      }),
    );

    expect(mockOnSuccess).toHaveBeenCalledTimes(1);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
    expect(mockAdd).toHaveBeenCalledWith({
      message: 'editProfile.emailSuccess',
    });
  });

  test('shows wrong password error on 403', async () => {
    mockMutate.mockImplementation((_, opts) => {
      const error = Object.assign(new Error('Forbidden'), {
        isAxiosError: true,
        response: { status: 403, data: { code: 'INVALID_CURRENT_PASSWORD' } },
      });
      vi.spyOn(axios, 'isAxiosError').mockReturnValueOnce(true);
      opts.onError(error);
    });

    const screen = await renderModal();

    await user.type(
      screen.getByLabelText('confirmPassword.password'),
      'wrongPass',
    );
    await user.click(
      screen.getByRole('button', { name: 'confirmPassword.submit' }),
    );

    expect(mockAdd).toHaveBeenCalledWith({
      message: 'confirmPassword.wrongPassword',
      type: 'error',
    });
    expect(mockOnSuccess).not.toHaveBeenCalled();
    expect(mockOnClose).not.toHaveBeenCalled();
  });

  test('shows email taken error on 409', async () => {
    mockMutate.mockImplementation((_, opts) => {
      const error = Object.assign(new Error('Conflict'), {
        isAxiosError: true,
        response: { status: 409, data: { code: 'EMAIL_TAKEN' } },
      });
      vi.spyOn(axios, 'isAxiosError').mockReturnValueOnce(true);
      opts.onError(error);
    });

    const screen = await renderModal();

    await user.type(
      screen.getByLabelText('confirmPassword.password'),
      'currentPass123',
    );
    await user.click(
      screen.getByRole('button', { name: 'confirmPassword.submit' }),
    );

    expect(mockAdd).toHaveBeenCalledWith({
      message: 'confirmPassword.emailTaken',
      type: 'error',
    });
  });

  test('shows generic error for non-axios errors', async () => {
    mockMutate.mockImplementation((_, opts) => {
      vi.spyOn(axios, 'isAxiosError').mockReturnValueOnce(false);
      opts.onError(new Error('Something broke'));
    });

    const screen = await renderModal();

    await user.type(
      screen.getByLabelText('confirmPassword.password'),
      'currentPass123',
    );
    await user.click(
      screen.getByRole('button', { name: 'confirmPassword.submit' }),
    );

    expect(mockAdd).toHaveBeenCalledWith({
      message: expect.stringContaining('editProfile.error'),
      type: 'error',
    });
  });

  test('clears password and calls onClose when closing', async () => {
    const screen = await renderModal();

    await user.type(
      screen.getByLabelText('confirmPassword.password'),
      'somePassword',
    );
    await user.click(screen.getByRole('button', { name: 'modal.close' }));

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
