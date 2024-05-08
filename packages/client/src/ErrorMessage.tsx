import { ReactHTML, createElement } from 'react'

import { useField } from './useField.js'

export default function ErrorMessage({
  $bind,
  as,
}: {
  $bind: object
  as?: keyof ReactHTML
}) {
  const { meta } = useField($bind)
  if (!meta.error) return null
  if (!as) return meta.error.message
  return createElement(as, null, meta.error.message)
}
