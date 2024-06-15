import { resolveLiteralValue } from '../ast-utils.js'

describe('ast utils', () => {
  describe('resolveLiteralValue', () => {
    test.each([
      {
        $container: {} as never,
        $type: 'DQTextLiteral' as const,
        value: '"hello"',
      },
      {
        $container: {} as never,
        $type: 'SQTextLiteral' as const,
        value: "'hello'",
      },
    ])('should return string type given string literal', (literal) => {
      expectTypeOf(resolveLiteralValue(literal)).toBeString()
    })

    test('should return number type given number literal', () => {
      const literal = {
        $container: {} as never,
        $type: 'NumLiteral' as const,
        value: 123,
      }
      expectTypeOf(resolveLiteralValue(literal)).toBeNumber()
    })

    test('should return boolean type given boolean literal', () => {
      const literal = {
        $container: {} as never,
        $type: 'BoolLiteral' as const,
        value: true,
      }
      expectTypeOf(resolveLiteralValue(literal)).toBeBoolean()
    })

    test('should return null type given null literal', () => {
      const literal = {
        $container: {} as never,
        $type: 'NullLiteral' as const,
      }
      expectTypeOf(resolveLiteralValue(literal)).toBeNull()
    })
  })
})
