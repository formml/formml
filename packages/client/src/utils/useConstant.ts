import React from 'react'

import { isDepsChanged } from './isDepsChanged.js'

export function useConstant<T>(
  initializer: () => T,
  deps: readonly unknown[],
): T {
  const valueRef = React.useRef<T | null>(null)
  const prevDepsRef = React.useRef<null | readonly unknown[]>(null)

  if (valueRef.current === null || isDepsChanged(prevDepsRef.current, deps)) {
    valueRef.current = initializer()
    prevDepsRef.current = deps
  }

  return valueRef.current
}
