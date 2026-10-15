import { describe, expect, test } from 'vitest';
import { TextArea } from '.';
import { render } from 'vitest-browser-react';
import { userEvent } from 'vitest/browser';

describe('TextArea component', () => {
  const textAreaValue = 'TextArea value';
  const textAreaLabel = 'TextArea label';
  const textAreaInfo = 'TextArea info';
  const textAreaError = 'TextArea error';

  test('TextArea value', async () => {
    const screen = await render(<TextArea value={textAreaValue} />);

    await expect
      .element(screen.getByRole('textbox'))
      .toHaveValue(textAreaValue);
  });

  test('TextArea label', async () => {
    const screen = await render(
      <TextArea value={textAreaValue} label={textAreaLabel} />,
    );

    await expect.element(screen.getByText(textAreaLabel)).toBeVisible();
  });

  test('TextArea shows info on focus', async () => {
    const screen = await render(
      <TextArea
        value={textAreaValue}
        label={textAreaLabel}
        info={textAreaInfo}
      />,
    );

    await userEvent.click(screen.getByRole('textbox'));

    await expect.element(screen.getByText(textAreaInfo)).toBeVisible();
  });

  test('TextArea shows error on focus', async () => {
    const screen = await render(
      <TextArea
        value={textAreaValue}
        label={textAreaLabel}
        info={textAreaInfo}
        errorMessage={textAreaError}
      />,
    );

    await userEvent.click(screen.getByRole('textbox'));

    await expect.element(screen.getByText(textAreaError)).toBeVisible();
    await expect
      .element(screen.getByText(textAreaInfo))
      .not.toBeInTheDocument();
  });
});
