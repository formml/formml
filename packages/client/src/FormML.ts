import type { ObjectPathItem } from 'valibot'

import { Field, FormMLSchema, createParser } from '@formml/dsl'
import { reactive, toRaw } from '@vue/reactivity'
import { watch } from '@vue-reactivity/watch'

import * as JsTypes from './JsTypes.js'
import validate from './decorators/validate.js'
import { DeepPartial, mergeOptions } from './utils/options.js'
import { ValidationError, createInputValidator } from './validator/index.js'
import { Validator } from './validator/index.js'

export type FormMLEvent = 'all' | 'blur' | 'change' | 'none'
export type FormMLOptions = {
  preValidateOn: {
    initial: FormMLEvent
    subsequent: FormMLEvent
  }
}

export type FieldResult = {
  _internalState: { isInitiallyValidated: boolean }
  blur: () => void
  commitRawValue: () => void
  error: ValidationError | undefined
  rawValue: string
  schema: Field
  setRawValue: (value: string) => void
  setTypedValue: (value: JsTypes.PrimitiveType) => void
  setValue: (value: JsTypes.PrimitiveType) => void
  touched: boolean
  value: JsTypes.PrimitiveType
}

function buildIndexes(schema: FormMLSchema) {
  const indexRoot: Record<string, object> = {}
  const indexToSchema = new Map<object, Field>()
  for (const field of schema.form.fields) {
    const fieldIndex = { $type: field.type }
    indexRoot[field.name] = fieldIndex
    indexToSchema.set(fieldIndex, field)
  }
  return [indexRoot, indexToSchema] as const
}

function buildInputValidators(
  indexToSchema: Map<object, Field>,
): Map<object, Validator<string>> {
  const validators = new Map<object, Validator<string>>()
  for (const [index, schema] of indexToSchema) {
    validators.set(index, createInputValidator(schema))
  }
  return validators
}

export class FormML {
  private readonly _fieldsInternalState: Record<
    string,
    { isInitiallyValidated: boolean }
  > = {}
  private readonly _fieldsMetaProxy: Record<
    string,
    { error: ValidationError | undefined; touched: boolean }
  > = reactive({})
  private readonly _formValidator: Validator<Record<string, string>>
  private readonly _indexToHelpers: Map<
    object,
    {
      blur: () => void
      commitRawValue: () => void
      setRawValue: (value: string) => void
      setTypedValue: (value: JsTypes.PrimitiveType) => void
      setValue: (value: JsTypes.PrimitiveType) => void
    }
  > = new Map()
  private readonly _indexToInputValidator: Map<object, Validator<string>>
  private readonly _indexToSchema: Map<object, Field>
  private static readonly _parse = createParser()
  private readonly _schema: FormMLSchema
  private readonly _typedValuesProxy: Record<string, JsTypes.PrimitiveType> =
    reactive({})
  private readonly _valuesProxy: Record<string, string> = reactive({})

  public readonly indexRoot: Record<string, object>
  public readonly options: FormMLOptions

  constructor(schema: string, options?: DeepPartial<FormMLOptions>) {
    this.options = mergeOptions(options, {
      preValidateOn: {
        initial: 'blur',
        subsequent: 'change',
      },
    })
    this._schema = FormML._parse(schema)

    // TODO: index manager
    ;[this.indexRoot, this._indexToSchema] = buildIndexes(this._schema)
    this._indexToInputValidator = buildInputValidators(this._indexToSchema)
    this._formValidator = createInputValidator(this._schema.form)

    for (const fieldIndex of Object.values(this.indexRoot)) {
      this.initField(fieldIndex)
    }
  }

  private getSchemaByIndex(index: object) {
    const schema = this._indexToSchema.get(index)

    if (schema === undefined) {
      throw new Error(
        `Given index is invalid, index provided:
        ${JSON.stringify(index, undefined, 2)}`,
      )
    }
    return schema
  }

