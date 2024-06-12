import { Parameter } from '../../language/index.js'
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
          name: 'param1',
        },
        {
          name: 'param2',
        },
        {
          name: 'param3',
        },
      ] as const

      const result = resolveArguments([], declarations)

      expectTypeOf(result).toEqualTypeOf<{
        param1: unknown
        param2: unknown
        param3: unknown
      }>()
    })
  })
})
