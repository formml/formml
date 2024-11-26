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

/**
 * Builds a Valibot schema from a FormML field
 * @param formmlSchema The FormML field schema
 * @param preprocess Optional preprocessors for each primitive type
 * @returns A Valibot schema that validates the field data
 * @example
 * // Without preprocess
 * const field = formml`
 *   form user {
 *     ⁣@min(18) num age
 *   }
 * `.form.fields[0]
 * const schema = buildValibotSchema(field)
 *
 * v.parse(schema, 25) // ✓ returns 25
 * v.parse(schema, '25') // ✗ throws "Invalid type: Expected number but received "25""
 * v.parse(schema, 15) // ✗ throws "Invalid value: Number must be greater than or equal to 18"
 * v.parse(schema, undefined) // ✓ returns undefined (optional by default)
 *
 * // With preprocess
 * const preprocess = {
 *   num: v.pipe(v.string(), v.transform(Number)),
 * }
 * const schema = buildValibotSchema(field, preprocess)
 *
 * v.parse(schema, '25') // ✓ returns 25
 * v.parse(schema, 25) // ✗ throws "Invalid type: Expected string but received 25"
 * v.parse(schema, '15') // ✗ throws "Invalid value: Number must be greater than or equal to 18"
 * v.parse(schema, 'abc') // ✗ throws "Invalid type: Expected number but received NaN"
 */
export function buildValibotSchema<T extends PRIMITIVE>(
  formmlSchema: Field<T>,
  preprocess?: Record<PRIMITIVE, v.GenericSchema>,
): v.GenericSchema<PrimitiveTypeMapping[T]>

/**
 * Builds a Valibot schema from a FormML form
 * @param formmlSchema The FormML form schema
 * @param preprocess Optional preprocessors for each primitive type
 * @returns A Valibot schema that validates all fields data in the form recursively
 * @example
 * // Without preprocess
 * const form = formml`
 *   form user {
 *     ⁣@minLength(2)
 *     text name
 *     num age
 *   }
 * `.form
 * const schema = buildValibotSchema(form)
 *
 * v.parse(schema, { name: 'John', age: 25 }) // ✓ returns { name: 'John', age: 25 }
 * v.parse(schema, { name: 'J', age: 25 }) // ✗ throws "Invalid value: String must have at least 2 characters" at name
 * v.parse(schema, { name: 'John', age: '25' }) // ✗ throws "Invalid type: Expected number but received "25"" at age
 * v.parse(schema, { name: 'John' }) // ✓ returns { name: 'John', age: undefined }
 *
 * // With preprocess
 * const preprocess = {
 *   num: v.pipe(v.string(), v.transform(Number)),
 * }
 * const schema = buildValibotSchema(form, preprocess)
 *
 * v.parse(schema, { name: 'John', age: '25' }) // ✓ returns { name: 'John', age: 25 }
 * v.parse(schema, { name: 'J', age: '25' }) // ✗ throws "Invalid value: String must have at least 2 characters" at name
 * v.parse(schema, { name: 'John', age: 25 }) // ✗ throws "Invalid type: Expected string but received 25" at age
 * v.parse(schema, { name: 'John', age: 'abc' }) // ✗ throws "Invalid type: Expected number but received NaN" at age
 */
export function buildValibotSchema(
  formmlSchema: Form,
  preprocess?: Record<PRIMITIVE, v.GenericSchema>,
): v.StrictObjectSchema<Record<string, v.GenericSchema>, string>

/**
 * Builds a Valibot schema from a FormML field or form
 * @param formmlSchema The FormML field or form schema
 * @param preprocess Optional preprocessors for each primitive type
 * @returns A Valibot schema that validates the input
 */
export function buildValibotSchema(
  formmlSchema: Field | Form,
  preprocess?: Record<PRIMITIVE, v.GenericSchema>,
): v.GenericSchema

export function buildValibotSchema(
  formmlSchema: Field | Form,
  preprocess?: Record<PRIMITIVE, v.GenericSchema>,
) {
  if (isForm(formmlSchema)) {
    const entries = formmlSchema.fields.map((field) => [
      field.name,
      buildValibotSchema(field, preprocess),
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
