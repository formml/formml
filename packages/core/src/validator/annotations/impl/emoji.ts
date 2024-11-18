import * as v from 'valibot'

import type { IAnnotationReducer } from '../reducer.js'

export const emoji: IAnnotationReducer<'emoji'> = (schema, action) =>
  v.pipe(schema as v.StringSchema<string>, v.emoji(action.options.message))
