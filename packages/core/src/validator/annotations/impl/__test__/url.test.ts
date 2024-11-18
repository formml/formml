import * as v from 'valibot'

import { url } from '../url.js'

describe('url', () => {
  test('should validate valid URL string', () => {
    // Arrange
    const action = { name: 'url', options: {} } as const
    const validUrl = 'https://example.com'

    // Act
    const validatedSchema = url(v.string(), action)
    const result = v.safeParse(validatedSchema, validUrl)

    // Assert
    expect(result.success).toBe(true)
  })

  test('should reject invalid URL string', () => {
    // Arrange
    const action = { name: 'url', options: {} } as const
    const invalidUrl = 'not-a-url'

    // Act
    const validatedSchema = url(v.string(), action)
    const result = v.safeParse(validatedSchema, invalidUrl)

    // Assert
    expect(result.success).toBe(false)
    expect(result.issues).toMatchInlineSnapshot(`
      [
        {
          "abortEarly": undefined,
          "abortPipeEarly": undefined,
          "expected": null,
          "input": "not-a-url",
          "issues": undefined,
          "kind": "validation",
          "lang": undefined,
          "message": "Invalid URL: Received "not-a-url"",
          "path": undefined,
          "received": ""not-a-url"",
          "requirement": [Function],
          "type": "url",
        },
      ]
    `)
  })

  test('should use custom error message when provided', () => {
    // Arrange
    const action = {
      name: 'url',
      options: { message: 'Custom URL error message' },
    } as const
    const invalidUrl = 'not-a-url'

    // Act
    const validatedSchema = url(v.string(), action)
    const result = v.safeParse(validatedSchema, invalidUrl)

    // Assert
    expect(result.success).toBe(false)
    expect(result.issues).toMatchInlineSnapshot(`
      [
        {
          "abortEarly": undefined,
          "abortPipeEarly": undefined,
          "expected": null,
          "input": "not-a-url",
          "issues": undefined,
          "kind": "validation",
          "lang": undefined,
          "message": "Custom URL error message",
          "path": undefined,
          "received": ""not-a-url"",
          "requirement": [Function],
          "type": "url",
        },
      ]
    `)
  })
})
