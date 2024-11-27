import type { ValidationAcceptor, ValidationChecks } from 'langium'

import type * as ast from '../generated/ast.js'
import type { FormMLDeclarationServices } from './formml-declaration-module.js'

export function registerFormMLDeclarationValidationChecks(
  services: FormMLDeclarationServices,
) {
  const registry = services.validation.ValidationRegistry
  const validator = services.validation.FormMLDeclarationValidator
  const checks: ValidationChecks<ast.FormMLAstType> = {
    FunctionDeclaration: validator.checkFunctionDeclarationParameters,
  }
  registry.register(checks, validator)
}

/**
 * Implementation of custom validations.
 */
export class FormMLDeclarationValidator {
  checkFunctionDeclarationParameters = (
    functionDeclaration: ast.FunctionDeclaration,
    accept: ValidationAcceptor,
  ) => {
    let hasOptional = false
    for (const parameter of functionDeclaration.parameters) {
      if (parameter.optional) {
        hasOptional = true
        continue
      }
      if (hasOptional) {
        accept(
          'error',
          'A required parameter cannot follow an optional parameter',
          {
            node: parameter,
          },
        )
      }
    }
  }
}
