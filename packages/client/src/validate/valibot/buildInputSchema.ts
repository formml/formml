import { Field } from '@formml/dsl'
import * as v from 'valibot'

import { assertNever } from '../../utils/assertNever.js'
import * as i from './inputTransform.js'

export default function buildInputSchema(schema: Field) {
  if (schema.type === 'text') {
    return v.string()
  }

  if (schema.type === 'num') {
    return i.toNumber()
  }

  if (schema.type === 'bool') {
    return i.toBool()
  }

  if (schema.type === 'datetime') {
    return i.toDatetime()
  }

  if (schema.type === 'decimal') {
    return i.toDecimal()
  }

  return assertNever`Unsupported field type: ${schema.type}`
}
