import { Field } from '@formml/dsl'

import * as JsType from '../JsTypes.js'

export default class Validator {
  constructor(_schema: Field) {}

  validate(_value: JsType.PrimitivesType) {
    return { errors: [], isValid: true }
  }
}
