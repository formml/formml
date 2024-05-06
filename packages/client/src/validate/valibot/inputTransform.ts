import { BigNumber } from 'bignumber.js'
import dayjs from 'dayjs'
import * as v from 'valibot'

export const toNum = (schema?: v.BaseSchema) =>
  v.transform<v.StringSchema, number>(
    v.string([v.custom((i) => !isNaN(Number(i)))]),
    Number,
    schema,
  )
export const toDatetime = (schema?: v.BaseSchema) =>
  v.transform<v.StringSchema, dayjs.Dayjs>(
    v.string([v.isoTimestamp()]),
    dayjs,
    schema,
  )
export const toBool = (schema?: v.BaseSchema) =>
  v.transform<v.StringSchema, boolean>(v.string(), Boolean, schema)
export const toDecimal = (schema?: v.BaseSchema) =>
  v.transform<v.StringSchema, BigNumber>(
    v.string([v.custom((i) => !new BigNumber(i).isNaN())]),
    (i) => new BigNumber(i),
    schema,
  )
