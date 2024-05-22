import dayjs from 'dayjs'
import * as v from 'valibot'

import * as JsTypes from '../../../JsTypes.js'

export default function toDatetime(schema?: v.GenericSchema<Date | undefined>) {
  if (schema)
    return v.pipe(
      v.string(),
      v.check((i) => dayjs(i).isValid()),
      v.transform(JsTypes.parse('datetime')),
      schema,
    )
  return v.pipe(
    v.string(),
    v.check((i) => dayjs(i).isValid()),
    v.transform(JsTypes.parse('datetime')),
  )
}
