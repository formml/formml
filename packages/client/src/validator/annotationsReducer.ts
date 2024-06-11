import annotationsInterface from '@formml/dsl/interfaces/annotations.js'
import { GenericSchema, GenericValidation } from 'valibot'

import { assertNever } from '../utils/assertNever.js'
import { required } from './valibot/schemas/required.js'

type IAnnotations = typeof annotationsInterface

type Options<T extends readonly { name: string }[]> = {
  [K in T[number] as K['name']]: unknown
}

type IAnnotationAction = {
  [key in keyof IAnnotations]: {
    name: key
    options: Options<IAnnotations[key]>
  }
}[keyof IAnnotations]

type IValidationComponents = {
  pipeline: GenericValidation[]
  schema: GenericSchema
}

function annotationsReducer(
  components: IValidationComponents,
  action: IAnnotationAction,
): IValidationComponents {
  if (action.name === 'required') {
    return {
      ...components,
      schema: required(components.schema),
    }
  }
  return assertNever`Unknown annotation "${action.name}".`
}

export default annotationsReducer
