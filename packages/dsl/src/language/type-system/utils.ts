import * as t from './types.js'

export function isAssignable(source: t.Type, target: t.Type): boolean {
  if (t.isAnyType(source) || t.isAnyType(target)) return true
  return source.type === target.type
}
