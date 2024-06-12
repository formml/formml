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

export type ArgsData<T extends readonly { name: string }[]> = {
  [K in T[number] as K['name']]: unknown
}

export function resolveArguments<T extends readonly { name: string }[]>(
  args: Argument[],
  declarations: T,
): ArgsData<T> {
  return args.reduce((data, arg, index) => {
    if (isPositionalArgument(arg)) {
      return { ...data, [declarations[index].name]: resolveLiteral(arg.value) }
    }
    return { ...data, [arg.name]: resolveLiteral(arg.value) }
  }, {} as ArgsData<T>)
}
