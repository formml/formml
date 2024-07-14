import { defineConfig } from 'tsup'

export default defineConfig({
  clean: true,
  dts: true,
  entry: {
    deps: 'src/deps.ts',
    index: 'src/index.ts',
    worker: 'src/external/generateDtsSync/worker.js',
  },
  external: ['./worker.js'],
  noExternal: ['@formml/dsl'],
  sourcemap: true,
})
