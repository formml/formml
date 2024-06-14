import { ValidationAcceptor, ValidationChecks } from 'langium'

import * as ast from '../generated/ast.js'
import { FormMLDeclarationServices } from './formml-declaration-module.js'

/**
 * Register custom validation checks.
 */
export function registerFormMLDeclarationValidationChecks(
  services: FormMLDeclarationServices,
) {
  const registry = services.validation.ValidationRegistry
  const validator = services.validation.FormMLDeclarationValidator
  const checks: ValidationChecks<ast.FormMLAstType> = {
    AnnotationDeclaration: validator.checkAnnotationDeclarationParameters,
  }
  registry.register(checks, validator)
}

/**
 * Implementation of custom validations.
 */
export class FormMLDeclarationValidator {
  checkAnnotationDeclarationParameters = (
    annotation: ast.AnnotationDeclaration,
    accept: ValidationAcceptor,
  ) => {
    let hasOptional = false
    for (const parameter of annotation.parameters) {
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
