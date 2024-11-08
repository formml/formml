import type { FormMLSchema } from '@formml/dsl'
import type { BigNumber } from 'bignumber.js'

import * as v from 'valibot'

import { fromPlain, schemas } from '../js-type/index.js'
import { buildSchema } from './buildSchema.js'

const preprocess = {
  bool: v.pipe(
    schemas.bool,
    v.transform<boolean, boolean | undefined>(fromPlain('bool')),
  ),
  datetime: v.pipe(
    schemas.datetime,
    v.transform<Date | string, Date | undefined>(fromPlain('datetime')),
  ),
  decimal: v.pipe(
    schemas.decimal,
    v.transform<BigNumber | string, BigNumber | undefined>(
      fromPlain('decimal'),
    ),
  ),
  num: v.pipe(
    schemas.num,
    v.transform<number, number | undefined>(fromPlain('num')),
  ),
  text: v.pipe(
    schemas.text,
    v.transform<string, string | undefined>(fromPlain('text')),
  ),
}

export function parse(data: unknown, schema: FormMLSchema) {
  const valibotSchema = buildSchema(schema.form, preprocess)
  return v.parse(valibotSchema, data)
}

export function safeParse(data: unknown, schema: FormMLSchema) {
  const valibotSchema = buildSchema(schema.form, preprocess)
  return v.safeParse(valibotSchema, data)
}
