import * as v from 'valibot'

import type { IAnnotationReducer } from '../reducer.js'

export const empty: IAnnotationReducer<'empty'> = (schema, action) =>
  v.pipe(schema as v.StringSchema<string>, v.empty(action.options.message))
