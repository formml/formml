import * as v from 'valibot'

import type { IAnnotationReducer } from '../reducer.js'

export const email: IAnnotationReducer<'email'> = (schema, action) =>
  v.pipe(schema as v.StringSchema<string>, v.email(action.options.message))
