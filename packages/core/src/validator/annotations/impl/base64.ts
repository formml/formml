import * as v from 'valibot'

import type { IAnnotationReducer } from '../reducer.js'

export const base64: IAnnotationReducer<'base64'> = (schema, action) =>
  v.pipe(schema as v.StringSchema<string>, v.base64(action.options.message))
