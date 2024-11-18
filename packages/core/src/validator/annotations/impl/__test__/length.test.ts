import * as v from 'valibot'

import { length } from '../length.js'

describe('length', () => {
  test('should validate string with exact length', () => {
    // Arrange
    const action = {
      name: 'length',
      options: { requirement: 5 },
    } as const
    const validString = 'hello'

    // Act
    const validatedSchema = length(v.string(), action)
    const result = v.safeParse(validatedSchema, validString)

    // Assert
    expect(result.success).toBe(true)
  })

  test('should reject string with incorrect length', () => {
    // Arrange
    const action = {
      name: 'length',
      options: { requirement: 5 },
    } as const
    const invalidString = 'hi'

    // Act
    const validatedSchema = length(v.string(), action)
    const result = v.safeParse(validatedSchema, invalidString)

    // Assert
    expect(result.success).toBe(false)
    expect(result.issues).toMatchInlineSnapshot(`
      [
        {
          "abortEarly": undefined,
          "abortPipeEarly": undefined,
          "expected": "5",
          "input": "hi",
          "issues": undefined,
          "kind": "validation",
          "lang": undefined,
          "message": "Invalid length: Expected 5 but received 2",
          "path": undefined,
          "received": "2",
          "requirement": 5,
          "type": "length",
        },
      ]
    `)
  })

  test('should use custom error message when provided', () => {
    // Arrange
    const action = {
      name: 'length',
      options: {
        message: 'Custom length error message',
        requirement: 5,
      },
    } as const
    const invalidString = 'hi'

    // Act
    const validatedSchema = length(v.string(), action)
    const result = v.safeParse(validatedSchema, invalidString)

    // Assert
    expect(result.success).toBe(false)
    expect(result.issues).toMatchInlineSnapshot(`
      [
        {
          "abortEarly": undefined,
          "abortPipeEarly": undefined,
          "expected": "5",
          "input": "hi",
          "issues": undefined,
          "kind": "validation",
          "lang": undefined,
          "message": "Custom length error message",
          "path": undefined,
          "received": "2",
          "requirement": 5,
          "type": "length",
        },
      ]
    `)
  })
})
