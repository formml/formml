import { renderHook } from '@testing-library/react'
import useField from '../useField.js'

describe('useField', () => {
  describe('I/O', () => {
    test('should throw if has no context', () => {
      const dummyIndex = {}
      expect(() => renderHook(() => useField(dummyIndex))).toThrow()
    })
  })

  describe.todo('behavior')
})
