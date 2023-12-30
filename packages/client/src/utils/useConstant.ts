import React from 'react'

function isDepsChanged(
  prevDeps: readonly unknown[] | null,
  currDeps: readonly unknown[],
) {
  if (prevDeps === null) return true
  if (prevDeps.length !== currDeps.length) return true

  for (let index = 0; index < currDeps.length; index++) {
    const prev = prevDeps[index]
    const curr = currDeps[index]
    if (!Object.is(prev, curr)) return true
  }
  return false
}

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
