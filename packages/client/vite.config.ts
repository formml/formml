/// <reference types="vitest" />
import react from '@vitejs/plugin-react'
import ts from 'typescript'
import { defineConfig } from 'vite'
import { vitePluginTypescriptTransform } from 'vite-plugin-typescript-transform'

export default defineConfig({
  plugins: [
    react(),
    vitePluginTypescriptTransform({
      enforce: 'pre',
      filter: {
        files: {
          include: '**/FormML.ts',
        },
      },
      tsconfig: {
        override: {
          module: ts.ModuleKind.ESNext,
          target: ts.ScriptTarget.ES2022,
        },
      },
    }),
  ],

  test: {
    environment: 'jsdom',
    globals: true,
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    restoreMocks: true,
    setupFiles: ['src/__test__/vitest-setup.ts'],
  },
})
