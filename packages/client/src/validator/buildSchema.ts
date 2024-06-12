import { Annotation, Field, PrimitiveType } from '@formml/dsl'
import { BigNumber } from 'bignumber.js'
import * as v from 'valibot'

import { PrimitiveTypeMapping } from '../JsTypes.js'
import { assertNever } from '../utils/assertNever.js'
import annotationsReducer, { IAnnotationAction } from './annotationsReducer.js'

const type = (formmlSchema: Field) => {
  if (formmlSchema.type === 'text') {
    return v.string()
  }
  if (formmlSchema.type === 'num') {
    return v.number()
  }
  if (formmlSchema.type === 'bool') {
    return v.boolean()
  }
  if (formmlSchema.type === 'datetime') {
    return v.date()
  }
  if (formmlSchema.type === 'decimal') {
    return v.instance(BigNumber)
  }
  return assertNever`Unsupported field schema: ${formmlSchema}`
}

function buildAction(annotation: Annotation): IAnnotationAction {
  return {
    name: annotation.call.$refText as IAnnotationAction['name'], // TODO: get info from real referred declaration and ensure type safety
    options: {},
  }
}

export default function buildSchema<T extends PrimitiveType>(
  formmlSchema: Field<T>,
): v.GenericSchema<PrimitiveTypeMapping[T]>
export default function buildSchema(formmlSchema: Field) {
  const baseSchema = v.optional(type(formmlSchema))
  const actions = formmlSchema.annotations.map(buildAction)
  return actions.reduce(annotationsReducer, baseSchema)
}
