import * as v from 'valibot'

import type { IAnnotationReducer } from '../reducer.js'

export const minBytes: IAnnotationReducer<'minBytes'> = (schema, action) =>
  v.pipe(
    schema as v.StringSchema<string>,
    v.minBytes(action.options.length, action.options.message),
  )
