import { defineConfig } from 'tsup'

export default defineConfig({
  clean: true,
  dts: true,
  entry: ['src/index.ts', 'src/deps.ts'],
  noExternal: ['@formml/dsl'],
  outDir: './dist/cjs',
  sourcemap: true,
})
