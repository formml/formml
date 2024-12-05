import * as v from 'valibot'

import { bytes } from '../bytes.js'

describe('bytes', () => {
  test('should validate string with exact bytes length', () => {
    // Arrange
    const action = {
      name: 'bytes',
      options: { length: 5 },
    } as const
    const validString = 'hello' // 5 bytes

    // Act
    const validatedSchema = bytes(v.string(), action)
    const result = v.safeParse(validatedSchema, validString)

    // Assert
    expect(result.success).toBe(true)
  })

  test('should reject string with incorrect bytes length', () => {
    // Arrange
    const action = {
      name: 'bytes',
      options: { length: 5 },
    } as const
    const invalidString = 'hi' // 2 bytes

    // Act
    const validatedSchema = bytes(v.string(), action)
    const result = v.safeParse(validatedSchema, invalidString)

    // Assert
    expect(result.success).toBe(false)
    expect(result.issues).toMatchInlineSnapshot(`
      [
        {
          "abortEarly": undefined,
          "abortPipeEarly": undefined,
          "expected": "5",
          "input": "hi",
          "issues": undefined,
          "kind": "validation",
          "lang": undefined,
          "message": "Invalid bytes: Expected 5 but received 2",
          "path": undefined,
          "received": "2",
          "requirement": 5,
          "type": "bytes",
        },
      ]
    `)
  })

  test('should use custom error message when provided', () => {
    // Arrange
    const action = {
      name: 'bytes',
      options: {
        length: 5,
        message: 'String must be exactly 5 bytes long',
      },
    } as const
    const invalidString = 'hi' // 2 bytes

    // Act
    const validatedSchema = bytes(v.string(), action)
    const result = v.safeParse(validatedSchema, invalidString)

    // Assert
    expect(result.success).toBe(false)
    expect(result.issues).toMatchInlineSnapshot(`
      [
        {
          "abortEarly": undefined,
          "abortPipeEarly": undefined,
          "expected": "5",
          "input": "hi",
          "issues": undefined,
          "kind": "validation",
          "lang": undefined,
          "message": "String must be exactly 5 bytes long",
          "path": undefined,
          "received": "2",
          "requirement": 5,
          "type": "bytes",
        },
      ]
    `)
  })

  test('should validate UTF-8 string correctly', () => {
    // Arrange
    const action = {
      name: 'bytes',
      options: { length: 6 },
    } as const
    const validString = '你好' // 6 bytes (3 bytes per character)

    // Act
    const validatedSchema = bytes(v.string(), action)
    const result = v.safeParse(validatedSchema, validString)

    // Assert
    expect(result.success).toBe(true)
  })
})
