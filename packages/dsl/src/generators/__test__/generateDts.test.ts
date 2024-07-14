import { readFile } from 'node:fs/promises'

import generateDts from '../generateDts.js'

vi.mock('node:fs/promises')

describe('generateDts', () => {
  test('should generate typescript declaration', async () => {
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

    expect(await generateDts('form.formml', '@formml/any-package'))
      .toMatchInlineSnapshot(`
        "import deps from '@formml/any-package'

        export type _FormExampleForm = deps.Form<'ExampleForm', [deps.Field<'numField', 'num'>, deps.Field<'textField', 'text'>, deps.Field<'boolField', 'bool'>, deps.Field<'datetimeField', 'datetime'>, deps.Field<'decimalField', 'decimal'>]>

        export type _FormMLSchema = deps.FormMLSchema<_FormExampleForm>

        declare const ast: _FormMLSchema
        export default ast
        "
      `)
  })
})
