import * as v from 'valibot'

import { cuid2 } from '../cuid2.js'

describe('cuid2', () => {
  test('should validate valid cuid2', () => {
    // Arrange
    const action = { name: 'cuid2', options: {} } as const
    const validCuid2 = 'tz4a98xxat96iws9zmbrgj3a'

    // Act
    const validatedSchema = cuid2(v.string(), action)
    const result = v.safeParse(validatedSchema, validCuid2)

    // Assert
    expect(result.success).toBe(true)
  })

  test('should reject invalid cuid2', () => {
    // Arrange
    const action = { name: 'cuid2', options: {} } as const
    const invalidCuid2 = 'not-a-cuid2'

    // Act
    const validatedSchema = cuid2(v.string(), action)
    const result = v.safeParse(validatedSchema, invalidCuid2)

    // Assert
    expect(result.success).toBe(false)
    expect(result.issues).toMatchInlineSnapshot(`
      [
        {
          "abortEarly": undefined,
          "abortPipeEarly": undefined,
          "expected": null,
          "input": "not-a-cuid2",
          "issues": undefined,
          "kind": "validation",
          "lang": undefined,
          "message": "Invalid Cuid2: Received "not-a-cuid2"",
          "path": undefined,
          "received": ""not-a-cuid2"",
          "requirement": /\\^\\[a-z\\]\\[\\\\da-z\\]\\*\\$/u,
          "type": "cuid2",
        },
      ]
    `)
  })

  test('should use custom error message when provided', () => {
    // Arrange
    const action = {
      name: 'cuid2',
      options: { message: 'Invalid CUID2' },
    } as const
    const invalidCuid2 = 'not-a-cuid2'

    // Act
    const validatedSchema = cuid2(v.string(), action)
    const result = v.safeParse(validatedSchema, invalidCuid2)

    // Assert
    expect(result.success).toBe(false)
    expect(result.issues).toMatchInlineSnapshot(`
      [
        {
          "abortEarly": undefined,
          "abortPipeEarly": undefined,
          "expected": null,
          "input": "not-a-cuid2",
          "issues": undefined,
          "kind": "validation",
          "lang": undefined,
          "message": "Invalid CUID2",
          "path": undefined,
          "received": ""not-a-cuid2"",
          "requirement": /\\^\\[a-z\\]\\[\\\\da-z\\]\\*\\$/u,
          "type": "cuid2",
        },
      ]
    `)
  })
})
