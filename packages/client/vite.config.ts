/// <reference types="vitest" />
import { defineConfig } from 'vite'

import viteTsConfigPaths from 'vite-tsconfig-paths'
import react from '@vitejs/plugin-react'

export default defineConfig({
  cacheDir: '../../node_modules/.vite/client',

  plugins: [
    viteTsConfigPaths({
      root: '../../',
    }),
    react(),
  ],

  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [
  //    viteTsConfigPaths({
  //      root: '../../',
  //    }),
  //  ],
  // },

  test: {
    reporters: ['default'],
    globals: true,
    cache: {
      dir: '../../node_modules/.vitest',
    },
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    setupFiles: ['src/__test__/vitest-setup.ts'],
  },
})
