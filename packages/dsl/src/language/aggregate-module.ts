import { EmptyFileSystem, inject } from 'langium'
import {
  DefaultSharedModuleContext,
  LangiumSharedServices,
  createDefaultModule,
  createDefaultSharedModule,
} from 'langium/lsp'

import { FormMLModule, FormMLServices } from './formml/formml-module.js'
import { registerFormMLValidationChecks } from './formml/formml-validator.js'
import {
  FormMLDeclarationModule,
  FormMLDeclarationServices,
} from './formml-declaration/formml-declaration-module.js'
import {
  FormMLDeclarationGeneratedModule,
  FormMLGeneratedModule,
  FormMLGeneratedSharedModule,
} from './generated/module.js'

/**
 * Create the full set of services required by Langium.
 *
 * First inject the shared services by merging two modules:
 *  - Langium default shared services
 *  - Services generated by langium-cli
 *
 * Then inject the language-specific services by merging three modules:
 *  - Langium default language-specific services
 *  - Services generated by langium-cli
 *  - Services specified in this file
 *
 * @param context Optional module context with the LSP connection
 * @returns An object wrapping the shared services and the language-specific services
 */
export function createAggregateServices(context: DefaultSharedModuleContext): {
  FormML: FormMLServices
  FormMLDeclaration: FormMLDeclarationServices
  shared: LangiumSharedServices
} {
  const shared = inject(
    createDefaultSharedModule(context),
    FormMLGeneratedSharedModule,
  )
  const FormML = inject(
    createDefaultModule({ shared }),
    FormMLGeneratedModule,
    FormMLModule,
  )
  const FormMLDeclaration = inject(
    createDefaultModule({ shared }),
    FormMLDeclarationGeneratedModule,
    FormMLDeclarationModule,
  )
  shared.ServiceRegistry.register(FormML)
  shared.ServiceRegistry.register(FormMLDeclaration)

  registerFormMLValidationChecks(FormML)
  // registerFormMLDeclarationValidationChecks(FormMLDeclaration)

  if (!context.connection) {
    // We don't run inside a language server
    // Therefore, initialize the configuration provider instantly
    void shared.workspace.ConfigurationProvider.initialized({})
  }
  return { FormML, FormMLDeclaration, shared }
}

export const createInMemoryAggregateServices = () =>
  createAggregateServices(EmptyFileSystem)
