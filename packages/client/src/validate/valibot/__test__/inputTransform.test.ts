import { safeParse } from 'valibot'

import * as i from '../inputTransform.js'

describe('input transform', () => {
  describe('number', () => {
    test('should validate a number string', () => {
      // Arrange
      const schema = i.asNumber()

      // Act
      const result = safeParse(schema, '123')

      // Assert

      expect(result.success).toBe(true)
    })
  })

  describe('datetime', () => {
    test('should validate a datetime string', () => {
      // Arrange
      const schema = i.asDatetime()

      // Act

      const result = safeParse(schema, '2024-01-01T00:00:00Z')

      // Assert
      expect(result.success).toBe(true)
    })
  })

  describe('bool', () => {
    test('should validate a bool string', () => {
      // Arrange
      const schema = i.asBool()

      // Act
      const result = safeParse(schema, 'true')

      // Assert
      expect(result.success).toBe(true)
    })
  })

  describe('decimal', () => {
    test('should validate a decimal string', () => {
      // Arrange
      const schema = i.asDecimal()

      // Act
      const result = safeParse(schema, '123.45')

      // Assert
      expect(result.success).toBe(true)
    })
  })
})
