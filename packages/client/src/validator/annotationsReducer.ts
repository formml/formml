import type { utils } from '@formml/dsl'
import type annotationsInterface from '@formml/dsl/interfaces/annotations.js'
import type { GenericSchema } from 'valibot'

import { assertNever } from '@formml/utils'

import { required } from './valibot/schemas/required.js'

type IAnnotations = typeof annotationsInterface

export type IAnnotationAction = {
  [key in keyof IAnnotations]: {
    name: key
    options: utils.ArgsData<IAnnotations[key]>
  }
}[keyof IAnnotations]

function annotationsReducer(
  schema: GenericSchema,
  action: IAnnotationAction,
): GenericSchema {
  if (action.name === 'required') {
    return required(schema, action.options.message as string)
  }
  return assertNever`Unknown annotation "${action.name}".`
}

export default annotationsReducer
