import * as v from 'valibot'

import type { IAnnotationReducer } from '../reducer.js'

export const hexColor: IAnnotationReducer<'hexColor'> = (schema, action) =>
  v.pipe(schema as v.StringSchema<string>, v.hexColor(action.options.message))
