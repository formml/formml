import * as vp from '@formml/utils/valibot-plus'

import type { IAnnotationReducer } from '../reducer.js'

export const required: IAnnotationReducer<'required'> = (schema, action) =>
  vp.required(schema, action.options.message)
