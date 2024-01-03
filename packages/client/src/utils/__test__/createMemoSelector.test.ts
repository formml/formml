import { reactive } from '@vue/reactivity'
import createMemoSelector from '../createMemoSelector.js'

describe('createMemoSelector', () => {
  test('should return selected result', () => {
    // Arrange
    const select = createMemoSelector((observable: { count: number }) => ({
      value: observable.count,
    }))
    const state = reactive({ count: 0 })

    // Act
    const result = select(state)

    // Assert
    expect(result).toEqual({ value: 0 })
  })
})
