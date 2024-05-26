import { Field } from '@formml/dsl'
import * as v from 'valibot'

import { parse } from '../JsTypes.js'
import { assertNever } from '../utils/assertNever.js'
import buildSchema from './buildSchema.js'
import * as c from './valibot/validations/index.js'

export default function buildInputSchema(formmlSchema: Field) {
  if (formmlSchema.type === 'text') {
    const typedSchema = buildSchema(formmlSchema)
    return typedSchema
  }

  if (formmlSchema.type === 'num') {
    const typedSchema = buildSchema(formmlSchema)
    return v.pipe(v.string(), c.num(), v.transform(parse('num')), typedSchema)
  }

  if (formmlSchema.type === 'bool') {
    const typedSchema = buildSchema(formmlSchema)
    return v.pipe(v.string(), c.bool(), v.transform(parse('bool')), typedSchema)
  }

  if (formmlSchema.type === 'datetime') {
    const typedSchema = buildSchema(formmlSchema)
    return v.pipe(
      v.string(),
      c.datetime(),
      v.transform(parse('datetime')),
      typedSchema,
    )
  }

  if (formmlSchema.type === 'decimal') {
    const typedSchema = buildSchema(formmlSchema)
    return v.pipe(
      v.string(),
      c.decimal(),
      v.transform(parse('decimal')),
      typedSchema,
    )
  }

  return assertNever`Unsupported field schema: ${formmlSchema}`
}
