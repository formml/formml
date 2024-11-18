import * as v from 'valibot'

import type { IAnnotationReducer } from '../reducer.js'

export const length: IAnnotationReducer<'length'> = (schema, action) =>
  v.pipe(
    schema as v.StringSchema<string>,
    v.length(action.options.requirement, action.options.message),
  )
