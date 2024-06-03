import type { Range } from 'vscode-languageserver-types'

import { GrammarUtils, ValidationAcceptor, ValidationChecks } from 'langium'

import type { FormMLServices } from './formml-module.js'

import * as ast from './generated/ast.js'

/**
 * Register custom validation checks.
 */
export function registerValidationChecks(services: FormMLServices) {
  const registry = services.validation.ValidationRegistry
  const validator = services.validation.FormMLValidator
  const checks: ValidationChecks<ast.FormMLAstType> = {
    Annotation: [
      validator.checkAnnotationCallArguments,
      validator.checkNoSpacesAfterAnnotationSign,
    ],
  }
  registry.register(checks, validator)
}

/**
 * Implementation of custom validations.
 */
export class FormMLValidator {
  checkAnnotationCallArguments = (
    annotation: ast.Annotation,
    accept: ValidationAcceptor,
  ) => {
    const namedArgs: ast.NamedArgument[] = []
    for (const arg of annotation.args) {
      if (ast.isNamedArgument(arg)) {
        namedArgs.push(arg)
      }
      if (ast.isPositionalArgument(arg)) {
        namedArgs.forEach((namedArg) =>
          accept(
            'error',
            'Named argument can only appear after all positional arguments.',
            { node: namedArg },
          ),
        )
        namedArgs.length = 0 // reset array
      }
    }
  }

  checkNoSpacesAfterAnnotationSign = (
    annotation: ast.Annotation,
    accept: ValidationAcceptor,
  ) => {
    if (!annotation.$cstNode) return

    const atSignNode = GrammarUtils.findNodeForKeyword(annotation.$cstNode, '@')
    const nameNode = GrammarUtils.findNodeForProperty(
      annotation.$cstNode,
      'name',
    )

    const isAdjacent = (firstRange: Range, secondRange: Range) =>
      firstRange.end.line === secondRange.start.line &&
      firstRange.end.character === secondRange.start.character

    if (
      atSignNode &&
      nameNode &&
      !isAdjacent(atSignNode.range, nameNode.range)
    ) {
      accept(
        'error',
        'Expect an annotation call immediately after "@" sign, but found whitespaces.',
        {
          node: annotation,
          range: {
            end: nameNode.range.start,
            start: atSignNode.range.end,
          },
        },
      )
    }
  }
}
