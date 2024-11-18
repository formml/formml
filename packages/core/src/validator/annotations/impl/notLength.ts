import * as v from 'valibot'

import type { IAnnotationReducer } from '../reducer.js'

export const notLength: IAnnotationReducer<'notLength'> = (schema, action) =>
  v.pipe(
    schema as v.StringSchema<string>,
    v.notLength(action.options.requirement, action.options.message),
  )
