import type * as DslTypes from '@formml/dsl'

import { assertNever } from '@formml/utils'
import { BigNumber } from 'bignumber.js'
import dayjs from 'dayjs'

export type PrimitiveTypeMapping = {
  bool: boolean
  datetime: Date | undefined
  decimal: BigNumber | undefined
  num: number | undefined
  text: string
}

export type PrimitiveType = PrimitiveTypeMapping[keyof PrimitiveTypeMapping]

function fromStringImpl(
  input: string,
  type: DslTypes.PRIMITIVE,
): PrimitiveType {
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

/**
 * Creates a function that converts a string to a specific primitive type.
 *
 * @param {TType} type - The primitive type to convert to.
 * @returns {(input: string) => PrimitiveTypeMapping[TType]} A function that takes a string input and returns the converted primitive type.
 *
 * @example
 * // text
 * const result = fromString('text')('hello') // 'hello'
 * // num
 * const result = fromString('num')('123.45') // 123.45
 * const result = fromString('num')('Infinity') // Infinity
 * const result = fromString('num')('NaN') // undefined
 * const result = fromString('num')('abc') // undefined
 * const result = fromString('num')('') // undefined
 * // bool
 * const result = fromString('bool')('true') // true
 * const result = fromString('bool')('   ') // true
 * const result = fromString('bool')('') // false
 * // DateTime
 * const result = fromString('datetime')('2024-01-01T00:00:00Z') // Date object (UTC)
 * const result = fromString('datetime')('2024-01-01T00:00:00') // Date object (Local)
 * const result = fromString('datetime')('invalid') // undefined
 * // Decimal
 * const result = fromString('decimal')('123.45') // BigNumber(123.45)
 * const result = fromString('decimal')('Infinity') // BigNumber(Infinity)
 * const result = fromString('decimal')('NaN') // undefined
 * const result = fromString('decimal')('abc') // undefined
 * const result = fromString('decimal')('') // undefined
 */
export function fromString<TType extends DslTypes.PRIMITIVE>(
  type: TType,
): (input: string) => PrimitiveTypeMapping[TType]

/**
 * Converts a string to a specific primitive type.
 *
 * @param {string} input - The string to convert.
 * @param {TType} type - The primitive type to convert to.
 * @returns {PrimitiveTypeMapping[TType]} The converted primitive value.
 *
 * @example
 * // text
 * const result = fromString('hello', 'text') // 'hello'
 * // num
 * const result = fromString('123.45', 'num') // 123.45
 * const result = fromString('Infinity', 'num') // Infinity
 * const result = fromString('NaN', 'num') // undefined
 * const result = fromString('abc', 'num') // undefined
 * const result = fromString('', 'num') // undefined
 * // bool
 * const result = fromString('true', 'bool') // true
 * const result = fromString('   ', 'bool') // true
 * const result = fromString('', 'bool') // false
 * // DateTime
 * const result = fromString('2024-01-01T00:00:00Z', 'datetime') // Date object (UTC)
 * const result = fromString('2024-01-01T00:00:00', 'datetime') // Date object (Local)
 * const result = fromString('invalid', 'datetime') // undefined
 * // Decimal
 * const result = fromString('123.45', 'decimal') // BigNumber(123.45)
 * const result = fromString('Infinity', 'decimal') // BigNumber(Infinity)
 * const result = fromString('NaN', 'decimal') // undefined
 * const result = fromString('abc', 'decimal') // undefined
 * const result = fromString('', 'decimal') // undefined
 */
export function fromString<TType extends DslTypes.PRIMITIVE>(
  input: string,
  type: TType,
): PrimitiveTypeMapping[TType]

export function fromString(
  ...args: [DslTypes.PRIMITIVE] | [string, DslTypes.PRIMITIVE]
): ((input: string) => PrimitiveType) | PrimitiveType {
  if (args.length === 1) {
    const [type] = args
    return (input: string) => fromStringImpl(input, type)
  }
  return fromStringImpl(...args)
}

/**
 * Converts a primitive type to string.
 *
 * @param {PrimitiveType} value - The primitive type to convert.
 * @returns {string} The converted string.
 *
 * @example
 * const result = toString(undefined) // ''
 * // text
 * const result = toString('hello') // 'hello'
 * // num
 * const result = toString(123.45) // '123.45'
 * // bool
 * const result = toString(true) // 'true'
 * const result = toString(false) // ''
 * // datetime
 * const result = toString(new Date()) // ISO string
 * // decimal
 * const result = toString(new BigNumber(123.45)) // '123.45'
 */
export function toString(value: PrimitiveType): string {
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

/**
 * Creates a function that converts a plain value to a specific primitive type.
 *
 * @param {TType} type - The primitive type to convert to.
 * @returns {(plain: unknown) => PrimitiveTypeMapping[TType] | undefined} A function that takes a plain value and returns the converted primitive type or `undefined`.
 *
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
 *
 * @param {unknown} plain - The value to convert.
 * @param {TType} type - The primitive type to convert to.
 * @returns {PrimitiveTypeMapping[TType] | undefined} The converted primitive value or `undefined` if the conversion is not supported.
 *
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
