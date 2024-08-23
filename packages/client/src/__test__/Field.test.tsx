import type { FormEvent } from 'react'

import { createFormMLParser } from '@formml/dsl'
import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import dayjs from 'dayjs'
import { useEffect, useRef } from 'react'

import { Field } from '../Field.js'
import { useFormML } from '../useFormML.js'

describe('Field', () => {
  const parse = createFormMLParser()

  describe('as input', () => {
    test('should render as an input element by default', async () => {
      // Arrange
      const schema = await parse(`
        form ExampleForm {
          text textField
        }
      `)
      const Form = () => {
        const { $form, FormML } = useFormML(schema)
        return (
          <FormML>
            <Field $bind={$form['textField']} />
          </FormML>
        )
      }

      // Act
      render(<Form />)

      // Assert
      const input = screen.getByRole('textbox')
      expect(input).toBeInTheDocument()
      expect(input.tagName).toEqual('INPUT')
      expect(input).toHaveAttribute('name', 'textField')
      expect(input).toHaveValue('')
    })

    test('should render input element if given explicit target', async () => {
      // Arrange
      const schema = await parse(`
        form ExampleForm {
          text textField
        }
      `)
      const Form = () => {
        const { $form, FormML } = useFormML(schema)
        return (
          <FormML>
            <Field $bind={$form['textField']} as="input" />
          </FormML>
        )
      }

      // Act
      render(<Form />)

      // Assert
      const input = screen.getByRole('textbox')
      expect(input).toBeInTheDocument()
      expect(input.tagName).toEqual('INPUT')
      expect(input).toHaveAttribute('name', 'textField')
      expect(input).toHaveValue('')
    })

    test('should accept all valid input attributes', async () => {
      // Arrange
      const schema = await parse(`
        form ExampleForm {
          text textField
        }
      `)
      const extraAttrs = {
        'aria-label': 'abc',
        'data-testid': 'abc',
        id: 'abc',
        placeholder: 'abc',
        title: 'abc',
        type: 'email',

        // Part: react key prop
        key: 'abc',
      }
      const Form = () => {
        const { $form, FormML } = useFormML(schema)
        return (
          <FormML>
            <Field
              $bind={$form['textField']}
              aria-label={extraAttrs['aria-label']}
              as="input"
              data-testid={extraAttrs['data-testid']}
              id={extraAttrs['id']}
              key={extraAttrs['key']}
              placeholder={extraAttrs['placeholder']}
              title={extraAttrs['title']}
              type={extraAttrs['type']}
            />
          </FormML>
        )
      }

      // Act
      render(<Form />)

      // Assert
      const input = screen.getByRole('textbox')
      expect(input).toBeInTheDocument()
      Object.entries(extraAttrs)
        .filter(([key]) => key !== 'key') // won't pass it down
        .forEach(([key, value]) => expect(input).toHaveAttribute(key, value))
    })

    test('should allow to override injected attributes', async () => {
      // Arrange
      const schema = await parse(`
        form ExampleForm {
          text textField
        }
      `)
      const mockOnChange = vi.fn()
      const mockOnBlur = vi.fn()

      const Form = () => {
        const { $form, FormML } = useFormML(schema)
        return (
          <FormML>
            <Field
              $bind={$form['textField']}
              as="input"
              name="overridden name"
              onBlur={mockOnBlur}
              onChange={mockOnChange}
              value="overridden"
            />
          </FormML>
        )
      }

      // Act
      render(<Form />)
      const input = screen.getByRole('textbox')
      const user = userEvent.setup()
      await user.type(input, 'something')
      await user.tab()

      // Assert
      expect(input).toBeInTheDocument()

      expect(input).toHaveValue('overridden')
      expect(input).toHaveAttribute('name', 'overridden name')
      expect(mockOnChange).toBeCalled()
      expect(mockOnBlur).toBeCalled()
    })

    test('should forward ref to underlying input', async () => {
      // Arrange
      const schema = await parse(`
        form ExampleForm {
          text textField
        }
      `)
      let actualRef: HTMLInputElement | null = null

      const Form = () => {
        const { $form, FormML } = useFormML(schema)
        const ref = useRef<HTMLInputElement>(null)
        useEffect(() => {
          actualRef = ref.current
        }, [])
        return (
          <FormML>
            <Field $bind={$form['textField']} as="input" ref={ref} />
          </FormML>
        )
      }

      // Act
      render(<Form />)

      // Assert
      const input = screen.getByRole('textbox')
      expect(input).toBeInTheDocument()
      expect(actualRef).toBe(input)
    })

    test('should show latest value when user inputs', async () => {
      // Arrange
      const schema = await parse(`
        form ExampleForm {
          text textField
        }
      `)

      const Form = () => {
        const { $form, FormML } = useFormML(schema)
        return (
          <FormML>
            <Field $bind={$form['textField']} as="input" />
          </FormML>
        )
      }

      // Act
      render(<Form />)
      const input = screen.getByRole('textbox')
      const user = userEvent.setup()
      await user.type(input, 'abc')

      // Assert
      expect(input).toBeInTheDocument()
      expect(input).toHaveDisplayValue('abc')
    })

    describe('heuristic default behaviors', () => {
      describe('num', () => {
        test('should render a number input if field type is number', async () => {
          // Arrange
          const schema = await parse(`
            form ExampleForm {
              num numberField
            }
          `)
          const Form = () => {
            const { $form, FormML } = useFormML(schema)
            return (
              <FormML>
                <Field $bind={$form['numberField']} as="input" />
              </FormML>
            )
          }

          // Act
          render(<Form />)

          // Assert
          const input = screen.getByRole('spinbutton')
          expect(input).toBeInTheDocument()
          expect(input).toHaveAttribute('type', 'number')
        })
      })

      describe('decimal', () => {
        test('should render a number input if field type is decimal', async () => {
          // Arrange
          const schema = await parse(`
            form ExampleForm {
              decimal decimalField
            }
          `)
          const Form = () => {
            const { $form, FormML } = useFormML(schema)
            return (
              <FormML>
                <Field $bind={$form['decimalField']} as="input" />
              </FormML>
            )
          }

          // Act
          render(<Form />)

          // Assert
          const input = screen.getByRole('spinbutton')
          expect(input).toBeInTheDocument()
          expect(input).toHaveAttribute('type', 'number')
        })
      })

      describe('bool', () => {
        test('should render a checkbox input if field type is bool', async () => {
          // Arrange
          const schema = await parse(`
            form ExampleForm {
              bool boolField
            }
          `)
          const Form = () => {
            const { $form, FormML } = useFormML(schema)
            return (
              <FormML>
                <Field $bind={$form['boolField']} as="input" />
              </FormML>
            )
          }

          // Act
          render(<Form />)

          // Assert
          const checkbox = screen.getByRole('checkbox')
          expect(checkbox).toBeInTheDocument()
          expect(checkbox.tagName).toEqual('INPUT')
          expect(checkbox).toHaveAttribute('type', 'checkbox')
        })

        test('should update checked status and form by user action', async () => {
          // Arrange
          const schema = await parse(`
            form ExampleForm {
              bool boolField
            }
          `)
          const mockOnSubmit = vi.fn((_, event: FormEvent<HTMLFormElement>) => {
            event.preventDefault()
          })
          const Form = () => {
            const { $form, FormML, handleSubmit } = useFormML(schema)
            return (
              <form onSubmit={handleSubmit(mockOnSubmit)}>
                <FormML>
                  <Field $bind={$form['boolField']} as="input" />
                </FormML>
                <button>Submit</button>
              </form>
            )
          }

          // Act
          render(<Form />)
          const checkbox = screen.getByRole('checkbox')
          expect(checkbox).not.toBeChecked()

          const user = userEvent.setup()
          await user.click(checkbox)

          const button = screen.getByRole('button')
          await user.click(button)

          // Assert
          expect(checkbox).toBeChecked()
          expect(mockOnSubmit).toBeCalledWith(
            { boolField: true },
            expect.anything(), // submit event
          )
        })

        test('should have no value attribute by default', async () => {
          // Arrange
          const schema = await parse(`
            form ExampleForm {
              bool boolField
            }
          `)
          const Form = () => {
            const { $form, FormML } = useFormML(schema)
            return (
              <FormML>
                <Field $bind={$form['boolField']} as="input" />
              </FormML>
            )
          }

          // Act
          render(<Form />)
          const checkbox = screen.getByRole('checkbox')
          expect(checkbox).not.toHaveAttribute('value')

          const user = userEvent.setup()
          await user.click(checkbox)

          // Assert
          expect(checkbox).toBeChecked()
          expect(checkbox).not.toHaveAttribute('value')
        })
      })

      describe('datetime', () => {
        test('should render a datetime-local input if field type is datetime', async () => {
          // Arrange
          const schema = await parse(`
            form ExampleForm {
              datetime datetimeField
            }
          `)
          const Form = () => {
            const { $form, FormML } = useFormML(schema)
            return (
              <FormML>
                <label>
                  Pick time
                  <Field $bind={$form['datetimeField']} as="input" />
                </label>
              </FormML>
            )
          }

          // Act
          render(<Form />)

          // Assert
          const input = screen.getByLabelText('Pick time')
          expect(input).toBeInTheDocument()
          expect(input).toHaveAttribute('type', 'datetime-local')
        })

        test.each([
          {
            expectedValue: '2024-01-01T00:00',
            time: dayjs('2024-01-01T00:00:00.000').toDate(),
          },
          {
            expectedValue: '',
            time: undefined,
          },
        ])(
          'should format value given to input',
          async ({ expectedValue, time }) => {
            // Arrange
            const schema = await parse(`
              form ExampleForm {
                datetime datetimeField
              }
            `)
            const Form = () => {
              const { $form, FormML, instance } = useFormML(schema)
              return (
                <FormML>
                  <label>
                    Pick time
                    <Field $bind={$form['datetimeField']} as="input" />
                  </label>
                  <button
                    onClick={() =>
                      instance.setTypedValue($form['datetimeField'], time)
                    }
                  >
                    Reset time
                  </button>
                </FormML>
              )
            }

            // Act
            render(<Form />)

            const button = screen.getByRole('button')
            const user = userEvent.setup()
            await user.click(button)

            // Assert
            const input = screen.getByLabelText<HTMLInputElement>('Pick time')
            expect(input).toBeInTheDocument()
            expect(input).toHaveValue(expectedValue)
            expect(input.defaultValue).toEqual(expectedValue)
          },
        )
      })
    })
  })

  describe('as textarea', () => {
    test('should render as textarea', async () => {
      // Arrange
      const schema = await parse(`
        form ExampleForm {
          text textField
        }
      `)
      const Form = () => {
        const { $form, FormML } = useFormML(schema)
        return (
          <FormML>
            <Field $bind={$form['textField']} as="textarea" />
          </FormML>
        )
      }

      // Act
      render(<Form />)

      // Assert
      const input = screen.getByRole('textbox')
      expect(input).toBeInTheDocument()
      expect(input.tagName).toEqual('TEXTAREA')
      expect(input).toHaveAttribute('name', 'textField')
      expect(input).toHaveValue('')
    })
  })
})
