import { Field, PrimitiveType } from '@formml/dsl'
import { BigNumber } from 'bignumber.js'
import dayjs from 'dayjs'
import * as v from 'valibot'

import { PrimitiveTypeMapping } from '../../JsTypes.js'
import { assertNever } from '../../utils/assertNever.js'

const type = (
  formmlSchema: Field,
  options?: Partial<{
    notEmpty: boolean
  }>,
) => {
  if (formmlSchema.type === 'text') {
    if (options?.notEmpty) {
      return v.pipe(v.string(), v.nonEmpty())
    }
    return v.string()
  }
  if (formmlSchema.type === 'num') {
    return v.number()
  }
  if (formmlSchema.type === 'bool') {
    return v.boolean()
  }
  if (formmlSchema.type === 'datetime') {
    return v.custom<dayjs.Dayjs>(dayjs.isDayjs)
  }
  if (formmlSchema.type === 'decimal') {
    return v.instance(BigNumber)
  }
  return assertNever`Unsupported field schema: ${formmlSchema}`
}

const isRequired = (formmlSchema: Field) =>
  formmlSchema.annotations.some((a) => a.name === 'required')

export default function buildSchema<T extends PrimitiveType>(
  formmlSchema: Field<T>,
): v.GenericSchema<PrimitiveTypeMapping[T]>
export default function buildSchema(formmlSchema: Field) {
  if (isRequired(formmlSchema)) {
    return type(formmlSchema, { notEmpty: true })
  }
  return v.optional(type(formmlSchema))
}
