import type { IAnnotationActions, IAnnotationReducer } from '../reducer.js'

import { base64 } from './base64.js'
import { bic } from './bic.js'
import { bytes } from './bytes.js'
import { required } from './required.js'

type ReducerImplementationMap = {
  [K in keyof IAnnotationActions]: IAnnotationReducer<K>
}

export const reducerImpl: ReducerImplementationMap = {
  base64,
  bic,
  bytes,
  required,
}
