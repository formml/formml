import { render, renderHook } from '@testing-library/react'
import { Profiler } from 'react'

import { FormML } from '../FormML.js'
import { useFormML } from '../useFormML.js'
import { useFormMLContext } from '../useFormMLContext.js'

vi.mock('../FormML.js', async (importOriginal) => {
  const { FormML: realFormML } =
    await importOriginal<typeof import('../FormML.js')>()
  return {
    FormML: vi.fn((dsl) => new realFormML(dsl)),
  }
})

describe('useFormML', () => {
  describe('$form', () => {
    test('should generate simple field indexes according to schema', () => {
      // Arrange
      const dsl = `
        form ExampleForm {
          Number   numberField
          Currency currencyField
          Text     textField
          Boolean	 booleanField
          DateTime datetimeField
        }
      `

      // Act
      const { result } = renderHook(() => useFormML(dsl))

      // Assert
      expect(result.current.$form).toEqual({
        booleanField: {
          $type: 'Boolean',
        },
        currencyField: {
          $type: 'Currency',
        },
        datetimeField: {
          $type: 'DateTime',
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
          DateTime datetimeField
        }
      `
      const { rerender, result } = renderHook((dsl) => useFormML(dsl), {
        initialProps: dsl,
      })
      const firstIndexRoot = result.current.$form

      // Act
      const anotherDsl = `
        form ExampleForm2 {
          Number   numberField
        }
      `
      rerender(anotherDsl)

      // Assert
      expect(result.current.$form).not.toBe(firstIndexRoot)
    })

    test('should not re-create indexes when rerendering without dsl change', () => {
      // Arrange
      const dsl = `
        form ExampleForm {
          Number   numberField
          Currency currencyField
          Text     textField
          Boolean	 booleanField
          DateTime datetimeField
        }
      `
      const { rerender, result } = renderHook(() => useFormML(dsl))
      const firstIndexRoot = result.current.$form

      // Act
      rerender()

      // Assert
      expect(result.current.$form).toBe(firstIndexRoot) // TODO: deep equality
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
      const stubFormML = new FormML(dummyDsl)
      const spiedGetTypedData = vi.spyOn(stubFormML, 'getTypedData')
      vi.mocked(FormML).mockReturnValue(stubFormML)
      const { result } = renderHook(() => useFormML(dummyDsl))

      const onSubmit = vi.fn()
      const eventHandler = result.current.handleSubmit(onSubmit)

      const expectedData = {
        fieldA: 'abc',
        fieldB: 123.45,
      }
      spiedGetTypedData.mockReturnValue(expectedData)

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

  describe('FormML', () => {
    const dummyDsl = `
      form ExampleForm {
        Number numberField
      }`

    test('should provide FormML instance via context', () => {
      // Arrange
      let receivedContext: FormML | undefined
      const Consumer = () => {
        receivedContext = useFormMLContext()
        return null
      }

      const stubFormML = new FormML(dummyDsl)
      vi.mocked(FormML).mockReturnValue(stubFormML)

      const { result } = renderHook(() => useFormML(dummyDsl))
      const { FormML: FormMLWrapper } = result.current

      // Act
      render(
        <FormMLWrapper>
          <Consumer />
        </FormMLWrapper>,
      )

      // Assert
      expect(receivedContext).toBe(stubFormML)
    })

    test('should avoid re-mount children if parent re-renders', () => {
      // Arrange
      const Consumer = () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const _formML = useFormMLContext()
        return null
      }

      const renderPhases: string[] = []

      const Parent = ({ count }: { count: number }) => {
        const { FormML } = useFormML(dummyDsl)
        return (
          <>
            <FormML>
              <Profiler
                id="children"
                onRender={(_id, phase) => renderPhases.push(phase)}
              >
                <Consumer />
              </Profiler>
            </FormML>
            <span>{count}</span>
          </>
        )
      }

      // Act
      const { rerender } = render(<Parent count={1} />)
      rerender(<Parent count={2} />)

      // Assert
      expect(renderPhases).toEqual(['mount', 'update'])
    })
  })

  describe('instance', () => {
    const dummyDsl = `
      form ExampleForm {
        Number numberField
      }`

    test('should return FormML instance', () => {
      // Arrange
      const stubFormML = new FormML(dummyDsl)
      vi.mocked(FormML).mockReturnValue(stubFormML)

      // Act
      const { result } = renderHook(() => useFormML(dummyDsl))

      // Assert
      expect(result.current.instance).toBe(stubFormML)
    })
  })
})
