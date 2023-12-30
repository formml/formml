import FormML from '../FormML.js'
import useFormMLContext, { FormMLProvider } from '../useFormMLContext.js'
import { renderHook, RenderHookResult } from '@testing-library/react'

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
