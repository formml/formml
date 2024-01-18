/// <reference types="vitest" />
import { defineConfig } from 'vite'

export default defineConfig({
  cacheDir: './node_modules/.vite',

  test: {
    cache: {
      dir: './node_modules/.vitest',
    },
    environment: 'node',
    globals: true,
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
  },
})
