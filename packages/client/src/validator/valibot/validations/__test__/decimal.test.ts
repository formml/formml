import * as v from 'valibot'

import decimal from '../decimal.js'

describe('decimal', () => {
  test('should validate a numerical string', () => {
    // Arrange
    const schema = v.pipe(v.string(), decimal())

    // Act
    const result = v.safeParse(schema, '123')

    // Assert
    expect(result.success).toBe(true)
  })

  test.each(['Infinity', '-Infinity'])(
    'should validate infinities - "%s"',
    (input) => {
      // Arrange
      const schema = v.pipe(v.string(), decimal())

      // Act
      const result = v.safeParse(schema, input)

      // Assert
      expect(result.success).toBe(true)
    },
  )

  test.each(['', '  ', ' \n\t'])('should validate a blank string', (input) => {
    // Arrange
    const schema = v.pipe(v.string(), decimal())

    // Act
    const result = v.safeParse(schema, input)

    // Assert
    expect(result.success).toBe(true)
  })

  test('should invalidate a non-numerical string', () => {
    // Arrange
    const schema = v.pipe(v.string(), decimal())

    // Act
    const result = v.safeParse(schema, 'abc')

    // Assert
    expect(result.success).toBe(false)
    expect(result.issues).toMatchInlineSnapshot(`
      [
        {
          "abortEarly": undefined,
          "abortPipeEarly": undefined,
          "expected": "numerical",
          "input": "abc",
          "issues": undefined,
          "kind": "validation",
          "lang": undefined,
          "message": "Invalid input: Expected numerical but received "abc"",
          "path": undefined,
          "received": ""abc"",
          "requirement": [Function],
          "skipPipe": undefined,
          "type": "decimal",
        },
      ]
    `)
  })

  test('should invalidate NaN', () => {
    // Arrange
    const schema = v.pipe(v.string(), decimal())

    // Act
    const result = v.safeParse(schema, 'NaN')

    // Assert
    expect(result.success).toBe(false)
    expect(result.issues).toMatchInlineSnapshot(`
      [
        {
          "abortEarly": undefined,
          "abortPipeEarly": undefined,
          "expected": "numerical",
          "input": "NaN",
          "issues": undefined,
          "kind": "validation",
          "lang": undefined,
          "message": "Invalid input: Expected numerical but received "NaN"",
          "path": undefined,
          "received": ""NaN"",
          "requirement": [Function],
          "skipPipe": undefined,
          "type": "decimal",
        },
      ]
    `)
  })

  test('should accept custom message', () => {
    // Arrange
    const schema = v.pipe(v.string(), decimal('Custom message'))

    // Act
    const result = v.safeParse(schema, 'abc')

    // Assert
    expect(result.success).toBe(false)
    expect(result.issues).toMatchInlineSnapshot(`
      [
        {
          "abortEarly": undefined,
          "abortPipeEarly": undefined,
          "expected": "numerical",
          "input": "abc",
          "issues": undefined,
          "kind": "validation",
          "lang": undefined,
          "message": "Custom message",
          "path": undefined,
          "received": ""abc"",
          "requirement": [Function],
          "skipPipe": undefined,
          "type": "decimal",
        },
      ]
    `)
  })
})
