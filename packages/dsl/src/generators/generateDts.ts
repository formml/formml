import type { AstNode } from 'langium'

import { pascalCase } from 'change-case'
import { readFile } from 'node:fs/promises'

import * as ast from '../language/generated/ast.js'
import { createFormMLParser } from '../language/parser.js'

function getIdentifier(type: string, ...suffixes: string[]): string {
  return [`_${type}`, ...suffixes.map((s) => pascalCase(s))].join('_')
}

function generateTypeRecursively(node: AstNode, types: string[]): string {
  if (ast.isFormMLSchema(node)) {
    const childId = generateTypeRecursively(node.form, types)
    const identifier = getIdentifier(node.$type)
    types.push(`export type ${identifier} = deps.FormMLSchema<${childId}>`)
    return identifier
  }
  if (ast.isForm(node)) {
    const inlineFieldTypes = node.fields.map(
      (field) => `deps.Field<'${field.name}', '${field.type}'>`,
    )
    const identifier = getIdentifier(node.$type, node.name)
    types.push(
      `export type ${identifier} = deps.Form<'${
        node.name
      }', [${inlineFieldTypes.join(', ')}]>`,
    )
    return identifier
  }
  throw new Error('Unsupported node type')
}

function generateTypes(schema: ast.FormMLSchema): string {
  const types: string[] = []
  generateTypeRecursively(schema, types)
  return types.join('\n\n')
}

export default async function generateDts(entry: string, packageName: string) {
  const file = await readFile(entry, { encoding: 'utf8' })
  const schema = await createFormMLParser()(file)

  return `import deps from '${packageName}'

${generateTypes(schema)}

declare const ast: _FormMLSchema
export default ast
`
}

export function generateFallbackDts(packageName: string) {
  return `import deps from '${packageName}'
declare const ast: deps.FormMLSchema
export default ast
`
}
