import { FormMLSchema } from '../generated/ast.js'
import { FormMLLexerError, FormMLParserError, createParser } from '../parser.js'

describe('parser', () => {
  const parser = createParser()
  test('should return AST given valid schema', () => {
    const content = `
        form ExampleForm {
          Number   numberField
          Currency currencyField
          Text     textField
          Boolean	 booleanField
          Date		 dateField
        }
      `
    const ast = parser(content)
    expect(ast).toBeDefined()
    assertType<FormMLSchema>(ast)
  })

  test('should throw error if schema has lexer error', () => {
    const content = `
        form ExampleForm {
          Number numberField
          /* unclosed comment
        }
      `
    expect(() => parser(content)).toThrow(FormMLLexerError)
  })

  test('should throw error if schema has parser error', () => {
    const content = `
        form {
          Number numberField
        }
      `
    expect(() => parser(content)).toThrow(FormMLParserError)
  })
})
