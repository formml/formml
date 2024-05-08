import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'

import ErrorMessage from '../ErrorMessage.js'
import { Field } from '../Field.js'
import { useFormML } from '../useFormML.js'

describe('ErrorMessage', () => {
  describe('behavior', () => {
    test('should render error message given a field index', async () => {
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
      expect(span).toBeInTheDocument()
      expect(span).toHaveTextContent(/\S+/) // should not be blank
    })
  })
})
