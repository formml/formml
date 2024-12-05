import type { BigNumber } from 'bignumber.js'

import * as vp from '@formml/utils/valibot-plus'
import * as v from 'valibot'

import type { IAnnotationReducer } from '../reducer.js'

export const multipleOf: IAnnotationReducer<'multipleOf'> = (schema, action) =>
  v.pipe(
    schema as v.GenericSchema<BigNumber | number>,
    vp.multipleOf(action.options.divisor, action.options.message),
  )
