import type { Field, Form, FormMLSchema } from '@formml/dsl'

import { BigNumber } from 'bignumber.js'
import dayjs from 'dayjs'
import * as v from 'valibot'

import annotationsReducer from '../annotationsReducer.js'
import buildSchema from '../buildSchema.js'

vi.mock('../annotationsReducer.js', async (importActual) => {
  const actual = await importActual<typeof import('../annotationsReducer.js')>()
  return {
    default: vi.fn(actual.default),
  }
})

describe('buildSchema', () => {
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
            const schema = buildSchema(field)
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
            const schema = buildSchema(field)
            const result = v.safeParse(schema, fixtures[type].invalidInput)

            // Assert
            expect(result.success).toBe(false)
            expect(result.issues).toMatchSnapshot()
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
          const schema = buildSchema(field)
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
        const schema = buildSchema(field)

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
      const schema = buildSchema(form)

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
  })
})
