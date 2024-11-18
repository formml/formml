import * as v from 'valibot'

import type { IAnnotationReducer } from '../reducer.js'

export const creditCard: IAnnotationReducer<'creditCard'> = (schema, action) =>
  v.pipe(schema as v.StringSchema<string>, v.creditCard(action.options.message))
