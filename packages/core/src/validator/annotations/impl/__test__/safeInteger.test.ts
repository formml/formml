import * as v from 'valibot'

import { safeInteger } from '../safeInteger.js'

describe('safeInteger', () => {
  test('should validate valid safe integer', () => {
    // Arrange
    const action = { name: 'safeInteger', options: {} } as const
    const validNumber = 42

    // Act
    const validatedSchema = safeInteger(v.number(), action)
    const result = v.safeParse(validatedSchema, validNumber)

    // Assert
    expect(result.success).toBe(true)
  })

  test('should reject non-safe integer', () => {
    // Arrange
    const action = { name: 'safeInteger', options: {} } as const
    const invalidNumber = Number.MAX_SAFE_INTEGER + 1

    // Act
    const validatedSchema = safeInteger(v.number(), action)
    const result = v.safeParse(validatedSchema, invalidNumber)

    // Assert
    expect(result.success).toBe(false)
    expect(result.issues).toMatchInlineSnapshot(`
      [
        {
          "abortEarly": undefined,
          "abortPipeEarly": undefined,
          "expected": null,
          "input": 9007199254740992,
          "issues": undefined,
          "kind": "validation",
          "lang": undefined,
          "message": "Invalid safe integer: Received 9007199254740992",
          "path": undefined,
          "received": "9007199254740992",
          "requirement": [Function],
          "type": "safe_integer",
        },
      ]
    `)
  })

  test('should reject non-integer', () => {
    // Arrange
    const action = { name: 'safeInteger', options: {} } as const
    const invalidNumber = 3.14

    // Act
    const validatedSchema = safeInteger(v.number(), action)
    const result = v.safeParse(validatedSchema, invalidNumber)

    // Assert
    expect(result.success).toBe(false)
    expect(result.issues).toMatchInlineSnapshot(`
      [
        {
          "abortEarly": undefined,
          "abortPipeEarly": undefined,
          "expected": null,
          "input": 3.14,
          "issues": undefined,
          "kind": "validation",
          "lang": undefined,
          "message": "Invalid safe integer: Received 3.14",
          "path": undefined,
          "received": "3.14",
          "requirement": [Function],
          "type": "safe_integer",
        },
      ]
    `)
  })

  test('should use custom error message when provided', () => {
    // Arrange
    const action = {
      name: 'safeInteger',
      options: { message: 'Custom safe integer error message' },
    } as const
    const invalidNumber = 3.14

    // Act
    const validatedSchema = safeInteger(v.number(), action)
    const result = v.safeParse(validatedSchema, invalidNumber)

    // Assert
    expect(result.success).toBe(false)
    expect(result.issues).toMatchInlineSnapshot(`
      [
        {
          "abortEarly": undefined,
          "abortPipeEarly": undefined,
          "expected": null,
          "input": 3.14,
          "issues": undefined,
          "kind": "validation",
          "lang": undefined,
          "message": "Custom safe integer error message",
          "path": undefined,
          "received": "3.14",
          "requirement": [Function],
          "type": "safe_integer",
        },
      ]
    `)
  })
})
