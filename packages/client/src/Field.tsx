import type { ChangeEvent, ForwardedRef } from 'react'

import { assertNever } from '@formml/utils'
import dayjs from 'dayjs'
import { forwardRef } from 'react'

import type { BaseIndex } from './IndexManager.js'
import type { FieldPack } from './useField.js'

import { useField } from './useField.js'
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

/**
 * A smart field component that displays the bound form field with appropriate default settings.
 *
 * *The Default Settings refer to a batch of HTML attributes inferred by a heuristic algorithm. You can override them anytime you like.*
 *
 * @param props - Component props
 * @param props.$bind - The field index to bind to
 * @param props.as - Optional HTML element name to render the field with, defaults to `input`
 * @returns A controlled form `input`/`textarea` element
 *
 * @example
 * ```tsx
 * // usual text input
 * <Field $bind={$form.text} />
 *
 * // textarea
 * <Field $bind={$form.bio} as="textarea" />
 *
 * // displays as a checkbox
 * <Field $bind={$form.bool} />
 *
 * // type="number"
 * <Field $bind={$form.num} />
 *
 * // type="datetime-local"
 * <Field $bind={$form.datetime} />
 *
 * // accepts any other props that input can take
 * <Field
 *   $bind={$form.email}
 *   type="email"
 *   className="email"
 *   ref={myRef}
 * />
 * ```
 */
export const Field = forwardRef<HTMLInputElement | HTMLTextAreaElement, Props>(
  function Field({ $bind, ...rest }: Props, ref) {
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
    return assertNever`Unsupported element name: ${rest.as}.`
  },
)
