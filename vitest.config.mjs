import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    alias: {
      '~/': new URL('./src/', import.meta.url).pathname,
    },
    coverage: {
      provider: 'v8',
      include: ['**/*.tsx'],
      exclude: ['**/node_modules/**', '**/*.test.tsx', '**/*.spec.tsx'],
      thresholds: {
        statements: 80,
      },
    },
  },
});
