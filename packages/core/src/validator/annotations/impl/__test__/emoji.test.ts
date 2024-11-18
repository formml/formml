import * as v from 'valibot'

import { emoji } from '../emoji.js'

describe('emoji', () => {
  test('should validate valid emoji string', () => {
    // Arrange
    const action = { name: 'emoji', options: {} } as const
    const validEmoji = '😀'

    // Act
    const validatedSchema = emoji(v.string(), action)
    const result = v.safeParse(validatedSchema, validEmoji)

    // Assert
    expect(result.success).toBe(true)
  })

  test('should reject non-emoji string', () => {
    // Arrange
    const action = { name: 'emoji', options: {} } as const
    const invalidEmoji = 'abc'

    // Act
    const validatedSchema = emoji(v.string(), action)
    const result = v.safeParse(validatedSchema, invalidEmoji)

    // Assert
    expect(result.success).toBe(false)
    expect(result.issues).toMatchInlineSnapshot(`
      [
        {
          "abortEarly": undefined,
          "abortPipeEarly": undefined,
          "expected": null,
          "input": "abc",
          "issues": undefined,
          "kind": "validation",
          "lang": undefined,
          "message": "Invalid emoji: Received "abc"",
          "path": undefined,
          "received": ""abc"",
          "requirement": /\\^\\(\\?:\\[\\\\u\\{1F1E6\\}-\\\\u\\{1F1FF\\}\\]\\{2\\}\\|\\\\u\\{1F3F4\\}\\[\\\\u\\{E0061\\}-\\\\u\\{E007A\\}\\]\\{2\\}\\[\\\\u\\{E0030\\}-\\\\u\\{E0039\\}\\\\u\\{E0061\\}-\\\\u\\{E007A\\}\\]\\{1,3\\}\\\\u\\{E007F\\}\\|\\(\\?:\\\\p\\{Emoji\\}\\\\uFE0F\\\\u20E3\\?\\|\\\\p\\{Emoji_Modifier_Base\\}\\\\p\\{Emoji_Modifier\\}\\?\\|\\\\p\\{Emoji_Presentation\\}\\)\\(\\?:\\\\u200D\\(\\?:\\\\p\\{Emoji\\}\\\\uFE0F\\\\u20E3\\?\\|\\\\p\\{Emoji_Modifier_Base\\}\\\\p\\{Emoji_Modifier\\}\\?\\|\\\\p\\{Emoji_Presentation\\}\\)\\)\\*\\)\\+\\$/u,
          "type": "emoji",
        },
      ]
    `)
  })

  test('should use custom error message when provided', () => {
    // Arrange
    const action = {
      name: 'emoji',
      options: { message: 'Custom emoji error message' },
    } as const
    const invalidEmoji = 'abc'

    // Act
    const validatedSchema = emoji(v.string(), action)
    const result = v.safeParse(validatedSchema, invalidEmoji)

    // Assert
    expect(result.success).toBe(false)
    expect(result.issues).toMatchInlineSnapshot(`
      [
        {
          "abortEarly": undefined,
          "abortPipeEarly": undefined,
          "expected": null,
          "input": "abc",
          "issues": undefined,
          "kind": "validation",
          "lang": undefined,
          "message": "Custom emoji error message",
          "path": undefined,
          "received": ""abc"",
          "requirement": /\\^\\(\\?:\\[\\\\u\\{1F1E6\\}-\\\\u\\{1F1FF\\}\\]\\{2\\}\\|\\\\u\\{1F3F4\\}\\[\\\\u\\{E0061\\}-\\\\u\\{E007A\\}\\]\\{2\\}\\[\\\\u\\{E0030\\}-\\\\u\\{E0039\\}\\\\u\\{E0061\\}-\\\\u\\{E007A\\}\\]\\{1,3\\}\\\\u\\{E007F\\}\\|\\(\\?:\\\\p\\{Emoji\\}\\\\uFE0F\\\\u20E3\\?\\|\\\\p\\{Emoji_Modifier_Base\\}\\\\p\\{Emoji_Modifier\\}\\?\\|\\\\p\\{Emoji_Presentation\\}\\)\\(\\?:\\\\u200D\\(\\?:\\\\p\\{Emoji\\}\\\\uFE0F\\\\u20E3\\?\\|\\\\p\\{Emoji_Modifier_Base\\}\\\\p\\{Emoji_Modifier\\}\\?\\|\\\\p\\{Emoji_Presentation\\}\\)\\)\\*\\)\\+\\$/u,
          "type": "emoji",
        },
      ]
    `)
  })
})
