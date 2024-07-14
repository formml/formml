import { readFile } from 'node:fs/promises'

import generateJs from '../generateJs.js'

vi.mock('node:fs/promises')

describe('generateJs', () => {
  test('should generate js code', async () => {
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

    expect(await generateJs('form.formml', '@formml/any-package'))
      .toMatchInlineSnapshot(`
        "import deps from '@formml/any-package'

        const json = "{\\"node\\":{\\"$type\\":\\"FormMLSchema\\",\\"form\\":{\\"$type\\":\\"Form\\",\\"name\\":\\"ExampleForm\\",\\"fields\\":[{\\"$type\\":\\"Field\\",\\"type\\":\\"num\\",\\"name\\":\\"numField\\",\\"annotations\\":[]},{\\"$type\\":\\"Field\\",\\"type\\":\\"text\\",\\"name\\":\\"textField\\",\\"annotations\\":[]},{\\"$type\\":\\"Field\\",\\"type\\":\\"bool\\",\\"name\\":\\"boolField\\",\\"annotations\\":[]},{\\"$type\\":\\"Field\\",\\"type\\":\\"datetime\\",\\"name\\":\\"datetimeField\\",\\"annotations\\":[]},{\\"$type\\":\\"Field\\",\\"type\\":\\"decimal\\",\\"name\\":\\"decimalField\\",\\"annotations\\":[]}]}}}"
        const ast = deps.parse(json)
        export default ast
        "
      `)
  })

  test('should escape special characters in generated js code', async () => {
    const input = `
      form ExampleForm {
        @required(message: '" \\n \\t')
        text textField
      }
    `
    vi.mocked(readFile).mockResolvedValue(input)

    expect(await generateJs('form.formml', '@formml/any-package'))
      .toMatchInlineSnapshot(`
        "import deps from '@formml/any-package'

        const json = "{\\"node\\":{\\"$type\\":\\"FormMLSchema\\",\\"form\\":{\\"$type\\":\\"Form\\",\\"name\\":\\"ExampleForm\\",\\"fields\\":[{\\"$type\\":\\"Field\\",\\"annotations\\":[{\\"$type\\":\\"Annotation\\",\\"args\\":[{\\"$type\\":\\"NamedArgument\\",\\"name\\":\\"message\\",\\"value\\":{\\"$type\\":\\"TextLiteral\\",\\"value\\":\\"\\\\\\" \\\\n \\\\t\\"}}],\\"call\\":{\\"$refText\\":\\"required\\",\\"$ref\\":\\"builtin:/annotations.d.formml#/declarations@0\\"}}],\\"type\\":\\"text\\",\\"name\\":\\"textField\\"}]}},\\"references\\":{\\"builtin:/annotations.d.formml\\":{\\"declarations\\":[{\\"$type\\":\\"AnnotationDeclaration\\",\\"name\\":\\"required\\",\\"parameters\\":[{\\"$type\\":\\"Parameter\\",\\"name\\":\\"message\\",\\"optional\\":true,\\"type\\":{\\"$type\\":\\"TextTypeExpr\\",\\"name\\":\\"text\\"}}]}]}}}"
        const ast = deps.parse(json)
        export default ast
        "
      `)
  })
})
