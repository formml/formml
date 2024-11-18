import * as v from 'valibot'

import type { IAnnotationReducer } from '../reducer.js'

export const minLength: IAnnotationReducer<'minLength'> = (schema, action) =>
  v.pipe(
    schema as v.StringSchema<string>,
    v.minLength(action.options.requirement, action.options.message),
  )
