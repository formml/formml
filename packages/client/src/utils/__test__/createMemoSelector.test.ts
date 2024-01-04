import { reactive } from '@vue/reactivity'
import createMemoSelector from '../createMemoSelector.js'
import { watch } from '@vue-reactivity/watch'

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

  test('should return new result if accessing values changed', () => {
    // Arrange
    const selector = (observable: { count: number; other: string }) => ({
      value: observable.count,
    })
    const select = createMemoSelector(selector)
    const state = reactive({ count: 0, other: 'no change' })

    const firstResult = select(state)

    // Act
    state.count++
    const secondResult = select(state)

    // Assert
    expect(secondResult).not.toBe(firstResult)
    expect(secondResult).toEqual({ value: 1 })
  })

  test.todo(
    '[Known Issue] should return new result in another watcher if accessing values changed',
    () => {
      // Arrange
      const selector = (observable: { count: number; other: string }) => ({
        value: observable.count,
      })
      const select = createMemoSelector(selector)
      const state = reactive({ count: 0, other: 'no change' })

      const firstResult = select(state)
      let secondResult
      watch(state, () => {
        secondResult = select(state)
      })

      // Act
      state.count++

      // Assert
      expect(secondResult).not.toBe(firstResult)
      expect(secondResult).toEqual({ value: 1 })
    },
  )

  test('should return new result if accessing values changed - multiple args', () => {
    // Arrange
    const selector = (
      observableA: { count: number; other: string },
      observableB: { count: number },
    ) => ({
      value: observableA.count + observableB.count,
    })
    const select = createMemoSelector(selector)
    const stateA = reactive({ count: 0, other: 'no change' })
    const stateB = reactive({ count: 0 })

    const firstResult = select(stateA, stateB)

    // Act
    stateA.count++
    const secondResult = select(stateA, stateB)

    // Assert
    expect(secondResult).not.toBe(firstResult)
    expect(secondResult).toEqual({ value: 1 })
  })

  test('should return new result if nested accessing values changed', () => {
    // Arrange
    const selector = (observable: {
      nested: { count: number; other: string }
      other: string
    }) => ({
      value: observable.nested.count,
    })
    const select = createMemoSelector(selector)
    const state = reactive({
      nested: { count: 0, other: 'no change' },
      other: 'no change',
    })

    const firstResult = select(state)

    // Act
    state.nested.count++
    const secondResult = select(state)

    // Assert
    expect(secondResult).not.toBe(firstResult)
    expect(secondResult).toEqual({ value: 1 })
  })

  test('should return new result if argument reference changed', () => {
    // Arrange
    const selector = (observable: { count: number; other: string }) => ({
      value: observable.count,
    })
    const select = createMemoSelector(selector)
    const state = reactive({ count: 0, other: 'no change' })

    const firstResult = select(state)

    // Act
    const newState = reactive({ count: 0, other: 'no change' })
    const secondResult = select(newState)

    // Assert
    expect(secondResult).not.toBe(firstResult)
    expect(secondResult).toEqual({ value: 0 })
  })

  test('should return new result if argument length changed', () => {
    // Arrange
    const selector = (
      observable: { count: number; other: string },
      times?: number,
    ) => ({
      value: observable.count * (times ?? 1),
    })
    const select = createMemoSelector(selector)
    const state = reactive({ count: 0, other: 'no change' })

    const firstResult = select(state)

    // Act
    const secondResult = select(state, 1)

    // Assert
    expect(secondResult).not.toBe(firstResult)
    expect(secondResult).toEqual({ value: 0 })
  })

  test('should return cached result if accessing values have no change', () => {
    // Arrange
    const selector = (observable: { count: number; other: string }) => ({
      value: observable.count,
    })
    const select = createMemoSelector(selector)
    const state = reactive({ count: 0, other: 'not accessed' })

    const firstResult = select(state)

    // Act
    state.other = 'should have no effect'
    const secondResult = select(state)

    // Assert
    expect(secondResult).toBe(firstResult)
  })

  test('should return cached result if accessing values have no change - nested', () => {
    // Arrange
    const selector = (observable: {
      nested: { count: number; other: string }
      other: string
    }) => ({
      value: observable.nested.count,
    })
    const select = createMemoSelector(selector)
    const state = reactive({
      nested: { count: 0, other: 'no change' },
      other: 'no change',
    })

    const firstResult = select(state)

    // Act
    state.other = 'should have no effect'
    state.nested.other = 'should have no effect'
    const secondResult = select(state)

    // Assert
    expect(secondResult).toBe(firstResult)
  })
})
