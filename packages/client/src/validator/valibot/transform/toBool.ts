import * as v from 'valibot'

import * as JsTypes from '../../../JsTypes.js'

export default function toBool(schema?: v.GenericSchema<boolean>) {
  if (schema)
    return v.pipe(v.string(), v.transform(JsTypes.parse('bool')), schema)
  return v.pipe(v.string(), v.transform(JsTypes.parse('bool')))
}
