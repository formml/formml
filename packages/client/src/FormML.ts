import { Field, FormMLSchema, createParser } from '@formml/dsl'
import { DeepReadonly, reactive } from '@vue/reactivity'
import { watch } from '@vue-reactivity/watch'
import createMemoSelector from './utils/createMemoSelector.js'

export type FieldProps = {
  name: string
  value: string
  onChange: React.ChangeEventHandler<HTMLInputElement>
  onBlur: React.FocusEventHandler
}

export type FieldMetaData = {
  error: undefined
  touched: boolean
  typedValue: number | undefined
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

export default class FormML {
  private static readonly _parse = createParser()

  private readonly _schema: FormMLSchema
  private readonly _indexToSchema: WeakMap<object, Field>
  private readonly _valuesProxy: Record<string, string> = reactive({})
  private readonly _fieldsMetaProxy: Record<string, { touched: boolean }> =
    reactive({})
  private readonly _indexToFieldSnapSelector: Map<
    object,
    (
      valuesProxy: typeof this._valuesProxy,
      fieldsMetaProxy: typeof this._fieldsMetaProxy,
      deferredEffects: typeof this._deferredEffects,
    ) => FieldSnapshot
  > = new Map()
  private readonly _deferredEffects: (() => void)[] = []

  public readonly indexRoot: Record<string, object>

  constructor(schema: string) {
    this._schema = FormML._parse(schema)
    ;[this.indexRoot, this._indexToSchema] = buildIndexes(this._schema)
  }

  initField(index: object) {
    const schema = this.getSchemaByIndex(index)
    const name = schema.name

    if (this._valuesProxy[name] === undefined) {
      this._valuesProxy[name] = ''
    }

    if (this._fieldsMetaProxy[name] === undefined) {
      this._fieldsMetaProxy[name] = { touched: false }
    }

    if (!this._indexToFieldSnapSelector.has(index)) {
      // pure function
      const fieldSnapSelector = (
        valuesProxy: Record<string, string>,
        fieldsMetaProxy: Record<string, { touched: boolean }>,
        deferredEffects: (() => void)[],
      ) => ({
        field: {
          name,
          value: valuesProxy[name],
          onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
            valuesProxy[name] = e.target.value // will trigger all sync effects firstly
            run(deferredEffects) // then, run deferred effects
          },
          onBlur: (_e: React.FocusEvent) => {
            fieldsMetaProxy[name].touched = true // will trigger all sync effects firstly
            run(deferredEffects) // then, run deferred effects
          },
        },
        meta: {
          touched: fieldsMetaProxy[name].touched,
          error: undefined,
          typedValue: undefined,
        },
      })

      this._indexToFieldSnapSelector.set(
        index,
        createMemoSelector(fieldSnapSelector),
      )
    }
  }

  getFieldSnapshot(index: object): FieldSnapshot {
    const schema = this.getSchemaByIndex(index)
    const name = schema.name

    this.assertInitialized(name, { methodName: 'getFieldSnapshot' })

    // already initialized
    return this._indexToFieldSnapSelector.get(index)!(
      this._valuesProxy,
      this._fieldsMetaProxy,
      this._deferredEffects,
    )
  }

  subscribe(index: object, callback: () => void): () => void {
    const schema = this.getSchemaByIndex(index)
    const name = schema.name

    this.assertInitialized(name, { methodName: 'subscribe' })

    return watch(
      [
        () => this._valuesProxy[name],
        () => this._fieldsMetaProxy[name].touched,
      ],
      () =>
        // defer callback execution to be after all sync effects
        this.deferEffect(callback),
    )
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
}
