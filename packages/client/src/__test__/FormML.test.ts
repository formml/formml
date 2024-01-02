import { FormMLParseError } from '@formml/dsl'
import FormML from '../FormML.js'

describe('FormML', () => {
  describe('constructor', () => {
    test('should throw if schema is invalid', () => {
      // Arrange
      const invalidSchema = `form {}`

      // Act & Assert
      expect(() => new FormML(invalidSchema)).toThrow(FormMLParseError)
    })
  })

  describe('getField', () => {
    test('should throw if index can not be recognized', () => {
      // Arrange
      const schema = `
        form ExampleForm {
          Number   numberField
          Currency currencyField
          Text     textField
          Boolean	 booleanField
          Date		 dateField
        }
      `
      const formML = new FormML(schema)

      // Act & Assert
      const invalidIndex = {}
      expect(() => formML.getField(invalidIndex)).toThrow(
        /given index is invalid, index provided:[\s\S]+/g,
      )
    })

    test('should return field pack', () => {
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
      const pack = formML.getField(index)

      // Assert
      expect(pack).toEqual({
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

    describe('returns', () => {
      test.each([
        'numberField',
        'currencyField',
        'textField',
        'booleanField',
        'dateField',
      ])('should return corresponding field name - %s', (fieldName) => {
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
        const index = formML.indexRoot[fieldName]

        // Act
        const pack = formML.getField(index)

        // Assert
        expect(pack.field.name).toEqual(fieldName)
      })

      test('should return empty value when field is not initialized', () => {
        // Arrange
        const dsl = `
          form ExampleForm {
            Number   numberField
          }
        `
        const formML = new FormML(dsl)
        const index = formML.indexRoot['numberField']

        // Act
        const pack = formML.getField(index)

        // Assert
        expect(pack.field.value).toEqual('')
      })

      test('should return latest value when field has been changed', async () => {
        // Arrange
        const dsl = `
          form ExampleForm {
            Number   numberField
          }
        `
        const formML = new FormML(dsl)
        const index = formML.indexRoot['numberField']
        const pack = formML.getField(index)

        // Act
        const event = {
          target: { value: '123' },
        } as unknown as React.ChangeEvent<HTMLInputElement>
        pack.field.onChange(event)

        // Assert
        const newPack = formML.getField(index)
        expect(newPack.field.value).toEqual('123')
      })

      test('should not be touched when field is fresh', () => {
        // Arrange
        const dsl = `
          form ExampleForm {
            Number   numberField
          }
        `
        const formML = new FormML(dsl)
        const index = formML.indexRoot['numberField']

        // Act
        const pack = formML.getField(index)

        // Assert
        expect(pack.meta.touched).toBe(false)
      })

      test('should always be touched once field is blurred', () => {
        // Arrange
        const dsl = `
          form ExampleForm {
            Number   numberField
          }
        `
        const formML = new FormML(dsl)
        const index = formML.indexRoot['numberField']

        const firstPack = formML.getField(index)
        expect(firstPack.meta.touched).toBe(false)

        // Act
        const event = new FocusEvent('blur') as unknown as React.FocusEvent
        firstPack.field.onBlur(event)

        // Assert
        const secondPack = formML.getField(index)
        expect(secondPack.meta.touched).toBe(true)

        // Act
        secondPack.field.onBlur(event)

        // Assert
        const thirdPack = formML.getField(index)
        expect(thirdPack.meta.touched).toBe(true)
      })
    })
  })
})
