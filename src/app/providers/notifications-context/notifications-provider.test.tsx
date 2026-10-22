import { describe, expect, test, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { userEvent } from 'vitest/browser';
import { NotificationsProvider } from '.';
import { useNotifications } from './useNotifications';

vi.mock('@/widgets/notifications', () => ({
  Notifications: ({ onDelete }: { onDelete: (id: number) => void }) => (
    <div data-testid="notifications-mock">
      <button onClick={() => onDelete(0)}>delete 0</button>
    </div>
  ),
}));

function TestConsumer() {
  const { notifications, add } = useNotifications();

  return (
    <div>
      <button onClick={() => add({ message: 'test', type: 'success' })}>
        add
      </button>
      <ul data-testid="notifications-list">
        {notifications.map((n) => (
          <li key={n.id} data-testid={`notification-${n.id}`}>
            {n.message}
          </li>
        ))}
      </ul>
    </div>
  );
}

describe('NotificationsProvider', () => {
  test('throws when useNotifications is used outside provider', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    await expect(() => render(<TestConsumer />)).rejects.toThrow(
      'No notifications context.',
    );

    consoleSpy.mockRestore();
  });

  test('renders children', async () => {
    const screen = await render(
      <NotificationsProvider>
        <div data-testid="child">child</div>
      </NotificationsProvider>,
    );

    await expect.element(screen.getByTestId('child')).toBeVisible();
  });

  test('renders Notifications component', async () => {
    const screen = await render(<NotificationsProvider />);

    await expect
      .element(screen.getByTestId('notifications-mock'))
      .toBeVisible();
  });

  test('addNotification adds a notification', async () => {
    const user = userEvent.setup();
    const screen = await render(
      <NotificationsProvider>
        <TestConsumer />
      </NotificationsProvider>,
    );

    await user.click(screen.getByRole('button', { name: 'add' }));

    await expect
      .element(screen.getByTestId('notification-0'))
      .toHaveTextContent('test');
  });

  test('addNotification assigns incremental ids', async () => {
    const user = userEvent.setup();
    const screen = await render(
      <NotificationsProvider>
        <TestConsumer />
      </NotificationsProvider>,
    );

    await user.click(screen.getByRole('button', { name: 'add' }));
    await user.click(screen.getByRole('button', { name: 'add' }));

    await expect.element(screen.getByTestId('notification-0')).toBeVisible();
    await expect.element(screen.getByTestId('notification-1')).toBeVisible();
  });

  test('deleteNotification removes a notification', async () => {
    const user = userEvent.setup();
    const screen = await render(
      <NotificationsProvider>
        <TestConsumer />
      </NotificationsProvider>,
    );

    await user.click(screen.getByRole('button', { name: 'add' }));
    await expect.element(screen.getByTestId('notification-0')).toBeVisible();

    await user.click(screen.getByRole('button', { name: 'delete 0' }));

    expect(screen.getByTestId('notification-0')).not.toBeInTheDocument();
  });
});
