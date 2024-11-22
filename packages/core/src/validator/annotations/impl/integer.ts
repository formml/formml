import type { BigNumber } from 'bignumber.js'

import * as vp from '@formml/utils/valibot-plus'
import * as v from 'valibot'

import type { IAnnotationReducer } from '../reducer.js'

export const integer: IAnnotationReducer<'integer'> = (schema, action) =>
  v.pipe(
    schema as v.GenericSchema<BigNumber | number>,
    vp.integer(action.options.message),
  )
