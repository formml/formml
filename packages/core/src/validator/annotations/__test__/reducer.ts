import * as v from 'valibot'

import { reducerImpl } from '../impl/index.js'
import { annotationsReducer } from '../reducer.js'

vi.mock('../impl/index.js', () => ({
  reducerImpl: {
    base64: vi.fn(),
    required: vi.fn(),
  },
}))

describe('annotationsReducer', () => {
  const baseSchema = v.string()

  test.each(['base64', 'required'] as const)(
    'should dispatch to the correct implementation - %s',
    (name) => {
      // Arrange
      const action = {
        name,
        options: {},
      }
      const mockSchema = {} as v.GenericSchema
      vi.mocked(reducerImpl[name]).mockReturnValue(mockSchema)

      // Act
      const schema = annotationsReducer(baseSchema, action)

      // Assert
      expect(reducerImpl[name]).toBeCalledWith(baseSchema, action)
      expect(schema).toBe(mockSchema)
    },
  )

  test('should throw if annotation is unknown', () => {
    // Arrange
    const action = {
      name: 'unknown',
      options: {},
    }

    // Act & Assert
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-argument
    expect(() => annotationsReducer(baseSchema, action as any)).toThrow()
  })
})
