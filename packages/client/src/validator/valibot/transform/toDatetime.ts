import dayjs from 'dayjs'
import * as v from 'valibot'

import * as JsTypes from '../../../JsTypes.js'

export default function toDatetime(schema?: v.BaseSchema) {
  return v.transform(
    v.string([v.custom((i) => dayjs(i).isValid())]),
    JsTypes.parse('datetime'),
    schema,
  )
}
