import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    css: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: [
        'src/components/scorecard/progress-bar.tsx',
        'src/components/scorecard/question-card.tsx',
        'src/data/services.ts',
        'src/lib/assessment/scoring.ts',
        'src/lib/roi-calculator.ts',
        'src/lib/scorecard.ts',
        'src/lib/utils.ts',
      ],
      exclude: [
        'src/**/*.d.ts',
        'src/test/**',
        'node_modules/',
      ],
      thresholds: {
        lines: 70,
        functions: 70,
        branches: 70,
        statements: 70,
      },
    },
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    exclude: ['node_modules', '.next', 'e2e'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
