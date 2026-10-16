import { describe, expect, test, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { Notification, TIMEOUT, REMOVE_TIMEOUT } from '.';

describe('Notifications component', () => {
  const message = 'default message';

  test('shows notification with init value', async () => {
    const screen = await render(
      <Notification message={message} onClose={vi.fn()} />,
    );

    await expect
      .element(screen.getByTestId('notification'))
      .toHaveTextContent(message);
  });

  test('Default notification is success', async () => {
    const screen = await render(
      <Notification message={message} onClose={vi.fn()} />,
    );

    await expect
      .element(screen.getByTestId('notification'))
      .toHaveAttribute('role', 'status');
  });

  test('Notification with type=error has status alert', async () => {
    const screen = await render(
      <Notification type="error" message={message} onClose={vi.fn()} />,
    );

    await expect
      .element(screen.getByTestId('notification'))
      .toHaveAttribute('role', 'alert');
  });

  test('Notification triggers onClose after timeout', async () => {
    vi.useFakeTimers();

    const onClose = vi.fn();
    await render(
      <Notification type="error" message={message} onClose={onClose} />,
    );

    await vi.advanceTimersByTimeAsync(
      Math.max(TIMEOUT + REMOVE_TIMEOUT - 10, 0),
    );
    expect(onClose).not.toHaveBeenCalled();

    await vi.advanceTimersByTimeAsync(TIMEOUT + REMOVE_TIMEOUT);
    expect(onClose).toHaveBeenCalled();

    vi.useRealTimers();
  });

  test('Close button triggers onClose', async () => {
    const onClose = vi.fn();
    const screen = await render(
      <Notification type="error" message={message} onClose={onClose} />,
    );

    await screen.getByRole('button').click();

    await vi.waitFor(() => expect(onClose).toHaveBeenCalled());
  });
});
