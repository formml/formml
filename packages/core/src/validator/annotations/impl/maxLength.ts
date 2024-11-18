import * as v from 'valibot'

import type { IAnnotationReducer } from '../reducer.js'

export const maxLength: IAnnotationReducer<'maxLength'> = (schema, action) =>
  v.pipe(
    schema as v.StringSchema<string>,
    v.maxLength(action.options.requirement, action.options.message),
  )
