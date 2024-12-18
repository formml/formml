import type { JSType } from '@formml/core'
import type * as DSLType from '@formml/dsl'

import { assertNever } from '@formml/utils'
import { BigNumber } from 'bignumber.js'
import dayjs from 'dayjs'

function fromStringImpl(
  input: string,
  type: DSLType.PRIMITIVE,
): JSType.PrimitiveType {
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
 * @param type - The primitive type to convert to.
 * @returns A function that takes a string input and returns the converted primitive type.
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
export function fromString<TType extends DSLType.PRIMITIVE>(
  type: TType,
): (input: string) => JSType.PrimitiveTypeMapping[TType]

/**
 * Converts a string to a specific primitive type.
 * @param input - The string to convert.
 * @param type - The primitive type to convert to.
 * @returns The converted primitive value.
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
export function fromString<TType extends DSLType.PRIMITIVE>(
  input: string,
  type: TType,
): JSType.PrimitiveTypeMapping[TType]

export function fromString(
  ...args: [DSLType.PRIMITIVE] | [string, DSLType.PRIMITIVE]
): ((input: string) => JSType.PrimitiveType) | JSType.PrimitiveType {
  if (args.length === 1) {
    const [type] = args
    return (input: string) => fromStringImpl(input, type)
  }
  return fromStringImpl(...args)
}

/**
 * Converts a primitive type to string.
 * @param value - The primitive type to convert.
 * @returns The converted string.
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
export function toString(value: JSType.PrimitiveType): string {
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
