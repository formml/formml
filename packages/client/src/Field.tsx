import useField from './useField.js'

export default function Field({ index }: { index: object }) {
  const { field } = useField(index)
  return <input {...field} />
}
