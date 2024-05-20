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
        const input = 'hello'

        // Act
        const result = stringify(input)

        // Assert
        expect(result).toBe(input)
      })
    })
  })
})
