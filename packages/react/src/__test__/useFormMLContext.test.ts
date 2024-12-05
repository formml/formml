import type { FormML } from '@formml/client'
import type { RenderHookResult } from '@testing-library/react'

import { renderHook } from '@testing-library/react'

import { useFormMLContext } from '../useFormMLContext.js'
import { renderHookWithContext } from './helpers/renderHookWithContext.js'
import suppressErrorOutput from './helpers/suppressErrorOutput.js'

describe('useFormMLContext', () => {
  let restoreConsole: () => void

  beforeAll(() => {
    restoreConsole = suppressErrorOutput()
  })

  afterAll(() => {
    restoreConsole()
  })

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
