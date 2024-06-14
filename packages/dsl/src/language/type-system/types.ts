import { resolveLiteralValue } from '../../utils/ast-utils.js'
import * as ast from '../generated/ast.js'

export type Type =
  | AnyType
  | BoolType
  | DatetimeType
  | DecimalType
  | NeverType
  | NumType
  | TextType
  | UnknownType

function createConstantType<const T extends { type: string }>(
  definition: T,
): T & { toString: () => string } {
  return { ...definition, toString: () => definition.type }
}

export const Any = createConstantType({
  type: 'any',
})

export type AnyType = typeof Any

export function isAnyType(type: Type): type is AnyType {
  return type.type === 'any'
}

export const Never = createConstantType({
  type: 'never',
})

export type NeverType = typeof Never

export const Num = createConstantType({
  type: 'num',
})

export type NumType = typeof Num

export type NumLiteralType<T extends number = number> = NumType & { literal: T }

export function createNumLiteral<T extends number>(
  value: T,
): NumLiteralType<T> {
  return {
    literal: value,
    toString: () => value.toString(),
    type: 'num',
  }
}

export const Text = createConstantType({
  type: 'text',
})

export type TextType = typeof Text

export type TextLiteralType<T extends string = string> = TextType & {
  literal: T
}

export function createTextLiteral<T extends string>(
  value: T,
): TextLiteralType<T> {
  return {
    literal: value,
    toString: () => `"${value}"`,
    type: 'text',
  }
}

export const Bool = createConstantType({
  type: 'bool',
})

export type BoolType = typeof Bool

export type BoolLiteralType<T extends boolean = boolean> = BoolType & {
  literal: T
}

export function createBoolLiteral<T extends boolean>(
  value: T,
): BoolLiteralType<T> {
  return {
    literal: value,
    toString: () => value.toString(),
    type: 'bool',
  }
}

export const Datetime = createConstantType({
  type: 'datetime',
})

export type DatetimeType = typeof Datetime

export const Decimal = createConstantType({
  type: 'decimal',
})

export type DecimalType = typeof Decimal

export const Unknown = createConstantType({
  type: 'unknown',
})

export type UnknownType = typeof Unknown

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

export function fromDeclaration(declaration?: ast.Type): Type {
  if (!declaration) {
    return Any
  }
  if (ast.isAnyType(declaration)) {
    return Any
  }
  if (declaration.name === 'text') {
    return Text
  }
  if (declaration.name === 'num') {
    return Num
  }
  if (declaration.name === 'bool') {
    return Bool
  }
  if (declaration.name === 'datetime') {
    return Datetime
  }
  if (declaration.name === 'decimal') {
    return Decimal
  }
  return Never
}
