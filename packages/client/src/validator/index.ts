import type { Validator } from '@formml/core'
import type { Field, Form } from '@formml/dsl'

import { safeParse } from 'valibot'

import buildInputSchema from './buildInputSchema.js'

export const createInputValidator = <TInput = unknown>(
  schema: Field | Form,
): Validator<TInput> => {
  const valibotSchema = buildInputSchema(schema)
  return (value) => {
    const result = safeParse(valibotSchema, value)
    return result.success
      ? { errors: undefined, isValid: true }
      : { errors: result.issues, isValid: false }
  }
}
