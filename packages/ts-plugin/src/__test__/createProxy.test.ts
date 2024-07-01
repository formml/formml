import type tsModule from 'typescript/lib/tsserverlibrary'

import createProxy from '../createProxy'

describe('createProxy', () => {
  test('should call the original method if no override is provided', () => {
    // Arrange
    const originalMethod = vi.fn()
    const host = {
      getScriptFileNames: originalMethod,
    } as unknown as tsModule.LanguageServiceHost

    const proxy = createProxy(host, {})

    // Act
    proxy.getScriptFileNames()

    // Assert
    expect(originalMethod).toHaveBeenCalled()
  })

  test('should call the override method if provided', () => {
    // Arrange
    const originalMethod = vi.fn()
    const overrideMethod = vi.fn()
    const host = {
      getScriptFileNames: originalMethod,
    } as unknown as tsModule.LanguageServiceHost

    const proxy = createProxy(host, {
      getScriptFileNames: overrideMethod,
    })

    // Act
    proxy.getScriptFileNames()

    // Assert
    expect(overrideMethod).toHaveBeenCalled()
    expect(originalMethod).not.toHaveBeenCalled()
  })
})
