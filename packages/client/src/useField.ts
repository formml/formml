import useFormMLContext from './useFormMLContext.js'

export default function useField(index: object) {
  const formML = useFormMLContext()
  return formML.getField(index)
}
