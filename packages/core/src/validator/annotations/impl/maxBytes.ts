import * as v from 'valibot'

import type { IAnnotationReducer } from '../reducer.js'

export const maxBytes: IAnnotationReducer<'maxBytes'> = (schema, action) =>
  v.pipe(
    schema as v.StringSchema<string>,
    v.maxBytes(action.options.requirement, action.options.message),
  )
