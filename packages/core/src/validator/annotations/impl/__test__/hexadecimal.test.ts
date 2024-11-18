import * as v from 'valibot'

import { hexadecimal } from '../hexadecimal.js'

describe('hexadecimal', () => {
  test('should validate valid hexadecimal string', () => {
    // Arrange
    const action = { name: 'hexadecimal', options: {} } as const
    const validHex = '1a2b3c'

    // Act
    const validatedSchema = hexadecimal(v.string(), action)
    const result = v.safeParse(validatedSchema, validHex)

    // Assert
    expect(result.success).toBe(true)
  })

  test('should reject invalid hexadecimal string', () => {
    // Arrange
    const action = { name: 'hexadecimal', options: {} } as const
    const invalidHex = '1g2h3i'

    // Act
    const validatedSchema = hexadecimal(v.string(), action)
    const result = v.safeParse(validatedSchema, invalidHex)

    // Assert
    expect(result.success).toBe(false)
    expect(result.issues).toMatchInlineSnapshot(`
      [
        {
          "abortEarly": undefined,
          "abortPipeEarly": undefined,
          "expected": null,
          "input": "1g2h3i",
          "issues": undefined,
          "kind": "validation",
          "lang": undefined,
          "message": "Invalid hexadecimal: Received "1g2h3i"",
          "path": undefined,
          "received": ""1g2h3i"",
          "requirement": /\\^\\(\\?:0\\[hx\\]\\)\\?\\[\\\\da-f\\]\\+\\$/iu,
          "type": "hexadecimal",
        },
      ]
    `)
  })

  test('should use custom error message when provided', () => {
    // Arrange
    const action = {
      name: 'hexadecimal',
      options: { message: 'Must be a valid hex string' },
    } as const
    const invalidHex = '1g2h3i'

    // Act
    const validatedSchema = hexadecimal(v.string(), action)
    const result = v.safeParse(validatedSchema, invalidHex)

    // Assert
    expect(result.success).toBe(false)
    expect(result.issues).toMatchInlineSnapshot(`
      [
        {
          "abortEarly": undefined,
          "abortPipeEarly": undefined,
          "expected": null,
          "input": "1g2h3i",
          "issues": undefined,
          "kind": "validation",
          "lang": undefined,
          "message": "Must be a valid hex string",
          "path": undefined,
          "received": ""1g2h3i"",
          "requirement": /\\^\\(\\?:0\\[hx\\]\\)\\?\\[\\\\da-f\\]\\+\\$/iu,
          "type": "hexadecimal",
        },
      ]
    `)
  })
})
