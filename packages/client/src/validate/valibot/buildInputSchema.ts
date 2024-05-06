import { Field } from '@formml/dsl'

import { assertNever } from '../../utils/assertNever.js'
import buildSchema from './buildSchema.js'
import * as i from './inputTransform.js'

export default function buildInputSchema(formmlSchema: Field) {
  const typedSchema = buildSchema(formmlSchema)

  if (formmlSchema.type === 'text') {
    return typedSchema
  }

  if (formmlSchema.type === 'num') {
    return i.toNum(typedSchema)
  }

  if (formmlSchema.type === 'bool') {
    return i.toBool(typedSchema)
  }

  if (formmlSchema.type === 'datetime') {
    return i.toDatetime(typedSchema)
  }

  if (formmlSchema.type === 'decimal') {
    return i.toDecimal(typedSchema)
  }

  return assertNever`Unsupported field type: ${formmlSchema.type}`
}
