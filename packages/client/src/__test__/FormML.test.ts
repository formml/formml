import { FormMLParseError } from '@formml/dsl'
import { BigNumber } from 'bignumber.js'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc.js'

import { FormML, FormMLOptions } from '../FormML.js'

dayjs.extend(utc)

describe('FormML', () => {
  describe('constructor', () => {
    test('should throw if schema is invalid', () => {
      // Arrange
      const invalidSchema = `form {}`

      // Act & Assert
      expect(() => new FormML(invalidSchema)).toThrow(FormMLParseError)
    })

    test('should apply default options if not provided', () => {
      // Arrange
      const defaultOptions: FormMLOptions = {
        validateOn: {
          initial: 'all',
          subsequent: 'all',
        },
      }
      const dsl = `
        form ExampleForm {
          num numberField
        }
      `

      // Act
      const form = new FormML(dsl)

      // Assert
      expect(form.options).toEqual(defaultOptions)
    })

    test('should use provided options', () => {
      // Arrange
      const options: FormMLOptions = {
        validateOn: {
          initial: 'change',
          subsequent: 'blur',
        },
      }
      const dsl = `
        form ExampleForm {
          num numberField
        }
      `

      // Act
      const form = new FormML(dsl, options)

      // Assert
      expect(form.options).toEqual(options)
    })

    test.todo('merge options')
  })

  describe('apis', () => {
    describe('initField', () => {
      test('should throw if index can not be recognized', () => {
        // Arrange
        const schema = `
          form ExampleForm {
            num   numberField
            decimal decimalField
            text     textField
            bool	 boolField
            datetime datetimeField
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
            num numberField
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
            type: 'num',
          }),

          // Part: raw value
          commitRawValue: expect.any(Function),
          rawValue: '',
          setRawValue: expect.any(Function),

          // Part: value
          setTypedValue: expect.any(Function),
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
            num numberField
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

    describe.each([
      'getField',
      'subscribe',
      'setRawValue',
      'setValue',
      'setTypedValue',
      'commitRawValue',
      'touch',
      'validate',
    ] as const)(
      'index validity and field initialization check - "%s"',
      (methodName) => {
        test('should throw if index can not be recognized', () => {
          // Arrange
          const schema = `
            form ExampleForm {
              num   numberField
              decimal decimalField
              text     textField
              bool	 boolField
              datetime datetimeField
            }
          `
          const formML = new FormML(schema)

          // Act & Assert
          const invalidIndex = {}
          expect(() =>
            (formML[methodName] as (index: object) => void)(invalidIndex),
          ).toThrow(/Given index is invalid, index provided:[\s\S]+/g)
        })

        test('should throw when field is not initialized', () => {
          // Arrange
          const dsl = `
            form ExampleForm {
              num numberField
            }
          `
          const formML = new FormML(dsl)
          const index = formML.indexRoot['numberField']

          // Act & Assert
          expect(() =>
            (formML[methodName] as (index: object) => void)(index),
          ).toThrow(
            `Field "numberField" has not been initialized yet, please make sure to call \`initField\` before calling \`${methodName}\``,
          )
        })
      },
    )

    describe('getField', () => {
      test('should return initial field pack', () => {
        // Arrange
        const dsl = `
          form ExampleForm {
            num   numberField
            decimal decimalField
            text     textField
            bool	 boolField
            datetime datetimeField
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
            type: 'num',
          }),

          // Part: raw value
          commitRawValue: expect.any(Function),
          rawValue: '',
          setRawValue: expect.any(Function),

          // Part: value
          setTypedValue: expect.any(Function),
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
          ${'num'}      | ${'numberField'}
          ${'decimal'}  | ${'decimalField'}
          ${'text'}     | ${'textField'}
          ${'bool'}     | ${'boolField'}
          ${'datetime'} | ${'datetimeField'}
        `(
          'should return corresponding field schema - $fieldName',
          ({ fieldName, type }) => {
            // Arrange
            const dsl = `
              form ExampleForm {
                num   numberField
                decimal decimalField
                text     textField
                bool	 boolField
                datetime datetimeField
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

        test('should return latest raw value when field has been changed', () => {
          // Arrange
          const dsl = `
            form ExampleForm {
              num numberField
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
              num numberField
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
          fieldType     | rawInput                           | expected
          ${'text'}     | ${'abc'}                           | ${'abc'}
          ${'num'}      | ${'123.45'}                        | ${123.45}
          ${'decimal'}  | ${'123.45'}                        | ${new BigNumber('123.45')}
          ${'bool'}     | ${'true'}                          | ${true}
          ${'bool'}     | ${'false'}                         | ${false}
          ${'datetime'} | ${'2024-01-01'}                    | ${new Date(2024, 0, 1)}
          ${'datetime'} | ${'2024-01-01T00:00:00.000'}       | ${new Date(2024, 0, 1, 0, 0, 0, 0)}
          ${'datetime'} | ${'2024-01-01T08:00:00.000+08:00'} | ${new Date(Date.UTC(2024, 0, 1, 0, 0, 0, 0))}
          ${'datetime'} | ${'2024-01-01T00:00:00.000Z'}      | ${new Date(Date.UTC(2024, 0, 1, 0, 0, 0, 0))}
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
          fieldType     | rawInput | expected
          ${'text'}     | ${''}    | ${''}
          ${'num'}      | ${''}    | ${undefined}
          ${'decimal'}  | ${''}    | ${undefined}
          ${'bool'}     | ${''}    | ${undefined}
          ${'datetime'} | ${''}    | ${undefined}
        `(
          'should return undefined once raw value is empty except "text" - $fieldType',
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

        describe.each(['setValue', 'setTypedValue'] as const)(
          '%s',
          (methodName) => {
            test.each`
              fieldType     | newValue                                         | expectedRawValue
              ${'text'}     | ${'abc'}                                         | ${'abc'}
              ${'num'}      | ${123.45}                                        | ${'123.45'}
              ${'decimal'}  | ${new BigNumber('123.45')}                       | ${'123.45'}
              ${'bool'}     | ${true}                                          | ${'true'}
              ${'bool'}     | ${false}                                         | ${'false'}
              ${'datetime'} | ${dayjs.utc('2024-01-01').utcOffset(8).toDate()} | ${'2024-01-01T00:00:00.000Z'}
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
                firstPack[methodName](newValue)

                // Assert
                const secondPack = formML.getField(index)
                expect(secondPack.value).toBe(newValue)
                expect(secondPack.rawValue).toEqual(expectedRawValue)
              },
            )

            test.each(['text', 'num', 'decimal', 'bool', 'datetime'])(
              'should set raw value to empty when set "%s" value as `undefined`',
              (fieldType) => {
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
                firstPack[methodName](undefined)

                // Assert
                const secondPack = formML.getField(index)
                expect(secondPack.value).toBeUndefined()
                expect(secondPack.rawValue).toEqual('')
              },
            )
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
              num numberField
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
      test('should react to field value change', () => {
        // Arrange
        const schema = `
          form ExampleForm {
            num numberField
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
            num numberField
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
            text textField
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

      test('should react to field error change', () => {
        // Arrange
        const schema = `
          form ExampleForm {
            @required
            num numberField
          }
        `
        const formML = new FormML(schema)
        const index = formML.indexRoot['numberField']
        const callback = vi.fn()
        formML.initField(index)
        formML.subscribe(index, callback)

        // Act
        const pack = formML.getField(index)
        pack.setRawValue('')

        // Assert
        expect(callback).toBeCalledTimes(1)
      })
    })

    describe('setRawValue', () => {
      test('should set raw value of target field', () => {
        // Arrange
        const dsl = `
        form ExampleForm {
          num numberField
        }
      `
        const formML = new FormML(dsl)
        const index = formML.indexRoot['numberField']
        formML.initField(index)

        // Act
        formML.setRawValue(index, '123')

        // Assert
        const pack = formML.getField(index)
        expect(pack.rawValue).toEqual('123')
      })
    })

    describe.each(['setValue', 'setTypedValue'] as const)(
      '%s',
      (methodName) => {
        test('should set typed value and raw value of target field', () => {
          // Arrange
          const dsl = `
            form ExampleForm {
              num numberField
            }
          `
          const formML = new FormML(dsl)
          const index = formML.indexRoot['numberField']
          formML.initField(index)

          // Act
          formML[methodName](index, 123)

          // Assert
          const pack = formML.getField(index)
          expect(pack.rawValue).toEqual('123')
          expect(pack.value).toEqual(123)
        })

        test.each(['text', 'num', 'decimal', 'bool', 'datetime'])(
          'should set raw value to empty when set "%s" value as `undefined`',
          (fieldType) => {
            // Arrange
            const dsl = `
              form ExampleForm {
                ${fieldType} field
              }
            `
            const formML = new FormML(dsl)
            const index = formML.indexRoot['field']
            formML.initField(index)

            // Act
            formML[methodName](index, undefined)

            // Assert
            const pack = formML.getField(index)
            expect(pack.value).toBeUndefined()
            expect(pack.rawValue).toEqual('')
          },
        )
      },
    )

    describe('commitRawValue', () => {
      test.each`
        fieldType     | rawInput                           | expected
        ${'text'}     | ${'abc'}                           | ${'abc'}
        ${'num'}      | ${'123.45'}                        | ${123.45}
        ${'decimal'}  | ${'123.45'}                        | ${new BigNumber('123.45')}
        ${'bool'}     | ${'true'}                          | ${true}
        ${'bool'}     | ${'false'}                         | ${false}
        ${'datetime'} | ${'2024-01-01'}                    | ${new Date(2024, 0, 1)}
        ${'datetime'} | ${'2024-01-01T00:00:00.000'}       | ${new Date(2024, 0, 1, 0, 0, 0, 0)}
        ${'datetime'} | ${'2024-01-01T08:00:00.000+08:00'} | ${new Date(Date.UTC(2024, 0, 1, 0, 0, 0, 0))}
        ${'datetime'} | ${'2024-01-01T00:00:00.000Z'}      | ${new Date(Date.UTC(2024, 0, 1, 0, 0, 0, 0))}
      `(
        'should modify typed $fieldType value once raw value change is committed',
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

          // Act
          formML.setRawValue(index, rawInput)
          formML.commitRawValue(index)

          // Assert
          const pack = formML.getField(index)
          expect(pack.value).toEqual(expected)
        },
      )

      test.each`
        fieldType     | rawInput | expected
        ${'text'}     | ${''}    | ${''}
        ${'num'}      | ${''}    | ${undefined}
        ${'decimal'}  | ${''}    | ${undefined}
        ${'bool'}     | ${''}    | ${undefined}
        ${'datetime'} | ${''}    | ${undefined}
      `(
        'should set typed value to undefined once raw value is empty except for "text" - $fieldType',
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

          // Act
          formML.setRawValue(index, rawInput)
          formML.commitRawValue(index)

          // Assert
          const pack = formML.getField(index)
          expect(pack.value).toEqual(expected)
        },
      )
    })

    describe('touch', () => {
      test('should always be touched after touches field', () => {
        // Arrange
        const dsl = `
          form ExampleForm {
            num numberField
          }
        `
        const formML = new FormML(dsl)
        const index = formML.indexRoot['numberField']
        formML.initField(index)

        const firstPack = formML.getField(index)
        expect(firstPack.touched).toBe(false)

        // Act
        formML.touch(index)

        // Assert
        const secondPack = formML.getField(index)
        expect(secondPack.touched).toBe(true)

        // Act
        formML.touch(index)

        // Assert
        const thirdPack = formML.getField(index)
        expect(thirdPack.touched).toBe(true)
      })
    })

    describe('validateAll', () => {
      test('should return valid when no error', () => {
        // Arrange
        const dsl = `
          form ExampleForm {
            @required
            num numberField
          }
        `
        const formML = new FormML(dsl)
        const index = formML.indexRoot['numberField']
        formML.initField(index)

        // Act
        const pack = formML.getField(index)
        pack.setRawValue('123')
        pack.commitRawValue()

        // Assert
        const result = formML.validateAll()
        expect(result).toEqual({ errors: [], isValid: true })
      })

      test('should return error details when validation fails', () => {
        // Arrange
        const dsl = `
          form ExampleForm {
            @required
            num numberField
          }
        `
        const formML = new FormML(dsl)
        const index = formML.indexRoot['numberField']
        formML.initField(index)

        // Act
        const pack = formML.getField(index)
        pack.setRawValue('')
        pack.commitRawValue()

        // Assert
        const result = formML.validateAll()
        expect(result.isValid).toBe(false)
        expect(result.errors).toHaveLength(1)
      })

      test('should validate all fields', () => {
        // Arrange
        const dsl = `
          form ExampleForm {
            @required
            num numberField1
            @required
            num numberField2
          }
        `
        const formML = new FormML(dsl)
        const index1 = formML.indexRoot['numberField1']
        const index2 = formML.indexRoot['numberField2']
        formML.initField(index1)
        formML.initField(index2)

        // Act
        const pack1 = formML.getField(index1)
        pack1.setRawValue('')
        pack1.commitRawValue()

        const pack2 = formML.getField(index2)
        pack2.setRawValue('')
        pack2.commitRawValue()

        // Assert
        const result = formML.validateAll()
        expect(result.isValid).toBe(false)
        expect(result.errors).toHaveLength(2)
      })

      test('should update field error when validation fails', () => {
        // Arrange
        const dsl = `
          form ExampleForm {
            @required
            num numberField
          }
        `
        const formML = new FormML(dsl)
        const index = formML.indexRoot['numberField']
        formML.initField(index)

        // Assert
        const pack = formML.getField(index)
        expect(pack.error).toBeUndefined()

        // Act
        formML.validateAll()

        // Assert
        const pack2 = formML.getField(index)
        expect(pack2.error).toBeDefined()
        expect(pack2.error).toEqual(
          expect.objectContaining({ message: expect.any(String) }),
        )
      })

      test('should initialize fields if not initialized', () => {
        // Arrange
        const dsl = `
          form ExampleForm {
            @required
            num numberField
          }
        `
        const formML = new FormML(dsl)
        const index = formML.indexRoot['numberField']

        // Act
        formML.validateAll()

        // Assert
        expect(() => formML.getField(index)).not.toThrow()
      })
    })

    describe('validate', () => {
      test('should return valid when no error', () => {
        // Arrange
        const dsl = `
          form ExampleForm {
            @required
            num numberField
          }
        `
        const formML = new FormML(dsl)
        const index = formML.indexRoot['numberField']
        formML.initField(index)

        const pack = formML.getField(index)
        pack.setRawValue('123')
        pack.commitRawValue()

        // Act
        const result = formML.validate(index)

        // Assert
        expect(result).toEqual({ error: undefined, isValid: true })
      })

      test('should return error details when validation fails', () => {
        // Arrange
        const dsl = `
          form ExampleForm {
            @required
            num numberField
          }
        `
        const formML = new FormML(dsl)
        const index = formML.indexRoot['numberField']
        formML.initField(index)

        // Act
        const result = formML.validate(index)

        // Assert
        expect(result.isValid).toBe(false)
        expect(result.error).toEqual(
          expect.objectContaining({ message: expect.any(String) }),
        )
      })

      test('should update field error when validation fails', () => {
        // Arrange
        const dsl = `
          form ExampleForm {
            @required
            num numberField
          }
        `
        const formML = new FormML(dsl)
        const index = formML.indexRoot['numberField']
        formML.initField(index)

        // Assert
        const pack = formML.getField(index)
        expect(pack.error).toBeUndefined()

        // Act
        formML.validate(index)

        // Assert
        const pack2 = formML.getField(index)
        expect(pack2.error).toBeDefined()
        expect(pack2.error).toEqual(
          expect.objectContaining({ message: expect.any(String) }),
        )
      })
    })
  })

  describe('behaviors', () => {
    describe('field validation', () => {
      test('should no error by default', () => {
        // Arrange
        const dsl = `
          form ExampleForm {
            @required
            num numberField
          }
        `
        const formML = new FormML(dsl)
        const index = formML.indexRoot['numberField']
        formML.initField(index)

        // Act
        const pack = formML.getField(index)

        // Assert
        expect(pack.error).toBeUndefined()
      })

      test('should do validation when setting raw value', () => {
        // Arrange
        const dsl = `
          form ExampleForm {
            @required
            num numberField
          }
        `
        const formML = new FormML(dsl)
        const index = formML.indexRoot['numberField']
        formML.initField(index)

        // Act
        formML.setRawValue(index, '')
        const pack = formML.getField(index)

        // Assert
        expect(pack.error).toBeDefined()
        expect(pack.error).toEqual(
          expect.objectContaining({ message: expect.any(String) }),
        )
      })

      test.each(['setValue', 'setTypedValue'] as const)(
        'should do validation when setting typed value',
        (methodName) => {
          // Arrange
          const dsl = `
          form ExampleForm {
            @required
            num numberField
          }
        `
          const formML = new FormML(dsl)
          const index = formML.indexRoot['numberField']
          formML.initField(index)

          // Act
          formML[methodName](index, undefined)
          const pack = formML.getField(index)

          // Assert
          expect(pack.error).toBeDefined()
          expect(pack.error).toEqual(
            expect.objectContaining({ message: expect.any(String) }),
          )
        },
      )

      test('should do validation when touching field', () => {
        // Arrange
        const dsl = `
          form ExampleForm {
            @required
            num numberField
          }
        `
        const formML = new FormML(dsl)
        const index = formML.indexRoot['numberField']
        formML.initField(index)

        // Act
        formML.touch(index)
        const pack = formML.getField(index)

        // Assert
        expect(pack.error).toBeDefined()
        expect(pack.error).toEqual(
          expect.objectContaining({ message: expect.any(String) }),
        )
      })

      // TODO: multiple errors
    })
  })
})
