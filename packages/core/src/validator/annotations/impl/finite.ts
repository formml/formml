import type { BigNumber } from 'bignumber.js'

import * as vp from '@formml/utils/valibot-plus'
import * as v from 'valibot'

import type { IAnnotationReducer } from '../reducer.js'

export const finite: IAnnotationReducer<'finite'> = (schema, action) =>
  v.pipe(
    schema as v.GenericSchema<BigNumber | number>,
    vp.finite(action.options.message),
  )
