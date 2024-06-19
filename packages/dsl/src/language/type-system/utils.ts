import * as t from './types.js'

export function isAssignable(source: t.Type, target: t.Type): boolean {
  if (t.isAnyType(source) || t.isAnyType(target)) return true
  if (source.name !== target.name) return false
  if (t.isLiteralType(source)) {
    return !t.isLiteralType(target) || source.literal === target.literal
  }
  if (t.isLiteralType(target)) return false
  return true
}

export function stringify(type: t.Type): string {
  if (t.isTextLiteralType(type)) return `"${type.literal}"`
  if (t.isLiteralType(type)) return type.literal.toString()
  return type.name
}
