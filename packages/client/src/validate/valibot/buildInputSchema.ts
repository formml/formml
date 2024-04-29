import { Field } from '@formml/dsl'

import { assertNever } from '../../utils/assertNever.js'
import buildSchema from './buildSchema.js'
import * as i from './inputTransform.js'

export default function buildInputSchema(formmlSchema: Field) {
  if (formmlSchema.type === 'text') {
    return buildSchema(formmlSchema)
  }

  if (formmlSchema.type === 'num') {
    return i.toNum()
  }

  if (formmlSchema.type === 'bool') {
    return i.toBool()
  }

  if (formmlSchema.type === 'datetime') {
    return i.toDatetime()
  }

  if (formmlSchema.type === 'decimal') {
    return i.toDecimal()
  }

  return assertNever`Unsupported field type: ${formmlSchema.type}`
}
