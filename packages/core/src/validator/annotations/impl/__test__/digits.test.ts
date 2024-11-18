import * as v from 'valibot'

import { digits } from '../digits.js'

describe('digits', () => {
  test('should validate string containing only digits', () => {
    // Arrange
    const action = { name: 'digits', options: {} } as const
    const validDigits = '123456'

    // Act
    const validatedSchema = digits(v.string(), action)
    const result = v.safeParse(validatedSchema, validDigits)

    // Assert
    expect(result.success).toBe(true)
  })

  test('should reject string containing non-digits', () => {
    // Arrange
    const action = { name: 'digits', options: {} } as const
    const invalidDigits = '123abc'

    // Act
    const validatedSchema = digits(v.string(), action)
    const result = v.safeParse(validatedSchema, invalidDigits)

    // Assert
    expect(result.success).toBe(false)
    expect(result.issues).toMatchInlineSnapshot(`
      [
        {
          "abortEarly": undefined,
          "abortPipeEarly": undefined,
          "expected": null,
          "input": "123abc",
          "issues": undefined,
          "kind": "validation",
          "lang": undefined,
          "message": "Invalid digits: Received "123abc"",
          "path": undefined,
          "received": ""123abc"",
          "requirement": /\\^\\\\d\\+\\$/u,
          "type": "digits",
        },
      ]
    `)
  })

  test('should use custom error message when provided', () => {
    // Arrange
    const action = {
      name: 'digits',
      options: { message: 'Must contain only digits' },
    } as const
    const invalidDigits = '123abc'

    // Act
    const validatedSchema = digits(v.string(), action)
    const result = v.safeParse(validatedSchema, invalidDigits)

    // Assert
    expect(result.success).toBe(false)
    expect(result.issues).toMatchInlineSnapshot(`
      [
        {
          "abortEarly": undefined,
          "abortPipeEarly": undefined,
          "expected": null,
          "input": "123abc",
          "issues": undefined,
          "kind": "validation",
          "lang": undefined,
          "message": "Must contain only digits",
          "path": undefined,
          "received": ""123abc"",
          "requirement": /\\^\\\\d\\+\\$/u,
          "type": "digits",
        },
      ]
    `)
  })
})
