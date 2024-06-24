import { AstNode, URI } from 'langium'

import {
  linkNodes,
  parse,
  resolveLiteralValue,
  stringify,
} from '../ast-utils.js'

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
      }
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
            $refText: 'refNodeA',
            ref: refNodeA,
          },
          refB: {
            $refText: 'refNodeB',
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
                "$refText": "refNodeA",
                "$ref": "file:///testA.formml#/childA/children@1/item"
              },
              "refB": {
                "$refText": "refNodeB",
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

    test('should resolve cross references in different trees - nested references', () => {
      const childRef = {
        $type: 'Node',
        name: 'child',
      }
      const parentRef = {
        $type: 'ParentNode',
        child: {
          $type: 'ChildNode',
          childDefinition: childRef,
          ref: {
            $refText: 'child',
            ref: childRef,
          },
        },
        name: 'parent',
      }

      const docA = {
        $document: { uri: URI.parse('file:///testA.formml') } as never,
        $type: 'RootNode',
        node: parentRef,
      }
      linkNodes(docA)

      const docB = {
        $document: { uri: URI.parse('file:///testB.formml') } as never,
        $type: 'RootNode',
        child: {
          $type: 'ChildNode',
          ref: {
            $refText: 'parent',
            ref: parentRef,
          },
        },
      }

      expect(stringify(docB, 2)).toMatchInlineSnapshot(`
        "{
          "node": {
            "$type": "RootNode",
            "child": {
              "$type": "ChildNode",
              "ref": {
                "$refText": "parent",
                "$ref": "file:///testA.formml#/node"
              }
            }
          },
          "references": {
            "file:///testA.formml": {
              "node": {
                "$type": "ParentNode",
                "child": {
                  "$type": "ChildNode",
                  "childDefinition": {
                    "$type": "Node",
                    "name": "child"
                  },
                  "ref": {
                    "$refText": "child",
                    "$ref": "file:///testA.formml#/node/child/childDefinition"
                  }
                },
                "name": "parent"
              }
            }
          }
        }"
      `)
    })

    test('should resolve circular references - same tree', () => {
      const nodeA = {
        $type: 'Node',
        name: 'nodeA',
        ref: {
          $refText: 'nodeB',
          ref: {},
        },
      }
      const nodeB = {
        $type: 'Node',
        name: 'nodeB',
        ref: {
          $refText: 'nodeA',
          ref: nodeA,
        },
      }
      nodeA.ref.ref = nodeB

      const root = {
        $type: 'RootNode',
        nodeA,
        nodeB,
      }
      linkNodes(root)

      expect(stringify(root, 2)).toMatchInlineSnapshot(`
        "{
          "node": {
            "$type": "RootNode",
            "nodeA": {
              "$type": "Node",
              "name": "nodeA",
              "ref": {
                "$refText": "nodeB",
                "$ref": "#/nodeB"
              }
            },
            "nodeB": {
              "$type": "Node",
              "name": "nodeB",
              "ref": {
                "$refText": "nodeA",
                "$ref": "#/nodeA"
              }
            }
          }
        }"
      `)
    })

    test('should resolve circular references - different documents', () => {
      const nodeA = {
        $type: 'Node',
        name: 'nodeA',
        ref: {
          $refText: 'nodeB',
          ref: {},
        },
      }
      const nodeB = {
        $type: 'Node',
        name: 'nodeB',
        ref: {
          $refText: 'nodeA',
          ref: nodeA,
        },
      }
      nodeA.ref.ref = nodeB

      const docA = {
        $document: { uri: URI.parse('file:///testA.formml') } as never,
        $type: 'RootNode',
        nodeA,
      }
      linkNodes(docA)

      const docB = {
        $document: { uri: URI.parse('file:///testB.formml') } as never,
        $type: 'RootNode',
        nodeB,
      }
      linkNodes(docB)

      expect(stringify(docB, 2)).toMatchInlineSnapshot(`
        "{
          "node": {
            "$type": "RootNode",
            "nodeB": {
              "$type": "Node",
              "name": "nodeB",
              "ref": {
                "$refText": "nodeA",
                "$ref": "file:///testA.formml#/nodeA"
              }
            }
          },
          "references": {
            "file:///testA.formml": {
              "nodeA": {
                "$type": "Node",
                "name": "nodeA",
                "ref": {
                  "$refText": "nodeB",
                  "$ref": "#/nodeB"
                }
              }
            }
          }
        }"
      `)
    })
  })

  describe('parse', () => {
    test('should parse json string into ast node', () => {
      const json = `{
        "node": {
          "$type": "SimpleNode",
          "propA": "valueA",
          "propB": 123,
          "propC": true
        }
      }`
      const node = parse(json)
      expect(node).toEqual({
        $type: 'SimpleNode',
        propA: 'valueA',
        propB: 123,
        propC: true,
      })
    })

    test('should link nested nodes', () => {
      const json = `{
        "node": {
          "$type": "ParentNode",
          "child": {
            "$type": "ChildNode",
            "array": [
              {
                "$type": "ArrayItem",
                "value": "item1"
              }
            ],
            "childProp": "valueC"
          },
          "parentProp": "valueP"
        }
      }`
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const node = parse(json) as any
      expect(node).toEqual({
        $type: 'ParentNode',
        child: {
          $container: expect.any(Object),
          $containerProperty: 'child',
          $type: 'ChildNode',
          array: [
            {
              $container: expect.any(Object),
              $containerIndex: 0,
              $containerProperty: 'array',
              $type: 'ArrayItem',
              value: 'item1',
            },
          ],
          childProp: 'valueC',
        },
        parentProp: 'valueP',
      })
      expect(node.child.array[0].$container).toBe(node.child)
      expect(node.child.$container).toBe(node)
    })

    test('should revive cross references in current tree', () => {
      const json = `{
        "node": {
          "$type": "ParentNode",
          "child": {
            "$type": "ChildNode",
            "name": "child"
          },
          "ref": {
            "$refText": "child",
            "$ref": "#/child"
          }
        }
      }`
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const node = parse(json) as any
      expect(node).toEqual({
        $type: 'ParentNode',
        child: {
          $container: expect.any(Object),
          $containerProperty: 'child',
          $type: 'ChildNode',
          name: 'child',
        },
        ref: {
          $refText: 'child',
          ref: expect.any(Object),
        },
      })
      expect(node.ref.ref).toBe(node.child)
    })

    test('should revive cross references in different trees', () => {
      const json = `{
        "node": {
          "$type": "RootNode",
          "ref": {
            "$refText": "hello",
            "$ref": "file:///testA.formml#/child/array@1/item"
          }
        },
        "references": {
          "file:///testA.formml": {
            "child": {
              "array": [
                null,
                {
                  "item": {
                    "$type": "Node",
                    "name": "hello",
                    "child": {
                      "$type": "ChildNode",
                      "name": "child"
                    }
                  }
                }
              ]
            }
          }
        }
      }`
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const node = parse(json) as any
      expect(node).toEqual({
        $type: 'RootNode',
        ref: {
          $refText: 'hello',
          ref: {
            $type: 'Node',
            child: {
              $container: expect.any(Object),
              $containerProperty: 'child',
              $type: 'ChildNode',
              name: 'child',
            },
            name: 'hello',
          },
        },
      })
      expect(node.ref.ref.child.$container).toBe(node.ref.ref)
    })

    test('should also link referred nodes', () => {
      const json = `{
        "node": {
          "$type": "RootNode",
          "refA": {
            "$refText": "world",
            "$ref": "file:///testA.formml#/parent/child/children@1/item"
          },
          "refB": {
            "$refText": "hello",
            "$ref": "file:///testA.formml#/parent/child"
          }
        },
        "references": {
          "file:///testA.formml": {
            "parent": {
              "child": {
                "$type": "ChildNode",
                "name": "hello",
                "children": [
                  null,
                  {
                    "$type": "ArrayItem",
                    "item": {
                      "$type": "Node",
                      "name": "world"
                    }
                  }
                ]
              }
            }
          }
        }
      }`
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const node = parse(json) as any
      expect(node).toEqual({
        $type: 'RootNode',
        refA: {
          $refText: 'world',
          ref: {
            $container: expect.any(Object),
            $containerProperty: 'item',
            $type: 'Node',
            name: 'world',
          },
        },
        refB: {
          $refText: 'hello',
          ref: {
            $type: 'ChildNode',
            children: [
              null,
              {
                $container: expect.any(Object),
                $containerIndex: 1,
                $containerProperty: 'children',
                $type: 'ArrayItem',
                item: {
                  $container: expect.any(Object),
                  $containerProperty: 'item',
                  $type: 'Node',
                  name: 'world',
                },
              },
            ],
            name: 'hello',
          },
        },
      })
      expect(node.refA.ref).toBe(node.refB.ref.children[1].item)
      expect(node.refB.ref.children[1].$container).toBe(node.refB.ref)
      expect(node.refB.ref.children[1].item.$container).toBe(
        node.refB.ref.children[1],
      )
    })

    test('should revive circular references - same tree', () => {
      const json = `{
        "node": {
          "$type": "RootNode",
          "nodeA": {
            "$type": "Node",
            "name": "nodeA",
            "ref": {
              "$refText": "nodeB",
              "$ref": "#/nodeB"
            }
          },
          "nodeB": {
            "$type": "Node",
            "name": "nodeB",
            "ref": {
              "$refText": "nodeA",
              "$ref": "#/nodeA"
            }
          }
        }
      }`
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const node = parse(json) as any
      expect(node).toEqual({
        $type: 'RootNode',
        nodeA: {
          $container: expect.any(Object),
          $containerProperty: 'nodeA',
          $type: 'Node',
          name: 'nodeA',
          ref: {
            $refText: 'nodeB',
            ref: expect.any(Object),
          },
        },
        nodeB: {
          $container: expect.any(Object),
          $containerProperty: 'nodeB',
          $type: 'Node',
          name: 'nodeB',
          ref: {
            $refText: 'nodeA',
            ref: expect.any(Object),
          },
        },
      })
      expect(node.nodeA.ref.ref).toBe(node.nodeB)
      expect(node.nodeB.ref.ref).toBe(node.nodeA)
    })
  })
})
