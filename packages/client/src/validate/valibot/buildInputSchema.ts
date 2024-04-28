import { Field } from '@formml/dsl'
import * as v from 'valibot'

import { assertNever } from '../../utils/assertNever.js'
import * as i from './inputSchemas.js'

export default function buildInputSchema(schema: Field) {
  if (schema.type === 'text') {
    return v.string()
  }

  if (schema.type === 'num') {
    return i.number()
  }

  if (schema.type === 'bool') {
    return i.bool()
  }

  if (schema.type === 'datetime') {
    return i.datetime()
  }

  if (schema.type === 'decimal') {
    return i.decimal()
  }

  return assertNever`Unsupported field type: ${schema.type}`
}
