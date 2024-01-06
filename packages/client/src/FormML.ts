import { Field, FormMLSchema, PrimitiveType, createParser } from '@formml/dsl'
import { DeepReadonly, reactive } from '@vue/reactivity'
import { watch } from '@vue-reactivity/watch'
import currency from 'currency.js'

import createMemoSelector from './utils/createMemoSelector.js'

export type FieldProps = {
  name: string
  onBlur: React.FocusEventHandler
  onChange: React.ChangeEventHandler<HTMLInputElement>
  value: string
}

export type FieldMetaData = {
  error: undefined
  touched: boolean
  typedValue?: PrimitivesRuntimeTypesUnion
}

export type FieldPack = {
  field: FieldProps
  meta: FieldMetaData
}

export type FieldSnapshot = DeepReadonly<FieldPack>

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

function run(effects: (() => void)[]) {
  while (effects.length > 0) {
    const effect = effects.shift()!
    effect()
  }
}

type PrimitivesRuntimeType = {
  Boolean: boolean
  Currency: currency
  Date: Date
  Number: number
  Text: string
}

type PrimitivesRuntimeTypesUnion =
  PrimitivesRuntimeType[keyof PrimitivesRuntimeType]

function convertValueToTyped(
  rawValue: string,
  type: 'Boolean',
): PrimitivesRuntimeType['Boolean']
function convertValueToTyped(
  rawValue: string,
  type: 'Currency',
): PrimitivesRuntimeType['Currency']
function convertValueToTyped(
  rawValue: string,
  type: 'Date',
): PrimitivesRuntimeType['Date']
function convertValueToTyped(
  rawValue: string,
  type: 'Number',
): PrimitivesRuntimeType['Number']
function convertValueToTyped(
  rawValue: string,
  type: 'Text',
): PrimitivesRuntimeType['Text']
function convertValueToTyped(
  rawValue: string,
  type: PrimitiveType,
): PrimitivesRuntimeTypesUnion
function convertValueToTyped(rawValue: string, type: PrimitiveType) {
  switch (type) {
    case 'Boolean':
      return rawValue === 'true' ? true : false
    case 'Currency':
      return currency(rawValue)
    case 'Date':
      return new Date(rawValue) // TODO: time zone?
    case 'Number':
      return Number(rawValue)
    case 'Text':
      return rawValue
    default: {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const never: never = type
      throw new Error(`Unsupported type '${type}'`)
    }
  }
}

export default class FormML {
  private readonly _deferredEffects: (() => void)[] = []

  private readonly _fieldsMetaProxy: Record<string, { touched: boolean }> =
    reactive({})
  private readonly _indexToFieldSnapSelector: Map<
    object,
    (
      valuesProxy: typeof this._valuesProxy,
      typedValuesProxy: typeof this._typedValuesProxy,
      fieldsMetaProxy: typeof this._fieldsMetaProxy,
      deferredEffects: typeof this._deferredEffects,
    ) => FieldSnapshot
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

  private deferEffect(effect: () => void) {
    this._deferredEffects.push(effect)
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

  getFieldSnapshot(index: object): FieldSnapshot {
    const schema = this.getSchemaByIndex(index)
    const name = schema.name

    this.assertInitialized(name, { methodName: 'getFieldSnapshot' })

    // already initialized
    return this._indexToFieldSnapSelector.get(index)!(
      this._valuesProxy,
      this._typedValuesProxy,
      this._fieldsMetaProxy,
      this._deferredEffects,
    )
  }

  initField(index: object) {
    const schema = this.getSchemaByIndex(index)
    const name = schema.name
    const type = schema.type

    if (this._valuesProxy[name] === undefined) {
      this._valuesProxy[name] = ''
    }

    if (this._fieldsMetaProxy[name] === undefined) {
      this._fieldsMetaProxy[name] = { touched: false }
    }

    if (!this._indexToFieldSnapSelector.has(index)) {
      // pure function
      const fieldSnapSelector = (
        valuesProxy: typeof this._valuesProxy,
        typedValuesProxy: typeof this._typedValuesProxy,
        fieldsMetaProxy: typeof this._fieldsMetaProxy,
        deferredEffects: typeof this._deferredEffects,
      ) => ({
        field: {
          name,
          onBlur: (_e: React.FocusEvent) => {
            // will trigger all sync effects firstly
            fieldsMetaProxy[name].touched = true
            typedValuesProxy[name] = convertValueToTyped(
              valuesProxy[name],
              type,
            )

            run(deferredEffects) // then, run deferred effects
          },
          onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
            valuesProxy[name] = e.target.value // will trigger all sync effects firstly
            run(deferredEffects) // then, run deferred effects
          },
          value: valuesProxy[name],
        },
        meta: {
          error: undefined,
          touched: fieldsMetaProxy[name].touched,
          typedValue: typedValuesProxy[name],
        },
      })

      this._indexToFieldSnapSelector.set(
        index,
        createMemoSelector(fieldSnapSelector),
      )
    }
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
      () =>
        // defer callback execution to be after all sync effects
        this.deferEffect(callback),
    )
  }
}
