import * as v from 'valibot'

import { required } from '../required.js'

describe('required', () => {
  test('should wrap base schema with required schema', () => {
    // Arrange
    const baseSchema = v.string()
    const action = {
      name: 'required',
      options: {
        message: 'Custom message',
      },
    } as const

    // Act
    const schema = required(baseSchema, action)

    // Assert
    expect(schema).toEqual(
      expect.objectContaining({
        async: false,
        kind: 'schema',
        message: 'Custom message',
        type: 'required',
        wrapped: baseSchema,
      }),
    )
  })
})
