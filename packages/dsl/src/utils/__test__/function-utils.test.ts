import { Argument, Parameter } from '../../language/index.js'
import { resolveArguments } from '../function-utils.js'

describe('function utils', () => {
  describe('resolveArguments', () => {
    test('should resolve positional arguments by declaration order', () => {
      const args: Argument[] = [
        {
          $container: {} as never,
          $type: 'PositionalArgument',
          value: {
            $container: {} as never,
            $type: 'DQString',
            value: '"value1"',
          },
        },
        {
          $container: {} as never,
          $type: 'PositionalArgument',
          value: {
            $container: {} as never,
            $type: 'Boolean',
            value: true,
          },
        },
        {
          $container: {} as never,
          $type: 'PositionalArgument',
          value: {
            $container: {} as never,
            $type: 'Number_',
            value: 3,
          },
        },
      ]

      const paramsDeclaration: Parameter[] = [
        {
          $container: {} as never,
          $type: 'Parameter',
          name: 'param1',
        },
        {
          $container: {} as never,
          $type: 'Parameter',
          name: 'param2',
        },
        {
          $container: {} as never,
          $type: 'Parameter',
          name: 'param3',
        },
      ]

      const resolvedArgs = resolveArguments(args, paramsDeclaration)

      expect(resolvedArgs).toEqual({
        param1: 'value1',
        param2: true,
        param3: 3,
      })
    })
  })
})
