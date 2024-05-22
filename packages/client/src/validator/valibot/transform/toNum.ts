import * as v from 'valibot'

import * as JsTypes from '../../../JsTypes.js'

export default function toNum(schema?: v.BaseSchema) {
  return v.transform(
    v.string([v.custom((i) => !isNaN(Number(i)))]),
    JsTypes.parse('num'),
    schema,
  )
}
