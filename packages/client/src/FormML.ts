import { Field, FormMLSchema, createParser } from '@formml/dsl'
import { DeepReadonly, reactive, toRaw } from '@vue/reactivity'
import { watch } from '@vue-reactivity/watch'

import * as JsTypes from './JsTypes.js'
import validate from './decorators/validate.js'
import { ValidationError, createInputValidator } from './validator/index.js'
import { Validator } from './validator/index.js'

export type FormMLEvent = 'all' | 'blur' | 'change' | 'submit'
export type FormMLOptions = {
  validateOn: {
    initial: FormMLEvent
    subsequent: FormMLEvent
  }
}

export type FieldResult = DeepReadonly<{
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
}>

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
  private readonly _fieldsMetaProxy: Record<
    string,
    { error: ValidationError | undefined; touched: boolean }
  > = reactive({})
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

  constructor(schema: string, options?: FormMLOptions) {
    this.options = options || {
      validateOn: {
        initial: 'all',
        subsequent: 'all',
      },
    }
    this._schema = FormML._parse(schema)
    ;[this.indexRoot, this._indexToSchema] = buildIndexes(this._schema)
    this._indexToInputValidator = buildInputValidators(this._indexToSchema)
  }

  private assertInitialized(
    name: string,
    { methodName: caller }: { methodName: string },
  ) {
    if (!this.isInitialized(name)) {
      throw new Error(
        `Field "${name}" has not been initialized yet, please make sure to call \`initField\` before calling \`${caller}\``,
      )
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

  private isInitialized(name: string) {
    return this._valuesProxy[name] !== undefined
  }

  @validate({ eventName: 'blur' })
  blur(index: object) {
    const schema = this.getSchemaByIndex(index)
    const name = schema.name

    this.assertInitialized(name, { methodName: 'blur' })

    this._fieldsMetaProxy[name].touched = true
  }

  commitRawValue(index: object) {
    const schema = this.getSchemaByIndex(index)
    const { name, type } = schema

    this.assertInitialized(name, { methodName: 'commitRawValue' })

    const rawValue = this._valuesProxy[name]
    this._typedValuesProxy[name] = JsTypes.toTyped(rawValue, type)
  }

  getField(index: object): FieldResult {
    const schema = this.getSchemaByIndex(index)
    const { name } = schema

    this.assertInitialized(name, { methodName: 'getField' })

    return {
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

  initField(index: object) {
    const schema = this.getSchemaByIndex(index)
    const { name } = schema

    if (this._valuesProxy[name] === undefined) {
      this._valuesProxy[name] = ''
    }

    if (this._fieldsMetaProxy[name] === undefined) {
      this._fieldsMetaProxy[name] = { error: undefined, touched: false }
    }

    if (!this._indexToHelpers.has(index)) {
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
  }

  @validate({ eventName: 'change' })
  setRawValue(index: object, value: string) {
    const schema = this.getSchemaByIndex(index)
    const { name } = schema

    this.assertInitialized(name, { methodName: 'setRawValue' })

    this._valuesProxy[name] = value
  }

  @validate({ eventName: 'change' })
  setTypedValue(index: object, value: JsTypes.PrimitiveType) {
    const schema = this.getSchemaByIndex(index)
    const name = schema.name

    this.assertInitialized(name, { methodName: 'setTypedValue' })

    this._typedValuesProxy[name] = value
    this._valuesProxy[name] = JsTypes.toRaw(value)
  }

  @validate({ eventName: 'change' })
  setValue(index: object, value: JsTypes.PrimitiveType) {
    const schema = this.getSchemaByIndex(index)
    const name = schema.name

    this.assertInitialized(name, { methodName: 'setValue' })

    this._typedValuesProxy[name] = value
    this._valuesProxy[name] = JsTypes.toRaw(value)
  }

  subscribe(index: object, callback: () => void): () => void {
    const schema = this.getSchemaByIndex(index)
    const name = schema.name

    this.assertInitialized(name, { methodName: 'subscribe' })

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

  validate(index: object) {
    const schema = this.getSchemaByIndex(index)
    const name = schema.name

    this.assertInitialized(name, { methodName: 'validate' })

    const result = this._indexToInputValidator.get(index)!(
      this._valuesProxy[name],
    )

    if (result.isValid) {
      return { error: undefined, isValid: true as const }
    }

    const error = result.errors[0]
    this._fieldsMetaProxy[name].error = error
    return { error, isValid: false as const }
  }

  validateAll() {
    const errors = []

    // TODO: pre-build validation schemas, and find by index
    for (const index of Object.values(this.indexRoot)) {
      const schema = this.getSchemaByIndex(index)
      const name = schema.name
      const result = this._indexToInputValidator.get(index)!(
        this._valuesProxy[name],
      )

      if (!result.isValid) {
        errors.push(...result.errors)
      }

      this.initField(index)
      this._fieldsMetaProxy[name].error = result.errors?.[0]
    }
    return { errors, isValid: errors.length === 0 }
  }
}
