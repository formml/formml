import { FormMLParseError } from '@formml/dsl'
import FormML, { type FieldSnapshot } from '../FormML.js'

describe('FormML', () => {
  describe('constructor', () => {
    test('should throw if schema is invalid', () => {
      // Arrange
      const invalidSchema = `form {}`

      // Act & Assert
      expect(() => new FormML(invalidSchema)).toThrow(FormMLParseError)
    })
  })

  describe('initField', () => {
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
      expect(() => formML.initField(invalidIndex)).toThrow(
        /Given index is invalid, index provided:[\s\S]+/g,
      )
    })

    test('should initialize field if given field is not initialized yet', () => {
      // Arrange
      const dsl = `
        form ExampleForm {
          Number numberField
        }
      `
      const formML = new FormML(dsl)
      const index = formML.indexRoot['numberField']

      // Act
      formML.initField(index)

      // Assert
      let pack: unknown
      expect(() => (pack = formML.getFieldSnapshot(index))).not.toThrow()
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

    test('should do nothing if given field has been initialized', () => {
      // Arrange
      const dsl = `
        form ExampleForm {
          Number numberField
        }
      `
      const formML = new FormML(dsl)
      const index = formML.indexRoot['numberField']

      formML.initField(index)
      const firstPack = formML.getFieldSnapshot(index)

      // Act
      formML.initField(index)
      const secondPack = formML.getFieldSnapshot(index)

      // Assert
      expect(secondPack).toEqual({
        field: {
          ...firstPack.field,
          onChange: expect.any(Function),
          onBlur: expect.any(Function),
        },
        meta: firstPack.meta,
      })
    })
  })

  describe('getFieldSnapshot', () => {
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
      expect(() => formML.getFieldSnapshot(invalidIndex)).toThrow(
        /Given index is invalid, index provided:[\s\S]+/g,
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
      formML.initField(index)

      // Act
      const pack = formML.getFieldSnapshot(index)

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
        formML.initField(index)

        // Act
        const pack = formML.getFieldSnapshot(index)

        // Assert
        expect(pack.field.name).toEqual(fieldName)
      })

      test('should throw when field is not initialized', () => {
        // Arrange
        const dsl = `
          form ExampleForm {
            Number   numberField
          }
        `
        const formML = new FormML(dsl)
        const index = formML.indexRoot['numberField']

        // Act & Assert
        expect(() => formML.getFieldSnapshot(index)).toThrow(
          'Field "numberField" has not been initialized yet, please make sure to call `initField` before calling `getFieldSnapshot`',
        )
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
        formML.initField(index)
        const pack = formML.getFieldSnapshot(index)

        // Act
        const event = {
          target: { value: '123' },
        } as unknown as React.ChangeEvent<HTMLInputElement>
        pack.field.onChange(event)

        // Assert
        const newPack = formML.getFieldSnapshot(index)
        expect(newPack).not.toBe(pack)
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
        formML.initField(index)

        // Act
        const pack = formML.getFieldSnapshot(index)

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
        formML.initField(index)

        const firstPack = formML.getFieldSnapshot(index)
        expect(firstPack.meta.touched).toBe(false)

        // Act
        const event = new FocusEvent('blur') as unknown as React.FocusEvent
        firstPack.field.onBlur(event)

        // Assert
        const secondPack = formML.getFieldSnapshot(index)
        expect(secondPack.meta.touched).toBe(true)

        // Act
        secondPack.field.onBlur(event)

        // Assert
        const thirdPack = formML.getFieldSnapshot(index)
        expect(thirdPack.meta.touched).toBe(true)
      })
    })

    describe('caches', () => {
      test('should return cached snapshot if no value changes', () => {
        // Arrange
        const dsl = `
          form ExampleForm {
            Number numberField
          }
        `
        const formML = new FormML(dsl)
        const index = formML.indexRoot['numberField']
        formML.initField(index)

        const firstPack = formML.getFieldSnapshot(index)

        // Act
        const secondPack = formML.getFieldSnapshot(index)

        // Assert
        expect(secondPack).toBe(firstPack)
      })
    })

    test('should return cached snapshot if other field value changes', () => {
      // Arrange
      const dsl = `
        form ExampleForm {
          Number numberField1
          Number numberField2
        }
      `
      const formML = new FormML(dsl)
      const index1 = formML.indexRoot['numberField1']
      formML.initField(index1)
      const index2 = formML.indexRoot['numberField2']
      formML.initField(index2)

      const firstPack = formML.getFieldSnapshot(index1)

      // Act
      const field2Pack = formML.getFieldSnapshot(index2)
      field2Pack.field.onChange({
        target: { value: '123' },
      } as unknown as React.ChangeEvent<HTMLInputElement>)

      // Assert
      const secondPack = formML.getFieldSnapshot(index1)
      expect(secondPack).toBe(firstPack)
    })
  })

  describe('subscribe', () => {
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
      expect(() => formML.subscribe(invalidIndex, () => {})).toThrow(
        /Given index is invalid, index provided:[\s\S]+/g,
      )
    })

    test('should react to field value change', () => {
      // Arrange
      const schema = `
        form ExampleForm {
          Number numberField
        }
      `
      const formML = new FormML(schema)
      const index = formML.indexRoot['numberField']
      const callback = vi.fn()
      formML.subscribe(index, callback)

      // Act
      formML.initField(index) // first change
      const {
        field: { onChange },
      } = formML.getFieldSnapshot(index)
      onChange({
        target: { value: '123' },
      } as unknown as React.ChangeEvent<HTMLInputElement>) // second change

      // Assert
      expect(callback).toBeCalledTimes(2)
    })

    // This is necessary because of a known limitation of memo selector
    // Refer to `createMemoSelector.test.ts`: '[Known Issue] should return new result in another watcher if accessing values changed'
    test('should call callback after snapshots updated', () => {
      // Arrange
      const schema = `
        form ExampleForm {
          Number numberField
        }
      `
      const formML = new FormML(schema)
      const index = formML.indexRoot['numberField']
      formML.initField(index)

      const firstSnapshot = formML.getFieldSnapshot(index)

      let secondSnapshot: FieldSnapshot | undefined
      formML.subscribe(index, () => {
        secondSnapshot = formML.getFieldSnapshot(index)
      })

      // Act
      firstSnapshot.field.onChange({
        target: { value: '123' },
      } as unknown as React.ChangeEvent<HTMLInputElement>)

      // Assert
      expect(secondSnapshot).not.toBe(firstSnapshot)
      expect(secondSnapshot?.field.value).toEqual('123')
    })
  })
})
