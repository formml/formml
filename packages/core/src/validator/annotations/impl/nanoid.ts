import * as v from 'valibot'

import type { IAnnotationReducer } from '../reducer.js'

export const nanoid: IAnnotationReducer<'nanoid'> = (schema, action) =>
  v.pipe(schema as v.StringSchema<string>, v.nanoid(action.options.message))
