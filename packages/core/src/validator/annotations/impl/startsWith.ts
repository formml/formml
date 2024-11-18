import * as v from 'valibot'

import type { IAnnotationReducer } from '../reducer.js'

export const startsWith: IAnnotationReducer<'startsWith'> = (schema, action) =>
  v.pipe(
    schema as v.StringSchema<string>,
    v.startsWith(action.options.requirement, action.options.message),
  )
