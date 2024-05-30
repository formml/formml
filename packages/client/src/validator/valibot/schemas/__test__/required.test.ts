import * as v from 'valibot'

import { required } from '../required.js'

describe('required', () => {
  test('should validate if input is not undefined', () => {
    // Arrange
    const schema = required(v.any())

    // Act
    const result = v.safeParse(schema, 123)

    // Assert
    expect(result.success).toBe(true)
  })
})
