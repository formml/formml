import { createMemoSelector } from './createMemoSelector.js'

export function createMemoSelectorGrouper<
  TKey extends object,
  Params extends unknown[],
  Result,
>(
  selector: (...params: Params) => Result,
): (groupKey: TKey) => (...params: Params) => Result {
  const keyToSelector = new WeakMap<TKey, (...params: Params) => Result>()
  return (groupKey: TKey) => {
    if (!keyToSelector.has(groupKey)) {
      const memorizedSelector = createMemoSelector(selector)
      keyToSelector.set(groupKey, memorizedSelector)
    }
    return keyToSelector.get(groupKey)!
  }
}
