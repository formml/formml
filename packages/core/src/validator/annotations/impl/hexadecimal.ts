import * as v from 'valibot'

import type { IAnnotationReducer } from '../reducer.js'

export const hexadecimal: IAnnotationReducer<'hexadecimal'> = (
  schema,
  action,
) =>
  v.pipe(
    schema as v.StringSchema<string>,
    v.hexadecimal(action.options.message),
  )
