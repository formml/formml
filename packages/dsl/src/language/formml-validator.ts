// import { ValidationAcceptor, ValidationChecks } from 'langium'
// import { FormMLAstType } from './generated/ast'
// import type { FormMLServices } from './formml-module'

// /**
//  * Register custom validation checks.
//  */
// export function registerValidationChecks(services: FormMLServices) {
//   const registry = services.validation.ValidationRegistry
//   const validator = services.validation.FormMLValidator
//   const checks: ValidationChecks<FormMLAstType> = {
//     Person: validator.checkPersonStartsWithCapital,
//   }
//   registry.register(checks, validator)
// }

// /**
//  * Implementation of custom validations.
//  */
// export class FormMLValidator {
//   checkPersonStartsWithCapital(
//     person: Person,
//     accept: ValidationAcceptor
//   ): void {
//     if (person.name) {
//       const firstChar = person.name.substring(0, 1)
//       if (firstChar.toUpperCase() !== firstChar) {
//         accept('warning', 'Person name should start with a capital.', {
//           node: person,
//           property: 'name',
//         })
//       }
//     }
//   }
// }
