import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import dayjs from 'dayjs'
import { useEffect, useRef } from 'react'

import { Field } from '../Field.js'
import { useFormML } from '../useFormML.js'

describe('Field', () => {
  describe('as input', () => {
    test('should render as an input element by default', () => {
      // Arrange
      const schema = `
        form ExampleForm {
          Text textField
        }
      `
      const Form = () => {
        const { FormML, indexRoot } = useFormML(schema)
        return (
          <FormML>
            <Field index={indexRoot['textField']} />
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

    test('should render input element if given explicit target', () => {
      // Arrange
      const schema = `
        form ExampleForm {
          Text textField
        }
      `
      const Form = () => {
        const { FormML, indexRoot } = useFormML(schema)
        return (
          <FormML>
            <Field as="input" index={indexRoot['textField']} />
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

    test('should accept all valid input attributes', () => {
      // Arrange
      const schema = `
        form ExampleForm {
          Text textField
        }
      `
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
        const { FormML, indexRoot } = useFormML(schema)
        return (
          <FormML>
            <Field
              aria-label={extraAttrs['aria-label']}
              as="input"
              data-testid={extraAttrs['data-testid']}
              id={extraAttrs['id']}
              index={indexRoot['textField']}
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
      const schema = `
        form ExampleForm {
          Text textField
        }
      `
      const mockOnChange = vi.fn()
      const mockOnBlur = vi.fn()

      const Form = () => {
        const { FormML, indexRoot } = useFormML(schema)
        return (
          <FormML>
            <Field
              as="input"
              index={indexRoot['textField']}
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

    test('should forward ref to underlying input', () => {
      // Arrange
      const schema = `
        form ExampleForm {
          Text textField
        }
      `
      let actualRef: HTMLInputElement | null = null

      const Form = () => {
        const { FormML, indexRoot } = useFormML(schema)
        const ref = useRef<HTMLInputElement>(null)
        useEffect(() => {
          actualRef = ref.current
        }, [])
        return (
          <FormML>
            <Field as="input" index={indexRoot['textField']} ref={ref} />
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
      const schema = `
        form ExampleForm {
          Text textField
        }
      `

      const Form = () => {
        const { FormML, indexRoot } = useFormML(schema)
        return (
          <FormML>
            <Field as="input" index={indexRoot['textField']} />
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
      describe('Number', () => {
        test('should render a number input if field type is number', () => {
          // Arrange
          const schema = `
            form ExampleForm {
              Number numberField
            }
          `
          const Form = () => {
            const { FormML, indexRoot } = useFormML(schema)
            return (
              <FormML>
                <Field as="input" index={indexRoot['numberField']} />
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

      describe('Currency', () => {
        test('should render a number input if field type is currency', () => {
          // Arrange
          const schema = `
            form ExampleForm {
              Currency currencyField
            }
          `
          const Form = () => {
            const { FormML, indexRoot } = useFormML(schema)
            return (
              <FormML>
                <Field as="input" index={indexRoot['currencyField']} />
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

      describe('Boolean', () => {
        test('should render a checkbox input if field type is boolean', () => {
          // Arrange
          const schema = `
            form ExampleForm {
              Boolean booleanField
            }
          `
          const Form = () => {
            const { FormML, indexRoot } = useFormML(schema)
            return (
              <FormML>
                <Field as="input" index={indexRoot['booleanField']} />
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
          const schema = `
            form ExampleForm {
              Boolean booleanField
            }
          `
          const mockOnSubmit = vi.fn()
          const Form = () => {
            const { FormML, handleSubmit, indexRoot } = useFormML(schema)
            return (
              <form onSubmit={handleSubmit(mockOnSubmit)}>
                <FormML>
                  <Field as="input" index={indexRoot['booleanField']} />
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
          expect(mockOnSubmit).toBeCalledWith({ booleanField: true })
        })

        test('should have no value attribute by default', async () => {
          // Arrange
          const schema = `
            form ExampleForm {
              Boolean booleanField
            }
          `
          const Form = () => {
            const { FormML, indexRoot } = useFormML(schema)
            return (
              <FormML>
                <Field as="input" index={indexRoot['booleanField']} />
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

      describe('DateTime', () => {
        test('should render a datetime-local input if field type is datetime', () => {
          // Arrange
          const schema = `
            form ExampleForm {
              DateTime datetimeField
            }
          `
          const Form = () => {
            const { FormML, indexRoot } = useFormML(schema)
            return (
              <FormML>
                <label>
                  Pick time
                  <Field as="input" index={indexRoot['datetimeField']} />
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
            const schema = `
              form ExampleForm {
                DateTime datetimeField
              }
            `
            const Form = () => {
              const { FormML, indexRoot, instance } = useFormML(schema)
              return (
                <FormML>
                  <label>
                    Pick time
                    <Field as="input" index={indexRoot['datetimeField']} />
                  </label>
                  <button
                    onClick={() =>
                      instance.setTypedValue(indexRoot['datetimeField'], time)
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
    test('should render as textarea', () => {
      // Arrange
      const schema = `
        form ExampleForm {
          Text textField
        }
      `
      const Form = () => {
        const { FormML, indexRoot } = useFormML(schema)
        return (
          <FormML>
            <Field as="textarea" index={indexRoot['textField']} />
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
