import { Model, PrimitiveType } from '@formml/dsl'
import { JsType as JSType } from '../util/helper-type'

export default class Client {
  private data: Record<string, string | boolean | undefined> = {}

  constructor(private ast: Model) {}

  get(key: string): string | boolean | undefined {
    return this.data[key]
  }

  set(key: string, value: string | boolean) {
    const fieldDef = this.ast.form.fields.find((field) => field.name === key)
    const requiredType: Record<PrimitiveType, JSType> = {
      boolean: 'boolean',
      string: 'string',
      number: 'string',
      date: 'string',
    }
    if (
      fieldDef?.primitiveType &&
      typeof value !== requiredType[fieldDef.primitiveType]
    ) {
      throw new Error(
        `Cannot set a ${typeof value} value into a ${
          fieldDef.primitiveType
        } field.`
      )
    }
    this.data[key] = value
  }
}
