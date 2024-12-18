import type { PRIMITIVE } from '@formml/dsl'

import { BigNumber } from 'bignumber.js'

import { fromString as originalFromString, toString } from '../conversion.js'

function fromStringWithFullArgs<T extends PRIMITIVE>(input: string, type: T) {
  return originalFromString(input, type)
}

function fromStringWithPartialArgs<T extends PRIMITIVE>(
  input: string,
  type: T,
) {
  return originalFromString(type)(input)
}

describe.each([fromStringWithFullArgs, fromStringWithPartialArgs])(
  'JS types - string conversion - fromString %#',
  (fromString) => {
    test('should throw error when parsing unknown type', () => {
      // Arrange
      const input = 'unknown'

      // Act & Assert
      expect(() => fromString(input, 'unknown type' as PRIMITIVE)).toThrow()
    })

    test('should throw error when stringifying unknown type', () => {
      // Arrange
      const data = new Error('unknown type')

      // Act & Assert
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect(() => toString(data as any)).toThrow()
    })

    describe('text', () => {
      describe('fromString', () => {
        test('should keep string as is', () => {
          // Arrange
          const input = 'hello'

          // Act
          const result = fromString(input, 'text')

          // Assert
          expect(result).toBe(input)
        })
      })

      describe('toString', () => {
        test('should keep string as is', () => {
          // Arrange
          const data = 'hello'

          // Act
          const result = toString(data)

          // Assert
          expect(result).toBe(data)
        })
      })
    })

    describe('num', () => {
      describe('fromString', () => {
        test('should parse numeric string to number', () => {
          // Arrange
          const input = '123.45'

          // Act
          const result = fromString(input, 'num')

          // Assert
          expect(result).toBe(123.45)
        })

        test.each([
          ['Infinity', Infinity],
          ['-Infinity', -Infinity],
        ])('should parse "%s" to %s', (input, expected) => {
          // Act
          const result = fromString(input, 'num')

          // Assert
          expect(result).toBe(expected)
        })

        test('should parse non-numeric string to undefined', () => {
          // Arrange
          const input = 'hello'

          // Act
          const result = fromString(input, 'num')

          // Assert
          expect(result).toBeUndefined()
        })

        test('should parse "NaN" to undefined', () => {
          // Arrange
          const input = 'NaN'

          // Act
          const result = fromString(input, 'num')

          // Assert
          expect(result).toBeUndefined()
        })

        test.each(['', '  ', '\n', '\t'])(
          'should parse empty string %j to undefined',
          (input) => {
            // Act
            const result = fromString(input, 'num')

            // Assert
            expect(result).toBeUndefined()
          },
        )
      })

      describe('toString', () => {
        test.each([
          [123.45, '123.45'],
          [NaN, 'NaN'],
          [Infinity, 'Infinity'],
          [-Infinity, '-Infinity'],
        ])('should stringify number %s to string "%s"', (data, expected) => {
          // Act
          const result = toString(data)

          // Assert
          expect(result).toBe(expected)
        })
      })
    })

    describe('bool', () => {
      describe('fromString', () => {
        test.each(['true', 'yes', '1', 'on', '   ', '\n', '\t'])(
          'should parse non-empty string to true - %j',
          (input) => {
            // Act
            const result = fromString(input, 'bool')

            // Assert
            expect(result).toBe(true)
          },
        )

        test('should parse empty string to false', () => {
          // Arrange
          const input = ''

          // Act
          const result = fromString(input, 'bool')

          // Assert
          expect(result).toBe(false)
        })
      })

      describe('toString', () => {
        test('should stringify true to "true"', () => {
          // Arrange
          const data = true

          // Act
          const result = toString(data)

          // Assert
          expect(result).toBe('true')
        })

        test('should stringify false to empty string', () => {
          // Arrange
          const data = false

          // Act
          const result = toString(data)

          // Assert
          expect(result).toBe('')
        })
      })
    })

    describe('datetime', () => {
      describe('fromString', () => {
        test.each(['2024-01-01T00:00:00Z', '2024-01-01T00:00:00.000Z'])(
          'should parse UTC ISO string to date object',
          (input) => {
            // Act
            const result = fromString(input, 'datetime')

            // Assert
            const expected = new Date(Date.UTC(2024, 0, 1))
            expect(result?.getTime()).toBe(expected.getTime())
          },
        )

        test.each([
          '2024-01-01T08:00:00+08:00',
          '2023-12-31T16:00:00.000-08:00',
        ])('should parse timezone properly', (input) => {
          // Act
          const result = fromString(input, 'datetime')

          // Assert
          const expected = new Date(Date.UTC(2024, 0, 1))
          expect(result?.getTime()).toBe(expected.getTime())
        })

        test.each([
          '2024-01-01',
          '2024-01-01T00:00:00',
          '2024-01-01T00:00:00.000',
        ])(
          'should use current timezone when parsing non-timezone ISO string',
          (input) => {
            // Arrange
            const expected = new Date(Date.UTC(2023, 11, 31, 16))

            // Act
            const result = fromString(input, 'datetime')

            // Assert
            expect(result?.getTime()).toBe(expected.getTime())
          },
        )

        test.each(['', '  ', '\n', '\t', 'hello'])(
          'should parse invalid string %j to undefined',
          (input) => {
            // Act
            const result = fromString(input, 'datetime')

            // Assert
            expect(result).toBeUndefined()
          },
        )
      })

      describe('toString', () => {
        test('should stringify date object to UTC ISO string', () => {
          // Arrange
          const data = new Date(Date.UTC(2024, 0, 1))

          // Act
          const result = toString(data)

          // Assert
          expect(result).toBe('2024-01-01T00:00:00.000Z')
        })
      })
    })

    describe('decimal', () => {
      describe('fromString', () => {
        test.each([
          ['123.45', new BigNumber(123.45)],
          ['Infinity', new BigNumber(Infinity)],
          ['-Infinity', new BigNumber(-Infinity)],
        ])(
          'should parse numeric string "%s" to BigNumber object',
          (input, expected) => {
            // Act
            const result = fromString(input, 'decimal')

            // Assert
            expect(result).toBeInstanceOf(BigNumber)
            expect(result?.isEqualTo(expected)).toBe(true)
          },
        )

        test('should parse "NaN" to undefined', () => {
          // Arrange
          const input = 'NaN'

          // Act
          const result = fromString(input, 'decimal')

          // Assert
          expect(result).toBeUndefined()
        })

        test.each(['', '  ', '\n', '\t'])(
          'should parse empty string %j to undefined',
          (input) => {
            // Act
            const result = fromString(input, 'decimal')

            // Assert
            expect(result).toBeUndefined()
          },
        )

        test('should parse non-numeric string to undefined', () => {
          // Arrange
          const input = 'hello'

          // Act
          const result = fromString(input, 'decimal')

          // Assert
          expect(result).toBeUndefined()
        })
      })

      describe('toString', () => {
        test.each([
          [new BigNumber(123.45), '123.45'],
          [new BigNumber(Infinity), 'Infinity'],
          [new BigNumber(-Infinity), '-Infinity'],
          [new BigNumber(NaN), 'NaN'],
        ])(
          'should stringify BigNumber object to string - "%s"',
          (data, expected) => {
            // Act
            const result = toString(data)

            // Assert
            expect(result).toBe(expected)
          },
        )
      })
    })

    test('should stringify undefined to empty string', () => {
      // Arrange
      const data = undefined

      // Act
      const result = toString(data)

      // Assert
      expect(result).toBe('')
    })
  },
)
