import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import { defineConfig, loadEnv } from 'vite';
import { resolve } from "path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react(), svgr()],
    base: env.VITE_BASE || '/',
    resolve: {
      alias: {
        "@": resolve(import.meta.dirname, 'src'),
      },
    },
  };
});
