import { Field } from '@formml/dsl'

import { assertNever } from '../../utils/assertNever.js'
import buildSchema from './buildSchema.js'
import * as t from './transform/index.js'

export default function buildInputSchema(formmlSchema: Field) {
  const typedSchema = buildSchema(formmlSchema)

  if (formmlSchema.type === 'text') {
    return typedSchema
  }

  if (formmlSchema.type === 'num') {
    return t.toNum(typedSchema)
  }

  if (formmlSchema.type === 'bool') {
    return t.toBool(typedSchema)
  }

  if (formmlSchema.type === 'datetime') {
    return t.toDatetime(typedSchema)
  }

  if (formmlSchema.type === 'decimal') {
    return t.toDecimal(typedSchema)
  }

  return assertNever`Unsupported field type: ${formmlSchema.type}`
}
