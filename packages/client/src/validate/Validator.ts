import { Field } from '@formml/dsl'

import * as JsType from '../JsTypes.js'

export default class Validator {
  constructor(_schema: Field) {}

  validate(_value: JsType.PrimitiveType) {
    return { errors: [], isValid: true }
  }
}
