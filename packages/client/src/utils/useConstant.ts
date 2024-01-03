import React from 'react'
import isDepsChanged from './isDepsChanged.js'

export default function useConstant<T>(
  initializer: () => T,
  deps: readonly unknown[],
): T {
  const valueRef = React.useRef<T | null>(null)
  const prevDepsRef = React.useRef<readonly unknown[] | null>(null)

  if (valueRef.current === null || isDepsChanged(prevDepsRef.current, deps)) {
    valueRef.current = initializer()
    prevDepsRef.current = deps
  }

  return valueRef.current
}
