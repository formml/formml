import { Field } from '@formml/dsl'
import * as v from 'valibot'

export default function buildSchema(_formmlSchema: Field) {
  return v.string()
}
