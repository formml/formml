import dayjs from 'dayjs'
import * as v from 'valibot'

export const toNum = (schema?: v.BaseSchema) =>
  v.transform(v.string([v.decimal()]), Number, schema)
export const toDatetime = (schema?: v.BaseSchema) =>
  v.transform<v.StringSchema, dayjs.Dayjs>(
    v.string([v.isoTimestamp()]),
    dayjs,
    schema,
  )
export const toBool = () => v.string()
export const toDecimal = () =>
  v.special<string>((input) => !isNaN(Number(input)))
