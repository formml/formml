import { TypeRefExpr } from '../../generated/ast.js'
import {
  Any,
  Bool,
  Datetime,
  Decimal,
  Num,
  Text,
  Unknown,
  createBoolLiteral,
  createNumLiteral,
  createTextLiteral,
  evaluate,
  inferType,
} from '../types.js'

describe('types', () => {
  describe('inferType', () => {
    test.each([
      [
        {
          $container: {} as never,
          $type: 'TextLiteral' as const,
          value: 'hello',
        },
        createTextLiteral('hello'),
      ],
      [
        {
          $container: {} as never,
          $type: 'NumLiteral' as const,
          value: 123,
        },
        createNumLiteral(123),
      ],
      [
        {
          $container: {} as never,
          $type: 'BoolLiteral' as const,
          value: false,
        },
        createBoolLiteral(false),
      ],
      [
        {
          $container: {} as never,
          $type: 'BoolLiteral' as const,
          value: true,
        },
        createBoolLiteral(true),
      ],

      [
        {
          $container: {} as never,
          $type: 'NullLiteral' as const,
        },
        Unknown,
      ],
    ])(
      'should infer literal types given a literal value',
      (input, expected) => {
        expect(inferType(input)).toEqual(expected)
      },
    )
  })

  describe('evaluate', () => {
    test('should return any if expression is undefined', () => {
      expect(evaluate(undefined)).toBe(Any)
    })

    test.each([
      [
        {
          $container: {} as never,
          $type: 'AnyTypeExpr',
          name: 'any',
        } as const,
        Any,
      ],
      [
        {
          $container: {} as never,
          $type: 'TextTypeExpr',
          name: 'text',
        } as const,
        Text,
      ],
      [
        {
          $container: {} as never,
          $type: 'NumTypeExpr',
          name: 'num',
        } as const,
        Num,
      ],
      [
        {
          $container: {} as never,
          $type: 'BoolTypeExpr',
          name: 'bool',
        } as const,
        Bool,
      ],
      [
        {
          $container: {} as never,
          $type: 'DatetimeTypeExpr',
          name: 'datetime',
        } as const,
        Datetime,
      ],
      [
        {
          $container: {} as never,
          $type: 'DecimalTypeExpr',
          name: 'decimal',
        } as const,
        Decimal,
      ],
    ])(
      'should return type constants for language built-in types',
      (input, expected) => {
        expect(evaluate(input)).toBe(expected)
      },
    )

    test('should evaluate type ref to actual type - simple case', () => {
      const typeRef = {
        $container: {} as never,
        $type: 'TypeRefExpr',
        ref: {
          $refText: 'MyType',
          ref: {
            $container: {} as never,
            $type: 'TypeAliasDeclaration',
            name: 'MyType',
            type: {
              $container: {} as never,
              $type: 'NumTypeExpr',
              name: 'num',
            },
            typeParameters: [],
          },
        },
        typeArguments: [],
      } as TypeRefExpr
      expect(evaluate(typeRef)).toBe(Num)
    })
  })
})
