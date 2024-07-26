import { createFormMLParser } from '@formml/dsl'
import { act, renderHook, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'

import { FormML } from '../FormML.js'
import { AnyIndex } from '../IndexManager.js'
import { useField } from '../useField.js'
import { renderHookWithContext } from './helpers/renderHookWithContext.js'
import { renderWithContext } from './helpers/renderWithContext.js'
import suppressErrorOutput from './helpers/suppressErrorOutput.js'

describe('useField', () => {
  const parse = createFormMLParser()

  describe('hook only', () => {
    let restoreConsole: () => void

    beforeAll(() => {
      restoreConsole = suppressErrorOutput()
    })

    afterAll(() => {
      restoreConsole()
    })

    test('should throw if has no context', () => {
      const dummyIndex = {} as AnyIndex
      expect(() => renderHook(() => useField(dummyIndex))).toThrow(
        '`useFormMLContext` must be used within a `FormMLProvider`',
      )
    })

    test('should throw if index can not be recognized', async () => {
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
      const formML = new FormML(schema)
      const invalidIndex = {} as AnyIndex

      // Act & Assert
      expect(() =>
        renderHookWithContext(() => useField(invalidIndex), formML),
      ).toThrow(/Given index is invalid, provided index:[\s\S]+/g)
    })

    test('should return field pack given valid index', async () => {
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
      const formML = new FormML(schema)
      const index = formML.indexRoot['numberField']

      // Act
      const { result } = renderHookWithContext(() => useField(index), formML)

      // Assert
      expect(result.current).toEqual({
        field: {
          name: 'numberField',
          onBlur: expect.any(Function),
          onChange: expect.any(Function),
          value: '',
        },
        helpers: {
          blur: expect.any(Function),
          commitRawValue: expect.any(Function),
          setRawValue: expect.any(Function),
          setTypedValue: expect.any(Function),
        },
        meta: {
          error: undefined,
          schema: expect.objectContaining({
            $type: 'Field',
            name: 'numberField',
            type: 'num',
          }),
          touched: false,
          typedValue: undefined,
        },
      })
    })

    test('should return new value if onChange triggered', async () => {
      // Arrange
      const schema = await parse(`
        form ExampleForm {
          num numberField
        }
      `)
      const formML = new FormML(schema)
      const index = formML.indexRoot['numberField']
      const { result } = renderHookWithContext(() => useField(index), formML)

      // Act
      act(() => {
        result.current.field.onChange({
          target: { value: '1' },
        } as unknown as React.ChangeEvent<HTMLInputElement>)
      })

      // Assert
      expect(result.current.field.value).toEqual('1')
    })

    test('should return new touched if onBlur triggered', async () => {
      // Arrange
      const schema = await parse(`
        form ExampleForm {
          num numberField
        }
      `)
      const formML = new FormML(schema)
      const index = formML.indexRoot['numberField']
      const { result } = renderHookWithContext(() => useField(index), formML)

      // Act
      act(() => {
        result.current.field.onBlur({} as unknown as React.FocusEvent)
      })

      // Assert
      expect(result.current.meta.touched).toBe(true)
    })

    test('should return new typed value if onBlur triggered', async () => {
      // Arrange
      const schema = await parse(`
        form ExampleForm {
          text textField
        }
      `)
      const formML = new FormML(schema)
      const index = formML.indexRoot['textField']
      const { result } = renderHookWithContext(() => useField(index), formML)

      // Act
      act(() => {
        result.current.field.onChange({
          target: { value: '123' },
        } as unknown as React.ChangeEvent<HTMLInputElement>)
        result.current.field.onBlur({} as unknown as React.FocusEvent)
      })

      // Assert
      expect(result.current.meta.typedValue).toEqual('123')
    })

    test('should return new typed value if not-first-time onBlur triggered', async () => {
      // Arrange
      const schema = await parse(`
        form ExampleForm {
          text textField
        }
      `)
      const formML = new FormML(schema)
      const index = formML.indexRoot['textField']
      const { result } = renderHookWithContext(() => useField(index), formML)

      // Act
      act(() => {
        result.current.field.onChange({
          target: { value: 'first time' },
        } as unknown as React.ChangeEvent<HTMLInputElement>)
      })

      expect(result.current.field.value).toEqual('first time')

      act(() => {
        result.current.field.onBlur({} as unknown as React.FocusEvent)
      })

      // Assert
      expect(result.current.meta.typedValue).toEqual('first time')

      // Act
      act(() => {
        result.current.field.onChange({
          target: { value: 'second time' },
        } as unknown as React.ChangeEvent<HTMLInputElement>)
      })
      expect(result.current.field.value).toEqual('second time')
      act(() => {
        result.current.field.onBlur({} as unknown as React.FocusEvent)
      })

      // Assert
      expect(result.current.meta.typedValue).toEqual('second time')
    })

    test('should return new validation result if onBlur triggered', async () => {
      // Arrange
      const schema = await parse(`
        form ExampleForm {
          @required
          num numberField
        }
      `)
      const formML = new FormML(schema)
      const index = formML.indexRoot['numberField']
      const { result } = renderHookWithContext(() => useField(index), formML)

      // Act
      act(() => {
        result.current.field.onBlur({} as unknown as React.FocusEvent)
      })

      // Assert
      expect(result.current.meta.error).toEqual(
        expect.objectContaining({
          message: expect.any(String),
        }),
      )
    })

    test('should return new validation result if onChange triggered', async () => {
      // Arrange
      const schema = await parse(`
        form ExampleForm {
          @required
          num numberField
        }
      `)
      const formML = new FormML(schema)
      const index = formML.indexRoot['numberField']
      const { result } = renderHookWithContext(() => useField(index), formML)

      // Act
      act(() => {
        result.current.field.onBlur({} as unknown as React.FocusEvent)
      })

      // Assert
      expect(result.current.meta.error).toEqual(
        expect.objectContaining({
          message: expect.any(String),
        }),
      )
    })
  })

  describe('integration', () => {
    test('should update value properly when user inputs', async () => {
      // Arrange
      const TestInput = ({ index }: { index: AnyIndex }) => {
        const { field } = useField(index)
        return <input {...field} />
      }

      const schema = await parse(`
        form ExampleForm {
          num numberField
        }
      `)
      const formML = new FormML(schema)
      const index = formML.indexRoot['numberField']

      renderWithContext(<TestInput index={index} />, formML)

      const input = screen.getByRole('textbox')
      expect(input).toHaveDisplayValue('')

      // Act
      const user = userEvent.setup()
      await user.type(input, '123')

      // Assert
      expect(input).toHaveDisplayValue('123')
    })

    test('should update touched properly when user blurs', async () => {
      // Arrange
      const TestInput = ({ index }: { index: AnyIndex }) => {
        const { field, meta } = useField(index)
        return (
          <>
            <input {...field} />
            {meta.touched && <span>Touched!</span>}
          </>
        )
      }

      const schema = await parse(`
        form ExampleForm {
          num numberField
        }
      `)
      const formML = new FormML(schema)
      const index = formML.indexRoot['numberField']

      renderWithContext(<TestInput index={index} />, formML)

      const input = screen.getByRole('textbox')
      expect(screen.queryByText('Touched!')).not.toBeInTheDocument()

      // Act
      const user = userEvent.setup()
      await user.click(input)
      await user.tab()

      // Assert
      expect(input).not.toHaveFocus()
      expect(screen.getByText('Touched!')).toBeInTheDocument()
    })

    test('should update error properly when user blurs', async () => {
      // Arrange
      const TestInput = ({ index }: { index: AnyIndex }) => {
        const { field, meta } = useField(index)
        return (
          <>
            <input {...field} />
            {meta.error && (
              <span data-testid="error-message">{meta.error.message}</span>
            )}
          </>
        )
      }

      const schema = await parse(`
        form ExampleForm {
          @required
          num numberField
        }
      `)
      const formML = new FormML(schema)
      const index = formML.indexRoot['numberField']

      renderWithContext(<TestInput index={index} />, formML)

      const input = screen.getByRole('textbox')
      expect(screen.queryByTestId('error-message')).not.toBeInTheDocument()

      // Act
      const user = userEvent.setup()
      await user.click(input)
      await user.tab()

      // Assert
      expect(input).not.toHaveFocus()
      expect(screen.getByTestId('error-message')).toBeInTheDocument()
    })

    test('should update error properly when user types after initial validation', async () => {
      // Arrange
      const TestInput = ({ index }: { index: AnyIndex }) => {
        const { field, meta } = useField(index)
        return (
          <>
            <input {...field} />
            {meta.error && (
              <span data-testid="error-message">{meta.error.message}</span>
            )}
          </>
        )
      }

      const schema = await parse(`
        form ExampleForm {
          @required
          num numberField
        }
      `)
      const formML = new FormML(schema)
      const index = formML.indexRoot['numberField']

      renderWithContext(<TestInput index={index} />, formML)

      const input = screen.getByRole('textbox')
      expect(screen.queryByTestId('error-message')).not.toBeInTheDocument()

      // Act
      const user = userEvent.setup()
      await user.click(input)
      await user.tab()

      // Assert
      expect(screen.getByTestId('error-message')).toBeInTheDocument()

      // Act
      await user.type(input, '123')

      // Assert
      expect(input).toHaveFocus()
      expect(screen.queryByTestId('error-message')).not.toBeInTheDocument()
    })
  })

  describe('performance', () => {
    test('should subscribe only once', async () => {
      // Arrange
      const schema = await parse(`
        form ExampleForm {
          num numberField
        }
      `)
      const formML = new FormML(schema)
      const spiedSubscribe = vi.spyOn(formML, 'subscribe')
      const index = formML.indexRoot['numberField']

      // Act
      const { rerender } = renderHookWithContext(() => useField(index), formML)
      rerender()

      // Assert
      expect(spiedSubscribe).toBeCalledTimes(1)
    })

    test('should re-subscribe if index changes', async () => {
      // Arrange
      const schema = await parse(`
        form ExampleForm {
          num numberFieldA
          num numberFieldB
        }
      `)
      const formML = new FormML(schema)
      const spiedSubscribe = vi.spyOn(formML, 'subscribe')
      const indexA = formML.indexRoot['numberFieldA']
      const indexB = formML.indexRoot['numberFieldB']

      // Act
      const { rerender } = renderHookWithContext((i) => useField(i), formML, {
        initialProps: indexA,
      })
      rerender(indexB)

      // Assert
      expect(spiedSubscribe).toBeCalledTimes(2)
    })

    test('should return stable reference when re-rendering', async () => {
      // Arrange
      const schema = await parse(`
        form ExampleForm {
          num numberField
        }
      `)
      const formML = new FormML(schema)
      const index = formML.indexRoot['numberField']

      const { rerender, result } = renderHookWithContext(
        () => useField(index),
        formML,
      )
      const firstResult = result.current

      // Act
      rerender()

      // Assert
      expect(result.current).toBe(firstResult)
    })

    test('should return stable references when re-rendering multiple hooks', async () => {
      // Arrange
      const schema = await parse(`
        form ExampleForm {
          num numberFieldA
          num numberFieldB
        }
      `)
      const formML = new FormML(schema)
      const indexA = formML.indexRoot['numberFieldA']
      const indexB = formML.indexRoot['numberFieldB']

      const { rerender: rerenderA, result: resultA } = renderHookWithContext(
        () => useField(indexA),
        formML,
      )
      const firstResultA = resultA.current

      const { rerender: rerenderB, result: resultB } = renderHookWithContext(
        () => useField(indexB),
        formML,
      )
      const firstResultB = resultB.current

      // Act
      rerenderA()
      rerenderB()

      // Assert
      expect(resultA.current).toBe(firstResultA)
      expect(resultB.current).toBe(firstResultB)
    })
  })
})
