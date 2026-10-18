import { beforeEach, describe, expect, test, vi } from 'vitest';
import { userEvent } from 'vitest/browser';
import { Fallback } from './fallback';
import { ROUTES } from '@/shared/config/routes';
import { renderWithRouter } from '@/test/render-with-router';

describe('Fallback', () => {
  const onReset = vi.fn();

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  test('renders fallback container', async () => {
    const screen = await renderWithRouter(
      <Fallback error={null} onReset={vi.fn()} />,
    );

    await expect.element(screen.getByTestId('fallback')).toBeVisible();
  });

  test('renders title and subtitle', async () => {
    const screen = await renderWithRouter(
      <Fallback error={null} onReset={vi.fn()} />,
    );

    await expect
      .element(screen.getByText('error.title', { exact: false }))
      .toBeVisible();
    await expect
      .element(screen.getByText('error.subtitle', { exact: false }))
      .toBeVisible();
  });

  test('renders back to home link with correct href', async () => {
    const screen = await renderWithRouter(
      <Fallback error={null} onReset={vi.fn()} />,
    );

    await expect
      .element(screen.getByRole('link', { name: 'error.backToHome' }))
      .toHaveAttribute('href', ROUTES.HOME);
  });

  test('calls onReset when back to home link is clicked', async () => {
    const user = userEvent.setup();
    const screen = await renderWithRouter(
      <Fallback error={null} onReset={onReset} />,
    );

    await user.click(screen.getByRole('link', { name: 'error.backToHome' }));

    expect(onReset).toHaveBeenCalledTimes(1);
  });

  test('renders error details when error is provided', async () => {
    const error = new Error('Something broke');
    error.name = 'CustomError';

    const screen = await renderWithRouter(
      <Fallback error={error} onReset={vi.fn()} />,
    );

    await expect.element(screen.getByText('CustomError')).toBeInTheDocument();
  });

  test('renders unknown error when error is null', async () => {
    const screen = await renderWithRouter(
      <Fallback error={null} onReset={vi.fn()} />,
    );

    await expect
      .element(screen.getByText('error.unknownError'))
      .toBeInTheDocument();
  });
});
