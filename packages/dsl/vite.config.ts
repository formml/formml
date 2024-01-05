/// <reference types="vitest" />
import { defineConfig } from 'vite'
import viteTsConfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  cacheDir: '../../node_modules/.vite/dsl',

  plugins: [
    viteTsConfigPaths({
      root: '../../',
    }),
  ],

  test: {
    cache: {
      dir: '../../node_modules/.vitest',
    },
    environment: 'node',
    globals: true,
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    reporters: ['default'],
  },
})
