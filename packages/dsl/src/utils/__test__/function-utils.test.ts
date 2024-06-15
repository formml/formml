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
            $type: 'DQTextLiteral',
            value: '"value1"',
          },
        },
        {
          $container: {} as never,
          $type: 'PositionalArgument',
          value: {
            $container: {} as never,
            $type: 'BoolLiteral',
            value: true,
          },
        },
        {
          $container: {} as never,
          $type: 'PositionalArgument',
          value: {
            $container: {} as never,
            $type: 'NumLiteral',
            value: 3,
          },
        },
      ]

      const paramsDeclaration: Parameter[] = [
        {
          $container: {} as never,
          $type: 'Parameter',
          name: 'param1',
          optional: false,
        },
        {
          $container: {} as never,
          $type: 'Parameter',
          name: 'param2',
          optional: false,
        },
        {
          $container: {} as never,
          $type: 'Parameter',
          name: 'param3',
          optional: false,
        },
      ]

      const resolvedArgs = resolveArguments(args, paramsDeclaration)

      expect(resolvedArgs).toEqual({
        param1: 'value1',
        param2: true,
        param3: 3,
      })
    })

    test('should resolve named arguments by name', () => {
      const args: Argument[] = [
        {
          $container: {} as never,
          $type: 'NamedArgument',
          name: 'arg1',
          value: {
            $container: {} as never,
            $type: 'DQTextLiteral',
            value: '"value1"',
          },
        },
        {
          $container: {} as never,
          $type: 'NamedArgument',
          name: 'arg2',
          value: {
            $container: {} as never,
            $type: 'BoolLiteral',
            value: true,
          },
        },
        {
          $container: {} as never,
          $type: 'NamedArgument',
          name: 'arg3',
          value: {
            $container: {} as never,
            $type: 'NumLiteral',
            value: 3,
          },
        },
      ]

      const resolvedArgs = resolveArguments(args, [])

      expect(resolvedArgs).toEqual({
        arg1: 'value1',
        arg2: true,
        arg3: 3,
      })
    })
  })
})
