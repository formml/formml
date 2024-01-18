import { isDepsChanged } from './isDepsChanged.js'

export function createMemoSelector<Params extends unknown[], Result>(
  selector: (...params: Params) => Result,
): (...params: Params) => Result {
  let prevResult: Result | null = null
  let prevParams: Params | null = null

  return (...params) => {
    if (prevResult === null || isDepsChanged(prevParams, params)) {
      const newResult = selector(...params)
      prevParams = params
      prevResult = newResult
      return newResult
    }
    return prevResult
  }
}
