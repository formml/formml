import * as v from 'valibot'

import type { IAnnotationReducer } from '../reducer.js'

export const endsWith: IAnnotationReducer<'endsWith'> = (schema, action) =>
  v.pipe(
    schema as v.StringSchema<string>,
    v.endsWith(action.options.requirement, action.options.message),
  )
