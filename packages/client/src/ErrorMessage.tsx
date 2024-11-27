import React from 'react'

import type { BaseIndex } from './IndexManager.js'

import { useField } from './useField.js'

function ErrorMessageImpl(
  {
    $bind,
    as,
    ...props
  }: {
    $bind: BaseIndex
    as?: keyof React.ReactHTML
  } & React.HTMLAttributes<HTMLElement>,
  ref: React.Ref<HTMLElement>,
) {
  const { meta } = useField($bind)
  if (!meta.error) return null
  if (!as) return meta.error.message
  return React.createElement(as, { ...props, ref }, meta.error.message)
}

type ErrorMessageComponent = {
  (props: { $bind: BaseIndex }): React.ReactNode
  <TElementName extends keyof React.ReactHTML>(
    props: {
      $bind: BaseIndex
      as: TElementName
    } & React.ComponentPropsWithRef<TElementName>,
  ): React.ReactNode
}

/**
 * A React component that displays validation error messages for bound form field
 * @param props - Component props
 * @param props.$bind - The field index to bind to
 * @param props.as - Optional HTML element name to render the error message with
 * @returns React element showing error message if validation fails
 * @example
 * ```tsx
 * // Returns string directly if no `as` prop was given
 * <span><ErrorMessage $bind={$form.email} /></span>
 *
 * // Returns div, accepting any other props that div can take
 * <ErrorMessage $bind={$form.email} as="div" className="error" />
 * ```
 */
export const ErrorMessage: ErrorMessageComponent =
  React.forwardRef(ErrorMessageImpl)
