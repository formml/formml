import * as v from 'valibot'

import { isoDateTime } from '../isoDateTime.js'

describe('isoDateTime', () => {
  test.each([
    // Valid Year
    '2024',

    // Valid Year and Month
    '2024-01',

    // Valid Date
    '2024-01-01',

    // Valid Date and Time
    '2024-01-01T00:00:00',
    '2024-01-01T00:00:00Z',
    '2024-01-01T00:00:00+05:00',
    '2024-01-01T00:00:00-05:00',
    '2024-01-01T00:00:00.123Z',
    '2024-01-01T00:00:00.123+05:00',
    '2024-01-01T00:00:00.123-05:00',
    '2024-01-01T00:00:00.123456Z',
    '2024-01-01T00:00:00.123456+05:00',
    '2024-01-01T00:00:00.123456-05:00',

    // Valid Date and Time without "T"
    '2024-01-01 00:00:00',
    '2024-01-01 00:00:00Z',
    '2024-01-01 00:00:00+05:00',
    '2024-01-01 00:00:00-05:00',
    '2024-01-01 00:00:00.123Z',
    '2024-01-01 00:00:00.123+05:00',
    '2024-01-01 00:00:00.123-05:00',
    '2024-01-01 00:00:00.123456Z',
    '2024-01-01 00:00:00.123456+05:00',
    '2024-01-01 00:00:00.123456-05:00',
  ])('should validate any ISO 8601 format string - "%s"', (input) => {
    // Arrange
    const schema = v.pipe(v.string(), isoDateTime())

    // Act
    const result = v.safeParse(schema, input)

    // Assert
    expect(result.success).toBe(true)
  })

  test.each(['', '  ', '\n', '\t'])(
    'should not validate a blank string',
    (input) => {
      // Arrange
      const schema = v.pipe(v.string(), isoDateTime())

      // Act
      const result = v.safeParse(schema, input)

      // Assert
      expect(result.success).toBe(false)
      expect(result.issues).toMatchSnapshot()
    },
  )

  test.each([
    ' 2024-01-01T00:00:00Z ',
    '2024-01-01T00:00:00Z ',
    ' 2024-01-01T00:00:00Z',
    '\t\n2024-01-01T00:00:00Z',
  ])(
    'should not validate a datetime string with additional whitespaces - "%s"',
    (input) => {
      // Arrange
      const schema = v.pipe(v.string(), isoDateTime())

      // Act
      const result = v.safeParse(schema, input)

      // Assert
      expect(result.success).toBe(false)
      expect(result.issues).toMatchSnapshot()
    },
  )

  test.each([
    // Invalid Year
    '202',
    '202a',

    // Invalid Year and Month
    '2024-1',
    '2024-0a',

    // Invalid Date
    '2024-01-0',
    '2024-01-a',

    // Invalid Date and Time
    '2024-01-01T0',
    '2024-01-01T00:',
    '2024-01-01T00:0',
    '2024-01-01T00:00:',
    '2024-01-01T00:00:0',
    '2024-01-01T00:00:0Z0',
    '2024-01-01T00:00:0Z00',

    // Invalid Date and Time without "T"
    '2024-01-01 0',
    '2024-01-01 00:',
    '2024-01-01 00:0',
    '2024-01-01 00:00:',
    '2024-01-01 00:00:0',
    '2024-01-01 00:00:0Z0',
    '2024-01-01 00:00:0Z00',
  ])('should not validate invalid ISO 8601 format string - "%s"', (input) => {
    // Arrange
    const schema = v.pipe(v.string(), isoDateTime())

    // Act
    const result = v.safeParse(schema, input)

    // Assert
    expect(result.success).toBe(false)
    expect(result.issues).toMatchSnapshot()
  })

  test('should not validate non-datetime string', () => {
    // Arrange
    const schema = v.pipe(v.string(), isoDateTime())

    // Act
    const result = v.safeParse(schema, 'hello')

    // Assert
    expect(result.success).toBe(false)
    expect(result.issues).toMatchSnapshot()
  })

  test('should accept custom message', () => {
    // Arrange
    const schema = v.pipe(v.string(), isoDateTime('Custom message'))

    // Act
    const result = v.safeParse(schema, 'abc')

    // Assert
    expect(result.success).toBe(false)
    expect(result.issues).toMatchInlineSnapshot(`
      [
        {
          "abortEarly": undefined,
          "abortPipeEarly": undefined,
          "expected": "ISO-8601 format",
          "input": "abc",
          "issues": undefined,
          "kind": "validation",
          "lang": undefined,
          "message": "Custom message",
          "path": undefined,
          "received": ""abc"",
          "requirement": /\\^\\(\\?:\\[\\+-\\]\\?\\\\d\\{4\\}\\(\\?!\\\\d\\{2\\}\\\\b\\)\\)\\(\\?:\\(-\\?\\)\\(\\?:\\(\\?:0\\[1-9\\]\\|1\\[0-2\\]\\)\\(\\?:\\\\1\\(\\?:\\[12\\]\\\\d\\|0\\[1-9\\]\\|3\\[01\\]\\)\\)\\?\\|W\\(\\?:\\[0-4\\]\\\\d\\|5\\[0-2\\]\\)\\(\\?:-\\?\\[1-7\\]\\)\\?\\|\\(\\?:00\\[1-9\\]\\|0\\[1-9\\]\\\\d\\|\\[12\\]\\\\d\\{2\\}\\|3\\(\\?:\\[0-5\\]\\\\d\\|6\\[1-6\\]\\)\\)\\)\\(\\?:\\[T\\\\s\\]\\(\\?:\\(\\?:\\(\\?:\\[01\\]\\\\d\\|2\\[0-3\\]\\)\\(\\?:\\(:\\?\\)\\[0-5\\]\\\\d\\)\\?\\|24:\\?00\\)\\(\\?:\\[\\.,\\]\\\\d\\+\\(\\?!:\\)\\)\\?\\)\\?\\(\\?:\\\\2\\[0-5\\]\\\\d\\(\\?:\\[\\.,\\]\\\\d\\+\\)\\?\\)\\?\\(\\?:\\[zZ\\]\\|\\(\\?:\\[\\+-\\]\\)\\(\\?:\\[01\\]\\\\d\\|2\\[0-3\\]\\):\\?\\(\\?:\\[0-5\\]\\\\d\\)\\?\\)\\?\\)\\?\\)\\?\\$/,
          "type": "iso_date_time",
        },
      ]
    `)
  })
})
