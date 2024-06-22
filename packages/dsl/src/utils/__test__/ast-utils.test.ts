import { resolveLiteralValue, stringify } from '../ast-utils.js'

describe('ast utils', () => {
  describe('resolveLiteralValue', () => {
    test('should return string value given string literal', () => {
      const literal = {
        $container: {} as never,
        $type: 'TextLiteral' as const,
        value: 'hello',
      }
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

  describe('stringify', () => {
    test('should return json string given a simple ast node', () => {
      const node = {
        $type: 'SimpleNode',
        propA: 'valueA',
        propB: 123,
        propC: true,
      }

      expect(stringify(node)).toMatchInlineSnapshot(
        `"{"node":{"$type":"SimpleNode","propA":"valueA","propB":123,"propC":true}}"`,
      )
    })

    test.each([2, '[tab]'])('should accept space parameter', (space) => {
      const node = {
        $type: 'SimpleNode',
        propA: 'valueA',
        propB: 123,
        propC: true,
      }

      expect(stringify(node, space)).toMatchSnapshot()
    })
  })
})
