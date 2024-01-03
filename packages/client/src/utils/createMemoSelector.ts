export default function createMemoSelector<Params extends unknown[], Result>(
  getter: (...params: Params) => Result,
): (...params: Params) => Result {
  return getter
}
