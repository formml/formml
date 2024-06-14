import { Argument, isPositionalArgument } from '../language/index.js'
import { resolveLiteralValue } from './ast-utils.js'

export type ArgsData<T extends readonly { name: string }[]> = {
  [K in T[number] as K['name']]: unknown
}

export function resolveArguments<T extends readonly { name: string }[]>(
  args: Argument[],
  declarations: T,
): ArgsData<T> {
  return args.reduce((data, arg, index) => {
    if (isPositionalArgument(arg)) {
      return {
        ...data,
        [declarations[index].name]: resolveLiteralValue(arg.value),
      }
    }
    return { ...data, [arg.name]: resolveLiteralValue(arg.value) }
  }, {} as ArgsData<T>)
}
