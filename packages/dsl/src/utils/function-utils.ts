import type * as ast from '../language/generated/ast.js'
import type { Argument } from '../language/index.js'
import type * as t from '../language/type-system/index.js'

import { isPositionalArgument } from '../language/index.js'
import { resolveLiteralValue } from './ast-utils.js'

type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never

type ParameterDeclaration = {
  name: string
  optional: boolean
  type?: ast.TypeExpr | t.Type
}

type RuntimeType<T> = T extends t.TextType
  ? string
  : T extends t.NumType
    ? number
    : T extends t.BoolType
      ? boolean
      : unknown

type Filter<T extends readonly unknown[], E> = T extends readonly [
  infer F,
  ...infer R,
]
  ? F extends E
    ? [F, ...Filter<R, E>]
    : Filter<R, E>
  : []

type RequiredItems<T extends readonly { optional: boolean }[]> = Filter<
  T,
  { optional: false }
>

export type ArgsData<T extends readonly ParameterDeclaration[]> = Expand<
  {
    [Item in T[number] as Item['name']]?: RuntimeType<Item['type']>
  } & {
    [Item in RequiredItems<T>[number] as Item['name']]: RuntimeType<
      Item['type']
    >
  }
>

export function resolveArguments<T extends readonly ParameterDeclaration[]>(
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
