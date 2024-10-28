import type { PRIMITIVE } from '@formml/dsl'

import { BigNumber } from 'bignumber.js'

import { fromPlain as originalFromPlain } from '../conversion.js'

function fromPlainWithFullArgs<T extends PRIMITIVE>(plain: unknown, type: T) {
  return originalFromPlain(plain, type)
}

function fromPlainWithPartialArgs<T extends PRIMITIVE>(
  plain: unknown,
  type: T,
) {
  return originalFromPlain(type)(plain)
}

describe.each([fromPlainWithFullArgs, fromPlainWithPartialArgs])(
  'JS type <=> plain conversion - fromPlain %#',
  (fromPlain) => {
    test('design principle: should restore original data after serialization', () => {
      // Arrange
      const data = {
        bool: true,
        datetime: new Date(Date.UTC(2024, 0, 1)),
        decimal: new BigNumber('123.45'),
        num: 123.45,
        text: 'hello',
      }

      // Act
      const json = JSON.stringify(data)
      const plain = JSON.parse(json)
      const restoredData = {
        bool: fromPlain(plain.bool, 'bool'),
        datetime: fromPlain(plain.datetime, 'datetime'),
        decimal: fromPlain(plain.decimal, 'decimal'),
        num: fromPlain(plain.num, 'num'),
        text: fromPlain(plain.text, 'text'),
      }

      // Assert
      expect(restoredData).toEqual(data)
    })

    test('should throw error when parsing unknown type', () => {
      // Arrange
      const input = 'unknown'

      // Act & Assert
      expect(() => fromPlain(input, 'unknown type' as PRIMITIVE)).toThrow()
    })

    describe('text', () => {
      test('should accept string value', () => {
        // Arrange
        const input = 'hello'

        // Act
        const result = fromPlain(input, 'text')

        // Assert
        expect(result).toBe(input)
      })

      test.each([
        123,
        true,
        new Date(),
        new BigNumber('123'),
        undefined,
        null,
        {},
        [],
      ])('should return undefined for non-string value - %p', (input) => {
        // Act
        const result = fromPlain(input, 'text')

        // Assert
        expect(result).toBeUndefined()
      })
    })

    describe('num', () => {
      test('should accept number value', () => {
        // Arrange
        const input = 123.45

        // Act
        const result = fromPlain(input, 'num')

        // Assert
        expect(result).toBe(input)
      })

      test.each([
        '123.45',
        true,
        new Date(),
        new BigNumber('123'),
        undefined,
        null,
        {},
        [],
      ])('should return undefined for non-number value - %p', (input) => {
        // Act
        const result = fromPlain(input, 'num')

        // Assert
        expect(result).toBeUndefined()
      })
    })

    describe('bool', () => {
      test.each([true, false])('should accept boolean value - %p', (input) => {
        // Act
        const result = fromPlain(input, 'bool')

        // Assert
        expect(result).toBe(input)
      })

      test.each([
        'true',
        123,
        new Date(),
        new BigNumber('123'),
        undefined,
        null,
        {},
        [],
      ])('should return undefined for non-boolean value - %p', (input) => {
        // Act
        const result = fromPlain(input, 'bool')

        // Assert
        expect(result).toBeUndefined()
      })
    })

    describe('datetime', () => {
      test('should accept Date object', () => {
        // Arrange
        const input = new Date(Date.UTC(2024, 0, 1))

        // Act
        const result = fromPlain(input, 'datetime')

        // Assert
        expect(result).toBe(input)
      })

      test('should accept ISO string', () => {
        // Arrange
        const input = '2024-01-01T00:00:00Z'
        const expected = new Date(Date.UTC(2024, 0, 1))

        // Act
        const result = fromPlain(input, 'datetime')

        // Assert
        expect(result?.getTime()).toBe(expected.getTime())
      })

      test.each([
        'invalid date',
        123,
        true,
        new BigNumber('123'),
        undefined,
        null,
        {},
        [],
      ])('should return undefined for invalid datetime value - %p', (input) => {
        // Act
        const result = fromPlain(input, 'datetime')

        // Assert
        expect(result).toBeUndefined()
      })
    })

    describe('decimal', () => {
      test('should accept BigNumber object', () => {
        // Arrange
        const input = new BigNumber('123.45')

        // Act
        const result = fromPlain(input, 'decimal')

        // Assert
        expect(result).toBe(input)
      })

      test('should accept decimal string', () => {
        // Arrange
        const input = '123.45'
        const expected = new BigNumber('123.45')

        // Act
        const result = fromPlain(input, 'decimal')

        // Assert
        expect(result?.isEqualTo(expected)).toBe(true)
      })

      test.each([
        'invalid number',
        123,
        true,
        new Date(),
        undefined,
        null,
        {},
        [],
      ])('should return undefined for invalid decimal value - %p', (input) => {
        // Act
        const result = fromPlain(input, 'decimal')

        // Assert
        expect(result).toBeUndefined()
      })
    })
  },
)
