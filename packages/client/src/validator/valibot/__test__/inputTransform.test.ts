import * as v from 'valibot'

import { parse } from '../../../JsTypes.js'
import * as i from '../inputTransform.js'

vi.mock('../../../JsTypes.js')

describe('input transform', () => {
  const mockCurriedParse = vi.fn()

  beforeEach(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    vi.mocked(parse).mockReturnValue(mockCurriedParse as any)
  })

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

  test.each([
    { input: '123', transformer: i.toNum, type: 'num' },
    { input: '2024-01-01', transformer: i.toDatetime, type: 'datetime' },
    { input: 'true', transformer: i.toBool, type: 'bool' },
    { input: '123.45', transformer: i.toDecimal, type: 'decimal' },
  ])(
    'should transform input with correct type $type when calling $transformer.name',
    ({ input, transformer, type }) => {
      // Arrange
      mockCurriedParse.mockReturnValue('transformed value')

      // Act
      const result = v.safeParse(
        transformer(v.literal('transformed value')),
        input,
      )

      // Assert
      expect(parse).toBeCalledWith(type)
      expect(result.success).toBe(true)
    },
  )
})
