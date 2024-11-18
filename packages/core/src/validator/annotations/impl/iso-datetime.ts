import * as v from 'valibot'

import type { IAnnotationReducer } from '../reducer.js'

export const isoDate: IAnnotationReducer<'isoDate'> = (schema, action) =>
  v.pipe(schema as v.StringSchema<string>, v.isoDate(action.options.message))

export const isoDateTime: IAnnotationReducer<'isoDateTime'> = (
  schema,
  action,
) =>
  v.pipe(
    schema as v.StringSchema<string>,
    v.isoDateTime(action.options.message),
  )

export const isoTime: IAnnotationReducer<'isoTime'> = (schema, action) =>
  v.pipe(schema as v.StringSchema<string>, v.isoTime(action.options.message))

export const isoTimeSecond: IAnnotationReducer<'isoTimeSecond'> = (
  schema,
  action,
) =>
  v.pipe(
    schema as v.StringSchema<string>,
    v.isoTimeSecond(action.options.message),
  )

export const isoTimestamp: IAnnotationReducer<'isoTimestamp'> = (
  schema,
  action,
) =>
  v.pipe(
    schema as v.StringSchema<string>,
    v.isoTimestamp(action.options.message),
  )

export const isoWeek: IAnnotationReducer<'isoWeek'> = (schema, action) =>
  v.pipe(schema as v.StringSchema<string>, v.isoWeek(action.options.message))
