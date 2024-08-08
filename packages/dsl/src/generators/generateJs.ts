import { URI } from 'langium'

import { FormMLSchema, createFormMLParser } from '../index.js'
import { FormMLServices } from '../language/formml/formml-module.js'
import { stringify } from '../utils/ast-utils.js'

export default async function generateJs(
  entry: string,
  packageName: string,
  services: FormMLServices,
): Promise<string> {
  const schema = await createFormMLParser(services)(URI.file(entry))
  return generateJsFromSchema(schema, packageName)
}

export async function generateJsFromContent(
  content: string,
  packageName: string,
  services?: FormMLServices,
) {
  const schema = await createFormMLParser(services)(content)
  return generateJsFromSchema(schema, packageName)
}

function generateJsFromSchema(schema: FormMLSchema, packageName: string) {
  return `import * as deps from '${packageName}'

const json = ${JSON.stringify(stringify(schema))}
const ast = deps.parse(json)
export default ast
`
}
