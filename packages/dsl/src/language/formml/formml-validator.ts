import type { Range } from 'vscode-languageserver-types'

import { GrammarUtils, ValidationAcceptor, ValidationChecks } from 'langium'

import type { FormMLServices } from './formml-module.js'

import * as ast from '../generated/ast.js'
import * as t from '../type-system/index.js'

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

    const paramDeclaration = Object.fromEntries(
      declaration.parameters.map((p) => [p.name, p]),
    )
    const paramNames = Object.keys(paramDeclaration)

    const expectedLength = paramNames.length
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
        if (!(arg.name in paramDeclaration)) {
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

        const argType = t.inferType(arg.value)
        const declaredType = t.fromDeclaration(paramDeclaration[arg.name]?.type)
        if (!t.isAssignable(argType, declaredType)) {
          accept(
            'error',
            `Argument of type '${argType.toString()}' is not assignable to parameter of type '${declaredType.toString()}'.`,
            { node: arg },
          )
        }
      }
      if (ast.isPositionalArgument(arg)) {
        const param: ast.Parameter | undefined = declaration.parameters[index] // may out of range
        param && assignedParams.add(param.name)

        const argType = t.inferType(arg.value)
        const declaredType = t.fromDeclaration(param?.type)
        if (!t.isAssignable(argType, declaredType)) {
          accept(
            'error',
            `Argument of type '${argType.toString()}' is not assignable to parameter of type '${declaredType.toString()}'.`,
            { node: arg },
          )
        }
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
        'Expected an annotation call immediately after "@" sign, but found whitespaces.',
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
