import { BigNumber } from 'bignumber.js'
import * as v from 'valibot'

import * as JsTypes from '../../../JsTypes.js'

export default function toDecimal(
  schema?: v.GenericSchema<BigNumber | undefined>,
) {
  if (schema)
    return v.pipe(
      v.string(),
      v.check((i) => !new BigNumber(i).isNaN()),
      v.transform(JsTypes.parse('decimal')),
      schema,
    )
  return v.pipe(
    v.string(),
    v.check((i) => !new BigNumber(i).isNaN()),
    v.transform(JsTypes.parse('decimal')),
  )
}
