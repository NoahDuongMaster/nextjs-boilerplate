/* eslint-disable import/no-unused-modules */
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react(), viteTsconfigPaths()],
  test: {
    environment: 'jsdom',
    coverage: {
      exclude: [
        'src/adapters/**',
        'src/locales/**',
        'src/hooks/**',
        'src/components/**',
        'src/store/**',
        'src/utils/**',
      ],
    },
    setupFiles: ['./src/__test__/setup/matchMedia.ts'],
  },
});
