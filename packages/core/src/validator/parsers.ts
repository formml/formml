import type { FormMLSchema, generics } from '@formml/dsl'
import type { BigNumber } from 'bignumber.js'
import type * as H from 'hotscript'

import * as v from 'valibot'

import type { PrimitiveTypeMapping } from '../js-type/index.js'

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

interface FieldToEntry extends H.Fn {
  return: [
    H.Call<H.Objects.Get<'name'>, this['arg0']>,
    PrimitiveTypeMapping[H.Call<H.Objects.Get<'type'>, this['arg0']>], // TODO: modify return type by annotations
  ]
}

type InferParsed<T extends generics.FormMLSchema> = H.Pipe<
  T,
  [
    H.Objects.Get<'form'>,
    H.Objects.Get<'fields'>,
    H.Tuples.Map<FieldToEntry>,
    H.Tuples.ToUnion,
    H.Objects.FromEntries,
  ]
>

export function parse<T extends FormMLSchema>(
  data: unknown,
  schema: T,
): InferParsed<T> {
  const valibotSchema = buildSchema(schema.form, preprocess)
  return v.parse(valibotSchema, data) as InferParsed<T>
}

export type SafeParseResult<T> =
  | {
      errors: [v.BaseIssue<unknown>, ...v.BaseIssue<unknown>[]]
      isValid: false
      output: T
      typed: true
    }
  | {
      errors: [v.BaseIssue<unknown>, ...v.BaseIssue<unknown>[]]
      isValid: false
      output: unknown
      typed: false
    }
  | {
      errors: undefined
      isValid: true
      output: T
      typed: true
    }

export function safeParse<T extends FormMLSchema>(
  data: unknown,
  schema: T,
): SafeParseResult<InferParsed<T>> {
  const valibotSchema = buildSchema(schema.form, preprocess)
  const { issues, success, ...rest } = v.safeParse(valibotSchema, data)
  return {
    ...rest,
    errors: issues,
    isValid: success,
  } as SafeParseResult<InferParsed<T>>
}
