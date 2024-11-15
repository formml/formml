import * as v from 'valibot'

import { bic } from '../bic.js'

describe('bic', () => {
  test('should validate valid BIC string', () => {
    // Arrange
    const action = { name: 'bic', options: {} } as const
    const validBic = 'DEUTDEFF500'

    // Act
    const validatedSchema = bic(v.string(), action)
    const result = v.safeParse(validatedSchema, validBic)

    // Assert
    expect(result.success).toBe(true)
  })

  test('should reject invalid BIC string', () => {
    // Arrange
    const action = { name: 'bic', options: {} } as const
    const invalidBic = 'INVALID123'

    // Act
    const validatedSchema = bic(v.string(), action)
    const result = v.safeParse(validatedSchema, invalidBic)

    // Assert
    expect(result.success).toBe(false)
    expect(result.issues).toMatchInlineSnapshot(`
      [
        {
          "abortEarly": undefined,
          "abortPipeEarly": undefined,
          "expected": null,
          "input": "INVALID123",
          "issues": undefined,
          "kind": "validation",
          "lang": undefined,
          "message": "Invalid BIC: Received "INVALID123"",
          "path": undefined,
          "received": ""INVALID123"",
          "requirement": /\\^\\[A-Z\\]\\{6\\}\\(\\?!00\\)\\[\\\\dA-Z\\]\\{2\\}\\(\\?:\\[\\\\dA-Z\\]\\{3\\}\\)\\?\\$/u,
          "type": "bic",
        },
      ]
    `)
  })

  test('should use custom error message when provided', () => {
    // Arrange
    const action = {
      name: 'bic',
      options: { message: 'Custom BIC error message' },
    } as const
    const invalidBic = 'INVALID123'

    // Act
    const validatedSchema = bic(v.string(), action)
    const result = v.safeParse(validatedSchema, invalidBic)

    // Assert
    expect(result.success).toBe(false)
    expect(result.issues).toMatchInlineSnapshot(`
      [
        {
          "abortEarly": undefined,
          "abortPipeEarly": undefined,
          "expected": null,
          "input": "INVALID123",
          "issues": undefined,
          "kind": "validation",
          "lang": undefined,
          "message": "Custom BIC error message",
          "path": undefined,
          "received": ""INVALID123"",
          "requirement": /\\^\\[A-Z\\]\\{6\\}\\(\\?!00\\)\\[\\\\dA-Z\\]\\{2\\}\\(\\?:\\[\\\\dA-Z\\]\\{3\\}\\)\\?\\$/u,
          "type": "bic",
        },
      ]
    `)
  })
})
