import annotationsInterface from '@formml/dsl/interfaces/annotations.js'
import { GenericSchema } from 'valibot'

import { assertNever } from '../utils/assertNever.js'
import { required } from './valibot/schemas/required.js'

type IAnnotations = typeof annotationsInterface

type Options<T extends readonly { name: string }[]> = {
  [K in T[number] as K['name']]?: unknown
}

export type IAnnotationAction = {
  [key in keyof IAnnotations]: {
    name: key
    options: Options<IAnnotations[key]>
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
