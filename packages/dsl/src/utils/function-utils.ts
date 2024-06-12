import {
  Argument,
  Literal,
  isDQString,
  isNull,
  isPositionalArgument,
  isSQString,
} from '../language/index.js'

const resolveLiteral = (literal: Literal) => {
  if (isDQString(literal) || isSQString(literal)) {
    return literal.value.slice(1, -1)
  }
  if (isNull(literal)) {
    return null
  }
  return literal.value
}

export function resolveArguments(
  args: Argument[],
  declarations: { name: string }[],
) {
  return args.reduce((data, arg, index) => {
    if (isPositionalArgument(arg)) {
      return { ...data, [declarations[index].name]: resolveLiteral(arg.value) }
    }
    return { ...data, [arg.name]: resolveLiteral(arg.value) }
  }, {})
}
