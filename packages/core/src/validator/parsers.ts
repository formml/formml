import type { FormMLSchema, generics } from '@formml/dsl'
import type { BigNumber } from 'bignumber.js'
import type * as H from 'hotscript'

import * as v from 'valibot'

import type { PrimitiveTypeMapping } from '../js-type/index.js'

import { fromPlain } from '../js-type/plain/conversion.js'
import { schemas } from '../js-type/plain/validation.js'
import { buildValibotSchema } from './buildValibotSchema.js'

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

/**
 * Parses plain data to be typed according to a FormML schema. Throws error if validation fails.
 *
 * This function is mainly used to parse JSON data from form submissions.
 *
 * | FormML Type | Plain (JSON) Type | Parsed Type |
 * | ----------- | ---------------- | ----------- |
 * | text        | string           | string      |
 * | num         | number           | number      |
 * | decimal     | string           | BigNumber   |
 * | datetime    | string           | Date        |
 * | bool        | boolean          | boolean     |
 *
 * @param data - The data to parse
 * @param schema - The FormML schema to validate against
 * @returns The typed data
 *
 * @example
 * const schema = formml`
 *   form user {
 *     text name
 *     num age
 *     datetime birthday
 *     decimal salary
 *   }
 * `
 *
 * // likely comes from JSON.parse()
 * const data = {
 *   name: "John",
 *   age: 25,
 *   birthday: "1999-12-31T00:00:00.000Z",
 *   salary: "100001.23"
 * }
 *
 * const result = parse(data, schema)
 * // {
 * //   name: "John",
 * //   age: 25,
 * //   birthday: Date("1999-12-31T00:00:00.000Z"),
 * //   salary: BigNumber("100001.23")
 * // }
 */
export function parse<T extends FormMLSchema>(
  data: unknown,
  schema: T,
): InferParsed<T> {
  const valibotSchema = buildValibotSchema(schema.form, preprocess)
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

/**
 * Safely parses plain data to be typed according to a FormML schema.
 *
 * This function is mainly used to parse JSON data from form submissions.
 *
 * | FormML Type | Plain (JSON) Type | Parsed Type |
 * | ----------- | ---------------- | ----------- |
 * | text        | string           | string      |
 * | num         | number           | number      |
 * | decimal     | string           | BigNumber   |
 * | datetime    | string           | Date        |
 * | bool        | boolean          | boolean     |
 *
 * @param data - The data to parse
 * @param schema - The FormML schema to validate against
 * @returns The result object with typed data or validation errors
 *
 * @example
 * const schema = formml`
 *   form user {
 *     text name
 *     num age
 *     datetime birthday
 *     decimal salary
 *   }
 * `
 *
 * const result1 = safeParse(
 *   {
 *     name: "John",
 *     age: 25,
 *     birthday: "1999-12-31T00:00:00.000Z",
 *     salary: "100001.23"
 *   },
 *   schema
 * )
 * // {
 * //   isValid: true,
 * //   typed: true,
 * //   output: {
 * //     name: "John",
 * //     age: 25,
 * //     birthday: Date("1999-12-31T00:00:00.000Z"),
 * //     salary: BigNumber("100001.23")
 * //   }
 * // }
 *
 * const result2 = safeParse({ name: "John", age: "abc" }, schema)
 * // {
 * //   isValid: false,
 * //   typed: false,
 * //   errors: ValidationError[]
 * // }
 */
export function safeParse<T extends FormMLSchema>(
  data: unknown,
  schema: T,
): SafeParseResult<InferParsed<T>> {
  const valibotSchema = buildValibotSchema(schema.form, preprocess)
  const { issues, success, ...rest } = v.safeParse(valibotSchema, data)
  return {
    ...rest,
    errors: issues,
    isValid: success,
  } as SafeParseResult<InferParsed<T>>
}
