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

export function toTyped(rawValue: string, type: DslTypes.PrimitiveType) {
  if (rawValue === '' && type !== 'text') {
    return undefined
  }
  switch (type) {
    case 'bool':
      // TODO: convert string to boolean directly
      return rawValue === 'true' ? true : false
    case 'decimal':
      return new BigNumber(rawValue)
    case 'datetime':
      return dayjs(rawValue).toDate()
    case 'num':
      return Number(rawValue)
    case 'text':
      return rawValue
    default: {
      return assertNever`Unsupported type '${type}'`
    }
  }
}

export function toRaw(value: PrimitiveType): string {
  if (typeof value === 'boolean') {
    return value ? 'true' : 'false'
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
