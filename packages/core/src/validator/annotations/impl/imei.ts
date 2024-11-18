import * as v from 'valibot'

import type { IAnnotationReducer } from '../reducer.js'

export const imei: IAnnotationReducer<'imei'> = (schema, action) =>
  v.pipe(schema as v.StringSchema<string>, v.imei(action.options.message))
