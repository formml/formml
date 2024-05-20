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

      test('should parse non-numeric string to undefined', () => {
        // Arrange
        const input = 'hello'

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
  })
})
