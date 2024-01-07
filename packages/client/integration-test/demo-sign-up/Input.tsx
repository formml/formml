import useField from '../../src/useField.js'

export default function Input({ id, index }: { id?: string; index: object }) {
  const { field } = useField(index)
  return <input id={id} {...field} />
}
