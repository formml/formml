import * as v from 'valibot'

import { excludes } from '../excludes.js'

describe('excludes', () => {
  test('should validate string not containing requirement', () => {
    // Arrange
    const action = {
      name: 'excludes',
      options: { value: 'world' },
    } as const
    const validString = 'hello there'

    // Act
    const validatedSchema = excludes(v.string(), action)
    const result = v.safeParse(validatedSchema, validString)

    // Assert
    expect(result.success).toBe(true)
  })

  test('should reject string containing requirement', () => {
    // Arrange
    const action = {
      name: 'excludes',
      options: { value: 'world' },
    } as const
    const invalidString = 'hello world'

    // Act
    const validatedSchema = excludes(v.string(), action)
    const result = v.safeParse(validatedSchema, invalidString)

    // Assert
    expect(result.success).toBe(false)
    expect(result.issues).toMatchInlineSnapshot(`
      [
        {
          "abortEarly": undefined,
          "abortPipeEarly": undefined,
          "expected": "!"world"",
          "input": "hello world",
          "issues": undefined,
          "kind": "validation",
          "lang": undefined,
          "message": "Invalid content: Expected !"world" but received "world"",
          "path": undefined,
          "received": ""world"",
          "requirement": "world",
          "type": "excludes",
        },
      ]
    `)
  })

  test('should use custom error message when provided', () => {
    // Arrange
    const action = {
      name: 'excludes',
      options: {
        message: 'Custom excludes error message',
        value: 'world',
      },
    } as const
    const invalidString = 'hello world'

    // Act
    const validatedSchema = excludes(v.string(), action)
    const result = v.safeParse(validatedSchema, invalidString)

    // Assert
    expect(result.success).toBe(false)
    expect(result.issues).toMatchInlineSnapshot(`
      [
        {
          "abortEarly": undefined,
          "abortPipeEarly": undefined,
          "expected": "!"world"",
          "input": "hello world",
          "issues": undefined,
          "kind": "validation",
          "lang": undefined,
          "message": "Custom excludes error message",
          "path": undefined,
          "received": ""world"",
          "requirement": "world",
          "type": "excludes",
        },
      ]
    `)
  })
})
