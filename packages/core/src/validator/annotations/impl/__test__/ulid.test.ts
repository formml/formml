import * as v from 'valibot'

import { ulid } from '../ulid.js'

describe('ulid', () => {
  test('should validate valid ULID string', () => {
    // Arrange
    const action = { name: 'ulid', options: {} } as const
    const validUlid = '01ARZ3NDEKTSV4RRFFQ69G5FAV'

    // Act
    const validatedSchema = ulid(v.string(), action)
    const result = v.safeParse(validatedSchema, validUlid)

    // Assert
    expect(result.success).toBe(true)
  })

  test('should reject invalid ULID string', () => {
    // Arrange
    const action = { name: 'ulid', options: {} } as const
    const invalidUlid = 'not-a-ulid'

    // Act
    const validatedSchema = ulid(v.string(), action)
    const result = v.safeParse(validatedSchema, invalidUlid)

    // Assert
    expect(result.success).toBe(false)
    expect(result.issues).toMatchInlineSnapshot(`
      [
        {
          "abortEarly": undefined,
          "abortPipeEarly": undefined,
          "expected": null,
          "input": "not-a-ulid",
          "issues": undefined,
          "kind": "validation",
          "lang": undefined,
          "message": "Invalid ULID: Received "not-a-ulid"",
          "path": undefined,
          "received": ""not-a-ulid"",
          "requirement": /\\^\\[\\\\da-hjkmnp-tv-z\\]\\{26\\}\\$/iu,
          "type": "ulid",
        },
      ]
    `)
  })

  test('should use custom error message when provided', () => {
    // Arrange
    const action = {
      name: 'ulid',
      options: { message: 'Custom ULID error message' },
    } as const
    const invalidUlid = 'not-a-ulid'

    // Act
    const validatedSchema = ulid(v.string(), action)
    const result = v.safeParse(validatedSchema, invalidUlid)

    // Assert
    expect(result.success).toBe(false)
    expect(result.issues).toMatchInlineSnapshot(`
      [
        {
          "abortEarly": undefined,
          "abortPipeEarly": undefined,
          "expected": null,
          "input": "not-a-ulid",
          "issues": undefined,
          "kind": "validation",
          "lang": undefined,
          "message": "Custom ULID error message",
          "path": undefined,
          "received": ""not-a-ulid"",
          "requirement": /\\^\\[\\\\da-hjkmnp-tv-z\\]\\{26\\}\\$/iu,
          "type": "ulid",
        },
      ]
    `)
  })
})
