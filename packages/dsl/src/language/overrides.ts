import type { Field as CommonField, PrimitiveType } from './generated/ast.js'

type FieldDef<T extends PrimitiveType> = Omit<CommonField, 'type'> & {
  type: T
}

type Field<T extends PrimitiveType = PrimitiveType> = T extends PrimitiveType
  ? FieldDef<T>
  : never

export type { CommonField, Field }
