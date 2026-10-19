import { defineConfig } from 'vitest/config';
import { playwright } from '@vitest/browser-playwright';
import { resolve } from 'path';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  optimizeDeps: {
    include: [
      'react-dom/client',
      'vitest-browser-react',
      '@react-spring/web',
      '@tanstack/react-query',
    ],
  },
  plugins: [
    react(),
    svgr({
      include: '**/*.svg?react',
    }),
  ],
  test: {
    isolate: true,
    env: {
      TZ: 'UTC',
    },
    setupFiles: ['./vitest.setup.ts'],
    alias: {
      '@': resolve(import.meta.dirname, 'src'),
    },
    browser: {
      enabled: true,
      instances: [{ browser: 'chromium' }],
      headless: true,
      provider: playwright(),
    },
    clearMocks: true,
    restoreMocks: true,
    environment: 'jsdom',
    globals: true,
    coverage: {
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'src/**/*.styles.ts',
        'src/**/*.test.{ts,tsx}',
        'src/**/*.d.ts',
        'src/main.tsx',
        'src/**/index.ts',
        'src/shard/config/**',
      ],
      provider: 'v8',
      thresholds: {
        lines: 70,
        functions: 70,
        branches: 70,
        statements: 70,

        'src/shared/ui/**/*.{ts,tsx}': {
          lines: 90,
          functions: 90,
          branches: 90,
          statements: 90,
        },
      },
    },
  },
});
