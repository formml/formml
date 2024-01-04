import { useSyncExternalStore } from 'use-sync-external-store/shim'
import useFormMLContext from './useFormMLContext.js'

export default function useField(index: object) {
  const formML = useFormMLContext()
  formML.initField(index)

  return useSyncExternalStore(
    (cb) => formML.subscribe(index, cb),
    () => formML.getFieldSnapshot(index),
  )
}
