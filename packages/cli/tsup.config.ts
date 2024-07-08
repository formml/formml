import { defineConfig } from 'tsup'

export default defineConfig({
  clean: true,
  entry: {
    lib: 'src/lib/index.ts',
  },
  noExternal: ['@formml/dsl'],
  outDir: './dist/cjs',
  sourcemap: true,
})
