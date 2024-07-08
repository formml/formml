import * as ast from '../../generated/ast.js'
import { Field, Form, FormMLSchema } from '../genericTypes.js'

describe('genericTypes', () => {
  test('should match original types when given no arguments', () => {
    expectTypeOf<FormMLSchema>().toMatchTypeOf<ast.FormMLSchema>()
    expectTypeOf<Form>().toMatchTypeOf<ast.Form>()
    expectTypeOf<Field>().toMatchTypeOf<ast.Field>()
  })

  test('should be more specific when given arguments', () => {
    type MyFieldA = Field<'numField', 'num'>
    type MyFieldB = Field<'textField', 'text'>
    type MyForm = Form<'myForm', [MyFieldA, MyFieldB]>
    type MySchema = FormMLSchema<MyForm>

    expectTypeOf<MySchema>().toMatchTypeOf<{ form: MyForm }>()
    expectTypeOf<MyForm>().toMatchTypeOf<{
      fields: [MyFieldA, MyFieldB]
      name: 'myForm'
    }>()
    expectTypeOf<MyFieldA>().toMatchTypeOf<{
      name: 'numField'
      type: 'num'
    }>()
    expectTypeOf<MyFieldB>().toMatchTypeOf<{
      name: 'textField'
      type: 'text'
    }>()
  })
})
