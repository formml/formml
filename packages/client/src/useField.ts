import { useCallback, useMemo } from 'react'
import { useSyncExternalStore } from 'use-sync-external-store/shim'

import useFormMLContext from './useFormMLContext.js'

export default function useField(index: object) {
  const formML = useFormMLContext()
  useMemo(() => formML.initField(index), [formML, index])

  return useSyncExternalStore(
    useCallback((cb) => formML.subscribe(index, cb), [formML, index]),
    () => formML.getFieldSnapshot(index),
  )
}
