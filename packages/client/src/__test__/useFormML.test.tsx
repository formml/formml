import { createFormMLParser } from '@formml/dsl'
import { render, renderHook } from '@testing-library/react'
import { Profiler } from 'react'

import type { FormMLOptions } from '../FormML.js'
import type { ValidationError } from '../validator/index.js'

import { FormML } from '../FormML.js'
import { useFormML } from '../useFormML.js'
import { useFormMLContext } from '../useFormMLContext.js'

vi.mock('../FormML.js', async (importOriginal) => {
  const { FormML: realFormML } =
    await importOriginal<typeof import('../FormML.js')>()
  return {
    FormML: vi.fn((schema) => new realFormML(schema)),
  }
})

describe('useFormML', () => {
  const parse = createFormMLParser()

  test('should new FormML with given arguments', async () => {
    // Arrange
    const schema = await parse(`
      form ExampleForm {
        text textField
      }
    `)
    const options = {} as FormMLOptions
    // Act
    renderHook(() => useFormML(schema, options))

    // Assert
    expect(FormML).toBeCalledWith(schema, options)
  })

  describe('$form', () => {
    test('should generate simple field indexes according to schema', async () => {
      // Arrange
      const schema = await parse(`
        form ExampleForm {
          num      numberField
          decimal  decimalField
          text     textField
          bool	   boolField
          datetime datetimeField
        }
      `)

      // Act
      const { result } = renderHook(() => useFormML(schema))

      // Assert
      expect(result.current.$form).toMatchInlineSnapshot(`
        {
          "boolField": {
            Symbol(name): "boolField",
            Symbol(type): "bool",
          },
          "datetimeField": {
            Symbol(name): "datetimeField",
            Symbol(type): "datetime",
          },
          "decimalField": {
            Symbol(name): "decimalField",
            Symbol(type): "decimal",
          },
          "numberField": {
            Symbol(name): "numberField",
            Symbol(type): "num",
          },
          "textField": {
            Symbol(name): "textField",
            Symbol(type): "text",
          },
          Symbol(name): "ExampleForm",
          Symbol(type): "form",
        }
      `)
    })

    test('should re-create indexes when schema changes', async () => {
      // Arrange
      const schema = await parse(`
        form ExampleForm {
          num      numberField
          decimal  decimalField
          text     textField
          bool	   boolField
          datetime datetimeField
        }
      `)
      const { rerender, result } = renderHook((schema) => useFormML(schema), {
        initialProps: schema,
      })
      const firstIndexRoot = result.current.$form

      // Act
      const anotherSchema = await parse(`
        form ExampleForm2 {
          num numberField
        }
      `)
      rerender(anotherSchema)

      // Assert
      expect(result.current.$form).not.toBe(firstIndexRoot)
    })

    test('should not re-create indexes when rerendering without schema change', async () => {
      // Arrange
      const schema = await parse(`
        form ExampleForm {
          num      numberField
          decimal  decimalField
          text     textField
          bool	   boolField
          datetime datetimeField
        }
      `)
      const { rerender, result } = renderHook(() => useFormML(schema))
      const firstIndexRoot = result.current.$form

      // Act
      rerender()

      // Assert
      expect(result.current.$form).toBe(firstIndexRoot) // TODO: deep equality
    })
  })

  describe('handleSubmit', async () => {
    const dummySchema = await parse(`
      form ExampleForm {
        num numberField
      }
    `)
    const dummyEvent = new SubmitEvent(
      'submit',
    ) as unknown as React.FormEvent<HTMLFormElement>

    test('should be a function', () => {
      // Act
      const { result } = renderHook(() => useFormML(dummySchema))

      // Assert
      expect(result.current.handleSubmit).toBeTypeOf('function')
    })

    test('should prevent default by default', () => {
      // Arrange
      const onSubmit = vi.fn()
      const mockedPreventDefault = vi.fn()

      // Act
      const { result } = renderHook(() => useFormML(dummySchema))
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
      const { result } = renderHook(() => useFormML(dummySchema))
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

      const stubFormML = new FormML(dummySchema)
      vi.spyOn(stubFormML, 'getTypedData').mockReturnValue(expectedData)
      vi.spyOn(stubFormML, 'validateAll').mockReturnValue({
        errors: undefined,
        isValid: true,
      })

      vi.mocked(FormML).mockReturnValue(stubFormML)
      const { result } = renderHook(() => useFormML(dummySchema))
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
      const { result } = renderHook(() => useFormML(dummySchema))
      const eventHandler = result.current.handleSubmit(onSubmit)
      eventHandler(dummyEvent)

      // Assert
      expect(onSubmit).toBeCalledWith({}, dummyEvent)
    })

    test('should not call submit handler if form is invalid', () => {
      // Arrange
      const onSubmit = vi.fn()
      const stubFormML = new FormML(dummySchema)
      const spiedValidate = vi.spyOn(stubFormML, 'validateAll')
      spiedValidate.mockReturnValue({ errors: [], isValid: false })
      vi.mocked(FormML).mockReturnValue(stubFormML)
      const { result } = renderHook(() => useFormML(dummySchema))
      const eventHandler = result.current.handleSubmit(onSubmit)

      // Act
      eventHandler(dummyEvent)

      // Assert
      expect(onSubmit).not.toBeCalled()
    })

    test('should call error handler with errors if form is invalid', () => {
      // Arrange
      const onError = vi.fn()
      const stubFormML = new FormML(dummySchema)
      const spiedValidate = vi.spyOn(stubFormML, 'validateAll')
      const errors = [
        { message: 'Error message' },
        { message: 'Unknown field error' },
      ] as ValidationError[]
      spiedValidate.mockReturnValue({ errors, isValid: false })
      vi.mocked(FormML).mockReturnValue(stubFormML)
      const { result } = renderHook(() => useFormML(dummySchema))
      const eventHandler = result.current.handleSubmit(() => {}, onError)

      // Act
      eventHandler(dummyEvent)

      // Assert
      expect(onError).toBeCalledWith(errors)
    })

    // TODO: touch all fields before submit
  })

  describe('FormML', async () => {
    const dummySchema = await parse(`
      form ExampleForm {
        num numberField
      }
    `)

    test('should provide FormML instance via context', () => {
      // Arrange
      let receivedContext: FormML | undefined
      const Consumer = () => {
        receivedContext = useFormMLContext()
        return null
      }

      const stubFormML = new FormML(dummySchema)
      vi.mocked(FormML).mockReturnValue(stubFormML)

      const { result } = renderHook(() => useFormML(dummySchema))
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
        const { FormML } = useFormML(dummySchema)
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

  describe('instance', async () => {
    const dummySchema = await parse(`
      form ExampleForm {
        num numberField
      }
    `)

    test('should return FormML instance', () => {
      // Arrange
      const stubFormML = new FormML(dummySchema)
      vi.mocked(FormML).mockReturnValue(stubFormML)

      // Act
      const { result } = renderHook(() => useFormML(dummySchema))

      // Assert
      expect(result.current.instance).toBe(stubFormML)
    })
  })
})
