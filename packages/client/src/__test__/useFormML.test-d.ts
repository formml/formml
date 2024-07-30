import { FormMLSchema, generics } from '@formml/dsl'

import {
  BoolIndex,
  DatetimeIndex,
  DecimalIndex,
  GenericIndex,
  NumIndex,
  TextIndex,
} from '../IndexManager.js'
import { useFormML } from '../useFormML.js'

describe('useFormML', () => {
  describe('indexes', () => {
    test('should contain uncertain children given a generic schema', () => {
      // Arrange
      const schema = {} as FormMLSchema

      // Act
      const { $form } = useFormML(schema)

      // Assert
      expectTypeOf($form).toMatchTypeOf<Record<string, GenericIndex>>()
    })

    test('should contain children indexes given a concrete schema', () => {
      // Arrange
      const schema = {} as generics.FormMLSchema<
        generics.Form<
          'testForm',
          [
            generics.Field<'textField', 'text'>,
            generics.Field<'numField', 'num'>,
            generics.Field<'boolField', 'bool'>,
            generics.Field<'datetimeField', 'datetime'>,
            generics.Field<'decimalField', 'decimal'>,
          ]
        >
      >

      // Act
      const { $form } = useFormML(schema)

      // Assert
      expectTypeOf($form).toMatchTypeOf<{
        boolField: BoolIndex
        datetimeField: DatetimeIndex
        decimalField: DecimalIndex
        numField: NumIndex
        textField: TextIndex
      }>()
    })
  })
})
