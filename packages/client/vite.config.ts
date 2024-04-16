/// <reference types="vitest" />
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],

  test: {
    environment: 'jsdom',
    globals: true,
    include: [
      'src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
      'integration-test/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
    ],
    restoreMocks: true,
    setupFiles: ['src/__test__/vitest-setup.ts'],
  },
})
