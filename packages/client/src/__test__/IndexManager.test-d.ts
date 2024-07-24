import { FormMLSchema, generics } from '@formml/dsl'

import IndexManager, {
  AnyIndex,
  BoolIndex,
  DatetimeIndex,
  DecimalIndex,
  NumIndex,
  TextIndex,
} from '../IndexManager.js'

describe('IndexManager', () => {
  describe('indexes', () => {
    test('should contain uncertain children given a generic schema', () => {
      // Arrange
      const schema: FormMLSchema = {} as FormMLSchema

      // Act
      const indexManager = new IndexManager(schema)

      // Assert
      expectTypeOf(indexManager.root).toMatchTypeOf<Record<string, AnyIndex>>()
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
      const indexManager = new IndexManager(schema)

      // Assert
      expectTypeOf(indexManager.root).toMatchTypeOf<{
        boolField: BoolIndex
        datetimeField: DatetimeIndex
        decimalField: DecimalIndex
        numField: NumIndex
        textField: TextIndex
      }>()
    })
  })
})
