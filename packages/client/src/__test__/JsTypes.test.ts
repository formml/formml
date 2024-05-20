import { parse, stringify } from '../JsTypes.js'

describe('JS types', () => {
  describe('text', () => {
    describe('parse', () => {
      test('should keep string as is', () => {
        // Arrange
        const input = 'hello'

        // Act
        const result = parse(input, 'text')

        // Assert
        expect(result).toBe(input)
      })
    })

    describe('stringify', () => {
      test('should keep string as is', () => {
        // Arrange
        const data = 'hello'

        // Act
        const result = stringify(data)

        // Assert
        expect(result).toBe(data)
      })
    })
  })

  describe('num', () => {
    describe('parse', () => {
      test('should parse numeric string to number', () => {
        // Arrange
        const input = '123.45'

        // Act
        const result = parse(input, 'num')

        // Assert
        expect(result).toBe(123.45)
      })

      test.each([
        ['Infinity', Infinity],
        ['-Infinity', -Infinity],
      ])('should parse "%s" to %s', (input, expected) => {
        // Act
        const result = parse(input, 'num')

        // Assert
        expect(result).toBe(expected)
      })

      test('should parse non-numeric string to undefined', () => {
        // Arrange
        const input = 'hello'

        // Act
        const result = parse(input, 'num')

        // Assert
        expect(result).toBeUndefined()
      })

      test('should parse "NaN" to undefined', () => {
        // Arrange
        const input = 'NaN'

        // Act
        const result = parse(input, 'num')

        // Assert
        expect(result).toBeUndefined()
      })

      test.each(['', '  ', '\n', '\t'])(
        'should parse empty string %j to undefined',
        (input) => {
          // Act
          const result = parse(input, 'num')

          // Assert
          expect(result).toBeUndefined()
        },
      )
    })

    describe('stringify', () => {
      test.each([
        [123.45, '123.45'],
        [NaN, 'NaN'],
        [Infinity, 'Infinity'],
        [-Infinity, '-Infinity'],
      ])('should stringify number %s to string "%s"', (data, expected) => {
        // Act
        const result = stringify(data)

        // Assert
        expect(result).toBe(expected)
      })
    })
  })
})
