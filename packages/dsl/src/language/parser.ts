import { LangiumDocument, ParseResult, URI } from 'langium'
import { Diagnostic } from 'vscode-languageserver-types'

import { createInMemoryAggregateServices } from './aggregate-module.js'
import { FormMLServices } from './formml/formml-module.js'
import { FormMLSchema } from './generated/ast.js'

export class FormMLParserError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'FormMLParseError'
  }
}

export class FormMLParserParsingError extends FormMLParserError {
  constructor(public readonly parserErrors: ParseResult['parserErrors']) {
    super(
      'Failed to parse schema, underlying parser errors are:\n\n' +
        parserErrors.map((e) => e.message).join('\n\n'),
    )
    this.name = 'FormMLParserParsingError'
  }
}

export class FormMLParserLexingError extends FormMLParserError {
  constructor(public readonly lexerErrors: ParseResult['lexerErrors']) {
    super(
      'Failed to parse schema, underlying lexer errors are:\n\n' +
        lexerErrors.map((e) => e.message).join('\n\n'),
    )
    this.name = 'FormMLParserLexingError'
  }
}

export class FormMLParserValidationError extends FormMLParserError {
  constructor(public readonly validationErrors: Diagnostic[]) {
    super(
      'Failed to parse schema, validation errors are:\n\n' +
        validationErrors.map((e) => e.message).join('\n\n'),
    )
    this.name = 'FormMLParserValidationError'
  }
}

/**
 * @deprecated Use `createFormMLParser` instead.
 */
export const createParser = (services?: FormMLServices) => {
  const _services = services ?? createInMemoryAggregateServices().FormML
  return (schema: string) => {
    const parseResult =
      _services.parser.LangiumParser.parse<FormMLSchema>(schema)
    if (parseResult.lexerErrors.length > 0) {
      throw new FormMLParserLexingError(parseResult.lexerErrors)
    }
    if (parseResult.parserErrors.length > 0) {
      throw new FormMLParserParsingError(parseResult.parserErrors)
    }
    return parseResult.value
  }
}

interface FormMLParser {
  (text: string, uri?: string): Promise<FormMLSchema>
  (uri: URI): Promise<FormMLSchema>
}

export function createFormMLParser(
  services = createInMemoryAggregateServices().FormML,
): FormMLParser {
  let count = 0
  const generateUri = () => `file:///generated/${count++}.formml`

  const initialization =
    services.shared.workspace.WorkspaceManager.initializeWorkspace([])

  return async function parse(
    arg1: URI | string,
    arg2: string = generateUri(),
  ) {
    await initialization

    let document: LangiumDocument
    if (typeof arg1 === 'string') {
      const [text, uri] = [arg1, arg2]
      document = services.shared.workspace.LangiumDocuments.createDocument(
        URI.parse(uri),
        text,
      )
    } else {
      const uri = arg1
      document =
        await services.shared.workspace.LangiumDocuments.getOrCreateDocument(
          uri,
        )
    }

    await services.shared.workspace.DocumentBuilder.build([document], {
      validation: true,
    })

    if (document.parseResult.lexerErrors.length > 0) {
      throw new FormMLParserLexingError(document.parseResult.lexerErrors)
    }
    if (document.parseResult.parserErrors.length > 0) {
      throw new FormMLParserParsingError(document.parseResult.parserErrors)
    }
    const validationErrors = (document.diagnostics ?? []).filter(
      (e) => e.severity === 1,
    )
    if (validationErrors.length > 0) {
      throw new FormMLParserValidationError(validationErrors)
    }
    return document.parseResult.value as FormMLSchema
  }
}
