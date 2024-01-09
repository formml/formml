import { PrimitiveType } from '@formml/dsl'
import { forwardRef } from 'react'

import useField from './useField.js'

type Props = {
  as?: 'input'
  index: object
} & React.ComponentPropsWithoutRef<'input'>

function getInputType(type: PrimitiveType) {
  if (type === 'Number' || type === 'Currency') return 'number'
  return 'text'
}

const Field = forwardRef<HTMLInputElement, Props>(
  ({ as = 'input', index, ...rest }, ref) => {
    const { field, meta } = useField(index)
    const type = getInputType(meta.schema.type)
    return <input ref={ref} type={type} {...field} {...rest} />
  },
)

export default Field
