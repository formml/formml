import type { FormMLSchema, generics } from '@formml/dsl'
import type { BigNumber } from 'bignumber.js'

import type { PrimitiveType } from '../../js-type/types.js'
import type { SafeParseResult } from '../parsers.js'

import { parse, safeParse } from '../parsers.js'

describe('parsers', () => {
  describe('parse', () => {
    test('should return record given a generic schema', () => {
      // Arrange
      const schema = {} as FormMLSchema

      // Act
      const result = parse({}, schema)

      // Assert
      expectTypeOf(result).toEqualTypeOf<Record<string, PrimitiveType>>()
    })

    test('should return parsed data type given a concrete schema', () => {
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
      const result = parse({}, schema)

      // Assert
      expectTypeOf(result).toEqualTypeOf<{
        boolField: boolean
        datetimeField: Date | undefined
        decimalField: BigNumber | undefined
        numField: number | undefined
        textField: string
      }>()
    })
  })

  describe('safeParse', () => {
    test('should contain record as output given a generic schema', () => {
      // Arrange
      const schema = {} as FormMLSchema

      // Act
      const result = safeParse({}, schema)

      // Assert
      expectTypeOf(result).toEqualTypeOf<
        SafeParseResult<Record<string, PrimitiveType>>
      >()
    })

    test('should contain parsed data type given a concrete schema', () => {
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
      const result = safeParse({}, schema)

      // Assert
      expectTypeOf(result).toEqualTypeOf<
        SafeParseResult<{
          boolField: boolean
          datetimeField: Date | undefined
          decimalField: BigNumber | undefined
          numField: number | undefined
          textField: string
        }>
      >()
    })
  })
})
