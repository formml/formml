import * as ast from '../generated/ast.js'

export type Form<
  TName extends string = string,
  TFields extends readonly Field[] = Array<Field>,
> = Omit<ast.Form, 'fields' | 'name'> & {
  fields: TFields
  name: TName
}

export type Field<
  TName extends string = string,
  TType extends ast.PRIMITIVE = ast.PRIMITIVE,
> = Omit<ast.Field, 'name' | 'type'> & {
  name: TName
  type: TType
}
