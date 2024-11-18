import * as v from 'valibot'

import type { IAnnotationReducer } from '../reducer.js'

export const digits: IAnnotationReducer<'digits'> = (schema, action) =>
  v.pipe(schema as v.StringSchema<string>, v.digits(action.options.message))
