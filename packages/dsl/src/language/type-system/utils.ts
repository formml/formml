import * as t from './types.js'

export function isAssignable(source: t.Type, target: t.Type): boolean {
  if (t.isAnyType(source) || t.isAnyType(target)) return true // skip checking for any type

  if (source.name !== target.name) return false
  if (!t.isLiteralType(source) && t.isLiteralType(target)) return false
  if (
    t.isLiteralType(source) &&
    t.isLiteralType(target) &&
    source.literal !== target.literal
  ) {
    return false
  }
  if (source.name === 'object' && target.name === 'object') {
    for (const key of Object.keys(target.properties)) {
      if (!(key in source.properties)) return false
      if (!isAssignable(source.properties[key], target.properties[key])) {
        return false
      }
    }
  }
  return true
}

export function stringify(type: t.Type): string {
  if (t.isTextLiteralType(type)) return `"${type.literal}"`
  if (t.isLiteralType(type)) return type.literal.toString()
  return type.name
}
