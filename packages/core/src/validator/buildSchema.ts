import type { Annotation, Field, Form, PRIMITIVE } from '@formml/dsl'

import { isForm, utils } from '@formml/dsl'
import annotationsInterface from '@formml/dsl/interfaces/annotations.js'
import { assertNever } from '@formml/utils'
import { BigNumber } from 'bignumber.js'
import * as v from 'valibot'

import type { PrimitiveTypeMapping } from '../JsTypes.js'
import type { IAnnotationAction } from './annotationsReducer.js'

import annotationsReducer from './annotationsReducer.js'

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
  // TODO: get info from real referred declaration and ensure type safety
  const annotationName = annotation.call.$refText as IAnnotationAction['name']
  return {
    name: annotationName,
    options: utils.resolveArguments(
      annotation.args,
      annotationsInterface[annotationName],
    ),
  }
}

export default function buildSchema<T extends PRIMITIVE>(
  formmlSchema: Field<T>,
): v.GenericSchema<PrimitiveTypeMapping[T]>
export default function buildSchema(
  formmlSchema: Form,
): v.StrictObjectSchema<Record<string, v.GenericSchema>, string>
export default function buildSchema(formmlSchema: Field | Form) {
  if (isForm(formmlSchema)) {
    const entries = formmlSchema.fields.map((field) => [
      field.name,
      buildSchema(field),
    ])
    return v.strictObject(Object.fromEntries(entries))
  }

  const baseSchema = v.optional(type(formmlSchema))
  const actions = formmlSchema.annotations.map(buildAction)
  return actions.reduce(annotationsReducer, baseSchema)
}
