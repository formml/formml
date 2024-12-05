import * as v from 'valibot'

import { minBytes } from '../minBytes.js'

describe('minBytes', () => {
  test('should validate string with bytes more than min', () => {
    // Arrange
    const action = {
      name: 'minBytes',
      options: { length: 5 },
    } as const
    const validString = 'Hello World'

    // Act
    const validatedSchema = minBytes(v.string(), action)
    const result = v.safeParse(validatedSchema, validString)

    // Assert
    expect(result.success).toBe(true)
  })

  test('should reject string with bytes less than min', () => {
    // Arrange
    const action = {
      name: 'minBytes',
      options: { length: 5 },
    } as const
    const invalidString = 'Hi'

    // Act
    const validatedSchema = minBytes(v.string(), action)
    const result = v.safeParse(validatedSchema, invalidString)

    // Assert
    expect(result.success).toBe(false)
    expect(result.issues).toMatchInlineSnapshot(`
      [
        {
          "abortEarly": undefined,
          "abortPipeEarly": undefined,
          "expected": ">=5",
          "input": "Hi",
          "issues": undefined,
          "kind": "validation",
          "lang": undefined,
          "message": "Invalid bytes: Expected >=5 but received 2",
          "path": undefined,
          "received": "2",
          "requirement": 5,
          "type": "min_bytes",
        },
      ]
    `)
  })

  test('should use custom error message when provided', () => {
    // Arrange
    const action = {
      name: 'minBytes',
      options: {
        length: 5,
        message: 'String too short in bytes',
      },
    } as const
    const invalidString = 'Hi'

    // Act
    const validatedSchema = minBytes(v.string(), action)
    const result = v.safeParse(validatedSchema, invalidString)

    // Assert
    expect(result.success).toBe(false)
    expect(result.issues).toMatchInlineSnapshot(`
      [
        {
          "abortEarly": undefined,
          "abortPipeEarly": undefined,
          "expected": ">=5",
          "input": "Hi",
          "issues": undefined,
          "kind": "validation",
          "lang": undefined,
          "message": "String too short in bytes",
          "path": undefined,
          "received": "2",
          "requirement": 5,
          "type": "min_bytes",
        },
      ]
    `)
  })
})
