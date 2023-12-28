import useFormMLContext, { FormMLProvider } from '../useFormMLContext.js'
import { renderHook, RenderHookResult } from '@testing-library/react'

describe('useFormMLContext', () => {
  test('should throw if has no provider', () => {
    expect(() => renderHook(() => useFormMLContext())).toThrow(
      '`useFormMLContext` must be used within a `FormMLProvider`',
    )
  })

  test('should get context value', () => {
    // Arrange
    const dummyFormML = {}
    const wrapper = ({ children }: React.PropsWithChildren) => (
      <FormMLProvider value={dummyFormML}>{children}</FormMLProvider>
    )

    // Act & Assert
    let result: RenderHookResult<unknown, unknown> | undefined
    expect(() => {
      result = renderHook(() => useFormMLContext(), { wrapper })
    }).not.toThrow()
    expect(result?.result.current).toBe(dummyFormML)
  })
})
