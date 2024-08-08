import { clearDocuments } from 'langium/test'

import { createAggregateServices } from '../../index.js'
import generateDts, { generateFallbackDts } from '../generateDts.js'

describe('generateDts', () => {
  const mockReadFile = vi.fn()
  const services = createAggregateServices({
    fileSystemProvider: () => ({
      readDirectory: vi.fn(),
      readFile: mockReadFile,
    }),
  }).FormML

  afterEach(() => clearDocuments(services.shared))

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
    mockReadFile.mockResolvedValue(input)

    expect(await generateDts('form.formml', '@formml/any-package', services))
      .toMatchInlineSnapshot(`
        "import * as deps from '@formml/any-package'

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
    mockReadFile.mockResolvedValue(input)

    expect(await generateDts('form.formml', '@formml/any-package', services))
      .toMatchInlineSnapshot(`
        "import * as deps from '@formml/any-package'

        export type _Form_CamelNameForm = deps.Form<'camelNameForm', [deps.Field<'numField', 'num'>]>

        export type _FormMLSchema = deps.FormMLSchema<_Form_CamelNameForm>

        declare const ast: _FormMLSchema
        export default ast
        "
      `)
  })

  test('should generate fallback typescript declaration', () => {
    expect(generateFallbackDts('@formml/any-package')).toMatchInlineSnapshot(`
      "import * as deps from '@formml/any-package'
      declare const ast: deps.FormMLSchema
      export default ast
      "
    `)
  })
})
