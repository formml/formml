import * as v from 'valibot'

import type { IAnnotationReducer } from '../reducer.js'

export const mac: IAnnotationReducer<'mac'> = (schema, action) =>
  v.pipe(schema as v.StringSchema<string>, v.mac(action.options.message))

export const mac48: IAnnotationReducer<'mac48'> = (schema, action) =>
  v.pipe(schema as v.StringSchema<string>, v.mac48(action.options.message))

export const mac64: IAnnotationReducer<'mac64'> = (schema, action) =>
  v.pipe(schema as v.StringSchema<string>, v.mac64(action.options.message))
