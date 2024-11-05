import * as vp from '@formml/utils/valibot-plus'
import { BigNumber } from 'bignumber.js'
import * as v from 'valibot'

export const schemas = {
  bool: v.boolean(),
  datetime: v.union([v.pipe(v.string(), vp.isoDateTime()), v.date()]),
  decimal: v.union([v.pipe(v.string(), vp.numerical()), v.instance(BigNumber)]),
  num: v.number(),
  text: v.string(),
}
