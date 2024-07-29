import { FormMLSchema, generics } from '@formml/dsl'

import { FormML } from '../FormML.js'
import {
  AnyIndex,
  BoolIndex,
  DatetimeIndex,
  DecimalIndex,
  NumIndex,
  TextIndex,
} from '../IndexManager.js'

describe('FormML', () => {
  describe('indexes', () => {
    test('should contain uncertain children given a generic schema', () => {
      // Arrange
      const schema = {} as FormMLSchema

      // Act
      const formML = new FormML(schema)

      // Assert
      expectTypeOf(formML.indexRoot).toMatchTypeOf<Record<string, AnyIndex>>()
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
      const formML = new FormML(schema)

      // Assert
      expectTypeOf(formML.indexRoot).toMatchTypeOf<{
        boolField: BoolIndex
        datetimeField: DatetimeIndex
        decimalField: DecimalIndex
        numField: NumIndex
        textField: TextIndex
      }>()
    })
  })
})
