import type { FormMLSchema } from '@formml/dsl'
import type { GenericIssue } from 'valibot'

import { safeParse } from 'valibot'

import { buildValibotSchema } from './buildValibotSchema.js'

export type ValidationError = GenericIssue

export type ValidationResult =
  | { errors: ValidationError[]; isValid: false }
  | { errors: undefined; isValid: true }

export type Validator<TInput = unknown> = (value: TInput) => ValidationResult

/**
 * Validates unknown data against a FormML schema.
 *
 * @param data - The data to validate
 * @param schema - The FormML schema to validate against
 * @returns A validation result object indicating success or failure
 *
 * @example
 * const schema = formml`
 *   form user {
 *     ⁣@required
 *     text name
 *     ⁣@required
 *     num age
 *     datetime birthday
 *   }
 * `
 *
 * const result1 = validate(
 *   {
 *     name: 'John',
 *     age: 25,
 *     birthday: new Date('1999-12-31'),
 *   },
 *   schema,
 * )
 * // { isValid: true }
 *
 * const result2 = validate({ name: 'Jane' }, schema)
 * // { isValid: false, errors: ValidationError[] }
 */
export function validate(
  data: unknown,
  schema: FormMLSchema,
): ValidationResult {
  const valibotSchema = buildValibotSchema(schema.form)
  const result = safeParse(valibotSchema, data)
  return result.success
    ? { errors: undefined, isValid: true }
    : { errors: result.issues, isValid: false }
}
