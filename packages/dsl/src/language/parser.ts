import { FormMLServices, createInMemoryServices } from './formml-module.js'
import { ParseResult } from 'langium'
import { FormMLSchema } from './generated/ast.js'

export class FormMLParseError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'FormMLParseError'
  }
}

export class FormMLParserError extends FormMLParseError {
  constructor(public readonly parserErrors: ParseResult['parserErrors']) {
    super(
      `Failed to parse schema, underlying parser errors are:

      ${parserErrors.map((e) => e.message).join('\n\n')}`,
    )
    this.name = 'FormMLParserError'
  }
}

export class FormMLLexerError extends FormMLParseError {
  constructor(public readonly lexerErrors: ParseResult['lexerErrors']) {
    super(
      `Failed to parse schema, underlying lexer errors are:

      ${lexerErrors.map((e) => e.message).join('\n\n')}`,
    )
    this.name = 'FormMLLexerError'
  }
}

export const createParser = (services?: FormMLServices) => {
  const _services = services ?? createInMemoryServices().FormML
  return (schema: string) => {
    const parseResult =
      _services.parser.LangiumParser.parse<FormMLSchema>(schema)
    if (parseResult.lexerErrors.length > 0) {
      throw new FormMLLexerError(parseResult.lexerErrors)
    }
    if (parseResult.parserErrors.length > 0) {
      throw new FormMLParserError(parseResult.parserErrors)
    }
    return parseResult.value
  }
}
