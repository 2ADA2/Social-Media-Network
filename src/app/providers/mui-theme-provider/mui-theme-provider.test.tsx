import { describe, expect, test } from 'vitest';
import { render } from 'vitest-browser-react';
import { useTheme } from '@mui/material';
import { MuiThemeProvider } from '.';

const ThemeConsumer = () => {
  const theme = useTheme();
  return <div data-testid="theme-mode">{theme.palette.mode}</div>;
};

describe('MuiThemeProvider', () => {
  test('renders children', async () => {
    const screen = await render(
      <MuiThemeProvider>
        <div data-testid="child">child</div>
      </MuiThemeProvider>,
    );

    await expect.element(screen.getByTestId('child')).toBeVisible();
  });

  test('provides theme from store', async () => {
    const screen = await render(
      <MuiThemeProvider>
        <ThemeConsumer />
      </MuiThemeProvider>,
    );

    await expect
      .element(screen.getByTestId('theme-mode'))
      .toHaveTextContent('light');
  });
});
