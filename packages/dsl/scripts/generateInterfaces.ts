import { parseHelper } from 'langium/test'
import fs from 'node:fs/promises'
import * as prettier from 'prettier'

import {
  FormMLDeclaration,
  createInMemoryAggregateServices,
} from '../src/index.js'

await fs.rm('./interfaces', { force: true, recursive: true })
await fs.mkdir('./interfaces')

const services = createInMemoryAggregateServices()
const parse = parseHelper<FormMLDeclaration>(services.FormMLDeclaration)

const fileNames = await fs.readdir('./builtins')

function generateInterface(ast: FormMLDeclaration) {
  const entries = ast.declarations.map((declaration) => {
    const { name, parameters } = declaration
    const parameterSummaries = parameters.map((p) => ({ name: p.name }))
    return [name, parameterSummaries] as const
  })
  return Object.fromEntries(entries)
}

console.log('start to generate interfaces...')

await Promise.all(
  fileNames
    .map((fileName) => ({
      content: fs
        .readFile(`./builtins/${fileName}`)
        .then((content) => content.toString()),
      fileName,
    }))
    .map(({ content, fileName }) => ({
      ast: content
        .then((content) => parse(content))
        .then((x) => x.parseResult.value),
      fileName,
    }))
    .map(({ ast, fileName }) => ({
      fileName,
      interface_: ast.then((ast) => generateInterface(ast)),
    }))
    .map(({ fileName, interface_ }) => ({
      content: interface_.then(
        (interface_) =>
          `export default ${JSON.stringify(interface_, null, 2)} as const`,
      ),
      fileName,
    }))
    .map(async ({ content, fileName }) => {
      const outputFileName = fileName.replace('.d.formml', '.ts')
      const outputPath = `./interfaces/${outputFileName}`
      const configs = await prettier.resolveConfig(outputPath)
      const formatted = await prettier.format(await content, {
        ...configs,
        parser: 'typescript',
      })
      await fs.writeFile(outputPath, formatted)
      console.log(`generated: ${outputPath}`)
    }),
)

console.log('done')
