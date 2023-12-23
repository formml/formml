import { parseHelper } from 'langium/test'
import { createInMemoryServices } from '../formml-module.js'
import { FormML } from '../generated/ast.js'

describe('grammar', () => {
  const services = createInMemoryServices()
  const serialize = (ast: FormML) =>
    services.FormML.serializer.JsonSerializer.serialize(ast, { space: 2 })
  const parser = parseHelper<FormML>(services.FormML)

  describe('syntax', () => {
    test('comments', async () => {
      const content = `
        // inline comment

        form Example {
          /* multiple line comment
          Number   aField
          */
        }
      `

      const ast = (await parser(content)).parseResult.value
      expect(serialize(ast)).toMatchSnapshot()
    })
  })

  describe('simple fields', () => {
    test('primitives', async () => {
      const content = `
        form ExampleForm {
          Number   numberField
          Currency currencyField
          Text     textField
          Boolean	 booleanField
          Date		 dateField
        }
      `
      const ast = (await parser(content)).parseResult.value
      expect(serialize(ast)).toMatchSnapshot()
    })
  })
})
