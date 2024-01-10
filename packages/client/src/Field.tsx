import { ChangeEvent, forwardRef } from 'react'

import useField, { FieldPackReadonly } from './useField.js'

type Props = {
  as?: 'input'
  index: object
} & React.ComponentPropsWithoutRef<'input'>

function selectProps({ field, helpers, meta }: FieldPackReadonly) {
  const type = meta.schema.type

  if (type === 'Number' || type === 'Currency') {
    return {
      ...field,
      type: 'number',
    }
  }
  if (type === 'Boolean') {
    return {
      checked: (meta.typedValue as boolean | undefined) ?? false, // TODO: optimize type
      name: field.name,
      onBlur: () => {
        helpers.touch()
      },
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        helpers.setTypedValue(e.target.checked)
      },
      type: 'checkbox',
    }
  }
  return field
}

const Field = forwardRef<HTMLInputElement, Props>(
  ({ as = 'input', index, ...rest }, ref) => {
    const fieldPack = useField(index)
    return <input ref={ref} {...selectProps(fieldPack)} {...rest} />
  },
)

export default Field
