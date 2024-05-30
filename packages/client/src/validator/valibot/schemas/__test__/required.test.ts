import * as v from 'valibot'

import { required } from '../required.js'

describe('required', () => {
  test('should validate if input is not undefined', () => {
    // Arrange
    const schema = required(v.any())

    // Act
    const result = v.safeParse(schema, 123)

    // Assert
    expect(result.success).toBe(true)
  })

  test('should forward input to wrapped schema if validation passes', () => {
    // Arrange
    const schema = required(v.string())

    // Act
    const result = v.safeParse(schema, 123)

    // Assert
    expect(result.success).toBe(false)
    expect(result.issues).toMatchInlineSnapshot(`
      [
        {
          "abortEarly": undefined,
          "abortPipeEarly": undefined,
          "expected": "string",
          "input": 123,
          "issues": undefined,
          "kind": "schema",
          "lang": undefined,
          "message": "Invalid type: Expected string but received 123",
          "path": undefined,
          "received": "123",
          "requirement": undefined,
          "skipPipe": undefined,
          "type": "string",
        },
      ]
    `)
  })
})