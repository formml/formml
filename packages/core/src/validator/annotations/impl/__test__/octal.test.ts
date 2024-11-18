import * as v from 'valibot'

import { octal } from '../octal.js'

describe('octal', () => {
  test('should validate valid octal string', () => {
    // Arrange
    const action = { name: 'octal', options: {} } as const
    const validOctal = '0o777'

    // Act
    const validatedSchema = octal(v.string(), action)
    const result = v.safeParse(validatedSchema, validOctal)

    // Assert
    expect(result.success).toBe(true)
  })

  test('should reject invalid octal string', () => {
    // Arrange
    const action = { name: 'octal', options: {} } as const
    const invalidOctal = '0x123'

    // Act
    const validatedSchema = octal(v.string(), action)
    const result = v.safeParse(validatedSchema, invalidOctal)

    // Assert
    expect(result.success).toBe(false)
    expect(result.issues).toMatchInlineSnapshot(`
      [
        {
          "abortEarly": undefined,
          "abortPipeEarly": undefined,
          "expected": null,
          "input": "0x123",
          "issues": undefined,
          "kind": "validation",
          "lang": undefined,
          "message": "Invalid octal: Received "0x123"",
          "path": undefined,
          "received": ""0x123"",
          "requirement": /\\^\\(\\?:0o\\)\\?\\[0-7\\]\\+\\$/iu,
          "type": "octal",
        },
      ]
    `)
  })

  test('should use custom error message when provided', () => {
    // Arrange
    const action = {
      name: 'octal',
      options: { message: 'Custom octal error message' },
    } as const
    const invalidOctal = '0x123'

    // Act
    const validatedSchema = octal(v.string(), action)
    const result = v.safeParse(validatedSchema, invalidOctal)

    // Assert
    expect(result.success).toBe(false)
    expect(result.issues).toMatchInlineSnapshot(`
      [
        {
          "abortEarly": undefined,
          "abortPipeEarly": undefined,
          "expected": null,
          "input": "0x123",
          "issues": undefined,
          "kind": "validation",
          "lang": undefined,
          "message": "Custom octal error message",
          "path": undefined,
          "received": ""0x123"",
          "requirement": /\\^\\(\\?:0o\\)\\?\\[0-7\\]\\+\\$/iu,
          "type": "octal",
        },
      ]
    `)
  })
})
