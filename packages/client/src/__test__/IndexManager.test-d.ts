import type { FormMLAstType, FormMLSchema, generics } from '@formml/dsl'

import type {
  BaseIndex,
  BoolIndex,
  DatetimeIndex,
  DecimalIndex,
  GenericIndex,
  NumIndex,
  TextIndex,
} from '../IndexManager.js'

import IndexManager from '../IndexManager.js'

describe('IndexManager', () => {
  describe('indexes', () => {
    test('should contain uncertain children given a generic schema', () => {
      // Arrange
      const schema = {} as FormMLSchema

      // Act
      const indexManager = new IndexManager(schema)

      // Assert
      expectTypeOf(indexManager.root).toMatchTypeOf<
        Record<string, GenericIndex>
      >()
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

    test('should contain additional properties in GenericIndex', () => {
      // Assert
      expectTypeOf<GenericIndex>()
        .toHaveProperty('additional')
        .toEqualTypeOf<GenericIndex>()
    })

    test('should be able to assign any index to BaseIndex', () => {
      // Arrange
      const text = {} as TextIndex

      // Act & Assert
      expectTypeOf(text).toMatchTypeOf<BaseIndex>()
    })
  })

  describe('store', () => {
    test('should get schema with union type', () => {
      // Arrange
      const schema: FormMLSchema = {} as FormMLSchema

      // Act
      const indexManager = new IndexManager(schema)

      // Assert
      expectTypeOf(
        indexManager.for(indexManager.root).get('schema'),
      ).toEqualTypeOf<FormMLAstType[keyof FormMLAstType]>()
    })
  })
})
