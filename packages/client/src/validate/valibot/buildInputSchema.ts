import { Field } from '@formml/dsl'
import * as v from 'valibot'

import { assertNever } from '../../utils/assertNever.js'
import * as i from './inputTransform.js'

export default function buildInputSchema(schema: Field) {
  if (schema.type === 'text') {
    return v.string()
  }

  if (schema.type === 'num') {
    return i.asNumber()
  }

  if (schema.type === 'bool') {
    return i.asBool()
  }

  if (schema.type === 'datetime') {
    return i.asDatetime()
  }

  if (schema.type === 'decimal') {
    return i.asDecimal()
  }

  return assertNever`Unsupported field type: ${schema.type}`
}
