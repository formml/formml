import dayjs from 'dayjs'
import * as v from 'valibot'

export const asNumber = (schema?: v.BaseSchema) =>
  v.transform(v.string([v.decimal()]), Number, schema)
export const asDatetime = () =>
  v.special<string>(
    (input) => typeof input === 'string' && dayjs(input).isValid(),
  )
export const asBool = () => v.string()
export const asDecimal = () =>
  v.special<string>((input) => !isNaN(Number(input)))
