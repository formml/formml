import { createMemoSelector } from '../createMemoSelector.js'

describe('createMemoSelector', () => {
  test('should return selected result', () => {
    // Arrange
    const select = createMemoSelector((state: { count: number }) => ({
      value: state.count,
    }))
    const state = { count: 0 }

    // Act
    const result = select(state)

    // Assert
    expect(result).toEqual({ value: 0 })
  })

  test('should return new result if argument reference changed', () => {
    // Arrange
    const selector = (state: { count: number; other: string }) => ({
      value: state.count,
    })
    const select = createMemoSelector(selector)
    const state = { count: 0, other: 'no change' }

    const firstResult = select(state)

    // Act
    const newState = { ...state }
    const secondResult = select(newState)

    // Assert
    expect(secondResult).not.toBe(firstResult)
    expect(secondResult).toEqual({ value: 0 })
  })

  test('should return new result if argument length changed', () => {
    // Arrange
    const selector = (
      state: { count: number; other: string },
      times?: number,
    ) => ({
      value: state.count * (times ?? 1),
    })
    const select = createMemoSelector(selector)
    const state = { count: 0, other: 'no change' }

    const firstResult = select(state)

    // Act
    const secondResult = select(state, 1)

    // Assert
    expect(secondResult).not.toBe(firstResult)
    expect(secondResult).toEqual({ value: 0 })
  })

  test('should return cached result if arguments have no change', () => {
    // Arrange
    const selector = (state: { count: number; other: string }) => ({
      value: state.count,
    })
    const select = createMemoSelector(selector)
    const state = { count: 0, other: 'no change' }

    const firstResult = select(state)

    // Act
    const secondResult = select(state)

    // Assert
    expect(secondResult).toBe(firstResult)
  })
})
