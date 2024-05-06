import { Field } from '@formml/dsl'
import * as v from 'valibot'

export default function buildSchema(formmlSchema: Field) {
  if (formmlSchema.type === 'text') {
    return v.string()
  }
  if (formmlSchema.type === 'num') {
    return v.number()
  }
  return v.string()
}
