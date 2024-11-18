import * as v from 'valibot'

import { maxBytes } from '../maxBytes.js'

describe('maxBytes', () => {
  test('should validate string with bytes less than max', () => {
    // Arrange
    const action = {
      name: 'maxBytes',
      options: { requirement: 5 },
    } as const
    const validString = 'Hello'

    // Act
    const validatedSchema = maxBytes(v.string(), action)
    const result = v.safeParse(validatedSchema, validString)

    // Assert
    expect(result.success).toBe(true)
  })

  test('should reject string with bytes more than max', () => {
    // Arrange
    const action = {
      name: 'maxBytes',
      options: { requirement: 5 },
    } as const
    const invalidString = 'Hello World'

    // Act
    const validatedSchema = maxBytes(v.string(), action)
    const result = v.safeParse(validatedSchema, invalidString)

    // Assert
    expect(result.success).toBe(false)
    expect(result.issues).toMatchInlineSnapshot(`
      [
        {
          "abortEarly": undefined,
          "abortPipeEarly": undefined,
          "expected": "<=5",
          "input": "Hello World",
          "issues": undefined,
          "kind": "validation",
          "lang": undefined,
          "message": "Invalid bytes: Expected <=5 but received 11",
          "path": undefined,
          "received": "11",
          "requirement": 5,
          "type": "max_bytes",
        },
      ]
    `)
  })

  test('should use custom error message when provided', () => {
    // Arrange
    const action = {
      name: 'maxBytes',
      options: {
        message: 'String too long in bytes',
        requirement: 5,
      },
    } as const
    const invalidString = 'Hello World'

    // Act
    const validatedSchema = maxBytes(v.string(), action)
    const result = v.safeParse(validatedSchema, invalidString)

    // Assert
    expect(result.success).toBe(false)
    expect(result.issues).toMatchInlineSnapshot(`
      [
        {
          "abortEarly": undefined,
          "abortPipeEarly": undefined,
          "expected": "<=5",
          "input": "Hello World",
          "issues": undefined,
          "kind": "validation",
          "lang": undefined,
          "message": "String too long in bytes",
          "path": undefined,
          "received": "11",
          "requirement": 5,
          "type": "max_bytes",
        },
      ]
    `)
  })
})
