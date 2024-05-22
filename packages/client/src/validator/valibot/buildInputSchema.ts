import { Field } from '@formml/dsl'

import { assertNever } from '../../utils/assertNever.js'
import buildSchema from './buildSchema.js'
import * as t from './transform/index.js'

export default function buildInputSchema(formmlSchema: Field) {
  if (formmlSchema.type === 'text') {
    const typedSchema = buildSchema(formmlSchema)
    return typedSchema
  }

  if (formmlSchema.type === 'num') {
    const typedSchema = buildSchema(formmlSchema)
    return t.toNum(typedSchema)
  }

  if (formmlSchema.type === 'bool') {
    const typedSchema = buildSchema(formmlSchema)
    return t.toBool(typedSchema)
  }

  if (formmlSchema.type === 'datetime') {
    const typedSchema = buildSchema(formmlSchema)
    return t.toDatetime(typedSchema)
  }

  if (formmlSchema.type === 'decimal') {
    const typedSchema = buildSchema(formmlSchema)
    return t.toDecimal(typedSchema)
  }

  return assertNever`Unsupported field schema: ${formmlSchema}`
}
