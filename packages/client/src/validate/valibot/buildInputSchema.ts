import { Field } from '@formml/dsl'
import * as v from 'valibot'

import * as i from './inputSchemas.js'

export default function buildInputSchema(schema: Field) {
  if (schema.type === 'text') {
    return v.string()
  }

  if (schema.type === 'num') {
    return i.number()
  }

  throw new Error(`Unsupported field type: ${schema.type}`)
}
