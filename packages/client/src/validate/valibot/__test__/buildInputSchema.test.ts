import { Field, Form } from '@formml/dsl'
import { SpecialSchema, StringSchema } from 'valibot'

import buildInputSchema from '../buildInputSchema.js'
import * as i from '../inputTransform.js'

vi.mock('../inputTransform.js')

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
      const dummyNumberSchema = {} as never
      vi.mocked(i.asNumber).mockReturnValue(dummyNumberSchema)

      // Act
      const schema = buildInputSchema(numberField)

      // Assert
      expect(schema).toBe(dummyNumberSchema)
    })

    test('should return custom datetime given a datetime field', () => {
      // Arrange
      const datetimeField: Field = {
        $container: {} as Form,
        $type: 'Field',
        annotations: [],
        name: 'datetimeField',
        type: 'datetime',
      }
      const dummyDatetimeSchema = {} as SpecialSchema<string>
      vi.mocked(i.asDatetime).mockReturnValue(dummyDatetimeSchema)

      // Act
      const schema = buildInputSchema(datetimeField)

      // Assert
      expect(schema).toBe(dummyDatetimeSchema)
    })

    test('should return custom bool given a bool field', () => {
      // Arrange
      const boolField: Field = {
        $container: {} as Form,
        $type: 'Field',
        annotations: [],
        name: 'boolField',
        type: 'bool',
      }
      const dummyBoolSchema = {} as StringSchema
      vi.mocked(i.asBool).mockReturnValue(dummyBoolSchema)

      // Act
      const schema = buildInputSchema(boolField)

      // Assert
      expect(schema).toBe(dummyBoolSchema)
    })

    test('should return custom decimal given a decimal field', () => {
      // Arrange
      const decimalField: Field = {
        $container: {} as Form,
        $type: 'Field',
        annotations: [],
        name: 'decimalField',
        type: 'decimal',
      }
      const dummyDecimalSchema = {} as SpecialSchema<string>
      vi.mocked(i.asDecimal).mockReturnValue(dummyDecimalSchema)

      // Act
      const schema = buildInputSchema(decimalField)

      // Assert
      expect(schema).toBe(dummyDecimalSchema)
    })
  })
})
