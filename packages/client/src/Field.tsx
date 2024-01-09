import useField from './useField.js'

export default function Field({
  as = 'input',
  index,
  ...rest
}: {
  as?: 'input'
  index: object
} & React.ComponentPropsWithoutRef<'input'>) {
  const { field } = useField(index)
  return <input {...field} {...rest} />
}
