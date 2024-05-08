import { useField } from './useField.js'

export default function ErrorMessage({ $bind }: { $bind: object }) {
  const { meta } = useField($bind)
  return meta.error ? meta.error.message : null
}
