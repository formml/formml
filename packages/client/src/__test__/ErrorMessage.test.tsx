import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'

import ErrorMessage from '../ErrorMessage.js'
import { Field } from '../Field.js'
import { useField } from '../useField.js'
import { useFormML } from '../useFormML.js'

describe('ErrorMessage', () => {
  describe('behavior', () => {
    test('should render error message if given field has error', async () => {
      // Arrange
      const schema = `
        form ExampleForm {
          @required
          text textField
        }
      `
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
      await user.type(input, '{A}{Backspace}')

      // Assert
      const span = screen.getByTestId('error-message')
      expect(span).toHaveTextContent(/\S+/) // should not be blank
    })

    test('should not render error message if given field has no error', async () => {
      // Arrange
      const schema = `
        form ExampleForm {
          @required
          text textField
        }
      `
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
      const schema = `
        form ExampleForm {
          @required
          num numberField
        }
      `
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

      // Assert
      const span = screen.getByTestId('error-message')
      expect(span.textContent).toMatchInlineSnapshot(
        `"Invalid input: Received "not a valid number""`,
      )

      // Act
      await user.clear(input)

      // Assert
      expect(span.textContent).toMatchInlineSnapshot(
        `"Invalid type: Expected number but received undefined"`,
      )
    })
  })
})
