import { readFile } from 'node:fs/promises'

import * as ast from '../language/generated/ast.js'
import { createFormMLParser } from '../language/parser.js'
import { stringify } from '../utils/ast-utils.js'

function generateTypeRecursively(node: unknown, types: string[]): string {
  if (ast.isFormMLSchema(node)) {
    const formTypeId = generateTypeRecursively(node.form, types)
    types.push(`export type _FormMLSchema = utils.FormMLSchema<${formTypeId}>`)
    return '_FormMLSchema'
  }
  if (ast.isForm(node)) {
    const inlineFieldTypes = node.fields.map(
      (field) => `utils.Field<'${field.name}', '${field.type}'>`,
    )
    const formTypeId = '_Form' + node.name
    types.push(
      `export type ${formTypeId} = utils.Form<'${
        node.name
      }', [${inlineFieldTypes.join(', ')}]>`,
    )
    return formTypeId
  }
  throw new Error('Unsupported node type')
}

function generateTypes(schema: ast.FormMLSchema): string {
  const types: string[] = []
  generateTypeRecursively(schema, types)
  return types.join('\n\n')
}

export default async function generateTs(entry: string, packageName: string) {
  const file = await readFile(entry, { encoding: 'utf8' })
  const schema = await createFormMLParser()(file)

  return `import * as utils from '${packageName}'

${generateTypes(schema)}

const json = ${stringify(schema)}
const ast: _FormMLSchema = utils.parse(json)

export default ast
`
}
