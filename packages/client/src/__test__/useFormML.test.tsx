import { render, renderHook } from '@testing-library/react'
import { Profiler } from 'react'

import { FormML, FormMLOptions } from '../FormML.js'
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
  test('should new FormML with given arguments', () => {
    // Arrange
    const dsl = `
      form ExampleForm {
        text textField
      }
    `
    const options = {} as FormMLOptions
    // Act
    renderHook(() => useFormML(dsl, options))

    // Assert
    expect(FormML).toBeCalledWith(dsl, options)
  })

  describe('$form', () => {
    test('should generate simple field indexes according to schema', () => {
      // Arrange
      const dsl = `
        form ExampleForm {
          num   numberField
          decimal decimalField
          text     textField
          bool	 boolField
          datetime datetimeField
        }
      `

      // Act
      const { result } = renderHook(() => useFormML(dsl))

      // Assert
      expect(result.current.$form).toEqual({
        boolField: {
          $type: 'bool',
        },
        datetimeField: {
          $type: 'datetime',
        },
        decimalField: {
          $type: 'decimal',
        },
        numberField: {
          $type: 'num',
        },
        textField: {
          $type: 'text',
        },
      })
    })

    test('should re-create indexes when dsl changes', () => {
      // Arrange
      const dsl = `
        form ExampleForm {
          num   numberField
          decimal decimalField
          text     textField
          bool	 boolField
          datetime datetimeField
        }
      `
      const { rerender, result } = renderHook((dsl) => useFormML(dsl), {
        initialProps: dsl,
      })
      const firstIndexRoot = result.current.$form

      // Act
      const anotherDsl = `
        form ExampleForm2 {
          num   numberField
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
          num   numberField
          decimal decimalField
          text     textField
          bool	 boolField
          datetime datetimeField
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
        num numberField
      }
    `
    const dummyEvent = new SubmitEvent(
      'submit',
    ) as unknown as React.FormEvent<HTMLFormElement>

    test('should be a function', () => {
      // Act
      const { result } = renderHook(() => useFormML(dummyDsl))

      // Assert
      expect(result.current.handleSubmit).toBeTypeOf('function')
    })

    test('should prevent default by default', () => {
      // Arrange
      const onSubmit = vi.fn()
      const mockedPreventDefault = vi.fn()

      // Act
      const { result } = renderHook(() => useFormML(dummyDsl))
      result.current.instance.initField(result.current.$form['numberField'])
      const eventHandler = result.current.handleSubmit(onSubmit)
      eventHandler({
        preventDefault: mockedPreventDefault,
      } as unknown as React.FormEvent<HTMLFormElement>)

      // Assert
      expect(mockedPreventDefault).toBeCalled()
    })

    test('should provide data to submit handler', () => {
      // Arrange
      const onSubmit = vi.fn()

      // Act
      const { result } = renderHook(() => useFormML(dummyDsl))
      result.current.instance.initField(result.current.$form['numberField'])
      const eventHandler = result.current.handleSubmit(onSubmit)
      eventHandler(dummyEvent)

      // Assert
      const expectedData = {}
      expect(onSubmit).toBeCalledWith(expectedData, dummyEvent)
    })

    test('should provide latest data to submit handler', () => {
      // Arrange
      const expectedData = {
        numberField: 123.45,
      }

      const stubFormML = new FormML(dummyDsl)
      vi.spyOn(stubFormML, 'getTypedData').mockReturnValue(expectedData)
      vi.spyOn(stubFormML, 'validateAll').mockReturnValue({
        errors: [],
        isValid: true,
      })

      vi.mocked(FormML).mockReturnValue(stubFormML)
      const { result } = renderHook(() => useFormML(dummyDsl))
      const onSubmit = vi.fn()

      // Act
      result.current.handleSubmit(onSubmit)(dummyEvent)

      // Assert
      expect(onSubmit).toBeCalledWith(expectedData, dummyEvent)
    })

    test('should provide event to submit handler', () => {
      // Arrange
      const onSubmit = vi.fn()

      // Act
      const { result } = renderHook(() => useFormML(dummyDsl))
      result.current.instance.initField(result.current.$form['numberField'])
      const eventHandler = result.current.handleSubmit(onSubmit)
      eventHandler(dummyEvent)

      // Assert
      expect(onSubmit).toBeCalledWith({}, dummyEvent)
    })

    test('should not call submit handler if form is invalid', () => {
      // Arrange
      const onSubmit = vi.fn()
      const stubFormML = new FormML(dummyDsl)
      const spiedValidate = vi.spyOn(stubFormML, 'validateAll')
      spiedValidate.mockReturnValue({ errors: [], isValid: false })
      vi.mocked(FormML).mockReturnValue(stubFormML)
      const { result } = renderHook(() => useFormML(dummyDsl))
      const eventHandler = result.current.handleSubmit(onSubmit)

      // Act
      eventHandler(dummyEvent)

      // Assert
      expect(onSubmit).not.toBeCalled()
    })

    test('should call error handler with errors if form is invalid', () => {
      // Arrange
      const onError = vi.fn()
      const stubFormML = new FormML(dummyDsl)
      const spiedValidate = vi.spyOn(stubFormML, 'validateAll')
      const errors = [
        { message: 'Error message' },
        { message: 'Unknown field error' },
      ]
      spiedValidate.mockReturnValue({ errors, isValid: false })
      vi.mocked(FormML).mockReturnValue(stubFormML)
      const { result } = renderHook(() => useFormML(dummyDsl))
      const eventHandler = result.current.handleSubmit(() => {}, onError)

      // Act
      eventHandler(dummyEvent)

      // Assert
      expect(onError).toBeCalledWith(errors)
    })

    // TODO: touch all fields before submit
  })

  describe('FormML', () => {
    const dummyDsl = `
      form ExampleForm {
        num numberField
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
        num numberField
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
