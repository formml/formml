import { Field } from '@formml/dsl'
import * as v from 'valibot'

export default function buildInputSchema(_schema: Field) {
  return v.string()
}
