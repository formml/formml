import * as t from './types.js'

export function isAssignable(source: t.Type, target: t.Type): boolean {
  if (t.isAnyType(source) || t.isAnyType(target)) return true
  return source.name === target.name
}

export function stringify(type: t.Type): string {
  if (t.isTextLiteralType(type)) return `"${type.literal}"`
  if (t.isLiteralType(type)) return type.literal.toString()
  return type.name
}
