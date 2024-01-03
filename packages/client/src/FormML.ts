import { Field, FormMLSchema, createParser } from '@formml/dsl'
import { reactive } from '@vue/reactivity'
import { watch } from '@vue-reactivity/watch'

export default class FormML {
  private static readonly _parse = createParser()

  private readonly _schema: FormMLSchema
  private readonly _indexToSchema: WeakMap<object, Field>
  private readonly _valuesProxy: Record<string, string> = reactive({})
  private readonly _fieldsMetaProxy: Record<string, { touched: boolean }> =
    reactive({})

  public readonly indexRoot: Record<string, object>

  constructor(schema: string) {
    this._schema = FormML._parse(schema)
    ;[this.indexRoot, this._indexToSchema] = FormML.buildIndexes(this._schema)
  }

  private static buildIndexes(schema: FormMLSchema) {
    const indexRoot: Record<string, object> = {}
    const indexToSchema = new WeakMap<object, Field>()
    for (const field of schema.form.fields) {
      const fieldIndex = { $type: field.type }
      indexRoot[field.name] = fieldIndex
      indexToSchema.set(fieldIndex, field)
    }
    return [indexRoot, indexToSchema] as const
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
  }

  getFieldSnapshot(index: object) {
    const schema = this.getSchemaByIndex(index)
    const name = schema.name

    if (this._valuesProxy[name] === undefined) {
      throw new Error(
        `Field "${name}" has not been initialized yet, please make sure to call \`initField\` before calling \`getFieldSnapshot\``,
      )
    }

    return {
      field: {
        name,
        value: this._valuesProxy[name],
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
          this._valuesProxy[name] = e.target.value
        },
        onBlur: (_e: React.FocusEvent) => {
          this._fieldsMetaProxy[name].touched = true
        },
      },
      meta: {
        touched: this._fieldsMetaProxy[name].touched,
        error: undefined,
        typedValue: undefined,
      },
    }
  }

  subscribe(index: object, callback: () => void): () => void {
    const schema = this.getSchemaByIndex(index)
    const name = schema.name

    return watch([() => this._valuesProxy[name]], () => callback())
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
