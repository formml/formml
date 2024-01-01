import { FormMLSchema, createParser } from '@formml/dsl'

export default class FormML {
  private static readonly _parse = createParser()

  private readonly _schema: FormMLSchema
  private _indexToSchema: WeakMap<object, unknown>

  public indexRoot: Record<string, object>

  constructor(schema: string) {
    this._schema = FormML._parse(schema)
    ;[this.indexRoot, this._indexToSchema] = FormML.buildIndexes(this._schema)
  }

  private static buildIndexes(schema: FormMLSchema) {
    const indexRoot: Record<string, object> = {}
    const indexToSchema = new WeakMap<object, unknown>()
    for (const field of schema.form.fields) {
      const fieldIndex = { $type: field.type }
      indexRoot[field.name] = fieldIndex
      indexToSchema.set(fieldIndex, field)
    }
    return [indexRoot, indexToSchema] as const
  }

  getField(index: object) {
    if (!this._indexToSchema.has(index)) {
      throw new Error(
        `given index is invalid, index provided:
        ${JSON.stringify(index, undefined, 4)}`,
      )
    }

    return {
      field: {
        name: 'numberField',
        value: '',
        onChange: () => {},
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
