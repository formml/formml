import type * as DslTypes from '@formml/dsl'

import { assertNever } from '@formml/utils'
import { BigNumber } from 'bignumber.js'
import dayjs from 'dayjs'

import type { PrimitiveTypeMapping } from '../types.js'

/**
 * Creates a function that converts a plain value to a specific primitive type.
 * @param type - The primitive type to convert to.
 * @returns A function that takes a plain value and returns the converted primitive type or `undefined`.
 * @example
 * // text: JS string
 * const result = fromPlain('text')('hello') // 'hello'
 * // num: JS number
 * const result = fromPlain('num')(123.45) // 123.45
 * const result = fromPlain('num')('123.45') // undefined
 * // bool: JS boolean
 * const result = fromPlain('bool')(true) // true
 * const result = fromPlain('bool')('true') // undefined
 * // datetime: Date object or ISO datetime string
 * const result = fromPlain('datetime')(new Date()) // Date object
 * const result = fromPlain('datetime')('2024-01-01T00:00:00Z') // Date object
 * // decimal: BigNumber object or decimal string
 * const result = fromPlain('decimal')(new BigNumber('123.45')) // BigNumber(123.45)
 * const result = fromPlain('decimal')('123.45') // BigNumber(123.45)
 */
export function fromPlain<TType extends DslTypes.PRIMITIVE>(
  type: TType,
): (plain: unknown) => PrimitiveTypeMapping[TType] | undefined

/**
 * Converts a plain value to a specific primitive type.
 * @param plain - The value to convert.
 * @param type - The primitive type to convert to.
 * @returns The converted primitive value or `undefined` if the conversion is not supported.
 * @example
 * // text: JS string
 * const result = fromPlain('hello', 'text') // 'hello'
 * // num: JS number
 * const result = fromPlain(123.45, 'num') // 123.45
 * const result = fromPlain('123.45', 'num') // undefined
 * // bool: JS boolean
 * const result = fromPlain(true, 'bool') // true
 * const result = fromPlain('true', 'bool') // undefined
 * // datetime: Date object or ISO datetime string
 * const result = fromPlain(new Date(), 'datetime') // Date object
 * const result = fromPlain('2024-01-01T00:00:00Z', 'datetime') // Date object
 * // decimal: BigNumber object or decimal string
 * const result = fromPlain(new BigNumber('123.45'), 'decimal') // BigNumber(123.45)
 * const result = fromPlain('123.45', 'decimal') // BigNumber(123.45)
 */
export function fromPlain<TType extends DslTypes.PRIMITIVE>(
  plain: unknown,
  type: TType,
): PrimitiveTypeMapping[TType] | undefined

export function fromPlain<TType extends DslTypes.PRIMITIVE>(
  typeOrPlain: unknown,
  maybeType?: TType,
):
  | ((plain: unknown) => PrimitiveTypeMapping[TType] | undefined)
  | PrimitiveTypeMapping[TType]
  | undefined {
  if (typeof typeOrPlain === 'string' && !maybeType) {
    // Curried version
    return (plain: unknown) => fromPlainImpl(plain, typeOrPlain as TType)
  }
  // Direct version
  return fromPlainImpl(typeOrPlain, maybeType as TType)
}

function fromPlainImpl<TType extends DslTypes.PRIMITIVE>(
  plain: unknown,
  type: TType,
): PrimitiveTypeMapping[TType] | undefined {
  if (type === 'text') {
    return typeof plain === 'string'
      ? (plain as PrimitiveTypeMapping[TType])
      : undefined
  }
  if (type === 'num') {
    return typeof plain === 'number'
      ? (plain as PrimitiveTypeMapping[TType])
      : undefined
  }
  if (type === 'bool') {
    return typeof plain === 'boolean'
      ? (plain as PrimitiveTypeMapping[TType])
      : undefined
  }
  if (type === 'datetime') {
    if (plain instanceof Date) {
      return plain as PrimitiveTypeMapping[TType]
    }
    if (typeof plain === 'string') {
      const result = dayjs(plain)
      if (result.isValid()) {
        return result.toDate() as PrimitiveTypeMapping[TType]
      }
    }
    return undefined
  }
  if (type === 'decimal') {
    if (plain instanceof BigNumber) {
      return plain as PrimitiveTypeMapping[TType]
    }
    if (typeof plain === 'string') {
      const result = new BigNumber(plain)
      if (!result.isNaN()) {
        return result as PrimitiveTypeMapping[TType]
      }
    }
    return undefined
  }
  return assertNever`Unsupported type '${type}'`
}
