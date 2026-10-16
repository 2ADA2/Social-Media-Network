import { beforeEach, describe, expect, test, vi } from 'vitest';
import { Notification, TIMEOUT } from '.';
import { render } from 'vitest-browser-react';
import { userEvent } from 'vitest/browser';

let user: ReturnType<typeof userEvent.setup>;

beforeEach(() => {
  user = userEvent.setup();
});

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

  test(`Notification triggers onClose in ${TIMEOUT}ms`, async () => {
    const onClose = vi.fn();
    const screen = await render(
      <Notification type="error" message={message} onClose={onClose} />,
    );

    await expect
      .element(screen.getByTestId('notification'))
      .toBeInTheDocument();
    expect(onClose).not.toHaveBeenCalled();

    vi.advanceTimersByTime(Math.max(TIMEOUT - 10, 0));
    expect(onClose).not.toHaveBeenCalled();

    vi.advanceTimersByTime(10);
    expect(onClose).toHaveBeenCalled();
  });

  test(`Close button triggers onClose`, async () => {
    const onClose = vi.fn();
    const screen = await render(
      <Notification type="error" message={message} onClose={onClose} />,
    );

    await user.click(screen.getByRole('button'));
    expect(onClose).toHaveBeenCalled();
  });
});
