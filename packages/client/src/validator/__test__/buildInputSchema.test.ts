import { Field, Form, FormMLSchema } from '@formml/dsl'
import { pipe, strictObject, string, transform } from 'valibot'

import { parse } from '../../JsTypes.js'
import buildInputSchema from '../buildInputSchema.js'
import buildSchema from '../buildSchema.js'
import * as v from '../valibot/validations/index.js'

vi.mock('valibot')
vi.mock('../../JsTypes.ts')
vi.mock('../valibot/validations/index.js')
vi.mock('../buildSchema.js')

describe('buildInputSchema', () => {
  describe('field', () => {
    describe('text', () => {
      test('should return built valibot schema directly', () => {
        // Arrange
        const textField: Field = {
          $container: {} as Form,
          $type: 'Field',
          annotations: [],
          name: 'textField',
          type: 'text',
        }
        const dummySchema = {} as never
        vi.mocked(buildSchema).mockReturnValue(dummySchema)

        // Act
        const schema = buildInputSchema(textField)

        // Assert
        expect(buildSchema).toBeCalledWith(textField)
        expect(schema).toBe(dummySchema)
      })
    })

    describe.each(['num', 'bool', 'datetime', 'decimal'] as const)(
      '%s',
      (type) => {
        test('should validate input with string schema', () => {
          // Arrange
          const field: Field = {
            $container: {} as Form,
            $type: 'Field',
            annotations: [],
            name: 'field',
            type,
          }
          const dummyStringSchema = {} as never
          vi.mocked(string).mockReturnValue(dummyStringSchema)

          // Act
          buildInputSchema(field)

          // Assert
          expect(pipe).toBeCalledWith(
            dummyStringSchema,
            undefined,
            undefined,
            undefined,
          )
        })

        test('should validate input with custom validation', () => {
          // Arrange
          const field: Field = {
            $container: {} as Form,
            $type: 'Field',
            annotations: [],
            name: 'field',
            type,
          }
          const dummySchema = {} as never
          vi.mocked(v[type]).mockReturnValue(dummySchema)

          // Act
          buildInputSchema(field)

          // Assert
          expect(pipe).toBeCalledWith(
            undefined,
            dummySchema,
            undefined,
            undefined,
          )
        })

        test('should transform the input with corresponding parser', () => {
          // Arrange
          const field: Field = {
            $container: {} as Form,
            $type: 'Field',
            annotations: [],
            name: 'field',
            type,
          }
          const dummyParser = {} as never
          vi.mocked(parse).mockReturnValue(dummyParser)
          const dummyTransformAction = {} as never
          vi.mocked(transform).mockReturnValue(dummyTransformAction)

          // Act
          buildInputSchema(field)

          // Assert
          expect(parse).toBeCalledWith(type)
          expect(transform).toBeCalledWith(dummyParser)
          expect(pipe).toBeCalledWith(
            undefined,
            undefined,
            dummyTransformAction,
            undefined,
          )
        })

        test('should pipe inner typed schema to last', () => {
          // Arrange
          const field: Field = {
            $container: {} as Form,
            $type: 'Field',
            annotations: [],
            name: 'field',
            type,
          }
          const typedSchema = {} as never
          vi.mocked(buildSchema).mockReturnValue(typedSchema)

          // Act
          buildInputSchema(field)

          // Assert
          expect(buildSchema).toBeCalledWith(field)
          expect(pipe).toBeCalledWith(
            undefined,
            undefined,
            undefined,
            typedSchema,
          )
        })
      },
    )
  })

  describe('form', () => {
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
      const dummyObjectSchema = {} as never
      vi.mocked(strictObject).mockReturnValue(dummyObjectSchema)

      // Act
      const schema = buildInputSchema(form)

      // Assert
      expect(schema).toBe(dummyObjectSchema)
      expect(strictObject).toBeCalledWith({
        numField: undefined,
        textField: undefined,
      })
    })
  })
})
