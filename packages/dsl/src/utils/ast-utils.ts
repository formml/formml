import {
  Literal,
  NullLiteral,
  isDQTextLiteral,
  isNullLiteral,
  isSQTextLiteral,
} from '../language/index.js'

type LiteralValue<T extends Literal> = T extends { value: unknown }
  ? T['value']
  : T extends NullLiteral
    ? null
    : never

export function resolveLiteralValue<T extends Literal>(
  literal: T,
): LiteralValue<T>
export function resolveLiteralValue(literal: Literal) {
  if (isDQTextLiteral(literal) || isSQTextLiteral(literal)) {
    return literal.value.slice(1, -1)
  }
  if (isNullLiteral(literal)) {
    return null
  }
  return literal.value
}
