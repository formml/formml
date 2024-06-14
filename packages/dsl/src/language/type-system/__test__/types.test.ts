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
  fromDeclaration,
  inferType,
} from '../types.js'

describe('types', () => {
  describe('inferType', () => {
    test.each([
      [
        {
          $container: {} as never,
          $type: 'DQString' as const,
          value: '"hello"',
        },
        createTextLiteral('hello'),
      ],
      [
        {
          $container: {} as never,
          $type: 'SQString' as const,
          value: "'hello'",
        },
        createTextLiteral('hello'),
      ],
      [
        {
          $container: {} as never,
          $type: 'Number_' as const,
          value: 123,
        },
        createNumLiteral(123),
      ],
      [
        {
          $container: {} as never,
          $type: 'Boolean' as const,
          value: false,
        },
        createBoolLiteral(false),
      ],
      [
        {
          $container: {} as never,
          $type: 'Boolean' as const,
          value: true,
        },
        createBoolLiteral(true),
      ],

      [
        {
          $container: {} as never,
          $type: 'Null' as const,
        },
        Unknown,
      ],
    ])(
      'should infer literal types given a literal value',
      (input, expected) => {
        expect(inferType(input)).toEqual({
          ...expected,
          toString: expect.any(Function),
        })
      },
    )
  })

  describe('fromDeclaration', () => {
    test.each([
      [
        {
          $container: {} as never,
          $type: 'AnyType',
          name: 'any',
        } as const,
        Any,
      ],
      [
        {
          $container: {} as never,
          $type: 'PrimitiveType',
          name: 'text',
        } as const,
        Text,
      ],
      [
        {
          $container: {} as never,
          $type: 'PrimitiveType',
          name: 'bool',
        } as const,
        Bool,
      ],
      [
        {
          $container: {} as never,
          $type: 'PrimitiveType',
          name: 'num',
        } as const,
        Num,
      ],
      [
        {
          $container: {} as never,
          $type: 'PrimitiveType',
          name: 'datetime',
        } as const,
        Datetime,
      ],
      [
        {
          $container: {} as never,
          $type: 'PrimitiveType',
          name: 'decimal',
        } as const,
        Decimal,
      ],
    ])('should convert declaration type to unknown type', (input, expected) => {
      expect(fromDeclaration(input)).toBe(expected)
    })

    test('should return any if given no declaration', () => {
      expect(fromDeclaration()).toBe(Any)
    })
  })
})
