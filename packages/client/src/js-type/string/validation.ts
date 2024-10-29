import * as v from 'valibot'

import * as c from './valibot/validations/index.js'

export const schemas = {
  bool: v.pipe(v.string(), c.bool()),
  datetime: v.pipe(v.string(), c.datetime()),
  decimal: v.pipe(v.string(), c.decimal()),
  num: v.pipe(v.string(), c.num()),
  text: v.string(),
}
