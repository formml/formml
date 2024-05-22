import * as v from 'valibot'

import * as JsTypes from '../../../JsTypes.js'

export default function toBool(schema?: v.BaseSchema) {
  return v.transform(v.string(), JsTypes.parse('bool'), schema)
}
