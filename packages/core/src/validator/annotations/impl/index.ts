import type { IAnnotationActions, IAnnotationReducer } from '../reducer.js'

import { base64 } from './base64.js'
import { bic } from './bic.js'
import { bytes } from './bytes.js'
import { creditCard } from './creditCard.js'
import { cuid2 } from './cuid2.js'
import { digits } from './digits.js'
import { email } from './email.js'
import { emoji } from './emoji.js'
import { empty } from './empty.js'
import { endsWith } from './endsWith.js'
import { excludes } from './excludes.js'
import { required } from './required.js'

type ReducerImplementationMap = {
  [K in keyof IAnnotationActions]: IAnnotationReducer<K>
}

export const reducerImpl: ReducerImplementationMap = {
  base64,
  bic,
  bytes,
  creditCard,
  cuid2,
  digits,
  email,
  emoji,
  empty,
  endsWith,
  excludes,
  required,
}
