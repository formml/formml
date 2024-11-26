import type { FormMLSchema } from '@formml/dsl'
import type { GenericIssue } from 'valibot'

import { safeParse } from 'valibot'

import { buildValibotSchema } from './buildValibotSchema.js'

export type ValidationError = GenericIssue

export type ValidationResult =
  | { errors: ValidationError[]; isValid: false }
  | { errors: undefined; isValid: true }

export type Validator<TInput = unknown> = (value: TInput) => ValidationResult

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
