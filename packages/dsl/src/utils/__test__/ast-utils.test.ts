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
    ])('should remove quotes from string literal', (literal) => {
      expect(resolveLiteralValue(literal)).toBe('hello')
    })

    test('should return number value given number literal', () => {
      const literal = {
        $container: {} as never,
        $type: 'NumLiteral' as const,
        value: 123,
      }
      expect(resolveLiteralValue(literal)).toBe(123)
    })

    test('should return boolean value given boolean literal', () => {
      const literal = {
        $container: {} as never,
        $type: 'BoolLiteral' as const,
        value: true,
      }
      expect(resolveLiteralValue(literal)).toBe(true)
    })

    test('should return null given null literal', () => {
      const literal = {
        $container: {} as never,
        $type: 'NullLiteral' as const,
      }
      expect(resolveLiteralValue(literal)).toBe(null)
    })
  })
})
