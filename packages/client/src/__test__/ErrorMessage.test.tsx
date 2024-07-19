import { createFormMLParser } from '@formml/dsl'
import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import React from 'react'

import ErrorMessage from '../ErrorMessage.js'
import { Field } from '../Field.js'
import { useField } from '../useField.js'
import { useFormML } from '../useFormML.js'

describe('ErrorMessage', () => {
  const parse = createFormMLParser()

  describe('behavior', () => {
    test('should render error message if given field has error', async () => {
      // Arrange
      const schema = await parse(`
        form ExampleForm {
          @required
          text textField
        }
      `)
      const Form = () => {
        const { $form, FormML } = useFormML(schema)
        return (
          <FormML>
            <Field $bind={$form['textField']} />
            <span data-testid="error-message">
              <ErrorMessage $bind={$form['textField']} />
            </span>
          </FormML>
        )
      }

      // Act
      render(<Form />)
      const input = screen.getByRole('textbox')
      const user = userEvent.setup()
      await user.click(input)
      await user.tab()

      // Assert
      const span = screen.getByTestId('error-message')
      expect(span).toHaveTextContent(/\S+/) // should not be blank
    })

    test('should not render error message if given field has no error', async () => {
      // Arrange
      const schema = await parse(`
        form ExampleForm {
          @required
          text textField
        }
      `)
      const Form = () => {
        const { $form, FormML } = useFormML(schema)
        return (
          <FormML>
            <Field $bind={$form['textField']} />
            <span data-testid="error-message">
              <ErrorMessage $bind={$form['textField']} />
            </span>
          </FormML>
        )
      }

      // Act
      render(<Form />)
      const input = screen.getByRole('textbox')
      const user = userEvent.setup()
      await user.type(input, 'valid input')

      // Assert
      const span = screen.getByTestId('error-message')
      expect(span).toHaveTextContent('')
    })

    test('should update error message when field error changes', async () => {
      // Arrange
      const schema = await parse(`
        form ExampleForm {
          @required
          num numberField
        }
      `)
      const SimpleInput = ({ $bind }: { $bind: object }) => {
        const { field } = useField($bind)
        return <input {...field} />
      }

      const Form = () => {
        const { $form, FormML } = useFormML(schema)
        return (
          <FormML>
            <SimpleInput $bind={$form['numberField']} />
            <span data-testid="error-message">
              <ErrorMessage $bind={$form['numberField']} />
            </span>
          </FormML>
        )
      }

      // Act
      render(<Form />)
      const input = screen.getByRole('textbox')
      const user = userEvent.setup()
      await user.type(input, 'not a valid number')
      await user.tab()

      // Assert
      const span = screen.getByTestId('error-message')
      expect(span.textContent).toMatchInlineSnapshot(
        `"Invalid input: Expected numerical but received "not a valid number""`,
      )

      // Act
      await user.clear(input)

      // Assert
      expect(span.textContent).toMatchInlineSnapshot(
        `"Invalid input: Field is required"`,
      )
    })
  })

  describe('appearance', () => {
    test.each([{}, { as: 'div' }])(
      'should render nothing if no error',
      async (props) => {
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
              <div data-testid="error-message">
                <ErrorMessage $bind={$form['textField']} {...props} />
              </div>
            </FormML>
          )
        }

        // Act
        render(<Form />)

        // Assert
        const div = screen.getByTestId('error-message')
        expect(div).toBeEmptyDOMElement()
      },
    )

    test('should render as string by default', async () => {
      // Arrange
      const schema = await parse(`
        form ExampleForm {
          @required
          text textField
        }
      `)
      const Form = () => {
        const { $form, FormML } = useFormML(schema)
        return (
          <FormML>
            <Field $bind={$form['textField']} />
            <div data-testid="error-message">
              <ErrorMessage $bind={$form['textField']} />
            </div>
          </FormML>
        )
      }

      // Act
      render(<Form />)
      const input = screen.getByRole('textbox')
      const user = userEvent.setup()
      await user.click(input)
      await user.tab()

      // Assert
      const div = screen.getByTestId('error-message')
      expect(div.firstChild?.nodeType).toBe(Node.TEXT_NODE)
    })

    describe('as HTML element', () => {
      test.each(['div', 'p', 'h1', 'span'] as const)(
        'should render as HTML element (%s) if specified',
        async (tagName) => {
          // Arrange
          const schema = await parse(`
            form ExampleForm {
              @required
              text textField
            }
          `)
          const Form = () => {
            const { $form, FormML } = useFormML(schema)
            return (
              <FormML>
                <Field $bind={$form['textField']} />
                <div data-testid="error-message">
                  <ErrorMessage $bind={$form['textField']} as={tagName} />
                </div>
              </FormML>
            )
          }

          // Act
          render(<Form />)
          const input = screen.getByRole('textbox')
          const user = userEvent.setup()
          await user.click(input)
          await user.tab()

          // Assert
          const div = screen.getByTestId('error-message')
          expect(div.firstChild?.nodeName).toBe(tagName.toUpperCase())
          expect(div.firstChild?.textContent).toMatch(/\S+/)
        },
      )

      describe('should accept html attributes', () => {
        test('label', async () => {
          // Arrange
          const schema = await parse(`
            form ExampleForm {
              @required
              text textField
            }
          `)
          const Form = () => {
            const { $form, FormML } = useFormML(schema)
            return (
              <FormML>
                <Field $bind={$form['textField']} />
                <ErrorMessage
                  $bind={$form['textField']}
                  as="label"
                  data-testid="error-message"
                  htmlFor="some-id"
                />
              </FormML>
            )
          }

          // Act
          render(<Form />)
          const input = screen.getByRole('textbox')
          const user = userEvent.setup()
          await user.click(input)
          await user.tab()

          // Assert
          const element = screen.getByTestId('error-message')
          expect(element).toHaveAttribute('for', 'some-id')
        })

        test('li', async () => {
          // Arrange
          const schema = await parse(`
            form ExampleForm {
              @required
              text textField
            }
          `)
          const Form = () => {
            const { $form, FormML } = useFormML(schema)
            return (
              <FormML>
                <Field $bind={$form['textField']} />
                <ErrorMessage
                  $bind={$form['textField']}
                  as="li"
                  data-testid="error-message"
                  value="3"
                />
              </FormML>
            )
          }

          // Act
          render(<Form />)
          const input = screen.getByRole('textbox')
          const user = userEvent.setup()
          await user.click(input)
          await user.tab()

          // Assert
          const element = screen.getByTestId('error-message')
          expect(element).toHaveAttribute('value', '3')
        })
      })

      test('should accept ref', async () => {
        // Arrange
        const schema = await parse(`
          form ExampleForm {
            @required
            text textField
          }
        `)
        const ref = React.createRef<HTMLDivElement>()
        const Form = () => {
          const { $form, FormML } = useFormML(schema)
          return (
            <FormML>
              <Field $bind={$form['textField']} />
              <ErrorMessage
                $bind={$form['textField']}
                as="div"
                data-testid="error-message"
                ref={ref}
              />
            </FormML>
          )
        }

        // Act
        render(<Form />)
        const input = screen.getByRole('textbox')
        const user = userEvent.setup()
        await user.click(input)
        await user.tab()

        // Assert
        const element = screen.getByTestId('error-message')
        expect(ref.current).toBe(element)
      })
    })

    test.todo('as custom component')

    test.todo('as render function')
  })
})
