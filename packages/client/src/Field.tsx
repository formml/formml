import dayjs from 'dayjs'
import { ChangeEvent, ForwardedRef, forwardRef } from 'react'

import { BaseIndex } from './IndexManager.js'
import { FieldPack, useField } from './useField.js'
import { omit } from './utils/omit.js'

function selectInputProps({ field, helpers, meta }: FieldPack) {
  const type = meta.schema.type

  if (type === 'num' || type === 'decimal') {
    return {
      ...field,
      type: 'number',
    }
  }
  if (type === 'bool') {
    return {
      checked: (meta.typedValue as boolean | undefined) ?? false, // TODO: optimize type
      name: field.name,
      onBlur: () => {
        helpers.blur()
      },
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        helpers.setTypedValue(e.target.checked)
      },
      type: 'checkbox',
    }
  }
  if (type === 'datetime') {
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
  $bind: BaseIndex
} & (InputProps | TextAreaProps)

export const Field = forwardRef<HTMLInputElement | HTMLTextAreaElement, Props>(
  function Field({ $bind, ...rest }, ref) {
    const fieldPack = useField($bind)

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
