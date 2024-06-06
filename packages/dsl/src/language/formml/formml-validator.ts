import type { Range } from 'vscode-languageserver-types'

import { GrammarUtils, ValidationAcceptor, ValidationChecks } from 'langium'

import type { FormMLServices } from './formml-module.js'

import * as ast from '../generated/ast.js'

/**
 * Register custom validation checks.
 */
export function registerFormMLValidationChecks(services: FormMLServices) {
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
    const declaration = annotation.call.ref
    if (declaration) {
      if (annotation.args.length > declaration.parameters.length) {
        accept(
          'error',
          `Expected ${declaration.parameters.length} arguments, but got ${annotation.args.length}.`,
          {
            node: annotation,
            range: {
              end: annotation.args[annotation.args.length - 1].$cstNode!.range
                .end,
              start:
                annotation.args[declaration.parameters.length].$cstNode!.range
                  .start,
            },
          },
        )
      }
    }
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
    const callNode = GrammarUtils.findNodeForProperty(
      annotation.$cstNode,
      'call',
    )

    const isAdjacent = (firstRange: Range, secondRange: Range) =>
      firstRange.end.line === secondRange.start.line &&
      firstRange.end.character === secondRange.start.character

    if (
      atSignNode &&
      callNode &&
      !isAdjacent(atSignNode.range, callNode.range)
    ) {
      accept(
        'error',
        'Expect an annotation call immediately after "@" sign, but found whitespaces.',
        {
          node: annotation,
          range: {
            end: callNode.range.start,
            start: atSignNode.range.end,
          },
        },
      )
    }
  }
}
