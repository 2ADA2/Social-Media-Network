import { useNotifications } from '@/app/providers/notifications-context/useNotifications';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { Notifications } from '.';
import { userEvent } from 'vitest/browser';
import { REMOVE_TIMEOUT } from '@/shared/ui/notification';

vi.mock('@/app/providers/notifications-context/useNotifications', async () => ({
  useNotifications: vi.fn(),
}));

describe('Notifications component', () => {
  let onDelete = vi.fn();
  beforeEach(() => {
    vi.mocked(useNotifications).mockReturnValue({
      add: vi.fn(),
      notifications: [{ message: 'message 1', id: 1 }],
    });

    onDelete = vi.fn();
  });

  test('renders one notifications', async () => {
    const screen = await render(<Notifications onDelete={onDelete} />);
    await expect.element(screen.getByText('message 1')).toBeVisible();
  });

  test('renders empty notifications component', async () => {
    vi.mocked(useNotifications).mockReturnValue({
      add: vi.fn(),
      notifications: [],
    });
    const screen = await render(<Notifications onDelete={onDelete} />);
    await expect.element(screen.getByRole('log')).toBeInTheDocument();
    expect(screen.getByText('message 1').query()).toBeNull();
  });

  test('renders not more than ${} notifications', async () => {
    vi.mocked(useNotifications).mockReturnValue({
      add: vi.fn(),
      notifications: [
        { message: 'message 1', id: 1 },
        { message: 'message 2', id: 2 },
        { message: 'message 3', id: 3 },
        { message: 'message 4', id: 4 },
        { message: 'message 5', id: 5 },
        { message: 'message 6', id: 6 },
      ],
    });
    const screen = await render(<Notifications onDelete={onDelete} />);
    await expect.element(screen.getByRole('log')).toBeInTheDocument();
    expect(screen.getByText('message 6').query()).toBeNull();
  });

  test('delete message button triggers onDelete', async () => {
    const user = userEvent.setup();
    vi.useFakeTimers();
    vi.mocked(useNotifications).mockReturnValue({
      add: vi.fn(),
      notifications: [{ message: 'message 1', id: 1 }],
    });

    const screen = await render(<Notifications onDelete={onDelete} />);

    await expect.element(screen.getByText('message 1')).toBeVisible();
    await user.click(
      screen.getByRole('button', { name: 'notification.close' }),
    );

    vi.advanceTimersByTime(REMOVE_TIMEOUT);

    expect(onDelete).toHaveBeenCalled();
    vi.useRealTimers();
  });
});
