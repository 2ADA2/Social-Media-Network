import { describe, expect, test, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { useThemeStore } from '@/app/store/theme-store.ts';
import { ThemeProvider } from '.';

vi.mock('@/app/store/theme-store.ts', () => ({
  useThemeStore: vi.fn().mockImplementation(() => 'light'),
}));

const ThemeConsumer = () => {
  const theme = useThemeStore((store) => store.theme);
  return <div data-testid="theme-mode">{theme}</div>;
};

describe('ThemeProvider', () => {
  test('renders children', async () => {
    const screen = await render(
      <ThemeProvider>
        <div data-testid="child">child</div>
      </ThemeProvider>,
    );

    await expect.element(screen.getByTestId('child')).toBeVisible();
  });

  test('provides theme from store', async () => {
    const screen = await render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>,
    );

    await expect
      .element(screen.getByTestId('theme-mode'))
      .toHaveTextContent('light');
  });
});
