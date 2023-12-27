import { createInMemoryServices, createParser } from '../formml-module.js'
import { FormMLSchema } from '../generated/ast.js'

describe('grammar', () => {
  const services = createInMemoryServices()
  const serialize = (ast: FormMLSchema) =>
    services.FormML.serializer.JsonSerializer.serialize(ast, { space: 2 })
  const parser = createParser(services.FormML)

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

      const ast = (await parser(content)).value
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
      const ast = (await parser(content)).value
      expect(serialize(ast)).toMatchSnapshot()
    })

    test('invalidate unknown types', async () => {
      const content = `
        form ExampleForm {
          Unknown invalidType
        }
      `
      const parseResult = await parser(content)
      expect(serialize(parseResult.value)).toMatchSnapshot()
      expect(parseResult.parserErrors.length).toBeGreaterThan(0)
    })
  })
})
