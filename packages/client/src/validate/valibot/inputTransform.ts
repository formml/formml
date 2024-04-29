import dayjs from 'dayjs'
import * as v from 'valibot'

export const toNumber = (schema?: v.BaseSchema) =>
  v.transform(v.string([v.decimal()]), Number, schema)
export const toDatetime = () =>
  v.special<string>(
    (input) => typeof input === 'string' && dayjs(input).isValid(),
  )
export const toBool = () => v.string()
export const toDecimal = () =>
  v.special<string>((input) => !isNaN(Number(input)))
