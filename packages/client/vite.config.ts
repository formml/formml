/// <reference types="vitest" />
import ts from 'typescript'
import { defineConfig } from 'vite'
import { vitePluginTypescriptTransform } from 'vite-plugin-typescript-transform'

export default defineConfig({
  plugins: [
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
    globals: true,
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    restoreMocks: true,
  },
})
