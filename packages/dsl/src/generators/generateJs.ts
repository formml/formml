import { readFile } from 'node:fs/promises'

import { createFormMLParser } from '../index.js'
import { stringify } from '../utils/ast-utils.js'

export default async function generateJs(
  entry: string,
  packageName: string,
): Promise<string> {
  const file = await readFile(entry, { encoding: 'utf8' })
  const schema = await createFormMLParser()(file)

  return `import deps from '${packageName}'

const json = ${JSON.stringify(stringify(schema))}
const ast = deps.parse(json)
export default ast
`
}

export { parse } from '../utils/ast-utils.js'
