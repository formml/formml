import { resolveLiteralValue } from '../../utils/ast-utils.js'
import * as ast from '../generated/ast.js'

export type Type = ConstantType | LiteralType

// Constant types

export type ConstantType =
  | AnyType
  | BoolType
  | DatetimeType
  | DecimalType
  | NeverType
  | NumType
  | TextType
  | UnknownType

export const Any = {
  name: 'any' as const,
}

export type AnyType = typeof Any

export function isAnyType(type: Type): type is AnyType {
  return type.name === 'any'
}

export const Never = {
  name: 'never' as const,
}

export type NeverType = typeof Never

export const Num = {
  name: 'num' as const,
}

export type NumType = typeof Num

export const Text = {
  name: 'text' as const,
}

export type TextType = typeof Text

export const Bool = {
  name: 'bool' as const,
}

export type BoolType = typeof Bool

export const Datetime = {
  name: 'datetime' as const,
}

export type DatetimeType = typeof Datetime

export const Decimal = {
  name: 'decimal' as const,
}

export type DecimalType = typeof Decimal

export const Unknown = {
  name: 'unknown' as const,
}

export type UnknownType = typeof Unknown

// Literal types

export type LiteralType = BoolLiteralType | NumLiteralType | TextLiteralType

export function isLiteralType(type: Type): type is LiteralType {
  return 'literal' in type
}

export type NumLiteralType<T extends number = number> = NumType & { literal: T }

export function createNumLiteral<T extends number>(
  value: T,
): NumLiteralType<T> {
  return {
    literal: value,
    name: 'num',
  }
}

export function isNumLiteralType(type: Type): type is NumLiteralType {
  return type.name === 'num' && 'literal' in type
}

export type TextLiteralType<T extends string = string> = TextType & {
  literal: T
}

export function createTextLiteral<T extends string>(
  value: T,
): TextLiteralType<T> {
  return {
    literal: value,
    name: 'text',
  }
}

export function isTextLiteralType(type: Type): type is TextLiteralType {
  return type.name === 'text' && 'literal' in type
}

export type BoolLiteralType<T extends boolean = boolean> = BoolType & {
  literal: T
}

export function createBoolLiteral<T extends boolean>(
  value: T,
): BoolLiteralType<T> {
  return {
    literal: value,
    name: 'bool',
  }
}

export function isBoolLiteralType(type: Type): type is BoolLiteralType {
  return type.name === 'bool' && 'literal' in type
}

export function inferType(value: ast.Literal): Type {
  if (ast.isDQString(value) || ast.isSQString(value)) {
    return createTextLiteral(resolveLiteralValue(value))
  }
  if (ast.isNumber_(value)) {
    return createNumLiteral(resolveLiteralValue(value))
  }
  if (ast.isBoolean(value)) {
    return createBoolLiteral(resolveLiteralValue(value))
  }
  if (ast.isNull(value)) {
    return Unknown
  }
  return Never
}
