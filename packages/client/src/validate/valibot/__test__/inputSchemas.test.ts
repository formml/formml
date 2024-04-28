import { safeParse } from 'valibot'

import * as i from '../inputSchemas.js'

describe('input schemas', () => {
  describe('number', () => {
    test('should validate a number string', () => {
      // Arrange
      const schema = i.number()

      // Act
      const result = safeParse(schema, '123')

      // Assert

      expect(result.success).toBe(true)
    })
  })
})
