import { renderHook } from '@testing-library/react'
import useField from '../useField.js'
import FormML from '../FormML.js'
import renderHookWithContext from './utils/renderHookWithContext.js'

describe('useField', () => {
  describe('I/O', () => {
    // mute react warnings for uncaught errors in console
    vi.spyOn(console, 'error').mockImplementation(() => vi.fn())

    test('should throw if has no context', () => {
      const dummyIndex = {}
      expect(() => renderHook(() => useField(dummyIndex))).toThrow(
        '`useFormMLContext` must be used within a `FormMLProvider`',
      )
    })

    test('should throw if index can not be recognized', () => {
      // Arrange
      const dsl = `
        form ExampleForm {
          Number   numberField
          Currency currencyField
          Text     textField
          Boolean	 booleanField
          Date		 dateField
        }
      `
      const formML = new FormML(dsl)
      const invalidIndex = {}

      // Act & Assert
      expect(() =>
        renderHookWithContext(() => useField(invalidIndex), formML),
      ).toThrow(/given index is invalid, index provided:[\s\S]+/g)
    })

    test('should return field pack given valid index', () => {
      // Arrange
      const dsl = `
        form ExampleForm {
          Number   numberField
          Currency currencyField
          Text     textField
          Boolean	 booleanField
          Date		 dateField
        }
      `
      const formML = new FormML(dsl)
      const index = formML.indexRoot['numberField']

      // Act
      const { result } = renderHookWithContext(() => useField(index), formML)

      // Assert
      expect(result.current).toEqual({
        field: {
          name: 'numberField',
          value: '',
          onChange: expect.any(Function),
          onBlur: expect.any(Function),
        },
        meta: {
          touched: false,
          error: undefined,
          typedValue: undefined,
        },
      })
    })
  })

  describe.todo('behavior')
})
