import { beforeEach, describe, expect, test, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { Input } from '.';
import { userEvent } from 'vitest/browser';
import { useState } from 'react';

let user: ReturnType<typeof userEvent.setup>;

beforeEach(() => {
  user = userEvent.setup();
});

describe('Input component', () => {
  const inputValue = 'input-value';
  const inputLabel = 'input-label';
  const inputInfo = 'input-info';
  const inputError = 'input-error';

  test('Input renders with init value', async () => {
    const screen = await render(
      <Input value={inputValue} onChange={vi.fn()} />,
    );

    await expect.element(screen.getByRole('textbox')).toHaveValue(inputValue);
  });

  test('Input renders with init label', async () => {
    const screen = await render(
      <Input value={inputValue} label={inputLabel} onChange={vi.fn()} />,
    );

    await expect.element(screen.getByText(inputLabel)).toBeVisible();
  });

  test('Input works with onChange', async () => {
    function Wrapper() {
      const [value, setValue] = useState('');
      return <Input value={value} onChange={(e) => setValue(e.target.value)} />;
    }

    const screen = await render(<Wrapper />);

    await user.type(screen.getByRole('textbox'), inputValue);
    await expect.element(screen.getByRole('textbox')).toHaveValue(inputValue);
  });

  test('Shows info if custom=true', async () => {
    const screen = await render(
      <Input
        value={inputValue}
        label={inputLabel}
        custom
        info={inputInfo}
        onChange={vi.fn()}
      />,
    );

    await expect.element(screen.getByText(inputInfo)).toBeVisible();
  });

  test("Doesn't shows info if custom=false", async () => {
    const screen = await render(
      <Input value="" info={inputInfo} onChange={vi.fn()} />,
    );

    await expect.element(screen.getByText(inputInfo)).not.toBeInTheDocument();
  });

  test("Shows ok only if custom=true, value isn't empty and no error", async () => {
    const screen = await render(
      <Input custom value={inputValue} onChange={vi.fn()} />,
    );
    await expect.element(screen.getByTestId('input-ok-icon')).toBeVisible();

    await screen.rerender(<Input custom onChange={vi.fn()} value="" />);
    await expect
      .element(screen.getByTestId('input-ok-icon'))
      .not.toBeInTheDocument();

    await screen.rerender(
      <Input custom error={inputError} onChange={vi.fn()} value="" />,
    );
    await expect
      .element(screen.getByTestId('input-ok-icon'))
      .not.toBeInTheDocument();
  });

  test('Shows error', async () => {
    const screen = await render(
      <Input error={inputError} onChange={vi.fn()} value="" />,
    );

    await expect.element(screen.getByText(inputError)).toBeVisible();
    await expect
      .element(screen.getByTestId('input-cross-icon'))
      .toBeInTheDocument();
    await expect
      .element(screen.getByRole('textbox'))
      .toHaveAttribute('aria-invalid', 'true');
  });
});
