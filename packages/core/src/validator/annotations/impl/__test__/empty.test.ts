import * as v from 'valibot'

import { empty } from '../empty.js'

describe('empty', () => {
  test('should validate empty string', () => {
    // Arrange
    const action = { name: 'empty', options: {} } as const
    const emptyString = ''

    // Act
    const validatedSchema = empty(v.string(), action)
    const result = v.safeParse(validatedSchema, emptyString)

    // Assert
    expect(result.success).toBe(true)
  })

  test('should reject non-empty string', () => {
    // Arrange
    const action = { name: 'empty', options: {} } as const
    const nonEmptyString = 'not empty'

    // Act
    const validatedSchema = empty(v.string(), action)
    const result = v.safeParse(validatedSchema, nonEmptyString)

    // Assert
    expect(result.success).toBe(false)
    expect(result.issues).toMatchInlineSnapshot(`
      [
        {
          "abortEarly": undefined,
          "abortPipeEarly": undefined,
          "expected": "0",
          "input": "not empty",
          "issues": undefined,
          "kind": "validation",
          "lang": undefined,
          "message": "Invalid length: Expected 0 but received 9",
          "path": undefined,
          "received": "9",
          "requirement": undefined,
          "type": "empty",
        },
      ]
    `)
  })

  test('should use custom error message when provided', () => {
    // Arrange
    const action = {
      name: 'empty',
      options: { message: 'Custom empty error message' },
    } as const
    const nonEmptyString = 'not empty'

    // Act
    const validatedSchema = empty(v.string(), action)
    const result = v.safeParse(validatedSchema, nonEmptyString)

    // Assert
    expect(result.success).toBe(false)
    expect(result.issues).toMatchInlineSnapshot(`
      [
        {
          "abortEarly": undefined,
          "abortPipeEarly": undefined,
          "expected": "0",
          "input": "not empty",
          "issues": undefined,
          "kind": "validation",
          "lang": undefined,
          "message": "Custom empty error message",
          "path": undefined,
          "received": "9",
          "requirement": undefined,
          "type": "empty",
        },
      ]
    `)
  })
})
