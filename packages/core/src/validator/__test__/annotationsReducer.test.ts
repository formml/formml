import * as v from 'valibot'

import annotationsReducer from '../annotationsReducer.js'

describe('annotationsReducer', () => {
  const baseSchema = v.string()

  test('should throw if annotation is unknown', () => {
    // Arrange
    const action = {
      name: 'unknown',
      options: {},
    }

    // Act & Assert
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect(() => annotationsReducer(baseSchema, action as any)).toThrow()
  })

  test('required - should wrap base schema with required schema', () => {
    // Arrange
    const action = {
      name: 'required',
      options: {
        message: 'Custom message',
      },
    } as const

    // Act
    const schema = annotationsReducer(baseSchema, action)

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
