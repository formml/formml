import * as v from 'valibot'

import type { IAnnotationReducer } from '../reducer.js'

export const ulid: IAnnotationReducer<'ulid'> = (schema, action) =>
  v.pipe(schema as v.StringSchema<string>, v.ulid(action.options.message))
