import { FormMLSchema } from '../generated/ast.js'
import { FormMLLexerError, FormMLParserError, createParser } from '../parser.js'

describe('parser', () => {
  const parser = createParser()
  test('should return AST given valid schema', () => {
    const content = `
        form ExampleForm {
          num      numberField
          decimal  decimalField
          text     textField
          bool	   boolField
          datetime datetimeField
        }
      `
    const ast = parser(content)
    expect(ast).toBeDefined()
    assertType<FormMLSchema>(ast)
  })

  test('should throw error if schema has lexer error', () => {
    const content = `
        form ExampleForm {
          num numberField
          /* unclosed comment
        }
      `
    expect(() => parser(content)).toThrow(FormMLLexerError)
  })

  test('should throw error if schema has parser error', () => {
    const content = `
        form {
          num numberField
        }
      `
    expect(() => parser(content)).toThrow(FormMLParserError)
  })
})
