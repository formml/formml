import * as v from 'valibot'

import { regex } from '../regex.js'

describe('regex', () => {
  test('should validate string matching regex pattern', () => {
    // Arrange
    const action = {
      name: 'regex',
      options: { pattern: '^[A-Z]{3}$' },
    } as const
    const validString = 'ABC'

    // Act
    const validatedSchema = regex(v.string(), action)
    const result = v.safeParse(validatedSchema, validString)

    // Assert
    expect(result.success).toBe(true)
  })

  test('should reject string not matching regex pattern', () => {
    // Arrange
    const action = {
      name: 'regex',
      options: { pattern: '^[A-Z]{3}$' },
    } as const
    const invalidString = 'abc'

    // Act
    const validatedSchema = regex(v.string(), action)
    const result = v.safeParse(validatedSchema, invalidString)

    // Assert
    expect(result.success).toBe(false)
    expect(result.issues).toMatchInlineSnapshot(`
      [
        {
          "abortEarly": undefined,
          "abortPipeEarly": undefined,
          "expected": "/^[A-Z]{3}$/",
          "input": "abc",
          "issues": undefined,
          "kind": "validation",
          "lang": undefined,
          "message": "Invalid format: Expected /^[A-Z]{3}$/ but received "abc"",
          "path": undefined,
          "received": ""abc"",
          "requirement": /\\^\\[A-Z\\]\\{3\\}\\$/,
          "type": "regex",
        },
      ]
    `)
  })

  test('should use custom error message when provided', () => {
    // Arrange
    const action = {
      name: 'regex',
      options: {
        message: 'Custom regex error message',
        pattern: '^[A-Z]{3}$',
      },
    } as const
    const invalidString = 'abc'

    // Act
    const validatedSchema = regex(v.string(), action)
    const result = v.safeParse(validatedSchema, invalidString)

    // Assert
    expect(result.success).toBe(false)
    expect(result.issues).toMatchInlineSnapshot(`
      [
        {
          "abortEarly": undefined,
          "abortPipeEarly": undefined,
          "expected": "/^[A-Z]{3}$/",
          "input": "abc",
          "issues": undefined,
          "kind": "validation",
          "lang": undefined,
          "message": "Custom regex error message",
          "path": undefined,
          "received": ""abc"",
          "requirement": /\\^\\[A-Z\\]\\{3\\}\\$/,
          "type": "regex",
        },
      ]
    `)
  })
})
