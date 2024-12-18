import type { Field, Form, FormMLSchema } from '@formml/dsl'

import { BigNumber } from 'bignumber.js'
import dayjs from 'dayjs'
import * as v from 'valibot'

import { annotationsReducer } from '../annotations/reducer.js'
import { buildValibotSchema } from '../buildValibotSchema.js'

vi.mock('../annotations/reducer.js', async (importActual) => {
  const actual =
    await importActual<typeof import('../annotations/reducer.js')>()
  return {
    annotationsReducer: vi.fn(actual.annotationsReducer),
  }
})

describe('buildValibotSchema', () => {
  describe('for field', () => {
    describe('integration', () => {
      describe.each(['text', 'num', 'bool', 'datetime', 'decimal'] as const)(
        'types - %s',
        (type) => {
          const fixtures = {
            bool: {
              expectedType: 'boolean',
              invalidInput: 'abc',
              validInput: true,
            },
            datetime: {
              expectedType: 'Date',
              invalidInput: dayjs('2024-01-01T00:00:00Z'),
              validInput: new Date('2024-01-01T00:00:00Z'),
            },
            decimal: {
              expectedType: 'BigNumber',
              invalidInput: 123.45,
              validInput: new BigNumber('123.45'),
            },
            num: {
              expectedType: 'number',
              invalidInput: 'abc',
              validInput: 123,
            },
            text: {
              expectedType: 'string',
              invalidInput: 123,
              validInput: 'abc',
            },
          }

          test(`should validate ${fixtures[type].expectedType} input if field type is ${type}`, () => {
            // Arrange
            const field: Field = {
              $container: {} as Form,
              $type: 'Field',
              annotations: [],
              name: 'field',
              type,
            }

            // Act
            const schema = buildValibotSchema(field)
            const result = v.safeParse(schema, fixtures[type].validInput)

            // Assert
            expect(result.success).toBe(true)
          })

          test(`should invalidate non-${fixtures[type].expectedType} input if field type is ${type}`, () => {
            // Arrange
            const field: Field = {
              $container: {} as Form,
              $type: 'Field',
              annotations: [],
              name: 'field',
              type,
            }

            // Act
            const schema = buildValibotSchema(field)
            const result = v.safeParse(schema, fixtures[type].invalidInput)

            // Assert
            expect(result.success).toBe(false)
            expect(result.issues).toMatchSnapshot()
          })

          const failedPreprocess = {
            bool: v.null('no bool'),
            datetime: v.null('no datetime'),
            decimal: v.null('no decimal'),
            num: v.null('no num'),
            text: v.null('no text'),
          }

          test(`should preprocess ${type} input if preprocessors are provided`, () => {
            // Arrange
            const field: Field = {
              $container: {} as Form,
              $type: 'Field',
              annotations: [],
              name: 'field',
              type,
            }

            // Act
            const schema = buildValibotSchema(field, failedPreprocess)
            const result = v.safeParse(schema, fixtures[type].invalidInput)

            // Assert
            expect(result.success).toBe(false)
            expect(result.issues).toMatchSnapshot() // preprocessors should fail firstly
          })
        },
      )

      test.each(['text', 'num', 'bool', 'datetime', 'decimal'] as const)(
        'should be optional by default',
        (type) => {
          // Arrange
          const field: Field = {
            $container: {} as Form,
            $type: 'Field',
            annotations: [],
            name: 'field',
            type,
          }

          // Act
          const schema = buildValibotSchema(field)
          const result = v.safeParse(schema, undefined)

          // Assert
          expect(result.success).toBe(true)
        },
      )
    })

    describe('unit test', () => {
      test('should wrap base schema with annotations reducer', () => {
        // Arrange
        const field: Field = {
          $container: {} as Form,
          $type: 'Field',
          annotations: [
            {
              $container: {} as Field,
              $type: 'Annotation',
              args: [],
              call: {
                $refText: 'required',
              },
            },
          ],
          name: 'field',
          type: 'text',
        }
        const stubWrappedSchema = {} as v.GenericSchema
        vi.mocked(annotationsReducer).mockReturnValueOnce(stubWrappedSchema)

        // Act
        const schema = buildValibotSchema(field)

        // Assert
        expect(annotationsReducer).toBeCalledWith(
          expect.anything(),
          {
            name: 'required',
            options: {},
          },
          expect.anything(),
          expect.anything(),
        )
        expect(schema).toBe(stubWrappedSchema)
      })
    })
  })

  describe('for form', () => {
    test('should wrap all fields with object schema', () => {
      // Arrange
      const form: Form = {
        $container: {} as FormMLSchema,
        $type: 'Form',
        fields: [
          {
            $container: {} as Form,
            $type: 'Field',
            annotations: [],
            name: 'textField',
            type: 'text',
          },
          {
            $container: {} as Form,
            $type: 'Field',
            annotations: [],
            name: 'numField',
            type: 'num',
          },
        ],
        name: 'ExampleForm',
      }

      // Act
      const schema = buildValibotSchema(form)

      // Assert
      expect(schema).toEqual(
        expect.objectContaining({
          async: false,
          entries: {
            numField: expect.any(Object),
            textField: expect.any(Object),
          },
          kind: 'schema',
          type: 'strict_object',
        }),
      )
    })

    test('should preprocess all fields if given preprocessors', () => {
      // Arrange
      const form: Form = {
        $container: {} as FormMLSchema,
        $type: 'Form',
        fields: [
          {
            $container: {} as Form,
            $type: 'Field',
            annotations: [],
            name: 'textField',
            type: 'text',
          },
          {
            $container: {} as Form,
            $type: 'Field',
            annotations: [],
            name: 'numField',
            type: 'num',
          },
        ],
        name: 'ExampleForm',
      }

      const failedPreprocess = {
        bool: v.null('no bool'),
        datetime: v.null('no datetime'),
        decimal: v.null('no decimal'),
        num: v.null('no num'),
        text: v.null('no text'),
      }

      // Act
      const schema = buildValibotSchema(form, failedPreprocess)

      // Assert
      expect(schema).toEqual(
        expect.objectContaining({
          async: false,
          entries: {
            numField: expect.any(Object),
            textField: expect.any(Object),
          },
          kind: 'schema',
          type: 'strict_object',
        }),
      )

      const result = v.safeParse(schema, {
        numField: 123,
        textField: 'abc',
      })

      expect(result.success).toBe(false)
      expect(result.issues).toMatchSnapshot()
    })
  })
})
