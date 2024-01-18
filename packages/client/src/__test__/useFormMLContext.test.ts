import { RenderHookResult, renderHook } from '@testing-library/react'

import { FormML } from '../FormML.js'
import { useFormMLContext } from '../useFormMLContext.js'
import { renderHookWithContext } from './helpers/renderHookWithContext.js'

describe('useFormMLContext', () => {
  // mute react warnings for uncaught errors in console
  vi.spyOn(console, 'error').mockImplementation(() => vi.fn())

  test('should throw if has no provider', () => {
    expect(() => renderHook(() => useFormMLContext())).toThrow(
      '`useFormMLContext` must be used within a `FormMLProvider`',
    )
  })

  test('should get context value', () => {
    // Arrange
    const dummyFormML = {} as FormML

    // Act & Assert
    let result: RenderHookResult<unknown, unknown> | undefined
    expect(() => {
      result = renderHookWithContext(() => useFormMLContext(), dummyFormML)
    }).not.toThrow()
    expect(result?.result.current).toBe(dummyFormML)
  })
})
