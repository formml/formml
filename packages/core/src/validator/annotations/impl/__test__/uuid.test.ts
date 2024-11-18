import * as v from 'valibot'

import { uuid } from '../uuid.js'

describe('uuid', () => {
  test('should validate valid UUID string', () => {
    // Arrange
    const action = { name: 'uuid', options: {} } as const
    const validUuid = '123e4567-e89b-12d3-a456-426614174000'

    // Act
    const validatedSchema = uuid(v.string(), action)
    const result = v.safeParse(validatedSchema, validUuid)

    // Assert
    expect(result.success).toBe(true)
  })

  test('should reject invalid UUID string', () => {
    // Arrange
    const action = { name: 'uuid', options: {} } as const
    const invalidUuid = 'not-a-uuid'

    // Act
    const validatedSchema = uuid(v.string(), action)
    const result = v.safeParse(validatedSchema, invalidUuid)

    // Assert
    expect(result.success).toBe(false)
    expect(result.issues).toMatchInlineSnapshot(`
      [
        {
          "abortEarly": undefined,
          "abortPipeEarly": undefined,
          "expected": null,
          "input": "not-a-uuid",
          "issues": undefined,
          "kind": "validation",
          "lang": undefined,
          "message": "Invalid UUID: Received "not-a-uuid"",
          "path": undefined,
          "received": ""not-a-uuid"",
          "requirement": /\\^\\[\\\\da-f\\]\\{8\\}\\(\\?:-\\[\\\\da-f\\]\\{4\\}\\)\\{3\\}-\\[\\\\da-f\\]\\{12\\}\\$/iu,
          "type": "uuid",
        },
      ]
    `)
  })

  test('should use custom error message when provided', () => {
    // Arrange
    const action = {
      name: 'uuid',
      options: { message: 'Custom UUID error message' },
    } as const
    const invalidUuid = 'not-a-uuid'

    // Act
    const validatedSchema = uuid(v.string(), action)
    const result = v.safeParse(validatedSchema, invalidUuid)

    // Assert
    expect(result.success).toBe(false)
    expect(result.issues).toMatchInlineSnapshot(`
      [
        {
          "abortEarly": undefined,
          "abortPipeEarly": undefined,
          "expected": null,
          "input": "not-a-uuid",
          "issues": undefined,
          "kind": "validation",
          "lang": undefined,
          "message": "Custom UUID error message",
          "path": undefined,
          "received": ""not-a-uuid"",
          "requirement": /\\^\\[\\\\da-f\\]\\{8\\}\\(\\?:-\\[\\\\da-f\\]\\{4\\}\\)\\{3\\}-\\[\\\\da-f\\]\\{12\\}\\$/iu,
          "type": "uuid",
        },
      ]
    `)
  })
})
