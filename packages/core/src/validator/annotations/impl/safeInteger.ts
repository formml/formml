import * as v from 'valibot'

import type { IAnnotationReducer } from '../reducer.js'

export const safeInteger: IAnnotationReducer<'safeInteger'> = (
  schema,
  action,
) =>
  v.pipe(
    schema as v.NumberSchema<string>,
    v.safeInteger(action.options.message),
  )
