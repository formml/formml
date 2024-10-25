import type { Field, Form } from '@formml/dsl'

import { JsTypes, buildSchema } from '@formml/core'
import { isForm } from '@formml/dsl'
import { assertNever } from '@formml/utils'
import * as v from 'valibot'

import * as c from './valibot/validations/index.js'

function buildFieldSchema(formmlSchema: Field) {
  if (formmlSchema.type === 'text') {
    const typedSchema = buildSchema(formmlSchema)
    return typedSchema
  }

  if (formmlSchema.type === 'num') {
    const typedSchema = buildSchema(formmlSchema)
    return v.pipe(
      v.string(),
      c.num(),
      v.transform(JsTypes.fromString('num')),
      typedSchema,
    )
  }

  if (formmlSchema.type === 'bool') {
    const typedSchema = buildSchema(formmlSchema)
    return v.pipe(
      v.string(),
      c.bool(),
      v.transform(JsTypes.fromString('bool')),
      typedSchema,
    )
  }

  if (formmlSchema.type === 'datetime') {
    const typedSchema = buildSchema(formmlSchema)
    return v.pipe(
      v.string(),
      c.datetime(),
      v.transform(JsTypes.fromString('datetime')),
      typedSchema,
    )
  }

  if (formmlSchema.type === 'decimal') {
    const typedSchema = buildSchema(formmlSchema)
    return v.pipe(
      v.string(),
      c.decimal(),
      v.transform(JsTypes.fromString('decimal')),
      typedSchema,
    )
  }

  return assertNever`Unsupported field schema: ${formmlSchema}`
}

function buildFormSchema(formmlSchema: Form) {
  const entries = formmlSchema.fields.map((field) => [
    field.name,
    buildFieldSchema(field),
  ])
  return v.strictObject(Object.fromEntries(entries))
}

export default function buildInputSchema(formmlSchema: Field | Form) {
  if (isForm(formmlSchema)) {
    return buildFormSchema(formmlSchema)
  }
  return buildFieldSchema(formmlSchema)
}