  private initField(index: object) {
    const schema = this.getSchemaByIndex(index)
    const { name } = schema

    this._valuesProxy[name] = ''
    this._typedValuesProxy[name] = JsTypes.parse('', schema.type)
    this._fieldsMetaProxy[name] = { error: undefined, touched: false }

    this._fieldsInternalState[name] = { isInitiallyValidated: false }
    this._indexToHelpers.set(index, {
      blur: () => {
        this.blur(index)
      },
      commitRawValue: () => {
        this.commitRawValue(index)
      },
      setRawValue: (value: string) => {
        this.setRawValue(index, value)
      },
      setTypedValue: (value: JsTypes.PrimitiveType) => {
        this.setTypedValue(index, value)
      },
      setValue: (value: JsTypes.PrimitiveType) => {
        this.setValue(index, value)
      },
    })
  }

  @validate({ eventName: 'blur' })
  blur(index: object) {
    const schema = this.getSchemaByIndex(index)
    const name = schema.name

    this._fieldsMetaProxy[name].touched = true
  }

  commitRawValue(index: object) {
    const schema = this.getSchemaByIndex(index)
    const { name, type } = schema

    const rawValue = this._valuesProxy[name]
    this._typedValuesProxy[name] = JsTypes.parse(rawValue, type)
  }

  getField(index: object): FieldResult {
    const schema = this.getSchemaByIndex(index)
    const { name } = schema

    return {
      _internalState: this._fieldsInternalState[name],
      error: toRaw(this._fieldsMetaProxy[name].error),
      rawValue: toRaw(this._valuesProxy[name]), // to raw for every value from proxies
      schema,
      touched: toRaw(this._fieldsMetaProxy[name].touched),
      value: toRaw(this._typedValuesProxy[name]),
      ...this._indexToHelpers.get(index)!,
    }
  }

  getTypedData() {
    return toRaw(this._typedValuesProxy)
  }

  @validate({ eventName: 'change' })
  setRawValue(index: object, value: string) {
    const schema = this.getSchemaByIndex(index)
    const { name } = schema

    this._valuesProxy[name] = value
  }

  @validate({ eventName: 'change' })
  setTypedValue(index: object, value: JsTypes.PrimitiveType) {
    const schema = this.getSchemaByIndex(index)
    const name = schema.name

    this._typedValuesProxy[name] = value
    this._valuesProxy[name] = JsTypes.stringify(value)
  }

  @validate({ eventName: 'change' })
  setValue(index: object, value: JsTypes.PrimitiveType) {
    const schema = this.getSchemaByIndex(index)
    const name = schema.name

    this._typedValuesProxy[name] = value
    this._valuesProxy[name] = JsTypes.stringify(value)
  }

  subscribe(index: object, callback: () => void): () => void {
    const schema = this.getSchemaByIndex(index)
    const name = schema.name

    return watch(
      [
        () => this._valuesProxy[name],
        () => this._typedValuesProxy[name],
        () => this._fieldsMetaProxy[name].touched,
        () => this._fieldsMetaProxy[name].error,
      ],
      () => callback(),
    )
  }

  validate(
    index: object,
  ):
    | { error: ValidationError; isValid: false }
    | { error: undefined; isValid: true } {
    const schema = this.getSchemaByIndex(index)
    const name = schema.name

    const result = this._indexToInputValidator.get(index)!(
      this._valuesProxy[name],
    )
    this._fieldsInternalState[name].isInitiallyValidated = true

    if (result.isValid) {
      this._fieldsMetaProxy[name].error = undefined
      return { error: undefined, isValid: true }
    }

    const error = result.errors[0]
    this._fieldsMetaProxy[name].error = error // TODO: low performance because of reference change even though they have same content
    return { error, isValid: false }
  }

  validateAll() {
    const result = this._formValidator(this._valuesProxy)

    Object.values(this._fieldsInternalState).forEach((state) => {
      state.isInitiallyValidated = true
    })

    if (!result.isValid) {
      for (const error of result.errors) {
        // Assuming only one level of nestings for now
        const fieldKey = (error.path?.[0] as ObjectPathItem | undefined)?.key
        if (fieldKey) {
          this._fieldsMetaProxy[fieldKey].error = error
        }
      }
    }
    return result
  }
}
