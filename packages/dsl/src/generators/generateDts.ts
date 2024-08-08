import { pascalCase } from 'change-case'
import { type AstNode, URI } from 'langium'

import { FormMLServices } from '../language/formml/formml-module.js'
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

export default async function generateDts(
  entry: string,
  packageName: string,
  services: FormMLServices,
) {
  const schema = await createFormMLParser(services)(URI.file(entry))

  return `import * as deps from '${packageName}'

${generateTypes(schema)}

declare const ast: _FormMLSchema
export default ast
`
}

export function initGenerateDts(services: FormMLServices) {
  return (entry: string, packageName: string) =>
    generateDts(entry, packageName, services)
}

export function generateFallbackDts(packageName: string) {
  return `import * as deps from '${packageName}'
declare const ast: deps.FormMLSchema
export default ast
`
}
