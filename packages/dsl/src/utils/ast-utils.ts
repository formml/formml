import {
  AstNode,
  AstUtils,
  GenericAstNode,
  Reference,
  isAstNode,
  isReference,
} from 'langium'

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

function getByPath<TOutput>(obj: unknown, path: string): TOutput | undefined {
  const segments = path
    .split(SEGMENT_SEPARATOR)
    .filter((part) => part !== '')
    .flatMap((part) => {
      if (!part.includes(INDEX_SEPARATOR)) return part
      const [segment, index] = part.split(INDEX_SEPARATOR)
      return [segment, parseInt(index)]
    })

  let current = obj
  for (const part of segments) {
    if (typeof part === 'number' && Array.isArray(current)) {
      current = current[part]
      continue
    }
    if (
      typeof part === 'string' &&
      typeof current === 'object' &&
      current !== null
    ) {
      current = (current as Record<string, unknown>)[part]
      continue
    }
    return undefined
  }
  return current as TOutput
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

/**
 * A cross-reference in the serialized JSON representation of an AstNode.
 */
type IntermediateReference =
  | {
      /** If any problem occurred while resolving the reference, it is described by this property. */
      $error: string
    }
  | {
      /** URI pointing to the target element. This is either `#${path}` if the target is in the same tree, or `${documentURI}#${path}` otherwise. */
      $ref?: string
      /** The actual text used to look up the reference target in the surrounding scope. */
      $refText: string
    }

function isIntermediateReference(obj: unknown): obj is IntermediateReference {
  return (
    typeof obj === 'object' && !!obj && ('$refText' in obj || '$error' in obj)
  )
}

export function linkNodes(
  node: GenericAstNode,
  reviveReference?: (ref: IntermediateReference) => Reference,
  container?: object,
  property?: string,
  index?: number,
) {
  container && Object.assign(node, { $container: container })
  property && Object.assign(node, { $containerProperty: property })
  index !== undefined && Object.assign(node, { $containerIndex: index })

  Object.entries(node).forEach(([key, value]) => {
    if (key.startsWith('$')) {
      return
    }
    if (Array.isArray(value)) {
      value.forEach((item, i) => {
        if (isIntermediateReference(item) && reviveReference) {
          const reference = reviveReference(item)
          if (reference.ref)
            linkNodes(reference.ref as GenericAstNode, reviveReference) // link as a new tree root
          value[i] = reference
          return
        }
        if (isAstNode(item)) {
          linkNodes(item as GenericAstNode, reviveReference, node, key, i)
          return
        }
      })
      return
    }
    if (isIntermediateReference(value) && reviveReference) {
      const reference = reviveReference(value)
      if (reference.ref)
        linkNodes(reference.ref as GenericAstNode, reviveReference) // link as a new tree root
      node[key] = reference
      return
    }
    if (isAstNode(value)) {
      linkNodes(value as GenericAstNode, reviveReference, node, key)
      return
    }
  })
}

function referenceReviver(
  node: GenericAstNode,
  references?: Record<string, Record<string, unknown>>,
): (ref: IntermediateReference) => Reference {
  return (ref) => {
    if ('$error' in ref) {
      throw new Error('Has reference error: ' + ref.$error)
    }
    if (ref.$ref) {
      const [document, path] = ref.$ref.split('#')
      if (document === '') {
        return { $refText: ref.$refText, ref: getByPath(node, path) }
      }
      return {
        $refText: ref.$refText,
        ref: getByPath(references?.[document], path),
      }
    }
    return ref
  }
}

export function parse(json: string): AstNode {
  const { node, references } = JSON.parse(json) as {
    node: GenericAstNode
    references?: Record<string, Record<string, unknown>>
  }
  linkNodes(node, referenceReviver(node, references))
  return node
}
