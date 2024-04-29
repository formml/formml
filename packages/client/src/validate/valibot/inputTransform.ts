import dayjs from 'dayjs'
import * as v from 'valibot'

export const asNumber = () =>
  v.special<string>((input) => !isNaN(Number(input)))
export const asDatetime = () =>
  v.special<string>(
    (input) => typeof input === 'string' && dayjs(input).isValid(),
  )
export const asBool = () => v.string()
export const asDecimal = () =>
  v.special<string>((input) => !isNaN(Number(input)))
