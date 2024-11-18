import * as v from 'valibot'

import type { IAnnotationReducer } from '../reducer.js'

export const regex: IAnnotationReducer<'regex'> = (schema, action) =>
  v.pipe(
    schema as v.StringSchema<string>,
    v.regex(new RegExp(action.options.requirement), action.options.message),
  )
