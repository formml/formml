import { defineConfig } from 'tsup'

export default defineConfig({
  clean: true,
  entry: ['src/index.ts', 'src/language/main.ts'],
  external: ['vscode'],
  loader: {
    '.formml': 'binary',
  },
  noExternal: ['@formml/dsl', 'langium'],
  sourcemap: true,
})
