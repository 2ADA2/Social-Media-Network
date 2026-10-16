import { describe, expect, test } from 'vitest';
import { render } from 'vitest-browser-react';
import { PasswordInput } from '.';

describe('PasswordInput component', () => {
  const inputValue = 'input-value';

  test('PasswordInput renders with init vaue', async () => {
    const screen = await render(<PasswordInput value={inputValue} />);

    await expect(screen.getByRole('textbox')).toHaveValue(inputValue);
  });
});
