import type { Annotation, Field, Form, PRIMITIVE } from '@formml/dsl'

import { isForm, utils } from '@formml/dsl'
import annotationsInterface from '@formml/dsl/interfaces/annotations.js'
import { assertNever } from '@formml/utils'
import { BigNumber } from 'bignumber.js'
import * as v from 'valibot'

import type { PrimitiveTypeMapping } from '../js-type/index.js'
import type { IAnnotationAction } from './annotations/reducer.js'

import { annotationsReducer } from './annotations/reducer.js'

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
  } as IAnnotationAction
}

export function buildSchema<T extends PRIMITIVE>(
  formmlSchema: Field<T>,
  preprocess?: Record<PRIMITIVE, v.GenericSchema>,
): v.GenericSchema<PrimitiveTypeMapping[T]>
export function buildSchema(
  formmlSchema: Form,
  preprocess?: Record<PRIMITIVE, v.GenericSchema>,
): v.StrictObjectSchema<Record<string, v.GenericSchema>, string>
export function buildSchema(
  formmlSchema: Field | Form,
  preprocess?: Record<PRIMITIVE, v.GenericSchema>,
): v.GenericSchema
export function buildSchema(
  formmlSchema: Field | Form,
  preprocess?: Record<PRIMITIVE, v.GenericSchema>,
) {
  if (isForm(formmlSchema)) {
    const entries = formmlSchema.fields.map((field) => [
      field.name,
      buildSchema(field, preprocess),
    ])
    return v.strictObject(Object.fromEntries(entries))
  }

  const baseSchema = v.optional(type(formmlSchema))
  const schemaWithAnnotations = formmlSchema.annotations
    .map(buildAction)
    .reduce(annotationsReducer, baseSchema)
  const preprocessSchema = preprocess?.[formmlSchema.type]
  return preprocessSchema
    ? v.pipe(preprocessSchema, schemaWithAnnotations)
    : schemaWithAnnotations
}
