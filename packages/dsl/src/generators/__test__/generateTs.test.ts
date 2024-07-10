import { readFile } from 'node:fs/promises'

import generateTs from '../generateTs.js'

vi.mock('node:fs/promises')

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
    vi.mocked(readFile).mockResolvedValue(input)

    expect(await generateTs('form.formml', '@formml/any-package'))
      .toMatchInlineSnapshot(`
        "import * as utils from '@formml/any-package'

        export type _FormExampleForm = utils.Form<'ExampleForm', [utils.Field<'numField', 'num'>, utils.Field<'textField', 'text'>, utils.Field<'boolField', 'bool'>, utils.Field<'datetimeField', 'datetime'>, utils.Field<'decimalField', 'decimal'>]>

        export type _FormMLSchema = utils.FormMLSchema<_FormExampleForm>

        const json = {"node":{"$type":"FormMLSchema","form":{"$type":"Form","name":"ExampleForm","fields":[{"$type":"Field","type":"num","name":"numField","annotations":[]},{"$type":"Field","type":"text","name":"textField","annotations":[]},{"$type":"Field","type":"bool","name":"boolField","annotations":[]},{"$type":"Field","type":"datetime","name":"datetimeField","annotations":[]},{"$type":"Field","type":"decimal","name":"decimalField","annotations":[]}]}}}
        const ast: _FormMLSchema = utils.parse(json)

        export default ast
        "
      `)
  })
})
