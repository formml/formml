import * as v from 'valibot'

import type { IAnnotationReducer } from '../reducer.js'

export const octal: IAnnotationReducer<'octal'> = (schema, action) =>
  v.pipe(schema as v.StringSchema<string>, v.octal(action.options.message))
