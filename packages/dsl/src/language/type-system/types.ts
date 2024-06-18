import { resolveLiteralValue } from '../../utils/ast-utils.js'
import * as ast from '../generated/ast.js'

export type Type = CompositeType | ConstantType | LiteralType

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

// Composite types

export type CompositeType = ObjectType

interface CommonObjectProps {
  [key: string]: Type
}

export type ObjectType<T extends Record<string, Type> = CommonObjectProps> = {
  name: 'object'
  properties: T
}

export function createObjectType<const T extends Record<string, Type>>(
  properties: T,
): ObjectType<T> {
  return {
    name: 'object',
    properties,
  }
}

// Functions

export function inferType(value: ast.Literal): Type {
  if (ast.isTextLiteral(value)) {
    return createTextLiteral(resolveLiteralValue(value))
  }
  if (ast.isNumLiteral(value)) {
    return createNumLiteral(resolveLiteralValue(value))
  }
  if (ast.isBoolLiteral(value)) {
    return createBoolLiteral(resolveLiteralValue(value))
  }
  if (ast.isNullLiteral(value)) {
    return Unknown
  }
  return Never
}

export function evaluate(
  expression?: ast.TypeExpr,
  context: Record<string, Type> = {},
): Type {
  if (!expression) {
    return Any
  }
  if (ast.isAnyTypeExpr(expression)) {
    return Any
  }
  if (ast.isNumTypeExpr(expression)) {
    return Num
  }
  if (ast.isTextTypeExpr(expression)) {
    return Text
  }
  if (ast.isBoolTypeExpr(expression)) {
    return Bool
  }
  if (ast.isDatetimeTypeExpr(expression)) {
    return Datetime
  }
  if (ast.isDecimalTypeExpr(expression)) {
    return Decimal
  }
  if (ast.isObjectTypeExpr(expression)) {
    const properties = expression.properties.reduce<Record<string, Type>>(
      (properties, curr) => ({
        ...properties,
        [curr.name]: evaluate(curr.type, context),
      }),
      {},
    )
    return createObjectType(properties)
  }
  if (ast.isTypeRefExpr(expression)) {
    const declaration = expression.ref.ref
    if (ast.isTypeAliasDeclaration(declaration)) {
      const args = expression.typeArguments.reduce<Record<string, Type>>(
        (args, curr, i) => ({
          ...args,
          [declaration.typeParameters[i].name]: evaluate(curr, context),
        }),
        {},
      )
      return evaluate(declaration.type, { ...context, ...args })
    }
    if (ast.isTypeParameterDeclaration(declaration)) {
      return context[declaration.name]
    }
  }
  return Never
}
