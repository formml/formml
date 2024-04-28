import { Field, Form } from '@formml/dsl'

import buildInputSchema from '../buildInputSchema.js'

describe('buildInputSchema', () => {
  describe('types', () => {
    test('should return native string given a text field', () => {
      // Arrange
      const textField: Field = {
        $container: {} as Form,
        $type: 'Field',
        annotations: [],
        name: 'textField',
        type: 'text',
      }

      // Act
      const schema = buildInputSchema(textField)

      // Assert
      expect(schema.type).toBe('string')
    })
  })
})
