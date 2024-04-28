import dayjs from 'dayjs'
import * as v from 'valibot'

export const number = () => v.special<string>((input) => !isNaN(Number(input)))
export const datetime = () =>
  v.special<string>(
    (input) => typeof input === 'string' && dayjs(input).isValid(),
  )
export const bool = () => v.string()
export const decimal = () => v.special<string>((input) => !isNaN(Number(input)))
