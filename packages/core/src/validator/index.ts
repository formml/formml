import type { GenericIssue } from 'valibot'

import buildSchema from './buildSchema.js'

export { buildSchema }

export type ValidationError = GenericIssue

export type ValidationResult =
  | { errors: ValidationError[]; isValid: false }
  | { errors: undefined; isValid: true }

export type Validator<TInput = unknown> = (value: TInput) => ValidationResult
