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
  return assertNever`Unsupported type ${formmlSchema.type}`
}

const isRequired = (formmlSchema: Field) =>
  formmlSchema.annotations.some((a) => a.name === 'required')

type BuiltSchema<T extends Field> = T['type'] extends 'text'
  ? v.GenericSchema<string>
  : T['type'] extends 'num'
    ? v.GenericSchema<number | undefined>
    : T['type'] extends 'bool'
      ? v.GenericSchema<boolean>
      : T['type'] extends 'datetime'
        ? v.GenericSchema<dayjs.Dayjs | undefined>
        : T['type'] extends 'decimal'
          ? v.GenericSchema<BigNumber | undefined>
          : never

export default function buildSchema<T extends Field>(
  formmlSchema: T,
): BuiltSchema<T> {
  if (isRequired(formmlSchema)) {
    return type(formmlSchema, { notEmpty: true }) as unknown as BuiltSchema<T>
  }
  return v.optional(type(formmlSchema)) as unknown as BuiltSchema<T>
}
