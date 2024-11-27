import type { ValidationAcceptor, ValidationChecks } from 'langium'
import type { Range } from 'vscode-languageserver-types'

import { GrammarUtils } from 'langium'

import type { FormMLServices } from './formml-module.js'

import * as ast from '../generated/ast.js'
import * as t from '../type-system/index.js'

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
// TODO: Unique identifier (2024-11-14: Does this mean that one annotation can only be used once?)
// TODO: Annotation must be a function with specific return type, should be checked in validation & completion
export class FormMLValidator {
  checkAnnotationCallArgumentsAssignment = (
    annotation: ast.Annotation,
    accept: ValidationAcceptor,
  ) => {
    const declaration = annotation.call.ref
    if (!declaration) return

    const allParamDeclaration = Object.fromEntries(
      declaration.parameters.map((p) => [p.name, p]),
    )
    const allParamNames = Object.keys(allParamDeclaration)
    const requiredParamNames = allParamNames.filter(
      (name) => allParamDeclaration[name].optional === false,
    )

    const minLength = requiredParamNames.length
    const maxLength = allParamNames.length
    const expectedLength =
      minLength === maxLength ? minLength : `${minLength} - ${maxLength}`
    const actualLength = annotation.args.length
    if (actualLength > maxLength) {
      const firstExtra = annotation.args[maxLength].$cstNode
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
        if (!(arg.name in allParamDeclaration)) {
          accept(
            'error',
            `Unknown parameter "${arg.name}", expected one of ${allParamNames
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
        const declaredType = t.evaluate(allParamDeclaration[arg.name]?.type) // may not exist
        if (!t.isAssignable(argType, declaredType)) {
          accept(
            'error',
            `Argument of type '${t.stringify(
              argType,
            )}' is not assignable to parameter of type '${t.stringify(
              declaredType,
            )}'.`,
            { node: arg },
          )
        }
      }
      if (ast.isPositionalArgument(arg)) {
        const param = declaration.parameters[index] as ast.Parameter | undefined // may out of range
        if (param) assignedParams.add(param.name)

        const argType = t.inferType(arg.value)
        const declaredType = t.evaluate(param?.type)
        if (!t.isAssignable(argType, declaredType)) {
          accept(
            'error',
            `Argument of type '${t.stringify(
              argType,
            )}' is not assignable to parameter of type '${t.stringify(
              declaredType,
            )}'.`,
            { node: arg },
          )
        }
      }
    })

    const differences = requiredParamNames.filter(
      (name) => !assignedParams.has(name),
    )
    if (differences.length > 0) {
      accept(
        'error',
        `Missing required parameter${
          differences.length > 1 ? 's' : ''
        }: ${differences.map((k) => `"${k}"`).join(', ')}.`,
        { node: annotation, property: 'args' },
      )
    }
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
