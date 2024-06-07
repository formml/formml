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
      validator.checkAnnotationCallArgumentsAssignment,
      validator.checkAnnotationCallArgumentsOrder,
      validator.checkNoSpacesAfterAnnotationSign,
    ],
  }
  registry.register(checks, validator)
}

/**
 * Implementation of custom validations.
 */
export class FormMLValidator {
  checkAnnotationCallArgumentsAssignment = (
    annotation: ast.Annotation,
    accept: ValidationAcceptor,
  ) => {
    const declaration = annotation.call.ref
    if (!declaration) return

    const paramNames = declaration.parameters.map((p) => p.name)
    const paramNameSet = new Set(paramNames)

    const expectedLength = paramNameSet.size
    const actualLength = annotation.args.length
    if (actualLength > expectedLength) {
      const firstExtra = annotation.args[expectedLength].$cstNode
      const lastExtra = annotation.args[actualLength - 1].$cstNode
      const range = firstExtra &&
        lastExtra && {
          end: lastExtra.range.end,
          start: firstExtra.range.start,
        }

      accept(
        'error',
        `Expected ${expectedLength} arguments, but got ${actualLength}.`,
        {
          node: annotation,
          range,
        },
      )
    }

    const assignedParams = new Set<string>()

    annotation.args.forEach((arg, index) => {
      if (ast.isNamedArgument(arg)) {
        if (!paramNameSet.has(arg.name)) {
          accept(
            'error',
            `Unknown parameter "${arg.name}", expected one of ${paramNames
              .map((k) => `"${k}"`)
              .join(' | ')}.`,
            { node: arg },
          )
        }
        if (assignedParams.has(arg.name)) {
          accept('error', `Duplicate assignment to parameter "${arg.name}".`, {
            node: arg,
          })
        }
        assignedParams.add(arg.name)
      }
      if (ast.isPositionalArgument(arg)) {
        const paramName: string | undefined = paramNames[index] // may out of range
        paramName && assignedParams.add(paramName)
      }
    })
  }

  checkAnnotationCallArgumentsOrder = (
    annotation: ast.Annotation,
    accept: ValidationAcceptor,
  ) => {
    const namedArgs: ast.NamedArgument[] = []
    for (const arg of annotation.args) {
      if (ast.isNamedArgument(arg)) {
        namedArgs.push(arg)
      }
      if (ast.isPositionalArgument(arg)) {
        for (const namedArg of namedArgs) {
          accept(
            'error',
            'Named argument can only appear after all positional arguments.',
            { node: namedArg },
          )
        }
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
