import { Field, Form } from '@formml/dsl'
import { SpecialSchema, StringSchema } from 'valibot'

import buildInputSchema from '../buildInputSchema.js'
import buildSchema from '../buildSchema.js'
import * as i from '../inputTransform.js'

vi.mock('../inputTransform.js')
vi.mock('../buildSchema.js')

describe('buildInputSchema', () => {
  describe('types', () => {
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
      vi.mocked(i.toNumber).mockReturnValue(dummyNumberSchema)

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
      vi.mocked(i.toDatetime).mockReturnValue(dummyDatetimeSchema)

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
      vi.mocked(i.toBool).mockReturnValue(dummyBoolSchema)

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
      vi.mocked(i.toDecimal).mockReturnValue(dummyDecimalSchema)

      // Act
      const schema = buildInputSchema(decimalField)

      // Assert
      expect(schema).toBe(dummyDecimalSchema)
    })
  })

  describe('text', () => {
    test('should return built valibot schema directly', () => {
      // Arrange
      const textField: Field = {
        $container: {} as Form,
        $type: 'Field',
        annotations: [],
        name: 'textField',
        type: 'text',
      }
      const dummySchema = {} as never
      vi.mocked(buildSchema).mockReturnValue(dummySchema)

      // Act
      const schema = buildInputSchema(textField)

      // Assert
      expect(buildSchema).toBeCalledWith(textField)
      expect(schema).toBe(dummySchema)
    })
  })
})
