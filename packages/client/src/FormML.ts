import { Field, FormMLSchema, PrimitiveType, createParser } from '@formml/dsl'
import { DeepReadonly, reactive, toRaw } from '@vue/reactivity'
import { watch } from '@vue-reactivity/watch'
import currency from 'currency.js'
import dayjs from 'dayjs'

import assertNever from './utils/assertNever.js'

export type FieldResult = DeepReadonly<{
  commitRawValue: () => void
  error: undefined
  rawValue: string
  schema: Field
  setRawValue: (value: string) => void
  setTypedValue: (value: PrimitivesRuntimeTypesUnion) => void
  setValue: (value: PrimitivesRuntimeTypesUnion) => void
  touch: () => void
  touched: boolean
  value: PrimitivesRuntimeTypesUnion | undefined
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

export type PrimitivesRuntimeType = {
  Boolean: boolean | undefined
  Currency: currency | undefined
  DateTime: Date | undefined
  Number: number | undefined
  Text: string | undefined
}

export type PrimitivesRuntimeTypesUnion =
  PrimitivesRuntimeType[keyof PrimitivesRuntimeType]

function convertRawValueToTyped(rawValue: string, type: PrimitiveType) {
  if (rawValue === '' && type !== 'Text') {
    return undefined
  }
  switch (type) {
    case 'Boolean':
      return rawValue === 'true' ? true : false
    case 'Currency':
      return currency(rawValue)
    case 'DateTime':
      return dayjs(rawValue).toDate()
    case 'Number':
      return Number(rawValue)
    case 'Text':
      return rawValue
    default: {
      return assertNever`Unsupported type '${type}'`
    }
  }
}

function convertTypedValueToRaw(value: PrimitivesRuntimeTypesUnion): string {
  if (typeof value === 'boolean') {
    return value ? 'true' : 'false'
  }
  if (value instanceof currency) {
    return value.toString()
  }
  if (value instanceof Date) {
    return value.toISOString()
  }
  if (typeof value === 'number') {
    return value.toString()
  }
  if (typeof value === 'string') {
    return value
  }
  if (typeof value === 'undefined') {
    return ''
  }
  return assertNever`Unsupported type '${value}'`
}

export default class FormML {
  private readonly _fieldsMetaProxy: Record<string, { touched: boolean }> =
    reactive({})
  private readonly _indexToHelpers: Map<
    object,
    {
      commitRawValue: () => void
      setRawValue: (value: string) => void
      setTypedValue: (value: PrimitivesRuntimeTypesUnion) => void
      setValue: (value: PrimitivesRuntimeTypesUnion) => void
      touch: () => void
    }
  > = new Map()
  private readonly _indexToSchema: WeakMap<object, Field>
  private static readonly _parse = createParser()
  private readonly _schema: FormMLSchema
  private readonly _typedValuesProxy: Record<
    string,
    PrimitivesRuntimeTypesUnion | undefined
  > = reactive({})
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

    this._typedValuesProxy[name] = convertRawValueToTyped(
      this._valuesProxy[name],
      type,
    )
  }

  getField(index: object): FieldResult {
    const schema = this.getSchemaByIndex(index)
    const { name } = schema

    this.assertInitialized(name, { methodName: 'getField' })

    return {
      error: undefined,
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
      this._fieldsMetaProxy[name] = { touched: false }
    }

    if (!this._indexToHelpers.has(index)) {
      this._indexToHelpers.set(index, {
        commitRawValue: () => {
          this.commitRawValue(index)
        },
        setRawValue: (value: string) => {
          this.setRawValue(index, value)
        },
        setTypedValue: (value: PrimitivesRuntimeTypesUnion) => {
          this.setTypedValue(index, value)
        },
        setValue: (value: PrimitivesRuntimeTypesUnion) => {
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
    const name = schema.name

    this.assertInitialized(name, { methodName: 'setRawValue' })

    this._valuesProxy[name] = value
  }

  setTypedValue(index: object, value: PrimitivesRuntimeTypesUnion) {
    const schema = this.getSchemaByIndex(index)
    const name = schema.name

    this.assertInitialized(name, { methodName: 'setTypedValue' })

    this._typedValuesProxy[name] = value
    this._valuesProxy[name] = convertTypedValueToRaw(value)
  }

  setValue(index: object, value: PrimitivesRuntimeTypesUnion) {
    const schema = this.getSchemaByIndex(index)
    const name = schema.name

    this.assertInitialized(name, { methodName: 'setValue' })

    this._typedValuesProxy[name] = value
    this._valuesProxy[name] = convertTypedValueToRaw(value)
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
      ],
      () => callback(),
    )
  }

  touch(index: object) {
    const schema = this.getSchemaByIndex(index)
    const name = schema.name

    this.assertInitialized(name, { methodName: 'touch' })

    this._fieldsMetaProxy[name].touched = true
  }
}
