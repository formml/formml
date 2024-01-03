import useFormMLContext from './useFormMLContext.js'

export default function useField(index: object) {
  const formML = useFormMLContext()
  formML.initField(index)
  return formML.getFieldSnapshot(index)
}
