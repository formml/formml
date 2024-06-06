import { Field, PrimitiveType } from '@formml/dsl'
import { BigNumber } from 'bignumber.js'
import * as v from 'valibot'

import { PrimitiveTypeMapping } from '../JsTypes.js'
import { assertNever } from '../utils/assertNever.js'
import { required } from './valibot/schemas/required.js'

const type = (formmlSchema: Field) => {
  if (formmlSchema.type === 'text') {
    return v.string()
  }
  if (formmlSchema.type === 'num') {
    return v.number()
  }
  if (formmlSchema.type === 'bool') {
    return v.boolean()
  }
  if (formmlSchema.type === 'datetime') {
    return v.date()
  }
  if (formmlSchema.type === 'decimal') {
    return v.instance(BigNumber)
  }
  return assertNever`Unsupported field schema: ${formmlSchema}`
}

const isRequired = (formmlSchema: Field) =>
  formmlSchema.annotations.some((a) => a.name.$refText === 'required')

export default function buildSchema<T extends PrimitiveType>(
  formmlSchema: Field<T>,
): v.GenericSchema<PrimitiveTypeMapping[T]>
export default function buildSchema(formmlSchema: Field) {
  const baseSchema = v.optional(type(formmlSchema))

  if (isRequired(formmlSchema)) {
    return required(baseSchema)
  }
  return baseSchema
}
