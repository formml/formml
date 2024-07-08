import * as ast from '../generated/ast.js'

export type FormMLSchema<TForm extends Form = Form> = ast.FormMLSchema & {
  form: TForm
}

export type Form<
  TName extends string = string,
  TFields extends readonly Field[] = Array<Field>,
> = ast.Form & {
  fields: TFields
  name: TName
}

export type Field<
  TName extends string = string,
  TType extends ast.PRIMITIVE = ast.PRIMITIVE,
> = ast.Field & {
  name: TName
  type: TType
}
