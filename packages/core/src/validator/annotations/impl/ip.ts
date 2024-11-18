import * as v from 'valibot'

import type { IAnnotationReducer } from '../reducer.js'

export const ip: IAnnotationReducer<'ip'> = (schema, action) =>
  v.pipe(schema as v.StringSchema<string>, v.ip(action.options.message))

export const ipv4: IAnnotationReducer<'ipv4'> = (schema, action) =>
  v.pipe(schema as v.StringSchema<string>, v.ipv4(action.options.message))

export const ipv6: IAnnotationReducer<'ipv6'> = (schema, action) =>
  v.pipe(schema as v.StringSchema<string>, v.ipv6(action.options.message))
