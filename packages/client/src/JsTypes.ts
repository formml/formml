import type * as DslTypes from '@formml/dsl'

import { BigNumber } from 'bignumber.js'
import dayjs from 'dayjs'

import { assertNever } from './utils/assertNever.js'

export type PrimitiveTypeMapping = {
  bool: boolean | undefined
  datetime: Date | undefined
  decimal: BigNumber | undefined
  num: number | undefined
  text: string | undefined
}

export type PrimitiveType = PrimitiveTypeMapping[keyof PrimitiveTypeMapping]

export function parse(input: string, type: DslTypes.PrimitiveType) {
  if (type === 'text') return input

  if (type === 'num') {
    if (input.trim() === '') return undefined

    const result = Number(input)
    return isNaN(result) ? undefined : result
  }

  if (type === 'bool') return Boolean(input)

  if (type === 'decimal') return new BigNumber(input)

  if (type === 'datetime') return dayjs(input).toDate()

  return assertNever`Unsupported type '${type}'`
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
