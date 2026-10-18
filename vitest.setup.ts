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

vi.mock('@/features/auth/use-auth', () => ({
  useAuth: () => ({
    isAuthenticated: false,
    user: null,
    login: vi.fn(),
    logout: vi.fn(),
  }),
}));

vi.mock('@/entities/user/model/use-user', () => ({
  useUser: vi.fn(() => ({
    user: null,
    setUser: vi.fn(),
  })),
}));

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});
