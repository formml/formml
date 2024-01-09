import useField from './useField.js'

export default function Field({
  as = 'input',
  index,
}: {
  as?: 'input'
  index: object
}) {
  const { field } = useField(index)
  return <input {...field} />
}
