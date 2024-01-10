import { createInMemoryServices } from '../formml-module.js'
import { FormMLSchema } from '../generated/ast.js'
import { FormMLParserError, createParser } from '../parser.js'

describe('grammar', () => {
  const services = createInMemoryServices()
  const serialize = (ast: FormMLSchema) =>
    services.FormML.serializer.JsonSerializer.serialize(ast, { space: 2 })
  const parser = createParser(services.FormML)

  describe('syntax', () => {
    test('comments', () => {
      const content = `
        // inline comment

        form Example {
          /* multiple line comment
          Number commentedField
          */

          Number numberField
        }
      `

      const ast = parser(content)
      expect(serialize(ast)).toMatchSnapshot()
    })
  })

  describe('simple fields', () => {
    test('primitives', () => {
      const content = `
        form ExampleForm {
          Number   numberField
          Currency currencyField
          Text     textField
          Boolean	 booleanField
          DateTime datetimeField
        }
      `
      const ast = parser(content)
      expect(serialize(ast)).toMatchSnapshot()
    })

    test('invalidate unknown types', () => {
      const content = `
        form ExampleForm {
          Unknown invalidType
        }
      `
      expect(() => parser(content)).toThrow(FormMLParserError)
    })
  })
})
