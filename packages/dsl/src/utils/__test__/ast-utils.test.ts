import { AstNode } from 'langium'

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
      } as AstNode

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
      } as AstNode

      expect(stringify(node, space)).toMatchSnapshot()
    })

    test('should ignore special properties', () => {
      const node = {
        $container: {} as never,
        $containerIndex: 0,
        $containerProperty: 'propA',
        $cstNode: {} as never,
        $document: {} as never,
        $type: 'SimpleNode',
      } as AstNode

      expect(stringify(node)).toMatchInlineSnapshot(
        `"{"node":{"$type":"SimpleNode"}}"`,
      )
    })

    test('should ignore special properties in nested nodes', () => {
      const node = {
        $type: 'ParentNode',
        child: {
          $container: {} as never,
          $containerProperty: 'child',
          $cstNode: {} as never,
          $document: {} as never,
          $type: 'ChildNode',
          array: [
            {
              $container: {} as never,
              $containerIndex: 0,
              $containerProperty: 'array',
              $cstNode: {} as never,
              $document: {} as never,
              $type: 'ArrayItem',
              value: 'item1',
            },
            {
              $container: {} as never,
              $containerIndex: 1,
              $containerProperty: 'array',
              $cstNode: {} as never,
              $document: {} as never,
              $type: 'ArrayItem',
              value: 'item2',
            },
          ],
          childProp: 'valueC',
        },
        parentProp: 'valueP',
      } as AstNode

      expect(stringify(node, 2)).toMatchInlineSnapshot(`
        "{
          "node": {
            "$type": "ParentNode",
            "child": {
              "$type": "ChildNode",
              "array": [
                {
                  "$type": "ArrayItem",
                  "value": "item1"
                },
                {
                  "$type": "ArrayItem",
                  "value": "item2"
                }
              ],
              "childProp": "valueC"
            },
            "parentProp": "valueP"
          }
        }"
      `)
    })

    test('should stringify nested nodes', () => {
      const node = {
        $type: 'ParentNode',
        child: {
          $type: 'ChildNode',
          array: [
            { $type: 'ArrayItem', value: 'item1' },
            { $type: 'ArrayItem', value: 'item2' },
          ],
          childProp: 'valueC',
        },
        parentProp: 'valueP',
      } as AstNode

      expect(stringify(node, 2)).toMatchInlineSnapshot(
        `
        "{
          "node": {
            "$type": "ParentNode",
            "child": {
              "$type": "ChildNode",
              "array": [
                {
                  "$type": "ArrayItem",
                  "value": "item1"
                },
                {
                  "$type": "ArrayItem",
                  "value": "item2"
                }
              ],
              "childProp": "valueC"
            },
            "parentProp": "valueP"
          }
        }"
      `,
      )
    })
  })
})
