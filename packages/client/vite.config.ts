/// <reference types="vitest" />
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  cacheDir: './node_modules/.vite',

  plugins: [react()],

  test: {
    cache: {
      dir: './node_modules/.vitest',
    },
    environment: 'jsdom',
    globals: true,
    include: [
      'src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
      'integration-test/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
    ],
    setupFiles: ['src/__test__/vitest-setup.ts'],
  },
})
