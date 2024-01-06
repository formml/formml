import { renderHook } from '@testing-library/react'

import FormML from '../FormML.js'
import useFormML from '../useFormML.js'

vi.mock('../FormML.js', async (importOriginal) => {
  const realFormML = (await importOriginal<typeof import('../FormML.js')>())
    .default
  return {
    default: vi.fn((dsl) => new realFormML(dsl)),
  }
})

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
        booleanField: {
          $type: 'Boolean',
        },
        currencyField: {
          $type: 'Currency',
        },
        dateField: {
          $type: 'Date',
        },
        numberField: {
          $type: 'Number',
        },
        textField: {
          $type: 'Text',
        },
      })
    })

    test('should re-create indexes when dsl changes', () => {
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
      const { rerender, result } = renderHook((dsl) => useFormML(dsl), {
        initialProps: dsl,
      })
      const firstIndexRoot = result.current.indexRoot

      // Act
      const anotherDsl = `
        form ExampleForm2 {
          Number   numberField
        }
      `
      rerender(anotherDsl)

      // Assert
      expect(result.current.indexRoot).not.toBe(firstIndexRoot)
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
      const { rerender, result } = renderHook(() => useFormML(dsl))
      const firstIndexRoot = result.current.indexRoot

      // Act
      rerender()

      // Assert
      expect(result.current.indexRoot).toBe(firstIndexRoot) // TODO: deep equality
    })
  })

  describe('handleSubmit', () => {
    const dummyDsl = `
      form ExampleForm {
        Number numberField
      }`
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

    test('should provide latest data to callback', () => {
      // Arrange
      const stubFormML = {
        getTypedData: vi.fn(),
      }
      vi.mocked(FormML).mockReturnValue(stubFormML as unknown as FormML)
      const { result } = renderHook(() => useFormML(dummyDsl))

      const onSubmit = vi.fn()
      const eventHandler = result.current.handleSubmit(onSubmit)

      const expectedData = {
        fieldA: 'abc',
        fieldB: 123.45,
      }
      stubFormML.getTypedData.mockReturnValue(expectedData)

      // Act
      eventHandler(dummyEvent)

      // Assert
      expect(onSubmit).toBeCalledWith(expectedData)
    })

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
