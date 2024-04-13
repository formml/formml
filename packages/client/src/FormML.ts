import { Field, FormMLSchema, createParser } from '@formml/dsl'
import { DeepReadonly, reactive, toRaw } from '@vue/reactivity'
import { watch } from '@vue-reactivity/watch'

import * as JsTypes from './JsTypes.js'
import validate from './validate/index.js'

export type FieldResult = DeepReadonly<{
  commitRawValue: () => void
  error: FieldError | undefined
  rawValue: string
  schema: Field
  setRawValue: (value: string) => void
  setTypedValue: (value: JsTypes.PrimitivesType) => void
  setValue: (value: JsTypes.PrimitivesType) => void
  touch: () => void
  touched: boolean
  value: JsTypes.PrimitivesType
}>

function buildIndexes(schema: FormMLSchema) {
  const indexRoot: Record<string, object> = {}
  const indexToSchema = new WeakMap<object, Field>()
  for (const field of schema.form.fields) {
    const fieldIndex = { $type: field.type }
    indexRoot[field.name] = fieldIndex
    indexToSchema.set(fieldIndex, field)
  }
  return [indexRoot, indexToSchema] as const
}

export type FieldError = { message: string }

export class FormML {
  private readonly _fieldsMetaProxy: Record<
    string,
    { error: FieldError | undefined; touched: boolean }
  > = reactive({})
  private readonly _indexToHelpers: Map<
    object,
    {
      commitRawValue: () => void
      setRawValue: (value: string) => void
      setTypedValue: (value: JsTypes.PrimitivesType) => void
      setValue: (value: JsTypes.PrimitivesType) => void
      touch: () => void
    }
  > = new Map()
  private readonly _indexToSchema: WeakMap<object, Field>
  private static readonly _parse = createParser()
  private readonly _schema: FormMLSchema
  private readonly _typedValuesProxy: Record<string, JsTypes.PrimitivesType> =
    reactive({})

  private readonly _valuesProxy: Record<string, string> = reactive({})
  public readonly indexRoot: Record<string, object>

  constructor(schema: string) {
    this._schema = FormML._parse(schema)
    ;[this.indexRoot, this._indexToSchema] = buildIndexes(this._schema)
  }

  private assertInitialized(
    name: string,
    { methodName: caller }: { methodName: string },
  ) {
    if (this._valuesProxy[name] === undefined) {
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

  commitRawValue(index: object) {
    const schema = this.getSchemaByIndex(index)
    const { name, type } = schema

    this.assertInitialized(name, { methodName: 'commitRawValue' })

    const typedValue = JsTypes.toTyped(this._valuesProxy[name], type)
    this._typedValuesProxy[name] = typedValue
    this._fieldsMetaProxy[name].error = validate(typedValue, schema)
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
        commitRawValue: () => {
          this.commitRawValue(index)
        },
        setRawValue: (value: string) => {
          this.setRawValue(index, value)
        },
        setTypedValue: (value: JsTypes.PrimitivesType) => {
          this.setTypedValue(index, value)
        },
        setValue: (value: JsTypes.PrimitivesType) => {
          this.setValue(index, value)
        },
        touch: () => {
          this.touch(index)
        },
      })
    }
  }

  setRawValue(index: object, value: string) {
    const schema = this.getSchemaByIndex(index)
    const { name, type } = schema

    this.assertInitialized(name, { methodName: 'setRawValue' })

    this._valuesProxy[name] = value
    this._fieldsMetaProxy[name].error = validate(
      JsTypes.toTyped(value, type),
      schema,
    )
  }

  setTypedValue(index: object, value: JsTypes.PrimitivesType) {
    const schema = this.getSchemaByIndex(index)
    const name = schema.name

    this.assertInitialized(name, { methodName: 'setTypedValue' })

    this._typedValuesProxy[name] = value
    this._valuesProxy[name] = JsTypes.toRaw(value)
    this._fieldsMetaProxy[name].error = validate(value, schema)
  }

  setValue(index: object, value: JsTypes.PrimitivesType) {
    const schema = this.getSchemaByIndex(index)
    const name = schema.name

    this.assertInitialized(name, { methodName: 'setValue' })

    this._typedValuesProxy[name] = value
    this._valuesProxy[name] = JsTypes.toRaw(value)
    this._fieldsMetaProxy[name].error = validate(value, schema)
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

  touch(index: object) {
    const schema = this.getSchemaByIndex(index)
    const name = schema.name

    this.assertInitialized(name, { methodName: 'touch' })

    this._fieldsMetaProxy[name].touched = true
    this._fieldsMetaProxy[name].error = validate(
      this._typedValuesProxy[name],
      schema,
    )
  }
}
