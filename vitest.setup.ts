import { afterEach, beforeEach, vi } from 'vitest';
import { Globals } from '@react-spring/web';

Globals.assign({
  skipAnimation: true,
});

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, options?: Record<string, number | string>) =>
      options ? key + ' ' + JSON.stringify(options) : key,
    i18n: {
      changeLanguage: vi.fn(),
      language: 'en',
    },
  }),
}));

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});
