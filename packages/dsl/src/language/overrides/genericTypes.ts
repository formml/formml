import * as ast from '../generated/ast.js'

export interface FormMLSchema<TForm extends Form = Form>
  extends ast.FormMLSchema {
  form: TForm
}

export interface Form<
  TName extends string = string,
  TFields extends Field[] = Field[],
> extends ast.Form {
  fields: TFields
  name: TName
}

export interface Field<
  TName extends string = string,
  TType extends ast.PRIMITIVE = ast.PRIMITIVE,
> extends ast.Field {
  name: TName
  type: TType
}
