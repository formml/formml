import dayjs from 'dayjs'
import { ChangeEvent, ForwardedRef, forwardRef } from 'react'

import useField, { FieldPackReadonly } from './useField.js'
import omit from './utils/omit.js'

function selectInputProps({ field, helpers, meta }: FieldPackReadonly) {
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
  if (type === 'DateTime') {
    return {
      ...field,
      type: 'datetime-local',
      value: field.value && dayjs(field.value).format('YYYY-MM-DDTHH:mm'),
    }
  }
  return field
}

type InputProps = { as?: 'input' } & React.ComponentPropsWithoutRef<'input'>
type TextAreaProps = {
  as: 'textarea'
} & React.ComponentPropsWithoutRef<'textarea'>

type Props = {
  index: object
} & (InputProps | TextAreaProps)

const Field = forwardRef<HTMLInputElement | HTMLTextAreaElement, Props>(
  function Field({ index, ...rest }, ref) {
    const fieldPack = useField(index)

    if (rest.as === undefined || rest.as === 'input') {
      return (
        <input
          ref={ref as ForwardedRef<HTMLInputElement>}
          {...selectInputProps(fieldPack)}
          {...omit(rest, ['as'])}
        />
      )
    }
    if (rest.as === 'textarea') {
      return (
        <textarea
          ref={ref as ForwardedRef<HTMLTextAreaElement>}
          {...fieldPack.field}
          {...omit(rest, ['as'])}
        />
      )
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const never: never = rest.as
    return null
  },
)

export default Field
