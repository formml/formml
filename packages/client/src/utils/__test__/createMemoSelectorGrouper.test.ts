import createMemoSelectorGrouper from '../createMemoSelectorGrouper.js'

describe('createMemoSelectorGrouper', () => {
  test('should create memorized selector', () => {
    // Arrange
    const selector = (count: number, times: number) => ({
      result: count * times,
    })

    // Act
    const memoSelector = createMemoSelectorGrouper(selector)({})
    const firstResult = memoSelector(1, 2)
    const secondResult = memoSelector(1, 2)

    // Assert
    expect(secondResult).toBe(firstResult)
  })

  test('should group memorized selector by key', () => {
    // Arrange
    const selector = (count: number, times: number) => ({
      result: count * times,
    })
    const keyA = {}
    const keyB = {}
    const selectorByKey = createMemoSelectorGrouper(selector)

    // Act
    const firstResultA = selectorByKey(keyA)(1, 2)
    const firstResultB = selectorByKey(keyB)(1, 2)
    const secondResultA = selectorByKey(keyA)(100, 2)
    const secondResultB = selectorByKey(keyB)(1, 2)

    // Assert
    expect(secondResultA).not.toBe(firstResultA)
    expect(secondResultB).toBe(firstResultB)
  })
})
