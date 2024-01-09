import { forwardRef } from 'react'

import useField from './useField.js'

type Props = {
  as?: 'input'
  index: object
} & React.ComponentPropsWithoutRef<'input'>

const Field = forwardRef<HTMLInputElement, Props>(
  ({ as = 'input', index, ...rest }, ref) => {
    const { field } = useField(index)
    return <input {...field} {...rest} ref={ref} />
  },
)

export default Field
