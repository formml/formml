import { type Module } from 'langium'
import { type LangiumServices, type PartialLangiumServices } from 'langium/lsp'

import { FormMLDeclarationValidator } from './formml-declaration-validator.js'

// import {
//   FormMLDeclarationValidator,
//   registerValidationChecks,
// } from './formml-validator.js'

/**
 * Declaration of custom services - add your own service classes here.
 */
export type FormMLDeclarationAddedServices = {
  validation: {
    FormMLDeclarationValidator: FormMLDeclarationValidator
  }
}

/**
 * Union of Langium default services and your custom services - use this as constructor parameter
 * of custom service classes.
 */
export type FormMLDeclarationServices = LangiumServices &
  FormMLDeclarationAddedServices

/**
 * Dependency injection module that overrides Langium default services and contributes the
 * declared custom services. The Langium defaults can be partially specified to override only
 * selected services, while the custom services must be fully specified.
 */
export const FormMLDeclarationModule: Module<
  FormMLDeclarationServices,
  PartialLangiumServices & FormMLDeclarationAddedServices
> = {
  validation: {
    FormMLDeclarationValidator: () => new FormMLDeclarationValidator(),
  },
}
