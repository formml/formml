import { renderHook } from '@testing-library/react'
import useFormML from '../useFormML.js'

describe('useFormML', () => {
  describe('handleSubmit', () => {
    const dummyEvent = new SubmitEvent(
      'submit',
    ) as unknown as React.FormEvent<HTMLFormElement>

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
      eventHandler(dummyEvent)

      // Assert
      const expectedData = {}
      expect(onSubmit).toBeCalledWith(expectedData)
    })

    test('should prevent default submit behavior', () => {
      // Arrange
      const dummyDsl = `abc`
      const preventDefault = vi.spyOn(dummyEvent, 'preventDefault')

      // Act
      const { result } = renderHook(() => useFormML(dummyDsl))
      const eventHandler = result.current.handleSubmit(() => {})
      eventHandler(dummyEvent)

      // Assert
      expect(preventDefault).toBeCalled()
    })
  })
})
