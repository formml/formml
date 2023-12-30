import { renderHook } from '@testing-library/react'
import useConstant from '../useConstant.js'

describe('useConstant', () => {
  const initializer = () => ({ value: 'something' })

  test('should initialize value in first render', () => {
    expect(
      renderHook(() => useConstant(initializer, [])).result.current,
    ).toEqual({ value: 'something' })
  })

  test('should return same reference when deps have no change', () => {
    // Arrange
    const objectDep = {}
    const { result, rerender } = renderHook(
      (deps) => useConstant(initializer, deps),
      {
        initialProps: ['string', 0, objectDep] as const,
      },
    )
    const firstValue = result.current

    // Act
    rerender(['string', 0, objectDep])

    // Assert
    const secondValue = result.current
    expect(secondValue).toBe(firstValue)

    // Act
    rerender(['string', 0, objectDep])

    // Assert
    const thirdValue = result.current
    expect(thirdValue).toBe(firstValue)
  })

  test('should re-initialize when deps length changes', () => {
    // Arrange
    const { result, rerender } = renderHook(
      (deps) => useConstant(initializer, deps),
      {
        initialProps: [1, 2],
      },
    )
    const firstValue = result.current

    // Act
    rerender([1, 2, 3])

    // Assert
    const secondValue = result.current
    expect(secondValue).not.toBe(firstValue)
    expect(secondValue).toEqual(firstValue)
  })

  test('should re-initialize when deps reference changes', () => {
    // Arrange
    const objectDep = {}
    const { result, rerender } = renderHook(
      (deps) => useConstant(initializer, deps),
      {
        initialProps: ['nochange', objectDep],
      },
    )
    const firstValue = result.current

    // Act
    const anotherObjectDep = {}
    rerender(['nochange', anotherObjectDep])

    // Assert
    const secondValue = result.current
    expect(secondValue).not.toBe(firstValue)
    expect(secondValue).toEqual(firstValue)
  })
})
