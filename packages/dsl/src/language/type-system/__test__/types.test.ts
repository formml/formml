import {
  Unknown,
  createBoolLiteral,
  createNumLiteral,
  createTextLiteral,
  inferType,
} from '../types.js'

describe('types', () => {
  describe('inferType', () => {
    test.each([
      [
        {
          $container: {} as never,
          $type: 'DQTextLiteral' as const,
          value: '"hello"',
        },
        createTextLiteral('hello'),
      ],
      [
        {
          $container: {} as never,
          $type: 'SQTextLiteral' as const,
          value: "'hello'",
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
})
