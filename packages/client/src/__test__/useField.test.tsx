import { renderHook, screen, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import useField from '../useField.js'
import FormML from '../FormML.js'
import renderHookWithContext from './helpers/renderHookWithContext.js'
import renderWithContext from './helpers/renderWithContext.js'

describe('useField', () => {
  describe('hook only', () => {
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
      ).toThrow(/Given index is invalid, index provided:[\s\S]+/g)
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

    test('should return new value if onChange triggered', async () => {
      // Arrange
      const dsl = `
        form ExampleForm {
          Number numberField
        }
      `
      const formML = new FormML(dsl)
      const index = formML.indexRoot['numberField']
      const { result } = renderHookWithContext(() => useField(index), formML)

      // Act
      result.current.field.onChange({
        target: { value: '1' },
      } as unknown as React.ChangeEvent<HTMLInputElement>)

      // Assert
      await waitFor(() => expect(result.current.field.value).toEqual('1'))
    })
  })

  describe('integration', () => {
    test('should update value properly when user inputs', async () => {
      // Arrange
      const TestInput = ({ index }: { index: object }) => {
        const { field } = useField(index)
        return <input {...field} />
      }

      const dsl = `
        form ExampleForm {
          Number numberField
        }
      `
      const formML = new FormML(dsl)
      const index = formML.indexRoot['numberField']

      renderWithContext(<TestInput index={index} />, formML)

      const input = screen.getByRole('textbox')
      expect(input).toHaveDisplayValue('')

      // Act
      const user = userEvent.setup()
      await user.type(input, '123')

      // Assert
      expect(input).toHaveDisplayValue('123')
    })
  })
})
