import { renderHook } from '@testing-library/react'
import useFormML from '../useFormML.js'

describe('useFormML', () => {
  describe('indexRoot', () => {
    test('should generate simple field indexes according to schema', () => {
      // Arrange
      const dsl = `
        form ExampleForm {
          Number   numberField
          Currency currencyField
          Text     textField
          Boolean	 booleanField
          Date		 dateField
        }
      `

      // Act
      const { result } = renderHook(() => useFormML(dsl))

      // Assert
      expect(result.current.indexRoot).toEqual({
        numberField: {
          $type: 'Number',
        },
        currencyField: {
          $type: 'Currency',
        },
        textField: {
          $type: 'Text',
        },
        booleanField: {
          $type: 'Boolean',
        },
        dateField: {
          $type: 'Date',
        },
      })
    })

    test('should not re-create indexes when rerendering without dsl change', () => {
      // Arrange
      const dsl = `
        form ExampleForm {
          Number   numberField
          Currency currencyField
          Text     textField
          Boolean	 booleanField
          Date		 dateField
        }
      `
      const { result, rerender } = renderHook(() => useFormML(dsl))
      const firstIndexRoot = result.current.indexRoot

      // Act
      rerender()

      // Assert
      expect(result.current.indexRoot).toBe(firstIndexRoot) // TODO: deep equality
    })
  })

  describe('handleSubmit', () => {
    const dummyDsl = `abc`
    const dummyEvent = new SubmitEvent(
      'submit',
    ) as unknown as React.FormEvent<HTMLFormElement>

    test('should be a function', () => {
      // Act
      const { result } = renderHook(() => useFormML(dummyDsl))

      // Assert
      expect(result.current.handleSubmit).toBeTypeOf('function')
    })

    test('should provide data to callback', () => {
      // Arrange
      const onSubmit = vi.fn()

      // Act
      const { result } = renderHook(() => useFormML(dummyDsl))
      const eventHandler = result.current.handleSubmit(onSubmit)
      eventHandler(dummyEvent)

      // Assert
      const expectedData = {}
      expect(onSubmit).toBeCalledWith(expectedData)
    })

    test.todo('should provide latest data to callback')

    test('should prevent default submit behavior', () => {
      // Arrange
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
