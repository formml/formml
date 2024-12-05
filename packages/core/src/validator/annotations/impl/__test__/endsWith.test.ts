import * as v from 'valibot'

import { endsWith } from '../endsWith.js'

describe('endsWith', () => {
  test('should validate string ending with requirement', () => {
    // Arrange
    const action = {
      name: 'endsWith',
      options: { suffix: 'world' },
    } as const
    const validString = 'hello world'

    // Act
    const validatedSchema = endsWith(v.string(), action)
    const result = v.safeParse(validatedSchema, validString)

    // Assert
    expect(result.success).toBe(true)
  })

  test('should reject string not ending with requirement', () => {
    // Arrange
    const action = {
      name: 'endsWith',
      options: { suffix: 'world' },
    } as const
    const invalidString = 'world hello'

    // Act
    const validatedSchema = endsWith(v.string(), action)
    const result = v.safeParse(validatedSchema, invalidString)

    // Assert
    expect(result.success).toBe(false)
    expect(result.issues).toMatchInlineSnapshot(`
      [
        {
          "abortEarly": undefined,
          "abortPipeEarly": undefined,
          "expected": ""world"",
          "input": "world hello",
          "issues": undefined,
          "kind": "validation",
          "lang": undefined,
          "message": "Invalid end: Expected "world" but received "hello"",
          "path": undefined,
          "received": ""hello"",
          "requirement": "world",
          "type": "ends_with",
        },
      ]
    `)
  })

  test('should use custom error message when provided', () => {
    // Arrange
    const action = {
      name: 'endsWith',
      options: {
        message: 'Custom endsWith error message',
        suffix: 'world',
      },
    } as const
    const invalidString = 'world hello'

    // Act
    const validatedSchema = endsWith(v.string(), action)
    const result = v.safeParse(validatedSchema, invalidString)

    // Assert
    expect(result.success).toBe(false)
    expect(result.issues).toMatchInlineSnapshot(`
      [
        {
          "abortEarly": undefined,
          "abortPipeEarly": undefined,
          "expected": ""world"",
          "input": "world hello",
          "issues": undefined,
          "kind": "validation",
          "lang": undefined,
          "message": "Custom endsWith error message",
          "path": undefined,
          "received": ""hello"",
          "requirement": "world",
          "type": "ends_with",
        },
      ]
    `)
  })
})
