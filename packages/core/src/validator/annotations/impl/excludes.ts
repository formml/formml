import * as v from 'valibot'

import type { IAnnotationReducer } from '../reducer.js'

export const excludes: IAnnotationReducer<'excludes'> = (schema, action) =>
  v.pipe(
    schema as v.StringSchema<string>,
    v.excludes(action.options.value, action.options.message),
  )
