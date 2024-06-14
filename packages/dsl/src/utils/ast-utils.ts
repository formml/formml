import {
  Literal,
  Null,
  isDQString,
  isNull,
  isSQString,
} from '../language/index.js'

type LiteralValue<T extends Literal> = T extends { value: unknown }
  ? T['value']
  : T extends Null
    ? null
    : never

export function resolveLiteralValue<T extends Literal>(
  literal: T,
): LiteralValue<T>
export function resolveLiteralValue(literal: Literal) {
  if (isDQString(literal) || isSQString(literal)) {
    return literal.value.slice(1, -1)
  }
  if (isNull(literal)) {
    return null
  }
  return literal.value
}
