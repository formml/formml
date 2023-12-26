import { renderHook } from '@testing-library/react'
import useFormML from '../useFormML.js'

describe('useFormML', () => {
  describe('handleSubmit', () => {
    test('should be a function', () => {
      // Arrange
      const dummyDsl = `abc`

      // Act
      const { result } = renderHook(() => useFormML(dummyDsl))

      // Assert
      expect(result.current.handleSubmit).toBeTypeOf('function')
    })

    test('should provide data to callback', () => {
      // Arrange
      const dummyDsl = `abc`
      const onSubmit = vi.fn()

      // Act
      const { result } = renderHook(() => useFormML(dummyDsl))
      const eventHandler = result.current.handleSubmit(onSubmit)
      eventHandler()

      // Assert
      const expectedData = {}
      expect(onSubmit).toBeCalledWith(expectedData)
    })
  })
})
