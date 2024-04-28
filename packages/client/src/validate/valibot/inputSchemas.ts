import * as v from 'valibot'

export const number = () => v.special<string>((input) => !isNaN(Number(input)))
