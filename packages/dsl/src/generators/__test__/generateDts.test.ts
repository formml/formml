import { readFile } from 'node:fs/promises'

import generateDts, { generateFallbackDts } from '../generateDts.js'

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

        export type _Form_ExampleForm = deps.Form<'ExampleForm', [deps.Field<'numField', 'num'>, deps.Field<'textField', 'text'>, deps.Field<'boolField', 'bool'>, deps.Field<'datetimeField', 'datetime'>, deps.Field<'decimalField', 'decimal'>]>

        export type _FormMLSchema = deps.FormMLSchema<_Form_ExampleForm>

        declare const ast: _FormMLSchema
        export default ast
        "
      `)
  })

  test('should name types with pascal case', async () => {
    const input = `
      form camelNameForm {
        num numField
      }
    `
    vi.mocked(readFile).mockResolvedValue(input)

    expect(await generateDts('form.formml', '@formml/any-package'))
      .toMatchInlineSnapshot(`
      "import deps from '@formml/any-package'

      export type _Form_CamelNameForm = deps.Form<'camelNameForm', [deps.Field<'numField', 'num'>]>

      export type _FormMLSchema = deps.FormMLSchema<_Form_CamelNameForm>

      declare const ast: _FormMLSchema
      export default ast
      "
    `)
  })

  test('should generate fallback typescript declaration', () => {
    expect(generateFallbackDts('@formml/any-package')).toMatchInlineSnapshot(`
      "import deps from '@formml/any-package'
      declare const ast: deps.FormMLSchema
      export default ast
      "
    `)
  })
})