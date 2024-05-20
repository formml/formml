import React from 'react'

import { useField } from './useField.js'

function ErrorMessageImpl(
  {
    $bind,
    as,
    ...props
  }: {
    $bind: object
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
  (props: { $bind: object }): React.ReactNode
  <TElementName extends keyof React.ReactHTML>(
    props: {
      $bind: object
      as: TElementName
    } & React.ComponentPropsWithRef<TElementName>,
  ): React.ReactNode
}

const ErrorMessage: ErrorMessageComponent = React.forwardRef(ErrorMessageImpl)

export default ErrorMessage
