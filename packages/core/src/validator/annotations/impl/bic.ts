import * as v from 'valibot'

import type { IAnnotationReducer } from '../reducer.js'

export const bic: IAnnotationReducer<'bic'> = (schema, action) =>
  v.pipe(schema as v.StringSchema<string>, v.bic(action.options.message))
