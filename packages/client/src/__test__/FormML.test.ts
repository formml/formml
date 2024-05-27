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
          initial: 'blur',
          subsequent: 'change',
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

    test('should initialize all fields', () => {
      // Arrange
      const fixtures = [
        {
          defaultValue: undefined,
          name: 'numberField',
          type: 'num',
        },
        {
          defaultValue: undefined,
          name: 'decimalField',
          type: 'decimal',
        },
        {
          defaultValue: '',
          name: 'textField',
          type: 'text',
        },
        {
          defaultValue: false,
          name: 'boolField',
          type: 'bool',
        },
        {
          defaultValue: undefined,
          name: 'datetimeField',
          type: 'datetime',
        },
      ]

      const dsl = `
        form ExampleForm {
          ${fixtures.map((f) => `${f.type} ${f.name}`).join('\n')}
        }
      `
      // Act
      const formML = new FormML(dsl)

      // Assert
      for (const fixture of fixtures) {
        const pack = formML.getField(formML.indexRoot[fixture.name])
        expect(pack).toEqual({
          _internalState: {
            isInitiallyValidated: false,
          },
          error: undefined,
          schema: expect.objectContaining({
            $type: 'Field',
            name: fixture.name,
            type: fixture.type,
          }),

          // Part: raw value
          commitRawValue: expect.any(Function),
          rawValue: '',
          setRawValue: expect.any(Function),

          // Part: value
          setTypedValue: expect.any(Function),
          setValue: expect.any(Function),
          value: fixture.defaultValue,

          // Part: touch
          blur: expect.any(Function),
          touched: false,
        })
      }
    })
  })

  describe('apis', () => {
    test.each([
      'getField',
      'subscribe',
      'setRawValue',
      'setValue',
      'setTypedValue',
      'commitRawValue',
      'blur',
      'validate',
    ] as const)(
      'should throw if index can not be recognized - "%s"',
      (methodName) => {
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
      },
    )

    describe('getField', () => {
      test('should return initial field pack by default', () => {
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

        // Act
        const pack = formML.getField(index)

        // Assert
        expect(pack).toEqual({
          _internalState: {
            isInitiallyValidated: false,
          },
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
          blur: expect.any(Function),
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

          const pack = formML.getField(index)

          // Act
          pack.setRawValue('123')

          // Assert
          const newPack = formML.getField(index)
          expect(newPack.rawValue).toEqual('123')
        })

        test('should always be touched after blurs field', () => {
          // Arrange
          const dsl = `
            form ExampleForm {
              num numberField
            }
          `
          const formML = new FormML(dsl)
          const index = formML.indexRoot['numberField']

          const firstPack = formML.getField(index)
          expect(firstPack.touched).toBe(false)

          // Act
          firstPack.blur()

          // Assert
          const secondPack = formML.getField(index)
          expect(secondPack.touched).toBe(true)

          // Act
          secondPack.blur()

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
          ${'bool'}     | ${''}                              | ${false}
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
              ${'bool'}     | ${false}                                         | ${''}
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

        test('should be initially validated after any validation', () => {
          // Arrange
          const dsl = `
            form ExampleForm {
              num numberField
            }
          `
          const formML = new FormML(dsl, {
            validateOn: { initial: 'change', subsequent: 'change' },
          })
          const index = formML.indexRoot['numberField']

          // Act
          const pack = formML.getField(index)
          pack.setRawValue('') // trigger validation

          // Assert
          const newPack = formML.getField(index)
          expect(newPack._internalState.isInitiallyValidated).toBe(true)
        })
      })

      describe('caches', () => {
        test.each([
          'schema',
          'commitRawValue',
          'setRawValue',
          'setValue',
          'blur',
        ] as const)('should always return same references for "%s"', (key) => {
          // Arrange
          const dsl = `
            form ExampleForm {
              num numberField
            }
          `
          const formML = new FormML(dsl)
          const index = formML.indexRoot['numberField']

          const firstPack = formML.getField(index)

          // Act
          firstPack.setRawValue('123')
          firstPack.commitRawValue()
          firstPack.setValue('456')
          firstPack.blur()

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

        formML.subscribe(index, callback)

        // Act
        const pack = formML.getField(index)
        pack.blur()

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

        formML.subscribe(index, callback)

        // Act
        formML.validate(index)

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
        ${'bool'}     | ${''}                              | ${false}
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

          // Act
          formML.setRawValue(index, rawInput)
          formML.commitRawValue(index)

          // Assert
          const pack = formML.getField(index)
          expect(pack.value).toEqual(expected)
        },
      )
    })

    describe('blur', () => {
      test('should always be touched after blurs field', () => {
        // Arrange
        const dsl = `
          form ExampleForm {
            num numberField
          }
        `
        const formML = new FormML(dsl)
        const index = formML.indexRoot['numberField']

        const firstPack = formML.getField(index)
        expect(firstPack.touched).toBe(false)

        // Act
        formML.blur(index)

        // Assert
        const secondPack = formML.getField(index)
        expect(secondPack.touched).toBe(true)

        // Act
        formML.blur(index)

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

        // Act
        const pack = formML.getField(index)
        pack.setRawValue('123')
        pack.commitRawValue()

        // Assert
        const result = formML.validateAll()
        expect(result).toEqual({ errors: undefined, isValid: true })
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

      test('should update is field initially validated', () => {
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
        const pack = formML.getField(index)
        expect(pack._internalState.isInitiallyValidated).toBe(true)
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

        // Act
        const result = formML.validate(index)

        // Assert
        expect(result.isValid).toBe(false)
        expect(result.error).toEqual(
          expect.objectContaining({ message: expect.any(String) }),
        )
      })

      test('should update field error after every validation', () => {
        // Arrange
        const dsl = `
          form ExampleForm {
            @required
            num numberField
          }
        `
        const formML = new FormML(dsl, {
          validateOn: { initial: 'submit', subsequent: 'submit' },
        })
        const index = formML.indexRoot['numberField']

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

        // Act
        formML.setRawValue(index, '123')
        formML.validate(index)

        // Assert
        const pack3 = formML.getField(index)
        expect(pack3.error).toBeUndefined()
      })

      test('should update is field initially validated', () => {
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
        formML.validate(index)

        // Assert
        const pack = formML.getField(index)
        expect(pack._internalState.isInitiallyValidated).toBe(true)
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

        // Act
        const pack = formML.getField(index)

        // Assert
        expect(pack.error).toBeUndefined()
      })

      describe.each`
        triggerEvent | setRawValue | setValue | setTypedValue | blur
        ${'all'}     | ${true}     | ${true}  | ${true}       | ${true}
        ${'change'}  | ${true}     | ${true}  | ${true}       | ${false}
        ${'blur'}    | ${false}    | ${false} | ${false}      | ${true}
        ${'submit'}  | ${false}    | ${false} | ${false}      | ${false}
      `(
        'initial validation - $triggerEvent',
        ({ blur, setRawValue, setTypedValue, setValue, triggerEvent }) => {
          const options: FormMLOptions = {
            validateOn: {
              initial: triggerEvent,
              subsequent: 'all',
            },
          }

          test(`should ${
            setRawValue ? 'do' : 'not do'
          } validation when setting raw value`, () => {
            // Arrange
            const dsl = `
              form ExampleForm {
                @required
                num numberField
              }
            `
            const formML = new FormML(dsl, options)
            const index = formML.indexRoot['numberField']

            // Act
            formML.setRawValue(index, '')

            // Assert
            const pack = formML.getField(index)
            if (setRawValue) {
              expect(pack.error).toBeDefined()
              expect(pack.error).toEqual(
                expect.objectContaining({ message: expect.any(String) }),
              )
            } else {
              expect(pack.error).toBeUndefined()
            }
          })

          test(`should ${
            setValue ? 'do' : 'not do'
          } validation when setting value`, () => {
            // Arrange
            const dsl = `
              form ExampleForm {
                @required
                num numberField
              }
            `
            const formML = new FormML(dsl, options)
            const index = formML.indexRoot['numberField']

            // Act
            formML.setValue(index, undefined)

            // Assert
            const pack = formML.getField(index)
            if (setValue) {
              expect(pack.error).toBeDefined()
              expect(pack.error).toEqual(
                expect.objectContaining({ message: expect.any(String) }),
              )
            } else {
              expect(pack.error).toBeUndefined()
            }
          })

          test(`should ${
            setTypedValue ? 'do' : 'not do'
          } validation when setting typed value`, () => {
            // Arrange
            const dsl = `
              form ExampleForm {
                @required
                num numberField
              }
            `
            const formML = new FormML(dsl, options)
            const index = formML.indexRoot['numberField']

            // Act
            formML.setTypedValue(index, undefined)

            // Assert
            const pack = formML.getField(index)
            if (setTypedValue) {
              expect(pack.error).toBeDefined()
              expect(pack.error).toEqual(
                expect.objectContaining({ message: expect.any(String) }),
              )
            } else {
              expect(pack.error).toBeUndefined()
            }
          })

          test(`should ${
            blur ? 'do' : 'not do'
          } validation when blurring field`, () => {
            // Arrange
            const dsl = `
              form ExampleForm {
                @required
                num numberField
              }
            `
            const formML = new FormML(dsl, options)
            const index = formML.indexRoot['numberField']

            // Act
            formML.blur(index)

            // Assert
            const pack = formML.getField(index)
            if (blur) {
              expect(pack.error).toBeDefined()
              expect(pack.error).toEqual(
                expect.objectContaining({ message: expect.any(String) }),
              )
            } else {
              expect(pack.error).toBeUndefined()
            }
          })
        },
      )

      describe.each`
        triggerEvent | setRawValue | setValue | setTypedValue | blur
        ${'all'}     | ${true}     | ${true}  | ${true}       | ${true}
        ${'change'}  | ${true}     | ${true}  | ${true}       | ${false}
        ${'blur'}    | ${false}    | ${false} | ${false}      | ${true}
        ${'submit'}  | ${false}    | ${false} | ${false}      | ${false}
      `(
        'subsequent validation - $triggerEvent',
        ({ blur, setRawValue, setTypedValue, setValue, triggerEvent }) => {
          const options: FormMLOptions = {
            validateOn: {
              initial: 'change',
              subsequent: triggerEvent,
            },
          }

          test(`should ${
            setRawValue ? 'do' : 'not do'
          } validation when setting raw value`, () => {
            // Arrange
            const dsl = `
              form ExampleForm {
                @required
                num numberField
              }
            `
            const formML = new FormML(dsl, options)
            const index = formML.indexRoot['numberField']

            // Act
            formML.setRawValue(index, '123') // trigger initial validation

            // Assert
            expect(
              formML.getField(index)._internalState.isInitiallyValidated,
            ).toBe(true)

            // Act
            formML.setRawValue(index, '')

            // Assert
            const pack = formML.getField(index)
            if (setRawValue) {
              expect(pack.error).toBeDefined()
              expect(pack.error).toEqual(
                expect.objectContaining({ message: expect.any(String) }),
              )
            } else {
              expect(pack.error).toBeUndefined()
            }
          })

          test(`should ${
            setValue ? 'do' : 'not do'
          } validation when setting value`, () => {
            // Arrange
            const dsl = `
              form ExampleForm {
                @required
                num numberField
              }
            `
            const formML = new FormML(dsl, options)
            const index = formML.indexRoot['numberField']

            // Act
            formML.setRawValue(index, '123') // trigger initial validation

            // Assert
            expect(
              formML.getField(index)._internalState.isInitiallyValidated,
            ).toBe(true)

            // Act
            formML.setValue(index, undefined)

            // Assert
            const pack = formML.getField(index)
            if (setValue) {
              expect(pack.error).toBeDefined()
              expect(pack.error).toEqual(
                expect.objectContaining({ message: expect.any(String) }),
              )
            } else {
              expect(pack.error).toBeUndefined()
            }
          })

          test(`should ${
            setTypedValue ? 'do' : 'not do'
          } validation when setting typed value`, () => {
            // Arrange
            const dsl = `
              form ExampleForm {
                @required
                num numberField
              }
            `
            const formML = new FormML(dsl, options)
            const index = formML.indexRoot['numberField']

            // Act
            formML.setRawValue(index, '123') // trigger initial validation

            // Assert
            expect(
              formML.getField(index)._internalState.isInitiallyValidated,
            ).toBe(true)

            // Act
            formML.setTypedValue(index, undefined)

            // Assert
            const pack = formML.getField(index)
            if (setTypedValue) {
              expect(pack.error).toBeDefined()
              expect(pack.error).toEqual(
                expect.objectContaining({ message: expect.any(String) }),
              )
            } else {
              expect(pack.error).toBeUndefined()
            }
          })

          test(`should ${
            blur ? 'do' : 'not do'
          } validation when blurring field`, () => {
            // Arrange
            const dsl = `
              form ExampleForm {
                @required
                num numberField
              }
            `
            const formML = new FormML(dsl, options)
            const index = formML.indexRoot['numberField']

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ;(formML as any)._fieldsInternalState[
              'numberField'
            ].isInitiallyValidated = true // force field to be initially validated

            // Act
            formML.blur(index)

            // Assert
            const pack = formML.getField(index)
            if (blur) {
              expect(pack.error).toBeDefined()
              expect(pack.error).toEqual(
                expect.objectContaining({ message: expect.any(String) }),
              )
            } else {
              expect(pack.error).toBeUndefined()
            }
          })
        },
      )

      // TODO: multiple errors
    })
  })
})
