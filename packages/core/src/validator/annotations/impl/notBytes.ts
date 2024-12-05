import * as v from 'valibot'

import type { IAnnotationReducer } from '../reducer.js'

export const notBytes: IAnnotationReducer<'notBytes'> = (schema, action) =>
  v.pipe(
    schema as v.StringSchema<string>,
    v.notBytes(action.options.length, action.options.message),
  )
