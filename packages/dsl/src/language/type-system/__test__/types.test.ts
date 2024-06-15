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
        expect(inferType(input)).toEqual(expected)
      },
    )
  })
})