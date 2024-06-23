import { AstNode, URI, isReference } from 'langium'

import { resolveLiteralValue, stringify } from '../ast-utils.js'

function linkNodes(
  node: unknown,
  container?: object,
  property?: string,
  index?: number,
) {
  if (
    typeof node !== 'object' ||
    node === null ||
    Array.isArray(node) ||
    isReference(node)
  ) {
    return
  }
  container && Object.assign(node, { $container: container })
  property && Object.assign(node, { $containerProperty: property })
  index !== undefined && Object.assign(node, { $containerIndex: index })

  Object.entries(node)
    .filter(([key]) => !key.startsWith('$'))
    .forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((item, i) => {
          linkNodes(item, node, key, i)
        })
        return
      }
      linkNodes(value, node, key)
    })
}

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

    test('should resolve cross references in same tree', () => {
      const refNode = {
        $type: 'Node',
        name: 'hello',
      }
      const node = {
        $type: 'ParentNode',
        child: {
          $type: 'ChildNode',
          children: [
            { $type: 'ArrayItem', item: { $type: 'Node', name: 'world' } },
            { $type: 'ArrayItem', item: refNode },
          ],
        },
        ref: {
          $refText: 'hello',
          ref: refNode,
        },
      } as AstNode
      linkNodes(node)

      expect(stringify(node, 2)).toMatchInlineSnapshot(`
        "{
          "node": {
            "$type": "ParentNode",
            "child": {
              "$type": "ChildNode",
              "children": [
                {
                  "$type": "ArrayItem",
                  "item": {
                    "$type": "Node",
                    "name": "world"
                  }
                },
                {
                  "$type": "ArrayItem",
                  "item": {
                    "$type": "Node",
                    "name": "hello"
                  }
                }
              ]
            },
            "ref": {
              "$refText": "hello",
              "$ref": "#/child/children@1/item"
            }
          }
        }"
      `)
    })

    test('should resolve cross references in different trees - same document', () => {
      const refNode = {
        $type: 'Node',
        name: 'hello',
      }

      const doc = {
        $document: { uri: URI.parse('file:///test.formml') } as never,
        $type: 'RootNode',
        childA: {
          $type: 'ChildNode',
          children: [
            { $type: 'ArrayItem', item: { $type: 'Node', name: 'world' } },
            { $type: 'ArrayItem', item: refNode },
          ],
        },
        childB: {
          $type: 'ChildNode',
          ref: {
            $refText: 'hello',
            ref: refNode,
          },
        },
      }
      linkNodes(doc)

      expect(stringify(doc.childB, 2)).toMatchInlineSnapshot(`
        "{
          "node": {
            "$type": "ChildNode",
            "ref": {
              "$refText": "hello",
              "$ref": "file:///test.formml#/childA/children@1/item"
            }
          },
          "references": {
            "file:///test.formml": {
              "childA": {
                "children": [
                  null,
                  {
                    "item": {
                      "$type": "Node",
                      "name": "hello"
                    }
                  }
                ]
              }
            }
          }
        }"
      `)
    })

    test('should resolve cross references in different trees - different documents', () => {
      const refNode = {
        $type: 'Node',
        name: 'hello',
      }

      const docA = {
        $document: { uri: URI.parse('file:///testA.formml') } as never,
        $type: 'RootNode',
        childA: {
          $type: 'ChildNode',
          children: [
            { $type: 'ArrayItem', item: { $type: 'Node', name: 'world' } },
            { $type: 'ArrayItem', item: refNode },
          ],
        },
      }
      linkNodes(docA)

      const docB = {
        $document: { uri: URI.parse('file:///testB.formml') } as never,
        $type: 'RootNode',
        childB: {
          $type: 'ChildNode',
          ref: {
            $refText: 'hello',
            ref: refNode,
          },
        },
      }

      expect(stringify(docB, 2)).toMatchInlineSnapshot(`
        "{
          "node": {
            "$type": "RootNode",
            "childB": {
              "$type": "ChildNode",
              "ref": {
                "$refText": "hello",
                "$ref": "file:///testA.formml#/childA/children@1/item"
              }
            }
          },
          "references": {
            "file:///testA.formml": {
              "childA": {
                "children": [
                  null,
                  {
                    "item": {
                      "$type": "Node",
                      "name": "hello"
                    }
                  }
                ]
              }
            }
          }
        }"
      `)
    })

    test('should resolve cross references in different trees - document merge', () => {
      const refNodeA = {
        $type: 'Node',
        name: 'refNodeA',
      }
      const refNodeB = {
        $type: 'Node',
        name: 'refNodeB',
      }

      const docA = {
        $document: { uri: URI.parse('file:///testA.formml') } as never,
        $type: 'RootNode',
        childA: {
          $type: 'ChildNode',
          children: [
            { $type: 'ArrayItem', item: { $type: 'Node', name: 'world' } },
            { $type: 'ArrayItem', item: refNodeA },
            { $type: 'ArrayItem', item: { $type: 'Node', name: refNodeB } },
          ],
        },
      }
      linkNodes(docA)

      const docB = {
        $document: { uri: URI.parse('file:///testB.formml') } as never,
        $type: 'RootNode',
        child: {
          $type: 'ChildNode',
          refA: {
            $refText: 'hello',
            ref: refNodeA,
          },
          refB: {
            $refText: 'world',
            ref: refNodeB,
          },
        },
      }

      expect(stringify(docB, 2)).toMatchInlineSnapshot(`
        "{
          "node": {
            "$type": "RootNode",
            "child": {
              "$type": "ChildNode",
              "refA": {
                "$refText": "hello",
                "$ref": "file:///testA.formml#/childA/children@1/item"
              },
              "refB": {
                "$refText": "world",
                "$ref": "file:///testA.formml#/childA/children@2/item/name"
              }
            }
          },
          "references": {
            "file:///testA.formml": {
              "childA": {
                "children": [
                  null,
                  {
                    "item": {
                      "$type": "Node",
                      "name": "refNodeA"
                    }
                  },
                  {
                    "item": {
                      "name": {
                        "$type": "Node",
                        "name": "refNodeB"
                      }
                    }
                  }
                ]
              }
            }
          }
        }"
      `)
    })
  })
})
