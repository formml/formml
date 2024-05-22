import { BigNumber } from 'bignumber.js'
import * as v from 'valibot'

import * as JsTypes from '../../../JsTypes.js'

export default function toDecimal(schema?: v.BaseSchema) {
  return v.transform(
    v.string([v.custom((i) => !new BigNumber(i).isNaN())]),
    JsTypes.parse('decimal'),
    schema,
  )
}
