import {
  Argument,
  Literal,
  isDQString,
  isNull,
  isPositionalArgument,
  isSQString,
} from '../language/index.js'

export function resolveArguments(
  args: Argument[],
  declarations: { name: string }[],
) {
  return args.reduce((data, arg, index) => {
    if (isPositionalArgument(arg)) {
      const resolveLiteral = (literal: Literal) => {
        if (isDQString(literal) || isSQString(literal)) {
          return literal.value.slice(1, -1)
        }
        if (isNull(literal)) {
          return null
        }
        return literal.value
      }
      return { ...data, [declarations[index].name]: resolveLiteral(arg.value) }
    }
    return data
  }, {})
}
