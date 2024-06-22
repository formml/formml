import { AstNode } from 'langium'

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

export function stringify(node: AstNode, space?: number | string): string {
  return JSON.stringify({ node }, null, space)
}
