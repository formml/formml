import React from 'react'

import { useField } from './useField.js'

export default function ErrorMessage<
  TElementName extends keyof React.ReactHTML,
>(
  props: {
    $bind: object
    as: TElementName
  } & React.ComponentPropsWithoutRef<TElementName>,
): React.ReactNode
export default function ErrorMessage(props: { $bind: object }): React.ReactNode
export default function ErrorMessage({
  $bind,
  as,
  ...props
}: {
  $bind: object
  as?: keyof React.ReactHTML
} & React.HTMLAttributes<HTMLElement>) {
  const { meta } = useField($bind)
  if (!meta.error) return null
  if (!as) return meta.error.message
  return React.createElement(as, props, meta.error.message)
}
