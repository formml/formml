export default function isDepsChanged(
  prevDeps: null | readonly unknown[],
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
