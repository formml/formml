import { ReactiveEffectRunner, effect, stop } from '@vue/reactivity'
import isDepsChanged from './isDepsChanged.js'

export default function createMemoSelector<Params extends unknown[], Result>(
  selector: (...params: Params) => Result,
): (...params: Params) => Result {
  let prevResult: Result | null = null
  let prevParams: Params | null = null
  let prevRunner: ReactiveEffectRunner | null = null
  let dirty = false

  return (...params) => {
    if (isDepsChanged(prevParams, params)) {
      dirty = true
    }

    if (!dirty) {
      return prevResult
    }

    prevRunner && stop(prevRunner)
    const newRunner = effect(() => selector(...params), {
      lazy: true,
      scheduler() {
        dirty = true // deps changed
      },
    })
    const newResult = newRunner()

    prevParams = params
    prevResult = newResult
    prevRunner = newRunner
    dirty = false

    return newResult
  }
}
