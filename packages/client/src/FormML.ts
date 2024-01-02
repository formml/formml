import { Field, FormMLSchema, createParser } from '@formml/dsl'

export default class FormML {
  private static readonly _parse = createParser()

  private readonly _schema: FormMLSchema
  private readonly _indexToSchema: WeakMap<object, Field>
  private readonly _values: Record<string, string> = {}

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

  getField(index: object) {
    const schema = this._indexToSchema.get(index)

    if (schema === undefined) {
      throw new Error(
        `given index is invalid, index provided:
        ${JSON.stringify(index, undefined, 4)}`,
      )
    }
    const name = schema.name

    if (this._values[name] === undefined) {
      this._values[name] = ''
    }

    return {
      field: {
        name,
        value: this._values[name],
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
          this._values[name] = e.target.value
        },
        onBlur: () => {},
      },
      meta: {
        touched: false,
        error: undefined,
        typedValue: undefined,
      },
    }
  }
}
