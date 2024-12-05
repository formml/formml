import { defineConfig } from 'tsup'

export default defineConfig({
  clean: true,
  entry: ['src/index.ts', 'src/language/main.ts'],
  external: ['vscode'],
  loader: {
    '.fml': 'binary',
  },
  noExternal: ['@formml/dsl', 'langium'],
  sourcemap: true,
})
