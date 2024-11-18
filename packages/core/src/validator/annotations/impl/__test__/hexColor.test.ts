import * as v from 'valibot'

import { hexColor } from '../hexColor.js'

describe('hexColor', () => {
  test.each([['#fff'], ['#ffffff'], ['#FF0000']])(
    'should validate valid hex color %s',
    (color) => {
      // Arrange
      const action = { name: 'hexColor', options: {} } as const

      // Act
      const validatedSchema = hexColor(v.string(), action)
      const result = v.safeParse(validatedSchema, color)

      // Assert
      expect(result.success).toBe(true)
    },
  )

  test('should reject invalid hex color format', () => {
    // Arrange
    const action = { name: 'hexColor', options: {} } as const
    const invalidColor = '#gggggg'

    // Act
    const validatedSchema = hexColor(v.string(), action)
    const result = v.safeParse(validatedSchema, invalidColor)

    // Assert
    expect(result.success).toBe(false)
    expect(result.issues).toMatchInlineSnapshot(`
      [
        {
          "abortEarly": undefined,
          "abortPipeEarly": undefined,
          "expected": null,
          "input": "#gggggg",
          "issues": undefined,
          "kind": "validation",
          "lang": undefined,
          "message": "Invalid hex color: Received "#gggggg"",
          "path": undefined,
          "received": ""#gggggg"",
          "requirement": /\\^#\\(\\?:\\[\\\\da-f\\]\\{3,4\\}\\|\\[\\\\da-f\\]\\{6\\}\\|\\[\\\\da-f\\]\\{8\\}\\)\\$/iu,
          "type": "hex_color",
        },
      ]
    `)
  })

  test('should use custom error message when provided', () => {
    // Arrange
    const action = {
      name: 'hexColor',
      options: { message: 'Must be a valid hex color code' },
    } as const
    const invalidColor = '#gggggg'

    // Act
    const validatedSchema = hexColor(v.string(), action)
    const result = v.safeParse(validatedSchema, invalidColor)

    // Assert
    expect(result.success).toBe(false)
    expect(result.issues).toMatchInlineSnapshot(`
      [
        {
          "abortEarly": undefined,
          "abortPipeEarly": undefined,
          "expected": null,
          "input": "#gggggg",
          "issues": undefined,
          "kind": "validation",
          "lang": undefined,
          "message": "Must be a valid hex color code",
          "path": undefined,
          "received": ""#gggggg"",
          "requirement": /\\^#\\(\\?:\\[\\\\da-f\\]\\{3,4\\}\\|\\[\\\\da-f\\]\\{6\\}\\|\\[\\\\da-f\\]\\{8\\}\\)\\$/iu,
          "type": "hex_color",
        },
      ]
    `)
  })
})
