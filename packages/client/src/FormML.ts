import type { ValidationError, Validator } from '@formml/core'
import type { JSType } from '@formml/core'
import type { Field, Form, FormMLSchema } from '@formml/dsl'
import type { ObjectPathItem } from 'valibot'

import { reactive, toRaw } from '@vue/reactivity'
import { watch } from '@vue-reactivity/watch'

import type { BaseIndex, IndexRoot } from './IndexManager.js'
import type { DeepPartial } from './utils/options.js'

import IndexManager from './IndexManager.js'
import validate from './decorators/validate.js'
import { fromString, toString } from './js-type/string/conversion.js'
import { mergeOptions } from './utils/options.js'
import { createInputValidator } from './validator.js'

export type FormMLEvent = 'all' | 'blur' | 'change' | 'none'
export type FormMLOptions = {
  /**
   * Configures when to run pre-validations before final submission
   */
  preValidateOn: {
    /**
     * When to run the first pre-validation
     */
    initial: FormMLEvent
    /**
     * When to run subsequent pre-validations after the initial validation
     */
    subsequent: FormMLEvent
  }
}
export type PartialFormMLOptions = DeepPartial<FormMLOptions>

export type FieldResult = {
  _internalState: { isInitiallyValidated: boolean }
  blur: () => void
  commitRawValue: () => void
  error: ValidationError | undefined
  rawValue: string
  schema: Field
  setRawValue: (value: string) => void
  setTypedValue: (value: JSType.PrimitiveType) => void
  setValue: (value: JSType.PrimitiveType) => void
  touched: boolean
  value: JSType.PrimitiveType
}

function buildInputValidators(
  im: IndexManager<FormMLSchema>,
): Map<object, Validator<string>> {
  const validators = new Map<object, Validator<string>>()
  validators.set(
    im.root,
    createInputValidator(im.for(im.root).get('schema') as Form),
  )
  for (const index of Object.values(im.root)) {
    validators.set(
      index,
      createInputValidator(im.for(index).get('schema') as Field),
    )
  }
  return validators
}

export class FormML<T extends FormMLSchema = FormMLSchema> {
  private readonly _fieldsInternalState: Record<
    string,
    { isInitiallyValidated: boolean }
  > = {}
  private readonly _fieldsMetaProxy: Record<
    string,
    { error: ValidationError | undefined; touched: boolean }
  > = reactive({})
  private readonly _formValidator: Validator<Record<string, string>>
  private readonly _im: IndexManager<T>
  private readonly _indexToHelpers: Map<
    object,
    {
      blur: () => void
      commitRawValue: () => void
      setRawValue: (value: string) => void
      setTypedValue: (value: JSType.PrimitiveType) => void
      setValue: (value: JSType.PrimitiveType) => void
    }
  > = new Map()
  private readonly _indexToInputValidator: Map<object, Validator<string>>
  private readonly _schema: FormMLSchema
  private readonly _typedValuesProxy: Record<string, JSType.PrimitiveType> =
    reactive({})
  private readonly _valuesProxy: Record<string, string> = reactive({})

  public readonly options: FormMLOptions

  constructor(schema: T, options?: PartialFormMLOptions) {
    this._schema = schema
    this.options = mergeOptions(options, {
      preValidateOn: {
        initial: 'blur',
        subsequent: 'change',
      },
    })

    this._im = new IndexManager(schema)
    this._indexToInputValidator = buildInputValidators(this._im)
    this._formValidator = createInputValidator(this._schema.form)

    for (const fieldIndex of Object.values(this.indexRoot)) {
      this.initField(fieldIndex)
    }
  }

  private initField(index: BaseIndex) {
    const schema = this._im.for(index).get('schema') as Field
    const { name } = schema

    this._valuesProxy[name] = ''
    this._typedValuesProxy[name] = fromString('', schema.type)
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
      setTypedValue: (value: JSType.PrimitiveType) => {
        this.setTypedValue(index, value)
      },
      setValue: (value: JSType.PrimitiveType) => {
        this.setValue(index, value)
      },
    })
  }

  @validate({ eventName: 'blur' })
  blur(index: BaseIndex) {
    const schema = this._im.for(index).get('schema') as Field
    const name = schema.name

    this._fieldsMetaProxy[name].touched = true
  }

  commitRawValue(index: BaseIndex) {
    const schema = this._im.for(index).get('schema') as Field
    const { name, type } = schema

    const rawValue = this._valuesProxy[name]
    this._typedValuesProxy[name] = fromString(rawValue, type)
  }

  getField(index: BaseIndex): FieldResult {
    const schema = this._im.for(index).get('schema') as Field
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
  setRawValue(index: BaseIndex, value: string) {
    const schema = this._im.for(index).get('schema') as Field
    const { name } = schema

    this._valuesProxy[name] = value
  }

  @validate({ eventName: 'change' })
  setTypedValue(index: BaseIndex, value: JSType.PrimitiveType) {
    const schema = this._im.for(index).get('schema') as Field
    const name = schema.name

    this._typedValuesProxy[name] = value
    this._valuesProxy[name] = toString(value)
  }

  @validate({ eventName: 'change' })
  setValue(index: BaseIndex, value: JSType.PrimitiveType) {
    const schema = this._im.for(index).get('schema') as Field
    const name = schema.name

    this._typedValuesProxy[name] = value
    this._valuesProxy[name] = toString(value)
  }

  subscribe(index: BaseIndex, callback: () => void): () => void {
    const schema = this._im.for(index).get('schema') as Field
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
    index: BaseIndex,
  ):
    | { error: ValidationError; isValid: false }
    | { error: undefined; isValid: true } {
    const schema = this._im.for(index).get('schema') as Field
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

  public get indexRoot(): IndexRoot<T> {
    return this._im.root
  }
}
