import type { Field as CommonField, PRIMITIVE } from '../generated/ast.js'

type FieldDef<T extends PRIMITIVE> = Omit<CommonField, 'type'> & {
  type: T
}

type Field<T extends PRIMITIVE = PRIMITIVE> = T extends PRIMITIVE
  ? FieldDef<T>
  : never

export type { CommonField, Field }
