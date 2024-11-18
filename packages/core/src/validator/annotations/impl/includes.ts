import * as v from 'valibot'

import type { IAnnotationReducer } from '../reducer.js'

export const includes: IAnnotationReducer<'includes'> = (schema, action) =>
  v.pipe(
    schema as v.StringSchema<string>,
    v.includes(action.options.requirement, action.options.message),
  )
