import { defineConfig } from 'tsup'

export default defineConfig({
  clean: true,
  dts: true,
  entry: ['src/index.ts'],
  noExternal: ['@formml/dsl'],
  outDir: './dist/cjs',
  sourcemap: true,
})
