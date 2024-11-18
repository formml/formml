import * as v from 'valibot'

import { nanoid } from '../nanoid.js'

describe('nanoid', () => {
  test('should validate valid nanoid string', () => {
    // Arrange
    const action = {
      name: 'nanoid',
      options: {},
    } as const
    const validString = 'V1StGXR8_Z5jdHi6B-myT'

    // Act
    const validatedSchema = nanoid(v.string(), action)
    const result = v.safeParse(validatedSchema, validString)

    // Assert
    expect(result.success).toBe(true)
  })

  test('should reject invalid nanoid string', () => {
    // Arrange
    const action = {
      name: 'nanoid',
      options: {},
    } as const
    const invalidString = 'invalid@nanoid'

    // Act
    const validatedSchema = nanoid(v.string(), action)
    const result = v.safeParse(validatedSchema, invalidString)

    // Assert
    expect(result.success).toBe(false)
    expect(result.issues).toMatchInlineSnapshot(`
      [
        {
          "abortEarly": undefined,
          "abortPipeEarly": undefined,
          "expected": null,
          "input": "invalid@nanoid",
          "issues": undefined,
          "kind": "validation",
          "lang": undefined,
          "message": "Invalid Nano ID: Received "invalid@nanoid"",
          "path": undefined,
          "received": ""invalid@nanoid"",
          "requirement": /\\^\\[\\\\w-\\]\\+\\$/u,
          "type": "nanoid",
        },
      ]
    `)
  })

  test('should use custom error message when provided', () => {
    // Arrange
    const action = {
      name: 'nanoid',
      options: { message: 'Invalid nanoid format' },
    } as const
    const invalidString = 'invalid@nanoid'

    // Act
    const validatedSchema = nanoid(v.string(), action)
    const result = v.safeParse(validatedSchema, invalidString)

    // Assert
    expect(result.success).toBe(false)
    expect(result.issues).toMatchInlineSnapshot(`
      [
        {
          "abortEarly": undefined,
          "abortPipeEarly": undefined,
          "expected": null,
          "input": "invalid@nanoid",
          "issues": undefined,
          "kind": "validation",
          "lang": undefined,
          "message": "Invalid nanoid format",
          "path": undefined,
          "received": ""invalid@nanoid"",
          "requirement": /\\^\\[\\\\w-\\]\\+\\$/u,
          "type": "nanoid",
        },
      ]
    `)
  })
})
