import * as v from 'valibot'

import type { IAnnotationReducer } from '../reducer.js'

export const uuid: IAnnotationReducer<'uuid'> = (schema, action) =>
  v.pipe(schema as v.StringSchema<string>, v.uuid(action.options.message))
