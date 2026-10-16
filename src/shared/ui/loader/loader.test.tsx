import { Loader } from '.';
import { describe, expect, test } from 'vitest';
import { render } from 'vitest-browser-react';

describe('Loader component', () => {
  test('Loader renders', async () => {
    const screen = await render(<Loader />);

    await expect.element(screen.getByTestId('loader')).toBeVisible();
  });

  test('Loader isBlock=false', async () => {
    const screen = await render(<Loader isBlock={false} />);

    await expect
      .element(screen.getByTestId('loader'))
      .toHaveClass('loader-small-container');
  });

  test('Loader isBlock=true (default)', async () => {
    const screen = await render(<Loader isBlock />);

    await expect.element(screen.getByTestId('loader')).toHaveClass('loader');
  });
});
