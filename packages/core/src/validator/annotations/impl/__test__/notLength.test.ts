import * as v from 'valibot'

import { notLength } from '../notLength.js'

describe('notLength', () => {
  test('should validate string with length not equal to requirement', () => {
    // Arrange
    const action = {
      name: 'notLength',
      options: { length: 5 },
    } as const
    const validString = 'Hello World' // length 11

    // Act
    const validatedSchema = notLength(v.string(), action)
    const result = v.safeParse(validatedSchema, validString)

    // Assert
    expect(result.success).toBe(true)
  })

  test('should reject string with length equal to requirement', () => {
    // Arrange
    const action = {
      name: 'notLength',
      options: { length: 5 },
    } as const
    const invalidString = 'Hello' // length 5

    // Act
    const validatedSchema = notLength(v.string(), action)
    const result = v.safeParse(validatedSchema, invalidString)

    // Assert
    expect(result.success).toBe(false)
    expect(result.issues).toMatchInlineSnapshot(`
      [
        {
          "abortEarly": undefined,
          "abortPipeEarly": undefined,
          "expected": "!5",
          "input": "Hello",
          "issues": undefined,
          "kind": "validation",
          "lang": undefined,
          "message": "Invalid length: Expected !5 but received 5",
          "path": undefined,
          "received": "5",
          "requirement": 5,
          "type": "not_length",
        },
      ]
    `)
  })

  test('should use custom error message when provided', () => {
    // Arrange
    const action = {
      name: 'notLength',
      options: {
        length: 5,
        message: 'String must not be 5 characters long',
      },
    } as const
    const invalidString = 'Hello'

    // Act
    const validatedSchema = notLength(v.string(), action)
    const result = v.safeParse(validatedSchema, invalidString)

    // Assert
    expect(result.success).toBe(false)
    expect(result.issues).toMatchInlineSnapshot(`
      [
        {
          "abortEarly": undefined,
          "abortPipeEarly": undefined,
          "expected": "!5",
          "input": "Hello",
          "issues": undefined,
          "kind": "validation",
          "lang": undefined,
          "message": "String must not be 5 characters long",
          "path": undefined,
          "received": "5",
          "requirement": 5,
          "type": "not_length",
        },
      ]
    `)
  })
})
