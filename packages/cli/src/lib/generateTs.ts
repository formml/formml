import * as dsl from '@formml/dsl'
import { readFile } from 'node:fs/promises'

function generateTypeRecursively(node: unknown, types: string[]): string {
  if (dsl.isFormMLSchema(node)) {
    const formTypeId = generateTypeRecursively(node.form, types)
    types.push(
      `export type _FormMLSchema = dsl.generics.FormMLSchema<${formTypeId}>`,
    )
    return '_FormMLSchema'
  }
  if (dsl.isForm(node)) {
    const inlineFieldTypes = node.fields.map(
      (field) => `dsl.generics.Field<'${field.name}', '${field.type}'>`,
    )
    const formTypeId = '_Form' + node.name
    types.push(
      `export type ${formTypeId} = dsl.generics.Form<'${
        node.name
      }', [${inlineFieldTypes.join(', ')}]>`,
    )
    return formTypeId
  }
  throw new Error('Unsupported node type')
}

function generateTypes(schema: dsl.FormMLSchema): string {
  const types: string[] = []
  generateTypeRecursively(schema, types)
  return types.join('\n\n')
}

export default async function generateTs(entry: string) {
  const file = await readFile(entry, { encoding: 'utf8' })
  const schema = await dsl.createFormMLParser()(file)

  return `import * as dsl from '@formml/dsl'

${generateTypes(schema)}

const json = ${dsl.utils.stringify(schema)}
const ast: _FormMLSchema = dsl.utils.parse(json)

export default ast
`
}
