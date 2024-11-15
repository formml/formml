import * as v from 'valibot'

import { base64 } from '../base64.js'

describe('base64', () => {
  test('should validate valid base64 string', () => {
    // Arrange
    const action = { name: 'base64', options: {} } as const
    const validBase64 = 'SGVsbG8gV29ybGQ=' // "Hello World" in base64

    // Act
    const validatedSchema = base64(v.string(), action)
    const result = v.safeParse(validatedSchema, validBase64)

    // Assert
    expect(result.success).toBe(true)
  })

  test('should reject invalid base64 string', () => {
    // Arrange
    const action = { name: 'base64', options: {} } as const
    const invalidBase64 = 'not-a-base64!'

    // Act
    const validatedSchema = base64(v.string(), action)
    const result = v.safeParse(validatedSchema, invalidBase64)

    // Assert
    expect(result.success).toBe(false)
    expect(result.issues).toMatchInlineSnapshot(`
      [
        {
          "abortEarly": undefined,
          "abortPipeEarly": undefined,
          "expected": null,
          "input": "not-a-base64!",
          "issues": undefined,
          "kind": "validation",
          "lang": undefined,
          "message": "Invalid Base64: Received "not-a-base64!"",
          "path": undefined,
          "received": ""not-a-base64!"",
          "requirement": /\\^\\(\\?:\\[\\\\da-z\\+/\\]\\{4\\}\\)\\*\\(\\?:\\[\\\\da-z\\+/\\]\\{2\\}==\\|\\[\\\\da-z\\+/\\]\\{3\\}=\\)\\?\\$/iu,
          "type": "base64",
        },
      ]
    `)
  })

  test('should use custom error message when provided', () => {
    // Arrange
    const action = {
      name: 'base64',
      options: { message: 'Custom base64 error message' },
    } as const
    const invalidBase64 = 'not-a-base64!'

    // Act
    const validatedSchema = base64(v.string(), action)
    const result = v.safeParse(validatedSchema, invalidBase64)

    // Assert
    expect(result.success).toBe(false)
    expect(result.issues).toMatchInlineSnapshot(`
      [
        {
          "abortEarly": undefined,
          "abortPipeEarly": undefined,
          "expected": null,
          "input": "not-a-base64!",
          "issues": undefined,
          "kind": "validation",
          "lang": undefined,
          "message": "Custom base64 error message",
          "path": undefined,
          "received": ""not-a-base64!"",
          "requirement": /\\^\\(\\?:\\[\\\\da-z\\+/\\]\\{4\\}\\)\\*\\(\\?:\\[\\\\da-z\\+/\\]\\{2\\}==\\|\\[\\\\da-z\\+/\\]\\{3\\}=\\)\\?\\$/iu,
          "type": "base64",
        },
      ]
    `)
  })
})
