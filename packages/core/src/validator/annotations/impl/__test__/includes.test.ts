import * as v from 'valibot'

import { includes } from '../includes.js'

describe('includes', () => {
  test('should validate string containing substring', () => {
    // Arrange
    const action = {
      name: 'includes',
      options: { value: 'world' },
    } as const

    // Act
    const validatedSchema = includes(v.string(), action)
    const result = v.safeParse(validatedSchema, 'hello world')

    // Assert
    expect(result.success).toBe(true)
  })

  test('should reject string not containing substring', () => {
    // Arrange
    const action = {
      name: 'includes',
      options: { value: 'world' },
    } as const

    // Act
    const validatedSchema = includes(v.string(), action)
    const result = v.safeParse(validatedSchema, 'hello earth')

    // Assert
    expect(result.success).toBe(false)
    expect(result.issues).toMatchInlineSnapshot(`
      [
        {
          "abortEarly": undefined,
          "abortPipeEarly": undefined,
          "expected": ""world"",
          "input": "hello earth",
          "issues": undefined,
          "kind": "validation",
          "lang": undefined,
          "message": "Invalid content: Expected "world" but received !"world"",
          "path": undefined,
          "received": "!"world"",
          "requirement": "world",
          "type": "includes",
        },
      ]
    `)
  })

  test('should use custom error message when provided', () => {
    // Arrange
    const action = {
      name: 'includes',
      options: {
        message: 'Custom includes error message',
        value: 'world',
      },
    } as const

    // Act
    const validatedSchema = includes(v.string(), action)
    const result = v.safeParse(validatedSchema, 'hello earth')

    // Assert
    expect(result.success).toBe(false)
    expect(result.issues).toMatchInlineSnapshot(`
      [
        {
          "abortEarly": undefined,
          "abortPipeEarly": undefined,
          "expected": ""world"",
          "input": "hello earth",
          "issues": undefined,
          "kind": "validation",
          "lang": undefined,
          "message": "Custom includes error message",
          "path": undefined,
          "received": "!"world"",
          "requirement": "world",
          "type": "includes",
        },
      ]
    `)
  })
})
