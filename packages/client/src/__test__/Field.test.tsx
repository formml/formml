import { render, screen } from '@testing-library/react'

import Field from '../Field.js'
import useFormML from '../useFormML.js'

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

    test.todo('explicit input')

    test.todo('should accept all valid input attributes', () => {})

    test.todo('ref')

    test.todo('change value')

    test.todo('submit value')
  })
})
