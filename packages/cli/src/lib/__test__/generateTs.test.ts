import { createFormMLParser } from '@formml/dsl'

import generateTs from '../generateTs.js'

describe('generateTs', () => {
  test('should generate typescript code', async () => {
    const input = `
      form ExampleForm {
        num      numField
        text     textField
        bool     boolField
        datetime datetimeField
        decimal  decimalField
      }
    `
    const ast = await createFormMLParser()(input)
    expect(generateTs(ast)).toMatchInlineSnapshot(`
      "import * as dsl from '@formml/dsl'

      export type _FormExampleForm = dsl.generics.Form<'ExampleForm', [dsl.generics.Field<'numField', 'num'>, dsl.generics.Field<'textField', 'text'>, dsl.generics.Field<'boolField', 'bool'>, dsl.generics.Field<'datetimeField', 'datetime'>, dsl.generics.Field<'decimalField', 'decimal'>]>

      export type _FormMLSchema = dsl.generics.FormMLSchema<_FormExampleForm>

      const json = {"node":{"$type":"FormMLSchema","form":{"$type":"Form","name":"ExampleForm","fields":[{"$type":"Field","type":"num","name":"numField","annotations":[]},{"$type":"Field","type":"text","name":"textField","annotations":[]},{"$type":"Field","type":"bool","name":"boolField","annotations":[]},{"$type":"Field","type":"datetime","name":"datetimeField","annotations":[]},{"$type":"Field","type":"decimal","name":"decimalField","annotations":[]}]}}}
      const ast: _FormMLSchema = dsl.utils.parse(json)

      export default ast
      "
    `)
  })
})
