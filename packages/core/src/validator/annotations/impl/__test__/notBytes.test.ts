import * as v from 'valibot'

import { notBytes } from '../notBytes.js'

describe('notBytes', () => {
  test('should validate string with bytes not equal to requirement', () => {
    // Arrange
    const action = {
      name: 'notBytes',
      options: { length: 5 },
    } as const
    const validString = 'Hello World' // 11 bytes

    // Act
    const validatedSchema = notBytes(v.string(), action)
    const result = v.safeParse(validatedSchema, validString)

    // Assert
    expect(result.success).toBe(true)
  })

  test('should reject string with bytes equal to requirement', () => {
    // Arrange
    const action = {
      name: 'notBytes',
      options: { length: 5 },
    } as const
    const invalidString = 'Hello' // 5 bytes

    // Act
    const validatedSchema = notBytes(v.string(), action)
    const result = v.safeParse(validatedSchema, invalidString)

    // Assert
    expect(result.success).toBe(false)
    expect(result.issues).toMatchInlineSnapshot(`
      [
        {
          "abortEarly": undefined,
          "abortPipeEarly": undefined,
          "expected": "!5",
          "input": "Hello",
          "issues": undefined,
          "kind": "validation",
          "lang": undefined,
          "message": "Invalid bytes: Expected !5 but received 5",
          "path": undefined,
          "received": "5",
          "requirement": 5,
          "type": "not_bytes",
        },
      ]
    `)
  })

  test('should use custom error message when provided', () => {
    // Arrange
    const action = {
      name: 'notBytes',
      options: {
        length: 5,
        message: 'String must not be 5 bytes',
      },
    } as const
    const invalidString = 'Hello'

    // Act
    const validatedSchema = notBytes(v.string(), action)
    const result = v.safeParse(validatedSchema, invalidString)

    // Assert
    expect(result.success).toBe(false)
    expect(result.issues).toMatchInlineSnapshot(`
      [
        {
          "abortEarly": undefined,
          "abortPipeEarly": undefined,
          "expected": "!5",
          "input": "Hello",
          "issues": undefined,
          "kind": "validation",
          "lang": undefined,
          "message": "String must not be 5 bytes",
          "path": undefined,
          "received": "5",
          "requirement": 5,
          "type": "not_bytes",
        },
      ]
    `)
  })
})
