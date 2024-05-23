import * as v from 'valibot'

import bool from '../bool.js'

describe('bool', () => {
  test.each([
    'true',
    'false',
    '1',
    '0',
    'yes',
    'no',
    'on',
    'off',
    'enabled',
    'disabled',
    'active',
    'inactive',
    '',
    '  ',
  ])('should always valid for any string', (input) => {
    // Arrange
    const schema = v.pipe(v.string(), bool())

    // Act
    const result = v.safeParse(schema, input)

    // Assert
    expect(result.success).toBe(true)
  })
})
