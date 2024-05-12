import { BigNumber } from 'bignumber.js'
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

    test.each(['', '  ', ' \n\t'])(
      'should validate a blank string',
      (input) => {
        // Arrange
        const schema = i.toNum()

        // Act
        const result = v.safeParse(schema, input)

        // Assert
        expect(result.success).toBe(true)
      },
    )

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
            "context": "custom",
            "expected": null,
            "input": "abc",
            "lang": undefined,
            "message": "Invalid input: Received "abc"",
            "path": undefined,
            "reason": "string",
            "received": ""abc"",
            "requirement": [Function],
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

    test.each(['', '  ', ' \n\t'])(
      'should transform empty string to undefined',
      (input) => {
        // Arrange
        const schema = i.toNum(v.undefined_())

        // Act
        const result = v.safeParse(schema, input)

        // Assert
        expect(result.success).toBe(true)
        expect(result.output).toBeUndefined()
      },
    )
  })

  describe('datetime', () => {
    test.each([
      '2024-01-01',
      '2024-01-01T00:00:00',
      '2024-01-01T00:00:00Z',
      '2024-01-01T00:00:00.000Z',
      '2024-01-01T00:00:00.000000Z',
      '2024-01-01T00:00:00+01:00',
    ])('should validate any datetime-like string', (input) => {
      // Arrange
      const schema = i.toDatetime()

      // Act
      const result = v.safeParse(schema, input)

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

    test('should transform input to boolean before give it to inner schema', () => {
      // Arrange
      const schema = i.toBool(v.literal(true))

      // Act
      const result = v.safeParse(schema, 'true')

      // Assert
      expect(result.success).toBe(true)
      expect(result.output).toBe(true)
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

    test('should transform input to big number before give it to inner schema', () => {
      // Arrange
      const schema = i.toDecimal(
        v.instance(BigNumber, [v.custom((value) => value.eq('123.45'))]),
      )

      // Act
      const result = v.safeParse(schema, '123.45')

      // Assert
      expect(result.success).toBe(true)
      expect(result.output).toBeInstanceOf(BigNumber)
    })
  })
})
