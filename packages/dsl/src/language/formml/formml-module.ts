import { type Module } from 'langium'
import { type LangiumServices, type PartialLangiumServices } from 'langium/lsp'

import { FormMLValidator } from './formml-validator.js'

/**
 * Declaration of custom services - add your own service classes here.
 */
export type FormMLAddedServices = {
  validation: {
    FormMLValidator: FormMLValidator
  }
}

/**
 * Union of Langium default services and your custom services - use this as constructor parameter
 * of custom service classes.
 */
export type FormMLServices = LangiumServices & FormMLAddedServices

/**
 * Dependency injection module that overrides Langium default services and contributes the
 * declared custom services. The Langium defaults can be partially specified to override only
 * selected services, while the custom services must be fully specified.
 */
export const FormMLModule: Module<
  FormMLServices,
  PartialLangiumServices & FormMLAddedServices
> = {
  validation: {
    FormMLValidator: () => new FormMLValidator(),
  },
}
