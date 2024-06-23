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

const SEGMENT_SEPARATOR = '/'
const INDEX_SEPARATOR = '@'

function buildAstNodePath(
  node: AstNode,
  stop: AstNode,
): [path: string, root: AstNode] {
  if (node === stop) {
    return ['', node]
  }
  if (!node.$container) {
    return ['', node]
  }
  const container = node.$container
  const property = node.$containerProperty
  if (!property) {
    throw new Error("Missing '$containerProperty' in AST node.")
  }
  const [containerPath, root] = buildAstNodePath(container, stop)
  let path = containerPath + SEGMENT_SEPARATOR + property

  const index = node.$containerIndex
  if (index !== undefined) path += INDEX_SEPARATOR + index

  return [path, root]
}

function setByPath(
  obj: Record<string, unknown>,
  value: unknown,
  path: string,
): void {
  const segments = path
    .split(SEGMENT_SEPARATOR)
    .filter((part) => part !== '')
    .flatMap((part) => {
      if (!part.includes(INDEX_SEPARATOR)) return part
      const [segment, index] = part.split(INDEX_SEPARATOR)
      return [segment, parseInt(index)]
    })

  let parent = obj
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
  // BFS all nodes and referred nodes
  const refInfos = new Map<Reference, RefInfo>()
  const visitedTrees = new Set<AstNode>()
  const queue = [node]
  while (queue.length > 0) {
    const subtreeRoot = queue.shift()!
    for (const currentNode of AstUtils.streamAst(subtreeRoot)) {
      if (visitedTrees.has(currentNode)) {
        break // skip visited subtree
      }
      AstUtils.streamReferences(currentNode)
        .map((ref) => ref.reference)
        .forEach((reference) => {
          const { $refText, ref } = reference
          let refInfo: RefInfo = { $refText }
          if (ref) {
            const [path, root] = buildAstNodePath(ref, node)
            const documentUri =
              root === node ? '' : AstUtils.getDocument(root).uri.toString()
            refInfo = { ...refInfo, $ref: `${documentUri}#${path}`, ref }
            queue.push(ref)
          }
          refInfos.set(reference, refInfo)
        })
      visitedTrees.add(currentNode)
    }
  }
  return refInfos
}

function buildReferences(refInfos: RefInfo[]) {
  const references: Record<string, Record<string, unknown>> = {}
  refInfos
    .filter(
      (info): info is Required<RefInfo> => 'ref' in info && '$ref' in info,
    )
    .filter((info) => !info.$ref.startsWith('#'))
    .forEach((refInfo) => {
      const [document, path] = refInfo.$ref.split('#')
      if (!(document in references)) {
        references[document] = {}
      }
      setByPath(references[document], refInfo.ref, path)
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
