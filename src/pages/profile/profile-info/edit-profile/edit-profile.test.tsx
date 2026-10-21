import { describe, expect, test, vi, beforeEach } from 'vitest';
import { render } from 'vitest-browser-react';
import { userEvent } from 'vitest/browser';
import { EditProfile } from '.';
import { useUser } from '@/entities/user/model/use-user';
import { useUpdateProfile } from '@/features/edit-profile/use-update-profile';
import { useNotifications } from '@/app/providers/notifications-context/useNotifications';
import { useModal } from '@/shared/lib/hooks/use-modal';

let user: ReturnType<typeof userEvent.setup>;

const mockUpdateProfile = vi.fn();
const mockAdd = vi.fn();
const mockReset = vi.fn();

let mockDirtyFields: Record<string, boolean> = {};
let mockFormValues = {
  firstName: 'Helena',
  secondName: 'Hills',
  username: '@helena',
  email: 'helena@social.com',
  description: 'Hi',
};

vi.mock('@/entities/user/model/use-user', () => ({ useUser: vi.fn() }));
vi.mock('@/features/edit-profile/use-update-profile', () => ({
  useUpdateProfile: vi.fn(),
}));
vi.mock('@/app/providers/notifications-context/useNotifications', () => ({
  useNotifications: vi.fn(),
}));
vi.mock('@/shared/lib/hooks/use-modal', () => ({ useModal: vi.fn() }));

vi.mock(
  '@/pages/profile/profile-info/edit-profile/modals/update-profile-image-modal',
  () => ({ UpdateProfileImageModal: () => <div data-testid="image-modal" /> }),
);
vi.mock(
  '@/pages/profile/profile-info/edit-profile/modals/confirm-password-modal',
  () => ({
    ConfirmPasswordModal: ({ isOpen }: { isOpen: boolean }) =>
      isOpen ? <div data-testid="confirm-modal" /> : null,
  }),
);

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
      formState: { dirtyFields: mockDirtyFields },
      reset: mockReset,
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
        fieldState: { error: undefined },
      }),
  };
});

describe('EditProfile — business logic', () => {
  beforeEach(() => {
    user = userEvent.setup();
    mockUpdateProfile.mockReset();
    mockAdd.mockReset();
    mockReset.mockReset();
    vi.mocked(useModal).mockReset();

    mockDirtyFields = {};
    mockFormValues = {
      firstName: 'Helena',
      secondName: 'Hills',
      username: '@helena',
      email: 'helena@social.com',
      description: 'Hi',
    };

    vi.mocked(useModal).mockReturnValue({
      isOpen: false,
      open: vi.fn(),
      close: vi.fn(),
    });

    vi.mocked(useUser).mockReturnValue({
      user: {
        name: 'Helena',
        surname: 'Hills',
        username: 'helena',
        email: 'helena@social.com',
        description: 'Hi',
        avatar: '',
      },
    } as unknown as ReturnType<typeof useUser>);

    vi.mocked(useUpdateProfile).mockReturnValue({
      mutate: mockUpdateProfile,
      isPending: false,
    } as unknown as ReturnType<typeof useUpdateProfile>);

    vi.mocked(useNotifications).mockReturnValue({
      add: mockAdd,
      notifications: [],
    } as unknown as ReturnType<typeof useNotifications>);
  });

  test('shows noChanges when submitting without edits', async () => {
    mockDirtyFields = {};

    const screen = await render(<EditProfile />);
    await user.click(
      screen.getByRole('button', { name: 'editProfile.submit' }),
    );

    expect(mockAdd).toHaveBeenCalledWith({ message: 'editProfile.noChanges' });
    expect(mockUpdateProfile).not.toHaveBeenCalled();
  });

  test('updates profile when non-email fields changed', async () => {
    mockDirtyFields = { firstName: true };
    mockFormValues = {
      ...mockFormValues,
      firstName: 'John',
    };
    mockUpdateProfile.mockImplementation((_, opts) => opts.onSuccess());

    const screen = await render(<EditProfile />);
    await user.click(
      screen.getByRole('button', { name: 'editProfile.submit' }),
    );

    expect(mockUpdateProfile).toHaveBeenCalledWith(
      {
        firstName: 'John',
        secondName: 'Hills',
        username: 'helena',
        description: 'Hi',
      },
      expect.objectContaining({
        onSuccess: expect.any(Function),
        onError: expect.any(Function),
      }),
    );
    expect(mockAdd).toHaveBeenCalledWith({ message: 'editProfile.success' });
  });

  test('opens confirm password modal when email changed', async () => {
    mockDirtyFields = { email: true };
    mockFormValues = {
      ...mockFormValues,
      email: 'new@social.com',
    };

    const openConfirm = vi.fn();
    vi.mocked(useModal)
      .mockReturnValueOnce({ isOpen: false, open: vi.fn(), close: vi.fn() })
      .mockReturnValueOnce({
        isOpen: false,
        open: openConfirm,
        close: vi.fn(),
      });

    const screen = await render(<EditProfile />);
    await user.click(
      screen.getByRole('button', { name: 'editProfile.submit' }),
    );

    expect(openConfirm).toHaveBeenCalledTimes(1);
    expect(mockUpdateProfile).not.toHaveBeenCalled();
  });

  test('shows error toast when updateProfile fails', async () => {
    mockDirtyFields = { firstName: true };
    mockUpdateProfile.mockImplementation((_, opts) => {
      opts.onError(new Error('Network'));
    });

    const screen = await render(<EditProfile />);
    await user.click(
      screen.getByRole('button', { name: 'editProfile.submit' }),
    );

    expect(mockAdd).toHaveBeenCalledWith({
      message: 'editProfile.error {"message":"Network"}',
      type: 'error',
    });
  });
});
