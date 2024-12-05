import * as v from 'valibot'

import { startsWith } from '../startsWith.js'

describe('startsWith', () => {
  test('should validate string starting with requirement', () => {
    // Arrange
    const action = {
      name: 'startsWith',
      options: { prefix: 'hello' },
    } as const
    const validString = 'hello world'

    // Act
    const validatedSchema = startsWith(v.string(), action)
    const result = v.safeParse(validatedSchema, validString)

    // Assert
    expect(result.success).toBe(true)
  })

  test('should reject string not starting with requirement', () => {
    // Arrange
    const action = {
      name: 'startsWith',
      options: { prefix: 'hello' },
    } as const
    const invalidString = 'world hello'

    // Act
    const validatedSchema = startsWith(v.string(), action)
    const result = v.safeParse(validatedSchema, invalidString)

    // Assert
    expect(result.success).toBe(false)
    expect(result.issues).toMatchInlineSnapshot(`
      [
        {
          "abortEarly": undefined,
          "abortPipeEarly": undefined,
          "expected": ""hello"",
          "input": "world hello",
          "issues": undefined,
          "kind": "validation",
          "lang": undefined,
          "message": "Invalid start: Expected "hello" but received "world"",
          "path": undefined,
          "received": ""world"",
          "requirement": "hello",
          "type": "starts_with",
        },
      ]
    `)
  })

  test('should use custom error message when provided', () => {
    // Arrange
    const action = {
      name: 'startsWith',
      options: {
        message: 'Custom startsWith error message',
        prefix: 'hello',
      },
    } as const
    const invalidString = 'world hello'

    // Act
    const validatedSchema = startsWith(v.string(), action)
    const result = v.safeParse(validatedSchema, invalidString)

    // Assert
    expect(result.success).toBe(false)
    expect(result.issues).toMatchInlineSnapshot(`
      [
        {
          "abortEarly": undefined,
          "abortPipeEarly": undefined,
          "expected": ""hello"",
          "input": "world hello",
          "issues": undefined,
          "kind": "validation",
          "lang": undefined,
          "message": "Custom startsWith error message",
          "path": undefined,
          "received": ""world"",
          "requirement": "hello",
          "type": "starts_with",
        },
      ]
    `)
  })
})
