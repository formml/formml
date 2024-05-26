import { Field } from '@formml/dsl'
import * as v from 'valibot'

import buildInputSchema from './buildInputSchema.js'

export type ValidationError = { message: string }

export type ValidationResult =
  | { errors: ValidationError[]; isValid: false }
  | { errors: undefined; isValid: true }

export type Validator<TInput = unknown> = (value: TInput) => ValidationResult

export const createInputValidator = <TInput = unknown>(
  schema: Field,
): Validator<TInput> => {
  const valibotSchema = buildInputSchema(schema)
  return (value: TInput): ValidationResult => {
    const result = v.safeParse(valibotSchema, value)
    return result.success
      ? { errors: undefined, isValid: true }
      : { errors: result.issues, isValid: false }
  }
}
