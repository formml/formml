import { type Module, inject } from 'langium'
import {
  DefaultSharedModuleContext,
  type LangiumServices,
  LangiumSharedServices,
  type PartialLangiumServices,
  createDefaultModule,
  createDefaultSharedModule,
} from 'langium/lsp'

import {
  FormMLDeclarationGeneratedModule,
  FormMLGeneratedSharedModule,
} from '../generated/module.js'
import {
  FormMLDeclarationValidator,
  registerFormMLDeclarationValidationChecks,
} from './formml-declaration-validator.js'

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

export function createFormMLDeclarationServices(
  context: DefaultSharedModuleContext,
): {
  FormMLDeclaration: FormMLDeclarationServices
  shared: LangiumSharedServices
} {
  const shared = inject(
    createDefaultSharedModule(context),
    FormMLGeneratedSharedModule,
  )
  const FormMLDeclaration = inject(
    createDefaultModule({ shared }),
    FormMLDeclarationGeneratedModule,
    FormMLDeclarationModule,
  )
  shared.ServiceRegistry.register(FormMLDeclaration)

  registerFormMLDeclarationValidationChecks(FormMLDeclaration)

  if (!context.connection) {
    // We don't run inside a language server
    // Therefore, initialize the configuration provider instantly
    void shared.workspace.ConfigurationProvider.initialized({})
  }
  return { FormMLDeclaration, shared }
}
