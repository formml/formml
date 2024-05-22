import * as v from 'valibot'

import * as JsTypes from '../../../JsTypes.js'

export default function toNum(schema?: v.GenericSchema<number>) {
  if (schema)
    return v.pipe(
      v.string(),
      v.check((i) => !isNaN(Number(i))),
      v.transform(JsTypes.parse('num')),
      schema,
    )
  return v.pipe(
    v.string(),
    v.check((i) => !isNaN(Number(i))),
    v.transform(JsTypes.parse('num')),
  )
}
