import { AstNode, isReference } from 'langium'

import { Literal, NullLiteral, isNullLiteral } from '../language/index.js'

type LiteralValue<T extends Literal> = T extends { value: unknown }
  ? T['value']
  : T extends NullLiteral
    ? null
    : never

export function resolveLiteralValue<T extends Literal>(
  literal: T,
): LiteralValue<T>
export function resolveLiteralValue(literal: Literal) {
  if (isNullLiteral(literal)) {
    return null
  }
  return literal.value
}

const ignoredProperties = new Set([
  '$container',
  '$containerProperty',
  '$containerIndex',
  '$document',
  '$cstNode',
])

function buildAstNodePath(
  node: AstNode,
  stop: AstNode,
): [jsonPath: string, root: AstNode] {
  if (node === stop) {
    return ['$', node]
  }
  if (!node.$container) {
    return ['$', node]
  }
  const container = node.$container
  const property = node.$containerProperty
  if (!property) {
    throw new Error("Missing '$containerProperty' in AST node.")
  }
  const index = node.$containerIndex
  const indexSegment = index !== undefined ? `[${index}]` : ''

  const [jsonPath, root] = buildAstNodePath(container, stop)
  return [`${jsonPath}.${property}${indexSegment}`, root]
}

function replacer(root: AstNode): (key: string, value: unknown) => unknown {
  return (key: string, value: unknown) => {
    if (ignoredProperties.has(key)) {
      return undefined
    }
    if (isReference(value)) {
      const { $refText, ref } = value
      if (ref === undefined) {
        return { $refText }
      }

      const [jsonPath] = buildAstNodePath(ref, root)
      return { $ref: `#${jsonPath}`, $refText }
    }
    return value
  }
}

export function stringify(node: AstNode, space?: number | string): string {
  return JSON.stringify({ node }, replacer(node), space)
}
