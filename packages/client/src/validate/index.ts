import { Field } from '@formml/dsl'

import { PrimitivesType } from '../JsTypes.js'

const validate = (value: PrimitivesType, schema: Field) => {
  for (const annotation of schema.annotations) {
    if (annotation.name === 'required') {
      if (value === undefined) {
        return { message: 'This field is required' }
      }
    }
  }
  return undefined
}

export default validate
