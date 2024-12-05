import * as v from 'valibot'

import { maxLength } from '../maxLength.js'

describe('maxLength', () => {
  test('should validate string with length less than max', () => {
    // Arrange
    const action = {
      name: 'maxLength',
      options: { length: 5 },
    } as const
    const validString = 'Hello'

    // Act
    const validatedSchema = maxLength(v.string(), action)
    const result = v.safeParse(validatedSchema, validString)

    // Assert
    expect(result.success).toBe(true)
  })

  test('should reject string with length more than max', () => {
    // Arrange
    const action = {
      name: 'maxLength',
      options: { length: 5 },
    } as const
    const invalidString = 'Hello World'

    // Act
    const validatedSchema = maxLength(v.string(), action)
    const result = v.safeParse(validatedSchema, invalidString)

    // Assert
    expect(result.success).toBe(false)
    expect(result.issues).toMatchInlineSnapshot(`
      [
        {
          "abortEarly": undefined,
          "abortPipeEarly": undefined,
          "expected": "<=5",
          "input": "Hello World",
          "issues": undefined,
          "kind": "validation",
          "lang": undefined,
          "message": "Invalid length: Expected <=5 but received 11",
          "path": undefined,
          "received": "11",
          "requirement": 5,
          "type": "max_length",
        },
      ]
    `)
  })

  test('should use custom error message when provided', () => {
    // Arrange
    const action = {
      name: 'maxLength',
      options: {
        length: 5,
        message: 'String too long',
      },
    } as const
    const invalidString = 'Hello World'

    // Act
    const validatedSchema = maxLength(v.string(), action)
    const result = v.safeParse(validatedSchema, invalidString)

    // Assert
    expect(result.success).toBe(false)
    expect(result.issues).toMatchInlineSnapshot(`
      [
        {
          "abortEarly": undefined,
          "abortPipeEarly": undefined,
          "expected": "<=5",
          "input": "Hello World",
          "issues": undefined,
          "kind": "validation",
          "lang": undefined,
          "message": "String too long",
          "path": undefined,
          "received": "11",
          "requirement": 5,
          "type": "max_length",
        },
      ]
    `)
  })
})
