import { FormMLParseError } from '@formml/dsl'
import currency from 'currency.js'

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

  describe('initField', () => {
    test('should throw if index can not be recognized', () => {
      // Arrange
      const schema = `
        form ExampleForm {
          Number   numberField
          Currency currencyField
          Text     textField
          Boolean	 booleanField
          DateTime datetimeField
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
      expect(() => (pack = formML.getField(index))).not.toThrow()
      expect(pack).toEqual({
        error: undefined,
        schema: expect.objectContaining({
          $type: 'Field',
          name: 'numberField',
          type: 'Number',
        }),

        // Part: raw value
        commitRawValue: expect.any(Function),
        rawValue: '',
        setRawValue: expect.any(Function),

        // Part: value
        setValue: expect.any(Function),
        value: undefined,

        // Part: touch
        touch: expect.any(Function),
        touched: false,
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
      const firstPack = formML.getField(index)

      // Act
      formML.initField(index)
      const secondPack = formML.getField(index)

      // Assert
      expect(secondPack).toEqual(firstPack)
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
          DateTime datetimeField
        }
      `
      const formML = new FormML(schema)

      // Act & Assert
      const invalidIndex = {}
      expect(() => formML.getField(invalidIndex)).toThrow(
        /Given index is invalid, index provided:[\s\S]+/g,
      )
    })

    test('should throw when field is not initialized', () => {
      // Arrange
      const dsl = `
        form ExampleForm {
          Number numberField
        }
      `
      const formML = new FormML(dsl)
      const index = formML.indexRoot['numberField']

      // Act & Assert
      expect(() => formML.getField(index)).toThrow(
        'Field "numberField" has not been initialized yet, please make sure to call `initField` before calling `getField`',
      )
    })

    test('should return initial field pack', () => {
      // Arrange
      const dsl = `
        form ExampleForm {
          Number   numberField
          Currency currencyField
          Text     textField
          Boolean	 booleanField
          DateTime datetimeField
        }
      `
      const formML = new FormML(dsl)
      const index = formML.indexRoot['numberField']
      formML.initField(index)

      // Act
      const pack = formML.getField(index)

      // Assert
      expect(pack).toEqual({
        error: undefined,
        schema: expect.objectContaining({
          $type: 'Field',
          name: 'numberField',
          type: 'Number',
        }),

        // Part: raw value
        commitRawValue: expect.any(Function),
        rawValue: '',
        setRawValue: expect.any(Function),

        // Part: value
        setValue: expect.any(Function),
        value: undefined,

        // Part: touch
        touch: expect.any(Function),
        touched: false,
      })
    })

    describe('returns', () => {
      test.each`
        type          | fieldName
        ${'Number'}   | ${'numberField'}
        ${'Currency'} | ${'currencyField'}
        ${'Text'}     | ${'textField'}
        ${'Boolean'}  | ${'booleanField'}
        ${'DateTime'} | ${'datetimeField'}
      `(
        'should return corresponding field schema - $fieldName',
        ({ fieldName, type }) => {
          // Arrange
          const dsl = `
            form ExampleForm {
              Number   numberField
              Currency currencyField
              Text     textField
              Boolean	 booleanField
              DateTime datetimeField
            }
          `
          const formML = new FormML(dsl)
          const index = formML.indexRoot[fieldName]
          formML.initField(index)

          // Act
          const pack = formML.getField(index)

          // Assert
          expect(pack.schema).toEqual(
            expect.objectContaining({
              $type: 'Field',
              name: fieldName,
              type: type,
            }),
          )
        },
      )

      test('should return latest raw value when field has been changed', async () => {
        // Arrange
        const dsl = `
          form ExampleForm {
            Number numberField
          }
        `
        const formML = new FormML(dsl)
        const index = formML.indexRoot['numberField']
        formML.initField(index)
        const pack = formML.getField(index)

        // Act
        pack.setRawValue('123')

        // Assert
        const newPack = formML.getField(index)
        expect(newPack.rawValue).toEqual('123')
      })

      test('should always be touched after touches field', () => {
        // Arrange
        const dsl = `
          form ExampleForm {
            Number numberField
          }
        `
        const formML = new FormML(dsl)
        const index = formML.indexRoot['numberField']
        formML.initField(index)

        const firstPack = formML.getField(index)
        expect(firstPack.touched).toBe(false)

        // Act
        firstPack.touch()

        // Assert
        const secondPack = formML.getField(index)
        expect(secondPack.touched).toBe(true)

        // Act
        secondPack.touch()

        // Assert
        const thirdPack = formML.getField(index)
        expect(thirdPack.touched).toBe(true)
      })

      test.each`
        fieldType     | rawInput                      | expected
        ${'Text'}     | ${'abc'}                      | ${'abc'}
        ${'Number'}   | ${'123.45'}                   | ${123.45}
        ${'Currency'} | ${'123.45'}                   | ${currency('123.45')}
        ${'Boolean'}  | ${'true'}                     | ${true}
        ${'Boolean'}  | ${'false'}                    | ${false}
        ${'DateTime'} | ${'2024-01-01T00:00:00.000Z'} | ${new Date(Date.UTC(2024, 0, 1))}
      `(
        'should return latest typed $fieldType value once raw value change is committed',
        ({ expected, fieldType, rawInput }) => {
          // Arrange
          const dsl = `
            form ExampleForm {
              ${fieldType} field
            }
          `
          const formML = new FormML(dsl)
          const index = formML.indexRoot['field']
          formML.initField(index)

          const firstPack = formML.getField(index)

          // Act
          firstPack.setRawValue(rawInput)
          firstPack.commitRawValue()

          // Assert
          const secondPack = formML.getField(index)
          expect(secondPack.value).toEqual(expected)
        },
      )

      test.each`
        fieldType     | expectedRawValue              | newValue
        ${'Text'}     | ${'abc'}                      | ${'abc'}
        ${'Number'}   | ${'123.45'}                   | ${123.45}
        ${'Currency'} | ${'123.45'}                   | ${currency('123.45')}
        ${'Boolean'}  | ${'true'}                     | ${true}
        ${'Boolean'}  | ${'false'}                    | ${false}
        ${'DateTime'} | ${'2024-01-01T00:00:00.000Z'} | ${new Date(Date.UTC(2024, 0, 1))}
      `(
        'should update both of value and raw value when set $fieldType value',
        ({ expectedRawValue, fieldType, newValue }) => {
          // Arrange
          const dsl = `
            form ExampleForm {
              ${fieldType} field
            }
          `
          const formML = new FormML(dsl)
          const index = formML.indexRoot['field']
          formML.initField(index)

          const firstPack = formML.getField(index)

          // Act
          firstPack.setValue(newValue)

          // Assert
          const secondPack = formML.getField(index)
          expect(secondPack.value).toBe(newValue)
          expect(secondPack.rawValue).toEqual(expectedRawValue)
        },
      )
    })

    describe('caches', () => {
      test.each([
        'schema',
        'commitRawValue',
        'setRawValue',
        'setValue',
        'touch',
      ] as const)('should always return same references for "%s"', (key) => {
        // Arrange
        const dsl = `
          form ExampleForm {
            Number numberField
          }
        `
        const formML = new FormML(dsl)
        const index = formML.indexRoot['numberField']
        formML.initField(index)

        const firstPack = formML.getField(index)

        // Act
        firstPack.setRawValue('123')
        firstPack.commitRawValue()
        firstPack.setValue('456')
        firstPack.touch()

        // Assert
        const secondPack = formML.getField(index)
        expect(secondPack[key]).toBe(firstPack[key])
      })
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
          DateTime datetimeField
        }
      `
      const formML = new FormML(schema)

      // Act & Assert
      const invalidIndex = {}
      expect(() => formML.subscribe(invalidIndex, () => {})).toThrow(
        /Given index is invalid, index provided:[\s\S]+/g,
      )
    })

    test('should throw when field is not initialized', () => {
      // Arrange
      const dsl = `
        form ExampleForm {
          Number numberField
        }
      `
      const formML = new FormML(dsl)
      const index = formML.indexRoot['numberField']

      // Act & Assert
      expect(() => formML.subscribe(index, () => {})).toThrow(
        'Field "numberField" has not been initialized yet, please make sure to call `initField` before calling `subscribe`',
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
      formML.initField(index)
      formML.subscribe(index, callback)

      // Act
      const pack = formML.getField(index)
      pack.setRawValue('123')

      // Assert
      expect(callback).toBeCalledTimes(1)
    })

    test('should react to field touched change', () => {
      // Arrange
      const schema = `
        form ExampleForm {
          Number numberField
        }
      `
      const formML = new FormML(schema)
      const index = formML.indexRoot['numberField']
      const callback = vi.fn()
      formML.initField(index)
      formML.subscribe(index, callback)

      // Act
      const pack = formML.getField(index)
      pack.touch()

      // Assert
      expect(callback).toBeCalledTimes(1)
    })

    test('should react to field typed value change', () => {
      // Arrange
      const schema = `
        form ExampleForm {
          Text textField
        }
      `
      const formML = new FormML(schema)
      const index = formML.indexRoot['textField']
      const callback = vi.fn()
      formML.initField(index)
      formML.subscribe(index, callback)

      // Act
      const pack = formML.getField(index)
      pack.setRawValue('abc')

      callback.mockClear()
      pack.commitRawValue() // trigger typed value change

      // Assert
      expect(callback).toBeCalledTimes(1)
    })
  })
})
