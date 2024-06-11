import * as v from 'valibot'

import annotationsReducer from '../annotationsReducer.js'

describe('annotationsReducer', () => {
  const baseState = {
    pipeline: [],
    schema: v.string(),
  }

  test('should throw if annotation is unknown', () => {
    // Arrange
    const action = {
      name: 'unknown',
      options: {},
    }

    // Act & Assert
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect(() => annotationsReducer(baseState, action as any)).toThrow()
  })

  test('required - should wrap base schema with required schema', () => {
    // Arrange
    const action = {
      name: 'required',
      options: {},
    } as const

    // Act
    const result = annotationsReducer(baseState, action)

    // Assert
    expect(result).toEqual({
      pipeline: [],
      schema: expect.objectContaining({
        async: false,
        kind: 'schema',
        type: 'required',
        wrapped: baseState.schema,
      }),
    })
  })
})
