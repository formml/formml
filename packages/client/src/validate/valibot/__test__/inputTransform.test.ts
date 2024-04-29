import dayjs from 'dayjs'
import * as v from 'valibot'

import * as i from '../inputTransform.js'

describe('input transform', () => {
  describe('number', () => {
    test('should validate a number string', () => {
      // Arrange
      const schema = i.toNum()

      // Act
      const result = v.safeParse(schema, '123')

      // Assert

      expect(result.success).toBe(true)
    })

    test('should invalidate a non-number string', () => {
      // Arrange
      const schema = i.toNum()

      // Act
      const result = v.safeParse(schema, 'abc')

      // Assert
      expect(result.success).toBe(false)
      expect(result.issues).toMatchInlineSnapshot(`
        [
          {
            "abortEarly": undefined,
            "abortPipeEarly": undefined,
            "context": "decimal",
            "expected": null,
            "input": "abc",
            "lang": undefined,
            "message": "Invalid decimal: Received "abc"",
            "path": undefined,
            "reason": "string",
            "received": ""abc"",
            "requirement": /\\^\\\\d\\+\\$/u,
            "skipPipe": undefined,
          },
        ]
      `)
    })

    test('should transform input to number before give it to inner schema', () => {
      // Arrange
      const schema = i.toNum(v.literal(123))

      // Act
      const result = v.safeParse(schema, '123')

      // Assert
      expect(result.success).toBe(true)
      expect(result.output).toBe(123)
    })
  })

  describe('datetime', () => {
    test('should validate a datetime string', () => {
      // Arrange
      const schema = i.toDatetime()

      // Act

      const result = v.safeParse(schema, '2024-01-01T00:00:00Z')

      // Assert
      expect(result.success).toBe(true)
    })

    test('should transform input to dayjs object before give it to inner schema', () => {
      // Arrange
      const schema = i.toDatetime(
        v.unknown([
          v.custom(
            (value) =>
              dayjs.isDayjs(value) && value.isSame('2024-01-01T00:00:00Z'),
          ),
        ]),
      )

      // Act
      const result = v.safeParse(schema, '2024-01-01T00:00:00Z')

      // Assert
      expect(result.success).toBe(true)
      expect(result.typed).toBe(true)
      expect(result.output).toBeInstanceOf(dayjs)
    })
  })

  describe('bool', () => {
    test('should validate a bool string', () => {
      // Arrange
      const schema = i.toBool()

      // Act
      const result = v.safeParse(schema, 'true')

      // Assert
      expect(result.success).toBe(true)
    })
  })

  describe('decimal', () => {
    test('should validate a decimal string', () => {
      // Arrange
      const schema = i.toDecimal()

      // Act
      const result = v.safeParse(schema, '123.45')

      // Assert
      expect(result.success).toBe(true)
    })
  })
})
