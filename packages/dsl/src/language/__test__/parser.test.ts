import { FormMLSchema } from '../generated/ast.js'
import {
  FormMLParserLexingError,
  FormMLParserParsingError,
  FormMLParserValidationError,
  createFormMLParser,
} from '../parser.js'

describe('parser', () => {
  describe('createFormMLParser', () => {
    const parser = createFormMLParser()
    test('should return AST given valid schema', async () => {
      const content = `
        form ExampleForm {
          num      numberField
          decimal  decimalField
          text     textField
          bool	   boolField
          datetime datetimeField
        }
      `
      const ast = await parser(content)
      expect(ast).toBeDefined()
      assertType<FormMLSchema>(ast)
    })

    test('should throw error if schema has lexer error', async () => {
      const content = `
        form ExampleForm {
          num numberField
          /* unclosed comment
        }
      `
      await expect(parser(content)).rejects.toThrow(FormMLParserLexingError)
    })

    test('should throw error if schema has parser error', async () => {
      const content = `
        form {
          num numberField
        }
      `
      await expect(parser(content)).rejects.toThrow(FormMLParserParsingError)
    })

    test('should throw error if schema has validation error', async () => {
      const content = `
        form ExampleForm {
          @unknown
          num numberField
        }
      `
      await expect(parser(content)).rejects.toThrow(FormMLParserValidationError)
    })
  })
})
