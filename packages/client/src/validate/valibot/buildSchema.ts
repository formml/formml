import { Field } from '@formml/dsl'
import { BigNumber } from 'bignumber.js'
import dayjs from 'dayjs'
import * as v from 'valibot'

import { assertNever } from '../../utils/assertNever.js'

const type = (
  formmlSchema: Field,
  options?: Partial<{
    notEmpty: boolean
  }>,
) => {
  if (formmlSchema.type === 'text') {
    if (options?.notEmpty) {
      return v.string([v.minLength(1)])
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
    return v.special<dayjs.Dayjs>(dayjs.isDayjs)
  }
  if (formmlSchema.type === 'decimal') {
    return v.instance(BigNumber)
  }
  return assertNever`Unsupported type ${formmlSchema.type}`
}

const isRequired = (formmlSchema: Field) =>
  formmlSchema.annotations.some((a) => a.name === 'required')

export default function buildSchema(formmlSchema: Field) {
  if (isRequired(formmlSchema)) {
    return type(formmlSchema, { notEmpty: true })
  }
  return v.optional(type(formmlSchema))
}
