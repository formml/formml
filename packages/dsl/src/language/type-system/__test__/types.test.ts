import { parseHelper } from 'langium/test'

import type {
  FormMLDeclaration,
  ObjectTypeExpr,
  TypeRefExpr,
} from '../../generated/ast.js'

import { createInMemoryAggregateServices } from '../../aggregate-module.js'
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
  createObjectType,
  createTextLiteral,
  evaluate,
  inferType,
} from '../types.js'

describe('types', () => {
  const services = createInMemoryAggregateServices()
  const parser = (input: string) =>
    parseHelper<FormMLDeclaration>(services.FormMLDeclaration)(input)
      .then((x) => x.parseResult)
      .then((r) =>
        r.lexerErrors.length > 0 || r.parserErrors.length > 0
          ? Promise.reject(
              new Error(
                'Parsing failed with errors:\n' +
                  [...r.lexerErrors, ...r.parserErrors]
                    .map((e) => e.message)
                    .join('\n'),
              ),
            )
          : r.value,
      )

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
      'should return type constants for language primitive types',
      (input, expected) => {
        expect(evaluate(input)).toBe(expected)
      },
    )

    test('should return object type for inline object type expression', () => {
      const expression = {
        $container: {} as never,
        $type: 'ObjectTypeExpr',
        properties: [
          {
            $container: {} as never,
            $type: 'Property',
            name: 'value',
            type: {
              $container: {} as never,
              $type: 'NumTypeExpr',
              name: 'num',
            },
          },
          {
            $container: {} as never,
            $type: 'Property',
            name: 'label',
            type: {
              $container: {} as never,
              $type: 'TextTypeExpr',
              name: 'text',
            },
          },
        ],
      } as ObjectTypeExpr

      expect(evaluate(expression)).toEqual(
        createObjectType({
          label: Text,
          value: Num,
        }),
      )
    })

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

    test('should evaluate type ref to actual type - with type arguments', async () => {
      const typeAlias = (
        await parser(`type MyType<T, U> = { value: T; label: U }`)
      ).typeDeclarations[0]

      const typeRef = {
        $container: {} as never,
        $type: 'TypeRefExpr',
        ref: {
          $refText: 'MyType',
          ref: typeAlias,
        },
        typeArguments: [
          {
            $container: {} as never,
            $type: 'NumTypeExpr',
            name: 'num',
          },
          {
            $container: {} as never,
            $type: 'TextTypeExpr',
            name: 'text',
          },
        ],
      } as TypeRefExpr

      expect(evaluate(typeRef)).toEqual(
        createObjectType({
          label: Text,
          value: Num,
        }),
      )
    })
  })
})
