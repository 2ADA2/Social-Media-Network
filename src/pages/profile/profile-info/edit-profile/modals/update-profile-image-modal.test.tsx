import { describe, expect, test, vi, beforeEach } from 'vitest';
import { render } from 'vitest-browser-react';
import { userEvent } from 'vitest/browser';
import { UpdateProfileImageModal } from './update-profile-image-modal';
import { useUpdateAvatar } from '@/features/edit-profile/use-update-avatar';
import { useNotifications } from '@/app/providers/notifications-context/useNotifications';
import { createFile } from '@/test/create=file';

let user: ReturnType<typeof userEvent.setup>;

const mockMutate = vi.fn();
const mockAdd = vi.fn();
const mockOnClose = vi.fn();

vi.mock('@/features/edit-profile/use-update-avatar', () => ({
  useUpdateAvatar: vi.fn(),
}));

vi.mock('@/app/providers/notifications-context/useNotifications', () => ({
  useNotifications: vi.fn(),
}));

describe('UpdateProfileImageModal', () => {
  beforeEach(() => {
    user = userEvent.setup();
    mockMutate.mockReset();
    mockAdd.mockReset();
    mockOnClose.mockReset();

    vi.mocked(useUpdateAvatar).mockReturnValue({
      mutate: mockMutate,
      isPending: false,
    } as unknown as ReturnType<typeof useUpdateAvatar>);

    vi.mocked(useNotifications).mockReturnValue({
      add: mockAdd,
      notifications: [],
    } as unknown as ReturnType<typeof useNotifications>);
  });

  const renderModal = () =>
    render(<UpdateProfileImageModal isOpen onClose={mockOnClose} />);

  test('renders modal with file input and submit button', async () => {
    const screen = await renderModal();

    await expect.element(screen.getByTestId('file-input')).toBeInTheDocument();
    await expect
      .element(screen.getByRole('button', { name: 'updateAvatar.submit' }))
      .toBeVisible();
  });

  test('shows error if no file selected', async () => {
    const screen = await renderModal();

    await user.click(
      screen.getByRole('button', { name: 'updateAvatar.submit' }),
    );

    expect(mockMutate).not.toHaveBeenCalled();
    expect(mockAdd).toHaveBeenCalledWith({
      message: 'updateAvatar.noFile',
      type: 'error',
    });
  });

  test('rejects invalid file type', async () => {
    const screen = await renderModal();

    const file = createFile({ name: 'doc.txt', type: 'text/plain' });
    await user.upload(screen.getByTestId('file-input'), file);

    expect(mockAdd).toHaveBeenCalledWith({
      message: 'updateAvatar.fileTypeError',
      type: 'error',
    });
  });

  test('rejects file larger than 2MB', async () => {
    const screen = await renderModal();

    const file = createFile({
      name: 'big.png',
      type: 'image/png',
      sizeInBytes: 3 * 1024 * 1024,
    });
    await user.upload(screen.getByTestId('file-input'), file);

    expect(mockAdd).toHaveBeenCalledWith({
      message: 'updateAvatar.fileSizeError {"size":2}',
      type: 'error',
    });
  });

  test('calls updateAvatar on submit and closes on success', async () => {
    mockMutate.mockImplementation((_, opts) => {
      opts.onSuccess();
    });

    const screen = await renderModal();

    const file = createFile({
      name: 'avatar.png',
      type: 'image/png',
      sizeInBytes: 1024,
    });
    await user.upload(screen.getByTestId('file-input'), file);

    await user.click(
      screen.getByRole('button', { name: 'updateAvatar.submit' }),
    );

    expect(mockMutate).toHaveBeenCalledWith(
      file,
      expect.objectContaining({
        onSuccess: expect.any(Function),
        onError: expect.any(Function),
      }),
    );
    expect(mockAdd).toHaveBeenCalledWith({
      message: 'updateAvatar.success',
    });
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test('shows error notification when update fails', async () => {
    mockMutate.mockImplementation((_, opts) => {
      opts.onError(new Error('Upload failed'));
    });

    const screen = await renderModal();

    const file = createFile({
      name: 'avatar.png',
      type: 'image/png',
      sizeInBytes: 1024,
    });
    await user.upload(screen.getByTestId('file-input'), file);

    await user.click(
      screen.getByRole('button', { name: 'updateAvatar.submit' }),
    );

    expect(mockAdd).toHaveBeenCalledWith({
      message: 'updateAvatar.error {"message":"Upload failed"}',
      type: 'error',
    });
    expect(mockOnClose).not.toHaveBeenCalled();
  });
});
