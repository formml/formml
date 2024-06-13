import type { Field as CommonField, Primitive } from '../generated/ast.js'

type FieldDef<T extends Primitive> = Omit<CommonField, 'type'> & {
  type: T
}

type Field<T extends Primitive = Primitive> = T extends Primitive
  ? FieldDef<T>
  : never

export type { CommonField, Field }
