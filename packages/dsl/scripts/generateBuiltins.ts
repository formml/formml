import { EmptyFileSystem } from 'langium'
import { parseHelper } from 'langium/test'
import { existsSync } from 'node:fs'
import fs from 'node:fs/promises'
import path from 'node:path'
import * as prettier from 'prettier'

import { createFormMLDeclarationServices } from '../src/language/formml-declaration/formml-declaration-module.js'
import {
  type FormMLDeclaration,
  isFunctionDeclaration,
} from '../src/language/generated/ast.js'
import { evaluate } from '../src/language/type-system/types.js'

// Constants

const WORK_DIR = path.normalize('./builtins')

// Framework

type Chunk = { code: string; fileName: string }
type Transformer = (chunk: Chunk) => Chunk | Chunk[] | Promise<Chunk | Chunk[]>

async function ensureDir(path: string) {
  if (existsSync(path)) return
  await fs.mkdir(path, { recursive: true })
}

async function applyOrMap<I, O>(
  promise: Promise<I | I[]>,
  fn: (input: I) => Promise<O>,
) {
  const input = await promise
  if (Array.isArray(input)) {
    return Promise.all(input.map(fn))
  }
  return fn(input)
}

class Transpiler {
  private loadedChunks: Promise<Chunk>[] = []
  private transformedChunks: Promise<Chunk | Chunk[]>[] = []

  private async loadFile(this: void, fileName: string) {
    return {
      code: await fs.readFile(path.join(WORK_DIR, fileName), 'utf-8'),
      fileName,
    }
  }

  public load(fileNames: string[]) {
    this.loadedChunks = fileNames.map(this.loadFile)
    return this
  }

  public output() {
    return Promise.all(
      this.transformedChunks.map((chunk) =>
        applyOrMap(chunk, async ({ code, fileName }) => {
          const outputPath = path.join(WORK_DIR, fileName)
          const configs = await prettier.resolveConfig(outputPath)
          const formatted = await prettier.format(code, {
            ...configs,
            filepath: outputPath,
          })
          await ensureDir(path.dirname(outputPath))
          await fs.writeFile(outputPath, formatted)
          console.log(`generated: ${outputPath}`)
        }),
      ),
    )
  }

  public transform(transformers: Transformer[]) {
    this.transformedChunks = this.loadedChunks.flatMap((chunk) =>
      transformers.map(async (transformer) => transformer(await chunk)),
    )
    return this
  }
}

// Transformers

const services = createFormMLDeclarationServices(EmptyFileSystem)
const parse = async (code: string) => {
  const { diagnostics, parseResult } = await parseHelper<FormMLDeclaration>(
    services.FormMLDeclaration,
  )(code, { validation: true })
  if (
    (diagnostics && diagnostics.length > 0) ||
    parseResult.lexerErrors.length > 0 ||
    parseResult.parserErrors.length > 0
  ) {
    throw new Error(
      'Parsing failed with errors:\n' +
        [
          ...(diagnostics ?? []),
          ...parseResult.lexerErrors,
          ...parseResult.parserErrors,
        ]
          .map((e) => e.message)
          .join('\n'),
    )
  }
  return parseResult.value
}

const pick =
  <K extends string, T extends { [key in K]?: unknown }>(keys: K[]) =>
  (obj: T): Pick<T, K> =>
    keys.reduce((acc, key) => ({ ...acc, [key]: obj[key] }), {} as Pick<T, K>)

function generateInterface(ast: FormMLDeclaration) {
  const entries = ast.declarations
    .filter(isFunctionDeclaration)
    .map((declaration) => {
      const { name, parameters } = declaration
      const parameterSummaries = parameters
        .map(pick(['name', 'type', 'optional']))
        .map((p) => ({ ...p, type: evaluate(p.type) }))
      return [name, parameterSummaries] as const
    })
  return Object.fromEntries(entries)
}

const transformToInterface: Transformer = async ({ code, fileName }) => {
  const ast = await parse(code)
  const interface_ = generateInterface(ast)
  const interfaceCode = `export default ${JSON.stringify(
    interface_,
    null,
    2,
  )} as const`
  return {
    code: interfaceCode,
    fileName: path.join(
      'generated',
      'interfaces',
      fileName.replace('.d.formml', '.ts'),
    ),
  }
}

const transformToModule: Transformer = ({ code, fileName }) => [
  {
    code: `const content = ${JSON.stringify(code)};\nexport default content;`,
    fileName: path.join(
      'generated',
      'modules',
      fileName.replace('.d.formml', '.js'),
    ),
  },
  {
    code: `const content: string;\nexport default content;`,
    fileName: path.join(
      'generated',
      'modules',
      fileName.replace('.d.formml', '.d.ts'),
    ),
  },
]

// Main

console.log('start to generate interfaces...')

await fs.rm(path.join(WORK_DIR, 'generated'), { force: true, recursive: true })
const fileNames = await fs.readdir(WORK_DIR)

const transpiler = new Transpiler()

await transpiler
  .load(fileNames)
  .transform([transformToInterface, transformToModule])
  .output()

console.log('done')
