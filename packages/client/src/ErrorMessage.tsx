import React from 'react'

import { useField } from './useField.js'

export default function ErrorMessage({
  $bind,
  as,
  ...props
}: {
  $bind: object
  as?: keyof React.ReactHTML
} & React.ComponentPropsWithoutRef<'label'>) {
  const { meta } = useField($bind)
  if (!meta.error) return null
  if (!as) return meta.error.message
  return React.createElement(as, props, meta.error.message)
}
