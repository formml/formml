import { Field } from '@formml/dsl'
import { BaseSchema, number, safeParse } from 'valibot'

import * as JsType from '../JsTypes.js'

export default class Validator {
  private readonly _valibotSchema: BaseSchema
  constructor(_schema: Field) {
    this._valibotSchema = number()
  }

  validate(value: JsType.PrimitiveType) {
    const result = safeParse(this._valibotSchema, value)
    return { errors: result.issues, isValid: result.success }
  }
}
