import { BigNumber } from 'bignumber.js'
import dayjs from 'dayjs'
import * as v from 'valibot'

import * as JsTypes from '../../JsTypes.js'

export const toNum = (schema?: v.BaseSchema) =>
  v.transform(
    v.string([v.custom((i) => !isNaN(Number(i)))]),
    JsTypes.parse('num'),
    schema,
  )
export const toDatetime = (schema?: v.BaseSchema) =>
  v.transform(
    v.string([v.custom((i) => dayjs(i).isValid())]),
    JsTypes.parse('datetime'),
    schema,
  )
export const toBool = (schema?: v.BaseSchema) =>
  v.transform(v.string(), JsTypes.parse('bool'), schema)

export const toDecimal = (schema?: v.BaseSchema) =>
  v.transform(
    v.string([v.custom((i) => !new BigNumber(i).isNaN())]),
    JsTypes.parse('decimal'),
    schema,
  )
