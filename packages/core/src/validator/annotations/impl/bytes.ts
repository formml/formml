import * as v from 'valibot'

import type { IAnnotationReducer } from '../reducer.js'

export const bytes: IAnnotationReducer<'bytes'> = (schema, action) =>
  v.pipe(
    schema as v.StringSchema<string>,
    v.bytes(action.options.length, action.options.message),
  )
