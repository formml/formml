import type { Field, Form } from '@formml/dsl'

import { type Validator, buildSchema } from '@formml/core'
import * as v from 'valibot'

import { fromString } from './js-type/string/conversion.js'
import { schemas } from './js-type/string/validation.js'

const preprocess = {
  bool: v.pipe(schemas.bool, v.transform(fromString('bool'))),
  datetime: v.pipe(schemas.datetime, v.transform(fromString('datetime'))),
  decimal: v.pipe(schemas.decimal, v.transform(fromString('decimal'))),
  num: v.pipe(schemas.num, v.transform(fromString('num'))),
  text: v.pipe(schemas.text, v.transform(fromString('text'))),
}

export const createInputValidator = <TInput = unknown>(
  schema: Field | Form,
): Validator<TInput> => {
  const valibotSchema = buildSchema(schema, preprocess)
  return (value) => {
    const result = v.safeParse(valibotSchema, value)
    return result.success
      ? { errors: undefined, isValid: true }
      : { errors: result.issues, isValid: false }
  }
}
