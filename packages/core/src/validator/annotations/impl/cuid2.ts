import * as v from 'valibot'

import type { IAnnotationReducer } from '../reducer.js'

export const cuid2: IAnnotationReducer<'cuid2'> = (schema, action) =>
  v.pipe(schema as v.StringSchema<string>, v.cuid2(action.options.message))
