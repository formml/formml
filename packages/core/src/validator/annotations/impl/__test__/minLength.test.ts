import * as v from 'valibot'

import { minLength } from '../minLength.js'

describe('minLength', () => {
  test('should validate string with length more than min', () => {
    // Arrange
    const action = {
      name: 'minLength',
      options: { length: 5 },
    } as const
    const validString = 'Hello World'

    // Act
    const validatedSchema = minLength(v.string(), action)
    const result = v.safeParse(validatedSchema, validString)

    // Assert
    expect(result.success).toBe(true)
  })

  test('should reject string with length less than min', () => {
    // Arrange
    const action = {
      name: 'minLength',
      options: { length: 5 },
    } as const
    const invalidString = 'Hi'

    // Act
    const validatedSchema = minLength(v.string(), action)
    const result = v.safeParse(validatedSchema, invalidString)

    // Assert
    expect(result.success).toBe(false)
    expect(result.issues).toMatchInlineSnapshot(`
      [
        {
          "abortEarly": undefined,
          "abortPipeEarly": undefined,
          "expected": ">=5",
          "input": "Hi",
          "issues": undefined,
          "kind": "validation",
          "lang": undefined,
          "message": "Invalid length: Expected >=5 but received 2",
          "path": undefined,
          "received": "2",
          "requirement": 5,
          "type": "min_length",
        },
      ]
    `)
  })

  test('should use custom error message when provided', () => {
    // Arrange
    const action = {
      name: 'minLength',
      options: {
        length: 5,
        message: 'String too short',
      },
    } as const
    const invalidString = 'Hi'

    // Act
    const validatedSchema = minLength(v.string(), action)
    const result = v.safeParse(validatedSchema, invalidString)

    // Assert
    expect(result.success).toBe(false)
    expect(result.issues).toMatchInlineSnapshot(`
      [
        {
          "abortEarly": undefined,
          "abortPipeEarly": undefined,
          "expected": ">=5",
          "input": "Hi",
          "issues": undefined,
          "kind": "validation",
          "lang": undefined,
          "message": "String too short",
          "path": undefined,
          "received": "2",
          "requirement": 5,
          "type": "min_length",
        },
      ]
    `)
  })
})
