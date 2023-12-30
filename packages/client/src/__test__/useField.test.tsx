import { renderHook } from '@testing-library/react'
import useField from '../useField.js'
import { FormMLProvider } from '../useFormMLContext.js'
import FormML from '../FormML.js'

describe('useField', () => {
  describe('I/O', () => {
    // mute react warnings for uncaught errors in console
    vi.spyOn(console, 'error').mockImplementation(() => vi.fn())

    test('should throw if has no context', () => {
      const dummyIndex = {}
      expect(() => renderHook(() => useField(dummyIndex))).toThrow()
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
      const wrapper = ({ children }: React.PropsWithChildren) => (
        <FormMLProvider value={formML}>{children}</FormMLProvider>
      )
      expect(() =>
        renderHook(() => useField(invalidIndex), { wrapper }),
      ).toThrow()
    })
  })

  describe.todo('behavior')
})
