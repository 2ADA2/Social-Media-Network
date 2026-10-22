import { describe, expect, test } from 'vitest';
import { render } from 'vitest-browser-react';
import { ErrorBoundary } from '.';
import { renderWithRouter } from '@/test/render-with-router';
import { useState } from 'react';
import { userEvent } from 'vitest/browser';

const Component = ({ hasError }: { hasError: boolean }) => {
  if (hasError) throw new Error('hasError');

  return <div> component </div>;
};

function Wrapper() {
  const [hasError, setHasError] = useState(false);

  return (
    <>
      <button onClick={() => setHasError(true)}>trigger error</button>
      <ErrorBoundary>
        <Component hasError={hasError} />
      </ErrorBoundary>
    </>
  );
}

describe('ErrorBoundary', () => {
  test('Renders component without error', async () => {
    const screen = await render(
      <ErrorBoundary>
        <Component hasError={false} />
      </ErrorBoundary>,
    );

    await expect.element(screen.getByText('component')).toBeVisible();
    await expect
      .element(screen.getByTestId('fallback'))
      .not.toBeInTheDocument();
  });

  test('Renders fallback with error', async () => {
    const screen = await renderWithRouter(
      <ErrorBoundary>
        <Component hasError={true} />
      </ErrorBoundary>,
    );

    await expect.element(screen.getByText('component')).not.toBeInTheDocument();
    await expect.element(screen.getByTestId('fallback')).toBeVisible();
  });

  test('Renders component than shows fallback', async () => {
    const user = userEvent.setup();
    const screen = await renderWithRouter(<Wrapper />);

    await expect.element(screen.getByText('component')).toBeVisible();

    await user.click(screen.getByText('trigger error'));

    await expect.element(screen.getByText('component')).not.toBeInTheDocument();
    await expect.element(screen.getByTestId('fallback')).toBeVisible();
  });
});
