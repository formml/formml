import type * as DslTypes from '@formml/dsl'

import { BigNumber } from 'bignumber.js'
import dayjs from 'dayjs'

import { assertNever } from './utils/assertNever.js'

export type PrimitiveTypeMapping = {
  bool: boolean
  datetime: Date | undefined
  decimal: BigNumber | undefined
  num: number | undefined
  text: string
}

export type PrimitiveType = PrimitiveTypeMapping[keyof PrimitiveTypeMapping]

function parseImpl(input: string, type: DslTypes.Primitive): PrimitiveType {
  if (type === 'text') return input

  if (type === 'num') {
    if (input.trim() === '') return undefined

    const result = Number(input)
    return isNaN(result) ? undefined : result
  }

  if (type === 'bool') return Boolean(input)

  if (type === 'decimal') {
    const result = new BigNumber(input)
    if (result.isNaN()) return undefined
    return result
  }

  if (type === 'datetime') {
    const result = dayjs(input)
    if (!result.isValid()) return undefined
    return result.toDate()
  }

  return assertNever`Unsupported type '${type}'`
}

// curried parse
export function parse<TType extends DslTypes.Primitive>(
  type: TType,
): (input: string) => PrimitiveTypeMapping[TType]
export function parse<TType extends DslTypes.Primitive>(
  input: string,
  type: TType,
): PrimitiveTypeMapping[TType]
export function parse(
  ...args: [DslTypes.Primitive] | [string, DslTypes.Primitive]
): ((input: string) => PrimitiveType) | PrimitiveType {
  if (args.length === 1) {
    const [type] = args
    return (input: string) => parseImpl(input, type)
  }
  return parseImpl(...args)
}

export function stringify(value: PrimitiveType): string {
  if (typeof value === 'boolean') {
    return value ? 'true' : ''
  }
  if (value instanceof BigNumber) {
    return value.toString()
  }
  if (value instanceof Date) {
    return value.toISOString()
  }
  if (typeof value === 'number') {
    return value.toString()
  }
  if (typeof value === 'string') {
    return value
  }
  if (typeof value === 'undefined') {
    return ''
  }
  return assertNever`Unsupported type '${value}'`
}
