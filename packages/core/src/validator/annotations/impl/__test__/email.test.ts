import * as v from 'valibot'

import { email } from '../email.js'

describe('email', () => {
  test('should validate valid email address', () => {
    // Arrange
    const action = { name: 'email', options: {} } as const
    const validEmail = 'test@example.com'

    // Act
    const validatedSchema = email(v.string(), action)
    const result = v.safeParse(validatedSchema, validEmail)

    // Assert
    expect(result.success).toBe(true)
  })

  test('should reject invalid email address', () => {
    // Arrange
    const action = { name: 'email', options: {} } as const
    const invalidEmail = 'not-an-email'

    // Act
    const validatedSchema = email(v.string(), action)
    const result = v.safeParse(validatedSchema, invalidEmail)

    // Assert
    expect(result.success).toBe(false)
    expect(result.issues).toMatchInlineSnapshot(`
      [
        {
          "abortEarly": undefined,
          "abortPipeEarly": undefined,
          "expected": null,
          "input": "not-an-email",
          "issues": undefined,
          "kind": "validation",
          "lang": undefined,
          "message": "Invalid email: Received "not-an-email"",
          "path": undefined,
          "received": ""not-an-email"",
          "requirement": /\\^\\[\\\\w\\+-\\]\\+\\(\\?:\\\\\\.\\[\\\\w\\+-\\]\\+\\)\\*@\\[\\\\da-z\\]\\+\\(\\?:\\[\\.-\\]\\[\\\\da-z\\]\\+\\)\\*\\\\\\.\\[a-z\\]\\{2,\\}\\$/iu,
          "type": "email",
        },
      ]
    `)
  })

  test('should use custom error message when provided', () => {
    // Arrange
    const action = {
      name: 'email',
      options: { message: 'Invalid email format' },
    } as const
    const invalidEmail = 'not-an-email'

    // Act
    const validatedSchema = email(v.string(), action)
    const result = v.safeParse(validatedSchema, invalidEmail)

    // Assert
    expect(result.success).toBe(false)
    expect(result.issues).toMatchInlineSnapshot(`
      [
        {
          "abortEarly": undefined,
          "abortPipeEarly": undefined,
          "expected": null,
          "input": "not-an-email",
          "issues": undefined,
          "kind": "validation",
          "lang": undefined,
          "message": "Invalid email format",
          "path": undefined,
          "received": ""not-an-email"",
          "requirement": /\\^\\[\\\\w\\+-\\]\\+\\(\\?:\\\\\\.\\[\\\\w\\+-\\]\\+\\)\\*@\\[\\\\da-z\\]\\+\\(\\?:\\[\\.-\\]\\[\\\\da-z\\]\\+\\)\\*\\\\\\.\\[a-z\\]\\{2,\\}\\$/iu,
          "type": "email",
        },
      ]
    `)
  })
})
