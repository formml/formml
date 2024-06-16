import { Parameter } from '../../language/index.js'
import * as t from '../../language/type-system/index.js'
import { resolveArguments } from '../function-utils.js'

describe('function utils', () => {
  describe('resolveArguments', () => {
    test('should return record given parsed ast', () => {
      const declarations: Parameter[] = []

      const result = resolveArguments([], declarations)

      expectTypeOf(result).toEqualTypeOf<Record<string, unknown>>()
      expectTypeOf(result).not.toEqualTypeOf<object>()
    })

    test('should return named date object given literal interface', () => {
      const declarations = [
        {
          name: 'omitType',
          optional: false,
        },
        {
          name: 'optional',
          optional: true,
        },
        {
          name: 'text',
          optional: false,
          type: t.Text,
        },
        {
          name: 'num',
          optional: false,
          type: t.Num,
        },
        {
          name: 'bool',
          optional: false,
          type: t.Bool,
        },
        // Not supported yet
        // {
        //   name: 'datetime',
        //   optional: false,
        //   type: t.Datetime,
        // },
        // {
        //   name: 'decimal',
        //   optional: false,
        //   type: t.Decimal,
        // },
        {
          name: 'anyShouldBeUnknown',
          optional: false,
          type: t.Any,
        },
      ] as const

      const result = resolveArguments([], declarations)

      expectTypeOf(result).toEqualTypeOf<{
        anyShouldBeUnknown: unknown
        bool: boolean
        num: number
        omitType: unknown
        optional?: unknown
        text: string
      }>()
    })
  })
})
