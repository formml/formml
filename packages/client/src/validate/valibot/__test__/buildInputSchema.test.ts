import { Field, Form } from '@formml/dsl'
import { SpecialSchema } from 'valibot'

import buildInputSchema from '../buildInputSchema.js'
import * as i from '../inputSchemas.js'

vi.mock('../inputSchemas.js')

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

    test('should return custom number given a number field', () => {
      // Arrange
      const numberField: Field = {
        $container: {} as Form,
        $type: 'Field',
        annotations: [],
        name: 'numberField',
        type: 'num',
      }
      const dummyNumberSchema = {} as SpecialSchema<string>
      vi.mocked(i.number).mockReturnValue(dummyNumberSchema)

      // Act
      const schema = buildInputSchema(numberField)

      // Assert
      expect(schema).toBe(dummyNumberSchema)
    })
  })
})
