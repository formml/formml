import { Field } from '@formml/dsl'

import { PrimitivesType } from '../JsTypes.js'

export type ValidationError = { message: string }

const validate = (
  value: PrimitivesType,
  schema: Field,
): ValidationError | undefined => {
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
