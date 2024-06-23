import { AstNode, AstUtils, Reference, isReference } from 'langium'

import { Literal, NullLiteral, isNullLiteral } from '../language/index.js'

type LiteralValue<T extends Literal> = T extends { value: unknown }
  ? T['value']
  : T extends NullLiteral
    ? null
    : never

export function resolveLiteralValue<T extends Literal>(
  literal: T,
): LiteralValue<T>
export function resolveLiteralValue(literal: Literal) {
  if (isNullLiteral(literal)) {
    return null
  }
  return literal.value
}

const ignoredProperties = new Set([
  '$container',
  '$containerProperty',
  '$containerIndex',
  '$document',
  '$cstNode',
])

function buildAstNodePath(
  node: AstNode,
  stop: AstNode,
): [jsonPath: string, root: AstNode] {
  if (node === stop) {
    return ['$', node]
  }
  if (!node.$container) {
    return ['$', node]
  }
  const container = node.$container
  const property = node.$containerProperty
  if (!property) {
    throw new Error("Missing '$containerProperty' in AST node.")
  }
  const index = node.$containerIndex
  const indexSegment = index !== undefined ? `[${index}]` : ''

  const [jsonPath, root] = buildAstNodePath(container, stop)
  return [`${jsonPath}.${property}${indexSegment}`, root]
}

function setByJsonPath(
  obj: Record<string, unknown>,
  value: unknown,
  jsonPath: string,
): void {
  if (!jsonPath.startsWith('$.')) {
    throw new Error("JSON path must start with '$.'")
  }

  const segments = jsonPath
    .slice(2)
    .split('.')
    .flatMap((part) => {
      const match = part.match(/^([^[\]]+)\[(\d+)\]$/)
      if (!match) return part
      const [, key, index] = match
      return [key, parseInt(index)]
    })
  let parent: Record<string, unknown> = obj

  segments.forEach((part, index) => {
    if (index === segments.length - 1) {
      parent[part] = value
      return
    }

    if (!parent[part]) {
      // Check if the next part is a number (array index)
      if (typeof segments[index + 1] === 'number') {
        parent[part] = []
      } else {
        parent[part] = {}
      }
    }
    parent = parent[part] as Record<string, unknown>
  })
}

type RefInfo = {
  $ref?: string
  $refText: string
  ref?: AstNode
}

function collectReferenceInfos(node: AstNode): Map<Reference, RefInfo> {
  return AstUtils.streamAst(node)
    .flatMap((node) => AstUtils.streamReferences(node))
    .toMap(
      ({ reference }) => reference,
      ({ reference }) => {
        const { $refText, ref } = reference
        if (ref === undefined) {
          return { $refText }
        }
        const [jsonPath, pathRoot] = buildAstNodePath(ref, node)
        const documentUri =
          pathRoot === node ? '' : AstUtils.getDocument(pathRoot).uri.toString()
        return { $ref: `${documentUri}#${jsonPath}`, $refText, ref }
      },
    )
}

function buildReferences(refInfos: RefInfo[]) {
  const references: Record<string, Record<string, unknown>> = {}
  refInfos
    .filter(
      (info): info is Required<RefInfo> => 'ref' in info && '$ref' in info,
    )
    .filter((info) => !info.$ref.startsWith('#'))
    .forEach((refInfo) => {
      const [document, jsonPath] = refInfo.$ref.split('#')
      if (!(document in references)) {
        references[document] = {}
      }
      setByJsonPath(references[document], refInfo.ref, jsonPath)
    })

  return references
}

function replacer(
  refInfos: Map<Reference, RefInfo>,
): (key: string, value: unknown) => unknown {
  return (key: string, value: unknown) => {
    if (ignoredProperties.has(key)) {
      return undefined
    }
    if (isReference(value)) {
      const refInfo = refInfos.get(value)
      return refInfo
        ? {
            $refText: refInfo.$refText,
            ...(refInfo.$ref && { $ref: refInfo.$ref }),
          }
        : { $error: 'Unresolved reference' }
    }
    return value
  }
}

export function stringify(node: AstNode, space?: number | string): string {
  const refInfos = collectReferenceInfos(node)
  const references = buildReferences(Array.from(refInfos.values()))

  return JSON.stringify(
    { node, ...(Object.keys(references).length > 0 && { references }) },
    replacer(refInfos),
    space,
  )
}
